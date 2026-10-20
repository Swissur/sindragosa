import type { Craft, Recipe } from '../../data/sindragosa/types'
import type { ItemRow } from '../../types/character'
import { hasComponents, recipeRank } from './crafting'
import { normalizeName } from './prerequisites'

export interface RecipeFilter {
  /** Cherché dans le nom, l'effet et les composants, sans tenir compte de la casse ni des accents. */
  search: string
  /** '' = tous les métiers. */
  craftId: string
  /** 0 = tous les rangs. */
  rank: number
  /** Seulement les patrons dont l'inventaire a tous les composants. */
  craftable: boolean
}

export function matchesRecipeFilter(entry: { recipe: Recipe; craft: Craft }, items: ItemRow[], f: RecipeFilter): boolean {
  const { recipe } = entry
  if (f.craftId && entry.craft.id !== f.craftId) return false
  if (f.rank && recipeRank(recipe) !== f.rank) return false
  if (f.craftable && !hasComponents(items, recipe)) return false
  const q = normalizeName(f.search)
  return !q || [recipe.name, recipe.effect, ...recipe.components.map((c) => c.name)].some((t) => normalizeName(t).includes(q))
}

export const isFilteringRecipes = (f: RecipeFilter): boolean => !!f.craftId || !!f.rank || f.craftable || !!normalizeName(f.search)
