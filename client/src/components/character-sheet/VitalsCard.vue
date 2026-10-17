<script setup lang="ts">
import { ref } from 'vue'
import { Heart, Clover, Shield, Zap, FlaskConical } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppTooltip from '../ui/AppTooltip.vue'
import EtatsRow from '../etats/EtatsRow.vue'
import EtatsSheet from '../etats/EtatsSheet.vue'
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

const showEtats = ref(false)
</script>

<template>
  <AppCard class="vitals">
    <div class="vital vital--hp">
      <span class="vital-label"><Heart :size="15" /> PV</span>
      <AppStepper v-if="!readonly" v-model="character.hpCurrent" :max="hpMax" label="Points de vie" testid="hp">
        <span :style="{ color: hpGradientColor(character.hpCurrent, hpMax) }" data-testid="hp-current">{{ character.hpCurrent }}</span>
        <span class="vital-max">/{{ hpMax }}</span>
      </AppStepper>
      <span v-else class="vital-value">{{ character.hpCurrent }}<span class="vital-max">/{{ hpMax }}</span></span>
      <AppTooltip label="Calcul des PV max">
        <template #trigger><span class="vital-help">?</span></template>
        20 + 2 par rang dans un domaine de Force ou d'Endurance (5 pour Résistance physique)
        + 8 par point d'Endurance gagné depuis la création + bonus.
      </AppTooltip>
    </div>

    <div class="vital">
      <span class="vital-label"><Clover :size="15" /> Chance</span>
      <AppStepper v-if="!readonly" v-model="character.pcCurrent" label="Points de chance" testid="luck" />
      <span v-else class="vital-value">{{ character.pcCurrent }}</span>
    </div>

    <div class="vital-row">
      <div class="vital vital--small">
        <span class="vital-label"><Shield :size="15" /> Armure</span>
        <AppStepper v-if="editing && !readonly" v-model="character.armor" label="Armure" testid="armor" />
        <span v-else class="vital-value" data-testid="armor-value">{{ character.armor }}</span>
      </div>
      <div class="vital vital--small">
        <span class="vital-label"><Zap :size="15" /> Initiative</span>
        <span class="vital-value" data-testid="initiative">{{ initiative }}</span>
      </div>
    </div>

    <div v-if="editing && !readonly" class="vital">
      <span class="vital-label">Bonus de PV</span>
      <AppStepper v-model="character.hpBonus" :min="-99" label="Bonus de PV" testid="hp-bonus" />
    </div>

    <div class="vital">
      <EtatsRow :states="character.states" size="sm" />
      <AppIconBtn v-if="!readonly" title="États" data-testid="open-etats" @click="showEtats = true">
        <FlaskConical :size="16" />
      </AppIconBtn>
      <EtatsSheet
        v-if="!readonly"
        v-model="showEtats"
        :name="character.name"
        :states="character.states"
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

.vital-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);
}

.vital-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 600;
  color: var(--accent-strong);
}

.vital--hp .vital-label {
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
