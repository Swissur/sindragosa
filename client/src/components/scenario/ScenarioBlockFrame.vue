<script setup lang="ts">
import type { Component } from 'vue'
import { ArrowDown, ArrowUp, Flag, Trash2 } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'

/**
 * Cadre commun d'un bloc de scénario : son type, son action (montrer, donner,
 * révéler) et le drapeau « on en est là ». En mode réorganiser, les flèches et
 * la corbeille remplacent l'action.
 */
defineProps<{
  icon: Component
  label: string
  /** Le drapeau est posé juste après ce bloc. */
  flagged: boolean
  organizing: boolean
  first: boolean
  last: boolean
  testid: string
}>()

const emit = defineEmits<{
  (e: 'flag'): void
  (e: 'move', delta: -1 | 1): void
  (e: 'remove'): void
}>()
</script>

<template>
  <section class="block" :data-testid="testid">
    <header class="block-head">
      <component :is="icon" :size="15" class="block-icon" />
      <span class="block-label">{{ label }}</span>
      <template v-if="organizing">
        <AppIconBtn title="Monter" :disabled="first" :data-testid="`${testid}-up`" @click="emit('move', -1)">
          <ArrowUp :size="16" />
        </AppIconBtn>
        <AppIconBtn title="Descendre" :disabled="last" :data-testid="`${testid}-down`" @click="emit('move', 1)">
          <ArrowDown :size="16" />
        </AppIconBtn>
        <AppIconBtn variant="danger" title="Supprimer le bloc" :data-testid="`${testid}-remove`" @click="emit('remove')">
          <Trash2 :size="16" />
        </AppIconBtn>
      </template>
      <template v-else>
        <slot name="actions" />
        <AppIconBtn
          variant="bare"
          :class="{ 'flag-on': flagged }"
          :title="flagged ? 'On en est là' : 'On en est là (poser le drapeau après ce bloc)'"
          :data-testid="`${testid}-flag`"
          @click="emit('flag')"
        >
          <Flag :size="17" :fill="flagged ? 'currentColor' : 'none'" />
        </AppIconBtn>
      </template>
    </header>
    <div class="block-body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.block {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  overflow: hidden;
}

.block-head {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  background: var(--surface-2);
  border-bottom: 1px solid var(--border);
}

.block-icon {
  color: var(--muted);
  flex-shrink: 0;
}

.block-label {
  flex: 1;
  min-width: 0;
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.flag-on {
  color: var(--danger);
}

.block-body {
  padding: var(--space-md);
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}
</style>
