"use client";
// Formulario para subir un PDF de lectura y asignarlo a un tema.

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function ReadingUpload({ topics }: { topics: { id: number; name: string }[] }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setUploading(true);
    try {
      const response = await fetch("/api/lecturas", { method: "POST", body: new FormData(e.currentTarget) });
      const result = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || result.error) throw new Error(result.error ?? "No se pudo subir.");
      formRef.current?.reset();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error");
    } finally {
      setUploading(false);
    }
  }

  const input = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return (
    <form ref={formRef} onSubmit={onSubmit}
      className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
      <label className="block text-sm font-medium text-slate-700">
        Archivo PDF
        <input name="file" type="file" accept="application/pdf,.pdf" required className={input} />
      </label>
      <label className="block text-sm font-medium text-slate-700">
        Tema
        <select name="topicId" defaultValue="" className={input}>
          <option value="">General / varios temas</option>
          {topics.map((t, i) => (
            <option key={t.id} value={t.id}>{i + 1}. {t.name}</option>
          ))}
        </select>
      </label>
      <div className="flex items-center gap-3 sm:col-span-2">
        <button type="submit" disabled={uploading}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-60">
          {uploading ? "Subiendo…" : "Subir PDF"}
        </button>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </div>
    </form>
  );
}
