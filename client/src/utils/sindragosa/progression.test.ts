import { describe, it, expect } from 'vitest'
import { ticksForRank, addDomainTick, addSpecialtyTick, canAddSpecialty, canTick } from './progression'

describe('ticksForRank', () => {
  it('suit le barème 2, 3, 4, 5, 6', () => {
    expect([1, 2, 3, 4, 5].map(ticksForRank)).toEqual([2, 3, 4, 5, 6])
  })
})

describe('addDomainTick', () => {
  it('passe au rang 1 à la 2e coche', () => {
    const once = addDomainTick({ rank: 0, ticks: 0 })
    expect(once).toEqual({ rank: 0, ticks: 1 })
    expect(addDomainTick(once)).toEqual({ rank: 1, ticks: 0 })
  })

  it('passe au rang 3 à la 4e coche', () => {
    expect(addDomainTick({ rank: 2, ticks: 3 })).toEqual({ rank: 3, ticks: 0 })
  })

  it('plafonne au rang 5', () => {
    expect(addDomainTick({ rank: 5, ticks: 0 })).toEqual({ rank: 5, ticks: 0 })
  })
})

describe('addSpecialtyTick', () => {
  it('2 coches par niveau, plafond Maître', () => {
    expect(addSpecialtyTick({ rank: 0, ticks: 1 })).toEqual({ rank: 1, ticks: 0 })
    expect(addSpecialtyTick({ rank: 3, ticks: 1 })).toEqual({ rank: 3, ticks: 1 })
  })
})

describe('canAddSpecialty', () => {
  it('autant de spécialités que le rang du domaine', () => {
    expect(canAddSpecialty(2, 1)).toBe(true)
    expect(canAddSpecialty(2, 2)).toBe(false)
    expect(canAddSpecialty(0, 0)).toBe(false)
  })
})

describe('canTick', () => {
  it('au plus 2 coches de réussite par séance', () => {
    expect(canTick('success', { success: 1, critFail: 0 })).toBe(true)
    expect(canTick('success', { success: 2, critFail: 0 })).toBe(false)
  })

  it("au plus 1 coche d'échec critique par séance", () => {
    expect(canTick('crit-fail', { success: 0, critFail: 1 })).toBe(false)
  })

  it('au plus 3 coches au total', () => {
    expect(canTick('crit-fail', { success: 2, critFail: 0 })).toBe(true)
    expect(canTick('success', { success: 2, critFail: 1 })).toBe(false)
  })

  it('les récompenses du MJ ne comptent pas dans la limite', () => {
    expect(canTick('reward', { success: 2, critFail: 1 })).toBe(true)
  })
})
