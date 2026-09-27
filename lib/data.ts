// Consultas que usan las páginas. Todo corre en el servidor.

import { connection } from "next/server";
import { allRows } from "./db";
import { EXAM_DATE } from "./config";
import { score, type Score, type SessionLite } from "./stats";

export type SubtopicWithScore = { id: number; name: string; score: Score };

export type TopicWithStats = {
  id: number;
  name: string;
  weightMin: number;
  weightMax: number;
  score: Score; // nivel actual (ponderado) e histórico del tema
  subtopics: SubtopicWithScore[]; // en el orden del currículo
};

// Todas las sesiones en versión liviana (para cálculos). Opcional: solo un tema.
export async function getSessionsLite(topicId?: number): Promise<SessionLite[]> {
  await connection();
  return allRows<SessionLite>(
    `SELECT date, topic_id AS topicId, subtopic_id AS subtopicId,
            num_questions AS numQuestions, num_correct AS numCorrect
     FROM sessions
     ${topicId ? "WHERE topic_id = ?" : ""}
     ORDER BY date`,
    ...(topicId ? [topicId] : [])
  );
}

// Devuelve los 10 temas con sus subtemas, cada uno con su nivel actual.
export async function getTopicsWithStats(): Promise<TopicWithStats[]> {
  // node:sqlite es síncrono: sin esto, Next.js ejecutaría la consulta
  // una sola vez al compilar y la página mostraría datos viejos.
  await connection();
  const today = await getTodayISO();
  const sessions = await getSessionsLite();

  const topics = allRows<Omit<TopicWithStats, "score" | "subtopics">>(
    `SELECT id, name, weight_min AS weightMin, weight_max AS weightMax
     FROM topics ORDER BY sort_order`
  );
  const subtopics = allRows<{ id: number; topicId: number; name: string }>(
    `SELECT id, topic_id AS topicId, name FROM subtopics ORDER BY sort_order`
  );

  return topics.map((t) => ({
    ...t,
    score: score(sessions.filter((s) => s.topicId === t.id), today),
    subtopics: subtopics
      .filter((st) => st.topicId === t.id)
      .map((st) => ({
        id: st.id,
        name: st.name,
        score: score(sessions.filter((s) => s.subtopicId === st.id), today),
      })),
  }));
}

export type MissedQuestion = {
  id: number;
  questionText: string;
  myAnswer: string;
  correctAnswer: string;
  note: string | null;
  imageIds: number[]; // ids de sus fotos (se ven en /imagenes/<id>)
  explanation: string | null; // explicación guardada del tutor IA
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
    missed: allRows<Omit<MissedQuestion, "imageIds">>(
      `SELECT mq.id, mq.question_text AS questionText, mq.my_answer AS myAnswer,
              mq.correct_answer AS correctAnswer, mq.note, ae.content AS explanation
       FROM missed_questions mq
       LEFT JOIN ai_explanations ae ON ae.missed_question_id = mq.id
       WHERE mq.session_id = ? ORDER BY mq.id`,
      s.id
    ).map((m) => ({
      ...m,
      imageIds: allRows<{ id: number }>(
        `SELECT id FROM missed_question_images WHERE missed_question_id = ? ORDER BY id`,
        m.id
      ).map((img) => img.id),
    })),
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
