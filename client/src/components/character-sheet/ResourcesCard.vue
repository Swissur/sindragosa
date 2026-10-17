<script setup lang="ts">
import { Plus, Trash2 } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppInput from '../ui/AppInput.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { removeWithUndo } from '../../composables/useUndoRemove'
import type { Character } from '../../types/character'

/** Réserves libres (Mana, Rage, Énergie…) : un nom, une valeur, un maximum. */
const props = defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()

function add() {
  props.character.resources.push({ id: crypto.randomUUID(), name: 'Réserve', current: 0, max: 10 })
}
</script>

<template>
  <AppCard v-if="character.resources.length || (editing && !readonly)" title="Réserves">
    <template v-if="editing && !readonly" #titleActions>
      <AppIconBtn title="Ajouter une réserve" data-testid="resource-add" @click="add">
        <Plus :size="16" />
      </AppIconBtn>
    </template>
    <ul class="rows">
      <li v-for="(r, i) in character.resources" :key="r.id" class="row" data-testid="resource-row">
        <template v-if="editing && !readonly">
          <AppInput v-model="r.name" class="row-name" />
          <AppStepper v-model="r.max" :min="1" label="Maximum" />
          <AppIconBtn variant="danger" title="Supprimer" @click="removeWithUndo(character.resources, i, r.name)">
            <Trash2 :size="16" />
          </AppIconBtn>
        </template>
        <template v-else>
          <span class="row-name">{{ r.name }}</span>
          <AppStepper v-if="!readonly" v-model="r.current" :max="r.max" :label="r.name">
            {{ r.current }}<span class="row-max">/{{ r.max }}</span>
          </AppStepper>
          <span v-else>{{ r.current }}/{{ r.max }}</span>
        </template>
      </li>
    </ul>
  </AppCard>
</template>

<style scoped>
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.row-name {
  flex: 1;
  min-width: 0;
  font-weight: 600;
}

.row-max {
  color: var(--muted);
  font-weight: 500;
  font-size: 0.85rem;
}
</style>
