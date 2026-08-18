import Link from "next/link";
import { GAME, makeMetadata } from "./_data/site";

export const metadata = makeMetadata(
  "Verity Horror Beginner Guide — Umek0 Games",
  "Start the Umek0 Games version of Verity [HORROR] with a verified Part 1 tutorial, then learn its modes, core loop, progression, and common mistakes.",
  "/",
  { socialImage: true },
);

const firstRun = [
  ["01", "Confirm the game", `Match ${GAME.developer} and Place ${GAME.placeId}.`],
  ["02", "Choose Part 1", "Use the story’s opening chapter as your first learning route."],
  ["03", "Keep guidance on", "Follow the visible objectives while you learn the interaction flow."],
  ["04", "Finish, then replay", "Complete Part 1 before adding team-size or no-guidance challenges."],
] as const;

const states = [
  { label: "I just joined", title: "Take the guided first route", text: "Identity check, settings, opening sequence, and official controls.", href: "/quick-start" },
  { label: "I am stuck", title: "Remove the wrong assumption", text: "Fix mixed-version tips, control myths, and mode confusion.", href: "/common-mistakes" },
  { label: "I finished Part 1", title: "Choose a progression track", text: "Replay with a new team size, no guidance, or another verified mode.", href: "/progression" },
] as const;

const mistakes = [
  ["Wrong Verity", "A matching title is not enough—check the creator and IDs."],
  ["Borrowed controls", "This version only publishes E on PC and a separate console map."],
  ["Mixed modes", "Part 1, Night Shift, and Verity x Minecraft have different goals."],
  ["Finished Part 2", "Its own official badge still says the chapter is not finished."],
] as const;

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Umek0 Games edition · Beginner-first · Checked {GAME.checked}</p>
          <h1>Survive your first run <em>with a plan.</em></h1>
          <p className="hero-lede">
            Start with the correct Verity, learn Part 1 in a safe order, then branch into team challenges, Night Shift, or survival without mixing in another game&apos;s rules.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/quick-start">Start the beginner tutorial <span aria-hidden="true">→</span></Link>
            <Link className="text-link" href="/common-mistakes">I&apos;m already stuck</Link>
          </div>
          <p className="trust-line">Only claims supported by the target experience&apos;s public Roblox records are treated as fact.</p>
        </div>

        <aside className="briefing-card" aria-labelledby="briefing-title">
          <div className="briefing-head"><span>FIRST-RUN BRIEFING</span><b>PART 1</b></div>
          <h2 id="briefing-title">Do these four things first.</h2>
          <ol>
            {firstRun.map(([number, title, text]) => (
              <li key={number}><span>{number}</span><div><b>{title}</b><small>{text}</small></div></li>
            ))}
          </ol>
          <Link href="/quick-start">Open the full walkthrough <span aria-hidden="true">↗</span></Link>
        </aside>
      </section>

      <section className="identity-panel" aria-label="Verified game identity">
        <div><span className="verified-dot" aria-hidden="true" /><b>Correct experience confirmed</b></div>
        <dl>
          <div><dt>Creator</dt><dd>{GAME.developer}</dd></div>
          <div><dt>Place</dt><dd>{GAME.placeId}</dd></div>
          <div><dt>Universe</dt><dd>{GAME.universeId}</dd></div>
        </dl>
        <Link href="/about-this-version">Why this identity matters →</Link>
      </section>

      <section className="home-section">
        <div className="section-heading">
          <p className="section-kicker">CHOOSE YOUR ENTRY POINT</p>
          <h2>What do you need right now?</h2>
          <p>Every route brings you back to a clear next step inside this guide.</p>
        </div>
        <div className="state-grid">
          {states.map((state, index) => (
            <Link href={state.href} key={state.label}>
              <span>0{index + 1}</span><small>{state.label}</small><h3>{state.title}</h3><p>{state.text}</p><b>Open route ↗</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="loop-section">
        <div>
          <p className="section-kicker">CORE LOOP · EDITORIAL MAP</p>
          <h2>Choose. Follow. Finish. Replay.</h2>
          <p>This is the safest high-level map across the verified modes: choose a chapter or mode, follow its objectives, respond to escalating events, complete its outcome, then replay with one new challenge.</p>
          <Link className="primary-button compact-button" href="/core-loop">Understand the full loop <span aria-hidden="true">→</span></Link>
        </div>
        <ol className="loop-list">
          <li><span>01</span><b>Choose a mode</b><small>Part 1 is the recommended first stop</small></li>
          <li><span>02</span><b>Follow objectives</b><small>Use guidance while learning</small></li>
          <li><span>03</span><b>Complete the run</b><small>Track the mode&apos;s own result</small></li>
          <li><span>04</span><b>Add one challenge</b><small>Team size, no guidance, or hidden interaction</small></li>
        </ol>
      </section>

      <section className="progression-band">
        <div className="section-heading split-heading">
          <div><p className="section-kicker">PROGRESSION</p><h2>Build confidence before complexity.</h2></div>
          <Link className="text-link" href="/progression">See the full route</Link>
        </div>
        <div className="progress-track" aria-label="Recommended progression">
          <div><span>START</span><b>Guided Part 1</b></div>
          <div><span>REPEAT</span><b>New team size</b></div>
          <div><span>CHALLENGE</span><b>No guidance</b></div>
          <div><span>BRANCH</span><b>Night Shift or survival</b></div>
        </div>
      </section>

      <section className="home-section">
        <div className="section-heading split-heading">
          <div><p className="section-kicker warning-kicker">COMMON MISTAKES</p><h2>Lose less time to wrong information.</h2></div>
          <Link className="text-link" href="/common-mistakes">Fix every mistake</Link>
        </div>
        <div className="mistake-grid">
          {mistakes.map(([title, text], index) => (
            <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>
          ))}
        </div>
      </section>

      <section className="faq-preview">
        <div>
          <p className="section-kicker">FAQ</p>
          <h2>Short answers, strict evidence.</h2>
          <p>The public record confirms Part 1, an unfinished Part 2, Night Shift, a Minecraft-style survival place, official controls, guidance challenges, and several replay paths.</p>
          <Link className="primary-button compact-button" href="/faq">Open all answers <span aria-hidden="true">→</span></Link>
        </div>
        <div className="faq-list">
          <details open><summary>Which Verity does this cover?</summary><p>{GAME.developer}, Place {GAME.placeId}, Universe {GAME.universeId}.</p></details>
          <details><summary>Where should a beginner start?</summary><p>Part 1 with guidance is this site&apos;s recommended first route.</p></details>
          <details><summary>Is Part 2 complete?</summary><p>No. Its official completion badge description says it is not finished yet.</p></details>
        </div>
      </section>

      <section className="final-cta">
        <p className="section-kicker">READY?</p>
        <h2>Make Part 1 your first clean finish.</h2>
        <p>Confirm the game, keep the first run guided, and learn only the controls this version actually publishes.</p>
        <Link className="primary-button" href="/quick-start">Start the beginner tutorial <span aria-hidden="true">→</span></Link>
      </section>
    </main>
  );
}
