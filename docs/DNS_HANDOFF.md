# DNS handoff and recovery point

Prepared on 2026-08-19 without changing registrar DNS.

## Hosting decision

- Formal Vercel project: `verity-horror-umeko`
- Vercel project ID: `prj_BPt4t03gBBKxE3CjL8ij28NpyMdo`
- Production deployment ID: `dpl_Fc1n2P9XAPu5zC9veEKQZa8RCS5B`
- Stable Vercel alias: `https://verity-horror-umeko.vercel.app`
- Cloudflare Worker: preview/backup only; do not move the domain to Cloudflare nameservers.

## Nameservers to preserve

- `launch1.spaceship.net`
- `launch2.spaceship.net`

Do not migrate or replace these nameservers.

## Vercel's current highest-priority record set

Apply both apex A records; they are one recommended set and must not be reduced to one value.

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `216.198.79.1` |
| A | `@` | `64.29.17.1` |
| CNAME | `www` | `3a5c9ef8ea7c8b49.vercel-dns-017.com.` |

Both `verityhorror-umeko.wiki` and `www.verityhorror-umeko.wiki` are already attached to the Vercel project. They remain misconfigured until the records above are applied at Spaceship.

## Pre-change recovery point

Vercel's live DNS check reported these existing web records before any change:

| Type | Host | Value |
| --- | --- | --- |
| A | `@` | `34.216.117.25` |
| A | `@` | `54.149.79.189` |

No current `www` CNAME was returned by the same check. Preserve all unrelated TXT, MX, CAA, DKIM, DMARC, SPF, verification, and subdomain records.

Rollback if Vercel verification or TLS remains failed after the agreed propagation window, or if the previous service must be restored:

1. Remove the two new apex A values.
2. Restore both previous apex A values exactly.
3. Remove the new `www` CNAME if it was added.
4. Do not alter the Spaceship nameservers or unrelated records.

## Required continuation after browser release

1. Apply only the three Vercel web records above in Spaceship.
2. Verify both domains in Vercel and confirm `misconfigured: false`.
3. Confirm apex HTTPS is the Umek0 guide and `www` permanently redirects to apex.
4. Run the production launch verifier.
5. Verify the exact GSC property and submit `https://verityhorror-umeko.wiki/sitemap.xml` in that same property.
6. Record fresh evidence in `docs/POST_LAUNCH_CHECK.md`.
