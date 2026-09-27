// Tarjeta grande con los días que faltan para el examen.

import { EXAM_DATE } from "@/lib/config";

export default function Countdown({ daysLeft }: { daysLeft: number }) {
  const examLabel = new Date(
    EXAM_DATE.year,
    EXAM_DATE.month - 1,
    EXAM_DATE.day
  ).toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  // "martes, 17 de noviembre de 2026" → "Martes, 17 de noviembre de 2026"
  const examText = examLabel.charAt(0).toUpperCase() + examLabel.slice(1);

  let message: string;
  if (daysLeft > 1) message = `Faltan ${daysLeft} días`;
  else if (daysLeft === 1) message = "Falta 1 día";
  else if (daysLeft === 0) message = "¡El examen es hoy!";
  else message = "El examen ya pasó";

  return (
    <section className="rounded-2xl bg-slate-900 px-6 py-8 text-white shadow-sm">
      <p className="text-sm uppercase tracking-wide text-slate-400">
        Cuenta regresiva
      </p>
      <p className="mt-1 text-4xl font-bold sm:text-5xl">{message}</p>
      <p className="mt-2 text-slate-300">
        Examen: {examText}
        {daysLeft > 0 && ` · ${Math.floor(daysLeft / 7)} semanas y ${daysLeft % 7} días`}
      </p>
    </section>
  );
}
