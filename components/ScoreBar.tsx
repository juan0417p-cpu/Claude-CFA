// Barra de progreso con la marca de la meta (70 %).

import { TARGET_PCT } from "@/lib/config";
import { statusFor } from "@/lib/status";

export default function ScoreBar({ pct }: { pct: number | null }) {
  return (
    <div className="relative h-2 rounded-full bg-slate-100">
      <div
        className={`h-2 rounded-full ${statusFor(pct).bar}`}
        style={{ width: `${Math.max(0, Math.min(100, pct ?? 0))}%` }}
      />
      <div
        className="absolute -top-1 h-4 w-0.5 bg-slate-700"
        style={{ left: `${TARGET_PCT}%` }}
        title={`Meta ${TARGET_PCT} %`}
      />
    </div>
  );
}
