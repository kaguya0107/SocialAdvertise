import { useState } from "react";
import { Calendar, ChevronDown, Filter, Users, Image as ImageIcon } from "lucide-react";
import { platforms, projects, audiences, creativeTypes, type Platform } from "@/lib/dashboard-data";

function Pill({
  active,
  onClick,
  children,
  color,
}: { active: boolean; onClick: () => void; children: React.ReactNode; color?: string }) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "border-primary/60 bg-primary/15 text-foreground"
          : "border-border/60 bg-secondary/30 text-muted-foreground hover:text-foreground"
      }`}
    >
      {color && <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />}
      {children}
    </button>
  );
}

function Select({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <button className="flex items-center gap-2 rounded-lg border border-border/60 bg-secondary/30 px-3 py-2 text-xs text-foreground hover:bg-secondary/50">
      <Icon className="h-3.5 w-3.5 text-muted-foreground" />
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
        <span className="font-medium">{value}</span>
      </div>
      <ChevronDown className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
    </button>
  );
}

export function Filters() {
  const [active, setActive] = useState<Platform[]>(["Meta", "TikTok", "Google"]);
  const toggle = (p: Platform) =>
    setActive((a) => (a.includes(p) ? a.filter((x) => x !== p) : [...a, p]));

  const platformColors: Record<Platform, string> = {
    Meta: "oklch(0.68 0.20 250)",
    TikTok: "oklch(0.72 0.22 350)",
    Google: "oklch(0.78 0.17 75)",
  };

  return (
    <div className="glass rounded-2xl p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 pr-2 text-xs font-medium text-muted-foreground">
            <Filter className="h-3.5 w-3.5" /> 媒体
          </span>
          {platforms.map((p) => (
            <Pill key={p} active={active.includes(p)} onClick={() => toggle(p)} color={platformColors[p]}>
              {p}
            </Pill>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select icon={Filter} label="案件" value={projects[0].split(" — ")[0]} />
          <Select icon={Calendar} label="期間" value="過去 7 日間" />
          <Select icon={Users} label="オーディエンス" value={audiences[0].split(" / ")[0]} />
          <Select icon={ImageIcon} label="クリエイティブ" value={creativeTypes[0]} />
        </div>
      </div>
    </div>
  );
}
