import { AdsterraPopunderGate, AdsterraSocialBarGate, AdsterraStickyRail, AdsterraGlobalFallback } from "@/components/ads";
import type { Metadata, Viewport } from "next";
import { SiteFooter, SiteHeader } from "./_components/SiteShell";
import { GAME, SITE_URL } from "./_data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Verity Horror Guide — Umek0 Games Beginner Tutorial", template: "%s | Verity Horror Guide" },
  description: "A verified beginner tutorial for Umek0 Games' Verity [HORROR], covering Part 1, the core loop, progression, common mistakes, modes, controls, and FAQ.",
  applicationName: "Verity Horror Briefing",
  category: "games",
  keywords: ["Verity Horror", "Verity Roblox", "Verity guide", "Umek0 Games", "Verity Part 1"],
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0c0a0b",
  width: "device-width",
  initialScale: 1,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Verity Horror Briefing",
  url: SITE_URL,
  description: `Independent beginner guide for ${GAME.name} by ${GAME.developer}.`,
  about: {
    "@type": "VideoGame",
    name: GAME.name,
    gamePlatform: "Roblox",
    author: { "@type": "Organization", name: GAME.developer },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AdsterraPopunderGate />
        <AdsterraSocialBarGate />
        <AdsterraStickyRail />
        <AdsterraGlobalFallback />
        <a className="skip-link" href="#main-content">Skip to guide</a>
        <SiteHeader />
        <div id="main-content" tabIndex={-1}>{children}</div>
        <SiteFooter />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
