// POST /api/tutor/chat  { message, readingIds }
// Chat con el tutor. Conoce mis estadísticas y puede usar las lecturas
// (PDF) que yo elija. La conversación se guarda en la base de datos.

import { allRows, getDb } from "@/lib/db";
import { TUTOR_SYSTEM } from "@/lib/ai";
import { streamTutorResponse } from "@/lib/ai-stream";
import { ERROR_MARK } from "@/lib/tutor-shared";
import { listReadings, readingBlocks, statsSummary } from "@/lib/tutor-context";
import type Anthropic from "@anthropic-ai/sdk";

const MAX_HISTORY = 40; // últimos mensajes que se reenvían al modelo

export async function POST(request: Request) {
  const { message, readingIds } = (await request.json()) as {
    message?: string;
    readingIds?: number[];
  };
  const text = (message ?? "").trim();
  if (!text) return new Response(`${ERROR_MARK}Escribe una pregunta.`, { status: 400 });

  const db = getDb();
  db.prepare("INSERT INTO chat_messages (role, content) VALUES ('user', ?)").run(text);

  const history = allRows<{ role: "user" | "assistant"; content: string }>(
    `SELECT role, content FROM (
       SELECT id, role, content FROM chat_messages ORDER BY id DESC LIMIT ${MAX_HISTORY}
     ) ORDER BY id`
  );
  // El historial debe empezar con un mensaje del usuario
  while (history.length && history[0].role !== "user") history.shift();

  const selected = listReadings().filter((r) => readingIds?.includes(r.id));
  const messages: Anthropic.Beta.BetaMessageParam[] = [];
  if (selected.length) {
    // Las lecturas van al inicio de la conversación (así quedan en caché)
    messages.push({
      role: "user",
      content: [
        ...readingBlocks(selected),
        { type: "text", text: "Estas son lecturas del currículo para usar como referencia." },
      ],
    });
  }
  messages.push(...history.map((m) => ({ role: m.role, content: m.content })));

  return streamTutorResponse({
    system: [
      { type: "text", text: TUTOR_SYSTEM },
      {
        type: "text",
        text: `Datos actuales del estudiante (úsalos para enfocar tus respuestas en sus debilidades cuando sea relevante, sin repetirlos a cada rato):\n\n${await statsSummary()}`,
      },
    ],
    messages,
    onComplete: (answer) => {
      db.prepare("INSERT INTO chat_messages (role, content) VALUES ('assistant', ?)").run(answer);
    },
  });
}
