/**
 * Butin d'un combat (plans/41) : des objets d'inventaire en attente, que le MJ
 * distribue un par un. Forme d'un objet : `ItemRow` côté client, sans id.
 */

const ITEM_TYPES = ['arme', 'armure', 'consommable', 'composant', 'divers']
const WEAPON_SIZES = ['naturelle', 'legere', 'une-main', 'deux-mains']

export interface LootEntry {
  name: string
  description?: string
  type?: string
  size?: string
  damageBonus?: number
  domainId?: string
  armor?: number
  quantity?: number
  /** Chance relative au tirage : sert au butin, pas à l'inventaire. */
  chance?: number
  /** Nom du héros qui l'a reçu ; absent tant qu'il est à distribuer. */
  givenTo?: string
}

/** Ne garde que les champs d'objet connus : le butin finit dans une fiche. */
export function sanitizeLoot(raw: unknown): LootEntry[] {
  if (!Array.isArray(raw)) return []
  return raw.flatMap((r: Record<string, unknown>) => {
    if (typeof r?.name !== 'string' || !r.name.trim()) return []
    const entry: LootEntry = { name: r.name.trim() }
    if (typeof r.description === 'string' && r.description) entry.description = r.description
    if (typeof r.type === 'string' && ITEM_TYPES.includes(r.type)) entry.type = r.type
    if (typeof r.size === 'string' && WEAPON_SIZES.includes(r.size)) entry.size = r.size
    if (typeof r.damageBonus === 'number') entry.damageBonus = r.damageBonus
    if (typeof r.domainId === 'string' && r.domainId) entry.domainId = r.domainId
    if (typeof r.armor === 'number') entry.armor = r.armor
    if (typeof r.quantity === 'number' && r.quantity > 1) entry.quantity = r.quantity
    if (typeof r.chance === 'number' && r.chance > 0) entry.chance = r.chance
    return [entry]
  })
}

/** L'objet tel qu'il entre dans l'inventaire : un id, une quantité, pas encore équipé. */
export function toInventoryItem({ givenTo: _given, chance: _chance, quantity, ...item }: LootEntry, id: string) {
  return { ...item, id, quantity: quantity ?? 1, equipped: false }
}

/** Le butin avec l'objet `index` attribué à `heroName` ; null s'il n'existe pas ou est déjà donné. */
export function markGiven(loot: LootEntry[], index: number, heroName: string): LootEntry[] | null {
  if (!Number.isInteger(index) || !loot[index] || loot[index].givenTo) return null
  return loot.map((e, i) => (i === index ? { ...e, givenTo: heroName } : e))
}
