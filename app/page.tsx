// Página principal (dashboard): cuenta regresiva + tarjetas de los 10 temas.

import Countdown from "@/components/Countdown";
import TopicCard from "@/components/TopicCard";
import { getDaysUntilExam, getTopicsWithStats } from "@/lib/data";

export default async function Home() {
  const daysLeft = await getDaysUntilExam();
  const topics = await getTopicsWithStats();

  return (
    <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">CFA Nivel 1 — Monitor de estudio</h1>

      <Countdown daysLeft={daysLeft} />

      <section className="mt-8 grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {topics.map((topic, i) => (
          <TopicCard key={topic.id} topic={topic} number={i + 1} />
        ))}
      </section>
    </main>
  );
}
