<script setup lang="ts">
/**
 * Rang en pastille et jauge de coches : `ticks` points pleins sur `total`.
 * Sert aux domaines (rang r → r + 1 coches) et aux spécialités (2 coches par niveau).
 */
defineProps<{
  /** Texte de la pastille : un rang (« 3 ») ou un niveau (« Exp. »). Absent = pas de pastille. */
  rank?: string | number
  ticks: number
  total: number
  /** Rang maximal atteint : la jauge est remplacée par une étoile. */
  maxed?: boolean
}>()
</script>

<template>
  <span class="gauge" :aria-label="maxed ? `Rang ${rank}, maximum` : `Rang ${rank ?? ''}, ${ticks} coches sur ${total}`">
    <span v-if="rank !== undefined" class="gauge-rank">{{ rank }}</span>
    <span v-if="maxed" class="gauge-max" aria-hidden="true">★</span>
    <span v-else class="gauge-dots" aria-hidden="true">
      <span v-for="i in total" :key="i" class="gauge-dot" :class="{ 'gauge-dot--on': i <= ticks }" />
    </span>
  </span>
</template>

<style scoped>
.gauge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
}

.gauge-rank {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6rem;
  height: 1.6rem;
  padding: 0 var(--space-xs);
  border-radius: var(--radius-pill);
  background: var(--brand);
  color: var(--on-brand);
  font-weight: 700;
  font-size: 0.85rem;
}

.gauge-dots {
  display: inline-flex;
  gap: 3px;
}

.gauge-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
}

.gauge-dot--on {
  background: var(--accent);
}

.gauge-max {
  color: var(--accent-strong);
  font-size: 0.9rem;
}
</style>
