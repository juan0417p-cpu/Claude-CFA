// Importa un mock (simulacro) completo desde un archivo JSON preparado a
// partir del PDF de respuestas y del Excel de mis respuestas.
//
// Qué guarda:
// - Una sesión por cada combinación tema/subtema, con nota "Mock: <nombre>".
// - Cada pregunta fallada (o sin responder) como pregunta fallada, con el
//   enunciado, las opciones, mi respuesta, la correcta y la explicación del mock.
// - Las que acerté AL AZAR también se guardan para repasarlas, marcadas con
//   lucky = 1. En el puntaje cuentan como correctas (así fue en el mock).
import "server-only";
import { z } from "zod";
import { allRows, getDb } from "./db";

const Letter = z.enum(["A", "B", "C"]);

export const MockFileSchema = z.object({
  format: z.literal("cfa-mock-v1"),
  name: z.string().min(1),
  questions: z
    .array(
      z.object({
        n: z.number().int(),
        topic: z.string(),
        subtopic: z.string(),
        stem: z.string(),
        options: z.object({ A: z.string(), B: z.string(), C: z.string() }),
        correct: Letter,
        mine: Letter.nullable(), // null = sin responder
        isCorrect: z.boolean(),
        guess: z.boolean(), // la respondí al azar
        explanation: z.string(),
      })
    )
    .min(1),
});

export type MockFile = z.infer<typeof MockFileSchema>;

export type ImportSummary = {
  sessions: number;
  questions: number;
  correct: number;
  missed: number;
  lucky: number;
};

export function mockNote(name: string) {
  return `Mock: ${name}`;
}

export function importMock(file: MockFile, date: string): ImportSummary {
  const db = getDb();

  // Ya importado (mismo nombre) → no duplicar
  const exists = db.prepare("SELECT 1 FROM sessions WHERE notes = ? LIMIT 1").get(mockNote(file.name));
  if (exists) throw new Error(`El mock "${file.name}" ya está importado. Borra sus sesiones en el Historial si quieres volver a importarlo.`);

  // Nombres de tema/subtema → ids de la base de datos
  const subtopics = allRows<{ id: number; topicId: number; topic: string; subtopic: string }>(
    `SELECT st.id, st.topic_id AS topicId, t.name AS topic, st.name AS subtopic
     FROM subtopics st JOIN topics t ON t.id = st.topic_id`
  );
  const key = (topic: string, sub: string) => `${topic}||${sub}`;
  const byName = new Map(subtopics.map((s) => [key(s.topic, s.subtopic), s]));
  const unknown = [...new Set(file.questions.map((q) => key(q.topic, q.subtopic)))].filter((k) => !byName.has(k));
  if (unknown.length) throw new Error(`Subtemas desconocidos: ${unknown.map((k) => k.replace("||", " / ")).join("; ")}`);

  // Agrupar por subtema
  const groups = new Map<string, MockFile["questions"]>();
  for (const q of file.questions) {
    const k = key(q.topic, q.subtopic);
    groups.set(k, [...(groups.get(k) ?? []), q]);
  }

  const insertSession = db.prepare(
    `INSERT INTO sessions (date, topic_id, subtopic_id, num_questions, num_correct, notes)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  const insertMissed = db.prepare(
    `INSERT INTO missed_questions (session_id, question_text, my_answer, correct_answer, note, lucky)
     VALUES (?, ?, ?, ?, ?, ?)`
  );

  const summary: ImportSummary = { sessions: 0, questions: 0, correct: 0, missed: 0, lucky: 0 };
  db.exec("BEGIN");
  try {
    for (const [k, qs] of groups) {
      const sub = byName.get(k)!;
      const correct = qs.filter((q) => q.isCorrect).length;
      const r = insertSession.run(date, sub.topicId, sub.id, qs.length, correct, mockNote(file.name));
      const sessionId = Number(r.lastInsertRowid);
      summary.sessions++;
      summary.questions += qs.length;
      summary.correct += correct;

      for (const q of qs.sort((a, b) => a.n - b.n)) {
        const lucky = q.isCorrect && q.guess;
        if (q.isCorrect && !lucky) continue; // las que sabía no hace falta repasarlas
        const text = `${q.stem}\n\nA. ${q.options.A}\nB. ${q.options.B}\nC. ${q.options.C}`;
        const note = [
          `Pregunta #${q.n} del mock.`,
          lucky ? "La acerté al azar: repasar el concepto." : q.guess ? "La respondí al azar." : "",
          `Explicación del mock: ${q.explanation}`,
        ].filter(Boolean).join(" ");
        insertMissed.run(sessionId, text, q.mine ?? "(sin responder)", q.correct, note, lucky ? 1 : 0);
        if (lucky) summary.lucky++;
        else summary.missed++;
      }
    }
    db.exec("COMMIT");
  } catch (error) {
    db.exec("ROLLBACK");
    throw error;
  }
  return summary;
}
