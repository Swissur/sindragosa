import { and, eq } from "drizzle-orm";
import { db } from "../db/index.js";
import { characters, type CharacterRow } from "../db/schema.js";
import type { PartyContext } from "./party.js";

/**
 * La fiche telle que le rendu texte l'attend. Volontairement lâche : elle vient
 * soit du client (chat de l'app), soit de la base via `rowToPayload`.
 */
export type CharacterPayload = Record<string, unknown>;

/** Les seuls champs qu'`edit_character` accepte de toucher. */
export const EDITABLE_FIELDS = new Set([
  "str", "dex", "con", "int", "wis", "cha", "level", "hpMax", "mpMax", "defense",
]);
export type EditableField = "str" | "dex" | "con" | "int" | "wis" | "cha" | "level" | "hpMax" | "mpMax" | "defense";

export function buildCharacterSection(c: CharacterPayload, isActive = false): string {
  const name = c.name ?? "Inconnu";
  const people = c.people ?? "";
  const profile = c.profile ?? "";
  const level = c.level ?? 1;
  const hpMax = c.hpMax ?? "?";
  const mpMax = c.mpMax ?? "?";
  const hpCurrent = c.hpCurrent;
  const mpCurrent = c.mpCurrent;
  const defense = c.defense ?? "?";
  const initiativeBonus = c.initiativeBonus;
  const histoire = typeof c.histoire === "string" ? c.histoire.trim() : "";
  const mysticTalent =
    typeof c.mysticTalent === "string" && c.mysticTalent.trim() !== ""
      ? c.mysticTalent.trim()
      : "";

  const abilities = (c.abilities as Record<string, number> | undefined) ?? {};
  const mod = (score: number | string) =>
    typeof score === "number" ? Math.floor((score - 10) / 2) : "?";
  const fmtMod = (score: number | string) => {
    const m = mod(score);
    return typeof m === "number" ? (m >= 0 ? `+${m}` : `${m}`) : "?";
  };
  const str = abilities.strength ?? "?";
  const dex = abilities.dexterity ?? "?";
  const con = abilities.constitution ?? "?";
  const int_ = abilities.intelligence ?? "?";
  const wis = abilities.wisdom ?? "?";
  const cha = abilities.charisma ?? "?";
  const paths = (c.paths as Array<{ name: string; rank: number }> | undefined) ?? [];
  const skills = (c.skills as Array<{ name: string; rank: number }> | undefined) ?? [];
  const martialFormations = Array.isArray(c.martialFormations)
    ? (c.martialFormations as string[])
    : [];
  const weapons =
    (c.weapons as
      | Array<{
          name: string;
          attackType?: string;
          damageDice?: string;
          damageAbility?: string | null;
          martialFamily?: string;
          rangeMeters?: number | null;
          notes?: string;
        }>
      | undefined) ?? [];
  const items =
    (c.items as Array<{ name: string; description?: string; quantity: number }> | undefined) ?? [];
  const goldCoins = typeof c.goldCoins === "number" ? c.goldCoins : 0;
  const silverCoins = typeof c.silverCoins === "number" ? c.silverCoins : 0;
  const copperCoins = typeof c.copperCoins === "number" ? c.copperCoins : 0;

  const pathsStr = paths.length > 0
    ? paths.map((p) => `${p.name} (rang ${p.rank})`).join(", ")
    : "aucune";
  const skillsStr = skills.length > 0
    ? skills.map((s) => `${s.name} (rang ${s.rank})`).join(", ")
    : "aucune";

  const pvPmLine =
    typeof hpCurrent === "number" && typeof mpCurrent === "number"
      ? `PV ${hpCurrent}/${hpMax} | PM ${mpCurrent}/${mpMax}`
      : `PV max ${hpMax} | PM max ${mpMax}`;

  const initiativeLine =
    typeof initiativeBonus === "number"
      ? `Initiative (score) ${initiativeBonus}`
      : "";

  const martialLine =
    martialFormations.length > 0
      ? `Formations martiales (catégories d'armes) : ${martialFormations.join(", ")}`
      : "";

  const mysticLine = mysticTalent
    ? `Talent mystique (identifiant) : ${mysticTalent}`
    : "";

  const weaponsStr =
    weapons.length > 0
      ? weapons
          .map((w) => {
            const parts = [w.name];
            if (w.damageDice) parts.push(`dégâts ${w.damageDice}`);
            if (w.attackType) parts.push(w.attackType);
            if (w.damageAbility) parts.push(`Mod. ${w.damageAbility}`);
            if (w.martialFamily) parts.push(`famille ${w.martialFamily}`);
            if (w.rangeMeters != null) parts.push(`portée ${w.rangeMeters} m`);
            if (w.notes?.trim()) parts.push(`note: ${w.notes.trim()}`);
            return parts.join(" — ");
          })
          .join("\n")
      : "";

  const histoireBlock = histoire
    ? `\n\n### Histoire et contexte (fiche joueur)\n\n${histoire}`
    : "";

  const moneyLine = (goldCoins > 0 || silverCoins > 0 || copperCoins > 0)
    ? `Argent : ${goldCoins} po / ${silverCoins} pa / ${copperCoins} pc`
    : "";

  const itemsStr = items.length > 0
    ? items.map((it) => {
        const desc = it.description?.trim() ? ` (${it.description.trim()})` : "";
        return `- ${it.name}${desc} ×${it.quantity}`;
      }).join("\n")
    : "";

  const extraBlocks = [
    initiativeLine,
    martialLine,
    mysticLine,
    weaponsStr ? `Armes :\n${weaponsStr}` : "",
    moneyLine,
    itemsStr ? `Inventaire :\n${itemsStr}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const header = isActive ? "## Personnage actif" : `## Fiche de ${name}`;
  const footer = isActive
    ? "\n\n👤 Adresse-toi toujours à ce personnage par son prénom. Adapte tes réponses à sa race, son profil, son histoire (si fournie), ses armes et ses capacités."
    : "";

  return `${header}

${isActive ? `Tu t'adresses à **${name}**` : `**${name}**`}${people ? `, ${people}` : ""}${profile ? `, profil ${profile}` : ""}, niveau ${level}.
Stats : FOR ${str} (${fmtMod(str)}) / DEX ${dex} (${fmtMod(dex)}) / CON ${con} (${fmtMod(con)}) / INT ${int_} (${fmtMod(int_)}) / SAG ${wis} (${fmtMod(wis)}) / CHA ${cha} (${fmtMod(cha)})
${pvPmLine} | Défense ${defense}${extraBlocks ? `\n${extraBlocks}` : ""}
Voies : ${pathsStr}
Compétences : ${skillsStr}${histoireBlock}${footer}`;
}

export function buildPreviousCharacterSection(prev: CharacterPayload): string {
  const FIELD_LABELS: Record<string, string> = {
    str: "FOR", dex: "DEX", con: "CON", int: "INT", wis: "SAG", cha: "CHA",
    level: "Niveau", hpMax: "PV max", mpMax: "PM max", defense: "Défense",
  };
  const parts = Object.entries(prev)
    .filter(([k, v]) => EDITABLE_FIELDS.has(k) && typeof v === "number")
    .map(([k, v]) => `${FIELD_LABELS[k] ?? k}=${v}`);
  if (parts.length === 0) return "";
  return `\n\n⚠️ Modification récente (annulable) :\nValeurs avant modification — ${parts.join(", ")}`;
}

/**
 * Ligne de la table `character` → la forme attendue par `buildCharacterSection`.
 * Le rendu texte lit `abilities.strength`, la base stocke `str` : c'est la seule
 * traduction à faire. Pure, donc testable sans base.
 *
 * `withInventory: false` vide l'inventaire et l'argent — ce qu'on montre d'un
 * compagnon, par opposition à sa propre fiche.
 */
export function rowToPayload(row: CharacterRow, withInventory = true): CharacterPayload {
  return {
    ...row,
    ...(withInventory ? {} : { items: [], goldCoins: 0, silverCoins: 0, copperCoins: 0 }),
    abilities: {
      strength: row.str,
      dexterity: row.dex,
      constitution: row.con,
      intelligence: row.int,
      wisdom: row.wis,
      charisma: row.cha,
    },
  };
}

/**
 * Le personnage actif de l'utilisateur, lu en base.
 * Le chat de l'app reçoit la fiche dans le body ; un connecteur MCP n'envoie
 * rien, c'est donc au serveur de la charger. Inventaire et argent compris :
 * c'est sa propre fiche.
 */
export async function loadActiveCharacter(userId: number): Promise<CharacterPayload | null> {
  const [row] = await db
    .select()
    .from(characters)
    .where(and(eq(characters.userId, userId), eq(characters.isActive, true)))
    .limit(1);
  return row ? rowToPayload(row) : null;
}

export type CompanionResult = {
  text: string;
  /** Nom exact en base, pour le cache de portraits de `generate_image`. */
  name: string | null;
  portraitImageId: number | null;
};

/**
 * La fiche d'un compagnon de la campagne active, cherchée par nom approchant.
 * Sans inventaire ni argent. Rend du texte, jamais de SSE : l'appelant décide
 * s'il prévient un écran.
 */
export async function loadCompanion(
  party: PartyContext | null,
  targetName: string
): Promise<CompanionResult> {
  const empty = { name: null, portraitImageId: null };
  if (!party) return { ...empty, text: "Aucune campagne active — impossible de consulter les compagnons." };
  const match = party.members.find((m) => m.name.toLowerCase().includes(targetName.toLowerCase()));
  if (!match) return { ...empty, text: `Aucun compagnon nommé "${targetName}" dans la campagne.` };

  const [char] = await db.select().from(characters).where(eq(characters.id, match.characterId));
  if (!char) return { ...empty, text: "Personnage introuvable en base de données." };

  const text = buildCharacterSection(rowToPayload(char, false));
  console.log(`[get_character] Loaded character "${char.name}" (id=${char.id})`);
  return { text, name: char.name, portraitImageId: char.portraitImageId };
}
