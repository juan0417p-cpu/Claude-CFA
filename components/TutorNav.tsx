"use client";
// Pestañas del tutor: Chat · Practicar · Lecturas

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/tutor", label: "💬 Chat" },
  { href: "/tutor/practica", label: "📝 Practicar" },
  { href: "/tutor/lecturas", label: "📚 Lecturas" },
];

export default function TutorNav() {
  const pathname = usePathname();
  return (
    <nav className="mb-6 flex gap-1 border-b border-slate-200">
      {TABS.map((t) => {
        const active = pathname === t.href;
        return (
          <Link key={t.href} href={t.href} aria-current={active ? "page" : undefined}
            className={`-mb-px border-b-2 px-4 py-2 text-sm font-medium ${
              active ? "border-slate-900 text-slate-900" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}>
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
