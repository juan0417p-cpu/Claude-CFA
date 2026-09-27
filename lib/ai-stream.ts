// Convierte una respuesta de Claude "en vivo" (streaming) en una respuesta
// HTTP que el navegador va leyendo trozo a trozo. Al terminar, llama a
// onComplete con el texto completo (para guardarlo en la base de datos).
import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import { MODEL, fallbackParams, friendlyError, getClient } from "./ai";

import { ERROR_MARK } from "./tutor-shared";

type StreamInput = {
  system: Anthropic.Beta.BetaTextBlockParam[];
  messages: Anthropic.Beta.BetaMessageParam[];
  onComplete?: (text: string) => void;
};

export function streamTutorResponse({ system, messages, onComplete }: StreamInput): Response {
  const encoder = new TextEncoder();

  const body = new ReadableStream<Uint8Array>({
    async start(controller) {
      let text = "";
      try {
        const stream = getClient().beta.messages.stream({
          model: MODEL,
          max_tokens: 32000,
          // guarda en caché todo lo que se repite (instrucciones, PDFs, historial)
          cache_control: { type: "ephemeral" },
          system,
          messages,
          ...fallbackParams(),
        });

        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            text += event.delta.text;
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encoder.encode(`${ERROR_MARK}El modelo no pudo responder esta solicitud. Intenta reformularla.`)
          );
          return controller.close();
        }
        if (final.stop_reason === "max_tokens") {
          const note = "\n\n_(Respuesta cortada por largo. Pide que continúe.)_";
          text += note;
          controller.enqueue(encoder.encode(note));
        }
        if (text.trim()) onComplete?.(text);
      } catch (error) {
        controller.enqueue(encoder.encode(`${ERROR_MARK}${friendlyError(error)}`));
      }
      controller.close();
    },
  });

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
  });
}
