// Consultas que usan las páginas. Todo corre en el servidor.

import { connection } from "next/server";
import { allRows } from "./db";
import { EXAM_DATE } from "./config";
import { pctOf } from "./status";

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
  // node:sqlite es síncrono: sin esto, Next.js ejecutaría la consulta
  // una sola vez al compilar y la página mostraría datos viejos.
  await connection();

  const topics = allRows<Omit<TopicWithStats, "pct" | "subtopics">>(
    `SELECT t.id, t.name,
              t.weight_min AS weightMin, t.weight_max AS weightMax,
              COALESCE(SUM(s.num_questions), 0) AS questions,
              COALESCE(SUM(s.num_correct), 0)   AS correct
       FROM topics t
       LEFT JOIN sessions s ON s.topic_id = t.id
       GROUP BY t.id
       ORDER BY t.sort_order`
  );

  return topics.map((t) => ({
    ...t,
    pct: pctOf(t.correct, t.questions),
    subtopics: allRows<Subtopic>(
      `SELECT id, name FROM subtopics WHERE topic_id = ? ORDER BY sort_order`,
      t.id
    ),
  }));
}

export type MissedQuestion = {
  id: number;
  questionText: string;
  myAnswer: string;
  correctAnswer: string;
  note: string | null;
};

export type SessionRow = {
  id: number;
  date: string; // AAAA-MM-DD
  topicId: number;
  topicName: string;
  subtopicName: string | null;
  numQuestions: number;
  numCorrect: number;
  notes: string | null;
  missed: MissedQuestion[];
};

// Historial de sesiones (más recientes primero). Si se pasa topicId,
// solo las de ese tema. Cada sesión trae sus preguntas falladas.
export async function getSessions(topicId?: number): Promise<SessionRow[]> {
  await connection();

  const sql = `
    SELECT s.id, s.date, s.topic_id AS topicId, t.name AS topicName,
           st.name AS subtopicName,
           s.num_questions AS numQuestions, s.num_correct AS numCorrect, s.notes
    FROM sessions s
    JOIN topics t ON t.id = s.topic_id
    LEFT JOIN subtopics st ON st.id = s.subtopic_id
    ${topicId ? "WHERE s.topic_id = ?" : ""}
    ORDER BY s.date DESC, s.id DESC`;
  const params = topicId ? [topicId] : [];
  const sessions = allRows<Omit<SessionRow, "missed">>(sql, ...params);

  return sessions.map((s) => ({
    ...s,
    missed: allRows<MissedQuestion>(
      `SELECT id, question_text AS questionText, my_answer AS myAnswer,
              correct_answer AS correctAnswer, note
       FROM missed_questions WHERE session_id = ? ORDER BY id`,
      s.id
    ),
  }));
}

// Fecha de hoy en formato AAAA-MM-DD, según el reloj del computador.
export async function getTodayISO(): Promise<string> {
  await connection();
  const now = new Date();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${mm}-${dd}`;
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
