import { describe, it, expect } from 'vitest'
import { pinnedOf, togglePin, type Pin } from './pins'

const items = [{ id: 'a' }, { id: 'b' }, { id: 'c' }]
const pinOf = (x: { id: string }): Pin => `recipe:${x.id}`

describe('pinnedOf', () => {
  it('garde les éléments épinglés, dans l’ordre de la liste', () => {
    expect(pinnedOf(['recipe:c', 'recipe:a'], items, pinOf)).toEqual([{ id: 'a' }, { id: 'c' }])
  })

  it('ignore une épingle dont l’élément a disparu', () => {
    expect(pinnedOf(['recipe:z', 'recipe:b'], items, pinOf)).toEqual([{ id: 'b' }])
  })

  it('ne confond pas deux sortes d’épingles au même id', () => {
    expect(pinnedOf(['domain:a', 'specialty:b'], items, pinOf)).toEqual([])
  })
})

describe('togglePin', () => {
  it('épingle puis désépingle un patron', () => {
    const pinned = togglePin([], 'recipe:forge-r1-01')
    expect(pinned).toEqual(['recipe:forge-r1-01'])
    expect(togglePin(pinned, 'recipe:forge-r1-01')).toEqual([])
  })
})
