<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { MoveRight, MoveDiagonal2 } from 'lucide-vue-next'
import type { BoardLink, BoardNode } from '../../../api/codexBoard'
import CodexBoardNode from './CodexBoardNode.vue'
import {
  arrowHead,
  drawOrder,
  fitView,
  linkSegment,
  midpoint,
  nodeAt,
  nodeSize,
  resizeFrom,
  toWorld,
  zoomAt,
  type Point,
  type View,
} from '../../../utils/codexBoard'

export type BoardSelection = { kind: 'node'; id: number } | { kind: 'link'; id: number } | null

const props = defineProps<{
  nodes: BoardNode[]
  links: BoardLink[]
  selection: BoardSelection
}>()

const emit = defineEmits<{
  (e: 'select', selection: BoardSelection): void
  (e: 'move', nodeId: number, x: number, y: number): void
  (e: 'resize', nodeId: number, x: number, y: number, w: number, h: number): void
  (e: 'connect', fromNodeId: number, toNodeId: number): void
}>()

const svgEl = ref<SVGSVGElement | null>(null)
const view = ref<View>({ x: 0, y: 0, scale: 1 })
const size = ref({ w: 0, h: 0 })

/** Un doigt (ou la souris) bouge plus que ça : ce n'est plus un simple toucher. */
const TAP_SLOP = 5

// ── Positions affichées (une fiche qu'on traîne ou agrandit suit le doigt) ───

const drag = ref<{ id: number; x: number; y: number; w?: number; h?: number } | null>(null)
const linking = ref<{ fromId: number; to: Point } | null>(null)

/** Les cartes avec leur taille réelle, dans l'ordre de dessin (lieux au fond). */
const positioned = computed(() =>
  drawOrder(props.nodes.map((n) => ({
    ...n,
    ...nodeSize(n),
    ...(drag.value?.id === n.id ? drag.value : {}),
  }))),
)
const byId = computed(() => new Map(positioned.value.map((n) => [n.id, n])))
// Les lieux passent sous les flèches, les autres fiches par-dessus.
const lieux = computed(() => positioned.value.filter((n) => n.type === 'lieu'))
const cards = computed(() => positioned.value.filter((n) => n.type !== 'lieu'))

const drawnLinks = computed(() =>
  props.links.flatMap((link) => {
    const from = byId.value.get(link.fromNodeId)
    const to = byId.value.get(link.toNodeId)
    if (!from || !to) return []
    const { start, end } = linkSegment(from, to)
    return [{
      link,
      start,
      end,
      mid: midpoint(start, end),
      headEnd: arrowHead(end, start),
      headStart: link.direction === 'both' ? arrowHead(start, end) : null,
    }]
  }),
)

const selectedNode = computed(() =>
  props.selection?.kind === 'node' ? byId.value.get(props.selection.id) ?? null : null,
)
const selectedLieu = computed(() => (selectedNode.value?.type === 'lieu' ? selectedNode.value : null))

const linkTargetId = computed(() => {
  const l = linking.value
  if (!l) return null
  const target = nodeAt(positioned.value, l.to)
  return target && target.id !== l.fromId ? target.id : null
})

const linkPreview = computed(() => {
  const l = linking.value
  const from = l ? byId.value.get(l.fromId) : null
  if (!l || !from) return null
  const target = linkTargetId.value != null ? byId.value.get(linkTargetId.value) : null
  return target ? linkSegment(from, target) : { start: from, end: l.to }
})

/** La poignée reste à taille de doigt même dézoomé. */
const handleRadius = computed(() => 15 / Math.min(1, view.value.scale))

// ── Gestes ───────────────────────────────────────────────────────────────────

type Gesture =
  | { kind: 'pan'; start: Point; origin: View; moved: boolean }
  | { kind: 'node'; id: number; start: Point; grab: Point; moved: boolean }
  | { kind: 'resize'; id: number; topLeft: Point }
  | { kind: 'link-draw'; fromId: number }
  | { kind: 'link-tap'; id: number; start: Point; moved: boolean }
  | { kind: 'pinch'; dist: number; mid: Point; origin: View }

let gesture: Gesture | null = null
const pointers = new Map<number, Point>()

function screenPoint(e: PointerEvent | WheelEvent): Point {
  const rect = svgEl.value!.getBoundingClientRect()
  return { x: e.clientX - rect.left, y: e.clientY - rect.top }
}

function distance(a: Point, b: Point): number {
  return Math.hypot(a.x - b.x, a.y - b.y)
}

function pinchFrom(): Gesture {
  const [a, b] = [...pointers.values()]
  return { kind: 'pinch', dist: Math.max(1, distance(a, b)), mid: midpoint(a, b), origin: { ...view.value } }
}

function onPointerDown(e: PointerEvent) {
  const p = screenPoint(e)
  pointers.set(e.pointerId, p)
  svgEl.value?.setPointerCapture(e.pointerId)

  // Deux doigts : on zoome, et on lâche ce que le premier faisait.
  if (pointers.size === 2) {
    drag.value = null
    linking.value = null
    gesture = pinchFrom()
    return
  }
  if (pointers.size > 2) return

  const target = (e.target as Element).closest('[data-node-id], [data-link-id], [data-handle], [data-resize]')
  const world = toWorld(view.value, p)
  const lieu = selectedLieu.value
  if (target?.hasAttribute('data-resize') && lieu) {
    gesture = { kind: 'resize', id: lieu.id, topLeft: { x: lieu.x - lieu.w / 2, y: lieu.y - lieu.h / 2 } }
  } else if (target?.hasAttribute('data-handle') && selectedNode.value) {
    gesture = { kind: 'link-draw', fromId: selectedNode.value.id }
    linking.value = { fromId: selectedNode.value.id, to: world }
  } else if (target?.hasAttribute('data-node-id')) {
    const node = byId.value.get(Number(target.getAttribute('data-node-id')))
    if (!node) return
    gesture = { kind: 'node', id: node.id, start: p, grab: { x: node.x - world.x, y: node.y - world.y }, moved: false }
  } else if (target?.hasAttribute('data-link-id')) {
    gesture = { kind: 'link-tap', id: Number(target.getAttribute('data-link-id')), start: p, moved: false }
  } else {
    gesture = { kind: 'pan', start: p, origin: { ...view.value }, moved: false }
  }
}

function onPointerMove(e: PointerEvent) {
  if (!pointers.has(e.pointerId) || !gesture) return
  const p = screenPoint(e)
  pointers.set(e.pointerId, p)

  switch (gesture.kind) {
    case 'pinch': {
      if (pointers.size < 2) return
      const [a, b] = [...pointers.values()]
      const mid = midpoint(a, b)
      const panned = { ...gesture.origin, x: gesture.origin.x + mid.x - gesture.mid.x, y: gesture.origin.y + mid.y - gesture.mid.y }
      view.value = zoomAt(panned, distance(a, b) / gesture.dist, mid)
      return
    }
    case 'pan':
      if (!gesture.moved && distance(p, gesture.start) < TAP_SLOP) return
      gesture.moved = true
      view.value = { ...gesture.origin, x: gesture.origin.x + p.x - gesture.start.x, y: gesture.origin.y + p.y - gesture.start.y }
      return
    case 'node': {
      if (!gesture.moved && distance(p, gesture.start) < TAP_SLOP) return
      gesture.moved = true
      const world = toWorld(view.value, p)
      drag.value = { id: gesture.id, x: world.x + gesture.grab.x, y: world.y + gesture.grab.y }
      return
    }
    case 'resize':
      drag.value = { id: gesture.id, ...resizeFrom(gesture.topLeft, toWorld(view.value, p)) }
      return
    case 'link-draw':
      linking.value = { fromId: gesture.fromId, to: toWorld(view.value, p) }
      return
    case 'link-tap':
      if (distance(p, gesture.start) >= TAP_SLOP) gesture.moved = true
  }
}

function onPointerUp(e: PointerEvent) {
  if (!pointers.delete(e.pointerId)) return
  const g = gesture
  // Fin d'un pincement : on attend que tous les doigts soient levés.
  if (!g || g.kind === 'pinch') {
    if (pointers.size === 0) gesture = null
    return
  }
  gesture = null

  switch (g.kind) {
    case 'pan':
      if (!g.moved) emit('select', null)
      return
    case 'node':
      if (g.moved && drag.value) emit('move', g.id, Math.round(drag.value.x), Math.round(drag.value.y))
      else emit('select', { kind: 'node', id: g.id })
      drag.value = null
      return
    case 'resize': {
      const d = drag.value
      if (d?.w && d.h) emit('resize', g.id, d.x, d.y, d.w, d.h)
      drag.value = null
      return
    }
    case 'link-draw': {
      const target = linkTargetId.value
      linking.value = null
      if (target != null) emit('connect', g.fromId, target)
      return
    }
    case 'link-tap':
      if (!g.moved) emit('select', { kind: 'link', id: g.id })
  }
}

function onPointerCancel(e: PointerEvent) {
  pointers.delete(e.pointerId)
  if (pointers.size > 0) return
  gesture = null
  drag.value = null
  linking.value = null
}

function onWheel(e: WheelEvent) {
  view.value = zoomAt(view.value, Math.exp(-e.deltaY * 0.0015), screenPoint(e))
}

// ── Cadrage ──────────────────────────────────────────────────────────────────

function fit() {
  view.value = fitView(positioned.value, size.value.w, size.value.h)
}

/** Le point du tableau au centre de l'écran : là où se pose une nouvelle fiche. */
function center(): Point {
  return toWorld(view.value, { x: size.value.w / 2, y: size.value.h / 2 })
}

defineExpose({ fit, center })

let fitted = false
let observer: ResizeObserver | null = null

onMounted(() => {
  observer = new ResizeObserver(([entry]) => {
    const { width, height } = entry.contentRect
    size.value = { w: width, h: height }
    // Premier affichage : on cadre ce qui est posé.
    if (!fitted && width > 0) {
      fitted = true
      fit()
    }
  })
  if (svgEl.value) observer.observe(svgEl.value)
})

onBeforeUnmount(() => observer?.disconnect())

// Le tableau arrive après le premier cadrage (chargement) : on recadre une fois.
watch(() => props.nodes.length > 0, (has, had) => {
  if (has && !had && size.value.w > 0) fit()
})
</script>

<template>
  <svg
    ref="svgEl"
    class="board-canvas"
    data-testid="codex-board-canvas"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
    @pointercancel="onPointerCancel"
    @wheel.prevent="onWheel"
  >
    <g :transform="`translate(${view.x} ${view.y}) scale(${view.scale})`">
      <!-- Lieux : des zones, derrière les flèches et les fiches qu'ils contiennent -->
      <CodexBoardNode
        v-for="node in lieux"
        :key="node.id"
        :node="node"
        :selected="selection?.kind === 'node' && selection.id === node.id"
        :target="linkTargetId === node.id"
        :dragging="drag?.id === node.id"
      />

      <!-- Flèches -->
      <g
        v-for="d in drawnLinks"
        :key="d.link.id"
        class="link"
        :class="{ selected: selection?.kind === 'link' && selection.id === d.link.id }"
        :data-link-id="d.link.id"
        :data-testid="`board-link-${d.link.id}`"
      >
        <line class="link-hit" :x1="d.start.x" :y1="d.start.y" :x2="d.end.x" :y2="d.end.y" />
        <line
          class="link-line"
          :class="{ dashed: d.link.dashed }"
          :x1="d.start.x"
          :y1="d.start.y"
          :x2="d.end.x"
          :y2="d.end.y"
        />
        <polygon class="link-head" :points="d.headEnd" />
        <polygon v-if="d.headStart" class="link-head" :points="d.headStart" />
        <text v-if="d.link.label" class="link-label" :x="d.mid.x" :y="d.mid.y">{{ d.link.label }}</text>
      </g>

      <!-- Flèche en train d'être tirée -->
      <line
        v-if="linkPreview"
        class="link-preview"
        :x1="linkPreview.start.x"
        :y1="linkPreview.start.y"
        :x2="linkPreview.end.x"
        :y2="linkPreview.end.y"
      />

      <!-- Fiches (les lieux sont dessinés plus haut, sous les flèches) -->
      <CodexBoardNode
        v-for="node in cards"
        :key="node.id"
        :node="node"
        :selected="selection?.kind === 'node' && selection.id === node.id"
        :target="linkTargetId === node.id"
        :dragging="drag?.id === node.id"
      />

      <!-- Poignée de la fiche sélectionnée : la tirer vers une autre fiche crée une flèche -->
      <g
        v-if="selectedNode && !drag"
        class="handle"
        data-handle
        data-testid="board-link-handle"
        :transform="`translate(${selectedNode.x + selectedNode.w / 2 + handleRadius + 6} ${selectedNode.y})`"
      >
        <circle :r="handleRadius" />
        <MoveRight
          class="handle-icon"
          :x="-handleRadius * 0.6"
          :y="-handleRadius * 0.6"
          :size="handleRadius * 1.2"
        />
      </g>

      <!-- Coin du lieu sélectionné : le tirer l'agrandit -->
      <g
        v-if="selectedLieu && (!drag || drag.w)"
        class="handle resize"
        data-resize
        data-testid="board-resize-handle"
        :transform="`translate(${selectedLieu.x + selectedLieu.w / 2} ${selectedLieu.y + selectedLieu.h / 2})`"
      >
        <circle :r="handleRadius" />
        <MoveDiagonal2
          class="handle-icon"
          :x="-handleRadius * 0.6"
          :y="-handleRadius * 0.6"
          :size="handleRadius * 1.2"
        />
      </g>
    </g>
  </svg>
</template>

<style scoped>
.board-canvas {
  display: block;
  width: 100%;
  height: 100%;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  cursor: grab;
}

/* ── Flèches ── */

.link {
  cursor: pointer;
}

.link-hit {
  stroke: transparent;
  stroke-width: 22;
}

.link-line {
  stroke: var(--muted);
  stroke-width: 2.2;
  stroke-linecap: round;
}

.link-line.dashed {
  stroke-dasharray: 7 6;
}

.link-head {
  fill: var(--muted);
}

.link.selected .link-line {
  stroke: var(--brand);
  stroke-width: 3;
}

.link.selected .link-head {
  fill: var(--brand);
}

.link-label {
  fill: var(--text);
  font-size: 12.5px;
  font-weight: 600;
  font-style: italic;
  text-anchor: middle;
  dominant-baseline: central;
  /* Halo de la couleur du fond : le libellé reste lisible par-dessus le trait. */
  paint-order: stroke;
  stroke: var(--bg);
  stroke-width: 5px;
  stroke-linejoin: round;
}

.link-preview {
  stroke: var(--brand);
  stroke-width: 2.5;
  stroke-dasharray: 4 5;
  pointer-events: none;
}

/* ── Poignée ── */

.handle {
  cursor: crosshair;
}

.handle.resize {
  cursor: nwse-resize;
}

.handle circle {
  fill: var(--brand);
}

.handle-icon {
  color: var(--on-brand);
  pointer-events: none;
}
</style>
