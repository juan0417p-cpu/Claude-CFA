// Semáforo según el % de aciertos, comparado con la meta.
// Se usa en las tarjetas del dashboard y en el historial.

import { TARGET_PCT } from "./config";

export function statusFor(pct: number | null) {
  if (pct === null)
    return { label: "Sin datos", badge: "bg-slate-100 text-slate-600", bar: "bg-slate-300" };
  if (pct >= TARGET_PCT)
    return { label: "En meta", badge: "bg-emerald-100 text-emerald-800", bar: "bg-emerald-500" };
  if (pct >= 60)
    return { label: "En riesgo", badge: "bg-amber-100 text-amber-800", bar: "bg-amber-500" };
  return { label: "Débil", badge: "bg-red-100 text-red-800", bar: "bg-red-500" };
}

// % de aciertos (o null si no hay preguntas).
export function pctOf(correct: number, questions: number) {
  return questions > 0 ? (100 * correct) / questions : null;
}
