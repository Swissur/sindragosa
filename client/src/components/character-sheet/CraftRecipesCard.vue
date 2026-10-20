<script setup lang="ts">
import { computed, ref } from 'vue'
import { Hammer, PackageCheck } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import RecipeList from './RecipeList.vue'
import { advancedDomainById, domainById } from '../../data/sindragosa/domains'
import { CRAFTS } from '../../data/sindragosa/crafts'
import { recipesByDomain } from '../../utils/sindragosa/crafting'
import { isFilteringRecipes, matchesRecipeFilter } from '../../utils/sindragosa/recipeFilter'
import type { Character } from '../../types/character'

/** Tous les patrons des métiers maîtrisés, rangés par domaine lié (celui du jet de fabrication) ; un artisanat avancé est son propre domaine. */
const props = defineProps<{ character: Character; crafts: Record<string, number> }>()

const search = ref('')
const craftId = ref('')
const rank = ref(0)
/** '' ou 'craftable' : AppToggleGroup travaille en chaîne. */
const craftable = ref('')
const CRAFTABLE_ITEMS: AppToggleItem[] = [
  { value: 'craftable', icon: PackageCheck, title: 'Fabricables (composants en poche)', testid: 'patrons-craftable' },
]

const knownCrafts = computed(() => CRAFTS.filter((c) => c.id in props.crafts))
const filter = computed(() => ({ search: search.value, craftId: craftId.value, rank: rank.value, craftable: craftable.value === 'craftable' }))
const filtering = computed(() => isFilteringRecipes(filter.value))

const groups = computed(() => recipesByDomain(props.crafts, props.character.recipeGrants)
  .map((g) => ({ ...g, recipes: g.recipes.filter((r) => matchesRecipeFilter(r, props.character.items, filter.value)) }))
  .filter((g) => g.recipes.length))
</script>

<template>
  <AppCard title="Patrons">
    <div class="filters">
      <AppInput v-model="search" placeholder="Chercher un patron, un composant…" data-testid="patrons-search" />
      <div class="filters-line">
        <AppToggleGroup v-model="craftable" :items="CRAFTABLE_ITEMS" />
        <AppSelect v-model="craftId" class="filters-craft" data-testid="patrons-craft">
          <option value="">Tous les métiers</option>
          <option v-for="c in knownCrafts" :key="c.id" :value="c.id">{{ c.label }}</option>
        </AppSelect>
        <AppSelect v-model="rank" class="filters-rank" data-testid="patrons-rank">
          <option :value="0">Rangs</option>
          <option v-for="n in 5" :key="n" :value="n">Rang {{ n }}</option>
        </AppSelect>
      </div>
    </div>

    <AppEmptyState v-if="!groups.length">Aucun patron ne correspond.</AppEmptyState>
    <!-- Repliées par défaut ; un filtre ouvre les sections qui ont un résultat
         (la clé change : l'accordéon repart avec son nouvel état par défaut) -->
    <AppAccordion
      v-for="g in groups"
      :key="`${g.domainId}-${filtering}`"
      :default-open="filtering"
      :title="domainById(g.domainId)?.label ?? advancedDomainById(g.domainId)?.label ?? g.domainId"
      :hint="`${g.recipes.length}`"
      :testid="`patrons-${g.domainId}`"
    >
      <template #icon><Hammer :size="15" /></template>
      <RecipeList :character="character" :recipes="g.recipes" show-rank />
    </AppAccordion>
  </AppCard>
</template>

<style scoped>
.filters {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  margin-bottom: var(--space-md);
}

.filters-line {
  display: flex;
  gap: var(--space-sm);
  align-items: center;
}

.filters-craft {
  flex: 1;
  min-width: 0;
}

.filters-rank {
  flex: 0 0 6.5rem;
}
</style>
