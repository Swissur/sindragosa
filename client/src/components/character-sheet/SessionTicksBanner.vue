<script setup lang="ts">
import { computed } from 'vue'
import { MAX_CRIT_FAIL_TICKS_PER_SESSION, MAX_SUCCESS_TICKS_PER_SESSION } from '../../utils/sindragosa/progression'
import type { Character } from '../../types/character'

/** Coches validées pendant la séance : 2 pour des réussites, 1 pour un échec critique. */
const props = defineProps<{ sessionTicks: Character['sessionTicks'] }>()

const total = computed(() => props.sessionTicks.success + props.sessionTicks.critFail)
const max = MAX_SUCCESS_TICKS_PER_SESSION + MAX_CRIT_FAIL_TICKS_PER_SESSION
</script>

<template>
  <div class="ticks" data-testid="session-ticks">
    <span class="ticks-label">Coches de la séance</span>
    <span class="ticks-dots" aria-hidden="true">
      <span v-for="i in MAX_SUCCESS_TICKS_PER_SESSION" :key="`s${i}`" class="dot" :class="{ 'dot--on': i <= sessionTicks.success }" title="Réussite marquante" />
      <span v-for="i in MAX_CRIT_FAIL_TICKS_PER_SESSION" :key="`f${i}`" class="dot dot--fail" :class="{ 'dot--on': i <= sessionTicks.critFail }" title="Échec critique" />
    </span>
    <strong class="ticks-count">{{ total }}/{{ max }}</strong>
  </div>
</template>

<style scoped>
.ticks {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  margin-bottom: var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--accent-soft);
}

.ticks-label {
  flex: 1;
  font-weight: 600;
  font-size: 0.9rem;
}

.ticks-dots {
  display: inline-flex;
  gap: 4px;
}

.dot {
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  border: 2px solid var(--accent);
}

.dot--fail {
  border-color: var(--danger);
}

.dot--on {
  background: var(--accent);
}

.dot--fail.dot--on {
  background: var(--danger);
}
</style>
