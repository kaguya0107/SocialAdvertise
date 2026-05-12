"use client";

import { useEffect, useState } from "react";
import { TopBar } from "@/components/dashboard/TopBar";
import { Filters } from "@/components/dashboard/Filters";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { Highlights } from "@/components/dashboard/Highlights";
import { CreativeCompare } from "@/components/dashboard/CreativeCompare";
import { AiPanel } from "@/components/dashboard/AiPanel";
import { Heatmap } from "@/components/dashboard/Heatmap";
import { LiveFeed } from "@/components/dashboard/LiveFeed";
import { MainChart } from "@/components/dashboard/MainChart";

export function DashboardHome() {
  const [todayLabel, setTodayLabel] = useState<string | null>(null);

  useEffect(() => {
    setTodayLabel(
      new Date().toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
      }),
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Aurora background */}
      <div className="pointer-events-none absolute inset-0 aurora-bg opacity-90" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_at_top,oklch(0.72_0.20_295/0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-[oklch(0.78_0.16_200/0.15)] blur-3xl float-slow" />
      <div
        className="pointer-events-none absolute -right-32 top-2/3 h-96 w-96 rounded-full bg-[oklch(0.72_0.22_350/0.12)] blur-3xl float-slow"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative">
        <TopBar />

        <main className="mx-auto max-w-[1480px] space-y-6 px-6 py-6">
          {/* Headline */}
          <section className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                <span className="rounded-full border border-border/60 px-2 py-0.5">Beauty Vertical</span>
                <span>·</span>
                <span>{todayLabel ?? "—"}</span>
              </div>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                おはようございます、<span className="gradient-text">経営チーム</span>へ。
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                今日の広告パフォーマンスは <span className="font-medium text-[oklch(0.82_0.18_155)]">+18.4%</span>{" "}
                改善。AIが3件の最適化提案を準備しました。
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-xl border border-border/60 bg-secondary/40 px-4 py-2 text-xs font-medium hover:bg-secondary/60">
                レポートをエクスポート
              </button>
              <button className="rounded-xl bg-[image:var(--gradient-primary)] px-4 py-2 text-xs font-semibold text-primary-foreground glow transition hover:opacity-95">
                AI最適化を実行
              </button>
            </div>
          </section>

          <Filters />
          <KpiCards />
          <Highlights />

          {/* Main grid */}
          <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
            <div className="space-y-6">
              <MainChart />
              <CreativeCompare />
              <div className="grid gap-6 lg:grid-cols-2">
                <Heatmap />
                <LiveFeed />
              </div>
            </div>
            <div className="xl:sticky xl:top-20 xl:h-[calc(100vh-6rem)]">
              <AiPanel />
            </div>
          </div>

          <footer className="pb-8 pt-4 text-center text-[11px] text-muted-foreground">
            © 2026 Lumina Ads · AI Marketing OS for Beauty
          </footer>
        </main>
      </div>
    </div>
  );
}
