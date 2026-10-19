<script setup lang="ts">
import { toRef } from 'vue'
import { Dices, Star } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'
import RecipeText from './RecipeText.vue'
import { craftDomainId, hasComponents } from '../../utils/sindragosa/crafting'
import { openRollSheet } from '../../composables/useRollSheet'
import { usePins } from '../../composables/usePins'
import type { Craft, Recipe } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/** Patrons avec leurs composants (possédés / requis), l'étoile de favori et le bouton pour fabriquer. */
const props = defineProps<{
  character: Character
  recipes: { recipe: Recipe; craft: Craft }[]
  readonly?: boolean
  /** Affiche le rang de chaque patron de métier de base (liste qui mélange les rangs). */
  showRank?: boolean
}>()

const { isPinned, toggle } = usePins(toRef(props, 'character'))

function craft(c: Craft, recipe: Recipe) {
  const domainId = craftDomainId(c)
  if (domainId) openRollSheet({ domainId, label: `Fabriquer : ${recipe.name}`, recipe, context: 'fiche' })
}
</script>

<template>
  <ul class="recipes">
    <li v-for="{ recipe: r, craft: c } in recipes" :key="r.id" class="recipe">
      <RecipeText :recipe="r" :items="character.items" :rank="showRank ? r.rank : null" />
      <AppIconBtn
        v-if="!readonly"
        :title="isPinned(`recipe:${r.id}`) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        variant="bare"
        :data-testid="`recipe-pin-${r.id}`"
        @click="toggle(`recipe:${r.id}`)"
      >
        <Star :size="16" :class="{ 'recipe-star--on': isPinned(`recipe:${r.id}`) }" />
      </AppIconBtn>
      <AppIconBtn
        v-if="!readonly"
        :title="hasComponents(character.items, r) ? 'Fabriquer' : 'Composants manquants'"
        :disabled="!hasComponents(character.items, r)"
        :data-testid="`craft-${r.id}`"
        @click="craft(c, r)"
      >
        <Dices :size="16" />
      </AppIconBtn>
    </li>
  </ul>
</template>

<style scoped>
.recipes {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.recipe {
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}

.recipe-star--on {
  color: var(--accent);
  fill: currentColor;
}
</style>
