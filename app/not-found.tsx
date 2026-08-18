import Link from "next/link";

export default function NotFound() {
  return (
    <main className="final-cta not-found">
      <p className="section-kicker warning-kicker">404 · ROUTE LOST</p>
      <h1>This briefing is missing.</h1>
      <p>Return to the verified beginner path and choose the next useful step from there.</p>
      <Link className="primary-button" href="/quick-start">Open the beginner tutorial <span aria-hidden="true">→</span></Link>
    </main>
  );
}
