import { describe, it, expect } from 'vitest'
import { isFilteringRecipes, matchesRecipeFilter, type RecipeFilter } from './recipeFilter'
import type { ItemRow } from '../../types/character'

const forge = { id: 'forge', label: 'Forge', kind: 'base' as const, basis: 'Artisanat lourd - Force', summary: '' }
const epee = {
  recipe: {
    id: 'f1', craft: 'forge', rank: 1, name: 'Épée courte', batch: null,
    components: [{ qty: 2, name: 'Lingots de Fer brut' }], effect: 'Dégâts +1.',
  },
  craft: forge,
}
const none: RecipeFilter = { search: '', craftId: '', craftable: false }
const lingots: ItemRow[] = [{ id: 'a', name: 'Lingot de fer brut', quantity: 2, type: 'composant' }]

describe('matchesRecipeFilter', () => {
  it('sans filtre, tout passe', () => {
    expect(matchesRecipeFilter(epee, [], none)).toBe(true)
    expect(isFilteringRecipes(none)).toBe(false)
  })

  it('cherche dans le nom, l’effet et les composants, sans casse ni accents', () => {
    expect(matchesRecipeFilter(epee, [], { ...none, search: 'epee' })).toBe(true)
    expect(matchesRecipeFilter(epee, [], { ...none, search: 'DEGATS' })).toBe(true)
    expect(matchesRecipeFilter(epee, [], { ...none, search: 'fer brut' })).toBe(true)
    expect(matchesRecipeFilter(epee, [], { ...none, search: 'potion' })).toBe(false)
  })

  it('filtre par métier', () => {
    expect(matchesRecipeFilter(epee, [], { ...none, craftId: 'forge' })).toBe(true)
    expect(matchesRecipeFilter(epee, [], { ...none, craftId: 'alchimie' })).toBe(false)
  })

  it('« fabricable » garde les patrons dont on a les composants', () => {
    expect(matchesRecipeFilter(epee, [], { ...none, craftable: true })).toBe(false)
    expect(matchesRecipeFilter(epee, lingots, { ...none, craftable: true })).toBe(true)
    expect(isFilteringRecipes({ ...none, craftable: true })).toBe(true)
  })
})
