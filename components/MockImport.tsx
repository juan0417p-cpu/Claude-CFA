"use client";
// Importar un mock: elegir el archivo .json, ver la vista previa y confirmar.

import { useState, useTransition } from "react";
import Link from "next/link";
import { importMockAction } from "@/app/importar/actions";
import StatusBadge from "./StatusBadge";

type Q = { n: number; topic: string; isCorrect: boolean; guess: boolean; mine: string | null };
type Preview = { name: string; json: string; questions: Q[] };

export default function MockImport({ today }: { today: string }) {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [date, setDate] = useState(today);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string>("");
  const [pending, startTransition] = useTransition();

  async function onFile(file: File | undefined) {
    setError(""); setDone(""); setPreview(null);
    if (!file) return;
    try {
      const json = await file.text();
      const data = JSON.parse(json);
      if (data?.format !== "cfa-mock-v1" || !Array.isArray(data.questions)) throw new Error();
      setPreview({ name: data.name, json, questions: data.questions });
    } catch {
      setError("Ese archivo no es un mock válido (debe ser el .json que preparé).");
    }
  }

  function doImport() {
    if (!preview) return;
    startTransition(async () => {
      const r = await importMockAction(preview.json, date);
      if ("error" in r) return setError(r.error);
      const s = r.summary;
      setDone(`✓ Importado: ${s.correct}/${s.questions} correctas en ${s.sessions} sesiones (por subtema). ` +
        `${s.missed} preguntas falladas y ${s.lucky} acertadas al azar quedaron para repasar.`);
      setPreview(null);
    });
  }

  // Resumen por tema para la vista previa
  const byTopic = new Map<string, { total: number; ok: number; guess: number }>();
  for (const q of preview?.questions ?? []) {
    const t = byTopic.get(q.topic) ?? { total: 0, ok: 0, guess: 0 };
    t.total++; if (q.isCorrect) t.ok++; if (q.guess) t.guess++;
    byTopic.set(q.topic, t);
  }
  const total = preview?.questions.length ?? 0;
  const ok = preview?.questions.filter((q) => q.isCorrect).length ?? 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          Archivo del mock (.json)
          <input type="file" accept=".json,application/json"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = ""; // permite volver a elegir el mismo archivo
            }}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        </label>
        <label className="block text-sm font-medium text-slate-700">
          Fecha en que hiciste el mock
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" />
        </label>
      </section>

      {error && <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{error}</p>}
      {done && (
        <div role="status" className="rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <p>{done}</p>
          <p className="mt-2 flex gap-4 font-medium">
            <Link href="/" className="underline">Ver dashboard</Link>
            <Link href="/sesiones" className="underline">Ver historial</Link>
          </p>
        </div>
      )}

      {preview && (
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="font-semibold">{preview.name}</h2>
            <p className="text-sm text-slate-600">
              <strong className="text-lg text-slate-900">{ok}/{total}</strong> ({Math.round((100 * ok) / total)} %)
            </p>
          </div>
          <table className="mt-4 w-full text-left text-sm tabular-nums">
            <thead className="text-xs text-slate-500">
              <tr><th className="py-1 font-medium">Tema</th><th className="py-1 text-right font-medium">Correctas</th>
                <th className="py-1 text-right font-medium">Al azar</th><th className="py-1 text-right font-medium">%</th></tr>
            </thead>
            <tbody>
              {[...byTopic].sort((a, b) => a[1].ok / a[1].total - b[1].ok / b[1].total).map(([topic, t]) => (
                <tr key={topic} className="border-t border-slate-100">
                  <td className="py-1.5">{topic}</td>
                  <td className="py-1.5 text-right">{t.ok}/{t.total}</td>
                  <td className="py-1.5 text-right">{t.guess}</td>
                  <td className="py-1.5 text-right"><StatusBadge pct={(100 * t.ok) / t.total} /> {Math.round((100 * t.ok) / t.total)} %</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={doImport} disabled={pending}
            className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
            {pending ? "Importando…" : "Importar al historial"}
          </button>
        </section>
      )}
    </div>
  );
}
