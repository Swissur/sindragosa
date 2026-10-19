import type { Craft, Recipe } from '../../data/sindragosa/types'
import { CRAFTS, RECIPES } from '../../data/sindragosa/crafts'
import { normalizeName } from './prerequisites'

export interface CatalogRecipe {
  recipe: Recipe
  craft: Craft
  /** Rang du métier qui ouvre le patron : celui écrit pour un métier de base, l'ordre du catalogue pour un hybride (cf. recipesFor). */
  rank: number
}

/** Tous les patrons, dans l'ordre des métiers. */
export function catalogRecipes(crafts: Craft[] = CRAFTS, catalog: Recipe[] = RECIPES): CatalogRecipe[] {
  return crafts.flatMap((craft) => catalog
    .filter((r) => r.craft === craft.id)
    .map((recipe, i) => ({ recipe, craft, rank: recipe.rank ?? i + 1 })))
}

export interface CatalogFilter {
  /** Cherché dans le nom, l'effet et les composants, sans tenir compte de la casse ni des accents. */
  search: string
  /** '' = tous les métiers. */
  craftId: string
  /** 0 = tous les rangs. */
  rank: number
  /** Métiers connus du personnage (id → rang) ; null = pas de filtre. */
  known: Record<string, number> | null
}

export const isKnownRecipe = (e: CatalogRecipe, known: Record<string, number>): boolean => (known[e.craft.id] ?? 0) >= e.rank

export function matchesCatalogFilter(e: CatalogRecipe, f: CatalogFilter): boolean {
  if (f.craftId && e.craft.id !== f.craftId) return false
  if (f.rank && e.rank !== f.rank) return false
  if (f.known && !isKnownRecipe(e, f.known)) return false
  const q = normalizeName(f.search)
  return !q || [e.recipe.name, e.recipe.effect, ...e.recipe.components.map((c) => c.name)].some((t) => normalizeName(t).includes(q))
}

export const isFilteringCatalog = (f: CatalogFilter): boolean => !!f.craftId || !!f.rank || !!f.known || !!normalizeName(f.search)
