<script setup lang="ts">
import { computed } from 'vue'
import { Award } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppTickGauge from '../ui/AppTickGauge.vue'
import AppBadge from '../ui/AppBadge.vue'
import { ADVANCED_DOMAINS } from '../../data/sindragosa/domains'
import { MAX_DOMAIN_RANK, ticksForRank } from '../../utils/sindragosa/progression'
import type { Character } from '../../types/character'

/**
 * Domaines avancés et titres : c'est le MJ qui les accorde (outils du MJ),
 * le joueur les lit ici.
 */
const props = defineProps<{ character: Character }>()

const advanced = computed(() =>
  ADVANCED_DOMAINS
    .map((d) => ({ ...d, progress: props.character.advancedDomains[d.id] }))
    .filter((d) => d.progress && (d.progress.rank > 0 || d.progress.ticks > 0)),
)
</script>

<template>
  <AppCard v-if="advanced.length || character.titles.length" title="Distinctions">
    <ul v-if="advanced.length" class="advanced">
      <li v-for="d in advanced" :key="d.id" class="advanced-row" :data-testid="`advanced-${d.id}`">
        <span class="advanced-name">{{ d.label }}</span>
        <AppTickGauge
          :rank="d.progress!.rank"
          :ticks="d.progress!.ticks"
          :total="ticksForRank(d.progress!.rank + 1)"
          :maxed="d.progress!.rank >= MAX_DOMAIN_RANK"
        />
      </li>
    </ul>
    <div v-if="character.titles.length" class="titles">
      <AppBadge v-for="t in character.titles" :key="t" variant="active" data-testid="title">
        <Award :size="12" /> {{ t }}
      </AppBadge>
    </div>
  </AppCard>
</template>

<style scoped>
.advanced {
  list-style: none;
  margin: 0 0 var(--space-sm);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.advanced-row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
}

.advanced-name {
  flex: 1;
  font-weight: 600;
}

.titles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
</style>
