// Etiqueta del semáforo: ícono + texto + color.

import { statusFor } from "@/lib/status";

export default function StatusBadge({ pct }: { pct: number | null }) {
  const s = statusFor(pct);
  return (
    <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${s.badge}`}>
      <span aria-hidden>{s.icon}</span>
      {s.label}
    </span>
  );
}
