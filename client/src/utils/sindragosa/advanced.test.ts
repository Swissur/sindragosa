import { describe, it, expect } from 'vitest'
import { ADVANCED_DOMAINS, DOMAINS } from '../../data/sindragosa/domains'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { advancedStats, bestAdvancedStat, homonymAbility, openingAbilities, unlockedAdvancedDomains } from './advanced'
import type { ProgressState } from './prerequisites'

const empty: ProgressState = { domainRanks: {}, advancedRanks: {}, specialties: [], titles: [] }
const ids = (list: { id: string }[]) => list.map((d) => d.id)

describe('caractéristiques liées', () => {
  it('celles des domaines de base exigés', () => {
    expect(advancedStats('ivresse-combat').sort()).toEqual(['end', 'str'])
    expect(advancedStats('pyromancie')).toEqual(['int'])
  })

  it('le jet prend la plus haute', () => {
    const stats = { str: 2, agi: 2, end: 4, int: 2, wis: 2, cha: 2 }
    expect(bestAdvancedStat(stats, 'ivresse-combat')).toBe('end')
  })
})

describe('ouverture', () => {
  it('par les prérequis', () => {
    expect(ids(unlockedAdvancedDomains(empty, []))).toEqual([])
    const state = { ...empty, domainRanks: { 'magie-profane-arcanes': 2 } }
    expect(ids(unlockedAdvancedDomains(state, []))).toEqual(['maitrise-arcanes', 'magie-givre-alteration', 'pyromancie'])
  })

  it('par la compétence du même nom', () => {
    const ivresse = ABILITIES.find((a) => a.id === 8)!
    expect(homonymAbility(ADVANCED_DOMAINS[0], ABILITIES)?.id).toBe(8)
    expect(ids(unlockedAdvancedDomains(empty, [ivresse]))).toEqual(['ivresse-combat'])
  })

  it('un domaine qui a une compétence homonyme ne s’ouvre que par elle', () => {
    // Nym : Combat de précision 3 + Acrobatie 3, mais pas Combat à deux armes (Expert).
    const nym = { ...empty, domainRanks: { 'combat-precision': 3, 'acrobatie-furtivite': 3 } }
    expect(ids(unlockedAdvancedDomains(nym, []))).not.toContain('danse-lames')
    const danse = ABILITIES.find((a) => a.name === 'Danse des lames')!
    expect(ids(unlockedAdvancedDomains(nym, [danse]))).toContain('danse-lames')
  })

  it('un artisanat avancé s’ouvre par l’une de ses deux compétences, pas par ses prérequis', () => {
    const forgeFeu = ADVANCED_DOMAINS.find((d) => d.id === 'forge-feu')!
    expect(openingAbilities(forgeFeu, ABILITIES).map((a) => a.id)).toEqual([402, 403])
    const maxed = { ...empty, domainRanks: { 'artisanat-lourd': 5 }, advancedRanks: { pyromancie: 5 } }
    expect(ids(unlockedAdvancedDomains(maxed, []))).not.toContain('forge-feu')
    const cuirasse = ABILITIES.find((a) => a.id === 403)!
    expect(ids(unlockedAdvancedDomains(empty, [cuirasse]))).toEqual(['forge-feu'])
  })

  it('un artisanat avancé se lance avec la carac de ses compétences', () => {
    // Forge-Feu : Artisanat lourd (Force) + Pyromancie (Intelligence).
    expect(advancedStats('forge-feu').sort()).toEqual(['int', 'str'])
  })

  it('un domaine déjà entamé reste ouvert', () => {
    expect(ids(unlockedAdvancedDomains({ ...empty, advancedRanks: { chronomancie: 1 } }, []))).toEqual(['chronomancie'])
  })
})

describe('les 22 domaines avancés et 20 artisanats avancés sont atteignables', () => {
  const domainIds = new Set(DOMAINS.map((d) => d.id))
  const advancedIds = new Set(ADVANCED_DOMAINS.map((d) => d.id))

  it('leurs prérequis existent et vont du rang 1 au rang 5', () => {
    for (const d of ADVANCED_DOMAINS) {
      expect(d.prerequisites.length, d.id).toBeGreaterThan(0)
      for (const p of d.prerequisites) {
        expect((p.kind === 'domain' ? domainIds : advancedIds).has(p.id), `${d.id} → ${p.id}`).toBe(true)
        expect(p.rank, d.id).toBeGreaterThanOrEqual(1)
        expect(p.rank, d.id).toBeLessThanOrEqual(5)
      }
    }
  })

  it('aucune boucle, et chacun a au moins une caractéristique pour son jet', () => {
    // Tous les domaines de base au rang 5 et toutes les compétences : le moteur doit tout ouvrir de proche en proche.
    const maxed: ProgressState = { ...empty, domainRanks: Object.fromEntries(DOMAINS.map((d) => [d.id, 5])) }
    const open = new Set<string>()
    for (let pass = 0; pass < ADVANCED_DOMAINS.length; pass++) {
      const state = { ...maxed, advancedRanks: Object.fromEntries([...open].map((id) => [id, 5])) }
      for (const d of unlockedAdvancedDomains(state, ABILITIES)) open.add(d.id)
    }
    expect(open.size).toBe(ADVANCED_DOMAINS.length)
    for (const d of ADVANCED_DOMAINS) expect(advancedStats(d.id).length, d.id).toBeGreaterThan(0)
  })

  it('aucun identifiant partagé avec un domaine de base (la feuille de jet les mélange)', () => {
    for (const id of advancedIds) expect(domainIds.has(id), id).toBe(false)
  })
})
