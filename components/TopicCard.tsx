// Tarjeta de un tema: nombre, peso en el examen, % de aciertos con
// semáforo respecto a la meta, y la lista de subtemas (desplegable).

import type { TopicWithStats } from "@/lib/data";
import Link from "next/link";
import { TARGET_PCT } from "@/lib/config";
import { statusFor } from "@/lib/status";

export default function TopicCard({
  topic,
  number,
}: {
  topic: TopicWithStats;
  number: number;
}) {
  const status = statusFor(topic.pct);

  return (
    <article className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Tema {number} · Peso {topic.weightMin}–{topic.weightMax} %
          </p>
          <h2 className="mt-1 text-lg font-semibold leading-snug">{topic.name}</h2>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${status.badge}`}>
          {status.label}
        </span>
      </header>

      {/* % de aciertos y barra de progreso con la marca de la meta */}
      <div className="mt-4">
        <div className="flex items-baseline justify-between">
          <span className="text-3xl font-bold">
            {topic.pct === null ? "—" : `${Math.round(topic.pct)} %`}
          </span>
          <span className="text-sm text-slate-500">
            {topic.correct}/{topic.questions} aciertos
          </span>
        </div>
        <div className="relative mt-2 h-2 rounded-full bg-slate-100">
          <div
            className={`h-2 rounded-full ${status.bar}`}
            style={{ width: `${topic.pct ?? 0}%` }}
          />
          <div
            className="absolute -top-1 h-4 w-0.5 bg-slate-700"
            style={{ left: `${TARGET_PCT}%` }}
            title={`Meta ${TARGET_PCT} %`}
          />
        </div>
        <p className="mt-1 text-xs text-slate-500">Meta: {TARGET_PCT} %</p>
      </div>

      {/* <details> muestra/oculta la lista sin necesidad de JavaScript */}
      <details className="mt-4 text-sm">
        <summary className="cursor-pointer select-none font-medium text-slate-700">
          {topic.subtopics.length} subtemas
        </summary>
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-slate-600">
          {topic.subtopics.map((s) => (
            <li key={s.id}>{s.name}</li>
          ))}
        </ol>
      </details>

      <div className="mt-4 flex gap-4 border-t border-slate-100 pt-3 text-sm font-medium">
        <Link href={`/sesiones?tema=${topic.id}`} className="text-slate-700 hover:underline">
          Ver historial
        </Link>
        <Link href={`/sesiones/nueva?tema=${topic.id}`} className="text-blue-700 hover:underline">
          + Registrar sesión
        </Link>
      </div>
    </article>
  );
}
