<script setup lang="ts">
import { computed, toRef } from 'vue'
import { BookOpen, Dices, Hammer, Sparkles } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import ActionTile from '../actions/ActionTile.vue'
import AbilityCard from '../abilities/AbilityCard.vue'
import RecipeList from './RecipeList.vue'
import { usePins } from '../../composables/usePins'
import { openRollSheet } from '../../composables/useRollSheet'
import { domainById } from '../../data/sindragosa/domains'
import { rollSetup } from '../../utils/sindragosa/rollSetup'
import type { Favorites } from '../../composables/useFavorites'
import type { Character } from '../../types/character'

/** Tout ce que le joueur a mis en favori, rangé en domaines, compétences et patrons. Ouvert d'emblée : c'est l'accès rapide. */
const props = defineProps<{ character: Character; favorites: Favorites }>()

const { toggle } = usePins(toRef(props, 'character'))

const domainCount = computed(() => props.favorites.domains.length + props.favorites.specialties.length)

function poolLabel(domainId: string, specialtyId = ''): string {
  const s = rollSetup(props.character, { domainId, specialtyId, mode: 'normal', luck: 0 })
  return s ? `${s.count}d6` : ''
}
</script>

<template>
  <AppCard title="Favoris" data-testid="favorites">
    <AppAccordion
      v-if="domainCount"
      title="Domaines"
      :hint="`${domainCount}`"
      default-open
      testid="favorites-domains"
    >
      <template #icon><BookOpen :size="15" /></template>
      <div class="tiles">
        <ActionTile
          v-for="d in favorites.domains"
          :key="d.id"
          :icon="Dices"
          :label="d.label"
          :detail="poolLabel(d.id)"
          :pinned="true"
          :testid="`tile-domain-${d.id}`"
          @activate="openRollSheet({ domainId: d.id, context: 'fiche' })"
          @toggle-pin="toggle(`domain:${d.id}`)"
        />
        <ActionTile
          v-for="s in favorites.specialties"
          :key="s.id"
          :icon="Dices"
          :label="s.name"
          :detail="`${domainById(s.domainId)?.label ?? ''} · ${poolLabel(s.domainId, s.id)}`"
          :pinned="true"
          :testid="`tile-specialty-${s.id}`"
          @activate="openRollSheet({ domainId: s.domainId, specialtyId: s.id, context: 'fiche' })"
          @toggle-pin="toggle(`specialty:${s.id}`)"
        />
      </div>
    </AppAccordion>

    <AppAccordion
      v-if="favorites.abilities.length"
      title="Compétences"
      :hint="`${favorites.abilities.length}`"
      default-open
      testid="favorites-abilities"
    >
      <template #icon><Sparkles :size="15" /></template>
      <AbilityCard
        v-for="a in favorites.abilities"
        :key="a.id"
        :ability="a"
        :character="character"
        :unlocked="true"
        :pinned="true"
        @toggle-pin="toggle(`ability:${a.id}`)"
      />
    </AppAccordion>

    <AppAccordion
      v-if="favorites.recipes.length"
      title="Patrons"
      :hint="`${favorites.recipes.length}`"
      default-open
      testid="favorites-recipes"
    >
      <template #icon><Hammer :size="15" /></template>
      <RecipeList :character="character" :recipes="favorites.recipes" show-rank />
    </AppAccordion>
  </AppCard>
</template>

<style scoped>
.tiles {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 560px) {
  .tiles {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
