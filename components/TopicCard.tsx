// Tarjeta de un tema en el dashboard: nivel actual con semáforo, histórico,
// y su subtema más débil. Toda la tarjeta lleva al detalle del tema.

import Link from "next/link";
import type { TopicWithStats } from "@/lib/data";
import { MIN_QUESTIONS_RELIABLE, TARGET_PCT } from "@/lib/config";
import { formatPct } from "@/lib/status";
import ScoreBar from "./ScoreBar";
import StatusBadge from "./StatusBadge";

export default function TopicCard({
  topic,
  number,
}: {
  topic: TopicWithStats;
  number: number;
}) {
  const { current, historic, questions } = topic.score;

  // Subtema con peor nivel actual (entre los que tienen datos)
  const weakest = topic.subtopics
    .filter((s) => s.score.current !== null)
    .sort((a, b) => a.score.current! - b.score.current!)[0];

  return (
    <Link href={`/temas/${topic.id}`}
      className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow">
      <header className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Tema {number} · Peso {topic.weightMin}–{topic.weightMax} %
          </p>
          <h2 className="mt-1 text-lg font-semibold leading-snug group-hover:underline">{topic.name}</h2>
        </div>
        <StatusBadge pct={current} />
      </header>

      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-2">
          <span className="text-3xl font-bold">{formatPct(current)}</span>
          <span className="text-right text-xs text-slate-500">
            {questions > 0 ? <>Histórico {formatPct(historic)} · {questions} preguntas</> : "Sin práctica aún"}
          </span>
        </div>
        <div className="mt-2"><ScoreBar pct={current} /></div>
        <p className="mt-1 text-xs text-slate-500">
          Nivel actual · meta {TARGET_PCT} %
          {questions > 0 && questions < MIN_QUESTIONS_RELIABLE && " · pocos datos todavía"}
        </p>
      </div>

      <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-600">
        {weakest ? (
          <>Subtema más débil: <span className="font-medium text-slate-800">{weakest.name}</span>{" "}
            ({formatPct(weakest.score.current)})</>
        ) : (
          <>{topic.subtopics.length} subtemas</>
        )}
      </p>
    </Link>
  );
}
