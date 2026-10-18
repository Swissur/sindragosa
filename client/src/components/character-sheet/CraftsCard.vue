<script setup lang="ts">
import { computed, ref } from 'vue'
import { Hammer, Plus, Trash2, Dices } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { CRAFTS, RECIPES } from '../../data/sindragosa/crafts'
import { craftDomainId, recipesFor } from '../../utils/sindragosa/crafting'
import { openRollSheet } from '../../composables/useRollSheet'
import { showToast } from '../../composables/useToast'
import type { Character } from '../../types/character'

/** Métiers connus et leurs recettes. Fabriquer = composants + jet du domaine du métier. */
const props = defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()

const toAdd = ref('')

const known = computed(() =>
  CRAFTS.filter((c) => c.id in props.character.crafts).map((c) => ({
    craft: c,
    rank: props.character.crafts[c.id],
    recipes: recipesFor(c.id, props.character.crafts[c.id]),
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

function craft(craftId: string, recipeName: string) {
  const c = CRAFTS.find((x) => x.id === craftId)
  const domainId = c && craftDomainId(c)
  const recipe = RECIPES.find((r) => r.craft === craftId && r.name === recipeName)
  if (domainId) openRollSheet({ domainId, label: `Fabriquer : ${recipeName}`, recipe, context: 'fiche' })
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
      <ul class="recipes">
        <li v-for="r in k.recipes" :key="r.id" class="recipe">
          <div class="recipe-text">
            <strong>{{ r.name }}<template v-if="r.batch"> (×{{ r.batch }})</template></strong>
            <span class="recipe-components">
              {{ r.components.map((x) => `${x.qty} ${x.name}`).join(', ') }}
            </span>
            <span class="recipe-effect">{{ r.effect }}</span>
          </div>
          <AppIconBtn v-if="!readonly" title="Fabriquer" @click="craft(k.craft.id, r.name)">
            <Dices :size="16" />
          </AppIconBtn>
        </li>
      </ul>
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

.recipe-components {
  color: var(--muted);
  font-size: 0.8rem;
}

.recipe-effect {
  font-size: 0.82rem;
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
