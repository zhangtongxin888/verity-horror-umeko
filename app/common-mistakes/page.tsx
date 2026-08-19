import Link from "@/components/StaticLink";
import { CautionNote, FactNote, GuidePage } from "../_components/GuidePage";
import { GAME, makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror Common Mistakes — Fix Your Run",
  "Fix common beginner mistakes in Umek0 Games' Verity [HORROR]: wrong-game guides, borrowed controls, mode confusion, unfinished Part 2 assumptions, and bad badge advice.",
  "/common-mistakes",
);

const mistakes = [
  {
    title: "Trusting the title instead of the IDs",
    symptom: "A guide describes mechanics or story beats that never appear in your game.",
    fix: `Match ${GAME.developer}, Place ${GAME.placeId}, and Universe ${GAME.universeId} before following the advice.`,
    href: "/about-this-version",
    link: "Verify this version",
  },
  {
    title: "Importing controls from another Verity",
    symptom: "You expect Shift to run or use a console mapping that the Umek0 description does not publish.",
    fix: "Use only the published mapping: PC E to interact; console A to confirm, X to interact/complete/leave cabinets, B to go back/leave party, and 1/3 for dialogue selection.",
    href: "/quick-start#controls",
    link: "Review official controls",
  },
  {
    title: "Mixing every mode into one walkthrough",
    symptom: "Story objectives, shop tasks, resources, and survival days are presented as one continuous route.",
    fix: "Treat Part 1, Part 2, Night Shift, and Verity x Minecraft as separate rulesets inside one universe.",
    href: "/core-loop#mode-differences",
    link: "Compare the modes",
  },
  {
    title: "Calling Part 2 complete",
    symptom: "A checklist treats its endpoint as a finished chapter with a settled route.",
    fix: "Use the official badge wording: the completion badge says Part 2 is not finished yet.",
    href: "/faq#part-2",
    link: "Read the Part 2 answer",
  },
  {
    title: "Treating every badge as obtainable",
    symptom: "An achievement list asks you to chase old, temporary, or zero-award records.",
    fix: "Use only clearly current milestones. The Part 1 Beta badge is explicitly marked unobtainable.",
    href: "/progression",
    link: "Use the progression route",
  },
  {
    title: "Turning a badge name into a full strategy",
    symptom: "A guide invents recipes, routes, locations, or enemy behavior from a short achievement description.",
    fix: "Let badges prove only what they state. Follow live objectives for everything in between.",
    href: "/updates",
    link: "See the evidence boundary",
  },
] as const;

export default function CommonMistakesPage() {
  return (
    <GuidePage
      index="04 / 06"
      eyebrow="Common mistakes · Fast recovery"
      title="Fix the information problem first."
      intro="Most early confusion is recoverable. Start by removing the wrong version, control, mode, or evidence assumption—then repeat one clean run."
      next={{ href: "/faq", label: "Check the direct answers", text: "Use the FAQ to settle version, controls, multiplayer, guidance, and unfinished-content questions before returning to the tutorial." }}
      related={["/quick-start", "/about-this-version"]}
    >
      <h2>Six mistakes to remove now</h2>
      <div className="mistake-list">
        {mistakes.map((mistake, index) => (
          <section key={mistake.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{mistake.title}</h3>
              <p><strong>What it looks like:</strong> {mistake.symptom}</p>
              <p><strong>Better move:</strong> {mistake.fix}</p>
              <Link href={mistake.href}>{mistake.link} →</Link>
            </div>
          </section>
        ))}
      </div>
      <FactNote><p>The strongest identity anchors are the creator, Place ID, and Universe ID. Titles and update tags can change.</p></FactNote>

      <h2>Details this guide deliberately does not invent</h2>
      <ul>
        <li>A mobile control map or PC run key.</li>
        <li>Exact routes for optional badge interactions.</li>
        <li>A complete Part 2 walkthrough.</li>
        <li>Night Shift customer schedules or a guaranteed score route.</li>
        <li>Survival crafting recipes, resource locations, or enemy tactics.</li>
      </ul>
      <CautionNote><p>“Not verified” does not mean a detail is false. It means the public evidence checked for this exact experience does not support publishing it as fact.</p></CautionNote>
    </GuidePage>
  );
}
