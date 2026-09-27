// Sirve una foto guardada en la base de datos: /imagenes/123

import type { NextRequest } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(_req: NextRequest, ctx: RouteContext<"/imagenes/[id]">) {
  const { id } = await ctx.params;
  if (!/^\d+$/.test(id)) return new Response("No encontrada", { status: 404 });

  const row = getDb()
    .prepare("SELECT media_type, data FROM missed_question_images WHERE id = ?")
    .get(Number(id)) as { media_type: string; data: Uint8Array } | undefined;
  if (!row) return new Response("No encontrada", { status: 404 });

  return new Response(Buffer.from(row.data), {
    headers: {
      "Content-Type": row.media_type,
      // una foto nunca cambia: el navegador puede guardarla en caché
      "Cache-Control": "private, max-age=31536000, immutable",
    },
  });
}
