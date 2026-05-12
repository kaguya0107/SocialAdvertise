import { Play, Image as ImageIcon, TrendingUp, AlertTriangle, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { creatives, platforms, thumbGradients, type Platform } from "@/lib/dashboard-data";

const platformDot: Record<Platform, string> = {
  Meta: "oklch(0.68 0.20 250)",
  TikTok: "oklch(0.72 0.22 350)",
  Google: "oklch(0.78 0.17 75)",
};

function formatYen(n: number) {
  if (n >= 10000) return "¥" + (n / 10000).toFixed(1) + "万";
  return "¥" + n.toLocaleString();
}

function bestPlatform(c: typeof creatives[number]) {
  let best: Platform = "Meta";
  let bestRoas = -Infinity;
  for (const p of platforms) {
    if (c.metrics[p].roas > bestRoas) { bestRoas = c.metrics[p].roas; best = p; }
  }
  return best;
}

function worstPlatform(c: typeof creatives[number]) {
  let worst: Platform = "Meta";
  let worstCpa = -Infinity;
  for (const p of platforms) {
    if (c.metrics[p].cpa > worstCpa) { worstCpa = c.metrics[p].cpa; worst = p; }
  }
  return worst;
}

export function CreativeCompare() {
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">クリエイティブ横断比較</h2>
          <p className="text-xs text-muted-foreground">
            同一クリエイティブが Meta / TikTok / Google でどう機能しているか一目で把握。
          </p>
        </div>
        <div className="hidden items-center gap-2 text-[11px] text-muted-foreground md:flex">
          <span className="flex items-center gap-1"><Crown className="h-3 w-3 text-[oklch(0.82_0.17_75)]" /> Best</span>
          <span className="flex items-center gap-1"><AlertTriangle className="h-3 w-3 text-[oklch(0.78_0.20_25)]" /> Worst CPA</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {creatives.map((c, idx) => {
          const best = bestPlatform(c);
          const worst = worstPlatform(c);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.4 }}
              className="glass gradient-border rounded-2xl p-4"
            >
              <div className="flex gap-4">
                <div
                  className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl"
                  style={{ background: thumbGradients[c.thumb] }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <div className="absolute bottom-1.5 left-1.5 flex items-center gap-1 rounded-md bg-black/40 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                    {c.type === "video" ? <Play className="h-2.5 w-2.5" /> : <ImageIcon className="h-2.5 w-2.5" />}
                    {c.type === "video" ? "VIDEO" : "STATIC"}
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold">{c.name}</div>
                      <div className="mt-0.5 truncate text-[11px] text-muted-foreground">
                        Audience · {c.audience}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-[oklch(0.78_0.18_155/0.12)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.82_0.18_155)]">
                      <TrendingUp className="h-3 w-3" /> AI Score {78 + idx * 4}
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {platforms.map((p) => {
                      const m = c.metrics[p];
                      const isBest = p === best;
                      const isWorst = p === worst;
                      return (
                        <div
                          key={p}
                          className={`relative rounded-xl border p-2.5 text-[11px] transition ${
                            isBest
                              ? "border-[oklch(0.82_0.17_75/0.5)] bg-[oklch(0.82_0.17_75/0.06)]"
                              : isWorst
                              ? "border-[oklch(0.78_0.20_25/0.4)] bg-[oklch(0.78_0.20_25/0.05)]"
                              : "border-border/60 bg-secondary/20"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full" style={{ background: platformDot[p] }} />
                              {p}
                            </div>
                            {isBest && <Crown className="h-3 w-3 text-[oklch(0.82_0.17_75)]" />}
                            {isWorst && <AlertTriangle className="h-3 w-3 text-[oklch(0.78_0.20_25)]" />}
                          </div>
                          <div className="mt-1.5 grid grid-cols-2 gap-x-2 gap-y-1 text-muted-foreground">
                            <div><span className="text-foreground/90 font-medium">{m.ctr}%</span> CTR</div>
                            <div><span className="text-foreground/90 font-medium">{formatYen(m.cpa)}</span> CPA</div>
                            <div><span className="text-foreground/90 font-medium">{m.cv}</span> CV</div>
                            <div><span className="text-foreground/90 font-medium">{m.roas}%</span> ROAS</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
