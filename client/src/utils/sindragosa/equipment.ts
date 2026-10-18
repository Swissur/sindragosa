/**
 * Équipement (plans/35-equipement.md) : dégâts fixes par gabarit, AP des armures
 * équipées, objet obtenu en fabriquant un patron.
 */
import type { Character, ItemRow, ItemType, WeaponSize } from '../../types/character'
import type { Recipe } from '../../data/sindragosa/types'

/** Dégâts fixes selon le gabarit (à tester en jeu). */
export const WEAPON_DAMAGE: Record<WeaponSize, number> = { legere: 2, 'une-main': 3, 'deux-mains': 5 }

export const WEAPON_SIZE_LABELS: Record<WeaponSize, string> = {
  legere: 'Légère',
  'une-main': 'Une main',
  'deux-mains': 'Deux mains',
}

export const ITEM_TYPE_LABELS: Record<ItemType, string> = {
  arme: 'Arme',
  armure: 'Armure',
  consommable: 'Consommable',
  composant: 'Composant',
  divers: 'Divers',
}

export const isEquippable = (item: ItemRow) => item.type === 'arme' || item.type === 'armure'

export function weaponDamage(item: ItemRow): number {
  return WEAPON_DAMAGE[item.size ?? 'une-main'] + (item.damageBonus ?? 0)
}

export function equippedWeapons(c: Character): ItemRow[] {
  return c.items.filter((i) => i.type === 'arme' && i.equipped)
}

/** AP = armures équipées + bonus des compétences. */
export function effectiveArmor(c: Character): number {
  const worn = c.items.filter((i) => i.type === 'armure' && i.equipped).reduce((sum, i) => sum + (i.armor ?? 0), 0)
  return worn + c.armorBonus
}

function weaponSize(text: string): WeaponSize {
  if (/2 mains|deux mains/i.test(text)) return 'deux-mains'
  if (/dégâts légers|\bjet\b|dague|lame courte/i.test(text)) return 'legere'
  return 'une-main'
}

function weaponDomain(text: string): string {
  if (/\bjet\b|munition|carreau|flèche|\barc\b|arbalète|fusil/i.test(text)) return 'tir-lancer'
  if (/précision|estoc|dague|lame courte|assassin/i.test(text)) return 'combat-precision'
  return 'melee-bourrine'
}

/** L'objet qu'on obtient en fabriquant un patron. */
export function itemFromRecipe(recipe: Recipe, id: string = crypto.randomUUID()): ItemRow {
  const text = `${recipe.name} ${recipe.effect}`
  const base = { id, name: recipe.name, description: recipe.effect, quantity: recipe.batch ?? 1 }
  const armor = recipe.effect.match(/Armure physique \+(\d+)/i)
  if (/^Arme\b/i.test(recipe.effect)) {
    return { ...base, type: 'arme', equipped: false, size: weaponSize(text), damageBonus: 0, domainId: weaponDomain(text) }
  }
  if (armor) return { ...base, type: 'armure', equipped: false, armor: Number(armor[1]) }
  if (/composant/i.test(recipe.effect)) return { ...base, type: 'composant' }
  if (/potion|élixir|fiole|onguent|baume|tonique|munition/i.test(text)) return { ...base, type: 'consommable' }
  return { ...base, type: 'divers' }
}
