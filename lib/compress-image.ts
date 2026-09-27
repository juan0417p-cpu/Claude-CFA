// Achica una foto en el navegador antes de guardarla:
// - lado más largo ≤ 1568 px (lo ideal para Claude)
// - la convierte a JPEG (calidad 85 %)
// Una foto de celular de 4–10 MB queda en ~200–400 KB.

import { MAX_IMAGE_SIDE } from "./image-limits";

export async function compressImage(file: File): Promise<Blob> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    // Pasa, por ejemplo, con fotos HEIC de iPhone en Windows
    throw new Error(
      `No se pudo leer "${file.name}". Usa JPG o PNG (o toma una captura de pantalla).`
    );
  }

  const scale = Math.min(1, MAX_IMAGE_SIDE / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#ffffff"; // fondo blanco para PNG con transparencia
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo comprimir la imagen."))),
      "image/jpeg",
      0.85
    );
  });
}
