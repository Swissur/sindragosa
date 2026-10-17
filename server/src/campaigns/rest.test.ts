import { describe, expect, it } from 'vitest'
import { applyRest, isRestKind, restDelta, type RestState } from './rest.js'

function state(over: Partial<RestState> = {}): RestState {
  return {
    hpCurrent: 7,
    hpMax: 24,
    pcCurrent: 0,
    states: ['affaibli'],
    abilityUses: { combat: { 30: 1 }, 'repos-court': { 11: 1 }, 'repos-long': { 40: 1 }, seance: { 123: 1 } },
    sessionTicks: { success: 2, critFail: 1 },
    ...over,
  }
}

describe('applyRest — repos court', () => {
  it('vide les usages par combat et par repos court, rien d\'autre', () => {
    const after = applyRest(state(), 'court')
    expect(Object.keys(after.abilityUses).sort()).toEqual(['repos-long', 'seance'])
    expect(after.hpCurrent).toBe(7)
    expect(after.states).toEqual(['affaibli'])
    expect(after.pcCurrent).toBe(0)
  })
})

describe('applyRest — repos long', () => {
  it('vide aussi les usages par repos long, remonte les PV et lève les états', () => {
    const after = applyRest(state(), 'long')
    expect(Object.keys(after.abilityUses)).toEqual(['seance'])
    expect(after.hpCurrent).toBe(24)
    expect(after.states).toEqual([])
  })

  it('ne touche ni à la chance ni aux coches de la séance', () => {
    const after = applyRest(state(), 'long')
    expect(after.pcCurrent).toBe(0)
    expect(after.sessionTicks).toEqual({ success: 2, critFail: 1 })
  })
})

describe('applyRest — fin de séance', () => {
  it('remet tout : usages, PV, chance à 2, coches à 0', () => {
    const after = applyRest(state(), 'seance')
    expect(after.abilityUses).toEqual({})
    expect(after.hpCurrent).toBe(24)
    expect(after.pcCurrent).toBe(2)
    expect(after.sessionTicks).toEqual({ success: 0, critFail: 0 })
  })
})

describe('restDelta', () => {
  it('ne rapporte que ce qui a changé', () => {
    const before = state()
    expect(restDelta(before, applyRest(before, 'court'))).toEqual({})
    expect(restDelta(before, applyRest(before, 'seance'))).toEqual({
      hp: { before: 7, after: 24 },
      pc: { before: 0, after: 2 },
    })
  })
})

describe('isRestKind', () => {
  it('accepte court, long, seance', () => {
    expect(['court', 'long', 'seance'].every(isRestKind)).toBe(true)
    expect(isRestKind('complet')).toBe(false)
  })
})
