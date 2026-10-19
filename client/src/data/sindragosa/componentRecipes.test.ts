import { describe, it, expect } from 'vitest'
import { CRAFTS, RECIPES } from './crafts'
import { COMPONENT_RECIPES } from './componentRecipes'
import { HARVEST } from './harvest'
import { componentKey } from '../../utils/sindragosa/crafting'

const harvested = new Set(HARVEST.map((h) => componentKey(h.name)))
const producers = (key: string) => RECIPES.filter((r) => componentKey(r.name) === key)
const baseCrafts = new Set(CRAFTS.filter((c) => c.kind === 'base').map((c) => c.id))

describe('chaîne récolte → composant → patron', () => {
  it('chaque composant se récolte ou se fabrique', () => {
    const orphans = RECIPES.flatMap((r) => r.components
      .filter((c) => !harvested.has(componentKey(c.name)) && !producers(componentKey(c.name)).length)
      .map((c) => `${r.id} : ${c.name}`))
    expect(orphans).toEqual([])
  })

  it('une matière première ne se fabrique pas, et chacune sert', () => {
    const used = new Set(RECIPES.flatMap((r) => r.components.map((c) => componentKey(c.name))))
    expect(HARVEST.filter((h) => producers(componentKey(h.name)).length).map((h) => h.name)).toEqual([])
    expect(HARVEST.filter((h) => !used.has(componentKey(h.name))).map((h) => h.name)).toEqual([])
    expect(harvested.size).toBe(HARVEST.length)
  })

  it('métier de base : un composant de son propre métier s’ouvre au plus tard au rang du patron', () => {
    const late = RECIPES.filter((r) => baseCrafts.has(r.craft)).flatMap((r) => r.components
      .filter((c) => {
        const own = producers(componentKey(c.name)).filter((p) => p.craft === r.craft)
        return own.length && Math.min(...own.map((p) => p.rank!)) > r.rank!
      })
      .map((c) => `${r.id} (rang ${r.rank}) : ${c.name}`))
    expect(late).toEqual([])
  })

  it('patrons de composants : métiers de base, rang 1 à 5, ids uniques', () => {
    for (const r of COMPONENT_RECIPES) {
      expect(baseCrafts.has(r.craft), r.id).toBe(true)
      expect(r.rank, r.id).toBeGreaterThanOrEqual(1)
      expect(r.rank, r.id).toBeLessThanOrEqual(5)
    }
    expect(new Set(RECIPES.map((r) => r.id)).size).toBe(RECIPES.length)
  })
})
