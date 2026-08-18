import Link from "next/link";
import { AdviceNote, CautionNote, FactNote, GuidePage, StepList } from "../_components/GuidePage";
import { GAME, makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror Quick Start — Umek0 Games Part 1",
  "A verified first-run tutorial for Umek0 Games' Verity [HORROR]: confirm the right game, choose Part 1, use guidance, learn official controls, and finish cleanly.",
  "/quick-start",
);

export default function QuickStartPage() {
  return (
    <GuidePage
      index="01 / 06"
      eyebrow="Quick start · The beginner route"
      title="Your first clean Part 1 run."
      intro="This tutorial separates official facts from beginner recommendations. It gives you a useful first route without borrowing controls, story beats, or objectives from another Verity."
      next={{ href: "/core-loop", label: "Understand the core loop", text: "Now that you have a first route, learn how the verified chapters and modes fit into one repeatable pattern." }}
      related={["/common-mistakes", "/about-this-version"]}
    >
      <h2>Step zero: confirm the experience</h2>
      <p>The Roblox title alone is not enough. This guide covers <strong>{GAME.name}</strong> by <strong>{GAME.developer}</strong>, Place <strong>{GAME.placeId}</strong>, Universe <strong>{GAME.universeId}</strong>.</p>
      <FactNote><p>If any of those values differs, use a guide for that other experience. The <Link href="/about-this-version">identity record</Link> shows the official API links used here.</p></FactNote>

      <h2>Prepare before you choose a mode</h2>
      <StepList>
        <li><div><h3>Use headphones if comfortable</h3><p>The official description recommends headphones. Set a volume that keeps the horror readable without making the session uncomfortable.</p></div></li>
        <li><div><h3>Choose Verity Part 1</h3><p>The universe includes Part 1, Part 2, Night Shift, and Verity x Minecraft places. This guide recommends Part 1 as the clearest first learning route.</p></div></li>
        <li><div><h3>Keep guidance available</h3><p>An official badge rewards finishing Part 1 with guidance disabled from the beginning, which confirms that a guidance system exists. Learn with it first; turn it off on a later challenge run.</p></div></li>
      </StepList>
      <AdviceNote><p>Part 1 first and guidance on are editorial recommendations based on the verified mode and badge structure. They are not mandatory rules published by the developer.</p></AdviceNote>

      <h2 id="controls">Learn only the published controls</h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal overflow needs a keyboard focus target. */}
      <div className="table-scroll" role="region" aria-label="Official controls by platform" tabIndex={0}>
        <table className="fact-table">
          <thead><tr><th scope="col">Platform</th><th scope="col">Action</th><th scope="col">Control</th></tr></thead>
          <tbody>
            <tr><td>PC</td><td>Interact</td><td>E</td></tr>
            <tr><td>Console</td><td>Select / confirm menu</td><td>A</td></tr>
            <tr><td>Console</td><td>Interact / complete objective / leave cabinets</td><td>X</td></tr>
            <tr><td>Console</td><td>Back / leave party</td><td>B</td></tr>
            <tr><td>Console dialogue</td><td>Move selection up / down</td><td>1 / 3</td></tr>
          </tbody>
        </table>
      </div>
      <CautionNote><p>The official description checked for this guide does not publish a mobile mapping or a run key. Do not import Shift or other controls from a different Verity.</p></CautionNote>

      <h2>Your first-run sequence</h2>
      <StepList>
        <li><div><h3>Complete the daily routine</h3><p>The official story description begins with the player waking up and following an ordinary routine. Use the visible objectives rather than a third-party route.</p></div></li>
        <li><div><h3>Respond to the knock</h3><p>A mysterious package arrives even though the player did not order it. Continue by following the current build&apos;s prompts.</p></div></li>
        <li><div><h3>Place the box on the table</h3><p>The official description says this is where the yellow sphere creature, Verity, is discovered.</p></div></li>
        <li><div><h3>Follow objectives as the tone changes</h3><p>Verity presents itself as a cheerful helper and friend, then becomes increasingly strange and unsettling while watching and listening.</p></div></li>
        <li><div><h3>Finish Part 1</h3><p>An official “Finish part 1” badge confirms the completion milestone. Make that your first full objective before optimizing routes or hunting optional interactions.</p></div></li>
      </StepList>

      <h2>What to do immediately after finishing</h2>
      <p>Pick only one new variable for the next run: a different verified team-size challenge, no guidance, the “verity&apos;s already here” modifier, or one optional badge interaction. The <Link href="/progression">progression route</Link> explains those choices without turning the badge list into an invented walkthrough.</p>
    </GuidePage>
  );
}
