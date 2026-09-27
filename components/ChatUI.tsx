"use client";
// Chat con el tutor. Los mensajes anteriores vienen del servidor (base de
// datos); la respuesta nueva se va mostrando mientras se escribe.

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { clearChat } from "@/app/tutor/actions";
import { readTutorStream } from "@/lib/read-tutor-stream";
import Markdown from "./Markdown";

type Msg = { role: "user" | "assistant"; content: string };
type ReadingOption = { id: number; label: string };

const SUGGESTIONS = [
  "¿En qué debería enfocarme esta semana según mis resultados?",
  "Explícame duration y convexity con un ejemplo numérico",
  "Dame un resumen de los Standards I–VII con los errores más comunes",
];

export default function ChatUI({
  initialMessages,
  readings,
}: {
  initialMessages: Msg[];
  readings: ReadingOption[];
}) {
  const router = useRouter();
  const [messages, setMessages] = useState<Msg[]>(initialMessages);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [readingIds, setReadingIds] = useState<number[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || streaming) return;
    setError("");
    setInput("");
    setStreaming(true);
    setMessages((m) => [...m, { role: "user", content: message }, { role: "assistant", content: "" }]);
    try {
      await readTutorStream("/api/tutor/chat", { message, readingIds }, (soFar) =>
        setMessages((m) => [...m.slice(0, -1), { role: "assistant", content: soFar }])
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
      setMessages((m) => m.slice(0, -1)); // quita la respuesta vacía
    } finally {
      setStreaming(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      {readings.length > 0 && (
        <details className="rounded-xl border border-slate-200 bg-white p-4 text-sm">
          <summary className="cursor-pointer select-none font-medium text-slate-700">
            📚 Lecturas como contexto ({readingIds.length} de {readings.length} elegidas)
          </summary>
          <p className="mt-2 text-xs text-slate-500">
            Elige solo las que necesites: cada PDF se envía completo y cuesta tokens.
          </p>
          <ul className="mt-2 space-y-1">
            {readings.map((r) => (
              <li key={r.id}>
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={readingIds.includes(r.id)}
                    onChange={(e) =>
                      setReadingIds((ids) => e.target.checked ? [...ids, r.id] : ids.filter((x) => x !== r.id))
                    } />
                  {r.label}
                </label>
              </li>
            ))}
          </ul>
        </details>
      )}

      <div className="min-h-[16rem] space-y-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        {messages.length === 0 && (
          <div className="py-6 text-center text-sm text-slate-500">
            <p>Pregúntame lo que quieras del CFA Nivel 1. Conozco tus resultados.</p>
            <div className="mt-4 flex flex-col items-center gap-2">
              {SUGGESTIONS.map((s) => (
                <button key={s} type="button" onClick={() => send(s)}
                  className="rounded-full border border-slate-300 px-3 py-1 text-slate-700 hover:bg-slate-50">
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((m, i) =>
          m.role === "user" ? (
            <div key={i} className="flex justify-end">
              <p className="max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-br-sm bg-slate-900 px-4 py-2 text-sm text-white">
                {m.content}
              </p>
            </div>
          ) : (
            <div key={i} className="max-w-[95%] rounded-2xl rounded-bl-sm bg-slate-50 px-4 py-3">
              {m.content ? <Markdown>{m.content}</Markdown> : <p className="text-sm text-slate-500">Pensando…</p>}
            </div>
          )
        )}
        <div ref={bottomRef} />
      </div>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}

      <form className="flex gap-2"
        onSubmit={(e) => { e.preventDefault(); send(input); }}>
        <textarea value={input} onChange={(e) => setInput(e.target.value)} rows={2}
          placeholder="Escribe tu pregunta… (Enter envía, Shift+Enter nueva línea)"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
          }}
          className="flex-1 resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500" />
        <button type="submit" disabled={streaming || !input.trim()}
          className="rounded-xl bg-slate-900 px-4 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
          {streaming ? "…" : "Enviar"}
        </button>
      </form>

      {messages.length > 0 && !streaming && (
        <button type="button"
          onClick={async () => {
            if (!confirm("¿Borrar toda la conversación?")) return;
            await clearChat();
            setMessages([]);
            router.refresh();
          }}
          className="self-start text-sm text-slate-500 hover:underline">
          Nueva conversación
        </button>
      )}
    </div>
  );
}
