import Link from "next/link";
import { CautionNote, FactNote, GuidePage } from "../_components/GuidePage";
import { GAME, makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Verity Horror Source Notes — What Was Verified",
  "See the dated official Roblox sources and evidence boundaries behind this independent Umek0 Games Verity [HORROR] beginner guide.",
  "/updates",
);

export default function UpdatesPage() {
  return (
    <GuidePage
      index="06 / 06"
      eyebrow="Source notes · Dated verification log"
      title="What we checked—and held back."
      intro="This is the compact evidence log behind the guide. It records what the official public data supports, what is an editorial recommendation, and what remains unpublished."
      next={{ href: "/quick-start", label: "Use the verified beginner route", text: "Return to the practical tutorial now that you know how its facts and recommendations are separated." }}
      related={["/about-this-version", "/faq"]}
    >
      <h2>{GAME.checked} source check</h2>
      <ul>
        <li>Confirmed Place {GAME.placeId} maps to Universe {GAME.universeId}.</li>
        <li>Confirmed {GAME.developer}, group {GAME.groupId}, as the creator.</li>
        <li>Recorded the API creation timestamp, current update timestamp, maximum universe player count, and published genre.</li>
        <li>Checked the official description for the daily routine, knock, unordered box, yellow sphere Verity, tonal change, headphones recommendation, and published controls.</li>
        <li>Checked the universe place list for the root experience, Part 1, Part 2, Night Shift, and Verity x Minecraft.</li>
        <li>Checked the official badge API for completions, guidance, team-size challenges, optional interactions, Night Shift rating conditions, survival milestones, resources, and named encounters.</li>
        <li>Separated this target from the Specter Development and Verity [REALISTIC] experiences.</li>
      </ul>
      <FactNote><p>The game title currently includes an update tag and the Games API changed on the day of this check. IDs are used as the durable identity anchor; time-sensitive labels are dated.</p></FactNote>

      <h2>Editorial recommendations on this site</h2>
      <ul>
        <li>Start with Part 1.</li>
        <li>Keep guidance available for the first completion.</li>
        <li>Change only one replay condition at a time.</li>
        <li>Learn Night Shift and survival as separate tracks.</li>
      </ul>
      <p>These recommendations are built from verified systems but are not claimed as official instructions.</p>

      <h2>Claims held back pending stronger evidence</h2>
      <ul>
        <li>Exact routes and place attribution for optional badge interactions.</li>
        <li>A complete Part 2 route.</li>
        <li>Unpublished mobile controls or a PC run key.</li>
        <li>Night Shift schedules, calculations, or guaranteed rating routes beyond badge text.</li>
        <li>Survival recipes, maps, resource locations, combat methods, or encounter triggers.</li>
      </ul>
      <CautionNote><p>Third-party walkthrough videos matching the correct game were found, but their individual steps could not be confirmed by a second source. They were not used as factual input.</p></CautionNote>

      <h2>How to report a mismatch to yourself</h2>
      <p>If the current build no longer matches a published description or badge condition, treat the live build as the newest signal, note the date, and return to the <Link href="/about-this-version">identity record</Link> before using another guide.</p>
    </GuidePage>
  );
}
