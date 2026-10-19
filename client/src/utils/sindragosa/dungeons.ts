import type { Dungeon, LootItem } from '../../data/sindragosa/types'
import { catalogMonsterFields } from '../monsterSession'

export type ImportedMonster = ReturnType<typeof catalogMonsterFields> & { hidden: boolean }

export interface ImportedEncounter {
  name: string
  description: string
  monsters: ImportedMonster[]
  loot: LootItem[]
}

/**
 * Déplie les combats d'un donjon en rencontres prêtes à créer : un exemplaire
 * par monstre, numérotés comme une duplication (« Mineur défias 1, 2, 3 »)
 * quand le même monstre revient plusieurs fois dans un combat.
 */
export function dungeonEncounters(dungeon: Dungeon): ImportedEncounter[] {
  return dungeon.encounters.map((enc) => {
    const totals = new Map<string, number>()
    for (const m of enc.monsters) totals.set(m.name, (totals.get(m.name) ?? 0) + (m.count ?? 1))

    const seen = new Map<string, number>()
    const monsters = enc.monsters.flatMap((entry) => {
      const source = dungeon.monsters.find((m) => m.name === entry.name)
      if (!source) throw new Error(`${dungeon.name} : « ${entry.name} » n'est pas dans le bestiaire du donjon`)
      return Array.from({ length: entry.count ?? 1 }, () => {
        const n = (seen.get(entry.name) ?? 0) + 1
        seen.set(entry.name, n)
        const name = totals.get(entry.name)! > 1 ? `${entry.name} ${n}` : entry.name
        return { ...catalogMonsterFields(source), name, hidden: entry.hidden === true }
      })
    })
    return { name: enc.name, description: enc.description, monsters, loot: enc.loot ?? [] }
  })
}

export interface DungeonGroup<T> {
  /** null = les rencontres libres, sans donjon. */
  dungeon: string | null
  items: T[]
}

/** Classe les rencontres par donjon : les libres d'abord, puis chaque donjon dans l'ordre où il apparaît. */
export function groupByDungeon<T extends { dungeon: string | null }>(items: T[]): DungeonGroup<T>[] {
  const groups = new Map<string | null, T[]>([[null, []]])
  for (const item of items) {
    const key = item.dungeon || null
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key)!.push(item)
  }
  return [...groups].filter(([, list]) => list.length > 0).map(([dungeon, list]) => ({ dungeon, items: list }))
}
