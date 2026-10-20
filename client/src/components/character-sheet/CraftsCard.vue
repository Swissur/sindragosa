<script setup lang="ts">
import { computed, ref } from 'vue'
import { Hammer, Plus, Trash2 } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import RecipeList from './RecipeList.vue'
import { CRAFTS } from '../../data/sindragosa/crafts'
import { recipesFor } from '../../utils/sindragosa/crafting'
import { showToast } from '../../composables/useToast'
import type { Character } from '../../types/character'

/** Métiers connus et leurs recettes. Fabriquer = composants + jet du domaine du métier. */
const props = defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()

const toAdd = ref('')

const known = computed(() =>
  CRAFTS.filter((c) => c.id in props.character.crafts).map((c) => ({
    craft: c,
    rank: props.character.crafts[c.id],
    recipes: recipesFor(c.id, props.character.crafts[c.id], props.character.recipeGrants).map((recipe) => ({ recipe, craft: c })),
  })),
)

const available = computed(() => CRAFTS.filter((c) => !(c.id in props.character.crafts)))

function add() {
  if (!toAdd.value) return
  props.character.crafts = { ...props.character.crafts, [toAdd.value]: 1 }
  toAdd.value = ''
}

function remove(id: string, label: string) {
  const rank = props.character.crafts[id]
  const { [id]: _removed, ...rest } = props.character.crafts
  props.character.crafts = rest
  showToast(`${label} supprimé`, {
    actionLabel: 'Annuler',
    onAction: () => { props.character.crafts = { ...props.character.crafts, [id]: rank } },
  })
}
</script>

<template>
  <AppCard v-if="known.length || (editing && !readonly)" title="Artisanat">
    <AppAccordion
      v-for="k in known"
      :key="k.craft.id"
      :title="k.craft.label"
      :hint="k.craft.kind === 'base' ? `rang ${k.rank}` : 'hybride'"
    >
      <template #icon><Hammer :size="15" /></template>
      <div v-if="editing && !readonly" class="craft-edit">
        <AppStepper
          v-if="k.craft.kind === 'base'"
          v-model="character.crafts[k.craft.id]"
          :min="1"
          :max="5"
          label="Rang du métier"
        />
        <AppIconBtn variant="danger" title="Oublier ce métier" @click="remove(k.craft.id, k.craft.label)">
          <Trash2 :size="16" />
        </AppIconBtn>
      </div>
      <RecipeList :character="character" :recipes="k.recipes" :readonly="readonly" />
    </AppAccordion>

    <div v-if="editing && !readonly" class="craft-add">
      <AppSelect v-model="toAdd" class="craft-add-select">
        <option value="">Apprendre un métier…</option>
        <option v-for="c in available" :key="c.id" :value="c.id">{{ c.label }}</option>
      </AppSelect>
      <AppIconBtn variant="primary" title="Ajouter" :disabled="!toAdd" @click="add">
        <Plus :size="16" />
      </AppIconBtn>
    </div>
  </AppCard>
</template>

<style scoped>
.craft-edit {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-sm);
}

.craft-add {
  display: flex;
  gap: var(--space-xs);
  margin-top: var(--space-sm);
}

.craft-add-select {
  flex: 1;
}
</style>
