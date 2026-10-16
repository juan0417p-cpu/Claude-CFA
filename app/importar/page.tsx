// Importar un mock completo (simulacro) desde un archivo .json.

import MockImport from "@/components/MockImport";
import { getTodayISO } from "@/lib/data";

export default async function ImportPage() {
  const today = await getTodayISO();
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">Importar mock</h1>
      <p className="mb-6 mt-1 text-sm text-slate-600">
        Se crea una sesión por subtema con la nota “Mock: …”. Las preguntas falladas y las
        acertadas al azar quedan en el historial, listas para el botón 🤖 Explícame.
      </p>
      <MockImport today={today} />
    </main>
  );
}
