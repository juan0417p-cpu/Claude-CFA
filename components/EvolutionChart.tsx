"use client";
// Gráfica de evolución en el tiempo.
// - Línea azul: "nivel actual" (ponderado: lo reciente pesa más), calculado
//   con lo que había hasta cada día.
// - Puntos grises: el resultado simple de cada día de práctica.
// - Línea horizontal: la meta de 70 %.
// Al pasar el mouse se ve el detalle del día; debajo hay una tabla con los
// mismos datos (para no depender del mouse ni del color).

import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { EvolutionPoint } from "@/lib/stats";
import { TARGET_PCT } from "@/lib/config";

// Colores (paleta validada para daltonismo; ver skill de visualización)
const COLOR_CURRENT = "#2a78d6"; // serie principal
const COLOR_DAY = "#898781"; // serie secundaria, apagada a propósito
const COLOR_GRID = "#e1e0d9";
const COLOR_AXIS = "#898781";
const COLOR_GOAL = "#52514e";
const SURFACE = "#ffffff";

// "2026-09-27" → milisegundos (el eje X es tiempo real: los días sin
// práctica dejan su espacio, en vez de pegar los puntos uno al lado del otro)
function toTime(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).getTime();
}

// fecha → "27 sep"
function shortDate(value: string | number) {
  const time = typeof value === "number" ? value : toTime(value);
  return new Date(time).toLocaleDateString("es", { day: "numeric", month: "short" });
}

const HALF_DAY = 12 * 60 * 60 * 1000;

type TooltipProps = {
  active?: boolean;
  payload?: { payload: EvolutionPoint & { t: number } }[];
};

function ChartTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-md">
      <p className="mb-1 text-xs text-slate-500">{shortDate(p.date)}</p>
      <p className="flex items-center gap-2">
        <span className="inline-block h-0.5 w-3" style={{ background: COLOR_CURRENT }} />
        <strong className="text-slate-900">{Math.round(p.currentPct)} %</strong>
        <span className="text-slate-500">nivel actual</span>
      </p>
      <p className="flex items-center gap-2">
        <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLOR_DAY }} />
        <strong className="text-slate-900">{Math.round(p.dayPct)} %</strong>
        <span className="text-slate-500">ese día ({p.dayQuestions} preguntas)</span>
      </p>
    </div>
  );
}

export default function EvolutionChart({ points }: { points: EvolutionPoint[] }) {
  if (points.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
        Registra sesiones para ver tu evolución.
      </p>
    );
  }

  const data = points.map((p) => ({ ...p, t: toTime(p.date) }));

  return (
    <div>
      {/* Leyenda (siempre visible: la identidad no depende solo del color) */}
      <div className="mb-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-4" style={{ background: COLOR_CURRENT }} />
          Nivel actual (lo reciente pesa más)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: COLOR_DAY }} />
          Resultado de cada día
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-px w-4" style={{ background: COLOR_GOAL }} />
          Meta {TARGET_PCT} %
        </span>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 16, bottom: 0, left: -16 }}>
            <CartesianGrid vertical={false} stroke={COLOR_GRID} />
            <XAxis dataKey="t" type="number" scale="time" tickFormatter={shortDate}
              domain={[(min: number) => min - HALF_DAY, (max: number) => max + HALF_DAY]}
              tick={{ fill: COLOR_AXIS, fontSize: 12 }} tickLine={false}
              axisLine={{ stroke: COLOR_GRID }} minTickGap={32} />
            <YAxis domain={[0, 100]} ticks={[0, 20, 40, 60, 80, 100]} unit=" %"
              tick={{ fill: COLOR_AXIS, fontSize: 12 }} tickLine={false} axisLine={false} />
            <ReferenceLine y={TARGET_PCT} stroke={COLOR_GOAL} strokeWidth={1} />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: COLOR_AXIS, strokeWidth: 1 }} />
            {/* Puntos del día: sin línea, solo marcadores */}
            <Line dataKey="dayPct" stroke="none" isAnimationActive={false}
              dot={{ r: 4, fill: COLOR_DAY, stroke: SURFACE, strokeWidth: 2 }}
              activeDot={{ r: 5, fill: COLOR_DAY, stroke: SURFACE, strokeWidth: 2 }} />
            <Line dataKey="currentPct" stroke={COLOR_CURRENT} strokeWidth={2} isAnimationActive={false}
              strokeLinecap="round" strokeLinejoin="round"
              dot={points.length <= 30 ? { r: 4, fill: COLOR_CURRENT, stroke: SURFACE, strokeWidth: 2 } : false}
              activeDot={{ r: 5, fill: COLOR_CURRENT, stroke: SURFACE, strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Los mismos datos en tabla */}
      <details className="mt-3 text-sm">
        <summary className="cursor-pointer select-none text-slate-600">Ver como tabla</summary>
        <table className="mt-2 w-full text-left tabular-nums">
          <thead className="text-xs text-slate-500">
            <tr>
              <th className="py-1 font-medium">Fecha</th>
              <th className="py-1 text-right font-medium">Preguntas</th>
              <th className="py-1 text-right font-medium">Ese día</th>
              <th className="py-1 text-right font-medium">Nivel actual</th>
            </tr>
          </thead>
          <tbody>
            {[...points].reverse().map((p) => (
              <tr key={p.date} className="border-t border-slate-100">
                <td className="py-1">{shortDate(p.date)}</td>
                <td className="py-1 text-right">{p.dayQuestions}</td>
                <td className="py-1 text-right">{Math.round(p.dayPct)} %</td>
                <td className="py-1 text-right font-medium">{Math.round(p.currentPct)} %</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
