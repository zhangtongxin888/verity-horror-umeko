import Link from "next/link";
import { AdviceNote, CautionNote, FactNote, GuidePage, StepList } from "../_components/GuidePage";
import { makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror Progression — What to Do After Part 1",
  "A practical progression route for Umek0 Games' Verity [HORROR]: guided Part 1, team-size replays, no-guidance challenges, hidden interactions, Night Shift, and survival.",
  "/progression",
);

export default function ProgressionPage() {
  return (
    <GuidePage
      index="03 / 06"
      eyebrow="Progression · From orientation to mastery"
      title="Add one challenge at a time."
      intro="There is no need to invent a skill tree. The public badges already reveal a useful progression ladder: finish a guided story run, repeat it under a new condition, then learn a separate mode on its own terms."
      next={{ href: "/common-mistakes", label: "Remove the common failure points", text: "Before the next run, check the mistakes that most often come from mixed versions, invented controls, and blurred mode boundaries." }}
      related={["/quick-start", "/core-loop"]}
    >
      <h2>The recommended progression ladder</h2>
      <StepList>
        <li><div><h3>Finish a guided Part 1 run</h3><p>Learn the opening, official controls, objective flow, and Part 1 completion milestone before adding constraints.</p></div></li>
        <li><div><h3>Repeat with a chosen team size</h3><p>Official badges separately recognize solo, partner, team, and squad completions. The badges confirm these routes exist, but not the exact player count behind every label.</p></div></li>
        <li><div><h3>Try Part 1 without guidance</h3><p>The “WHO NEEDS DIRECTIONS?” badge requires guidance to remain off from the beginning through completion. Attempt it after you can read the run without assistance.</p></div></li>
        <li><div><h3>Explore one badge-confirmed interaction</h3><p>Universe-level official badges confirm interactions involving a sandwich for Verity, staring at Verity for ten seconds, UM&apos;S Store, cashier Dan, a $0.50 gift, the basement computer, and a Detective. Their API records do not prove which place contains each interaction.</p></div></li>
        <li><div><h3>Branch into a separate mode</h3><p>Try the unfinished Part 2 as unfinished content, learn Night Shift&apos;s store-service loop, or start the survival place with its day milestones.</p></div></li>
      </StepList>
      <AdviceNote><p>This order is a beginner-friendly reading of the official evidence. Players may choose another route; the important rule is to keep each mode&apos;s goals separate.</p></AdviceNote>

      <h2>Three useful progression tracks</h2>
      <div className="track-grid">
        <section><span>STORY TRACK</span><h3>Part 1 → Part 2</h3><p>Finish Part 1, learn a replay condition, then enter Part 2 knowing its official completion badge still describes the chapter as unfinished.</p></section>
        <section><span>PRECISION TRACK</span><h3>Night Shift</h3><p>Work from basic store operation toward better ratings. Official S/S+ and perfect-solo badge text emphasizes customers, tasks, fridge doors, totals, change, and complaints.</p></section>
        <section><span>ENDURANCE TRACK</span><h3>Verity x Minecraft</h3><p>Use the official Day 10, 25, 50, and 100 badges as checkpoints. Resource and encounter badges establish the vocabulary but not exact recipes or routes.</p></section>
      </div>

      <h2>Night Shift: what higher ratings prove</h2>
      <ul>
        <li>S and S+ badges refer to groups of three to four players and coordinated store management.</li>
        <li>The S+ description requires no missed customers, tasks, or fridge doors.</li>
        <li>A perfect solo shift requires no lost customer, no complaint, and correct total and change calculations.</li>
        <li>Official badges also confirm a Watcher event beginning at 6 PM and service interactions involving it.</li>
      </ul>
      <FactNote><p>These are badge conditions, not a complete Night Shift walkthrough. Use the current build&apos;s objectives for the actions between milestones.</p></FactNote>

      <h2>Survival: use milestone goals, not invented recipes</h2>
      <p>The official badges confirm oak wood, torches, coal, iron, diamond, gold ingots, copper ingots, and several named hostile encounters. They do not document crafting formulas, spawn locations, maps, or combat tactics.</p>
      <CautionNote><p>The Part 1 Beta badge is explicitly marked unobtainable. Do not treat every badge returned by the API as a current progression goal.</p></CautionNote>
      <p>If a run does not match this structure, return to the <Link href="/about-this-version">identity check</Link> before changing your strategy.</p>
    </GuidePage>
  );
}
