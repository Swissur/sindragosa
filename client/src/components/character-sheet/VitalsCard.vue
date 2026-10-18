<script setup lang="ts">
import { Heart, Clover, Shield, Zap, FlaskConical } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppTooltip from '../ui/AppTooltip.vue'
import EtatsTags from '../etats/EtatsTags.vue'
import { hpGradientColor } from '../../utils/hpGradientColor'
import type { Character } from '../../types/character'

/** PV, chance, armure, initiative et états : ce qu'on touche pendant la partie. */
defineProps<{
  character: Character
  hpMax: number
  initiative: number
  editing?: boolean
  readonly?: boolean
}>()
</script>

<template>
  <AppCard class="vitals">
    <div class="vital vital--hp">
      <span class="vital-label">
        <Heart :size="15" /> PV
        <AppTooltip label="Calcul des PV max">
          <template #trigger><span class="vital-help">?</span></template>
          20 + 2 par rang dans un domaine de Force ou d'Endurance (5 pour Résistance physique)
          + 8 par point d'Endurance gagné depuis la création + bonus.
        </AppTooltip>
      </span>
      <AppStepper v-if="!readonly" v-model="character.hpCurrent" :max="hpMax" label="Points de vie" testid="hp">
        <span :style="{ color: hpGradientColor(character.hpCurrent, hpMax) }" data-testid="hp-current">{{ character.hpCurrent }}</span>
        <span class="vital-max">/{{ hpMax }}</span>
      </AppStepper>
      <span v-else class="vital-value vital-value--static">{{ character.hpCurrent }}<span class="vital-max">/{{ hpMax }}</span></span>
    </div>

    <div class="vital">
      <span class="vital-label"><Clover :size="15" /> Chance</span>
      <AppStepper v-if="!readonly" v-model="character.pcCurrent" label="Points de chance" testid="luck" />
      <span v-else class="vital-value vital-value--static">{{ character.pcCurrent }}</span>
    </div>

    <div class="vital">
      <span class="vital-label">
        <Shield :size="15" /> Armure
        <AppTooltip label="Calcul de l'armure">
          <template #trigger><span class="vital-help">?</span></template>
          Armure Physique (AP) = armures équipées dans l'inventaire + bonus des compétences ({{ character.armorBonus }}).
        </AppTooltip>
      </span>
      <span class="vital-value vital-value--static" data-testid="armor-value">{{ character.armor }}</span>
    </div>

    <div class="vital">
      <span class="vital-label">
        <Zap :size="15" /> Initiative
        <AppTooltip label="Calcul de l'initiative">
          <template #trigger><span class="vital-help">?</span></template>
          Agilité ({{ character.stats.agi }}) + Sagesse ({{ character.stats.wis }})
          + rang en Perception &amp; Sens ({{ character.domains['perception-sens']?.rank ?? 0 }}).
        </AppTooltip>
      </span>
      <span class="vital-value vital-value--static" data-testid="initiative">{{ initiative }}</span>
    </div>

    <div v-if="editing && !readonly" class="vital">
      <span class="vital-label">Bonus d'armure (compétences)</span>
      <AppStepper v-model="character.armorBonus" :min="-99" label="Bonus d'armure" testid="armor-bonus" />
    </div>

    <div v-if="editing && !readonly" class="vital">
      <span class="vital-label">Bonus de PV</span>
      <AppStepper v-model="character.hpBonus" :min="-99" label="Bonus de PV" testid="hp-bonus" />
    </div>

    <div class="vital-status">
      <span class="vital-label"><FlaskConical :size="15" /> Statut</span>
      <EtatsTags
        :states="character.states"
        :readonly="readonly"
        @update:states="(states) => (character.states = states)"
      />
    </div>
  </AppCard>
</template>

<style scoped>
.vital {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  min-height: 40px;
}

/* Toutes les valeurs dans une même colonne : celle des compteurs − valeur +,
   dont la valeur prend une largeur fixe (assez pour « 89/91 »). */
.vitals {
  --vital-value-width: 3.6rem;
}

.vitals :deep(.stepper-value) {
  min-width: var(--vital-value-width);
}

.vital-value--static {
  /* 2 boutons de 34px (AppStepper) + 2 gaps + la valeur */
  width: calc(2 * 34px + 2 * var(--space-xs) + var(--vital-value-width));
  text-align: center;
}

.vital-status {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding-top: var(--space-xs);
}

.vital-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 600;
  color: var(--accent-strong);
}

.vital--hp .vital-status {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding-top: var(--space-xs);
}

.vital-label {
  flex: 1;
}

.vital-value {
  font-weight: 700;
  font-size: 1.05rem;
}

.vital-max {
  font-weight: 500;
  color: var(--muted);
  font-size: 0.85rem;
}

.vital-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.3rem;
  height: 1.3rem;
  border-radius: 50%;
  border: 1px solid var(--border-strong);
  color: var(--muted);
  font-size: 0.75rem;
}
</style>
