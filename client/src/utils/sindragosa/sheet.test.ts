import { describe, it, expect } from 'vitest'
import type { Character } from '../../types/character'
import { computeMaxHp, withRace, applyTick, addSpecialty, statAtCreation } from './sheet'

function char(over: Partial<Character> = {}): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, weapons: [], items: [],
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [],
    ...over,
  }
}

describe('withRace', () => {
  it('ajoute +1 à la carac de la race', () => {
    expect(withRace(char(), 'nain').stats.end).toBe(3)
  })

  it('changer de race déplace le bonus', () => {
    const c = withRace(withRace(char(), 'nain'), 'orc')
    expect(c.stats.end).toBe(2)
    expect(c.stats.str).toBe(3)
  })
})

describe('computeMaxHp', () => {
  it("le +1 racial d'Endurance ne donne pas de PV (c'est la valeur de création)", () => {
    expect(computeMaxHp(withRace(char(), 'nain'))).toBe(20)
    expect(statAtCreation('nain', 'end')).toBe(3)
  })

  it('compte domaines, Endurance gagnée et bonus divers', () => {
    const c = char({ stats: { str: 2, agi: 2, end: 3, int: 2, wis: 2, cha: 2 }, domains: { 'resistance-physique': { rank: 1, ticks: 0 } }, hpBonus: 3 })
    expect(computeMaxHp(c)).toBe(20 + 5 + 8 + 3)
  })
})

describe('applyTick', () => {
  it('une coche de réussite remplit la jauge et compte dans la séance', () => {
    const r = applyTick(char(), { kind: 'domain', id: 'athletisme' }, 'success')
    expect(r.ok && r.character.domains.athletisme).toEqual({ rank: 0, ticks: 1 })
    expect(r.ok && r.character.sessionTicks).toEqual({ success: 1, critFail: 0 })
  })

  it('la 2e coche fait passer au rang 1', () => {
    const r = applyTick(char({ domains: { athletisme: { rank: 0, ticks: 1 } } }), { kind: 'domain', id: 'athletisme' }, 'reward')
    expect(r.ok && r.rankedUp).toBe(true)
    expect(r.ok && r.newRank).toBe(1)
  })

  it('refuse au-delà de la limite de séance, sauf récompense du MJ', () => {
    const c = char({ sessionTicks: { success: 2, critFail: 1 } })
    expect(applyTick(c, { kind: 'domain', id: 'athletisme' }, 'success')).toEqual({ ok: false, reason: 'limite-seance' })
    const reward = applyTick(c, { kind: 'domain', id: 'athletisme' }, 'reward')
    expect(reward.ok && reward.character.sessionTicks).toEqual({ success: 2, critFail: 1 })
  })

  it('fait progresser une spécialité (2 coches par niveau)', () => {
    const c = char({ specialties: [{ id: 's', domainId: 'melee-bourrine', name: 'Haches', level: 1, ticks: 1 }] })
    const r = applyTick(c, { kind: 'specialty', id: 's' }, 'success')
    expect(r.ok && r.character.specialties[0]).toMatchObject({ level: 2, ticks: 0 })
  })

  it('un domaine au rang 5 ne prend plus de coche', () => {
    const c = char({ domains: { athletisme: { rank: 5, ticks: 0 } } })
    expect(applyTick(c, { kind: 'domain', id: 'athletisme' }, 'reward')).toEqual({ ok: false, reason: 'rang-max' })
  })
})

describe('addSpecialty', () => {
  it('autant de spécialités que le rang du domaine', () => {
    const c = char({ domains: { 'melee-bourrine': { rank: 1, ticks: 0 } } })
    const once = addSpecialty(c, 'melee-bourrine', 'Haches', 'a')
    expect(once?.specialties).toHaveLength(1)
    expect(addSpecialty(once!, 'melee-bourrine', 'Masses', 'b')).toBeNull()
  })

  it('refuse un nom vide ou un domaine à rang 0', () => {
    expect(addSpecialty(char(), 'melee-bourrine', 'Haches', 'a')).toBeNull()
    expect(addSpecialty(char({ domains: { 'melee-bourrine': { rank: 1, ticks: 0 } } }), 'melee-bourrine', '  ', 'a')).toBeNull()
  })
})
