import { describe, expect, it } from 'vitest'
import type { Scenario, ScenarioBlock } from '../api/scenarios'
import { mergeServerFields, moveBlock, removeBlock } from './scenario'

const text = (id: string): ScenarioBlock => ({ id, type: 'texte', text: id })
const ids = (blocks: ScenarioBlock[]) => blocks.map((b) => b.id)

describe('moveBlock', () => {
  const blocks = [text('a'), text('b'), text('c')]

  it('monte et descend un bloc', () => {
    expect(ids(moveBlock(blocks, 'b', -1))).toEqual(['b', 'a', 'c'])
    expect(ids(moveBlock(blocks, 'b', 1))).toEqual(['a', 'c', 'b'])
  })

  it('ne sort pas de la liste', () => {
    expect(moveBlock(blocks, 'a', -1)).toBe(blocks)
    expect(moveBlock(blocks, 'c', 1)).toBe(blocks)
    expect(moveBlock(blocks, 'zz', 1)).toBe(blocks)
  })
})

describe('removeBlock', () => {
  const blocks = [text('a'), text('b'), text('c')]

  it('garde le drapeau posé ailleurs', () => {
    expect(removeBlock(blocks, 'c', 'b')).toEqual({ blocks: [text('a'), text('c')], bookmark: 'c' })
  })

  it('recule le drapeau posé après le bloc retiré', () => {
    expect(removeBlock(blocks, 'b', 'b').bookmark).toBe('a')
    expect(removeBlock(blocks, 'a', 'a').bookmark).toBe('')
  })
})

describe('mergeServerFields', () => {
  it('prend « donné à » et « montrée » du serveur, le reste du MJ', () => {
    const local: ScenarioBlock[] = [
      { id: 'o', type: 'objet', item: { name: 'Potion de soin' }, givenTo: [] },
      { id: 'i', type: 'image', imageId: 3, caption: 'Carte annotée' },
      text('t'),
    ]
    const server = {
      blocks: [
        { id: 'o', type: 'objet', item: { name: 'Potion' }, givenTo: ['Nym'] },
        { id: 'i', type: 'image', imageId: 3, caption: 'Carte', sharedAt: '2026-10-22' },
      ],
    } as Scenario
    expect(mergeServerFields(local, server)).toEqual([
      { id: 'o', type: 'objet', item: { name: 'Potion de soin' }, givenTo: ['Nym'] },
      { id: 'i', type: 'image', imageId: 3, caption: 'Carte annotée', sharedAt: '2026-10-22' },
      text('t'),
    ])
  })
})
