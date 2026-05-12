import { useEffect, useState } from "react";
import { Activity, Zap } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { liveEvents, type Platform } from "@/lib/dashboard-data";

const dot: Record<Platform, string> = {
  Meta: "oklch(0.68 0.20 250)",
  TikTok: "oklch(0.72 0.22 350)",
  Google: "oklch(0.78 0.17 75)",
};

export function LiveFeed() {
  const [items, setItems] = useState(liveEvents);
  /** null until mounted so SSR HTML matches the client's first paint (avoids clock hydration mismatch). */
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => {
      setNow(new Date());
      setItems((prev) => {
        const head = prev[0];
        return [{ ...head, t: "now" }, ...prev.slice(0, 4).map((e, i) => ({ ...e, t: `${(i + 1) * 14}s` }))];
      });
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="glass gradient-border rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-[oklch(0.78_0.18_155/0.15)] px-2 py-0.5 text-[10px] font-semibold text-[oklch(0.82_0.18_155)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.82_0.18_155)] live-dot" /> LIVE
          </div>
          <h3 className="flex items-center gap-1.5 text-sm font-semibold">
            <Activity className="h-3.5 w-3.5" /> リアルタイム配信ログ
          </h3>
        </div>
        <span className="text-[10px] text-muted-foreground">
          最終同期 {now ? now.toLocaleTimeString("ja-JP") : "—"}
        </span>
      </div>

      <div className="relative space-y-2 overflow-hidden">
        <AnimatePresence initial={false}>
          {items.map((e, i) => (
            <motion.div
              key={`${e.text}-${i}`}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1 - i * 0.15, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3 rounded-lg border border-border/40 bg-secondary/20 px-3 py-2 text-[12px]"
            >
              <Zap className="h-3.5 w-3.5" style={{ color: dot[e.platform] }} />
              <div className="flex-1 truncate">{e.text}</div>
              <span className="text-[10px] text-muted-foreground">{e.t}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
