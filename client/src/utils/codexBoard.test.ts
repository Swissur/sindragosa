import { describe, expect, it } from 'vitest'
import {
  LIEU_H,
  LIEU_W,
  arrowHead,
  drawOrder,
  fitView,
  freeSpot,
  linkSegment,
  MAX_SCALE,
  MIN_SCALE,
  NODE_H,
  NODE_W,
  nodeAt,
  nodeSize,
  rectExit,
  resizeFrom,
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

describe('cartes de taille variable', () => {
  it('un lieu non redimensionné prend la taille des lieux', () => {
    expect(nodeSize({ type: 'lieu', w: null, h: null })).toEqual({ w: LIEU_W, h: LIEU_H })
    expect(nodeSize({ type: 'personnage', w: null, h: null })).toEqual({ w: NODE_W, h: NODE_H })
    expect(nodeSize({ type: 'lieu', w: 600, h: 400 })).toEqual({ w: 600, h: 400 })
  })

  it('les lieux passent derrière, le plus grand tout au fond', () => {
    const order = drawOrder([
      { id: 1, type: 'personnage', x: 0, y: 0 },
      { id: 2, type: 'lieu', x: 0, y: 0, w: 300, h: 200 },
      { id: 3, type: 'autre', x: 0, y: 0 },
      { id: 4, type: 'lieu', x: 0, y: 0, w: 800, h: 600 },
    ])
    expect(order.map((n) => n.id)).toEqual([4, 2, 1, 3])
  })

  it('un personnage posé dans un lieu se prend avant le lieu', () => {
    const nodes = drawOrder([
      { id: 1, type: 'personnage', x: 50, y: 30 },
      { id: 2, type: 'lieu', x: 0, y: 0, w: 400, h: 300 },
    ])
    expect(nodeAt(nodes, { x: 50, y: 30 })?.id).toBe(1)
    // Ailleurs dans le lieu : c'est le lieu.
    expect(nodeAt(nodes, { x: -150, y: -100 })?.id).toBe(2)
  })

  it("la flèche s'arrête au bord d'un grand lieu", () => {
    expect(rectExit({ x: 0, y: 0, w: 400, h: 300 }, { x: 1000, y: 0 }, 0)).toEqual({ x: 200, y: 0 })
  })

  it('agrandir garde le coin haut-gauche et une taille minimale', () => {
    expect(resizeFrom({ x: 0, y: 0 }, { x: 500, y: 300 })).toEqual({ x: 250, y: 150, w: 500, h: 300 })
    const tiny = resizeFrom({ x: 0, y: 0 }, { x: -50, y: 10 })
    expect(tiny.w).toBe(LIEU_W / 2)
    expect(tiny.h).toBe(LIEU_H / 2)
    expect(tiny.x).toBe(LIEU_W / 4)
  })
})
