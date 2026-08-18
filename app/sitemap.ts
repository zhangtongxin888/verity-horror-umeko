import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "./_data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-19T00:00:00.000Z");

  return ROUTES.map((route) => ({
    url: new URL(route.href, SITE_URL).toString(),
    lastModified,
    changeFrequency: route.href === "/updates" ? "weekly" : "monthly",
    priority: route.href === "/" ? 1 : route.href === "/quick-start" ? 0.9 : 0.7,
  }));
}
