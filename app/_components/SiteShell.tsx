import Link from "@/components/StaticLink";
import { GAME } from "../_data/site";

export function SiteHeader() {
  return (
    <>
      <div className="identity-bar">
        <span className="verified-dot" aria-hidden="true" />
        <span>Verified target</span>
        <b>{GAME.developer}</b>
        <span className="identity-id">Place {GAME.placeId}</span>
        <Link href="/about-this-version">Check this version</Link>
      </div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="Verity Horror Briefing home">
          VERITY<span>{"//BRIEFING"}</span>
        </Link>
        <nav aria-label="Primary navigation">
          <Link className="nav-start" href="/quick-start">Start guide</Link>
          <Link href="/core-loop">Core Loop</Link>
          <Link href="/progression">Progression</Link>
          <Link href="/common-mistakes">Mistakes</Link>
          <Link href="/faq">FAQ</Link>
        </nav>
      </header>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div>
        <Link className="brand footer-brand" href="/">VERITY<span>{"//BRIEFING"}</span></Link>
        <p>An independent, evidence-led beginner guide for {GAME.name} by {GAME.developer}.</p>
      </div>
      <div className="footer-links">
        <Link href="/quick-start">Quick Start</Link>
        <Link href="/core-loop">Core Loop</Link>
        <Link href="/progression">Progression</Link>
        <Link href="/common-mistakes">Common Mistakes</Link>
        <Link href="/faq">FAQ</Link>
      </div>
      <div className="footer-evidence">
        <b>Guide target</b>
        <p>{GAME.developer}<br />Place {GAME.placeId}<br />Universe {GAME.universeId}</p>
        <Link href="/updates">Read the source notes →</Link>
      </div>
      <p className="footer-legal">
        Not affiliated with Roblox or {GAME.developer}. Roblox and all related marks belong to their respective owners.
        The official game link appears only in the <Link href="/about-this-version">identity record</Link>.
      </p>
    </footer>
  );
}
