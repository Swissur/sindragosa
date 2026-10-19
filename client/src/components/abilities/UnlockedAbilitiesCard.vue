<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import AppCard from '../ui/AppCard.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AbilityCard from './AbilityCard.vue'
import WeaponStrikes from './WeaponStrikes.vue'
import AbilityFilters from './AbilityFilters.vue'
import { usePins } from '../../composables/usePins'
import { STATS } from '../../data/sindragosa/domains'
import { abilityStats, byStat } from '../../utils/sindragosa/statGroups'
import { isFiltering, matchesAbilityFilter } from '../../utils/sindragosa/abilityFilter'
import type { Ability, ActionType } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Les compétences que le joueur a débloquées, et seulement elles : il avance à
 * l'aveugle, sans voir le catalogue ni les compétences encore verrouillées.
 * Le catalogue complet reste au MJ (fiche d'un membre).
 * Rangées sous chaque carac de leurs prérequis, comme les domaines.
 */
const props = defineProps<{ character: Character; unlocked: Ability[]; readonly?: boolean }>()

const { isPinned, toggle } = usePins(toRef(props, 'character'))

const search = ref('')
const actionType = ref<ActionType | ''>('')
const filter = computed(() => ({ search: search.value, actionType: actionType.value }))
const filtering = computed(() => isFiltering(filter.value))

const sorted = computed(() => [...props.unlocked].sort((a, b) => a.name.localeCompare(b.name, 'fr')))
const groups = computed(() => {
  const grouped = byStat(sorted.value.filter((a) => matchesAbilityFilter(a, filter.value)), abilityStats)
  return STATS.map((s) => ({ stat: s, abilities: grouped[s.id] })).filter((g) => g.abilities.length)
})
</script>

<template>
  <AppCard title="Compétences" data-testid="unlocked-abilities">
    <WeaponStrikes :character="character" :readonly="readonly" />
    <AppEmptyState v-if="!sorted.length">
      Aucune compétence pour l'instant : continue à pratiquer tes domaines, elles se révèlent d'elles-mêmes.
    </AppEmptyState>
    <AbilityFilters v-if="sorted.length" v-model:search="search" v-model:action-type="actionType" />
    <AppEmptyState v-if="sorted.length && !groups.length">Aucune compétence ne correspond.</AppEmptyState>
    <!-- Repliées par défaut ; une recherche ouvre les sections qui ont un résultat
         (la clé change : l'accordéon repart avec son nouvel état par défaut) -->
    <AppAccordion
      v-for="g in groups"
      :key="`${g.stat.id}-${filtering}`"
      :default-open="filtering"
      :title="`${g.stat.label} ${character.stats[g.stat.id]}`"
      :testid="`abilities-${g.stat.id}`"
    >
      <AbilityCard
        v-for="a in g.abilities"
        :key="a.id"
        :ability="a"
        :character="character"
        :unlocked="true"
        :readonly="readonly"
        :pinned="readonly ? undefined : isPinned(`ability:${a.id}`)"
        @toggle-pin="toggle(`ability:${a.id}`)"
      />
    </AppAccordion>
  </AppCard>
</template>
