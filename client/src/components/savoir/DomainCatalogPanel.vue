<script setup lang="ts">
import { computed } from 'vue'
import { Check, Lock } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppTickGauge from '../ui/AppTickGauge.vue'
import { ADVANCED_DOMAINS, DOMAINS, STATS, type AdvancedDomain } from '../../data/sindragosa/domains'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { DOMAIN_INFO } from '../../data/sindragosa/domainInfo'
import { prerequisiteLabel } from '../../utils/sindragosa/prerequisites'
import { advancedStats, openingAbilities, unlockedAdvancedDomains } from '../../utils/sindragosa/advanced'
import { byStat } from '../../utils/sindragosa/statGroups'
import { progressState } from '../../utils/sindragosa/sheet'
import { DOMAIN_GAUGE_SLOTS, MAX_DOMAIN_RANK, ticksForRank } from '../../utils/sindragosa/progression'
import type { Ability } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Tous les domaines pour le MJ, rangés comme sur la fiche du joueur : un accordéon
 * par carac, les domaines de base puis les domaines avancés liés à cette carac.
 * Avec un personnage : son rang sur chaque domaine, ✓ / verrou sur les avancés.
 * Sous chaque domaine, ce qu'il couvre (`domainInfo.ts`).
 */
const props = defineProps<{ character?: Character | null; unlocked: Ability[] }>()

const advancedByStat = byStat(ADVANCED_DOMAINS, (d) => advancedStats(d.id))

const openAdvanced = computed(() => {
  if (!props.character) return new Set<string>()
  return new Set(unlockedAdvancedDomains(progressState(props.character), props.unlocked).map((d) => d.id))
})

/** Comment s'ouvre un domaine avancé : par ses compétences s'il en a, sinon par ses prérequis. */
function advancedHowTo(d: AdvancedDomain): string {
  const abilities = openingAbilities(d, ABILITIES)
  return abilities.length
    ? `Compétence : ${abilities.map((a) => a.name).join(' ou ')}`
    : d.prerequisites.map(prerequisiteLabel).join(' · ')
}

function progressOf(id: string, advanced = false) {
  const c = props.character!
  return (advanced ? c.advancedDomains[id] : c.domains[id]) ?? { rank: 0, ticks: 0 }
}
</script>

<template>
  <AppCard>
    <AppAccordion
      v-for="s in STATS"
      :key="s.id"
      :title="character ? `${s.label} ${character.stats[s.id]}` : s.label"
      :testid="`savoir-domains-${s.id}`"
    >
      <ul class="rows">
        <li v-for="d in DOMAINS.filter((x) => x.stat === s.id)" :key="d.id" class="row">
          <span class="row-head">
            <strong class="row-name">{{ d.label }}</strong>
            <AppTickGauge
              v-if="character"
              :rank="progressOf(d.id).rank"
              :ticks="progressOf(d.id).ticks"
              :total="ticksForRank(progressOf(d.id).rank + 1)"
              :maxed="progressOf(d.id).rank >= MAX_DOMAIN_RANK"
              :slots="DOMAIN_GAUGE_SLOTS"
            />
          </span>
          <span class="row-meta">{{ DOMAIN_INFO[d.id] }}</span>
        </li>
        <li
          v-for="d in advancedByStat[s.id]"
          :key="`advanced-${d.id}`"
          class="row"
          :class="{ 'row--locked': character && !openAdvanced.has(d.id) }"
        >
          <span class="row-head">
            <template v-if="character">
              <Check v-if="openAdvanced.has(d.id)" :size="15" class="ok" />
              <Lock v-else :size="15" />
            </template>
            <strong class="row-name">
              {{ d.label }}
              <span class="row-tag">avancé</span>
            </strong>
            <AppTickGauge
              v-if="character && openAdvanced.has(d.id)"
              :rank="progressOf(d.id, true).rank"
              :ticks="progressOf(d.id, true).ticks"
              :total="ticksForRank(progressOf(d.id, true).rank + 1)"
              :maxed="progressOf(d.id, true).rank >= MAX_DOMAIN_RANK"
              :slots="DOMAIN_GAUGE_SLOTS"
            />
          </span>
          <span class="row-meta">{{ DOMAIN_INFO[d.id] }}</span>
          <span class="row-meta">{{ advancedHowTo(d) }}</span>
        </li>
      </ul>
    </AppAccordion>
  </AppCard>
</template>

<style scoped>
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border);
}

.row:last-child {
  border-bottom: none;
}

.row--locked {
  opacity: 0.55;
}

.row-head {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.row-name {
  flex: 1;
  min-width: 0;
}

.row-tag {
  font-size: 0.72rem;
  font-style: italic;
  font-weight: 400;
  color: var(--muted);
}

.row-meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.ok {
  color: var(--accent-strong);
}
</style>
