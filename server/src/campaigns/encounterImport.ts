import { db } from '../db/index.js'
import { encounterTemplates, encounterMonsters } from '../db/schema.js'
import { sanitizeLoot } from '../combats/loot.js'

/** Les colonnes d'un monstre de rencontre, lues dans un corps de requête (défauts du formulaire). */
export function monsterValues(body: Record<string, unknown>) {
  return {
    name: String(body.name ?? 'Monstre'),
    threat: Number(body.threat ?? 0),
    size: String(body.size ?? 'moyenne'),
    armor: Number(body.armor ?? 0),
    defense: Number(body.defense ?? 2),
    pv: Number(body.pv ?? 1),
    init: Number(body.init ?? 0),
    statFor: Number(body.statFor ?? 2),
    statAgi: Number(body.statAgi ?? 2),
    statEnd: Number(body.statEnd ?? 2),
    statInt: Number(body.statInt ?? 2),
    statSag: Number(body.statSag ?? 2),
    statCha: Number(body.statCha ?? 2),
    attacks: body.attacks ?? [],
    abilities: body.abilities ?? [],
    description: body.description ? String(body.description) : null,
    hidden: body.hidden === true,
  }
}

export interface EncounterImport {
  name: string
  description?: string
  monsters: Record<string, unknown>[]
  /** Table de butin d'un combat de boss. */
  loot?: unknown
}

/** Valide le corps d'un import : un donjon nommé et au moins une rencontre nommée. */
export function parseEncounterImport(body: unknown): { dungeon: string; encounters: EncounterImport[] } | null {
  const b = body as { dungeon?: unknown; encounters?: unknown }
  if (typeof b?.dungeon !== 'string' || !b.dungeon.trim()) return null
  if (!Array.isArray(b.encounters) || b.encounters.length === 0) return null
  const valid = b.encounters.every((e: EncounterImport) =>
    typeof e?.name === 'string' && e.name.trim() !== '' && Array.isArray(e.monsters))
  return valid ? { dungeon: b.dungeon.trim(), encounters: b.encounters } : null
}

/** Crée toutes les rencontres d'un donjon d'un coup, dans l'ordre du parcours. */
export async function importEncounters(campaignId: number, dungeon: string, encounters: EncounterImport[]) {
  return db.transaction(async (tx) => {
    let count = 0
    for (const enc of encounters) {
      const [row] = await tx
        .insert(encounterTemplates)
        .values({
          campaignId,
          dungeon,
          name: enc.name.trim(),
          description: enc.description?.trim() || null,
          loot: sanitizeLoot(enc.loot),
        })
        .returning({ id: encounterTemplates.id })
      if (enc.monsters.length > 0) {
        await tx.insert(encounterMonsters).values(enc.monsters.map((m) => ({ encounterId: row.id, ...monsterValues(m) })))
      }
      count++
    }
    return count
  })
}
