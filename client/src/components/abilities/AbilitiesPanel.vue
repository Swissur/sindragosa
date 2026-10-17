<script setup lang="ts">
import { computed, ref } from 'vue'
import { Unlock, Lock } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AbilityCard from './AbilityCard.vue'
import { ACTION_TYPES } from './actionTypes'
import { ABILITIES } from '../../data/sindragosa/abilities'
import { normalizeName } from '../../utils/sindragosa/prerequisites'
import type { Ability, ActionType } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/** Onglet Pouvoirs : recherche, filtre Débloquées / Verrouillées / Toutes, type d'action. */
const props = defineProps<{ character: Character; unlocked: Ability[]; readonly?: boolean }>()

const search = ref('')
const lockFilter = ref<'' | 'unlocked' | 'locked'>('unlocked')
const actionType = ref<ActionType | ''>('')

const LOCK_ITEMS: AppToggleItem[] = [
  { value: 'unlocked', icon: Unlock, title: 'Débloquées', testid: 'abilities-unlocked' },
  { value: 'locked', icon: Lock, title: 'Verrouillées', testid: 'abilities-locked' },
]

const unlockedIds = computed(() => new Set(props.unlocked.map((a) => a.id)))

const groups = computed(() => {
  const q = normalizeName(search.value)
  const list = ABILITIES.filter((a) => {
    const isUnlocked = unlockedIds.value.has(a.id)
    if (lockFilter.value === 'unlocked' && !isUnlocked) return false
    if (lockFilter.value === 'locked' && isUnlocked) return false
    if (actionType.value && a.actionType !== actionType.value) return false
    return !q || normalizeName(a.name).includes(q)
  })
  const byCategory = new Map<string, Ability[]>()
  for (const a of list) byCategory.set(a.category, [...(byCategory.get(a.category) ?? []), a])
  return [...byCategory.entries()].map(([category, abilities]) => ({ category, abilities }))
})
</script>

<template>
  <div class="abilities">
    <div class="abilities-filters">
      <AppInput v-model="search" placeholder="Chercher une compétence" class="abilities-search" data-testid="abilities-search" />
      <div class="abilities-filters-line">
        <AppToggleGroup v-model="lockFilter" :items="LOCK_ITEMS" />
        <AppSelect v-model="actionType" class="abilities-type">
          <option value="">Tous les types</option>
          <option v-for="(meta, id) in ACTION_TYPES" :key="id" :value="id">{{ meta.label }}</option>
        </AppSelect>
      </div>
    </div>

    <AppEmptyState v-if="!groups.length">
      {{ lockFilter === 'unlocked' && !search
        ? 'Aucune compétence débloquée : monte tes domaines pour en gagner.'
        : 'Aucune compétence ne correspond.' }}
    </AppEmptyState>

    <AppCard v-for="g in groups" :key="g.category" :title="g.category">
      <AbilityCard
        v-for="a in g.abilities"
        :key="a.id"
        :ability="a"
        :character="character"
        :unlocked="unlockedIds.has(a.id)"
        :readonly="readonly"
      />
    </AppCard>
  </div>
</template>

<style scoped>
.abilities-filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.abilities-filters-line {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.abilities-type {
  flex: 1;
  min-width: 0;
}
</style>
