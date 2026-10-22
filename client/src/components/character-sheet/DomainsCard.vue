<script setup lang="ts">
import { computed, toRef } from 'vue'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import DomainRow from './DomainRow.vue'
import AdvancedDomainRow from './AdvancedDomainRow.vue'
import { ADVANCED_DOMAINS, DOMAINS, STATS, type AdvancedDomain, type StatId } from '../../data/sindragosa/domains'
import { usePins } from '../../composables/usePins'
import { advancedStats } from '../../utils/sindragosa/advanced'
import { byStat } from '../../utils/sindragosa/statGroups'
import type { Character } from '../../types/character'

/**
 * Les 30 domaines, en 6 accordéons (un par carac), repliés par défaut. Déplier une carac montre
 * tous ses domaines. Suivent les domaines avancés ouverts, sous chaque carac de leurs prérequis.
 * En mode MJ, les domaines avancés encore fermés suivent aussi : le MJ peut tout donner.
 */
const props = defineProps<{
  character: Character
  advanced: AdvancedDomain[]
  readonly?: boolean
  gm?: boolean
}>()

const emit = defineEmits<{ (e: 'remove-specialty', specialty: Character['specialties'][number]): void }>()

const { pins, isPinned, toggle } = usePins(toRef(props, 'character'))
const advancedByStat = computed(() => byStat(props.advanced, (d) => advancedStats(d.id)))
const lockedByStat = computed(() => byStat(
  props.gm ? ADVANCED_DOMAINS.filter((d) => !props.advanced.includes(d)) : [],
  (d) => advancedStats(d.id),
))
const pinnedSpecialties = computed(() => pins.value.filter((p) => p.startsWith('specialty:')).map((p) => p.slice(10)))

const domainsOf = (stat: StatId) => DOMAINS.filter((d) => d.stat === stat)
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
        v-for="d in domainsOf(s.id)"
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
        v-for="d in lockedByStat[s.id]"
        :key="`locked-${d.id}`"
        :character="character"
        :domain="d"
        readonly
        gm
      />
    </AppAccordion>
  </AppCard>
</template>
