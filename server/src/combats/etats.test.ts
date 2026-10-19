import { describe, it, expect } from 'vitest'
import { ETAT_IDS, isEtatId, parseEtats, tickEtats } from './etats.js'

/**
 * La liste du catalogue client (`client/src/data/etats.ts`), recopiée en dur.
 *
 * Un test du workspace serveur ne peut pas importer un fichier du workspace
 * client (tsconfig et build séparés). On duplique donc volontairement : le jour
 * où quelqu'un ajoute un état d'un seul côté, c'est ce test qui l'attrape.
 */
const IDS_CLIENT = [
  'etourdi', 'paralyse', 'sommeil', 'surpris', 'peur', 'charme', 'silence', 'enracine',
  'ralenti', 'renverse', 'aveugle', 'affaibli', 'desoriente', 'desarme',
  'saignement', 'poison', 'maladie',
]

describe('les ids côté serveur', () => {
  it('sont exactement ceux du catalogue client, dans le même ordre', () => {
    expect([...ETAT_IDS]).toEqual(IDS_CLIENT)
  })

  it('sont uniques', () => {
    expect(new Set(ETAT_IDS).size).toBe(ETAT_IDS.length)
  })
})

describe('isEtatId', () => {
  it('accepte chaque id de la liste', () => {
    for (const id of ETAT_IDS) expect(isEtatId(id)).toBe(true)
  })

  it("rejette ce qui n'est pas un id, y compris les états d'Arran retirés", () => {
    for (const v of ['bloque', 'menace', '', 0, null, undefined, ['renverse']]) expect(isEtatId(v)).toBe(false)
  })
})

describe('parseEtats', () => {
  it('accepte des états avec ou sans durée', () => {
    expect(parseEtats([{ id: 'peur', turns: 2 }, { id: 'maladie' }])).toEqual([{ id: 'peur', turns: 2 }, { id: 'maladie' }])
  })

  it('garde le dernier en cas de doublon', () => {
    expect(parseEtats([{ id: 'peur', turns: 2 }, { id: 'peur', turns: 5 }])).toEqual([{ id: 'peur', turns: 5 }])
  })

  it('jette les champs en trop', () => {
    expect(parseEtats([{ id: 'peur', turns: 1, hack: true }])).toEqual([{ id: 'peur', turns: 1 }])
  })

  it('refuse une liste avec un élément invalide', () => {
    expect(parseEtats(['renverse'])).toBeNull()
    expect(parseEtats([{ id: 'bloque' }])).toBeNull()
    expect(parseEtats([{ id: 'peur', turns: 0 }])).toBeNull()
    expect(parseEtats([{ id: 'peur', turns: 1.5 }])).toBeNull()
    expect(parseEtats([{ id: 'peur', turns: 100 }])).toBeNull()
    expect(parseEtats({ id: 'peur' })).toBeNull()
  })

  it('accepte une liste vide', () => {
    expect(parseEtats([])).toEqual([])
  })
})

describe('tickEtats', () => {
  it('baisse chaque durée d’un tour et efface ce qui tombe à 0', () => {
    expect(tickEtats([{ id: 'etourdi', turns: 1 }, { id: 'peur', turns: 3 }])).toEqual([{ id: 'peur', turns: 2 }])
  })

  it('laisse les états sans durée', () => {
    expect(tickEtats([{ id: 'maladie' }, { id: 'surpris', turns: 1 }])).toEqual([{ id: 'maladie' }])
  })
})
