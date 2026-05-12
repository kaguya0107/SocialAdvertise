import { Sparkles, Send, TrendingUp, AlertTriangle, Lightbulb, LineChart } from "lucide-react";
import { motion } from "framer-motion";
import { insights, type Insight } from "@/lib/dashboard-data";

const tagStyle: Record<Insight["tag"], { cls: string; icon: React.ElementType }> = {
  好調: { cls: "bg-[oklch(0.78_0.18_155/0.15)] text-[oklch(0.82_0.18_155)]", icon: TrendingUp },
  注意: { cls: "bg-[oklch(0.68_0.22_25/0.15)] text-[oklch(0.78_0.20_25)]", icon: AlertTriangle },
  提案: { cls: "bg-[oklch(0.72_0.20_295/0.15)] text-[oklch(0.82_0.16_295)]", icon: Lightbulb },
  予測: { cls: "bg-[oklch(0.78_0.16_200/0.15)] text-[oklch(0.85_0.14_200)]", icon: LineChart },
};

export function AiPanel() {
  const score = 87;
  return (
    <aside className="flex h-full flex-col rounded-2xl glass gradient-border">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border/60 p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-[image:var(--gradient-primary)] glow">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[oklch(0.78_0.18_155)] live-dot" />
          </div>
          <div>
            <div className="text-sm font-semibold">AI Insight</div>
            <div className="text-[10px] text-muted-foreground">Lumina Copilot · GPT-5o</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Score</div>
          <div className="bg-[image:var(--gradient-primary)] bg-clip-text text-lg font-semibold leading-none text-transparent">
            {score}
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4 scrollbar-thin">
        {insights.map((ins, i) => {
          const t = tagStyle[ins.tag];
          const Icon = t.icon;
          return (
            <motion.div
              key={ins.id}
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07 }}
              className="rounded-xl border border-border/60 bg-secondary/20 p-3 transition hover:bg-secondary/40"
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${t.cls}`}>
                  <Icon className="h-3 w-3" /> {ins.tag}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {ins.platform ? `· ${ins.platform}` : ""} · score {ins.score}
                </span>
              </div>
              <div className="text-[13px] font-semibold leading-snug">{ins.title}</div>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">{ins.body}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Composer */}
      <div className="border-t border-border/60 p-3">
        <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-secondary/30 px-3 py-2">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          <input
            placeholder="AIに分析を質問する… (例: 今週ROASを最大化するには?)"
            className="flex-1 bg-transparent text-xs outline-none placeholder:text-muted-foreground"
          />
          <button className="rounded-lg bg-[image:var(--gradient-primary)] p-1.5 text-primary-foreground transition hover:opacity-90">
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["予算最適配分", "疲弊クリエイティブ", "勝ちオーディエンス"].map((s) => (
            <button key={s} className="rounded-full border border-border/60 px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground">
              {s}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
