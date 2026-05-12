export type Platform = "Meta" | "TikTok" | "Google";

export const platforms: Platform[] = ["Meta", "TikTok", "Google"];

export const platformColor: Record<Platform, string> = {
  Meta: "var(--meta)",
  TikTok: "var(--tiktok)",
  Google: "var(--google)",
};

export const projects = [
  "Glow Beauty Salon — 新規予約",
  "Lumière Esthé — 痩身体験",
  "Aurora Cosmetics — 化粧水LP",
  "Velvet Hair Lounge — 学割キャンペーン",
];

export const audiences = [
  "20代女性 / 美容関心層",
  "30代女性 / エイジングケア",
  "40代女性 / リフトアップ",
  "10代後半 / トレンド層",
];

export const creativeTypes = ["動画 (15s)", "動画 (30s)", "静止画", "カルーセル", "UGC"];

// KPI top cards
export interface KpiPoint { x: number; y: number }
export interface Kpi {
  key: string;
  label: string;
  value: string;
  raw: number;
  delta: number; // percent vs yesterday
  positiveIsGood: boolean;
  series: KpiPoint[];
  prefix?: string;
  suffix?: string;
}

const seed = (n: number, amp: number, base: number) =>
  Array.from({ length: 24 }, (_, i) => ({
    x: i,
    y: base + Math.sin(i / 2.4 + n) * amp + Math.cos(i / 1.7) * (amp / 2) + (Math.random() - 0.5) * (amp / 3),
  }));

export const kpis: Kpi[] = [
  { key: "spend",  label: "Spend",      value: "¥4,820,300", raw: 4820300, delta: 8.4,  positiveIsGood: false, series: seed(1, 18, 92), prefix: "¥" },
  { key: "imp",    label: "Impression", value: "12.4M",      raw: 12400000, delta: 12.1, positiveIsGood: true,  series: seed(2, 22, 88) },
  { key: "click",  label: "Click",      value: "284,219",    raw: 284219,   delta: 6.2,  positiveIsGood: true,  series: seed(3, 18, 80) },
  { key: "ctr",    label: "CTR",        value: "2.29%",      raw: 2.29,     delta: 4.8,  positiveIsGood: true,  series: seed(4, 8, 60), suffix: "%" },
  { key: "cv",     label: "CV",         value: "3,184",      raw: 3184,     delta: 14.2, positiveIsGood: true,  series: seed(5, 14, 70) },
  { key: "cpa",    label: "CPA",        value: "¥1,514",     raw: 1514,     delta: -9.6, positiveIsGood: false, series: seed(6, 12, 72), prefix: "¥" },
  { key: "roas",   label: "ROAS",       value: "412%",       raw: 412,      delta: 18.4, positiveIsGood: true,  series: seed(7, 24, 85), suffix: "%" },
];

// Creative comparison
export interface CreativeRow {
  id: string;
  name: string;
  thumb: string; // gradient id
  type: "video" | "image";
  metrics: Record<Platform, { ctr: number; cpa: number; cv: number; spend: number; roas: number }>;
  audience: string;
}

export const creatives: CreativeRow[] = [
  {
    id: "c1",
    name: "うるツヤ毛先 / 15秒動画",
    thumb: "g1",
    type: "video",
    audience: "20代女性 / 美容関心層",
    metrics: {
      Meta:   { ctr: 2.84, cpa: 1320, cv: 412, spend: 540000, roas: 480 },
      TikTok: { ctr: 4.92, cpa: 1180, cv: 388, spend: 460000, roas: 520 },
      Google: { ctr: 1.42, cpa: 2210, cv: 142, spend: 320000, roas: 280 },
    },
  },
  {
    id: "c2",
    name: "肌質改善BeforeAfter / 静止画",
    thumb: "g2",
    type: "image",
    audience: "30代女性 / エイジングケア",
    metrics: {
      Meta:   { ctr: 3.21, cpa: 980,  cv: 612, spend: 620000, roas: 612 },
      TikTok: { ctr: 2.10, cpa: 1640, cv: 198, spend: 280000, roas: 320 },
      Google: { ctr: 1.88, cpa: 1420, cv: 282, spend: 410000, roas: 388 },
    },
  },
  {
    id: "c3",
    name: "痩身モニター体験 / UGC",
    thumb: "g3",
    type: "video",
    audience: "30代女性 / エイジングケア",
    metrics: {
      Meta:   { ctr: 2.42, cpa: 1640, cv: 224, spend: 380000, roas: 360 },
      TikTok: { ctr: 5.84, cpa: 940,  cv: 482, spend: 480000, roas: 612 },
      Google: { ctr: 1.10, cpa: 2840, cv: 88,  spend: 260000, roas: 210 },
    },
  },
  {
    id: "c4",
    name: "新規割2,980円訴求 / カルーセル",
    thumb: "g4",
    type: "image",
    audience: "20代女性 / 美容関心層",
    metrics: {
      Meta:   { ctr: 2.18, cpa: 1480, cv: 312, spend: 460000, roas: 412 },
      TikTok: { ctr: 3.12, cpa: 1320, cv: 268, spend: 360000, roas: 442 },
      Google: { ctr: 2.42, cpa: 1180, cv: 388, spend: 480000, roas: 488 },
    },
  },
];

export const thumbGradients: Record<string, string> = {
  g1: "linear-gradient(135deg, oklch(0.78 0.16 200), oklch(0.72 0.20 295))",
  g2: "linear-gradient(135deg, oklch(0.82 0.15 60), oklch(0.72 0.22 350))",
  g3: "linear-gradient(135deg, oklch(0.78 0.18 155), oklch(0.78 0.16 200))",
  g4: "linear-gradient(135deg, oklch(0.72 0.22 350), oklch(0.62 0.22 285))",
};

// AI Insights
export interface Insight {
  id: string;
  tag: "好調" | "注意" | "提案" | "予測";
  title: string;
  body: string;
  platform?: Platform;
  score: number;
}

export const insights: Insight[] = [
  { id: "i1", tag: "好調", platform: "TikTok", score: 94,
    title: "TikTok / 20代女性向け15秒動画が高CTR",
    body: "「うるツヤ毛先」動画はTikTokで CTR 4.92% (媒体平均比 +163%)。同セグメントへ予算 +30% シフトを推奨。" },
  { id: "i2", tag: "好調", platform: "Meta", score: 88,
    title: "Meta静止画クリエイティブが高CV継続",
    body: "BeforeAfter静止画は3日連続でCPA ¥1,000未満。クリエイティブ疲弊度 12% と低く継続出稿が有効。" },
  { id: "i3", tag: "注意", platform: "Google", score: 41,
    title: "Google検索広告のCPAが悪化傾向",
    body: "「痩身モニター」KW群でCPCが前週比 +24%。除外キーワード追加と入札調整を提案します。" },
  { id: "i4", tag: "提案", score: 76,
    title: "オーディエンス類似拡張の好機",
    body: "Meta既存CV層の類似1%オーディエンスをTikTokへ複製することで、推定CV +18% / CPA -12% の改善見込み。" },
  { id: "i5", tag: "予測", score: 82,
    title: "週末ピークに向け予算枠不足の可能性",
    body: "土曜18-22時に過去4週連続でインプレッションが日予算で頭打ち。+¥120,000/日の確保を推奨。" },
];

// Heatmap: platform x audience -> ROAS
export const heatmap = {
  rows: audiences,
  cols: platforms,
  data: [
    [512, 588, 312],
    [482, 388, 412],
    [388, 282, 488],
    [212, 612, 188],
  ] as number[][],
};

// Live activity feed
export const liveEvents = [
  { t: "now", text: "TikTok / Glow Beauty Salon — 新規CV 1件 (+¥9,800)", platform: "TikTok" as Platform },
  { t: "12s", text: "Meta / Aurora Cosmetics — クリエイティブ自動入替", platform: "Meta" as Platform },
  { t: "38s", text: "Google / Velvet Hair Lounge — CPC -¥18 (改善)", platform: "Google" as Platform },
  { t: "1m",  text: "Meta / Lumière Esthé — 新規CV 2件 (+¥24,600)", platform: "Meta" as Platform },
  { t: "2m",  text: "TikTok / Aurora Cosmetics — CTR 5.2% 達成", platform: "TikTok" as Platform },
];
