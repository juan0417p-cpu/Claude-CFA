// POST /api/tutor/explicar  { missedQuestionId }
// El tutor explica una pregunta fallada: el concepto y por qué fallé.
// Usa las fotos de la pregunta y las lecturas (PDF) de su tema.

import { getDb } from "@/lib/db";
import { TUTOR_SYSTEM } from "@/lib/ai";
import { streamTutorResponse } from "@/lib/ai-stream";
import { ERROR_MARK } from "@/lib/tutor-shared";
import {
  getMissedForTutor,
  imageBlocks,
  listReadings,
  readingBlocks,
} from "@/lib/tutor-context";

export async function POST(request: Request) {
  const { missedQuestionId } = (await request.json()) as { missedQuestionId?: number };
  const q = getMissedForTutor(Number(missedQuestionId));
  if (!q) return new Response(`${ERROR_MARK}Pregunta no encontrada.`, { status: 404 });

  const readings = listReadings().filter((r) => r.topicId === q.topicId);

  const prompt = [
    `Tema: ${q.topicName}${q.subtopicName ? ` — Subtema: ${q.subtopicName}` : ""}`,
    q.questionText ? `Enunciado:\n${q.questionText}` : "El enunciado está en la(s) foto(s) adjunta(s).",
    `Mi respuesta: ${q.myAnswer}`,
    `Respuesta correcta: ${q.correctAnswer}`,
    q.note ? `Mi nota: ${q.note}` : "",
    "",
    "Explícame:",
    "1. **El concepto** que evalúa la pregunta (intuición + fórmula/regla).",
    "2. **Por qué mi respuesta es incorrecta** (qué confusión o trampa típica la explica).",
    "3. **Por qué la correcta es correcta**, con el cálculo paso a paso si aplica.",
    "4. **Un truco para recordarlo** en el examen.",
    "Sé conciso: esto es para repasar rápido.",
  ].filter(Boolean).join("\n");

  return streamTutorResponse({
    system: [{ type: "text", text: TUTOR_SYSTEM }],
    messages: [
      {
        role: "user",
        content: [
          ...readingBlocks(readings),
          ...imageBlocks(q.id),
          { type: "text", text: prompt },
        ],
      },
    ],
    onComplete: (text) => {
      getDb()
        .prepare(
          `INSERT INTO ai_explanations (missed_question_id, content) VALUES (?, ?)
           ON CONFLICT (missed_question_id) DO UPDATE SET
             content = excluded.content, created_at = datetime('now')`
        )
        .run(q.id, text);
    },
  });
}
