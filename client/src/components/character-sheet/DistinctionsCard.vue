<script setup lang="ts">
import { computed, toRef } from 'vue'
import { Award, Star } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppTickGauge from '../ui/AppTickGauge.vue'
import AppBadge from '../ui/AppBadge.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { STATS, type AdvancedDomain } from '../../data/sindragosa/domains'
import { advancedStats } from '../../utils/sindragosa/advanced'
import { MAX_DOMAIN_RANK, ticksForRank } from '../../utils/sindragosa/progression'
import { openRollSheet } from '../../composables/useRollSheet'
import { usePins } from '../../composables/usePins'
import type { Character } from '../../types/character'

/**
 * Domaines avancés ouverts et titres. Un domaine avancé s'ouvre par ses
 * prérequis (ou la compétence du même nom) ; ceux qui restent fermés ne
 * s'affichent pas : le joueur avance à l'aveugle.
 */
const props = defineProps<{ character: Character; advanced: AdvancedDomain[]; readonly?: boolean }>()

const { isPinned, toggle } = usePins(toRef(props, 'character'))

const rows = computed(() =>
  props.advanced.map((d) => ({
    ...d,
    progress: props.character.advancedDomains[d.id] ?? { rank: 0, ticks: 0 },
    stats: advancedStats(d.id).map((s) => STATS.find((x) => x.id === s)!.abbr).join(' / '),
  })),
)

function roll(id: string) {
  if (!props.readonly) openRollSheet({ domainId: id, context: 'fiche' })
}
</script>

<template>
  <AppCard title="Domaines avancés">
    <p v-if="!rows.length" class="empty">Aucun pour l'instant : ils s'ouvrent quand tes domaines progressent.</p>
    <ul v-else class="advanced">
      <li v-for="d in rows" :key="d.id" class="advanced-row" :data-testid="`advanced-${d.id}`">
        <button type="button" class="advanced-main" :disabled="readonly" :data-testid="`advanced-roll-${d.id}`" @click="roll(d.id)">
          <span class="advanced-text">
            <span class="advanced-name">{{ d.label }}</span>
            <span class="advanced-stats">{{ d.stats }}</span>
          </span>
          <AppTickGauge
            :rank="d.progress.rank"
            :ticks="d.progress.ticks"
            :total="ticksForRank(d.progress.rank + 1)"
            :maxed="d.progress.rank >= MAX_DOMAIN_RANK"
          />
        </button>
        <AppIconBtn
          v-if="!readonly"
          :title="isPinned(`domain:${d.id}`) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          :data-testid="`advanced-pin-${d.id}`"
          @click="toggle(`domain:${d.id}`)"
        >
          <Star :size="16" :class="{ 'star--on': isPinned(`domain:${d.id}`) }" />
        </AppIconBtn>
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
.empty {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.advanced {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.advanced-row {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.advanced-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.advanced-main:hover:not(:disabled) {
  background: var(--surface-2);
}

.advanced-main:disabled {
  cursor: default;
}

.advanced-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.advanced-name {
  font-weight: 600;
}

.advanced-stats {
  font-size: 0.75rem;
  color: var(--muted);
}

.star--on {
  color: var(--accent);
  fill: currentColor;
}

.titles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}
</style>
