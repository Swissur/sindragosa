<script setup lang="ts">
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import { STATS } from '../../data/sindragosa/domains'
import type { Character } from '../../types/character'

/**
 * Les 6 caractéristiques. Elles montent à la discrétion du MJ : modifiables
 * (+/−) en mode édition, sinon en lecture.
 */
defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()
</script>

<template>
  <AppCard title="Caractéristiques">
    <div class="stats">
      <div v-for="s in STATS" :key="s.id" class="stat" :title="s.description" :data-testid="`stat-${s.id}`">
        <span class="stat-abbr">{{ s.abbr }}</span>
        <AppStepper
          v-if="editing && !readonly"
          v-model="character.stats[s.id]"
          :min="1"
          :label="s.label"
          :testid="`stat-${s.id}`"
        />
        <span v-else class="stat-value">{{ character.stats[s.id] }}</span>
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: var(--space-xs);
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs);
  border-radius: var(--radius-md);
  background: var(--surface-2);
}

.stat-abbr {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--muted);
}

.stat-value {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--accent-strong);
}

/* En édition, le stepper (3 × 40px) ne tient pas à 6 colonnes */
.stats:has(.stepper) {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

/* … ni à 3 colonnes sur téléphone */
@media (max-width: 420px) {
  .stats:has(.stepper) {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
