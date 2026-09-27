// Semáforo según el % de aciertos, comparado con la meta:
//   verde ≥ 70 % · amarillo 60–69 % · rojo < 60 % · gris sin datos.
// Siempre va con ícono + texto (nunca solo el color).

import { TARGET_PCT } from "./config";

export function statusFor(pct: number | null) {
  if (pct === null)
    return { icon: "–", label: "Sin datos", badge: "bg-slate-100 text-slate-600", bar: "bg-slate-300" };
  if (pct >= TARGET_PCT)
    return { icon: "✓", label: "En meta", badge: "bg-emerald-100 text-emerald-800", bar: "bg-emerald-500" };
  if (pct >= 60)
    return { icon: "!", label: "En riesgo", badge: "bg-amber-100 text-amber-800", bar: "bg-amber-500" };
  return { icon: "✕", label: "Débil", badge: "bg-red-100 text-red-800", bar: "bg-red-500" };
}

// % de aciertos (o null si no hay preguntas).
export function pctOf(correct: number, questions: number) {
  return questions > 0 ? (100 * correct) / questions : null;
}

// 72.4 → "72 %", null → "—"
export function formatPct(pct: number | null) {
  return pct === null ? "—" : `${Math.round(pct)} %`;
}
