import { describe, it, expect } from 'vitest'
import type { Character, ItemRow } from '../../types/character'
import { RECIPES } from '../../data/sindragosa/crafts'
import { effectiveArmor, equippedWeapons, itemFromRecipe, weaponDamage } from './equipment'

const recipe = (name: string) => RECIPES.find((r) => r.name === name)!
const make = (name: string) => itemFromRecipe(recipe(name), 'id')

function char(items: ItemRow[], armorBonus = 0): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0, armorBonus,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, items,
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [],
  }
}

describe('dégâts fixes par gabarit', () => {
  it('légère 2, une main 3, deux mains 5, plus le bonus', () => {
    expect(weaponDamage({ id: 'a', name: 'Dague', quantity: 1, type: 'arme', size: 'legere' })).toBe(2)
    expect(weaponDamage({ id: 'a', name: 'Épée', quantity: 1, type: 'arme', size: 'une-main', damageBonus: 1 })).toBe(4)
    expect(weaponDamage({ id: 'a', name: 'Hache', quantity: 1, type: 'arme', size: 'deux-mains' })).toBe(5)
  })
})

describe('équipement porté', () => {
  const plastron: ItemRow = { id: 'p', name: 'Plastron', quantity: 1, type: 'armure', armor: 3, equipped: true }
  const casque: ItemRow = { id: 'c', name: 'Casque', quantity: 1, type: 'armure', armor: 1, equipped: false }
  const hache: ItemRow = { id: 'h', name: 'Hache', quantity: 1, type: 'arme', size: 'deux-mains', equipped: true }

  it('AP = armures équipées + bonus des compétences', () => {
    expect(effectiveArmor(char([plastron, casque], 1))).toBe(4)
  })

  it('seules les armes équipées donnent une attaque', () => {
    expect(equippedWeapons(char([hache, { ...hache, id: 'h2', equipped: false }, plastron])).map((i) => i.id)).toEqual(['h'])
  })
})

describe('patron de forge → objet', () => {
  it('une arme : gabarit et domaine lus dans l’effet', () => {
    expect(make('Hache d\'armes à deux mains')).toMatchObject({ type: 'arme', size: 'deux-mains', domainId: 'melee-bourrine', equipped: false })
    expect(make('Épée longue en acier trempé')).toMatchObject({ type: 'arme', size: 'une-main', domainId: 'melee-bourrine' })
    expect(make('Lame d\'estoc en acier fin')).toMatchObject({ type: 'arme', domainId: 'combat-precision' })
    expect(make('Dague de jet équilibrée')).toMatchObject({ type: 'arme', size: 'legere', domainId: 'tir-lancer', quantity: 3 })
  })

  it('une armure : son AP', () => {
    expect(make('Cuirasse de plaques de garde')).toMatchObject({ type: 'armure', armor: 2 })
  })

  it('composants, munitions et le reste', () => {
    expect(make('Barre de fer forgé').type).toBe('composant')
    expect(make('Pointe de carreau en mithril')).toMatchObject({ type: 'consommable', quantity: 10 })
    expect(make('Marteau d\'artisan en fonte').type).toBe('divers')
  })
})
