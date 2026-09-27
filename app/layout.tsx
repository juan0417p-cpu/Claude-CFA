import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "CFA Nivel 1 — Monitor de estudio",
  description: "Seguimiento de práctica para el CFA Nivel 1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">
        {/* Barra de navegación, visible en todas las páginas */}
        <header className="border-b border-slate-200 bg-white">
          <nav className="mx-auto flex max-w-6xl items-center gap-5 px-4 py-3 text-sm font-medium sm:px-6">
            <Link href="/" className="font-bold">CFA N1</Link>
            <Link href="/" className="text-slate-600 hover:text-slate-900">Dashboard</Link>
            <Link href="/sesiones" className="text-slate-600 hover:text-slate-900">Historial</Link>
            <Link href="/sesiones/nueva" className="text-slate-600 hover:text-slate-900">+ Sesión</Link>
            <Link href="/tutor" className="text-slate-600 hover:text-slate-900">🤖 Tutor</Link>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
