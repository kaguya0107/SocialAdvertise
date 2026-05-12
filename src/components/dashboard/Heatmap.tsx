import { Fragment } from "react";
import { heatmap } from "@/lib/dashboard-data";

export function Heatmap() {
  const flat = heatmap.data.flat();
  const min = Math.min(...flat);
  const max = Math.max(...flat);
  const norm = (v: number) => (v - min) / (max - min || 1);

  return (
    <div className="glass gradient-border rounded-2xl p-4">
      <div className="mb-3 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Platform Performance Heatmap</h3>
          <p className="text-[11px] text-muted-foreground">オーディエンス × 媒体 — ROAS (%)</p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
          Low
          <span className="h-2 w-24 rounded-full bg-[linear-gradient(90deg,oklch(0.30_0.05_270),oklch(0.72_0.20_295),oklch(0.82_0.18_155))]" />
          High
        </div>
      </div>
      <div className="grid" style={{ gridTemplateColumns: "1.6fr repeat(3, 1fr)" }}>
        <div />
        {heatmap.cols.map((c) => (
          <div
            key={c}
            className="px-2 pb-2 text-center text-[11px] font-medium text-muted-foreground"
          >
            {c}
          </div>
        ))}
        {heatmap.rows.map((r, ri) => (
          <Fragment key={r}>
            <div className="flex items-center pr-3 text-[11px] text-muted-foreground">{r}</div>
            {heatmap.cols.map((_, ci) => {
              const v = heatmap.data[ri][ci];
              const n = norm(v);
              const bg = `oklch(${0.32 + n * 0.45} ${0.05 + n * 0.18} ${300 - n * 140} / ${0.35 + n * 0.55})`;
              return (
                <div key={ci} className="p-1">
                  <div
                    className="flex h-12 items-center justify-center rounded-lg text-[12px] font-semibold text-foreground/90 transition hover:scale-[1.03]"
                    style={{
                      background: bg,
                      boxShadow: n > 0.7 ? "0 0 24px -6px oklch(0.78 0.18 155 / 0.5)" : undefined,
                    }}
                  >
                    {v}%
                  </div>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
