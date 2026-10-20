import { describe, expect, it } from 'vitest'
import {
  arrowHead,
  fitView,
  freeSpot,
  linkSegment,
  MAX_SCALE,
  MIN_SCALE,
  NODE_H,
  NODE_W,
  nodeAt,
  rectExit,
  shortName,
  toWorld,
  zoomAt,
} from './codexBoard'

describe('toWorld / zoomAt', () => {
  it('ramène un point d\'écran dans le monde', () => {
    expect(toWorld({ x: 100, y: 50, scale: 2 }, { x: 300, y: 250 })).toEqual({ x: 100, y: 100 })
  })

  it('garde immobile le point visé', () => {
    const view = { x: 40, y: -20, scale: 1 }
    const screen = { x: 200, y: 150 }
    const before = toWorld(view, screen)
    const after = toWorld(zoomAt(view, 1.5, screen), screen)
    expect(after.x).toBeCloseTo(before.x)
    expect(after.y).toBeCloseTo(before.y)
  })

  it('borne le zoom', () => {
    expect(zoomAt({ x: 0, y: 0, scale: 1 }, 100, { x: 0, y: 0 }).scale).toBe(MAX_SCALE)
    expect(zoomAt({ x: 0, y: 0, scale: 1 }, 0.001, { x: 0, y: 0 }).scale).toBe(MIN_SCALE)
  })
})

describe('fitView', () => {
  it('centre le monde vide sur l\'écran', () => {
    expect(fitView([], 400, 300)).toEqual({ x: 200, y: 150, scale: 1 })
  })

  it('ne zoome pas au-delà de 1 pour une seule fiche', () => {
    const view = fitView([{ x: 500, y: 500 }], 400, 300)
    expect(view.scale).toBe(1)
    expect(toWorld(view, { x: 200, y: 150 })).toEqual({ x: 500, y: 500 })
  })

  it('dézoome pour tout faire tenir', () => {
    const view = fitView([{ x: 0, y: 0 }, { x: 1000, y: 0 }], 400, 300)
    expect(view.scale).toBeLessThan(1)
    const left = (0 - NODE_W / 2) * view.scale + view.x
    const right = (1000 + NODE_W / 2) * view.scale + view.x
    expect(left).toBeGreaterThanOrEqual(0)
    expect(right).toBeLessThanOrEqual(400)
  })
})

describe('nodeAt', () => {
  const nodes = [{ id: 1, x: 0, y: 0 }, { id: 2, x: 20, y: 0 }]

  it('trouve la fiche la plus haute sous le point', () => {
    expect(nodeAt(nodes, { x: 10, y: 5 })?.id).toBe(2)
    expect(nodeAt(nodes, { x: -NODE_W / 2 + 1, y: 0 })?.id).toBe(1)
  })

  it('rien à côté', () => {
    expect(nodeAt(nodes, { x: 0, y: NODE_H })).toBeUndefined()
  })
})

describe('rectExit / linkSegment', () => {
  it('sort par le côté droit à l\'horizontale', () => {
    expect(rectExit({ x: 0, y: 0 }, { x: 500, y: 0 }, 0)).toEqual({ x: NODE_W / 2, y: 0 })
  })

  it('sort par le bas à la verticale', () => {
    expect(rectExit({ x: 0, y: 0 }, { x: 0, y: -500 }, 0)).toEqual({ x: 0, y: -NODE_H / 2 })
  })

  it('reste sur le bord en diagonale', () => {
    const p = rectExit({ x: 0, y: 0 }, { x: 300, y: 300 }, 0)
    // Carte plus large que haute : on sort par le bas.
    expect(p.y).toBeCloseTo(NODE_H / 2)
    expect(p.x).toBeCloseTo(NODE_H / 2)
  })

  it('coupe la flèche aux deux bords', () => {
    const { start, end } = linkSegment({ x: 0, y: 0 }, { x: 400, y: 0 })
    expect(start.x).toBeGreaterThan(NODE_W / 2)
    expect(end.x).toBeLessThan(400 - NODE_W / 2)
  })
})

describe('arrowHead', () => {
  it('pose la pointe au bout, les ailes en arrière', () => {
    const [tip, left, right] = arrowHead({ x: 100, y: 0 }, { x: 0, y: 0 }).split(' ').map((s) => s.split(',').map(Number))
    expect(tip).toEqual([100, 0])
    expect(left[0]).toBeLessThan(100)
    expect(right[0]).toBeLessThan(100)
    expect(left[1]).toBeCloseTo(-right[1])
  })
})

describe('freeSpot', () => {
  it('prend la place demandée si elle est libre', () => {
    expect(freeSpot([], { x: 10, y: 20 })).toEqual({ x: 10, y: 20 })
  })

  it('se décale si une fiche est déjà là', () => {
    const spot = freeSpot([{ x: 0, y: 0 }], { x: 0, y: 0 })
    expect(spot).not.toEqual({ x: 0, y: 0 })
    expect(Math.abs(spot.x) >= NODE_W || Math.abs(spot.y) >= NODE_H).toBe(true)
  })
})

describe('shortName', () => {
  it('laisse un nom court tel quel', () => {
    expect(shortName('Arthas')).toBe('Arthas')
  })

  it('coupe un nom long avec une ellipse', () => {
    const s = shortName('Varian Wrynn, roi de Hurlevent')
    expect(s.endsWith('…')).toBe(true)
    expect(s.length).toBeLessThanOrEqual(17)
  })
})
