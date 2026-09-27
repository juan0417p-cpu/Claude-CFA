// Cálculos del análisis (fase 3). Son funciones puras: reciben sesiones y
// devuelven números, sin tocar la base de datos. Nada de esto se guarda.

import { RECENCY_HALF_LIFE_DAYS } from "./config";

export type SessionLite = {
  date: string; // AAAA-MM-DD
  topicId: number;
  subtopicId: number | null;
  numQuestions: number;
  numCorrect: number;
};

export type Score = {
  current: number | null; // "nivel actual": % ponderado por lo reciente
  historic: number | null; // % simple de todas las sesiones
  questions: number; // total de preguntas hechas
  lastDate: string | null; // última sesión
};

const MS_PER_DAY = 24 * 60 * 60 * 1000;

// "2026-09-27" → número de día (sin horas, sin problemas de zona horaria)
function dayNumber(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d) / MS_PER_DAY;
}

// Peso de una sesión según su antigüedad: 1 hoy, 0.5 a los 14 días, 0.25 a los 28…
export function recencyWeight(sessionDate: string, today: string) {
  const ageDays = Math.max(0, dayNumber(today) - dayNumber(sessionDate));
  return Math.pow(0.5, ageDays / RECENCY_HALF_LIFE_DAYS);
}

// Nivel actual e histórico de un grupo de sesiones.
// Nivel actual = Σ(aciertos × peso) / Σ(preguntas × peso)
export function score(sessions: SessionLite[], today: string): Score {
  let q = 0, c = 0, wq = 0, wc = 0;
  let lastDate: string | null = null;
  for (const s of sessions) {
    if (s.date > today) continue; // ignora sesiones con fecha futura
    const w = recencyWeight(s.date, today);
    q += s.numQuestions;
    c += s.numCorrect;
    wq += s.numQuestions * w;
    wc += s.numCorrect * w;
    if (!lastDate || s.date > lastDate) lastDate = s.date;
  }
  return {
    current: wq > 0 ? (100 * wc) / wq : null,
    historic: q > 0 ? (100 * c) / q : null,
    questions: q,
    lastDate,
  };
}

export type EvolutionPoint = {
  date: string;
  dayPct: number; // resultado de ese día (sin ponderar)
  dayQuestions: number;
  currentPct: number; // nivel actual calculado con lo que había hasta ese día
};

// Evolución: un punto por cada día con práctica.
export function evolution(sessions: SessionLite[]): EvolutionPoint[] {
  const dates = [...new Set(sessions.map((s) => s.date))].sort();
  return dates.map((date) => {
    const thatDay = sessions.filter((s) => s.date === date);
    const dq = thatDay.reduce((sum, s) => sum + s.numQuestions, 0);
    const dc = thatDay.reduce((sum, s) => sum + s.numCorrect, 0);
    const upToDate = sessions.filter((s) => s.date <= date);
    return {
      date,
      dayPct: (100 * dc) / dq,
      dayQuestions: dq,
      currentPct: score(upToDate, date).current ?? 0,
    };
  });
}
