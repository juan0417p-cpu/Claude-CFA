import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CFA Nivel 1 — Monitor de estudio",
  description: "Seguimiento de práctica para el CFA Nivel 1",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
