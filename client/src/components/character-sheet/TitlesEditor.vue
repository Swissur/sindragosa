<script setup lang="ts">
import { computed, ref } from 'vue'
import { Award, Plus, X } from 'lucide-vue-next'
import AppBadge from '../ui/AppBadge.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import { TITLES } from '../../data/sindragosa/titles'
import type { Character } from '../../types/character'

/** Mode MJ : les titres du joueur, retirables, et la liste pour en accorder un (ou en écrire un autre). */
const props = defineProps<{ character: Character }>()

/** Un titre de la liste, ou OTHER_TITLE pour en écrire un autre. */
const choice = ref('')
const custom = ref('')
const OTHER_TITLE = '__autre'
const available = computed(() => TITLES.filter((t) => !props.character.titles.includes(t)))
const toAdd = computed(() => (choice.value === OTHER_TITLE ? custom.value.trim() : choice.value))

function add() {
  const t = toAdd.value
  if (!t || props.character.titles.includes(t)) return
  props.character.titles = [...props.character.titles, t]
  choice.value = ''
  custom.value = ''
}

function remove(t: string) {
  props.character.titles = props.character.titles.filter((x) => x !== t)
}
</script>

<template>
  <div class="titles" data-testid="gm-titles">
    <p v-if="character.titles.length" class="titles-list">
      <AppBadge v-for="t in character.titles" :key="t" variant="active" data-testid="title">
        <Award :size="12" /> {{ t }}
        <button type="button" class="titles-remove" :title="`Retirer ${t}`" @click="remove(t)">
          <X :size="12" />
        </button>
      </AppBadge>
    </p>
    <div class="titles-line">
      <AppSelect v-model="choice" class="titles-grow" data-testid="gm-title-select">
        <option value="">Accorder un titre…</option>
        <option v-for="t in available" :key="t" :value="t">{{ t }}</option>
        <option :value="OTHER_TITLE">Autre titre…</option>
      </AppSelect>
      <AppIconBtn variant="primary" title="Accorder le titre" :disabled="!toAdd" data-testid="gm-title-add" @click="add">
        <Plus :size="16" />
      </AppIconBtn>
    </div>
    <AppInput v-if="choice === OTHER_TITLE" v-model="custom" placeholder="Nom du titre" data-testid="gm-title-input" />
  </div>
</template>

<style scoped>
.titles {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.titles-list {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.titles-line {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.titles-grow {
  flex: 1;
  min-width: 0;
}

.titles-remove {
  display: inline-flex;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
}
</style>
