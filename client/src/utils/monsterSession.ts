import type { Monster } from './sindragosa/bestiary'

/** Compute HP percentage (0-100), or null if data missing */
export function hpPercent(hpCurrent: number | undefined, hpMax: number | undefined): number | null {
  if (hpCurrent == null || hpMax == null || hpMax === 0) return null
  return Math.round((hpCurrent / hpMax) * 100)
}

/** Return a CSS class based on HP percentage thresholds */
export function hpColor(percent: number | null): string {
  if (percent == null) return ''
  if (percent > 50) return 'hp-ok'
  if (percent > 25) return 'hp-warn'
  return 'hp-danger'
}

/** Les champs d'un monstre du bestiaire, au format des API rencontre et combat. */
export function catalogMonsterFields(m: Monster) {
  return {
    name: m.name,
    size: m.size,
    threat: m.threat,
    armor: m.armor,
    defense: m.defense,
    pv: m.hp,
    init: m.initiative,
    statFor: m.stats.str,
    statAgi: m.stats.agi,
    statEnd: m.stats.end,
    statInt: m.stats.int,
    statSag: m.stats.wis,
    statCha: m.stats.cha,
    attacks: m.attacks,
    abilities: m.abilities,
    description: m.description ?? null,
  }
}

/** Find a monster in the catalog by name (case-insensitive) */
export function findCatalogMonster(name: string, catalog: Monster[]): Monster | undefined {
  return catalog.find((m) => m.name.toLowerCase() === name.toLowerCase())
}

/** Filter catalog by search query (case-insensitive substring match) */
export function filterCatalog(query: string, catalog: Monster[]): Monster[] {
  const q = query.toLowerCase().trim()
  if (!q) return catalog
  return catalog.filter((m) => m.name.toLowerCase().includes(q))
}
