import assert from "node:assert/strict";
import { readdir } from "node:fs/promises";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("test", String(Date.now()));
const { default: worker } = await import(workerUrl.href);

const env = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
};
const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

async function request(route, accept = "text/html") {
  return worker.fetch(
    new Request("https://verityhorror-umeko.wiki" + route, { headers: { accept } }),
    env,
    ctx,
  );
}

const pages = [
  ["/", "Survive your first run", "Verity Horror Beginner Guide"],
  ["/quick-start", "Your first clean Part 1 run", "Verity Horror Quick Start"],
  ["/core-loop", "Choose. Follow. Finish. Replay.", "Verity Horror Core Loop"],
  ["/progression", "Add one challenge at a time", "Verity Horror Progression"],
  ["/common-mistakes", "Fix the information problem first", "Verity Horror Common Mistakes"],
  ["/faq", "Clear answers. Honest limits.", "Verity Horror FAQ"],
  ["/about-this-version", "Follow the IDs, not the title", "Which Verity Is This"],
  ["/updates", "What we checked", "Verity Horror Source Notes"],
];

for (const [route, visibleText, titleText] of pages) {
  test("renders " + route + " with identity, metadata, and security headers", async () => {
    const response = await request(route);
    assert.equal(response.status, 200);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");

    const html = await response.text();
    assert.match(html, new RegExp(visibleText.replace(/[.*+?^$()|[\]{}]/g, "\\$&"), "i"));
    assert.match(html, new RegExp("<title>[^<]*" + titleText.replace(/[.*+?^$()|[\]{}]/g, "\\$&"), "i"));
    assert.match(html, /115614631321890/);
    assert.match(html, /10519092644/);
    assert.match(html, /Umek0 Games/);
    assert.doesNotMatch(html, /leave(?:s|ing)? (?:a )?closet/i);
    const canonicalUrlPattern = route === "/"
      ? "https://verityhorror-umeko\\.wiki/?"
      : "https://verityhorror-umeko\\.wiki" + route;
    assert.match(html, new RegExp('rel="canonical"[^>]+href="' + canonicalUrlPattern + '"', "i"));
    assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/i);

    if (route === "/") {
      assert.match(html, /og:image/);
      assert.match(html, /https:\/\/verityhorror-umeko\.wiki\/og\.png/);
      assert.doesNotMatch(html, /Specter Development|three-day|Shift to run/i);
    } else {
      assert.doesNotMatch(html, /https:\/\/verityhorror-umeko\.wiki\/og\.png/);
    }
  });
}

test("keeps the primary journey internal and every internal page link valid", async () => {
  const knownRoutes = new Set(pages.map(([route]) => route));

  for (const [route] of pages) {
    const response = await request(route);
    const html = await response.text();
    const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
    for (const href of hrefs) {
      if (!href.startsWith("/") || href.startsWith("/_next/") || href === "/og.png") continue;
      const pathname = href.split(/[?#]/, 1)[0] || "/";
      assert.ok(knownRoutes.has(pathname), `Unknown internal route ${href} linked from ${route}`);
    }
  }

  const home = await (await request("/")).text();
  assert.match(home, /href="\/quick-start"[^>]*>Start the beginner tutorial/i);
  assert.doesNotMatch(home, /class="primary-button"[^>]+href="https?:\/\//i);
});

test("publishes FAQ structured data", async () => {
  const response = await request("/faq");
  const html = await response.text();
  assert.match(html, /"@type":"FAQPage"/);
  assert.match(html, /Is Part 2 complete/);
  assert.match(html, /not finished yet/i);
});

test("publishes crawlable robots and complete sitemap", async () => {
  const robots = await request("/robots.txt", "text/plain");
  assert.equal(robots.status, 200);
  const robotsText = await robots.text();
  assert.match(robotsText, /Allow:\s*\//);
  assert.match(robotsText, /https:\/\/verityhorror-umeko\.wiki\/sitemap\.xml/);

  const sitemap = await request("/sitemap.xml", "application/xml");
  assert.equal(sitemap.status, 200);
  assert.match(sitemap.headers.get("content-type") ?? "", /xml/i);
  const xml = await sitemap.text();
  assert.match(xml, /<urlset/);
  for (const [route] of pages) {
    const url = "https://verityhorror-umeko.wiki" + (route === "/" ? "/" : route);
    assert.match(xml, new RegExp(url.replace(/[.*+?^$()|[\]{}]/g, "\\$&")));
  }
  assert.equal((xml.match(/<url>/g) ?? []).length, pages.length);
  assert.doesNotMatch(xml, /verityhorror\.wiki/);
});

test("static output does not load the Vinext link runtime", async () => {
  const chunks = await readdir(new URL("../dist/client/_next/static/chunks/", import.meta.url));
  assert.equal(chunks.filter((name) => name.startsWith("link-") && name.endsWith(".js")).length, 0);
});
