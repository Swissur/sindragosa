import { describe, it, expect } from 'vitest'
import type { Character, ItemRow } from '../../types/character'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { formOfAbility } from '../../data/sindragosa/forms'
import { raceAbility, raceById } from '../../data/sindragosa/races'
import { abilityAttackRoll, isAttack } from './abilityAttack'

const ability = (name: string) => ABILITIES.find((a) => a.name === name)!

function char(items: ItemRow[] = []): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0, armorBonus: 0,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, items,
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [], form: null,
  }
}

const dague: ItemRow = { id: 'd', name: 'Dague', quantity: 1, type: 'arme', domainId: 'combat-precision', equipped: true }

describe('jet d\'attaque d\'une compétence', () => {
  it('à l\'arme : le domaine de l\'arme équipée, avec l\'arme pour les dégâts', () => {
    expect(abilityAttackRoll(char([dague]), ability('Attaque sournoise'))).toEqual({
      domainId: 'combat-precision', label: 'Attaque sournoise · Dague', weapon: dague,
    })
  })

  it('à l\'arme, sans arme équipée : pas de jet', () => {
    expect(abilityAttackRoll(char(), ability('Attaque sournoise'))).toBeNull()
  })

  it('sans arme : les mains nues, en Athlétisme', () => {
    expect(abilityAttackRoll(char(), ability("Projection d'ennemi"))).toMatchObject({
      domainId: 'athletisme', label: "Projection d'ennemi · Mains nues",
    })
  })

  it('un sort : jet de domaine, sans arme', () => {
    expect(abilityAttackRoll(char([dague]), ability('Météore'))).toEqual({ domainId: 'pyromancie', label: 'Météore' })
  })

  it('en forme, Griffe d\'ombre attaque avec les griffes de félin', () => {
    expect(abilityAttackRoll({ ...char([dague]), form: 'felin' }, ability("Griffe d'ombre"))).toMatchObject({
      domainId: 'combat-precision', weapon: { name: 'Griffes de félin' },
    })
  })

  it('une compétence qui n\'attaque pas', () => {
    expect(isAttack(ability('Feinte'))).toBe(false)
    expect(abilityAttackRoll(char([dague]), ability('Feinte'))).toBeNull()
  })
})

describe('transformations', () => {
  it('Forme d\'ours et Forme de félin donnent leur forme', () => {
    expect(formOfAbility(ability("Forme d'ours"), '')?.id).toBe('ours')
    expect(formOfAbility(ability('Forme de félin'), '')?.id).toBe('felin')
    expect(formOfAbility(ability('Feinte'), '')).toBeUndefined()
  })

  it('le pouvoir racial du Worgen est une forme, pas celui des autres races', () => {
    expect(formOfAbility(raceAbility(raceById('worgen')!), 'worgen')?.id).toBe('worgen')
    expect(formOfAbility(raceAbility(raceById('nain')!), 'nain')).toBeUndefined()
  })
})
