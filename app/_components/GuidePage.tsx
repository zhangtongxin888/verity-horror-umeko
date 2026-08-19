import Link from "@/components/StaticLink";
import type { ReactNode } from "react";
import { GAME, ROUTES } from "../_data/site";

export function GuidePage({
  index,
  eyebrow,
  title,
  intro,
  children,
  next,
  related,
}: {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  next: { href: string; label: string; text: string };
  related: readonly string[];
}) {
  const relatedRoutes = ROUTES.filter((route) => related.includes(route.href));

  return (
    <main>
      <section className="guide-hero">
        <p className="page-index">{index}</p>
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="guide-intro">{intro}</p>
        </div>
      </section>

      <div className="guide-layout">
        <aside className="guide-rail">
          <span className="status-label">✓ VERIFIED SCOPE</span>
          <p>{GAME.developer}<br />Place {GAME.placeId}<br />Checked {GAME.checked}</p>
          <Link href="/about-this-version">See identity record →</Link>
        </aside>
        <article className="guide-article">{children}</article>
      </div>

      <section className="next-step" aria-labelledby="next-step-title">
        <p className="section-kicker">YOUR NEXT BRIEFING</p>
        <h2 id="next-step-title">{next.label}</h2>
        <p>{next.text}</p>
        <Link className="primary-button" href={next.href}>Continue <span aria-hidden="true">→</span></Link>
      </section>

      <section className="related-reading" aria-labelledby="related-title">
        <p className="section-kicker">OTHER USEFUL FILES</p>
        <h2 id="related-title">Related reading</h2>
        <div className="related-grid">
          {relatedRoutes.map((route) => (
            <Link href={route.href} key={route.href}>
              <small>{route.short}</small>
              <b>{route.label}</b>
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export function FactNote({ children, label = "Verified fact" }: { children: ReactNode; label?: string }) {
  return <aside className="fact-note"><b>{label}</b><div>{children}</div></aside>;
}

export function AdviceNote({ children }: { children: ReactNode }) {
  return <aside className="advice-note"><b>Beginner recommendation</b><div>{children}</div></aside>;
}

export function CautionNote({ children }: { children: ReactNode }) {
  return <aside className="caution-note"><b>Evidence boundary</b><div>{children}</div></aside>;
}

export function StepList({ children }: { children: ReactNode }) {
  return <ol className="step-list">{children}</ol>;
}
