import { describe, it, expect } from 'vitest'
import { ETAT_IDS, ETATS, ETAT_BY_ID, isEtatId, normalizeEtats, sortEtats, visibleEtats } from './etats'

describe('le catalogue', () => {
  it('a 17 ids uniques', () => {
    expect(ETAT_IDS).toHaveLength(17)
    expect(new Set(ETAT_IDS).size).toBe(17)
  })

  it('a exactement un état par id, dans le même ordre', () => {
    expect(ETATS.map((e) => e.id)).toEqual([...ETAT_IDS])
  })

  it('donne à chaque état un emoji et un effet non vides', () => {
    for (const e of ETATS) {
      expect(e.emoji, e.id).not.toBe('')
      expect(e.effect, e.id).not.toBe('')
      expect(e.label, e.id).not.toBe('')
    }
  })

  it('ne parle plus en d20', () => {
    for (const e of ETATS) expect(e.effect, e.id).not.toMatch(/d20|d12|DEF|-5/)
  })

  it('indexe tous les états dans ETAT_BY_ID', () => {
    expect(Object.keys(ETAT_BY_ID).sort()).toEqual([...ETAT_IDS].sort())
    for (const e of ETATS) expect(ETAT_BY_ID[e.id]).toBe(e)
  })
})

describe('isEtatId', () => {
  it('accepte un id du catalogue', () => {
    for (const id of ETAT_IDS) expect(isEtatId(id)).toBe(true)
  })

  it('rejette tout le reste, y compris les états d’Arran retirés', () => {
    for (const id of ['bloque', 'immobilise', 'repousse', 'diversion', 'menace', '', 3, null, undefined]) {
      expect(isEtatId(id)).toBe(false)
    }
  })
})

describe('normalizeEtats', () => {
  it('garde la durée d’un état', () => {
    expect(normalizeEtats([{ id: 'peur', turns: 2 }, { id: 'renverse' }])).toEqual([{ id: 'peur', turns: 2 }, { id: 'renverse' }])
  })

  it('lit un id seul comme un état sans durée', () => {
    expect(normalizeEtats(['renverse'])).toEqual([{ id: 'renverse' }])
  })

  it('jette les ids inconnus, les doublons et les durées absurdes', () => {
    expect(normalizeEtats([
      { id: 'bloque', turns: 1 }, 'nawak', { id: 'peur', turns: 0 }, { id: 'peur', turns: 3 }, { id: 'poison', turns: 1.5 },
    ])).toEqual([{ id: 'peur' }, { id: 'poison' }])
  })

  it('rend une liste vide pour ce qui n’est pas une liste', () => {
    expect(normalizeEtats(null)).toEqual([])
    expect(normalizeEtats('renverse')).toEqual([])
  })
})

describe('sortEtats', () => {
  it('remonte les bloquants en tête', () => {
    const out = sortEtats(['renverse', 'etourdi', 'desarme', 'sommeil'])
    expect(out.map((e) => e.id)).toEqual(['etourdi', 'sommeil', 'renverse', 'desarme'])
  })

  it("garde l'ordre du catalogue à l'intérieur de chaque groupe", () => {
    const out = sortEtats(['poison', 'surpris', 'aveugle', 'paralyse', 'peur'])
    expect(out.map((e) => e.id)).toEqual(['paralyse', 'surpris', 'peur', 'aveugle', 'poison'])
  })

  it('porte la durée restante', () => {
    expect(sortEtats([{ id: 'etourdi', turns: 2 }])[0]).toMatchObject({ id: 'etourdi', label: 'Étourdissement', turns: 2 })
    expect(sortEtats([{ id: 'maladie' }])[0].turns).toBeUndefined()
  })

  it('dédoublonne et ignore les ids inconnus', () => {
    expect(sortEtats(['renverse', 'renverse', 'enflamme']).map((e) => e.id)).toEqual(['renverse'])
    expect(sortEtats([])).toEqual([])
  })
})

describe('visibleEtats', () => {
  it("ne montre rien quand il n'y a aucun état", () => {
    expect(visibleEtats([])).toEqual({ etats: [], overflow: 0 })
  })

  it('ne compte aucun surplus quand il y a exactement max états', () => {
    const { etats, overflow } = visibleEtats(['renverse', 'desarme', 'ralenti'], 3)
    expect(etats).toHaveLength(3)
    expect(overflow).toBe(0)
  })

  it('coupe à 3 par défaut et compte le reste', () => {
    const { etats, overflow } = visibleEtats([...ETAT_IDS])
    expect(etats).toHaveLength(3)
    expect(overflow).toBe(14)
  })

  it('montre les premiers de sortEtats, donc les bloquants', () => {
    const ids = ['poison', 'renverse', 'etourdi', 'sommeil', 'paralyse']
    const { etats } = visibleEtats(ids, 3)
    expect(etats.map((e) => e.id)).toEqual(sortEtats(ids).slice(0, 3).map((e) => e.id))
    expect(etats.every((e) => e.blocking)).toBe(true)
  })
})
