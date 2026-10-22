<script setup lang="ts">
import { computed } from 'vue'
import { User, MapPin, FileText } from 'lucide-vue-next'
import type { CodexType } from '../../../api/codex'
import { shortName } from '../../../utils/codexBoard'

/**
 * Une carte du tableau des fiches. Un personnage (ou autre) est une étiquette ;
 * un lieu est une zone, son nom en en-tête, où l'on pose des personnages.
 */
const props = defineProps<{
  node: { id: number; entryId: number; name: string; type: CodexType; color: string; x: number; y: number; w: number; h: number }
  selected: boolean
  target: boolean
  dragging: boolean
}>()

const isLieu = computed(() => props.node.type === 'lieu')
const icon = computed(() => (props.node.type === 'personnage' ? User : isLieu.value ? MapPin : FileText))
/** Environ 8 px par lettre : un lieu élargi montre son nom en entier. */
const label = computed(() => shortName(props.node.name, Math.max(8, Math.floor((props.node.w - 48) / 8))))
/** Le nom d'un lieu va en haut ; celui d'une étiquette, au milieu. */
const rowY = computed(() => (isLieu.value ? 22 : props.node.h / 2))
</script>

<template>
  <g
    class="node"
    :class="{ lieu: isLieu, selected, target, dragging, colored: !!node.color }"
    :style="node.color ? { '--node-color': node.color } : undefined"
    :data-node-id="node.id"
    :data-testid="`board-node-${node.entryId}`"
    :transform="`translate(${node.x - node.w / 2} ${node.y - node.h / 2})`"
  >
    <rect class="node-card" :width="node.w" :height="node.h" :rx="isLieu ? 16 : 12" />
    <component :is="icon" class="node-icon" :x="12" :y="rowY - 8" :size="16" />
    <text class="node-name" :x="36" :y="rowY">{{ label }}</text>
  </g>
</template>

<style scoped>
.node {
  cursor: pointer;
}

.node-card {
  fill: var(--surface);
  stroke: var(--border-strong);
  stroke-width: 1.5;
  transition: stroke 120ms;
}

/* Un lieu est une zone : fond plus léger, les cartes posées dessus ressortent. */
.node.lieu .node-card {
  fill: color-mix(in srgb, var(--surface) 55%, transparent);
  stroke-width: 2;
}

.node.colored .node-card {
  fill: color-mix(in srgb, var(--node-color) 22%, var(--surface));
  stroke: var(--node-color);
  stroke-width: 2;
}

.node.lieu.colored .node-card {
  fill: color-mix(in srgb, var(--node-color) 12%, var(--surface));
}

/* Après la couleur : la sélection reste lisible sur une carte colorée. */
.node.selected .node-card,
.node.target .node-card {
  stroke: var(--brand);
  stroke-width: 3;
}

.node.dragging {
  cursor: grabbing;
  opacity: 0.85;
}

.node-icon {
  color: var(--brand-strong);
}

.node.colored .node-icon {
  color: var(--node-color);
}

.node-name {
  fill: var(--text);
  font-size: 14px;
  font-weight: 700;
  dominant-baseline: central;
}
</style>
