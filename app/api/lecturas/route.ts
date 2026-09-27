// POST /api/lecturas  (multipart: file = PDF, topicId opcional)
// Sube el PDF a la Files API de Anthropic y guarda su file_id.
// Es una ruta (no Server Action) porque los PDF pueden pesar decenas de MB.

import { toFile } from "@anthropic-ai/sdk";
import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db";
import { friendlyError, getClient } from "@/lib/ai";

const MAX_PDF_BYTES = 500 * 1024 * 1024; // límite de la Files API

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    const topicRaw = String(form.get("topicId") ?? "");
    const topicId = /^\d+$/.test(topicRaw) ? Number(topicRaw) : null;

    if (!(file instanceof File) || file.size === 0)
      return Response.json({ error: "Elige un archivo PDF." }, { status: 400 });
    if (file.size > MAX_PDF_BYTES)
      return Response.json({ error: "El PDF pesa más de 500 MB." }, { status: 400 });

    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.subarray(0, 5).toString() !== "%PDF-")
      return Response.json({ error: "El archivo no parece un PDF." }, { status: 400 });

    const uploaded = await getClient().files.upload({
      file: await toFile(bytes, file.name, { type: "application/pdf" }),
    });

    getDb()
      .prepare("INSERT INTO readings (topic_id, name, file_id, size_bytes) VALUES (?, ?, ?, ?)")
      .run(topicId, file.name.replace(/\.pdf$/i, ""), uploaded.id, file.size);

    revalidatePath("/tutor/lecturas");
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: friendlyError(error) }, { status: 500 });
  }
}
