"use client";
// Botón "Borrar" que pide confirmación antes de enviar el formulario.

import { deleteSession } from "@/app/sesiones/actions";

export default function DeleteSessionButton({ sessionId }: { sessionId: number }) {
  return (
    <form
      action={deleteSession}
      onSubmit={(e) => {
        if (!confirm("¿Borrar esta sesión y sus preguntas falladas?")) e.preventDefault();
      }}
    >
      <input type="hidden" name="sessionId" value={sessionId} />
      <button type="submit" className="text-sm text-red-700 hover:underline">
        Borrar
      </button>
    </form>
  );
}
