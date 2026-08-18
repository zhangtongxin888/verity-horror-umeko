import Link from "next/link";
import { FactNote, GuidePage } from "../_components/GuidePage";
import { GAME, makeMetadata } from "../_data/site";

export const metadata = makeMetadata(
  "Which Verity Is This? — Umek0 Games Identity",
  `Verify the exact Verity [HORROR] covered here: ${GAME.developer}, Place ${GAME.placeId}, Universe ${GAME.universeId}, created ${GAME.created}.`,
  "/about-this-version",
);

const places = [
  ["115614631321890", "[UPD] Verity [HORROR]", "Root experience"],
  ["117154059118959", "Verity [Part 1]", "Story chapter"],
  ["132198722852520", "Verity Part 2", "Official badge says unfinished"],
  ["140069631726929", "Verity [Night Shift]", "Store-service mode"],
  ["85462782685147", "Verity x Minecraft", "Survival mode"],
] as const;

export default function AboutVersionPage() {
  return (
    <GuidePage
      index="ID / RECORD"
      eyebrow="Version identity · Prevent mixed-game advice"
      title="Follow the IDs, not the title."
      intro="Several Roblox experiences use Verity in their names. Creator, Place ID, and Universe ID are the reliable way to keep a walkthrough attached to the correct game."
      next={{ href: "/quick-start", label: "Start the correct beginner route", text: "With the target confirmed, move into Part 1 using only this version's published controls and story facts." }}
      related={["/updates", "/common-mistakes"]}
    >
      <h2>Verified target record</h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal overflow needs a keyboard focus target. */}
      <div className="table-scroll" role="region" aria-label="Verified game identity record" tabIndex={0}>
        <table className="fact-table">
          <tbody>
            <tr><th scope="row">Current title</th><td>{GAME.currentTitle}</td></tr>
            <tr><th scope="row">Creator</th><td>{GAME.developer} · Roblox group {GAME.groupId}</td></tr>
            <tr><th scope="row">Root Place ID</th><td>{GAME.placeId}</td></tr>
            <tr><th scope="row">Universe ID</th><td>{GAME.universeId}</td></tr>
            <tr><th scope="row">Created</th><td>{GAME.created}</td></tr>
            <tr><th scope="row">Updated at last check</th><td>{GAME.updatedAtCheck}</td></tr>
            <tr><th scope="row">Universe capacity</th><td>Up to {GAME.maxPlayers} players</td></tr>
            <tr><th scope="row">Published genre</th><td>{GAME.genre}</td></tr>
          </tbody>
        </table>
      </div>
      <FactNote><p>The root Place lookup maps to Universe {GAME.universeId}, and the Games API names {GAME.developer} as the creator. Both were checked on {GAME.checked}.</p></FactNote>

      <h2>Official places inside this universe</h2>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- Horizontal overflow needs a keyboard focus target. */}
      <div className="table-scroll" role="region" aria-label="Official places in the Verity universe" tabIndex={0}>
        <table className="fact-table">
          <thead><tr><th scope="col">Place ID</th><th scope="col">Official name</th><th scope="col">Guide role</th></tr></thead>
          <tbody>{places.map(([id, name, role]) => <tr key={id}><td>{id}</td><td>{name}</td><td>{role}</td></tr>)}</tbody>
        </table>
      </div>

      <h2>Known different experiences</h2>
      <ul>
        <li><strong>Specter Development Verity:</strong> root Place 102512776849655, Universe 10369900243. Its story and controls are not sources for this guide.</li>
        <li><strong>Verity [REALISTIC]:</strong> Place 120944686522212. It is also outside this guide&apos;s scope.</li>
      </ul>

      <h2>Official evidence links</h2>
      <ul className="source-list">
        <li><a href={`https://apis.roblox.com/universes/v1/places/${GAME.placeId}/universe`} rel="nofollow external">Roblox Place-to-Universe lookup ↗</a></li>
        <li><a href={`https://games.roblox.com/v1/games?universeIds=${GAME.universeId}`} rel="nofollow external">Roblox Games API record ↗</a></li>
        <li><a href={`https://develop.roblox.com/v1/universes/${GAME.universeId}/places?isUniverseCreation=false&limit=100&sortOrder=Asc`} rel="nofollow external">Roblox universe places list ↗</a></li>
        <li><a href={`https://badges.roblox.com/v1/universes/${GAME.universeId}/badges?limit=100&sortOrder=Asc`} rel="nofollow external">Roblox official badge list ↗</a></li>
        <li><a href={GAME.officialUrl} rel="nofollow external">Target experience on Roblox ↗</a></li>
      </ul>
      <p>These links document the guide&apos;s evidence. The main reading path stays inside the site: continue with the <Link href="/quick-start">beginner tutorial</Link>.</p>
    </GuidePage>
  );
}
