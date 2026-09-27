// Mis lecturas (PDF): subir, ver y borrar.

import ReadingUpload from "@/components/ReadingUpload";
import { deleteReading } from "@/app/tutor/actions";
import { getTopicsWithStats } from "@/lib/data";
import { listReadings } from "@/lib/tutor-context";

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

export default async function ReadingsPage() {
  const topics = await getTopicsWithStats();
  const readings = listReadings();

  return (
    <div className="space-y-6">
      <div className="rounded-xl bg-slate-100 p-4 text-sm text-slate-700">
        <p>
          Sube los PDF de tus lecturas y asígnales un tema. El tutor los usa así:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li><strong>Explícame</strong>: las lecturas del tema de la pregunta.</li>
          <li><strong>Practicar</strong>: las lecturas de los temas de tus subtemas débiles.</li>
          <li><strong>Chat</strong>: las que marques en “Lecturas como contexto”.</li>
        </ul>
        <p className="mt-2 text-xs text-slate-500">
          Los PDF se guardan en tu cuenta de Anthropic (Files API) hasta que los borres aquí.
          Máximo ~600 páginas por PDF: sube una lectura (Learning Module) por archivo, no el libro
          completo; además, cada PDF se cobra como texto cada vez que se usa.
        </p>
      </div>

      <ReadingUpload topics={topics.map((t) => ({ id: t.id, name: t.name }))} />

      <section>
        <h2 className="mb-3 font-semibold">Mis lecturas ({readings.length})</h2>
        {readings.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
            Aún no has subido lecturas.
          </p>
        ) : (
          <ul className="divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white shadow-sm">
            {readings.map((r) => (
              <li key={r.id} className="flex items-center justify-between gap-3 px-5 py-3 text-sm">
                <div className="min-w-0">
                  <p className="truncate font-medium">📄 {r.name}</p>
                  <p className="text-xs text-slate-500">
                    {r.topicName ?? "General"} · {formatSize(r.sizeBytes)}
                  </p>
                </div>
                <form action={deleteReading}>
                  <input type="hidden" name="readingId" value={r.id} />
                  <button type="submit" className="text-red-700 hover:underline">Borrar</button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
