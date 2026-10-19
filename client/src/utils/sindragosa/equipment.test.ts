import { describe, it, expect } from 'vitest'
import type { Character, ItemRow } from '../../types/character'
import { RECIPES } from '../../data/sindragosa/crafts'
import { BARE_HANDS, effectiveArmor, equippedWeapons, itemFromRecipe, strikeWeapons, weaponDamage, weaponFor } from './equipment'
import type { FormId } from '../../data/sindragosa/forms'

const recipe = (name: string) => RECIPES.find((r) => r.name === name)!
const make = (name: string) => itemFromRecipe(recipe(name), 'id')

function char(items: ItemRow[], armorBonus = 0, form: FormId | null = null): Character {
  return {
    id: '1', name: 'Test', histoire: '', race: '', portraitImageId: null,
    stats: { str: 2, agi: 2, end: 2, int: 2, wis: 2, cha: 2 },
    hpCurrent: 20, hpMax: 20, hpBonus: 0, armor: 0, armorBonus,
    domains: {}, specialties: [], advancedDomains: {}, titles: [],
    abilityUses: {}, sessionTicks: { success: 0, critFail: 0 },
    resources: [], crafts: {}, items,
    goldCoins: 0, silverCoins: 0, copperCoins: 0, pcCurrent: 2, states: [], form,
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
    expect(make('Lingot de Fer').type).toBe('composant')
    expect(make('Cuir brut')).toMatchObject({ type: 'composant', quantity: 1 })
    expect(make('Pointe de carreau en mithril')).toMatchObject({ type: 'consommable', quantity: 10 })
    expect(make('Marteau d\'artisan en fonte').type).toBe('divers')
  })
})

describe('arme d\'une compétence d\'attaque', () => {
  const arc: ItemRow = { id: 'arc', name: 'Arc', quantity: 1, type: 'arme', domainId: 'tir-lancer', equipped: true }
  const dague: ItemRow = { id: 'dague', name: 'Dague', quantity: 1, type: 'arme', domainId: 'combat-precision', equipped: true }
  const masse: ItemRow = { id: 'masse', name: 'Masse', quantity: 1, type: 'arme', equipped: true }

  it('un tir prend l\'arme de tir, une frappe l\'arme de contact', () => {
    const c = char([arc, dague])
    expect(weaponFor(c, 'distance')?.id).toBe('arc')
    expect(weaponFor(c, 'contact')?.id).toBe('dague')
  })

  it('une arme sans domaine compte comme une arme de contact', () => {
    expect(weaponFor(char([arc, masse]), 'contact')?.id).toBe('masse')
  })

  it('à défaut de la bonne portée, la première arme équipée', () => {
    expect(weaponFor(char([dague]), 'distance')?.id).toBe('dague')
    expect(weaponFor(char([arc]), 'contact')?.id).toBe('arc')
  })

  it('aucune arme équipée : pas d\'attaque', () => {
    expect(weaponFor(char([{ ...dague, equipped: false }]), 'contact')).toBeNull()
  })
})

describe('armes naturelles et formes', () => {
  const epee: ItemRow = { id: 'epee', name: 'Épée', quantity: 1, type: 'arme', equipped: true }
  const cornes: ItemRow = { id: 'cornes', name: 'Cornes', quantity: 1, type: 'arme', size: 'naturelle', equipped: true }

  it('une arme naturelle fait 1 dégât, plus son bonus', () => {
    expect(weaponDamage(BARE_HANDS)).toBe(1)
    expect(weaponDamage({ ...cornes, damageBonus: 1 })).toBe(2)
  })

  it('sans arme : l\'arme naturelle équipée, sinon les mains nues', () => {
    expect(weaponFor(char([epee, cornes]), 'naturelle')?.id).toBe('cornes')
    expect(weaponFor(char([epee]), 'naturelle')).toBe(BARE_HANDS)
  })

  it('une frappe préfère l\'arme à l\'arme naturelle', () => {
    expect(weaponFor(char([cornes, epee]), 'contact')?.id).toBe('epee')
  })

  it('Frapper : les armes équipées, sinon les mains nues', () => {
    expect(strikeWeapons(char([epee])).map((w) => w.id)).toEqual(['epee'])
    expect(strikeWeapons(char([]))).toEqual([BARE_HANDS])
  })

  it('une forme prise remplace toutes les armes', () => {
    const ours = char([epee], 0, 'ours')
    expect(strikeWeapons(ours)).toMatchObject([{ name: "Griffes d'ours", domainId: 'melee-bourrine' }])
    expect(weaponDamage(strikeWeapons(ours)[0])).toBe(3)
    for (const reach of ['contact', 'distance', 'naturelle'] as const) expect(weaponFor(ours, reach)?.name).toBe("Griffes d'ours")
    expect(weaponDamage(weaponFor(char([], 0, 'felin'), 'naturelle')!)).toBe(2)
  })
})
