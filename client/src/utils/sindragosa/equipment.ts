/**
 * Équipement (plans/35-equipement.md) : dégâts fixes par gabarit, AP des armures
 * équipées, objet obtenu en fabriquant un patron.
 */
import type { Character, ItemRow, ItemType, WeaponSize } from '../../types/character'
import type { Recipe } from '../../data/sindragosa/types'
import type { WeaponReach } from '../../data/sindragosa/abilityAttacks'
import { formById, type Form } from '../../data/sindragosa/forms'
import { isConsumableRecipe } from './consumables'

/** Dégâts fixes selon le gabarit (à tester en jeu). */
export const WEAPON_DAMAGE: Record<WeaponSize, number> = { naturelle: 1, legere: 2, 'une-main': 3, 'deux-mains': 5 }

export const WEAPON_SIZE_LABELS: Record<WeaponSize, string> = {
  naturelle: 'Naturelle',
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

/** Dés gagnés (ou perdus) sur ce domaine grâce aux objets divers de l'inventaire. */
export function itemDomainBonus(c: Character, domainId: string): number {
  return c.items.reduce(
    (sum, i) => sum + ((i.type ?? 'divers') === 'divers' && i.domainBonus?.domainId === domainId ? i.domainBonus.dice : 0),
    0,
  )
}

export function weaponDamage(item: ItemRow): number {
  return WEAPON_DAMAGE[item.size ?? 'une-main'] + (item.damageBonus ?? 0)
}

export function equippedWeapons(c: Character): ItemRow[] {
  return c.items.filter((i) => i.type === 'arme' && i.equipped)
}

/** Le domaine d'attaque d'une arme ; Mêlée bourrine si elle n'en a pas. */
export const weaponDomainId = (w: ItemRow): string => w.domainId ?? 'melee-bourrine'

/** Les mains nues : une arme naturelle que tout personnage a d'office, sans objet. */
export const BARE_HANDS: ItemRow = {
  id: 'mains-nues', name: 'Mains nues', quantity: 1, type: 'arme', size: 'naturelle', domainId: 'athletisme',
}

/** L'arme naturelle que donne une transformation. */
export function formWeapon(form: Form): ItemRow {
  return {
    id: `forme-${form.id}`, name: form.weapon, quantity: 1, type: 'arme',
    size: 'naturelle', damageBonus: form.damageBonus, domainId: form.domainId,
  }
}

function activeFormWeapon(c: Character): ItemRow | null {
  const form = formById(c.form)
  return form ? formWeapon(form) : null
}

/** Les attaques « Frapper » : l'arme de la forme prise, sinon les armes équipées, sinon les mains nues. */
export function strikeWeapons(c: Character): ItemRow[] {
  const form = activeFormWeapon(c)
  if (form) return [form]
  const weapons = equippedWeapons(c)
  return weapons.length ? weapons : [BARE_HANDS]
}

/**
 * L'arme avec laquelle une compétence attaque. Une forme prise impose son arme.
 * Sans arme (`naturelle`) : l'arme naturelle équipée, sinon les mains nues.
 * Sinon l'arme de tir pour un tir, une arme de contact pour une frappe (les armes
 * naturelles en dernier), à défaut la première équipée ; null sans arme équipée.
 */
export function weaponFor(c: Character, reach: WeaponReach): ItemRow | null {
  const form = activeFormWeapon(c)
  if (form) return form
  const natural = (w: ItemRow) => w.size === 'naturelle'
  const equipped = equippedWeapons(c)
  if (reach === 'naturelle') return equipped.find(natural) ?? BARE_HANDS
  const weapons = [...equipped.filter((w) => !natural(w)), ...equipped.filter(natural)]
  const ranged = (w: ItemRow) => weaponDomainId(w) === 'tir-lancer'
  return weapons.find((w) => ranged(w) === (reach === 'distance')) ?? weapons[0] ?? null
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
  if (isConsumableRecipe(recipe.id)) return { ...base, type: 'consommable' }
  return { ...base, type: 'divers' }
}
