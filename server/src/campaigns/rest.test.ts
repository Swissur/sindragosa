import { describe, expect, it } from 'vitest'
import { applyRest, endSession, isRestKind, restDelta, type RestState } from './rest.js'

function state(over: Partial<RestState> = {}): RestState {
  return {
    hpCurrent: 7,
    hpMax: 24,
    pcCurrent: 0,
    manaCurrent: 0,
    manaMax: 0,
    states: [{ id: 'affaibli' as const }],
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
    expect(after.states).toEqual([{ id: 'affaibli' as const }])
    expect(after.pcCurrent).toBe(0)
  })
})

describe('applyRest — mana', () => {
  it('le repos court rend un tiers de la jauge, arrondi au-dessus', () => {
    expect(applyRest(state({ manaCurrent: 0, manaMax: 10 }), 'court').manaCurrent).toBe(4)
    expect(applyRest(state({ manaCurrent: 0, manaMax: 4 }), 'court').manaCurrent).toBe(2)
    expect(applyRest(state({ manaCurrent: 1, manaMax: 2 }), 'court').manaCurrent).toBe(2)
  })

  it('le repos court ne dépasse pas le max', () => {
    expect(applyRest(state({ manaCurrent: 9, manaMax: 10 }), 'court').manaCurrent).toBe(10)
  })

  it('le repos long remplit la jauge, la fin de séance seule n\'y touche pas', () => {
    expect(applyRest(state({ manaCurrent: 1, manaMax: 11 }), 'long').manaCurrent).toBe(11)
    expect(endSession(state({ manaCurrent: 1, manaMax: 11 }), false).manaCurrent).toBe(1)
  })

  it('apparaît dans le delta quand elle bouge', () => {
    const before = state({ manaCurrent: 1, manaMax: 6 })
    expect(restDelta(before, applyRest(before, 'court'))).toEqual({ mana: { before: 1, after: 3 } })
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

describe('endSession — fin de séance', () => {
  it('sans repos long : chance à 2, coches à 0, usages « séance » rendus, rien d\'autre', () => {
    const after = endSession(state(), false)
    expect(Object.keys(after.abilityUses).sort()).toEqual(['combat', 'repos-court', 'repos-long'])
    expect(after.pcCurrent).toBe(2)
    expect(after.sessionTicks).toEqual({ success: 0, critFail: 0 })
    expect(after.hpCurrent).toBe(7)
    expect(after.states).toEqual([{ id: 'affaibli' as const }])
  })

  it('avec repos long : remet tout, PV au max et états levés', () => {
    const after = endSession(state(), true)
    expect(after.abilityUses).toEqual({})
    expect(after.hpCurrent).toBe(24)
    expect(after.states).toEqual([])
    expect(after.pcCurrent).toBe(2)
    expect(after.sessionTicks).toEqual({ success: 0, critFail: 0 })
  })
})

describe('restDelta', () => {
  it('ne rapporte que ce qui a changé', () => {
    const before = state()
    expect(restDelta(before, applyRest(before, 'court'))).toEqual({})
    expect(restDelta(before, endSession(before, true))).toEqual({
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
