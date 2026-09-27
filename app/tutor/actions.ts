"use server";
// Acciones del tutor que no necesitan streaming.

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { betaZodOutputFormat } from "@anthropic-ai/sdk/helpers/beta/zod";
import { allRows, getDb } from "@/lib/db";
import { getTodayISO, getTopicsWithStats } from "@/lib/data";
import { MODEL, TUTOR_SYSTEM, fallbackParams, friendlyError, getClient } from "@/lib/ai";
import { listReadings, readingBlocks, weakestSubtopics } from "@/lib/tutor-context";
import { formatPct } from "@/lib/status";

// ---------- Chat ----------

export async function clearChat() {
  getDb().exec("DELETE FROM chat_messages");
  revalidatePath("/tutor");
}

// ---------- Lecturas ----------

export async function deleteReading(formData: FormData) {
  const id = Number(formData.get("readingId"));
  const row = getDb().prepare("SELECT file_id FROM readings WHERE id = ?").get(id) as
    | { file_id: string }
    | undefined;
  if (!row) return;
  try {
    await getClient().files.delete(row.file_id); // lo borra también de Anthropic
  } catch (error) {
    console.error("No se pudo borrar en Anthropic:", friendlyError(error));
  }
  getDb().prepare("DELETE FROM readings WHERE id = ?").run(id);
  revalidatePath("/tutor/lecturas");
}

// ---------- Preguntas de práctica ----------

// Forma exacta que debe tener la respuesta del modelo (la API la garantiza).
const QuizSchema = z.object({
  questions: z.array(
    z.object({
      subtopic_id: z.number().int(),
      question: z.string(),
      options: z.object({ A: z.string(), B: z.string(), C: z.string() }),
      correct: z.enum(["A", "B", "C"]),
      explanation: z.string(),
    })
  ),
});

export type QuizQuestion = z.infer<typeof QuizSchema>["questions"][number] & {
  subtopicName: string;
  topicId: number;
};

export type QuizResult = { questions: QuizQuestion[] } | { error: string };

export async function generateQuiz(): Promise<QuizResult> {
  try {
    const topics = await getTopicsWithStats();
    const weak = weakestSubtopics(topics, 3);
    const topicIds = new Set(weak.map((w) => w.topicId));
    const readings = listReadings().filter((r) => r.topicId !== null && topicIds.has(r.topicId));

    // Preguntas que ya fallé en esos subtemas: pistas de mis errores típicos
    const missed = allRows<{ subtopic: string; text: string; note: string | null }>(
      `SELECT st.name AS subtopic, mq.question_text AS text, mq.note
       FROM missed_questions mq
       JOIN sessions s ON s.id = mq.session_id
       JOIN subtopics st ON st.id = s.subtopic_id
       WHERE s.subtopic_id IN (${weak.map(() => "?").join(",")}) AND mq.question_text != ''
       ORDER BY mq.id DESC LIMIT 10`,
      ...weak.map((w) => w.id)
    );

    const prompt = [
      "Genera EXACTAMENTE 5 preguntas nuevas estilo examen CFA Level I sobre estos subtemas débiles del estudiante (repártelas: 2, 2 y 1, empezando por el más débil):",
      ...weak.map(
        (w) =>
          `- subtopic_id ${w.id}: ${w.name} [${w.topicName}] — nivel actual ${
            w.current === null ? "sin práctica" : formatPct(w.current)
          }`
      ),
      "",
      missed.length
        ? `Preguntas que ya falló en estos subtemas (evalúa conceptos parecidos, no las copies):\n${missed
            .map((m) => `- [${m.subtopic}] ${m.text.slice(0, 300)}${m.note ? ` (su nota: ${m.note})` : ""}`)
            .join("\n")}`
        : "",
      "",
      "Requisitos:",
      "- Enunciado y opciones en inglés, como en el examen real; la explicación en español.",
      "- Exactamente 3 opciones (A, B, C), una sola correcta, con distractores plausibles (errores típicos).",
      "- Incluye cálculos cuando el subtema lo permita.",
      "- En 'explanation', explica por qué la correcta es correcta y por qué cada distractor es incorrecto.",
      "- Usa el subtopic_id correspondiente en cada pregunta.",
    ].join("\n");

    const response = await getClient().beta.messages.parse({
      model: MODEL,
      max_tokens: 16000,
      system: [{ type: "text", text: TUTOR_SYSTEM }],
      messages: [
        { role: "user", content: [...readingBlocks(readings), { type: "text", text: prompt }] },
      ],
      output_config: { format: betaZodOutputFormat(QuizSchema) },
      ...fallbackParams(),
    });

    if (response.stop_reason === "refusal")
      return { error: "El modelo no pudo generar las preguntas. Intenta de nuevo." };
    if (!response.parsed_output) return { error: "La respuesta llegó incompleta. Intenta de nuevo." };

    const byId = new Map(weak.map((w) => [w.id, w]));
    const questions = response.parsed_output.questions.slice(0, 5).map((q) => {
      const sub = byId.get(q.subtopic_id) ?? weak[0]; // por si el modelo se equivoca de id
      return { ...q, subtopic_id: sub.id, subtopicName: sub.name, topicId: sub.topicId };
    });
    return { questions };
  } catch (error) {
    return { error: friendlyError(error) };
  }
}

// Guarda las respuestas del quiz como sesiones (una por subtema) y las
// falladas como preguntas falladas, con la explicación del tutor ya lista.
export async function saveQuizResults(
  questions: QuizQuestion[],
  answers: ("A" | "B" | "C")[]
): Promise<{ ok: true } | { error: string }> {
  if (questions.length === 0 || answers.length !== questions.length)
    return { error: "Responde todas las preguntas antes de guardar." };

  const db = getDb();
  const today = await getTodayISO();
  const bySubtopic = new Map<number, number[]>();
  questions.forEach((q, i) => {
    bySubtopic.set(q.subtopic_id, [...(bySubtopic.get(q.subtopic_id) ?? []), i]);
  });

  db.exec("BEGIN");
  try {
    for (const [subtopicId, idxs] of bySubtopic) {
      const topicId = questions[idxs[0]].topicId;
      // confirma que el subtema existe y pertenece al tema
      const ok = db
        .prepare("SELECT 1 FROM subtopics WHERE id = ? AND topic_id = ?")
        .get(subtopicId, topicId);
      if (!ok) throw new Error("Subtema inválido");

      const correct = idxs.filter((i) => answers[i] === questions[i].correct).length;
      const r = db
        .prepare(
          `INSERT INTO sessions (date, topic_id, subtopic_id, num_questions, num_correct, notes)
           VALUES (?, ?, ?, ?, ?, 'Preguntas generadas por el tutor IA')`
        )
        .run(today, topicId, subtopicId, idxs.length, correct);
      const sessionId = Number(r.lastInsertRowid);

      for (const i of idxs.filter((i) => answers[i] !== questions[i].correct)) {
        const q = questions[i];
        const text = `${q.question}\n\nA. ${q.options.A}\nB. ${q.options.B}\nC. ${q.options.C}`;
        const m = db
          .prepare(
            `INSERT INTO missed_questions (session_id, question_text, my_answer, correct_answer, note)
             VALUES (?, ?, ?, ?, NULL)`
          )
          .run(sessionId, text, answers[i], q.correct);
        db.prepare("INSERT INTO ai_explanations (missed_question_id, content) VALUES (?, ?)").run(
          Number(m.lastInsertRowid),
          q.explanation
        );
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    console.error(error);
    return { error: "No se pudieron guardar los resultados." };
  }
  revalidatePath("/");
  revalidatePath("/sesiones");
  return { ok: true };
}
