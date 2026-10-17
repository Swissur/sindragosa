<script setup lang="ts">
import { ref } from 'vue'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppButton from '../ui/AppButton.vue'
import DomainRow from './DomainRow.vue'
import { DOMAINS, STATS, type StatId } from '../../data/sindragosa/domains'
import type { Character } from '../../types/character'

/**
 * Les 30 domaines, en 6 accordéons (un par carac). Seuls les domaines entamés
 * (rang > 0 ou coches en cours) sont visibles ; les autres se déplient à la demande.
 */
const props = defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()

const showAll = ref<Partial<Record<StatId, boolean>>>({})

const started = (id: string) => {
  const p = props.character.domains[id]
  return !!p && (p.rank > 0 || p.ticks > 0)
}

function domainsOf(stat: StatId) {
  const all = DOMAINS.filter((d) => d.stat === stat)
  return { visible: all.filter((d) => started(d.id) || showAll.value[stat]), hidden: all.filter((d) => !started(d.id)).length }
}
</script>

<template>
  <AppCard title="Domaines">
    <AppAccordion
      v-for="s in STATS"
      :key="s.id"
      :title="`${s.label} ${character.stats[s.id]}`"
      :hint="`${domainsOf(s.id).visible.filter((d) => started(d.id)).length} / 5`"
      :default-open="true"
      :testid="`domains-${s.id}`"
    >
      <DomainRow
        v-for="d in domainsOf(s.id).visible"
        :key="d.id"
        :character="character"
        :domain="d"
        :editing="editing"
        :readonly="readonly"
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
