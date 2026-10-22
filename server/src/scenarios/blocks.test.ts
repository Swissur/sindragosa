import { describe, expect, it } from 'vitest'
import { sanitizeBlocks, sanitizeBookmark, type ScenarioBlock } from './blocks.js'

describe('sanitizeBlocks', () => {
  it('garde les blocs connus et jette le reste', () => {
    const blocks = sanitizeBlocks([
      { id: 'a', type: 'texte', text: 'Il était une fois' },
      { id: 'b', type: 'image', imageId: 4, caption: 'La carte' },
      { id: 'c', type: 'objet', item: { name: 'Potion', quantity: 2, chance: 3, hack: true } },
      { id: 'd', type: 'pnj', entryId: 7 },
      { id: 'e', type: 'inconnu' },
      { id: 'f', type: 'image', imageId: 'x' },
      { id: 'pas un id!', type: 'texte', text: '' },
    ], [])
    expect(blocks).toEqual([
      { id: 'a', type: 'texte', text: 'Il était une fois' },
      { id: 'b', type: 'image', imageId: 4, caption: 'La carte' },
      { id: 'c', type: 'objet', item: { name: 'Potion', quantity: 2 }, givenTo: [] },
      { id: 'd', type: 'pnj', entryId: 7 },
    ])
  })

  it('ignore un id en double', () => {
    const blocks = sanitizeBlocks([
      { id: 'a', type: 'texte', text: '1' },
      { id: 'a', type: 'texte', text: '2' },
    ], [])
    expect(blocks).toHaveLength(1)
  })

  it('reprend givenTo et sharedAt de la base, jamais du client', () => {
    const previous: ScenarioBlock[] = [
      { id: 'b', type: 'image', imageId: 4, caption: '', sharedAt: '2026-10-22T10:00:00Z' },
      { id: 'c', type: 'objet', item: { name: 'Potion' }, givenTo: ['Bracco'] },
    ]
    const blocks = sanitizeBlocks([
      { id: 'b', type: 'image', imageId: 4, caption: 'Carte', sharedAt: 'faux' },
      { id: 'c', type: 'objet', item: { name: 'Potion' }, givenTo: ['Tout le monde'] },
      { id: 'n', type: 'objet', item: { name: 'Épée' }, givenTo: ['Triche'] },
    ], previous)
    expect(blocks[0]).toMatchObject({ caption: 'Carte', sharedAt: '2026-10-22T10:00:00Z' })
    expect(blocks[1]).toMatchObject({ givenTo: ['Bracco'] })
    expect(blocks[2]).toMatchObject({ givenTo: [] })
  })

  it("oublie le partage quand l'image du bloc change", () => {
    const previous: ScenarioBlock[] = [{ id: 'b', type: 'image', imageId: 4, caption: '', sharedAt: 'hier' }]
    const [block] = sanitizeBlocks([{ id: 'b', type: 'image', imageId: 5, caption: '' }], previous)
    expect(block).not.toHaveProperty('sharedAt')
  })

  it("n'accepte pas autre chose qu'un tableau", () => {
    expect(sanitizeBlocks('nope', [])).toEqual([])
  })
})

describe('sanitizeBookmark', () => {
  const blocks: ScenarioBlock[] = [{ id: 'a', type: 'texte', text: '' }]
  it('accepte le haut, un bloc existant, ou rien', () => {
    expect(sanitizeBookmark('', blocks)).toBe('')
    expect(sanitizeBookmark('a', blocks)).toBe('a')
    expect(sanitizeBookmark('zz', blocks)).toBeNull()
    expect(sanitizeBookmark(null, blocks)).toBeNull()
  })
})
