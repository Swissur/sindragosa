<script setup lang="ts">
import type { Component } from 'vue'
import { Pin, PinOff } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'

/** Une tuile de « Mes actions » : un tap lance (ou ouvre), l'épingle la garde en favori. */
defineProps<{
  icon: Component
  label: string
  /** Ligne discrète : la réserve, les dégâts, la limite d'usage… */
  detail?: string
  /** Absent = la tuile ne s'épingle pas. */
  pinned?: boolean
  testid?: string
}>()

const emit = defineEmits<{ (e: 'activate'): void; (e: 'toggle-pin'): void }>()
</script>

<template>
  <div class="tile">
    <button type="button" class="tile-main" :data-testid="testid" @click="emit('activate')">
      <component :is="icon" :size="18" class="tile-icon" />
      <span class="tile-text">
        <span class="tile-label">{{ label }}</span>
        <span v-if="detail" class="tile-detail">{{ detail }}</span>
      </span>
    </button>
    <AppIconBtn
      v-if="pinned !== undefined"
      :title="pinned ? 'Désépingler' : 'Épingler'"
      :data-testid="testid && `${testid}-pin`"
      @click="emit('toggle-pin')"
    >
      <PinOff v-if="pinned" :size="15" />
      <Pin v-else :size="15" />
    </AppIconBtn>
  </div>
</template>

<style scoped>
.tile {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-lg);
  background: var(--surface);
}

.tile-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: 0 var(--space-xs);
  border: none;
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.tile-icon {
  flex-shrink: 0;
  color: var(--accent);
}

.tile-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.tile-label {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tile-detail {
  font-size: 0.78rem;
  color: var(--muted);
}
</style>
