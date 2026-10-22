/**
 * Géométrie du tableau des fiches (plans/44-tableau-des-fiches.md).
 *
 * Les fiches sont des cartes repérées par leur centre en coordonnées « monde ».
 * Sans taille précisée, une carte fait NODE_W × NODE_H ; un lieu est plus grand
 * et s'agrandit pour contenir des personnages. La vue passe du monde à l'écran :
 * écran = monde × scale + (x, y).
 */

export interface Point {
  x: number
  y: number
}

export interface View {
  x: number
  y: number
  scale: number
}

/** Une carte : son centre et, si elle n'a pas la taille standard, sa taille. */
export interface Box extends Point {
  w?: number | null
  h?: number | null
}

export const NODE_W = 150
export const NODE_H = 44
/** Taille d'un lieu tant qu'on ne l'a pas redimensionné. */
export const LIEU_W = 320
export const LIEU_H = 220
export const MIN_SCALE = 0.3
export const MAX_SCALE = 2.5

/** Écart entre la carte et le bout de la flèche, pour que la pointe se voie. */
const EDGE_GAP = 4

function widthOf(b: Box): number {
  return b.w ?? NODE_W
}

function heightOf(b: Box): number {
  return b.h ?? NODE_H
}

/** Taille réelle d'une fiche posée : la sienne, sinon celle de son type. */
export function nodeSize(node: { type: string; w: number | null; h: number | null }): { w: number; h: number } {
  const lieu = node.type === 'lieu'
  return { w: node.w ?? (lieu ? LIEU_W : NODE_W), h: node.h ?? (lieu ? LIEU_H : NODE_H) }
}

/**
 * Ordre de dessin : les lieux au fond (le plus grand tout derrière), puis le
 * reste. La dernière carte dessinée est celle qu'on touche : un personnage posé
 * dans un lieu se prend avant le lieu.
 */
export function drawOrder<T extends Box & { type: string }>(nodes: T[]): T[] {
  const area = (n: T) => widthOf(n) * heightOf(n)
  const lieux = nodes.filter((n) => n.type === 'lieu').sort((a, b) => area(b) - area(a))
  return [...lieux, ...nodes.filter((n) => n.type !== 'lieu')]
}

/**
 * Agrandit une carte en tirant son coin bas-droit : le coin haut-gauche reste
 * en place, la taille ne descend pas sous `min`.
 */
export function resizeFrom(
  topLeft: Point,
  corner: Point,
  min = { w: LIEU_W / 2, h: LIEU_H / 2 },
): { x: number; y: number; w: number; h: number } {
  const w = Math.round(Math.max(min.w, corner.x - topLeft.x))
  const h = Math.round(Math.max(min.h, corner.y - topLeft.y))
  return { x: Math.round(topLeft.x + w / 2), y: Math.round(topLeft.y + h / 2), w, h }
}

export function toWorld(view: View, screen: Point): Point {
  return { x: (screen.x - view.x) / view.scale, y: (screen.y - view.y) / view.scale }
}

function clampScale(scale: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, scale))
}

/** Zoome d'un facteur en gardant immobile le point d'écran visé (doigts, souris). */
export function zoomAt(view: View, factor: number, screen: Point): View {
  const scale = clampScale(view.scale * factor)
  const world = toWorld(view, screen)
  return { scale, x: screen.x - world.x * scale, y: screen.y - world.y * scale }
}

/** Cadre toutes les fiches dans l'écran, sans zoomer au-delà de 1. */
export function fitView(boxes: Box[], width: number, height: number, margin = 24): View {
  if (boxes.length === 0) return { x: width / 2, y: height / 2, scale: 1 }
  const minX = Math.min(...boxes.map((b) => b.x - widthOf(b) / 2))
  const maxX = Math.max(...boxes.map((b) => b.x + widthOf(b) / 2))
  const minY = Math.min(...boxes.map((b) => b.y - heightOf(b) / 2))
  const maxY = Math.max(...boxes.map((b) => b.y + heightOf(b) / 2))
  const scale = clampScale(Math.min(
    1,
    (width - margin * 2) / (maxX - minX),
    (height - margin * 2) / (maxY - minY),
  ))
  return {
    scale,
    x: width / 2 - ((minX + maxX) / 2) * scale,
    y: height / 2 - ((minY + maxY) / 2) * scale,
  }
}

/** La fiche sous ce point du monde — la plus haute (dernière dessinée) si elles se chevauchent. */
export function nodeAt<T extends Box>(nodes: T[], point: Point): T | undefined {
  for (let i = nodes.length - 1; i >= 0; i--) {
    const n = nodes[i]
    if (Math.abs(point.x - n.x) <= widthOf(n) / 2 && Math.abs(point.y - n.y) <= heightOf(n) / 2) return n
  }
  return undefined
}

/** Où la droite partant du centre d'une carte vers `toward` sort de la carte. */
export function rectExit(box: Box, toward: Point, gap = EDGE_GAP): Point {
  const dx = toward.x - box.x
  const dy = toward.y - box.y
  if (dx === 0 && dy === 0) return { x: box.x, y: box.y }
  const halfW = widthOf(box) / 2 + gap
  const halfH = heightOf(box) / 2 + gap
  const t = Math.min(dx === 0 ? Infinity : halfW / Math.abs(dx), dy === 0 ? Infinity : halfH / Math.abs(dy))
  return { x: box.x + dx * t, y: box.y + dy * t }
}

/** Le segment visible d'une flèche entre deux cartes, coupé à leurs bords. */
export function linkSegment(from: Box, to: Box): { start: Point; end: Point } {
  return { start: rectExit(from, to), end: rectExit(to, from) }
}

/** Les trois sommets de la pointe posée en `tip`, venant de `from` (attribut `points` d'un polygon). */
export function arrowHead(tip: Point, from: Point, size = 11): string {
  const angle = Math.atan2(tip.y - from.y, tip.x - from.x)
  const spread = Math.PI / 7
  const left = { x: tip.x - size * Math.cos(angle - spread), y: tip.y - size * Math.sin(angle - spread) }
  const right = { x: tip.x - size * Math.cos(angle + spread), y: tip.y - size * Math.sin(angle + spread) }
  const fmt = (p: Point) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`
  return `${fmt(tip)} ${fmt(left)} ${fmt(right)}`
}

export function midpoint(a: Point, b: Point): Point {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }
}

function overlaps(nodes: Point[], p: Point): boolean {
  return nodes.some((n) => Math.abs(n.x - p.x) < NODE_W + 12 && Math.abs(n.y - p.y) < NODE_H + 12)
}

/** Une place libre pour une nouvelle fiche, au plus près de `around` (le centre de l'écran). */
export function freeSpot(nodes: Point[], around: Point): Point {
  const stepX = NODE_W + 24
  const stepY = NODE_H + 24
  for (let ring = 0; ring < 20; ring++) {
    for (let dy = -ring; dy <= ring; dy++) {
      for (let dx = -ring; dx <= ring; dx++) {
        if (Math.max(Math.abs(dx), Math.abs(dy)) !== ring) continue
        const p = { x: around.x + dx * stepX, y: around.y + dy * stepY }
        if (!overlaps(nodes, p)) return p
      }
    }
  }
  return { ...around }
}

/** Coupe un nom trop long pour la carte. */
export function shortName(name: string, max = 17): string {
  return name.length > max ? `${name.slice(0, max - 1).trimEnd()}…` : name
}
