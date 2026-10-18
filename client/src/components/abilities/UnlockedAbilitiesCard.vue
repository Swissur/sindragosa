<script setup lang="ts">
import { computed, toRef } from 'vue'
import AppCard from '../ui/AppCard.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AbilityCard from './AbilityCard.vue'
import WeaponStrikes from './WeaponStrikes.vue'
import { equippedWeapons } from '../../utils/sindragosa/equipment'
import { usePins } from '../../composables/usePins'
import type { Ability } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Les compétences que le joueur a débloquées, et seulement elles : il avance à
 * l'aveugle, sans voir le catalogue ni les compétences encore verrouillées.
 * Le catalogue complet reste au MJ (fiche d'un membre).
 */
const props = defineProps<{ character: Character; unlocked: Ability[]; readonly?: boolean }>()

const { isPinned, toggle } = usePins(toRef(props, 'character'))

const sorted = computed(() => [...props.unlocked].sort((a, b) => a.name.localeCompare(b.name, 'fr')))
const hasWeapons = computed(() => equippedWeapons(props.character).length > 0)
</script>

<template>
  <AppCard title="Compétences" data-testid="unlocked-abilities">
    <WeaponStrikes :character="character" :readonly="readonly" />
    <AppEmptyState v-if="!sorted.length && !hasWeapons">
      Aucune compétence pour l'instant : continue à pratiquer tes domaines, elles se révèlent d'elles-mêmes.
    </AppEmptyState>
    <AbilityCard
      v-for="a in sorted"
      :key="a.id"
      :ability="a"
      :character="character"
      :unlocked="true"
      :readonly="readonly"
      :pinned="readonly ? undefined : isPinned(`ability:${a.id}`)"
      @toggle-pin="toggle(`ability:${a.id}`)"
    />
  </AppCard>
</template>
