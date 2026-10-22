/**
 * Les consommables de la liste déroulante de l'inventaire : ceux que fabriquent
 * les patrons, puis ceux de WoW Classic (`data/sindragosa/consumables.ts`).
 */
import { RECIPES } from '../../data/sindragosa/crafts'
import { CLASSIC_CONSUMABLES, CRAFTED_CONSUMABLE_RECIPE_IDS } from '../../data/sindragosa/consumables'
import { componentKey } from './crafting'

const CRAFTED = new Set(CRAFTED_CONSUMABLE_RECIPE_IDS)

/** L'objet de ce patron s'épuise à l'usage. */
export const isConsumableRecipe = (recipeId: string): boolean => CRAFTED.has(recipeId)

/** Une seule fois chaque nom (même clé que les composants : casse, accents, pluriel), triés. */
export function consumableNames(
  crafted: string[] = RECIPES.filter((r) => CRAFTED.has(r.id)).map((r) => r.name),
  classic: string[] = CLASSIC_CONSUMABLES,
): string[] {
  const byKey = new Map<string, string>()
  for (const name of [...crafted, ...classic]) {
    const key = componentKey(name)
    if (!byKey.has(key)) byKey.set(key, name)
  }
  return [...byKey.values()].sort((a, b) => a.localeCompare(b, 'fr'))
}

export const CONSUMABLE_NAMES = consumableNames()

/** Le nom du catalogue qui correspond à ce nom, sinon null. */
export function findConsumableName(name: string): string | null {
  const key = componentKey(name)
  return CONSUMABLE_NAMES.find((n) => componentKey(n) === key) ?? null
}
