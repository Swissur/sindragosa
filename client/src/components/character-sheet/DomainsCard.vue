<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppButton from '../ui/AppButton.vue'
import DomainRow from './DomainRow.vue'
import AdvancedDomainRow from './AdvancedDomainRow.vue'
import { ADVANCED_DOMAINS, DOMAINS, STATS, type AdvancedDomain, type StatId } from '../../data/sindragosa/domains'
import { usePins } from '../../composables/usePins'
import { advancedStats } from '../../utils/sindragosa/advanced'
import { byStat } from '../../utils/sindragosa/statGroups'
import type { Character } from '../../types/character'

/**
 * Les 30 domaines, en 6 accordéons (un par carac), repliés par défaut. Seuls les domaines entamés
 * (rang > 0 ou coches en cours) sont visibles ; les autres se déplient à la demande.
 * Suivent les domaines avancés ouverts, sous chaque carac de leurs prérequis.
 * En mode MJ, les domaines avancés encore fermés rejoignent les domaines à rang 0 : le MJ peut tout donner.
 */
const props = defineProps<{
  character: Character
  advanced: AdvancedDomain[]
  readonly?: boolean
  gm?: boolean
}>()

const emit = defineEmits<{ (e: 'remove-specialty', specialty: Character['specialties'][number]): void }>()

const showAll = ref<Partial<Record<StatId, boolean>>>({})
const { pins, isPinned, toggle } = usePins(toRef(props, 'character'))
const advancedByStat = computed(() => byStat(props.advanced, (d) => advancedStats(d.id)))
const lockedByStat = computed(() => byStat(
  props.gm ? ADVANCED_DOMAINS.filter((d) => !props.advanced.includes(d)) : [],
  (d) => advancedStats(d.id),
))
const pinnedSpecialties = computed(() => pins.value.filter((p) => p.startsWith('specialty:')).map((p) => p.slice(10)))

const started = (id: string) => {
  const p = props.character.domains[id]
  return !!p && (p.rank > 0 || p.ticks > 0)
}

function domainsOf(stat: StatId) {
  const all = DOMAINS.filter((d) => d.stat === stat)
  const locked = lockedByStat.value[stat] ?? []
  return {
    visible: all.filter((d) => started(d.id) || showAll.value[stat]),
    locked: showAll.value[stat] ? locked : [],
    hidden: all.filter((d) => !started(d.id)).length + locked.length,
  }
}
</script>

<template>
  <AppCard title="Domaines">
    <AppAccordion
      v-for="s in STATS"
      :key="s.id"
      :title="`${s.label} ${character.stats[s.id]}`"
      :testid="`domains-${s.id}`"
    >
      <DomainRow
        v-for="d in domainsOf(s.id).visible"
        :key="d.id"
        :character="character"
        :domain="d"
        :readonly="readonly"
        :gm="gm"
        :pinned="readonly ? undefined : isPinned(`domain:${d.id}`)"
        :pinned-specialties="readonly ? undefined : pinnedSpecialties"
        @toggle-pin="toggle(`domain:${d.id}`)"
        @toggle-specialty-pin="(id) => toggle(`specialty:${id}`)"
        @remove-specialty="(s) => emit('remove-specialty', s)"
      />
      <AdvancedDomainRow
        v-for="d in advancedByStat[s.id]"
        :key="`advanced-${d.id}`"
        :character="character"
        :domain="d"
        :readonly="readonly"
        :gm="gm"
        :pinned="readonly ? undefined : isPinned(`domain:${d.id}`)"
        @toggle-pin="toggle(`domain:${d.id}`)"
      />
      <AdvancedDomainRow
        v-for="d in domainsOf(s.id).locked"
        :key="`locked-${d.id}`"
        :character="character"
        :domain="d"
        readonly
        gm
      />
      <AppButton
        v-if="domainsOf(s.id).hidden && !showAll[s.id]"
        size="small"
        :data-testid="`domains-more-${s.id}`"
        @click="showAll[s.id] = true"
      >
        + {{ domainsOf(s.id).hidden }} domaine{{ domainsOf(s.id).hidden > 1 ? 's' : '' }} à rang 0
      </AppButton>
    </AppAccordion>
  </AppCard>
</template>
