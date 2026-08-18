import Link from "next/link";
import { CautionNote, GuidePage } from "../_components/GuidePage";
import { GAME, SITE_URL, makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror FAQ — Umek0 Games Version",
  "Verified answers for Umek0 Games' Verity [HORROR]: game identity, Part 1, Part 2 status, controls, guidance, multiplayer, Night Shift, survival, and guide scope.",
  "/faq",
);

const faqs = [
  ["Who made the Verity covered here?", `${GAME.developer}, the Roblox group attached to Universe ${GAME.universeId}.`],
  ["Which Roblox experience is this?", `Place ${GAME.placeId}, Universe ${GAME.universeId}. This is not the Specter Development version or Verity [REALISTIC].`],
  ["When was this version created?", `Roblox's Games API reports ${GAME.created}.`],
  ["Where should a beginner start?", "This guide recommends Verity Part 1 with guidance available. That order is beginner advice based on the official place and badge structure, not a mandatory developer rule."],
  ["What happens at the start of Part 1?", "The official description begins with a daily routine, a knock, an unordered mysterious box, and the discovery of the yellow sphere creature Verity after the box is placed on a table."],
  ["What is the PC control?", "The official description publishes E to interact. It does not publish a PC run key."],
  ["What are the console controls?", "A selects or confirms a menu; X interacts, completes an objective, or leaves cabinets; B goes back or leaves a party; dialogue selection uses 1 for up and 3 for down."],
  ["Are mobile controls documented?", "Not in the official public description checked for this guide, so this site does not invent a mapping."],
  ["Does the game have guidance?", "Yes. An official Part 1 badge requires guidance to be disabled from the beginning through completion."],
  ["Can Part 1 be completed with different group sizes?", "Official badges separately recognize solo, partner, team, and squad completions. Their names do not establish every mode's exact player limit."],
  ["Is Part 2 complete?", "No. The official Finish Part 2 badge description says it is not finished yet."],
  ["What is Night Shift?", "Official badges identify an UM's store shift involving customers, stocking, totals, change, fridge doors, ratings, and Watcher events."],
  ["What does Verity x Minecraft include?", "Official badges confirm day-survival milestones, named resources, and hostile encounters. They do not publish full recipes or routes."],
  ["Is this the same as the Specter Development game?", "No. The creator and both Roblox IDs differ, and controls or story facts from that experience must not be copied here."],
  ["Is this an official website?", `No. It is an independent guide and is not affiliated with Roblox or ${GAME.developer}.`],
] as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(([question, answer]) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
  url: SITE_URL + "/faq",
};

export default function FaqPage() {
  return (
    <GuidePage
      index="05 / 06"
      eyebrow="FAQ · Verified short answers"
      title="Clear answers. Honest limits."
      intro="Every factual answer below comes from the target experience's public Roblox description, Games API, official place list, or official badges. Recommendations are labeled as recommendations."
      next={{ href: "/quick-start", label: "Return to the beginner tutorial", text: "Put the answers into practice with the version check, published controls, guided Part 1 route, and a clear first completion goal." }}
      related={["/about-this-version", "/updates"]}
    >
      <div className="faq-list long-faq">
        {faqs.map(([question, answer], index) => (
          <details key={question} open={index === 0} id={question === "Is Part 2 complete?" ? "part-2" : undefined}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      <CautionNote><p>Need a sequence instead of a short answer? Use the <Link href="/quick-start">Quick Start</Link>, then continue to the <Link href="/core-loop">Core Loop</Link>.</p></CautionNote>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    </GuidePage>
  );
}
