<script setup lang="ts">
import { computed, ref } from 'vue'
import { Hammer, Unlock, Check, Lock } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppBadge from '../ui/AppBadge.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import RecipeText from '../character-sheet/RecipeText.vue'
import { CRAFTS } from '../../data/sindragosa/crafts'
import { effectiveCrafts } from '../../utils/sindragosa/crafting'
import { catalogRecipes, isFilteringCatalog, isKnownRecipe, matchesCatalogFilter, toggleRecipeGrant, type CatalogRecipe } from '../../utils/sindragosa/recipeCatalog'
import type { Character } from '../../types/character'

/**
 * Tous les patrons de tous les métiers, pour le MJ : recherche, métier, rang.
 * Avec un personnage : ✓ / verrou sur chaque patron et un filtre « connus ».
 * En mode MJ (`gm`), taper ✓ / verrou fait oublier ou apprend le patron.
 */
const props = defineProps<{ character?: Character | null; gm?: boolean; knownFirst?: boolean }>()

const ALL = catalogRecipes()
const BASE_CRAFTS = CRAFTS.filter((c) => c.kind === 'base')
const HYBRID_CRAFTS = CRAFTS.filter((c) => c.kind === 'hybrid')

const search = ref('')
const craftId = ref('')
const rank = ref(0)
/** '' ou 'known' : AppToggleGroup travaille en chaîne. */
const knownOnly = ref(props.knownFirst ? 'known' : '')
const KNOWN_ITEMS: AppToggleItem[] = [
  { value: 'known', icon: Unlock, title: 'Patrons connus', testid: 'savoir-patrons-known' },
]

const known = computed(() => {
  const c = props.character
  return c ? effectiveCrafts(c.crafts, c.domains, c.advancedDomains) : null
})
const filter = computed(() => ({
  search: search.value,
  craftId: craftId.value,
  rank: rank.value,
  known: knownOnly.value === 'known' ? known.value : null,
  grants: props.character?.recipeGrants,
}))

const knows = (e: CatalogRecipe) => !!known.value && isKnownRecipe(e, known.value, props.character?.recipeGrants)

function toggle(e: CatalogRecipe) {
  const c = props.character
  if (c && known.value) c.recipeGrants = toggleRecipeGrant(c.recipeGrants, e, known.value)
}
const filtering = computed(() => isFilteringCatalog(filter.value))

const groups = computed(() => CRAFTS
  .map((craft) => ({ craft, entries: ALL.filter((e) => e.craft.id === craft.id && matchesCatalogFilter(e, filter.value)) }))
  .filter((g) => g.entries.length))
</script>

<template>
  <AppCard>
    <div class="filters">
      <AppInput v-model="search" placeholder="Chercher un patron, un composant…" data-testid="savoir-patrons-search" />
      <div class="filters-line">
        <AppToggleGroup v-if="character" v-model="knownOnly" :items="KNOWN_ITEMS" />
        <AppSelect v-model="craftId" class="filters-grow" data-testid="savoir-patrons-craft">
          <option value="">Tous les métiers</option>
          <optgroup label="Métiers de base">
            <option v-for="c in BASE_CRAFTS" :key="c.id" :value="c.id">{{ c.label }}</option>
          </optgroup>
          <optgroup label="Artisanats avancés">
            <option v-for="c in HYBRID_CRAFTS" :key="c.id" :value="c.id">{{ c.label }}</option>
          </optgroup>
        </AppSelect>
        <AppSelect v-model="rank" class="filters-rank" data-testid="savoir-patrons-rank">
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
      :key="`${g.craft.id}-${filtering}`"
      :default-open="filtering"
      :title="g.craft.label"
      :hint="`${g.entries.length}`"
      :testid="`savoir-patrons-${g.craft.id}`"
    >
      <template #icon><Hammer :size="15" /></template>
      <p class="craft-basis">{{ g.craft.basis }} — {{ g.craft.summary }}</p>
      <ul class="recipes">
        <li
          v-for="e in g.entries"
          :key="e.recipe.id"
          class="recipe"
          :class="{ 'recipe--locked': known && !knows(e) }"
        >
          <AppIconBtn
            v-if="gm"
            variant="bare"
            :title="knows(e) ? 'Faire oublier ce patron' : 'Apprendre ce patron'"
            :data-testid="`gm-recipe-${e.recipe.id}`"
            @click="toggle(e)"
          >
            <Check v-if="knows(e)" :size="16" class="ok" />
            <Lock v-else :size="16" />
          </AppIconBtn>
          <template v-else-if="known">
            <Check v-if="knows(e)" :size="15" class="ok" />
            <Lock v-else :size="15" />
          </template>
          <div class="recipe-body">
            <AppBadge v-if="character?.recipeGrants[e.recipe.id] === true" variant="active">bonus du MJ</AppBadge>
            <AppBadge v-else-if="character?.recipeGrants[e.recipe.id] === false" variant="attaque">oublié</AppBadge>
            <RecipeText :recipe="e.recipe" :rank="e.rank" />
          </div>
        </li>
      </ul>
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

.filters-grow {
  flex: 1;
  min-width: 0;
}

.filters-rank {
  flex: 0 0 6.5rem;
}

.craft-basis {
  margin: 0 0 var(--space-sm);
  font-size: 0.78rem;
  color: var(--muted);
}

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
  gap: var(--space-xs);
}

.recipe-body {
  flex: 1;
  min-width: 0;
}

.recipe--locked {
  opacity: 0.55;
}

.ok {
  color: var(--accent-strong);
}
</style>
