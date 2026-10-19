import { describe, it, expect } from 'vitest'
import { catalogRecipes, isFilteringCatalog, isKnownRecipe, matchesCatalogFilter, type CatalogFilter } from './recipeCatalog'
import { RECIPES } from '../../data/sindragosa/crafts'
import type { Craft, Recipe } from '../../data/sindragosa/types'

const forge: Craft = { id: 'forge', label: 'Forge', kind: 'base', basis: 'Artisanat lourd - Force', summary: '' }
const hybride: Craft = { id: 'forge-feu', label: 'Forge-Feu', kind: 'hybrid', basis: 'Artisanat lourd + Pyromancie', summary: '' }
const recipe = (id: string, craft: string, rank: number | null, name = id): Recipe => ({
  id, craft, rank, name, batch: null, components: [{ qty: 2, name: 'Lingots de Fer brut' }], effect: 'Dégâts +1.',
})
const catalog = [recipe('f1', 'forge', 1, 'Épée courte'), recipe('h1', 'forge-feu', null), recipe('f3', 'forge', 3), recipe('h2', 'forge-feu', null)]
const entries = catalogRecipes([forge, hybride], catalog)
const none: CatalogFilter = { search: '', craftId: '', rank: 0, known: null }

describe('catalogRecipes', () => {
  it('tous les patrons du vrai catalogue', () => {
    expect(catalogRecipes()).toHaveLength(RECIPES.length)
  })

  it('range par métier ; un hybride prend le rang de sa place dans le catalogue', () => {
    expect(entries.map((e) => [e.recipe.id, e.rank])).toEqual([['f1', 1], ['f3', 3], ['h1', 1], ['h2', 2]])
  })
})

describe('matchesCatalogFilter', () => {
  const [epee, f3, , h2] = entries

  it('sans filtre, tout passe', () => {
    expect(entries.every((e) => matchesCatalogFilter(e, none))).toBe(true)
    expect(isFilteringCatalog(none)).toBe(false)
  })

  it('cherche dans le nom, l’effet et les composants, sans casse ni accents', () => {
    expect(matchesCatalogFilter(epee, { ...none, search: 'epee' })).toBe(true)
    expect(matchesCatalogFilter(epee, { ...none, search: 'DEGATS' })).toBe(true)
    expect(matchesCatalogFilter(epee, { ...none, search: 'fer brut' })).toBe(true)
    expect(matchesCatalogFilter(epee, { ...none, search: 'potion' })).toBe(false)
  })

  it('filtre par métier et par rang', () => {
    expect(matchesCatalogFilter(epee, { ...none, craftId: 'forge-feu' })).toBe(false)
    expect(matchesCatalogFilter(h2, { ...none, rank: 2 })).toBe(true)
    expect(matchesCatalogFilter(f3, { ...none, rank: 2 })).toBe(false)
  })

  it('connus : jusqu’au rang du métier', () => {
    const known = { forge: 2, 'forge-feu': 2 }
    expect(isKnownRecipe(epee, known)).toBe(true)
    expect(isKnownRecipe(f3, known)).toBe(false)
    expect(isKnownRecipe(h2, known)).toBe(true)
    expect(matchesCatalogFilter(f3, { ...none, known })).toBe(false)
    expect(isFilteringCatalog({ ...none, known })).toBe(true)
  })
})
