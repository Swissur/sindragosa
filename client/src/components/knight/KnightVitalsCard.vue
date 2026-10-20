<script setup lang="ts">
import { Heart, Sun, Users, Star, Shield, Zap, Swords } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppTooltip from '../ui/AppTooltip.vue'
import { ASPECTS, CARAC_LABELS, DERIVED } from '../../data/knight/aspects'
import { hpGradientColor } from '../../utils/hpGradientColor'
import type { KnightDerived } from '../../utils/knight/sheet'
import type { Character } from '../../types/character'
import type { KnightSheet } from '../../types/knight'

/** Héroïsme : le mode héroïque se déclenche à 6 points. */
const HEROISME_MAX = 6

/** Santé, espoir, contacts, héroïsme et valeurs dérivées d'un chevalier (plans/43). */
defineProps<{
  character: Character
  sheet: KnightSheet
  derived: KnightDerived
  editing?: boolean
  readonly?: boolean
}>()

const caracsOf = (aspect: string) => ASPECTS.find((a) => a.id === aspect)!.caracs
</script>

<template>
  <AppCard class="vitals">
    <div class="vital">
      <span class="vital-label">
        <Heart :size="15" /> Santé
        <AppTooltip label="Calcul de la santé max">
          <template #trigger><span class="vital-help">?</span></template>
          10 + 6 × {{ CARAC_LABELS[sheet.derived.sante] }} ({{ sheet.carac[sheet.derived.sante] }}).
        </AppTooltip>
      </span>
      <AppStepper v-if="!readonly" v-model="character.hpCurrent" :max="derived.santeMax" label="Points de santé" testid="hp">
        <span :style="{ color: hpGradientColor(character.hpCurrent, derived.santeMax) }" data-testid="hp-current">{{ character.hpCurrent }}</span>
        <span class="vital-max">/{{ derived.santeMax }}</span>
      </AppStepper>
      <span v-else class="vital-value vital-value--static">{{ character.hpCurrent }}<span class="vital-max">/{{ derived.santeMax }}</span></span>
    </div>

    <div class="vital">
      <span class="vital-label"><Sun :size="15" /> Espoir</span>
      <AppStepper v-if="!readonly" v-model="sheet.espoir.current" :max="sheet.espoir.max" label="Points d'espoir" testid="espoir">
        <span data-testid="espoir-current">{{ sheet.espoir.current }}</span>
        <span class="vital-max">/{{ sheet.espoir.max }}</span>
      </AppStepper>
      <span v-else class="vital-value vital-value--static">{{ sheet.espoir.current }}<span class="vital-max">/{{ sheet.espoir.max }}</span></span>
    </div>

    <div v-if="editing && !readonly" class="vital">
      <span class="vital-label">Espoir max</span>
      <AppStepper v-model="sheet.espoir.max" label="Espoir max" testid="espoir-max" />
    </div>

    <div class="vital">
      <span class="vital-label">
        <Users :size="15" /> Contacts
        <AppTooltip label="Calcul des contacts">
          <template #trigger><span class="vital-help">?</span></template>
          {{ CARAC_LABELS[sheet.derived.contacts] }} ({{ derived.contactsMax }}). Reviennent au max entre deux missions.
        </AppTooltip>
      </span>
      <AppStepper v-if="!readonly" v-model="sheet.contacts" :max="derived.contactsMax" label="Contacts" testid="contacts">
        <span>{{ sheet.contacts }}</span>
        <span class="vital-max">/{{ derived.contactsMax }}</span>
      </AppStepper>
      <span v-else class="vital-value vital-value--static">{{ sheet.contacts }}<span class="vital-max">/{{ derived.contactsMax }}</span></span>
    </div>

    <div class="vital">
      <span class="vital-label"><Star :size="15" /> Héroïsme</span>
      <AppStepper v-if="!readonly" v-model="sheet.heroisme" :max="HEROISME_MAX" label="Points d'héroïsme" testid="heroisme" />
      <span v-else class="vital-value vital-value--static">{{ sheet.heroisme }}</span>
    </div>

    <div class="derived">
      <div class="derived-item" data-testid="knight-defense">
        <Shield :size="15" />
        <span class="derived-label">Défense</span>
        <strong>{{ derived.defense }}</strong>
      </div>
      <div class="derived-item" data-testid="knight-reaction">
        <Swords :size="15" />
        <span class="derived-label">Réaction</span>
        <strong>{{ derived.reaction }}</strong>
      </div>
      <div class="derived-item" data-testid="initiative">
        <Zap :size="15" />
        <span class="derived-label">Initiative</span>
        <strong>{{ derived.initiative }}</strong>
      </div>
    </div>

    <template v-if="editing && !readonly">
      <p class="derived-hint">Carac de référence de chaque valeur dérivée :</p>
      <label v-for="d in DERIVED" :key="d.id" class="vital">
        <span class="vital-label">{{ d.label }}</span>
        <AppSelect v-model="sheet.derived[d.id]" class="derived-select" :data-testid="`derived-${d.id}`">
          <option v-for="c in caracsOf(d.aspect)" :key="c" :value="c">{{ CARAC_LABELS[c] }} ({{ sheet.carac[c] }})</option>
        </AppSelect>
      </label>
      <div class="vital">
        <span class="vital-label">Points de gloire</span>
        <AppStepper v-model="sheet.pg" label="Points de gloire" testid="pg" />
      </div>
      <div class="vital">
        <span class="vital-label">Expérience</span>
        <AppStepper v-model="sheet.px" label="Points d'expérience" testid="px" />
      </div>
    </template>
    <p v-else class="derived-hint">{{ sheet.pg }} PG · {{ sheet.px }} PX</p>
  </AppCard>
</template>

<style scoped>
.vitals {
  --vital-value-width: 3.6rem;
}

.vitals :deep(.stepper-value) {
  min-width: var(--vital-value-width);
}

.vital {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  min-height: 40px;
}

.vital-value--static {
  width: calc(2 * 34px + 2 * var(--space-xs) + var(--vital-value-width));
  text-align: center;
}

.vital-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 600;
  color: var(--accent-strong);
}

.vital-max {
  color: var(--muted);
  font-size: 0.85em;
}

.vital-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background: var(--surface-3);
  color: var(--muted);
  font-size: 0.7rem;
  font-weight: 700;
}

.derived {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-xs);
  padding-top: var(--space-xs);
}

.derived-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: var(--space-xs);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--muted);
}

.derived-item strong {
  font-size: 1.25rem;
  color: var(--accent-strong);
}

.derived-label {
  font-size: 0.75rem;
  font-weight: 700;
}

.derived-hint {
  margin: var(--space-xs) 0 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.derived-select {
  max-width: 11rem;
}
</style>
