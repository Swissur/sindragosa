<script setup lang="ts">
import { computed, ref } from 'vue'
import { Check, X, Star, Coins, Expand, Flame } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import { ACTION_TYPES } from './actionTypes'
import { isUsed, toggleUse, USES_PER_LABELS } from '../../utils/sindragosa/abilityUses'
import { meetsPrerequisite, prerequisiteLabel } from '../../utils/sindragosa/prerequisites'
import { progressState } from '../../utils/sindragosa/sheet'
import { allowedModes, CONCENTRATION_LABELS, upgradeDiceInText, type ConcentrationMode } from '../../utils/concentration'
import type { Ability } from '../../data/sindragosa/types'
import type { Character } from '../../types/character'

/**
 * Une compétence. Repliée : type d'action, nom, limite d'usage, condition.
 * Dépliée : effet, prérequis ✓/✗, concentration pour les sorts.
 * Verrouillée : grisée, sans bouton — elle montre un objectif.
 */
const props = defineProps<{
  ability: Ability
  /** Absent = catalogue de la page Savoir : ni usage ni ✓/✗. */
  character?: Character | null
  unlocked: boolean
  readonly?: boolean
  /** Absent = pas de bouton d'épingle. */
  pinned?: boolean
  defaultOpen?: boolean
  /** Sans l'icône du type d'action (le trait racial sur la fiche). */
  hideType?: boolean
}>()

const emit = defineEmits<{ (e: 'toggle-pin'): void }>()

const open = ref(props.defaultOpen ?? false)
const concentration = ref<ConcentrationMode | ''>('')

const type = computed(() => ACTION_TYPES[props.ability.actionType])
const used = computed(() => (props.character ? isUsed(props.character, props.ability) : false))
const state = computed(() => (props.character ? progressState(props.character) : null))
const modes = computed(() => (props.unlocked ? allowedModes(props.ability) : []))

const MODE_ICONS = { econome: Coins, etendue: Expand, puissante: Flame } as const
const modeItems = computed<AppToggleItem[]>(() =>
  modes.value.map((m) => ({ value: m, icon: MODE_ICONS[m as keyof typeof MODE_ICONS], title: CONCENTRATION_LABELS[m], testid: `concentration-${m}` })),
)

const effect = computed(() =>
  concentration.value === 'puissante' ? upgradeDiceInText(props.ability.effect) : props.ability.effect,
)

function use() {
  if (props.character) props.character.abilityUses = toggleUse(props.character, props.ability)
}
</script>

<template>
  <article
    class="ability"
    :class="{ 'ability--locked': !unlocked, 'ability--used': used }"
    :data-testid="`ability-${ability.id}`"
  >
    <div class="ability-head">
      <button type="button" class="ability-toggle" :aria-expanded="open" data-testid="ability-toggle" @click="open = !open">
        <component :is="type.icon" v-if="!hideType" :size="16" class="ability-type" :title="type.label" />
        <span class="ability-name">{{ ability.name }}</span>
      </button>
      <button
        v-if="ability.usesPer && unlocked && character"
        type="button"
        class="ability-use"
        :class="{ 'ability-use--spent': used }"
        :disabled="readonly"
        :title="used ? 'Utilisée — taper pour la rendre' : `Utiliser (${USES_PER_LABELS[ability.usesPer]})`"
        :data-testid="`ability-use-${ability.id}`"
        @click="use"
      >
        {{ USES_PER_LABELS[ability.usesPer] }}
      </button>
      <AppIconBtn
        v-if="pinned !== undefined && unlocked"
        variant="bare"
        :title="pinned ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        :data-testid="`ability-pin-${ability.id}`"
        @click="emit('toggle-pin')"
      >
        <Star :size="15" :class="{ 'ability-star--on': pinned }" />
      </AppIconBtn>
    </div>
    <p v-if="ability.condition && ability.condition !== '—'" class="ability-condition">{{ ability.condition }}</p>

    <div v-if="open" class="ability-body">
      <p class="ability-meta">
        {{ ability.actionLabel }}
        <template v-if="ability.cooldownTurns"> · recharge {{ ability.cooldownTurns }} tours</template>
      </p>
      <AppToggleGroup v-if="modeItems.length" v-model="concentration" :items="modeItems" />
      <p v-if="concentration" class="ability-meta">{{ CONCENTRATION_LABELS[concentration] }}</p>
      <p class="ability-effect" data-testid="ability-effect">{{ effect }}</p>
      <ul v-if="ability.prerequisites.length" class="ability-prereqs">
        <li
          v-for="(p, i) in ability.prerequisites"
          :key="i"
          :class="state && (meetsPrerequisite(state, p) ? 'prereq--ok' : 'prereq--missing')"
        >
          <template v-if="state">
            <Check v-if="meetsPrerequisite(state, p)" :size="13" />
            <X v-else :size="13" />
          </template>
          {{ prerequisiteLabel(p) }}
        </li>
      </ul>
    </div>
  </article>
</template>

<style scoped>
.ability {
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border);
}

.ability:last-child {
  border-bottom: none;
}

.ability--locked {
  opacity: 0.55;
}

.ability-head {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.ability-toggle {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: 0 var(--space-xs);
  border: none;
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.ability-type {
  flex-shrink: 0;
  color: var(--accent);
}

.ability-name {
  font-weight: 600;
}

.ability-use {
  flex-shrink: 0;
  min-height: 32px;
  padding: 0 var(--space-sm);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  background: var(--accent-soft);
  color: var(--accent-strong);
  font: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.ability-use--spent {
  background: none;
  border-color: var(--border);
  color: var(--muted);
  text-decoration: line-through;
}

.ability-star--on {
  color: var(--accent);
  fill: currentColor;
}

.ability-condition {
  margin: 0 0 0 calc(16px + var(--space-sm) + var(--space-xs));
  font-size: 0.8rem;
  color: var(--muted);
  font-style: italic;
}

.ability-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-xs) var(--space-sm);
}

.ability-meta {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.ability-effect {
  margin: 0;
  font-size: 0.9rem;
}

.ability-prereqs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs) var(--space-sm);
  font-size: 0.8rem;
}

.ability-prereqs li {
  display: inline-flex;
  align-items: center;
  gap: 2px;
}

.prereq--ok {
  color: var(--accent-strong);
}

.prereq--missing {
  color: var(--danger);
}
</style>
