import { describe, it, expect } from 'vitest'
import { poolSize, difficultyReached, readPool, rollPool } from './pool'

/** Générateur qui rend les faces demandées, dans l'ordre. */
const faces = (...values: number[]) => {
  let i = 0
  return () => (values[i++] - 1) / 6 + 0.0001
}

describe('poolSize', () => {
  it('additionne carac et rang du domaine', () => {
    expect(poolSize({ stat: 2, domainRank: 1 })).toBe(3)
  })

  it('une spécialité Expert ou Maître ajoute 1d6, pas Apprenti', () => {
    expect(poolSize({ stat: 2, domainRank: 1, specialtyLevel: 1 })).toBe(3)
    expect(poolSize({ stat: 2, domainRank: 1, specialtyLevel: 2 })).toBe(4)
    expect(poolSize({ stat: 2, domainRank: 1, specialtyLevel: 3 })).toBe(4)
  })

  it('avantage, désavantage et chance ajoutent ou retirent 1d6 chacun', () => {
    expect(poolSize({ stat: 2, domainRank: 0, advantages: 1, luck: 2 })).toBe(5)
    expect(poolSize({ stat: 2, domainRank: 0, disadvantages: 1 })).toBe(1)
  })

  it('ne descend jamais sous 0 dé', () => {
    expect(poolSize({ stat: 0, domainRank: 0, disadvantages: 3 })).toBe(0)
  })
})

describe('difficultyReached', () => {
  it.each([
    [0, 'echec'], [1, 'facile'], [2, 'moyenne'], [3, 'difficile'], [4, 'exploit'], [7, 'exploit'],
  ])('%i succès → %s', (n, expected) => {
    expect(difficultyReached(n)).toBe(expected)
  })
})

describe('readPool', () => {
  it('compte les 5 et 6 comme succès', () => {
    expect(readPool([1, 5, 6, 3]).successes).toBe(2)
  })

  it('seul le 6 est critique sans spécialité Maître', () => {
    const r = readPool([5, 5, 4])
    expect(r.criticals).toBe(0)
    expect(r.isCriticalSuccess).toBe(false)
    expect(readPool([6, 2]).isCriticalSuccess).toBe(true)
  })

  it('avec une spécialité Maître, le 5 est aussi critique', () => {
    expect(readPool([5, 2], 3).criticals).toBe(1)
    expect(readPool([5, 6], 3).criticals).toBe(2)
  })

  it('échec critique : aucun succès et au moins un 1', () => {
    expect(readPool([1, 3, 4]).isCriticalFailure).toBe(true)
    expect(readPool([2, 3, 4]).isCriticalFailure).toBe(false)
    expect(readPool([1, 5]).isCriticalFailure).toBe(false)
  })

  it('une réserve vide est un échec simple', () => {
    const r = readPool([])
    expect(r.reached).toBe('echec')
    expect(r.isCriticalFailure).toBe(false)
  })
})

describe('rollPool', () => {
  it('lance le nombre de dés demandé', () => {
    const r = rollPool(3, 0, faces(2, 5, 6))
    expect(r.dice).toEqual([2, 5, 6])
    expect(r.successes).toBe(2)
    expect(r.rerolledIndex).toBeNull()
  })

  it('avec une spécialité, relance un seul 1', () => {
    const r = rollPool(3, 1, faces(1, 1, 4, 6))
    expect(r.dice).toEqual([6, 1, 4])
    expect(r.rerolledIndex).toBe(0)
    expect(r.rerolledFrom).toBe(1)
  })

  it("sans spécialité, les 1 restent et peuvent donner un échec critique", () => {
    const r = rollPool(2, 0, faces(1, 3))
    expect(r.isCriticalFailure).toBe(true)
  })
})
