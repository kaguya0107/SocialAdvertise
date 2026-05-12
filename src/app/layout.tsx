import type { Metadata } from "next";

import "./globals.css";
import { Providers } from "./providers";

const OG_IMAGE =
  "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/505a21da-bbfd-4b1e-abab-588cb592f46e/id-preview-1adee4f1--fabc9add-9bb8-4bda-8c9e-3ecd056522ef.lovable.app-1778547899739.png";

export const metadata: Metadata = {
  title: "Lumina Ads — AI広告統合ダッシュボード",
  description: "Meta・TikTok・Google広告をリアルタイム統合分析。美容サロン向けAI広告分析SaaS。",
  authors: [{ name: "Lumina Ads" }],
  openGraph: {
    title: "Lumina Ads — AI広告統合ダッシュボード",
    description: "Meta・TikTok・Google広告をリアルタイム統合分析。美容サロン向けAI広告分析SaaS。",
    type: "website",
    images: [{ url: OG_IMAGE }],
  },
  twitter: {
    card: "summary",
    site: "@Lovable",
    title: "Lumina Ads — AI広告統合ダッシュボード",
    description: "Meta・TikTok・Google広告をリアルタイム統合分析。美容サロン向けAI広告分析SaaS。",
    images: [OG_IMAGE],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className="dark">
      <body className="dark">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
