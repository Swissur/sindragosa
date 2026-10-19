<script setup lang="ts">
import { computed } from 'vue'
import { componentNeeds } from '../../utils/sindragosa/crafting'
import type { Recipe } from '../../data/sindragosa/types'
import type { ItemRow } from '../../types/character'

/** Nom, rang, composants et effet d'un patron. Avec un inventaire, chaque composant montre possédés / requis. */
const props = defineProps<{
  recipe: Recipe
  items?: ItemRow[]
  rank?: number | null
}>()

const needs = computed(() => (props.items ? componentNeeds(props.items, props.recipe) : null))
</script>

<template>
  <div class="recipe-text">
    <strong>{{ recipe.name }}<template v-if="recipe.batch"> (×{{ recipe.batch }})</template></strong>
    <span v-if="rank" class="recipe-rank">Rang {{ rank }}</span>
    <span class="recipe-components">
      <template v-if="needs">
        <span
          v-for="(n, ci) in needs"
          :key="ci"
          :class="n.have >= n.qty ? 'component--ok' : 'component--missing'"
        >{{ ci > 0 ? ', ' : '' }}{{ n.have }}/{{ n.qty }} {{ n.name }}</span>
      </template>
      <template v-else>{{ recipe.components.map((c) => `${c.qty} ${c.name}`).join(', ') }}</template>
    </span>
    <span class="recipe-effect">{{ recipe.effect }}</span>
  </div>
</template>

<style scoped>
.recipe-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.88rem;
}

.recipe-rank {
  color: var(--accent-strong);
  font-size: 0.76rem;
  font-weight: 600;
}

.recipe-components {
  color: var(--muted);
  font-size: 0.8rem;
}

.component--missing {
  color: var(--danger);
}

.recipe-effect {
  font-size: 0.82rem;
}
</style>
