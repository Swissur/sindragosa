import { describe, expect, it } from 'vitest'
import { comboPool, comboSucceeds, comboTier, readCombo, rollCombo } from './combo'

/** Un rng qui rend les faces voulues, dans l'ordre. */
const faces = (...values: number[]) => {
  let i = 0
  return () => (values[i++] - 1) / 6
}

describe('readCombo', () => {
  it('compte les dés pairs et ajoute les overdrives', () => {
    const r = readCombo([1, 2, 4, 5], 2)
    expect(r.successes).toBe(2)
    expect(r.total).toBe(4)
    expect(r.exploit).toBe(false)
    expect(r.critFail).toBe(false)
  })

  it('aucun dé pair : échec critique, même avec des overdrives', () => {
    const r = readCombo([1, 3, 5], 2)
    expect(r.critFail).toBe(true)
    expect(r.total).toBe(2)
  })

  it('tous les dés pairs : exploit, la relance s’ajoute', () => {
    const r = readCombo([2, 4], 1, [6, 3])
    expect(r.exploit).toBe(true)
    expect(r.successes).toBe(3)
    expect(r.total).toBe(4)
  })

  it('ignore une relance sans exploit', () => {
    const r = readCombo([2, 3], 0, [6, 6])
    expect(r.exploitDice).toEqual([])
    expect(r.successes).toBe(1)
  })

  it('une réserve vide n’est ni un exploit ni un échec critique', () => {
    const r = readCombo([], 1)
    expect(r.exploit).toBe(false)
    expect(r.critFail).toBe(false)
    expect(r.total).toBe(1)
  })
})

describe('rollCombo', () => {
  it('lance la réserve', () => {
    const r = rollCombo(3, 0, faces(2, 3, 5))
    expect(r.dice).toEqual([2, 3, 5])
    expect(r.exploitDice).toEqual([])
  })

  it('relance une fois sur un exploit', () => {
    const r = rollCombo(2, 0, faces(2, 6, 4, 4))
    expect(r.exploitDice).toEqual([4, 4])
    expect(r.successes).toBe(4)
  })
})

describe('comboSucceeds', () => {
  it('réussit quand le total dépasse la difficulté', () => {
    expect(comboSucceeds(4, 3)).toBe(true)
    expect(comboSucceeds(3, 3)).toBe(false)
    expect(comboSucceeds(3, null)).toBeNull()
  })
})

describe('comboPool', () => {
  it('range les dés par origine', () => {
    const pool = comboPool(readCombo([2, 4, 6], 0, [1, 1, 2]), 2, null)
    expect(pool.sources).toEqual(['base', 'base', 'combo', 'exploit', 'exploit', 'exploit'])
    expect(pool.system).toBe('knight')
  })
})

describe('comboTier', () => {
  const pool = (over: Partial<ReturnType<typeof comboPool>> = {}) => ({ ...comboPool(readCombo([2, 3], 0), 1, 2), ...over })

  it('annonce l’échec critique et l’exploit avant la difficulté', () => {
    expect(comboTier(pool({ critFail: true }), 9)).toBe('Échec critique')
    expect(comboTier(pool({ exploit: true }), 0)).toBe('Exploit')
  })

  it('compare le total à la difficulté', () => {
    expect(comboTier(pool(), 3)).toBe('Réussite')
    expect(comboTier(pool(), 2)).toBe('Échec')
    expect(comboTier(pool({ difficulty: null }), 2)).toBeNull()
  })
})
