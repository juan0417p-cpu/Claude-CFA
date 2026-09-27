// Arma el "contexto" que recibe el tutor: mis estadísticas, mis subtemas
// débiles, mis lecturas (PDF) y las fotos de una pregunta fallada.
import "server-only";
import type Anthropic from "@anthropic-ai/sdk";
import { allRows, getDb } from "./db";
import { getDaysUntilExam, getTopicsWithStats, type TopicWithStats } from "./data";
import { TARGET_PCT } from "./config";
import { formatPct } from "./status";

type ContentBlock = Anthropic.Beta.BetaContentBlockParam;

export type WeakSubtopic = {
  id: number;
  name: string;
  topicId: number;
  topicName: string;
  current: number | null; // null = sin práctica
};

// Los N subtemas más débiles: primero los que tienen datos (peor nivel actual);
// si faltan, se completan con subtemas sin práctica de los temas más débiles.
export function weakestSubtopics(topics: TopicWithStats[], n = 3): WeakSubtopic[] {
  const all = topics.flatMap((t) =>
    t.subtopics.map((s) => ({
      id: s.id,
      name: s.name,
      topicId: t.id,
      topicName: t.name,
      current: s.score.current,
      topicCurrent: t.score.current ?? 0,
      topicWeight: t.weightMax,
    }))
  );
  const withData = all
    .filter((s) => s.current !== null)
    .sort((a, b) => a.current! - b.current!);
  const withoutData = all
    .filter((s) => s.current === null)
    // temas con peor nivel primero; a igualdad, los de más peso en el examen
    .sort((a, b) => a.topicCurrent - b.topicCurrent || b.topicWeight - a.topicWeight);
  return [...withData, ...withoutData].slice(0, n).map((s) => ({
    id: s.id,
    name: s.name,
    topicId: s.topicId,
    topicName: s.topicName,
    current: s.current,
  }));
}

// Resumen en texto de cómo voy, para que el tutor enfoque sus respuestas.
export async function statsSummary(): Promise<string> {
  const topics = await getTopicsWithStats();
  const daysLeft = await getDaysUntilExam();
  const weak = weakestSubtopics(topics, 5).filter((s) => s.current !== null);

  const topicLines = topics.map((t, i) => {
    const s = t.score;
    const level = s.questions > 0
      ? `nivel actual ${formatPct(s.current)} (histórico ${formatPct(s.historic)}, ${s.questions} preguntas)`
      : "sin práctica todavía";
    return `${i + 1}. ${t.name} (peso ${t.weightMin}-${t.weightMax} %): ${level}`;
  });

  const recentMissed = allRows<{ topic: string; subtopic: string | null; text: string }>(
    `SELECT t.name AS topic, st.name AS subtopic, mq.question_text AS text
     FROM missed_questions mq
     JOIN sessions s ON s.id = mq.session_id
     JOIN topics t ON t.id = s.topic_id
     LEFT JOIN subtopics st ON st.id = s.subtopic_id
     ORDER BY s.date DESC, mq.id DESC LIMIT 8`
  );

  return [
    `Días que faltan para el examen (17-nov-2026): ${daysLeft}.`,
    `Meta del estudiante: al menos ${TARGET_PCT} % en cada tema. "Nivel actual" pondera más las sesiones recientes.`,
    "",
    "Estado por tema:",
    ...topicLines,
    "",
    weak.length
      ? `Subtemas más débiles: ${weak.map((s) => `${s.name} [${s.topicName}] ${formatPct(s.current)}`).join("; ")}.`
      : "Aún no hay suficientes datos por subtema.",
    "",
    ...(recentMissed.length
      ? [
          "Últimas preguntas falladas (resumen):",
          ...recentMissed.map(
            (m) => `- [${m.topic}${m.subtopic ? ` / ${m.subtopic}` : ""}] ${m.text ? m.text.slice(0, 160) : "(solo foto)"}`
          ),
        ]
      : []),
  ].join("\n");
}

export type Reading = {
  id: number;
  topicId: number | null;
  topicName: string | null;
  name: string;
  fileId: string;
  sizeBytes: number;
  createdAt: string;
};

export function listReadings(): Reading[] {
  return allRows<Reading>(
    `SELECT r.id, r.topic_id AS topicId, t.name AS topicName, r.name, r.file_id AS fileId,
            r.size_bytes AS sizeBytes, r.created_at AS createdAt
     FROM readings r LEFT JOIN topics t ON t.id = r.topic_id
     ORDER BY t.sort_order, r.name`
  );
}

// Bloques "document" (PDF ya subido a Anthropic) para meter en un mensaje.
export function readingBlocks(readings: Reading[]): ContentBlock[] {
  return readings.map((r) => ({
    type: "document",
    source: { type: "file", file_id: r.fileId },
    title: r.topicName ? `${r.name} (${r.topicName})` : r.name,
  }));
}

export type MissedForTutor = {
  id: number;
  topicId: number;
  topicName: string;
  subtopicName: string | null;
  questionText: string;
  myAnswer: string;
  correctAnswer: string;
  note: string | null;
};

export function getMissedForTutor(id: number): MissedForTutor | undefined {
  return allRows<MissedForTutor>(
    `SELECT mq.id, s.topic_id AS topicId, t.name AS topicName, st.name AS subtopicName,
            mq.question_text AS questionText, mq.my_answer AS myAnswer,
            mq.correct_answer AS correctAnswer, mq.note
     FROM missed_questions mq
     JOIN sessions s ON s.id = mq.session_id
     JOIN topics t ON t.id = s.topic_id
     LEFT JOIN subtopics st ON st.id = s.subtopic_id
     WHERE mq.id = ?`,
    id
  )[0];
}

// Fotos de una pregunta como bloques "image" en base64 (así las ve Claude).
export function imageBlocks(missedQuestionId: number): ContentBlock[] {
  const rows = getDb()
    .prepare(
      `SELECT media_type, data FROM missed_question_images
       WHERE missed_question_id = ? ORDER BY id`
    )
    .all(missedQuestionId) as unknown as { media_type: string; data: Uint8Array }[];
  return rows.map((r) => ({
    type: "image",
    source: {
      type: "base64",
      media_type: r.media_type as "image/jpeg" | "image/png" | "image/webp" | "image/gif",
      data: Buffer.from(r.data).toString("base64"),
    },
  }));
}
