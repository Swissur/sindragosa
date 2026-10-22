<script setup lang="ts">
import { computed } from 'vue'
import { Gift, Info, Star } from 'lucide-vue-next'
import AppTickGauge from '../ui/AppTickGauge.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppTooltip from '../ui/AppTooltip.vue'
import { DOMAIN_INFO } from '../../data/sindragosa/domainInfo'
import { openRollSheet } from '../../composables/useRollSheet'
import { rewardTick } from '../../composables/gmReward'
import { DOMAIN_GAUGE_SLOTS, MAX_DOMAIN_RANK, ticksForRank } from '../../utils/sindragosa/progression'
import type { AdvancedDomain } from '../../data/sindragosa/domains'
import type { Character } from '../../types/character'

/**
 * Un domaine avancé ouvert, rangé avec les domaines de sa carac. Taper la
 * ligne ouvre le jet. Pas de spécialité, donc pas de chevron : une place vide
 * garde l'étoile et la jauge alignées sur les domaines de base.
 */
const props = defineProps<{
  character: Character
  domain: AdvancedDomain
  readonly?: boolean
  /** Mode MJ : coches en récompense, même sur un domaine encore verrouillé. */
  gm?: boolean
  /** Favori de la fiche. Absent = pas de bouton (fiche d'un autre joueur). */
  pinned?: boolean
}>()

const emit = defineEmits<{ (e: 'toggle-pin'): void }>()

const progress = computed(() => props.character.advancedDomains[props.domain.id] ?? { rank: 0, ticks: 0 })

function roll() {
  if (!props.readonly) openRollSheet({ domainId: props.domain.id, context: 'fiche' })
}
</script>

<template>
  <div class="advanced" :data-testid="`advanced-${domain.id}`">
    <button type="button" class="advanced-main" :disabled="readonly" :data-testid="`advanced-roll-${domain.id}`" @click="roll">
      <span class="advanced-name">
        {{ domain.label }}
        <span class="advanced-tag">avancé</span>
      </span>
      <AppTickGauge
        :rank="progress.rank"
        :ticks="progress.ticks"
        :total="ticksForRank(progress.rank + 1)"
        :maxed="progress.rank >= MAX_DOMAIN_RANK"
        :slots="DOMAIN_GAUGE_SLOTS"
      />
    </button>
    <AppTooltip :label="`À propos de ${domain.label}`">
      <template #trigger><Info :size="16" /></template>
      {{ DOMAIN_INFO[domain.id] }}
    </AppTooltip>
    <AppIconBtn
      v-if="pinned !== undefined"
      variant="bare"
      :title="pinned ? 'Retirer des favoris' : 'Ajouter aux favoris'"
      :data-testid="`advanced-pin-${domain.id}`"
      @click="emit('toggle-pin')"
    >
      <Star :size="16" :class="{ 'star--on': pinned }" />
    </AppIconBtn>
    <AppIconBtn
      v-if="gm"
      variant="primary"
      title="Récompense : une coche"
      :data-testid="`gm-reward-${domain.id}`"
      @click="rewardTick(character, { kind: 'advanced', id: domain.id })"
    >
      <Gift :size="16" />
    </AppIconBtn>
    <span class="advanced-spacer" />
  </div>
</template>

<style scoped>
.advanced {
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

.advanced-name {
  flex: 1;
  min-width: 0;
  font-weight: 600;
}

.advanced-tag {
  font-size: 0.72rem;
  font-style: italic;
  font-weight: 400;
  color: var(--muted);
}

.star--on {
  color: var(--accent);
  fill: currentColor;
}

/* Sous le chevron des domaines de base */
.advanced-spacer {
  flex-shrink: 0;
  width: 40px;
}
</style>
