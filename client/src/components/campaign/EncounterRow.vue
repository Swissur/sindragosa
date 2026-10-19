<script setup lang="ts">
import { Play, Square, Pencil, Trash2 } from 'lucide-vue-next'
import type { EncounterSummary } from '../../api/campaigns'
import AppIconBtn from '../ui/AppIconBtn.vue'

// Une rencontre du volet combat : ▶ (ou ■ si elle tourne), crayon, poubelle.
defineProps<{
  encounter: EncounterSummary
  running: boolean
  /** Un autre combat tourne : on ne peut pas en lancer un second. */
  locked: boolean
}>()
const emit = defineEmits<{ (e: 'play' | 'stop' | 'edit' | 'delete'): void }>()
</script>

<template>
  <li class="encounter" :data-testid="`encounter-${encounter.id}`">
    <div class="encounter-info">
      <span class="encounter-name">{{ encounter.name }}</span>
      <span class="encounter-meta">{{ encounter.monsterCount }} ennemi{{ encounter.monsterCount > 1 ? 's' : '' }}</span>
    </div>
    <AppIconBtn
      v-if="running"
      variant="danger"
      title="Arrêter le combat"
      data-testid="encounter-stop"
      @click="emit('stop')"
    >
      <Square :size="16" />
    </AppIconBtn>
    <AppIconBtn
      v-else
      variant="primary"
      title="Démarrer le combat"
      :disabled="locked"
      data-testid="encounter-play"
      @click="emit('play')"
    >
      <Play :size="16" />
    </AppIconBtn>
    <AppIconBtn title="Éditer" @click="emit('edit')">
      <Pencil :size="16" />
    </AppIconBtn>
    <AppIconBtn variant="danger" title="Effacer" @click="emit('delete')">
      <Trash2 :size="16" />
    </AppIconBtn>
  </li>
</template>

<style scoped>
.encounter {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.encounter-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.encounter-name {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.encounter-meta {
  font-size: 0.78rem;
  color: var(--muted);
}
</style>
