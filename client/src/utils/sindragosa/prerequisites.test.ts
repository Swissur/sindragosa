import { describe, it, expect } from 'vitest'
import { meetsPrerequisite, unlockedAbilities, normalizeName, type ProgressState, prerequisiteLabel } from './prerequisites'
import { ABILITIES } from '../../data/sindragosa/abilities'

const empty: ProgressState = { domainRanks: {}, advancedRanks: {}, specialties: [], titles: [] }

describe('meetsPrerequisite', () => {
  it('domaine : rang atteint ou dépassé', () => {
    const p = { kind: 'domain' as const, id: 'melee-bourrine', rank: 2 }
    expect(meetsPrerequisite({ ...empty, domainRanks: { 'melee-bourrine': 2 } }, p)).toBe(true)
    expect(meetsPrerequisite({ ...empty, domainRanks: { 'melee-bourrine': 1 } }, p)).toBe(false)
  })

  it('spécialité : nom tolérant (accents, casse) et niveau minimal', () => {
    const p = { kind: 'specialty' as const, name: 'Épées à deux mains', level: 2 }
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'epees a deux mains', level: 2 }] }, p)).toBe(true)
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Épées à deux mains', level: 1 }] }, p)).toBe(false)
  })

  it('spécialité à alternatives : « Dagues/Lutte » accepte l\'une ou l\'autre', () => {
    const p = { kind: 'specialty' as const, name: 'Dagues/Lutte', level: 1 }
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Lutte', level: 1 }] }, p)).toBe(true)
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Arcs', level: 3 }] }, p)).toBe(false)
  })

  it('alternatives entre parenthèses et des deux côtés', () => {
    const tranchant = { kind: 'specialty' as const, name: 'Tranchant (Haches/Épées)', level: 1 }
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Haches', level: 1 }] }, tranchant)).toBe(true)
    const lutte = { kind: 'specialty' as const, name: 'Dagues/Lutte', level: 1 }
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Lutte / Mains nues', level: 1 }] }, lutte)).toBe(true)
  })

  it('équivalences : « Bouclier » et « Boucliers » sont la même spécialité', () => {
    const p = { kind: 'specialty' as const, name: 'Bouclier', level: 1 }
    expect(meetsPrerequisite({ ...empty, specialties: [{ name: 'Boucliers', level: 1 }] }, p)).toBe(true)
  })

  it('titre', () => {
    const p = { kind: 'title' as const, name: 'Archimage' }
    expect(meetsPrerequisite({ ...empty, titles: ['archimage'] }, p)).toBe(true)
    expect(meetsPrerequisite(empty, p)).toBe(false)
  })
})

describe('unlockedAbilities', () => {
  it('un personnage vierge ne débloque rien', () => {
    expect(unlockedAbilities(empty)).toEqual([])
  })

  it('Témérité (#12) se débloque avec Intimidation physique 1 + Commandement 1', () => {
    const state = { ...empty, domainRanks: { 'intimidation-physique': 1, 'commandement-inspiration': 1 } }
    expect(unlockedAbilities(state).map((a) => a.id)).toContain(12)
  })

  it('Distorsion temporelle (#159) exige aussi le titre Archimage', () => {
    const ability = ABILITIES[158]
    const state = { ...empty, domainRanks: { 'magie-profane-arcanes': 3 }, advancedRanks: { chronomancie: 2 } }
    expect(unlockedAbilities(state, [ability])).toEqual([])
    expect(unlockedAbilities({ ...state, titles: ['Archimage'] }, [ability])).toEqual([ability])
  })
})

describe('normalizeName', () => {
  it('ignore accents, casse et espaces multiples', () => {
    expect(normalizeName('  Épées   à deux MAINS ')).toBe('epees a deux mains')
  })
})

describe('prerequisiteLabel', () => {
  it('écrit chaque sorte de prérequis', () => {
    expect(prerequisiteLabel({ kind: 'domain', id: 'combat-precision', rank: 2 })).toBe('Combat de précision 2')
    expect(prerequisiteLabel({ kind: 'advanced', id: 'pyromancie', rank: 1 })).toBe('Pyromancie 1')
    expect(prerequisiteLabel({ kind: 'specialty', name: 'Dagues', level: 2 })).toBe('Dagues (Expert)')
    expect(prerequisiteLabel({ kind: 'title', name: 'Archimage' })).toBe('Titre : Archimage')
  })

  it('affiche le nom du catalogue pour une spécialité synonyme', () => {
    expect(prerequisiteLabel({ kind: 'specialty', name: 'Furtivité', level: 1 })).toBe("Discrétion dans l'ombre (Apprenti)")
    expect(prerequisiteLabel({ kind: 'specialty', name: 'Bouclier', level: 2 })).toBe('Boucliers (Expert)')
  })
})

describe('Forme animale', () => {
  // Une spécialité de Communion suppose au moins le rang 1 dans ce domaine
  const formeAnimale: ProgressState = {
    ...empty, domainRanks: { 'communion-naturelle-chamanisme': 1 }, specialties: [{ name: 'Forme animale', level: 1 }],
  }
  const names = (state: ProgressState) => unlockedAbilities(state).map((a) => a.name)

  it('la spécialité donne Forme d\'ours et Forme de félin', () => {
    expect(names(formeAnimale)).toEqual(expect.arrayContaining(["Forme d'ours", 'Forme de félin']))
  })

  it('Forme d\'ours reste ouverte par ses prérequis du PDF', () => {
    const pdf = { ...empty, domainRanks: { 'communion-naturelle-chamanisme': 1, 'resistance-physique': 1 } }
    expect(names(pdf)).toContain("Forme d'ours")
    expect(names(pdf)).not.toContain('Forme de félin')
  })
})
