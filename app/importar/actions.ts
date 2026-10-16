"use server";
// Server Action: recibe el JSON del mock, lo valida y lo guarda.

import { revalidatePath } from "next/cache";
import { MockFileSchema, importMock, type ImportSummary } from "@/lib/mock-import";

export async function importMockAction(
  json: string,
  date: string
): Promise<{ ok: true; summary: ImportSummary } | { error: string }> {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return { error: "La fecha no es válida." };

  let data: unknown;
  try {
    data = JSON.parse(json);
  } catch {
    return { error: "El archivo no es un JSON válido." };
  }
  const parsed = MockFileSchema.safeParse(data);
  if (!parsed.success) return { error: "El archivo no tiene el formato de mock esperado (cfa-mock-v1)." };

  try {
    const summary = importMock(parsed.data, date);
    revalidatePath("/");
    revalidatePath("/sesiones");
    return { ok: true, summary };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo importar." };
  }
}
