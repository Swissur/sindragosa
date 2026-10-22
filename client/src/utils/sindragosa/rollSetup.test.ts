import { describe, it, expect } from 'vitest'
import type { Character } from '../../types/character'
import { rollSetup, poolSummary, tickReasonFor } from './rollSetup'
import { readPool } from './pool'

function char(over: Partial<Character> = {}): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 3, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0,
    domains: { 'combat-precision': { rank: 2, ticks: 0 } },
    specialties: [
      { id: 'dag', domainId: 'combat-precision', name: 'Dagues', level: 2, ticks: 0 },
      { id: 'hach', domainId: 'melee-bourrine', name: 'Haches', level: 3, ticks: 0 },
    ],
    advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, weapons: [], items: [],
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [],
    ...over,
  }
}

const base = { domainId: 'combat-precision', specialtyId: '', mode: 'normal' as const, luck: 0 }

describe('rollSetup', () => {
  it('carac + rang', () => {
    const s = rollSetup(char(), base)!
    expect(s.count).toBe(5)
    expect(s.parts).toEqual([{ label: 'AGI', value: 3 }, { label: 'rang', value: 2 }])
  })

  it('Expert ajoute 1d6, avantage et chance aussi', () => {
    const s = rollSetup(char(), { ...base, specialtyId: 'dag', mode: 'avantage', luck: 2 })!
    expect(s.count).toBe(9)
    expect(s.specialtyLevel).toBe(2)
  })

  it("chaque dé connaît son origine, dans l'ordre carac, domaine, spécialité, avantage, chance", () => {
    const s = rollSetup(char(), { ...base, specialtyId: 'dag', mode: 'avantage', luck: 2 })!
    expect(s.sources).toEqual(['stat', 'stat', 'stat', 'domaine', 'domaine', 'specialite', 'avantage', 'chance', 'chance'])
  })

  it('un sort Puissant ajoute 1d6, rangé après la spécialité', () => {
    const s = rollSetup(char(), { ...base, specialtyId: 'dag', power: 1 })!
    expect(s.count).toBe(7)
    expect(s.parts).toContainEqual({ label: 'puissante', value: 1 })
    expect(s.sources).toEqual(['stat', 'stat', 'stat', 'domaine', 'domaine', 'specialite', 'puissance'])
  })

  it('le désavantage retire un dé de caractéristique', () => {
    const s = rollSetup(char(), { ...base, mode: 'desavantage' })!
    expect(s.sources).toEqual(['stat', 'stat', 'domaine', 'domaine'])
    expect(s.sources).toHaveLength(s.count)
  })

  it('sans caractéristique, le désavantage entame le domaine', () => {
    const s = rollSetup(char({ stats: { str: 2, agi: 0, end: 2, int: 2, wis: 2, cha: 2 } }), { ...base, mode: 'desavantage' })!
    expect(s.sources).toEqual(['domaine'])
  })

  it("ignore une spécialité d'un autre domaine et la chance qu'on n'a pas", () => {
    const s = rollSetup(char({ pcCurrent: 1 }), { ...base, specialtyId: 'hach', luck: 3 })!
    expect(s.specialtyLevel).toBe(0)
    expect(s.count).toBe(6)
  })

  it('le désavantage retire un dé', () => {
    expect(rollSetup(char(), { ...base, mode: 'desavantage' })!.count).toBe(4)
  })

  it('un domaine avancé prend la plus haute de ses caractéristiques liées', () => {
    // Ivresse du Combat : Mêlée bourrine (FOR) + Volonté & Récupération (END)
    const c = char({ stats: { str: 2, agi: 3, end: 4, int: 2, wis: 2, cha: 2 }, advancedDomains: { 'ivresse-combat': { rank: 2, ticks: 0 } } })
    const s = rollSetup(c, { ...base, domainId: 'ivresse-combat', specialtyId: 'dag' })!
    expect(s.kind).toBe('advanced')
    expect(s.parts).toEqual([{ label: 'END', value: 4 }, { label: 'rang', value: 2 }])
    expect(s.count).toBe(6)
  })

  it('domaine inconnu', () => {
    expect(rollSetup(char(), { ...base, domainId: 'nope' })).toBeNull()
  })
})

describe('poolSummary', () => {
  it('Maître : critique dès 5', () => {
    expect(poolSummary({ ...readPool([5, 2], 3), rerolledIndex: null, rerolledFrom: null }, 3))
      .toEqual({ critFrom: 5, reached: 'facile', critFail: false })
  })

  it('le dé relancé et son écarté gardent leur origine', () => {
    const r = { ...readPool([5, 6]), rerolledIndex: 1, rerolledFrom: 1 }
    expect(poolSummary(r, 1, ['stat', 'chance']).sources).toEqual(['stat', 'chance', 'chance'])
  })
})

describe('tickReasonFor', () => {
  const roll = (dice: number[]) => ({ ...readPool(dice), rerolledIndex: null, rerolledFrom: null })

  it('réussite → coche de réussite, échec critique → coche d’échec', () => {
    expect(tickReasonFor(roll([6, 2]), { success: 0, critFail: 0 })).toBe('success')
    expect(tickReasonFor(roll([1, 2]), { success: 0, critFail: 0 })).toBe('crit-fail')
  })

  it('rien sur un échec simple ou quand la séance est pleine', () => {
    expect(tickReasonFor(roll([2, 3]), { success: 0, critFail: 0 })).toBeNull()
    expect(tickReasonFor(roll([6]), { success: 2, critFail: 0 })).toBeNull()
  })
})

describe('objets divers liés à un domaine', () => {
  const trefle = { id: 't', name: 'Trèfle', quantity: 1, type: 'divers' as const, domainBonus: { domainId: 'combat-precision', dice: 1 } }
  const maudit = { id: 'm', name: 'Anneau maudit', quantity: 1, type: 'divers' as const, domainBonus: { domainId: 'combat-precision', dice: -2 } }

  it('un bonus ajoute des dés, colorés « objet »', () => {
    const s = rollSetup(char({ items: [trefle] }), base)!
    expect(s.count).toBe(6)
    expect(s.parts).toContainEqual({ label: 'objets', value: 1 })
    expect(s.sources).toContain('objet')
  })

  it('les objets se cumulent, un malus entame la base', () => {
    const s = rollSetup(char({ items: [trefle, maudit] }), base)!
    expect(s.count).toBe(4)
    expect(s.parts).toContainEqual({ label: 'objets', value: -1 })
    expect(s.sources).not.toContain('objet')
  })

  it('n’agit que sur son domaine, et seulement en objet divers', () => {
    expect(rollSetup(char({ items: [trefle] }), { ...base, domainId: 'athletisme' })!.parts).not.toContainEqual(expect.objectContaining({ label: 'objets' }))
    expect(rollSetup(char({ items: [{ ...trefle, type: 'arme' as const }] }), base)!.count).toBe(5)
  })
})
