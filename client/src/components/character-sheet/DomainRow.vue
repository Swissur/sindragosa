<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, Plus, Trash2, Star } from 'lucide-vue-next'
import AppTickGauge from '../ui/AppTickGauge.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppButton from '../ui/AppButton.vue'
import { openRollSheet } from '../../composables/useRollSheet'
import { removeWithUndo } from '../../composables/useUndoRemove'
import { addSpecialty } from '../../utils/sindragosa/sheet'
import { canAddSpecialty, MAX_DOMAIN_RANK, MAX_SPECIALTY_LEVEL, TICKS_PER_SPECIALTY_LEVEL, ticksForRank } from '../../utils/sindragosa/progression'
import { SPECIALTY_LEVEL_LABELS } from '../../utils/sindragosa/rollSetup'
import type { Domain } from '../../data/sindragosa/domains'
import type { Character } from '../../types/character'

/**
 * Un domaine : taper la ligne ouvre le jet, le chevron déplie les spécialités
 * (au plus autant que le rang du domaine).
 */
const props = defineProps<{
  character: Character
  domain: Domain
  editing?: boolean
  readonly?: boolean
  /** Favori dans « Mes actions ». Absent = pas de bouton (fiche d'un autre joueur). */
  pinned?: boolean
}>()

const emit = defineEmits<{ (e: 'toggle-pin'): void }>()

const expanded = ref(false)
const newName = ref('')

const progress = computed(() => props.character.domains[props.domain.id] ?? { rank: 0, ticks: 0 })
const specialties = computed(() => props.character.specialties.filter((s) => s.domainId === props.domain.id))
const canAdd = computed(() => canAddSpecialty(progress.value.rank, specialties.value.length))
const suggestions = computed(() =>
  props.domain.specialties.filter((n) => !specialties.value.some((s) => s.name === n)),
)

function roll(specialtyId?: string) {
  if (props.readonly) return
  openRollSheet({ domainId: props.domain.id, specialtyId, context: 'fiche' })
}

function add(name: string) {
  const next = addSpecialty(props.character, props.domain.id, name, crypto.randomUUID())
  if (!next) return
  props.character.specialties = next.specialties
  newName.value = ''
}

function remove(id: string) {
  const i = props.character.specialties.findIndex((s) => s.id === id)
  const s = props.character.specialties[i]
  if (s) removeWithUndo(props.character.specialties, i, s.name)
}
</script>

<template>
  <div class="domain" :data-testid="`domain-${domain.id}`">
    <div class="domain-line">
      <button type="button" class="domain-main" :disabled="readonly" :data-testid="`domain-roll-${domain.id}`" @click="roll()">
        <span class="domain-name">{{ domain.label }}</span>
        <AppTickGauge
          :rank="progress.rank"
          :ticks="progress.ticks"
          :total="ticksForRank(progress.rank + 1)"
          :maxed="progress.rank >= MAX_DOMAIN_RANK"
        />
      </button>
      <AppIconBtn
        v-if="pinned !== undefined"
        :title="pinned ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        :data-testid="`domain-pin-${domain.id}`"
        @click="emit('toggle-pin')"
      >
        <Star :size="16" :class="{ 'domain-star--on': pinned }" />
      </AppIconBtn>
      <AppIconBtn
        :title="expanded ? 'Replier' : 'Spécialités'"
        :data-testid="`domain-expand-${domain.id}`"
        @click="expanded = !expanded"
      >
        <ChevronDown :size="16" class="domain-chevron" :class="{ 'domain-chevron--open': expanded }" />
      </AppIconBtn>
    </div>

    <div v-if="expanded" class="domain-detail">
      <p v-if="!specialties.length && !canAdd" class="domain-hint">
        Une spécialité par rang : monte ce domaine pour en choisir une.
      </p>
      <div v-for="s in specialties" :key="s.id" class="specialty" data-testid="specialty-row">
        <button type="button" class="specialty-main" :disabled="readonly" @click="roll(s.id)">
          <span class="specialty-name">{{ s.name }}</span>
          <AppTickGauge
            :rank="SPECIALTY_LEVEL_LABELS[s.level]"
            :ticks="s.ticks"
            :total="TICKS_PER_SPECIALTY_LEVEL"
            :maxed="s.level >= MAX_SPECIALTY_LEVEL"
          />
        </button>
        <AppIconBtn v-if="editing && !readonly" variant="danger" title="Supprimer" @click="remove(s.id)">
          <Trash2 :size="16" />
        </AppIconBtn>
      </div>

      <div v-if="canAdd && !readonly" class="specialty-add">
        <div class="specialty-suggestions">
          <AppButton v-for="n in suggestions" :key="n" size="small" @click="add(n)">{{ n }}</AppButton>
        </div>
        <div class="specialty-free">
          <AppInput v-model="newName" placeholder="Autre spécialité" class="specialty-input" data-testid="specialty-input" />
          <AppIconBtn variant="primary" title="Ajouter" :disabled="!newName.trim()" data-testid="specialty-add" @click="add(newName)">
            <Plus :size="16" />
          </AppIconBtn>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.domain-line,
.specialty {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.domain-main,
.specialty-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.domain-main:hover:not(:disabled),
.specialty-main:hover:not(:disabled) {
  background: var(--surface-2);
}

.domain-main:disabled,
.specialty-main:disabled {
  cursor: default;
}

.domain-name,
.specialty-name {
  flex: 1;
  min-width: 0;
}

.domain-name {
  font-weight: 600;
}

.domain-star--on {
  color: var(--accent);
  fill: currentColor;
}

.domain-chevron {
  transition: transform 0.15s;
}

.domain-chevron--open {
  transform: rotate(180deg);
}

.domain-detail {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  margin-left: var(--space-md);
  padding-left: var(--space-sm);
  border-left: 2px solid var(--border);
}

.domain-hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
}

.specialty-name {
  font-size: 0.92rem;
}

.specialty-add {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.specialty-suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.specialty-free {
  display: flex;
  gap: var(--space-xs);
}

.specialty-input {
  flex: 1;
}
</style>
