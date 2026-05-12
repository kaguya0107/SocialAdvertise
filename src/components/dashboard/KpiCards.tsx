import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { kpis as kpiSeed, type Kpi } from "@/lib/dashboard-data";

function jitter(value: string, raw: number) {
  // tiny random walk for "live" effect
  const delta = (Math.random() - 0.5) * raw * 0.0015;
  const next = raw + delta;
  if (value.startsWith("¥")) return "¥" + Math.round(next).toLocaleString();
  if (value.endsWith("%")) return next.toFixed(2) + "%";
  if (value.endsWith("M")) return (next / 1_000_000).toFixed(2) + "M";
  if (value.includes(",") || /\d{4,}/.test(value)) return Math.round(next).toLocaleString();
  return value;
}

export function KpiCards() {
  const [data, setData] = useState<Kpi[]>(kpiSeed);

  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => prev.map((k) => ({ ...k, value: jitter(k.value, k.raw) })));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-7">
      {data.map((k, i) => {
        const good = k.positiveIsGood ? k.delta > 0 : k.delta < 0;
        const Arrow = k.delta >= 0 ? ArrowUpRight : ArrowDownRight;
        return (
          <motion.div
            key={k.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-2xl glass gradient-border p-4 transition hover:translate-y-[-2px] hover:shadow-elegant"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                {k.label}
              </span>
              <span
                className={`flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
                  good
                    ? "bg-[oklch(0.78_0.18_155/0.15)] text-[oklch(0.82_0.18_155)]"
                    : "bg-[oklch(0.68_0.22_25/0.15)] text-[oklch(0.78_0.20_25)]"
                }`}
              >
                <Arrow className="h-3 w-3" />
                {Math.abs(k.delta).toFixed(1)}%
              </span>
            </div>
            <motion.div
              key={k.value}
              initial={{ opacity: 0.6, y: 2 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-2 text-2xl font-semibold tracking-tight"
            >
              {k.value}
            </motion.div>
            <div className="mt-2 h-12 -mx-1">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={k.series}>
                  <defs>
                    <linearGradient id={`g-${k.key}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.5} />
                      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="y"
                    stroke="var(--primary)"
                    strokeWidth={1.6}
                    fill={`url(#g-${k.key})`}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
