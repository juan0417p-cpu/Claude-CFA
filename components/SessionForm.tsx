"use client";
// Formulario para registrar una sesión de práctica.
// Es un "Client Component" porque reacciona a lo que escribo:
// el subtema depende del tema, y puedo agregar/quitar preguntas falladas.
//
// Todos los campos guardan su valor en estado (useState), y el envío se hace
// con onSubmit en vez de <form action>: así React no "resetea" el formulario
// y, si el servidor devuelve un error, no se pierde nada de lo escrito.
//
// Las fotos de cada pregunta se comprimen en el navegador (PhotoPicker) y se
// agregan al envío con el nombre "missedImages-<n° de pregunta>".

import { startTransition, useActionState, useState } from "react";
import { createSession, type FormState } from "@/app/sesiones/actions";
import type { TopicWithStats } from "@/lib/data";
import { MAX_IMAGES_PER_QUESTION } from "@/lib/image-limits";
import PhotoPicker, { filesToPhotos, type PhotoDraft } from "./PhotoPicker";

type MissedDraft = {
  key: number; // identificador interno para React
  questionText: string;
  myAnswer: string;
  correctAnswer: string;
  note: string;
  photos: PhotoDraft[];
};

// Campos de texto de una pregunta fallada (todo menos key y photos)
type MissedTextField = "questionText" | "myAnswer" | "correctAnswer" | "note";

const inputClass =
  "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500";
const labelClass = "block text-sm font-medium text-slate-700";

let nextKey = 1;
function emptyMissed(): MissedDraft {
  return {
    key: nextKey++, questionText: "", myAnswer: "", correctAnswer: "", note: "", photos: [],
  };
}

export default function SessionForm({
  topics,
  today,
  initialTopicId,
}: {
  topics: TopicWithStats[];
  today: string;
  initialTopicId?: number;
}) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(
    createSession,
    { errors: [] }
  );

  const [date, setDate] = useState(today);
  const [topicId, setTopicId] = useState(initialTopicId ? String(initialTopicId) : "");
  const [subtopicId, setSubtopicId] = useState("");
  const [numQuestions, setNumQuestions] = useState("");
  const [numCorrect, setNumCorrect] = useState("");
  const [notes, setNotes] = useState("");
  const [missed, setMissed] = useState<MissedDraft[]>([]);
  const [photoError, setPhotoError] = useState("");

  const selectedTopic = topics.find((t) => String(t.id) === topicId);
  const q = Number(numQuestions);
  const c = Number(numCorrect);
  const showPct = numQuestions !== "" && numCorrect !== "" && q > 0 && c <= q;

  function updateMissed(key: number, field: MissedTextField, value: string) {
    setMissed((list) => list.map((m) => (m.key === key ? { ...m, [field]: value } : m)));
  }

  // Comprime las fotos nuevas y las agrega a la pregunta (respetando el máximo)
  async function addPhotos(key: number, files: File[]) {
    setPhotoError("");
    const current = missed.find((m) => m.key === key)?.photos.length ?? 0;
    const room = MAX_IMAGES_PER_QUESTION - current;
    if (room <= 0) return;
    try {
      const photos = await filesToPhotos(files.slice(0, room));
      setMissed((list) =>
        list.map((m) => (m.key === key ? { ...m, photos: [...m.photos, ...photos] } : m))
      );
    } catch (error) {
      setPhotoError(error instanceof Error ? error.message : "No se pudo agregar la foto.");
    }
  }

  function removePhoto(key: number, photoKey: number) {
    setMissed((list) =>
      list.map((m) => {
        if (m.key !== key) return m;
        const photo = m.photos.find((p) => p.key === photoKey);
        if (photo) URL.revokeObjectURL(photo.previewUrl); // libera la memoria
        return { ...m, photos: m.photos.filter((p) => p.key !== photoKey) };
      })
    );
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        missed.forEach((m, i) => {
          m.photos.forEach((p, j) => {
            data.append(`missedImages-${i}`, p.blob, `pregunta-${i + 1}-foto-${j + 1}.jpg`);
          });
        });
        startTransition(() => formAction(data));
      }}
    >
      {state.errors.length > 0 && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
          <p className="font-medium">Revisa lo siguiente:</p>
          <ul className="mt-1 list-disc pl-5">
            {state.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      {/* ---------- Datos de la sesión ---------- */}
      <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:grid-cols-2">
        <div>
          <label htmlFor="date" className={labelClass}>Fecha</label>
          <input id="date" name="date" type="date" required value={date}
            onChange={(e) => setDate(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="topicId" className={labelClass}>Tema</label>
          <select id="topicId" name="topicId" required value={topicId}
            onChange={(e) => {
              setTopicId(e.target.value);
              setSubtopicId(""); // al cambiar de tema, el subtema anterior ya no aplica
            }}
            className={inputClass}>
            <option value="" disabled>Elige un tema…</option>
            {topics.map((t, i) => (
              <option key={t.id} value={t.id}>{i + 1}. {t.name}</option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="subtopicId" className={labelClass}>Subtema</label>
          <select id="subtopicId" name="subtopicId" value={subtopicId}
            onChange={(e) => setSubtopicId(e.target.value)}
            disabled={!selectedTopic} className={`${inputClass} disabled:bg-slate-100`}>
            <option value="">
              {selectedTopic ? "Varios / todo el tema" : "Primero elige un tema"}
            </option>
            {selectedTopic?.subtopics.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="numQuestions" className={labelClass}>Preguntas hechas</label>
          <input id="numQuestions" name="numQuestions" type="number" min={1} required
            inputMode="numeric" value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label htmlFor="numCorrect" className={labelClass}>Aciertos</label>
          <input id="numCorrect" name="numCorrect" type="number" min={0}
            max={numQuestions || undefined} required inputMode="numeric" value={numCorrect}
            onChange={(e) => setNumCorrect(e.target.value)} className={inputClass} />
        </div>

        {showPct && (
          <p className="text-sm text-slate-600 sm:col-span-2">
            Resultado: <strong>{Math.round((100 * c) / q)} %</strong> · fallaste {q - c}
          </p>
        )}

        <div className="sm:col-span-2">
          <label htmlFor="notes" className={labelClass}>Notas de la sesión (opcional)</label>
          <textarea id="notes" name="notes" rows={2} value={notes}
            onChange={(e) => setNotes(e.target.value)} className={inputClass}
            placeholder="Ej.: banco de preguntas de Kaplan, cansado, cronometrado…" />
        </div>
      </section>

      {/* ---------- Preguntas falladas ---------- */}
      <section className="space-y-4">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold">Preguntas que fallé</h2>
          <span className="text-sm text-slate-500">{missed.length} agregadas</span>
        </div>

        {photoError && (
          <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">{photoError}</p>
        )}

        {missed.map((m, i) => (
          <fieldset key={m.key}
            className="space-y-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            onPaste={(e) => {
              // Ctrl+V con una imagen en el portapapeles → se agrega como foto
              const files = Array.from(e.clipboardData.files).filter((f) =>
                f.type.startsWith("image/")
              );
              if (files.length) {
                e.preventDefault();
                addPhotos(m.key, files);
              }
            }}>
            <div className="flex items-center justify-between">
              <legend className="text-sm font-semibold text-slate-700">Pregunta {i + 1}</legend>
              <button type="button"
                onClick={() => {
                  m.photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
                  setMissed((list) => list.filter((x) => x.key !== m.key));
                }}
                className="text-sm text-red-700 hover:underline">
                Quitar
              </button>
            </div>

            <div>
              <label className={labelClass}>
                Enunciado {m.photos.length > 0 && <span className="font-normal text-slate-500">(opcional si hay foto)</span>}
                <textarea name="missedQuestion" rows={3} required={m.photos.length === 0}
                  value={m.questionText}
                  onChange={(e) => updateMissed(m.key, "questionText", e.target.value)}
                  className={inputClass} placeholder="Copia aquí la pregunta (y las opciones A/B/C), o agrega una foto abajo" />
              </label>
            </div>
            <PhotoPicker photos={m.photos}
              onAdd={(files) => addPhotos(m.key, files)}
              onRemove={(photoKey) => removePhoto(m.key, photoKey)} />
            <div className="grid gap-3 sm:grid-cols-2">
              <label className={labelClass}>
                Mi respuesta
                <input name="missedMyAnswer" required value={m.myAnswer}
                  onChange={(e) => updateMissed(m.key, "myAnswer", e.target.value)}
                  className={inputClass} placeholder="Ej.: B" />
              </label>
              <label className={labelClass}>
                Respuesta correcta
                <input name="missedCorrect" required value={m.correctAnswer}
                  onChange={(e) => updateMissed(m.key, "correctAnswer", e.target.value)}
                  className={inputClass} placeholder="Ej.: C" />
              </label>
            </div>
            <label className={labelClass}>
              Mi nota (opcional)
              <textarea name="missedNote" rows={2} value={m.note}
                onChange={(e) => updateMissed(m.key, "note", e.target.value)}
                className={inputClass} placeholder="¿Por qué fallé? ¿Qué debo repasar?" />
            </label>
          </fieldset>
        ))}

        <button type="button" onClick={() => setMissed((list) => [...list, emptyMissed()])}
          className="w-full rounded-2xl border-2 border-dashed border-slate-300 py-3 text-sm font-medium text-slate-600 hover:border-slate-400 hover:bg-white">
          + Agregar pregunta fallada
        </button>
      </section>

      <div className="flex justify-end">
        <button type="submit" disabled={pending}
          className="rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-700 disabled:opacity-50">
          {pending ? "Guardando…" : "Guardar sesión"}
        </button>
      </div>
    </form>
  );
}
