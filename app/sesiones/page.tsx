// Historial de sesiones. Con ?tema=ID muestra solo las de ese tema.

import Link from "next/link";
import DeleteSessionButton from "@/components/DeleteSessionButton";
import ExplainButton from "@/components/ExplainButton";
import { getSessions, getTopicsWithStats } from "@/lib/data";
import { pctOf, statusFor } from "@/lib/status";

// "2026-09-27" → "27 sep 2026"
function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("es", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function SessionsPage({ searchParams }: PageProps<"/sesiones">) {
  const { tema, guardada } = await searchParams;
  const topics = await getTopicsWithStats();
  const selected = topics.find((t) => String(t.id) === tema);
  const sessions = await getSessions(selected?.id);

  // Totales de lo que se está mostrando
  const totalQ = sessions.reduce((sum, s) => sum + s.numQuestions, 0);
  const totalC = sessions.reduce((sum, s) => sum + s.numCorrect, 0);
  const totalPct = pctOf(totalC, totalQ);
  const totalStatus = statusFor(totalPct);

  const chip = "rounded-full border px-3 py-1 text-sm whitespace-nowrap";
  const chipOn = "border-slate-900 bg-slate-900 text-white";
  const chipOff = "border-slate-300 bg-white text-slate-700 hover:border-slate-400";

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">Historial de sesiones</h1>
        <Link
          href={selected ? `/sesiones/nueva?tema=${selected.id}` : "/sesiones/nueva"}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700"
        >
          + Registrar sesión
        </Link>
      </div>

      {guardada && (
        <p role="status" className="mb-4 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          ✓ Sesión guardada.
        </p>
      )}

      {/* Filtro por tema */}
      <nav className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        <Link href="/sesiones" className={`${chip} ${selected ? chipOff : chipOn}`}>
          Todos
        </Link>
        {topics.map((t, i) => (
          <Link key={t.id} href={`/sesiones?tema=${t.id}`}
            className={`${chip} ${selected?.id === t.id ? chipOn : chipOff}`}>
            {i + 1}. {t.name}
          </Link>
        ))}
      </nav>

      {/* Resumen */}
      <section className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div>
          <p className="text-xs text-slate-500">{selected ? selected.name : "Todos los temas"}</p>
          <p className="text-3xl font-bold">
            {totalPct === null ? "—" : `${Math.round(totalPct)} %`}
          </p>
        </div>
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${totalStatus.badge}`}>
          {totalStatus.label}
        </span>
        <p className="text-sm text-slate-600">
          {sessions.length} {sessions.length === 1 ? "sesión" : "sesiones"} · {totalC}/{totalQ} aciertos
        </p>
      </section>

      {sessions.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-slate-500">
          Aún no hay sesiones{selected ? " de este tema" : ""}.
        </p>
      ) : (
        <ul className="space-y-3">
          {sessions.map((s) => {
            const pct = pctOf(s.numCorrect, s.numQuestions);
            const status = statusFor(pct);
            return (
              <li key={s.id} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm text-slate-500">
                      {formatDate(s.date)}
                      {!selected && <> · {s.topicName}</>}
                    </p>
                    <p className="font-medium">{s.subtopicName ?? "Varios / todo el tema"}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-slate-600">{s.numCorrect}/{s.numQuestions}</span>
                    <span className={`rounded-full px-2.5 py-1 text-sm font-semibold ${status.badge}`}>
                      {Math.round(pct ?? 0)} %
                    </span>
                  </div>
                </div>

                {s.notes && <p className="mt-2 text-sm text-slate-600">{s.notes}</p>}

                <div className="mt-3 flex items-start justify-between gap-4">
                  {s.missed.length > 0 ? (
                    <details className="min-w-0 flex-1 text-sm">
                      <summary className="cursor-pointer select-none font-medium text-slate-700">
                        {s.missed.length} {s.missed.length === 1 ? "pregunta fallada" : "preguntas falladas"}
                      </summary>
                      <ol className="mt-3 space-y-3">
                        {s.missed.map((m, i) => (
                          <li key={m.id} className="rounded-lg bg-slate-50 p-3">
                            <p className="whitespace-pre-wrap text-slate-800">
                              <span className="font-semibold">{i + 1}.</span>{" "}
                              {m.questionText || <span className="text-slate-500">(enunciado en la foto)</span>}
                            </p>
                            {m.imageIds.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {m.imageIds.map((imgId) => (
                                  <a key={imgId} href={`/imagenes/${imgId}`} target="_blank"
                                    rel="noreferrer" title="Abrir foto en tamaño completo">
                                    {/* eslint-disable-next-line @next/next/no-img-element -- foto local servida por /imagenes */}
                                    <img src={`/imagenes/${imgId}`} alt={`Foto de la pregunta ${i + 1}`}
                                      loading="lazy"
                                      className="h-28 w-auto max-w-[12rem] rounded-lg border border-slate-200 bg-white object-contain hover:opacity-90" />
                                  </a>
                                ))}
                              </div>
                            )}
                            <p className="mt-2">
                              <span className="text-red-700">Mi respuesta: {m.myAnswer}</span>
                              <span className="mx-2 text-slate-300">|</span>
                              <span className="text-emerald-700">Correcta: {m.correctAnswer}</span>
                            </p>
                            {m.note && (
                              <p className="mt-1 whitespace-pre-wrap text-slate-600">📝 {m.note}</p>
                            )}
                            <ExplainButton missedQuestionId={m.id} savedExplanation={m.explanation} />
                          </li>
                        ))}
                      </ol>
                    </details>
                  ) : (
                    <span className="text-sm text-slate-400">Sin preguntas falladas registradas</span>
                  )}
                  <DeleteSessionButton sessionId={s.id} />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
