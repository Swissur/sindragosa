import type { LootItem } from '../../data/sindragosa/types'
import { ITEM_TYPE_LABELS, WEAPON_SIZE_LABELS, weaponDamage } from './equipment'

/** Index des objets encore à distribuer. */
export function remainingLoot(loot: { givenTo?: string }[]): number[] {
  return loot.flatMap((e, i) => (e.givenTo ? [] : [i]))
}

/** Tire au sort un objet encore à distribuer, au prorata de sa `chance` ; null s'il n'en reste plus. */
export function pickLoot(loot: { givenTo?: string; chance?: number }[], random: () => number = Math.random): number | null {
  const left = remainingLoot(loot)
  if (left.length === 0) return null
  const weight = (i: number) => Math.max(0, loot[i].chance ?? 1)
  let roll = random() * left.reduce((sum, i) => sum + weight(i), 0)
  for (const i of left) {
    roll -= weight(i)
    if (roll < 0) return i
  }
  return left[left.length - 1]
}

/** Une ligne de caractéristiques : « Arme · Deux mains · 6 dégâts », « Armure · 2 ». */
export function lootDetail(item: LootItem): string {
  const type = item.type ?? 'divers'
  if (type === 'arme') {
    const dmg = weaponDamage({ ...item, id: '', quantity: 1 })
    return `Arme · ${WEAPON_SIZE_LABELS[item.size ?? 'une-main']} · ${dmg} dégâts`
  }
  if (type === 'armure') return `Armure · ${item.armor ?? 0}`
  return ITEM_TYPE_LABELS[type]
}
