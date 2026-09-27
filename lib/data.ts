// Consultas que usan las páginas. Todo corre en el servidor.

import { connection } from "next/server";
import { getDb } from "./db";
import { EXAM_DATE } from "./config";

export type Subtopic = { id: number; name: string };

export type TopicWithStats = {
  id: number;
  name: string;
  weightMin: number;
  weightMax: number;
  questions: number; // total de preguntas practicadas
  correct: number; // total de aciertos
  pct: number | null; // % de aciertos (null si aún no hay datos)
  subtopics: Subtopic[];
};

// Devuelve los 10 temas, con sus subtemas y sus aciertos acumulados.
export async function getTopicsWithStats(): Promise<TopicWithStats[]> {
  // better-sqlite3 es síncrono: sin esto, Next.js ejecutaría la consulta
  // una sola vez al compilar y la página mostraría datos viejos.
  await connection();
  const db = getDb();

  const topics = db
    .prepare(
      `SELECT t.id, t.name,
              t.weight_min AS weightMin, t.weight_max AS weightMax,
              COALESCE(SUM(s.num_questions), 0) AS questions,
              COALESCE(SUM(s.num_correct), 0)   AS correct
       FROM topics t
       LEFT JOIN sessions s ON s.topic_id = t.id
       GROUP BY t.id
       ORDER BY t.sort_order`
    )
    .all() as Omit<TopicWithStats, "pct" | "subtopics">[];

  const subtopicsStmt = db.prepare(
    `SELECT id, name FROM subtopics WHERE topic_id = ? ORDER BY sort_order`
  );

  return topics.map((t) => ({
    ...t,
    pct: t.questions > 0 ? (100 * t.correct) / t.questions : null,
    subtopics: subtopicsStmt.all(t.id) as Subtopic[],
  }));
}

// Días completos que faltan para el examen, según la fecha local del computador.
export async function getDaysUntilExam(): Promise<number> {
  await connection(); // calcular con la fecha de hoy, no la de compilación
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const exam = new Date(EXAM_DATE.year, EXAM_DATE.month - 1, EXAM_DATE.day);
  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  // Math.round corrige el desfase de 1 hora por cambio de horario de verano.
  return Math.round((exam.getTime() - today.getTime()) / MS_PER_DAY);
}
