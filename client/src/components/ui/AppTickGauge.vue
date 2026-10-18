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
  /**
   * Réserve la place de N coches : des jauges empilées gardent leurs pastilles
   * alignées à droite, quel que soit leur nombre de coches.
   */
  slots?: number
}>()
</script>

<template>
  <span class="gauge" :aria-label="maxed ? `Rang ${rank}, maximum` : `Rang ${rank ?? ''}, ${ticks} coches sur ${total}`">
    <span v-if="rank !== undefined" class="gauge-rank">{{ rank }}</span>
    <span v-if="maxed && !slots" class="gauge-max" aria-hidden="true">★</span>
    <span v-else class="gauge-dots" :style="{ gridTemplateColumns: `repeat(${Math.max(total, slots ?? 0)}, auto)` }" aria-hidden="true">
      <span v-if="maxed" class="gauge-max gauge-max--slots">★</span>
      <span
        v-for="i in Math.max(total, slots ?? 0)"
        :key="i"
        class="gauge-dot"
        :class="{ 'gauge-dot--on': !maxed && i <= ticks, 'gauge-dot--empty': maxed || i > total }"
        :style="{ gridColumn: i }"
      />
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
  display: inline-grid;
  grid-template-rows: auto;
  align-items: center;
  gap: 3px;
}

/* Place réservée par `slots` : la coche existe pour la largeur, invisible */
.gauge-dot--empty {
  visibility: hidden;
}

/* L'étoile prend la largeur des coches réservées, à gauche */
.gauge-max--slots {
  grid-row: 1;
  grid-column: 1 / -1;
  line-height: 1;
}

.gauge-dot {
  grid-row: 1;
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
