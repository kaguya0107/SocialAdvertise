import { Crown, AlertTriangle, Users, Flame } from "lucide-react";

const items = [
  {
    icon: Crown,
    label: "Best Creative",
    value: "肌質改善 BeforeAfter",
    sub: "Meta · ROAS 612% · CPA ¥980",
    color: "oklch(0.82 0.17 75)",
  },
  {
    icon: AlertTriangle,
    label: "Worst CPA",
    value: "痩身モニター UGC",
    sub: "Google · CPA ¥2,840 (+38%)",
    color: "oklch(0.78 0.20 25)",
  },
  {
    icon: Users,
    label: "Winning Audience",
    value: "20代女性 / 美容関心層",
    sub: "TikTok · CV 482 · ROAS 612%",
    color: "oklch(0.78 0.18 155)",
  },
  {
    icon: Flame,
    label: "Creative Fatigue",
    value: "新規割2,980円 カルーセル",
    sub: "疲弊度 78% · 入替を推奨",
    color: "oklch(0.72 0.22 350)",
  },
];

export function Highlights() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((it) => {
        const Icon = it.icon;
        return (
          <div key={it.label} className="glass gradient-border rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <div
                className="flex h-7 w-7 items-center justify-center rounded-lg"
                style={{ background: `color-mix(in oklab, ${it.color} 20%, transparent)`, color: it.color }}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{it.label}</span>
            </div>
            <div className="mt-2 truncate text-sm font-semibold">{it.value}</div>
            <div className="mt-0.5 truncate text-[11px] text-muted-foreground">{it.sub}</div>
          </div>
        );
      })}
    </div>
  );
}
