import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = join(root, "vercel-dist");
const clientDir = join(root, "dist", "client");
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", String(Date.now()));

const { default: worker } = await import(workerUrl.href);
const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

const routes = [
  "/",
  "/quick-start",
  "/core-loop",
  "/progression",
  "/common-mistakes",
  "/faq",
  "/about-this-version",
  "/updates",
  "/robots.txt",
  "/sitemap.xml",
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });
await cp(clientDir, outputDir, { recursive: true });

for (const route of routes) {
  const response = await worker.fetch(
    new Request(`https://verityhorror-umeko.wiki${route}`),
    env,
    ctx,
  );

  if (!response.ok) {
    throw new Error(`Static export failed for ${route}: HTTP ${response.status}`);
  }

  const destination = route === "/"
    ? join(outputDir, "index.html")
    : route.endsWith(".txt") || route.endsWith(".xml")
      ? join(outputDir, route.slice(1))
      : join(outputDir, route.slice(1), "index.html");

  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, await response.text());
}

const sitemap = await readFile(join(outputDir, "sitemap.xml"), "utf8");
if (!sitemap.includes("https://verityhorror-umeko.wiki/") || !sitemap.includes("<urlset")) {
  throw new Error("Static export produced an invalid sitemap host or document.");
}

console.log(`Exported ${routes.length} routes to ${outputDir}`);
