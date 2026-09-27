// Detalle de un tema: nivel actual, evolución en el tiempo y subtemas
// ordenados de peor a mejor (los que no tienen datos van al final).

import Link from "next/link";
import { notFound } from "next/navigation";
import EvolutionChart from "@/components/EvolutionChart";
import ScoreBar from "@/components/ScoreBar";
import StatusBadge from "@/components/StatusBadge";
import { MIN_QUESTIONS_RELIABLE, RECENCY_HALF_LIFE_DAYS, TARGET_PCT } from "@/lib/config";
import { getSessionsLite, getTopicsWithStats } from "@/lib/data";
import { evolution } from "@/lib/stats";
import { formatPct } from "@/lib/status";

export default async function TopicPage({ params }: PageProps<"/temas/[id]">) {
  const { id } = await params;
  const topics = await getTopicsWithStats();
  const index = topics.findIndex((t) => String(t.id) === id);
  if (index === -1) notFound();
  const topic = topics[index];
  const sessions = await getSessionsLite(topic.id);

  // Peor → mejor según nivel actual; sin datos al final (en orden del currículo)
  const withData = topic.subtopics
    .filter((s) => s.score.current !== null)
    .sort((a, b) => a.score.current! - b.score.current!);
  const withoutData = topic.subtopics.filter((s) => s.score.current === null);
  // Sesiones "Varios / todo el tema" (sin subtema) cuentan para el tema, no para un subtema
  const mixedQuestions = sessions
    .filter((s) => s.subtopicId === null)
    .reduce((sum, s) => sum + s.numQuestions, 0);

  const { current, historic, questions } = topic.score;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <Link href="/" className="text-sm text-slate-500 hover:underline">← Dashboard</Link>

      {/* Encabezado del tema */}
      <header className="mt-3 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">
            Tema {index + 1} · Peso en el examen {topic.weightMin}–{topic.weightMax} %
          </p>
          <h1 className="text-2xl font-bold">{topic.name}</h1>
        </div>
        <div className="flex gap-2">
          <Link href={`/sesiones?tema=${topic.id}`}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50">
            Historial
          </Link>
          <Link href={`/sesiones/nueva?tema=${topic.id}`}
            className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700">
            + Registrar sesión
          </Link>
        </div>
      </header>

      {/* Nivel actual + evolución */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2">
          <div>
            <p className="text-xs text-slate-500">Nivel actual</p>
            <p className="text-5xl font-bold">{formatPct(current)}</p>
          </div>
          <StatusBadge pct={current} />
          <p className="text-sm text-slate-600">
            {questions > 0
              ? <>Histórico {formatPct(historic)} · {questions} preguntas · {sessions.length} sesiones</>
              : "Aún no hay sesiones de este tema."}
          </p>
        </div>
        <EvolutionChart points={evolution(sessions)} />
      </section>

      {/* Subtemas */}
      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold">Subtemas, de peor a mejor</h2>
        <p className="mt-1 text-sm text-slate-500">
          Nivel actual de cada subtema (lo de hace {RECENCY_HALF_LIFE_DAYS} días cuenta la mitad).
          La raya negra marca la meta de {TARGET_PCT} %.
        </p>

        <ol className="mt-4 divide-y divide-slate-100">
          {withData.map((s) => (
            <li key={s.id} className="py-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium">{s.name}</p>
                  <p className="text-xs text-slate-500">
                    {s.score.questions} preguntas · histórico {formatPct(s.score.historic)}
                    {s.score.questions < MIN_QUESTIONS_RELIABLE && " · pocos datos todavía"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-lg font-semibold tabular-nums">{formatPct(s.score.current)}</span>
                  <StatusBadge pct={s.score.current} />
                </div>
              </div>
              <div className="mt-2"><ScoreBar pct={s.score.current} /></div>
            </li>
          ))}
          {withoutData.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-3 py-3 text-slate-500">
              <p>{s.name}</p>
              <StatusBadge pct={null} />
            </li>
          ))}
        </ol>

        {mixedQuestions > 0 && (
          <p className="mt-3 text-xs text-slate-500">
            {mixedQuestions} preguntas se registraron como “Varios / todo el tema”: cuentan para
            el nivel del tema, pero no para ningún subtema.
          </p>
        )}
      </section>
    </main>
  );
}
