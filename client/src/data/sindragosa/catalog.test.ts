import { describe, it, expect } from 'vitest'
import { ABILITIES } from './abilities'
import { CRAFTS, RECIPES } from './crafts'
import { DOMAINS, ADVANCED_DOMAINS, STATS } from './domains'
import { RACES, RACE_ABILITY_ID, raceAbility } from './races'
import { specialtyMatches } from '../../utils/sindragosa/prerequisites'

describe('domaines', () => {
  it('5 domaines par caractéristique', () => {
    for (const s of STATS) expect(DOMAINS.filter((d) => d.stat === s.id)).toHaveLength(5)
  })

  it('identifiants uniques', () => {
    const ids = [...DOMAINS, ...ADVANCED_DOMAINS].map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})

describe('races', () => {
  it('6 races par faction, chacune liée à une carac existante', () => {
    expect(RACES.filter((r) => r.faction === 'alliance')).toHaveLength(6)
    expect(RACES.filter((r) => r.faction === 'horde')).toHaveLength(6)
    for (const r of RACES) expect(STATS.map((s) => s.id)).toContain(r.stat)
  })

  it('chaque pouvoir racial est limité à 1/repos court', () => {
    for (const r of RACES) expect(raceAbility(r).usesPer, r.id).toBe('repos-court')
  })

  it("le pouvoir racial ne prend l'id d'aucune compétence", () => {
    expect(ABILITIES.map((a) => a.id)).not.toContain(RACE_ABILITY_ID)
  })
})

describe('compétences', () => {
  it('numérotées de 1 à N sans trou ni doublon', () => {
    ABILITIES.forEach((a, i) => expect(a.id).toBe(i + 1))
  })

  it('chaque prérequis pointe vers un domaine ou un domaine avancé existant', () => {
    const domainIds = new Set(DOMAINS.map((d) => d.id))
    const advancedIds = new Set(ADVANCED_DOMAINS.map((d) => d.id))
    for (const a of ABILITIES) {
      expect(a.prerequisites.length, `#${a.id} ${a.name}`).toBeGreaterThan(0)
      for (const p of a.prerequisites) {
        if (p.kind === 'domain') expect(domainIds.has(p.id), `#${a.id} domaine ${p.id}`).toBe(true)
        else if (p.kind === 'advanced') expect(advancedIds.has(p.id), `#${a.id} avancé ${p.id}`).toBe(true)
        else if (p.kind === 'specialty') expect(p.level, `#${a.id}`).toBeGreaterThanOrEqual(1)
        else expect(p.kind, `#${a.id} prérequis inconnu`).toBe('title')
        if (p.kind === 'domain' || p.kind === 'advanced') {
          expect(p.rank, `#${a.id}`).toBeGreaterThanOrEqual(1)
          expect(p.rank, `#${a.id}`).toBeLessThanOrEqual(5)
        }
      }
    }
  })
})

describe('spécialités d’exemple (2026-10-18)', () => {
  const required = ABILITIES.flatMap((a) => a.prerequisites.flatMap((p) => (p.kind === 'specialty' ? [p.name] : [])))
  const examples = DOMAINS.flatMap((d) => d.specialties)

  it('chaque spécialité exigée par une compétence est atteignable en suivant un exemple', () => {
    for (const name of required) {
      expect(examples.some((e) => specialtyMatches(e, name)), name).toBe(true)
    }
  })

  it('dans un domaine que les compétences citent, chaque exemple mène à au moins une compétence', () => {
    const touched = DOMAINS.filter((d) => d.specialties.some((e) => required.some((r) => specialtyMatches(e, r))))
    for (const d of touched) {
      for (const e of d.specialties) expect(required.some((r) => specialtyMatches(e, r)), `${d.id} : ${e}`).toBe(true)
    }
  })
})

describe('artisanat', () => {
  it('4 métiers de base et 20 hybrides', () => {
    expect(CRAFTS.filter((c) => c.kind === 'base')).toHaveLength(4)
    expect(CRAFTS.filter((c) => c.kind === 'hybrid')).toHaveLength(20)
  })

  it('10 patrons par rang pour chaque métier de base, 5 par métier hybride', () => {
    for (const c of CRAFTS) {
      const mine = RECIPES.filter((r) => r.craft === c.id)
      if (c.kind === 'base') {
        for (let rank = 1; rank <= 5; rank++) expect(mine.filter((r) => r.rank === rank), `${c.id} rang ${rank}`).toHaveLength(10)
      } else {
        expect(mine, c.id).toHaveLength(5)
      }
    }
  })

  it('chaque patron a des composants et un effet', () => {
    for (const r of RECIPES) {
      expect(r.components.length, r.id).toBeGreaterThan(0)
      expect(r.effect.length, r.id).toBeGreaterThan(0)
    }
  })
})
