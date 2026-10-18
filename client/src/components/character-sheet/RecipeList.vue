<script setup lang="ts">
import { toRef } from 'vue'
import { Dices, Star } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { componentNeeds, craftDomainId, hasComponents } from '../../utils/sindragosa/crafting'
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
      <div class="recipe-text">
        <strong>{{ r.name }}<template v-if="r.batch"> (×{{ r.batch }})</template></strong>
        <span v-if="showRank && r.rank" class="recipe-rank">Rang {{ r.rank }}</span>
        <span class="recipe-components">
          <span
            v-for="(n, ci) in componentNeeds(character.items, r)"
            :key="ci"
            :class="n.have >= n.qty ? 'component--ok' : 'component--missing'"
          >{{ ci > 0 ? ', ' : '' }}{{ n.have }}/{{ n.qty }} {{ n.name }}</span>
        </span>
        <span class="recipe-effect">{{ r.effect }}</span>
      </div>
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

.recipe-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  font-size: 0.88rem;
}

.recipe-rank {
  color: var(--accent-strong);
  font-size: 0.76rem;
  font-weight: 600;
}

.recipe-components {
  color: var(--muted);
  font-size: 0.8rem;
}

.component--missing {
  color: var(--danger);
}

.recipe-effect {
  font-size: 0.82rem;
}

.recipe-star--on {
  color: var(--accent);
  fill: currentColor;
}
</style>
