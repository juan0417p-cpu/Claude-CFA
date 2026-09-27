// Práctica: 5 preguntas nuevas sobre mis 3 subtemas más débiles.

import QuizRunner from "@/components/QuizRunner";
import StatusBadge from "@/components/StatusBadge";
import { getTopicsWithStats } from "@/lib/data";
import { formatPct } from "@/lib/status";
import { listReadings, weakestSubtopics } from "@/lib/tutor-context";

export default async function PracticePage() {
  const topics = await getTopicsWithStats();
  const weak = weakestSubtopics(topics, 3);
  const topicIds = new Set(weak.map((w) => w.topicId));
  const readings = listReadings().filter((r) => r.topicId !== null && topicIds.has(r.topicId));

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Tus 3 subtemas más débiles</h2>
        <ol className="mt-3 space-y-2">
          {weak.map((w, i) => (
            <li key={w.id} className="flex items-center justify-between gap-3 text-sm">
              <span>
                <span className="text-slate-400">{i + 1}.</span> <span className="font-medium">{w.name}</span>
                <span className="text-slate-500"> · {w.topicName}</span>
              </span>
              <span className="flex shrink-0 items-center gap-2">
                <span className="font-semibold tabular-nums">{formatPct(w.current)}</span>
                <StatusBadge pct={w.current} />
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-3 text-xs text-slate-500">
          {weak.some((w) => w.current === null) && "Los subtemas sin práctica se eligen de tus temas más débiles. "}
          {readings.length > 0
            ? `El tutor usará ${readings.length} lectura(s) de estos temas como referencia.`
            : "Si subes PDFs de estos temas en “Lecturas”, el tutor los usará como referencia."}
        </p>
      </section>
      <QuizRunner />
    </div>
  );
}
