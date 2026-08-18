# Verity Horror Briefing — Umek0 Games

Independent beginner-first guide for **Verity [HORROR]** by **Umek0 Games**.

- Production domain: https://verityhorror-umeko.wiki
- Roblox Place ID: 115614631321890
- Roblox Universe ID: 10519092644
- Repository: zhangtongxin888/verity-horror-umeko
- Formal Vercel project: verity-horror-umeko
- Backup Cloudflare Worker project: verity-horror-umeko

This independent repository is the site's only long-term source. It is not part of any shared multi-site repository.

## Development and checks

Install dependencies with `npm install`, then use `npm run dev`. Before release, run `npm run lint`, `npm test`, and `npm run deploy:cloudflare:dry-run`.

## Production deployment

`npm run deploy:vercel` deploys the formal production project. The apex is canonical and `www` permanently redirects to it. The Cloudflare Worker remains a preview/backup because the domain keeps Spaceship authoritative DNS and will not migrate nameservers.

Custom-domain DNS changes and Google Search Console work must wait for the launch controller's exclusive browser/DNS release for this site.

After the custom domain is live, record the four required real-time checks in `docs/POST_LAUNCH_CHECK.md`. A successful build, git push, or workers.dev deployment alone does not satisfy the completion gate.

The exact Vercel records, preserved Spaceship nameservers, and pre-change recovery values are recorded in `docs/DNS_HANDOFF.md`.

## Content accuracy

Gameplay claims are limited to the official experience description, Roblox Games and Places APIs, and official badge metadata checked on August 18, 2026. Editorial recommendations are labeled. This site does not mix in the Specter Development version or Verity [REALISTIC].
