import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const days = ["月", "火", "水", "木", "金", "土", "日"];
const data = days.map((d, i) => ({
  day: d,
  Meta: 140 + Math.sin(i) * 38 + i * 8,
  TikTok: 110 + Math.cos(i / 1.4) * 42 + i * 10,
  Google: 90 + Math.sin(i / 1.8) * 30 + i * 4,
}));

const series = [
  { key: "Meta", color: "oklch(0.68 0.20 250)" },
  { key: "TikTok", color: "oklch(0.72 0.22 350)" },
  { key: "Google", color: "oklch(0.78 0.17 75)" },
];

export function MainChart() {
  return (
    <div className="glass gradient-border rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">媒体別パフォーマンス推移</h3>
          <p className="text-[11px] text-muted-foreground">ROAS · 過去 7 日間</p>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          {series.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
              {s.key}
            </div>
          ))}
        </div>
      </div>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 8, left: -16, bottom: 0 }}>
            <defs>
              {series.map((s) => (
                <linearGradient key={s.key} id={`a-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={s.color} stopOpacity={0.5} />
                  <stop offset="100%" stopColor={s.color} stopOpacity={0} />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              stroke="oklch(0.32 0.025 270 / 0.4)"
              strokeDasharray="3 4"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="oklch(0.68 0.025 260)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis stroke="oklch(0.68 0.025 260)" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                background: "oklch(0.21 0.022 270 / 0.95)",
                border: "1px solid oklch(0.32 0.025 270)",
                borderRadius: 12,
                fontSize: 12,
                backdropFilter: "blur(12px)",
              }}
              labelStyle={{ color: "oklch(0.85 0.005 250)" }}
            />
            {series.map((s) => (
              <Area
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={s.color}
                strokeWidth={2}
                fill={`url(#a-${s.key})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
