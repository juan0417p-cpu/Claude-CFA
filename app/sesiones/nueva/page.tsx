// Página para registrar una sesión nueva. Acepta ?tema=ID para dejar
// el tema preseleccionado (se usa desde las tarjetas del dashboard).

import SessionForm from "@/components/SessionForm";
import { getTodayISO, getTopicsWithStats } from "@/lib/data";

export default async function NewSessionPage({ searchParams }: PageProps<"/sesiones/nueva">) {
  const { tema } = await searchParams;
  const topics = await getTopicsWithStats();
  const today = await getTodayISO();
  const initialTopicId = topics.find((t) => String(t.id) === tema)?.id;

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="mb-6 text-2xl font-bold">Registrar sesión de práctica</h1>
      <SessionForm topics={topics} today={today} initialTopicId={initialTopicId} />
    </main>
  );
}
