<script setup lang="ts">
import { computed, ref } from 'vue'
import { Unlock, Lock } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AbilityCard from './AbilityCard.vue'
import AbilityFilters from './AbilityFilters.vue'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { STATS } from '../../data/sindragosa/domains'
import { abilityStats, byStat } from '../../utils/sindragosa/statGroups'
import { isFiltering, matchesAbilityFilter } from '../../utils/sindragosa/abilityFilter'
import type { Ability, ActionType } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Catalogue complet des compétences, pour le MJ : recherche, filtre Débloquées / Verrouillées / Toutes, type d'action.
 * Rangées sous chaque carac de leurs prérequis, comme sur la fiche du joueur.
 * Sans personnage, c'est le catalogue nu (page Savoir) : pas de filtre de verrou ni de ✓/✗.
 */
const props = defineProps<{ character?: Character | null; unlocked?: Ability[]; readonly?: boolean }>()

const search = ref('')
const lockFilter = ref<'' | 'unlocked' | 'locked'>('unlocked')
const actionType = ref<ActionType | ''>('')

const LOCK_ITEMS: AppToggleItem[] = [
  { value: 'unlocked', icon: Unlock, title: 'Débloquées', testid: 'abilities-unlocked' },
  { value: 'locked', icon: Lock, title: 'Verrouillées', testid: 'abilities-locked' },
]

const unlockedIds = computed(() => new Set((props.unlocked ?? []).map((a) => a.id)))
const lockActive = computed(() => (props.character ? lockFilter.value : ''))

const filter = computed(() => ({ search: search.value, actionType: actionType.value }))
const filtering = computed(() => isFiltering(filter.value))

const groups = computed(() => {
  const list = ABILITIES.filter((a) => {
    const isUnlocked = unlockedIds.value.has(a.id)
    if (lockActive.value === 'unlocked' && !isUnlocked) return false
    if (lockActive.value === 'locked' && isUnlocked) return false
    return matchesAbilityFilter(a, filter.value)
  }).sort((a, b) => a.name.localeCompare(b.name, 'fr'))
  const grouped = byStat(list, abilityStats)
  return STATS.map((s) => ({ stat: s, abilities: grouped[s.id] })).filter((g) => g.abilities.length)
})
</script>

<template>
  <div class="abilities">
    <AbilityFilters v-model:search="search" v-model:action-type="actionType">
      <AppToggleGroup v-if="character" v-model="lockFilter" :items="LOCK_ITEMS" />
    </AbilityFilters>

    <AppEmptyState v-if="!groups.length">
      {{ lockActive === 'unlocked' && !search
        ? 'Aucune compétence débloquée : monte tes domaines pour en gagner.'
        : 'Aucune compétence ne correspond.' }}
    </AppEmptyState>

    <!-- Repliées par défaut ; une recherche ouvre les sections qui ont un résultat
         (la clé change : l'accordéon repart avec son nouvel état par défaut) -->
    <AppCard v-if="groups.length">
      <AppAccordion
        v-for="g in groups"
        :key="`${g.stat.id}-${filtering}`"
        :default-open="filtering"
        :title="character ? `${g.stat.label} ${character.stats[g.stat.id]}` : g.stat.label"
        :testid="`abilities-${g.stat.id}`"
      >
        <AbilityCard
          v-for="a in g.abilities"
          :key="a.id"
          :ability="a"
          :character="character"
          :unlocked="!character || unlockedIds.has(a.id)"
          :readonly="readonly"
        />
      </AppAccordion>
    </AppCard>
  </div>
</template>

