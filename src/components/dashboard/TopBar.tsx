import { Sparkles, Bell, Search, Command } from "lucide-react";

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 glass-strong border-b border-border/60">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-primary)] glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">Lumina Ads</div>
            <div className="text-[11px] text-muted-foreground">AI Marketing OS · v2.4</div>
          </div>
          <nav className="ml-8 hidden items-center gap-1 md:flex">
            {["Overview", "Creatives", "Audience", "Reports", "Settings"].map((n, i) => (
              <button
                key={n}
                className={`rounded-lg px-3 py-1.5 text-sm transition ${
                  i === 0
                    ? "bg-secondary/80 text-foreground"
                    : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-lg border border-border/60 bg-secondary/40 px-3 py-1.5 text-xs text-muted-foreground md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>クリエイティブ・案件を検索</span>
            <span className="ml-6 inline-flex items-center gap-1 rounded border border-border/60 px-1.5 py-0.5 text-[10px]">
              <Command className="h-3 w-3" /> K
            </span>
          </div>
          <button className="relative rounded-lg border border-border/60 bg-secondary/40 p-2 text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.22_350)]" />
          </button>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[image:var(--gradient-primary)] text-xs font-semibold text-primary-foreground">
            YT
          </div>
        </div>
      </div>
    </header>
  );
}
