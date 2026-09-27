"use client";
// Botón "Explícame" de una pregunta fallada. Si ya hay una explicación
// guardada, la muestra (y se puede regenerar).

import { useState } from "react";
import { useRouter } from "next/navigation";
import { readTutorStream } from "@/lib/read-tutor-stream";
import Markdown from "./Markdown";

export default function ExplainButton({
  missedQuestionId,
  savedExplanation,
}: {
  missedQuestionId: number;
  savedExplanation: string | null;
}) {
  const router = useRouter();
  const [text, setText] = useState(savedExplanation ?? "");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function explain() {
    setOpen(true);
    setLoading(true);
    setError("");
    setText("");
    try {
      await readTutorStream("/api/tutor/explicar", { missedQuestionId }, setText);
      router.refresh(); // para que el historial sepa que ya hay explicación guardada
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-2">
      <div className="flex flex-wrap gap-3 text-sm">
        {text && !loading ? (
          <>
            <button type="button" onClick={() => setOpen(!open)} className="font-medium text-blue-700 hover:underline">
              {open ? "Ocultar explicación" : "🤖 Ver explicación del tutor"}
            </button>
            {open && (
              <button type="button" onClick={explain} className="text-slate-500 hover:underline">
                Regenerar
              </button>
            )}
          </>
        ) : (
          <button type="button" onClick={explain} disabled={loading}
            className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1 font-medium text-blue-800 hover:bg-blue-100 disabled:opacity-60">
            {loading ? "El tutor está escribiendo…" : "🤖 Explícame"}
          </button>
        )}
      </div>

      {error && <p role="alert" className="mt-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>}
      {open && text && (
        <div className="mt-2 rounded-lg border border-blue-100 bg-white p-3">
          <Markdown>{text}</Markdown>
        </div>
      )}
    </div>
  );
}
