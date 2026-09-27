"use client";
// Selector de fotos para una pregunta fallada.
// - Botón para elegir fotos (en celular también permite usar la cámara).
// - Pegar una captura con Ctrl+V mientras el cursor está en la pregunta
//   (el pegado lo maneja SessionForm y llama a onAdd).
// - Miniaturas con botón para quitar.

import { useRef, useState } from "react";
import { compressImage } from "@/lib/compress-image";
import { MAX_IMAGES_PER_QUESTION } from "@/lib/image-limits";

export type PhotoDraft = {
  key: number; // identificador interno para React
  blob: Blob; // la foto ya comprimida
  previewUrl: string; // URL temporal para mostrar la miniatura
};

let nextKey = 1;

// Comprime una lista de archivos y los devuelve listos para el formulario.
export async function filesToPhotos(files: File[]): Promise<PhotoDraft[]> {
  const images = files.filter((f) => f.type.startsWith("image/"));
  const photos: PhotoDraft[] = [];
  for (const file of images) {
    const blob = await compressImage(file);
    photos.push({ key: nextKey++, blob, previewUrl: URL.createObjectURL(blob) });
  }
  return photos;
}

export default function PhotoPicker({
  photos,
  onAdd,
  onRemove,
}: {
  photos: PhotoDraft[];
  onAdd: (files: File[]) => Promise<void>;
  onRemove: (key: number) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const full = photos.length >= MAX_IMAGES_PER_QUESTION;

  async function handleFiles(files: File[]) {
    setBusy(true);
    try {
      await onAdd(files);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <p className="block text-sm font-medium text-slate-700">Fotos de la pregunta (opcional)</p>

      {photos.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {photos.map((p) => (
            <li key={p.key} className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element -- miniatura local (blob:) */}
              <img src={p.previewUrl} alt="Foto de la pregunta"
                className="h-24 w-24 rounded-lg border border-slate-200 object-cover" />
              <button type="button" onClick={() => onRemove(p.key)} aria-label="Quitar foto"
                className="absolute -right-2 -top-2 h-6 w-6 rounded-full bg-slate-900 text-xs text-white hover:bg-red-700">
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button type="button" disabled={full || busy} onClick={() => inputRef.current?.click()}
          className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
          {busy ? "Procesando…" : "📷 Añadir foto"}
        </button>
        <span className="text-xs text-slate-500">
          {full
            ? `Máximo ${MAX_IMAGES_PER_QUESTION} fotos por pregunta`
            : "o pega una captura con Ctrl + V dentro de esta pregunta"}
        </span>
      </div>

      {/* Sin "name": las fotos se envían ya comprimidas desde SessionForm */}
      <input ref={inputRef} type="file" accept="image/*" multiple hidden
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          e.target.value = ""; // permite volver a elegir el mismo archivo
          if (files.length) handleFiles(files);
        }} />
    </div>
  );
}
