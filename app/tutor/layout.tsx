// Marco común de las páginas del tutor: título, pestañas y aviso si falta la clave.

import TutorNav from "@/components/TutorNav";
import { MODEL, hasApiKey } from "@/lib/ai";

export default function TutorLayout({ children }: LayoutProps<"/tutor">) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold">Tutor IA</h1>
      <p className="mb-4 text-sm text-slate-500">Modelo: {MODEL}</p>
      {!hasApiKey() && (
        <div role="alert" className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Falta tu clave de la API de Anthropic</p>
          <p className="mt-1">
            Crea un archivo <code>.env.local</code> en la carpeta del proyecto con la línea{" "}
            <code>ANTHROPIC_API_KEY=sk-ant-…</code> y reinicia la app (<code>Ctrl + C</code> y{" "}
            <code>npm run dev</code>). Los pasos están en el README.
          </p>
        </div>
      )}
      <TutorNav />
      {children}
    </main>
  );
}
