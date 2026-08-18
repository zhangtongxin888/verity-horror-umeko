import { readFile, writeFile } from "node:fs/promises";

const configUrl = new URL("../dist/server/wrangler.json", import.meta.url);
const config = JSON.parse(await readFile(configUrl, "utf8"));

// vinext currently emits this retired Wrangler field. Modern Wrangler deploys
// each named environment as its own Worker, which matches the old true value.
delete config.legacy_env;

await writeFile(configUrl, JSON.stringify(config));
