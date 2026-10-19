import { describe, it, expect } from 'vitest'
import { componentKey, componentNeeds, consumeComponents, craftDomainId, effectiveCrafts, hasComponents, recipesByDomain, recipesFor } from './crafting'
import type { ItemRow } from '../../types/character'
import { CRAFTS } from '../../data/sindragosa/crafts'

describe('craftDomainId', () => {
  it('chaque métier a un domaine', () => {
    for (const c of CRAFTS) expect(craftDomainId(c), c.id).not.toBeNull()
  })

  it('métier de base : le domaine de sa base', () => {
    expect(craftDomainId({ id: 'forge', kind: 'base', basis: 'Artisanat lourd - Force' })).toBe('artisanat-lourd')
    expect(craftDomainId({ id: 'ingenierie', kind: 'base', basis: 'Ingénierie - Intelligence' })).toBe('explosifs-ingenierie')
  })

  it('métier hybride : l’artisanat avancé lui-même', () => {
    expect(craftDomainId({ id: 'forge-feu', kind: 'hybrid', basis: 'Artisanat lourd + Pyromancie' })).toBe('forge-feu')
  })
})

describe('recipesFor', () => {
  const catalog = [
    { id: 'a', craft: 'forge', rank: 1, name: 'A', batch: null, components: [], effect: '' },
    { id: 'b', craft: 'forge', rank: 3, name: 'B', batch: null, components: [], effect: '' },
    { id: 'c', craft: 'hybride', rank: null, name: 'C', batch: null, components: [], effect: '' },
    { id: 'd', craft: 'hybride', rank: null, name: 'D', batch: null, components: [], effect: '' },
    { id: 'e', craft: 'hybride', rank: null, name: 'E', batch: null, components: [], effect: '' },
  ]

  it("s'arrête au rang connu", () => {
    expect(recipesFor('forge', 2, catalog).map((r) => r.id)).toEqual(['a'])
  })

  it('un métier hybride ouvre un patron par rang, dans l’ordre', () => {
    expect(recipesFor('hybride', 0, catalog)).toEqual([])
    expect(recipesFor('hybride', 2, catalog).map((r) => r.id)).toEqual(['c', 'd'])
    expect(recipesFor('hybride', 5, catalog).map((r) => r.id)).toEqual(['c', 'd', 'e'])
  })
})

describe('effectiveCrafts', () => {
  it('un domaine d’artisanat donne son métier de base, au rang du domaine', () => {
    expect(effectiveCrafts({}, { 'artisanat-lourd': { rank: 4 }, athletisme: { rank: 3 } }, {})).toEqual({ forge: 4 })
  })

  it('plafonne au rang 5 et ignore un domaine au rang 0', () => {
    expect(effectiveCrafts({}, { 'artisanat-lourd': { rank: 7 }, 'alchimie-herboristerie': { rank: 0 } }, {})).toEqual({ forge: 5 })
  })

  it('un artisanat avancé compte dès le rang 1, pas au rang 0', () => {
    expect(effectiveCrafts({}, {}, { 'forge-feu': { rank: 1 }, 'forge-magie': { rank: 0 }, pyromancie: { rank: 2 } }))
      .toEqual({ 'forge-feu': 1 })
  })

  it('garde les métiers appris et le meilleur rang', () => {
    const learned = { forge: 3, 'forge-feu': 1, alchimie: 4 }
    expect(effectiveCrafts(learned, { 'artisanat-lourd': { rank: 4 }, 'alchimie-herboristerie': { rank: 2 } }, { 'forge-feu': { rank: 2 } }))
      .toEqual({ forge: 4, 'forge-feu': 2, alchimie: 4 })
  })
})

describe('recipesByDomain', () => {
  const crafts = [
    { id: 'forge', label: 'Forge', kind: 'base' as const, basis: 'Artisanat lourd - Force', summary: '' },
    { id: 'alchimie', label: 'Alchimie', kind: 'base' as const, basis: 'Alchimie & Botanique - Sagesse', summary: '' },
    { id: 'forge-feu', label: 'Forge-Feu', kind: 'hybrid' as const, basis: 'Artisanat lourd + Pyromancie', summary: '' },
  ]
  const catalog = [
    { id: 'p1', craft: 'alchimie', rank: 1, name: 'Potion', batch: null, components: [], effect: '' },
    { id: 'f1', craft: 'forge', rank: 1, name: 'Épée', batch: null, components: [], effect: '' },
    { id: 'f2', craft: 'forge', rank: 2, name: 'Hache', batch: null, components: [], effect: '' },
    { id: 'h1', craft: 'forge-feu', rank: null, name: 'Lame de magma', batch: null, components: [], effect: '' },
  ]

  it('range chaque métier sous son domaine, au rang connu, les artisanats avancés après', () => {
    const groups = recipesByDomain({ forge: 1, 'forge-feu': 1 }, crafts, catalog)
    expect(groups.map((g) => g.domainId)).toEqual(['artisanat-lourd', 'forge-feu'])
    expect(groups.map((g) => g.recipes.map((r) => r.recipe.id))).toEqual([['f1'], ['h1']])
  })

  it("suit l'ordre des domaines de la fiche", () => {
    const groups = recipesByDomain({ alchimie: 1, forge: 1 }, crafts, catalog)
    expect(groups.map((g) => g.domainId)).toEqual(['artisanat-lourd', 'alchimie-herboristerie'])
  })

  it('aucun métier, aucun groupe', () => {
    expect(recipesByDomain({}, crafts, catalog)).toEqual([])
  })
})

describe('composants', () => {
  const recipe = {
    id: 'r', craft: 'forge', rank: 1, name: 'Épée', batch: null, effect: '',
    components: [{ qty: 3, name: 'Lingots de Fer brut' }, { qty: 1, name: 'Bois dur' }],
  }
  const items: ItemRow[] = [
    { id: 'a', name: 'Lingot de fer brut', quantity: 2, type: 'composant' },
    { id: 'b', name: 'Lingots de Fer brut', quantity: 2, type: 'composant' },
    { id: 'c', name: 'Bois dur', quantity: 1, type: 'composant' },
    { id: 'd', name: 'Potion', quantity: 1, type: 'consommable' },
  ]

  it('singulier, pluriel, casse et accents ne comptent pas', () => {
    expect(componentKey('Lingots de Fer brut')).toBe(componentKey('lingot de fer brut'))
    expect(componentKey('Cuirs épais')).toBe(componentKey('Cuir epais'))
    expect(componentKey('Cristaux de mana')).toBe(componentKey('Cristal de mana'))
    expect(componentKey('Eaux bénites')).toBe(componentKey('Eau bénite'))
  })

  it('compte ce que l’inventaire contient', () => {
    expect(componentNeeds(items, recipe)).toEqual([
      { name: 'Lingots de Fer brut', qty: 3, have: 4 },
      { name: 'Bois dur', qty: 1, have: 1 },
    ])
    expect(hasComponents(items, recipe)).toBe(true)
    expect(hasComponents(items.slice(1), recipe)).toBe(false)
  })

  it('consomme les quantités et retire les objets épuisés', () => {
    const after = consumeComponents(items, recipe)
    expect(after.map((i) => [i.id, i.quantity])).toEqual([['b', 1], ['d', 1]])
    expect(items[0].quantity).toBe(2)
  })
})
