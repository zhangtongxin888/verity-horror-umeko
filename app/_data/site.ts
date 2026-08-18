import type { Metadata } from "next";

export const SITE_URL = "https://verityhorror-umeko.wiki";

export const GAME = {
  name: "Verity [HORROR]",
  currentTitle: "[UPD] Verity [HORROR]",
  developer: "Umek0 Games",
  groupId: "119523662",
  placeId: "115614631321890",
  universeId: "10519092644",
  created: "July 17, 2026",
  checked: "August 18, 2026",
  updatedAtCheck: "August 18, 2026 at 05:51 UTC",
  maxPlayers: 50,
  genre: "Survival / 1 vs All",
  officialUrl: "https://www.roblox.com/games/115614631321890/Verity",
} as const;

export const ROUTES = [
  { href: "/", label: "Beginner Hub", short: "Start here" },
  { href: "/quick-start", label: "Quick Start", short: "Your first run" },
  { href: "/core-loop", label: "Core Loop", short: "How runs flow" },
  { href: "/progression", label: "Progression", short: "What to do next" },
  { href: "/common-mistakes", label: "Mistakes", short: "Recover faster" },
  { href: "/faq", label: "FAQ", short: "Direct answers" },
  { href: "/about-this-version", label: "Version Check", short: "Confirm the game" },
  { href: "/updates", label: "Source Notes", short: "Evidence log" },
] as const;

export function makeMetadata(
  title: string,
  description: string,
  path: string,
  options: { socialImage?: boolean } = {},
): Metadata {
  const canonical = new URL(path, SITE_URL).toString();
  const socialImage = options.socialImage
    ? [{ url: "/og.png", width: 1536, height: 1024, alt: "Verity Horror beginner survival guide, Umek0 Games edition" }]
    : [];

  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "Verity Horror Briefing",
      title,
      description,
      images: socialImage,
    },
    twitter: {
      card: options.socialImage ? "summary_large_image" : "summary",
      title,
      description,
      images: socialImage,
    },
  };
}
