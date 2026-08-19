import Link from "@/components/StaticLink";
import { AdviceNote, CautionNote, FactNote, GuidePage, StepList } from "../_components/GuidePage";
import { makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror Core Loop — Parts, Objectives & Replays",
  "Understand the evidence-based core loop of Umek0 Games' Verity [HORROR], including Part 1, Part 2, Night Shift, survival, objectives, outcomes, and replay challenges.",
  "/core-loop",
);

export default function CoreLoopPage() {
  return (
    <GuidePage
      index="02 / 06"
      eyebrow="Core loop · How a run moves"
      title="Choose. Follow. Finish. Replay."
      intro="The universe contains several distinct experiences. Their exact tasks differ, but the official place list and badges support one useful high-level loop. This page labels that loop as an editorial map—not a developer-published formula."
      next={{ href: "/progression", label: "Choose your progression track", text: "Turn the loop into a deliberate sequence of guided, replay, challenge, and mode-specific goals." }}
      related={["/quick-start", "/faq"]}
    >
      <h2>The four-part loop</h2>
      <StepList>
        <li><div><h3>Choose the correct chapter or mode</h3><p>Part 1, Part 2, Night Shift, and Verity x Minecraft are separate official places inside the same universe. Start by deciding which ruleset you are learning.</p></div></li>
        <li><div><h3>Follow objectives and interact</h3><p>The official description publishes an interact control, while badges refer to guidance, objectives, customers, stocking, calculations, resources, and survival milestones.</p></div></li>
        <li><div><h3>Reach that mode&apos;s own result</h3><p>Part 1 has a completion badge. Part 2 has a completion badge whose description says the chapter is unfinished. Night Shift scores store performance. Survival tracks days and resources.</p></div></li>
        <li><div><h3>Replay with one deliberate challenge</h3><p>Official badges support team-size variations, no-guidance runs, a named modifier, optional interactions, service quality, and longer survival goals.</p></div></li>
      </StepList>
      <AdviceNote><p>“Choose → Follow → Finish → Replay” is this guide&apos;s synthesis of the public mode and badge records. Use it to organize learning, not as an official rule displayed by the game.</p></AdviceNote>

      <h2 id="mode-differences">How the verified modes differ</h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal overflow needs a keyboard focus target. */}
      <div className="table-scroll" role="region" aria-label="Verified Verity mode differences" tabIndex={0}>
        <table className="fact-table">
          <thead><tr><th scope="col">Place</th><th scope="col">Public evidence supports</th><th scope="col">Best beginner use</th></tr></thead>
          <tbody>
            <tr><td>Part 1</td><td>Story opening, guidance, completion, several team sizes and a named modifier</td><td>Learn the base interaction flow</td></tr>
            <tr><td>Part 2</td><td>Completion, no-guidance challenge and a Verity monster-form death badge; official text says unfinished</td><td>Explore only after Part 1</td></tr>
            <tr><td>Night Shift</td><td>Customers, stocking, totals, change, fridge doors, ratings and Watcher events</td><td>Practice service accuracy and store management</td></tr>
            <tr><td>Verity x Minecraft</td><td>Day 10/25/50/100 survival, wood, torches, ores and named hostile events</td><td>Treat as its own survival track</td></tr>
          </tbody>
        </table>
      </div>

      <h2>What carries across modes</h2>
      <ul>
        <li>Read the current objective before acting.</li>
        <li>Use the official interact mapping for your platform.</li>
        <li>Record the actual result or badge instead of assuming another mode&apos;s rules.</li>
        <li>Change one challenge variable per replay so you can tell what improved.</li>
      </ul>
      <FactNote><p>The universe&apos;s public API currently lists five places: the root experience, Part 1, Part 2, Night Shift, and Verity x Minecraft. See the exact IDs on the <Link href="/about-this-version">version page</Link>.</p></FactNote>

      <h2>Facts the public records do not prove</h2>
      <p>Badge names can confirm that an event, item, score, or milestone exists. They do not prove a complete route, map, recipe, spawn rule, or enemy strategy. This guide therefore avoids publishing those details as fact without stronger current evidence.</p>
      <CautionNote><p>A detailed third-party walkthrough may be useful to watch, but it was not used as a factual source here because its individual steps could not be independently confirmed for this exact version.</p></CautionNote>
    </GuidePage>
  );
}
