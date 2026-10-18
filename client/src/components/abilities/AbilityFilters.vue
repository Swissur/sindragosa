<script setup lang="ts">
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import { ACTION_TYPES } from './actionTypes'
import type { ActionType } from '../../data/sindragosa/types'

/** Recherche et type d'action, au-dessus d'une liste de compétences. Slot : filtres en plus. */
const search = defineModel<string>('search', { required: true })
const actionType = defineModel<ActionType | ''>('actionType', { required: true })
</script>

<template>
  <div class="filters">
    <AppInput v-model="search" placeholder="Chercher une compétence" data-testid="abilities-search" />
    <div class="filters-line">
      <slot />
      <AppSelect v-model="actionType" class="filters-type" data-testid="abilities-type">
        <option value="">Tous les types</option>
        <option v-for="(meta, id) in ACTION_TYPES" :key="id" :value="id">{{ meta.label }}</option>
      </AppSelect>
    </div>
  </div>
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

.filters-type {
  flex: 1;
  min-width: 0;
}
</style>
