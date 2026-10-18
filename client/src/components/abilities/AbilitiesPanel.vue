<script setup lang="ts">
import { computed, ref } from 'vue'
import { Unlock, Lock } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AbilityCard from './AbilityCard.vue'
import AbilityFilters from './AbilityFilters.vue'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { matchesAbilityFilter } from '../../utils/sindragosa/abilityFilter'
import type { Ability, ActionType } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Catalogue complet des compétences, pour le MJ : recherche, filtre Débloquées / Verrouillées / Toutes, type d'action.
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

const groups = computed(() => {
  const list = ABILITIES.filter((a) => {
    const isUnlocked = unlockedIds.value.has(a.id)
    if (lockActive.value === 'unlocked' && !isUnlocked) return false
    if (lockActive.value === 'locked' && isUnlocked) return false
    return matchesAbilityFilter(a, { search: search.value, actionType: actionType.value })
  })
  const byCategory = new Map<string, Ability[]>()
  for (const a of list) byCategory.set(a.category, [...(byCategory.get(a.category) ?? []), a])
  return [...byCategory.entries()].map(([category, abilities]) => ({ category, abilities }))
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

    <AppCard v-for="g in groups" :key="g.category" :title="g.category">
      <AbilityCard
        v-for="a in g.abilities"
        :key="a.id"
        :ability="a"
        :character="character"
        :unlocked="!character || unlockedIds.has(a.id)"
        :readonly="readonly"
      />
    </AppCard>
  </div>
</template>

