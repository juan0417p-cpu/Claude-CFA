// Página principal (dashboard): cuenta regresiva, evolución general y
// tarjetas de los 10 temas.

import Countdown from "@/components/Countdown";
import EvolutionChart from "@/components/EvolutionChart";
import StatusBadge from "@/components/StatusBadge";
import TopicCard from "@/components/TopicCard";
import { RECENCY_HALF_LIFE_DAYS } from "@/lib/config";
import { getDaysUntilExam, getSessionsLite, getTodayISO, getTopicsWithStats } from "@/lib/data";
import { evolution, score } from "@/lib/stats";
import { formatPct } from "@/lib/status";

export default async function Home() {
  const daysLeft = await getDaysUntilExam();
  const topics = await getTopicsWithStats();
  const sessions = await getSessionsLite();
  const today = await getTodayISO();
  const overall = score(sessions, today);

  // Temas en meta (nivel actual ≥ 70 %)
  const onTarget = topics.filter((t) => (t.score.current ?? 0) >= 70).length;

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Countdown daysLeft={daysLeft} />

      <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold">Mi evolución (todos los temas)</h2>
            <p className="text-sm text-slate-500">
              Nivel actual: las sesiones de hace {RECENCY_HALF_LIFE_DAYS} días cuentan la mitad que las de hoy.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-right">
              <p className="text-xs text-slate-500">Nivel actual</p>
              <p className="flex items-center gap-2 text-3xl font-bold">
                {formatPct(overall.current)} <StatusBadge pct={overall.current} />
              </p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-500">Temas en meta</p>
              <p className="text-3xl font-bold">{onTarget}<span className="text-lg text-slate-400">/10</span></p>
            </div>
          </div>
        </div>
        <EvolutionChart points={evolution(sessions)} />
      </section>

      <section className="mt-6 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, i) => (
          <TopicCard key={topic.id} topic={topic} number={i + 1} />
        ))}
      </section>
    </main>
  );
}
