import { describe, it, expect } from 'vitest'
import { ABILITIES } from './abilities'
import { ABILITY_ATTACKS } from './abilityAttacks'
import { FORMS } from './forms'
import { CRAFTS, PDF_RECIPES, RECIPES } from './crafts'
import { DOMAINS, ADVANCED_DOMAINS, STATS, advancedDomainById, domainById } from './domains'
import { RACES, RACE_ABILITY_ID, raceAbility } from './races'
import { MAGIC_ADVANCED_DOMAINS, MAGIC_DOMAINS } from './magic'
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
  it('numérotées de 1 à N sans trou ni doublon (les compétences maison à partir de 1001)', () => {
    ABILITIES.filter((a) => a.id < 1000).forEach((a, i) => expect(a.id).toBe(i + 1))
    const ids = ABILITIES.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
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

describe('mana (plans/40)', () => {
  it('les domaines magiques existent', () => {
    for (const id of MAGIC_DOMAINS) expect(domainById(id), id).toBeDefined()
    for (const id of MAGIC_ADVANCED_DOMAINS) expect(advancedDomainById(id), id).toBeDefined()
  })

  it('seule une compétence active coûte de la mana, de 1 à 5', () => {
    for (const a of ABILITIES.filter((x) => x.manaCost != null)) {
      expect(a.actionType, a.name).not.toBe('passif')
      expect([1, 2, 3, 4, 5], a.name).toContain(a.manaCost)
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

  // L'app a retiré la potion d'apaisement mental mineure (alchimie rang 1) avec la Résistance Psychique.
  const REMOVED: Record<string, number> = { 'alchimie-1': 1 }

  it('PDF : 10 patrons par rang pour chaque métier de base, 5 par métier hybride', () => {
    for (const c of CRAFTS) {
      const mine = PDF_RECIPES.filter((r) => r.craft === c.id)
      if (c.kind === 'base') {
        for (let rank = 1; rank <= 5; rank++) expect(mine.filter((r) => r.rank === rank), `${c.id} rang ${rank}`).toHaveLength(10 - (REMOVED[`${c.id}-${rank}`] ?? 0))
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

describe('compétences d\'attaque', () => {
  it('chaque attaque désigne une compétence active du catalogue', () => {
    for (const id of Object.keys(ABILITY_ATTACKS).map(Number)) {
      const a = ABILITIES.find((x) => x.id === id)
      expect(a, `compétence ${id}`).toBeDefined()
      expect(a!.actionType).not.toBe('passif')
    }
  })

  it('un sort se lance avec un domaine qui existe', () => {
    for (const [id, attack] of Object.entries(ABILITY_ATTACKS)) {
      if ('domainId' in attack) expect(domainById(attack.domainId) ?? advancedDomainById(attack.domainId), `compétence ${id}`).toBeDefined()
    }
  })

  it('l\'arme d\'une forme attaque avec un domaine de base', () => {
    for (const f of FORMS) expect(domainById(f.domainId), f.id).toBeDefined()
  })
})
