<script setup lang="ts">
import { ShieldHalf, Battery, Hexagon } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppSelect from '../ui/AppSelect.vue'
import { ARMURES } from '../../data/knight/identity'
import type { KnightSheet } from '../../types/knight'

/**
 * La méta-armure (plans/43) : le champ de force se retire des dégâts, puis les
 * points d'armure encaissent, puis la santé. Les valeurs se recopient du profil
 * du modèle, à la main pour l'instant.
 */
defineProps<{ sheet: KnightSheet; editing?: boolean; readonly?: boolean }>()
</script>

<template>
  <AppCard :title="sheet.armure.modele || 'Méta-armure'" class="armor">
    <label v-if="editing && !readonly" class="row">
      <span class="row-label">Modèle</span>
      <AppSelect v-model="sheet.armure.modele" class="armor-select" data-testid="armor-model">
        <option value="">À choisir</option>
        <option v-for="a in ARMURES" :key="a" :value="a">{{ a }}</option>
      </AppSelect>
    </label>

    <div class="row">
      <span class="row-label"><Hexagon :size="15" /> Champ de force</span>
      <AppStepper v-if="editing && !readonly" v-model="sheet.armure.cdf" label="Champ de force" testid="cdf" />
      <strong v-else class="row-value" data-testid="cdf-value">{{ sheet.armure.cdf }}</strong>
    </div>

    <div class="row">
      <span class="row-label"><ShieldHalf :size="15" /> Armure</span>
      <AppStepper v-if="!readonly" v-model="sheet.armure.pa.current" :max="sheet.armure.pa.max" label="Points d'armure" testid="pa">
        <span>{{ sheet.armure.pa.current }}</span>
        <span class="row-max">/{{ sheet.armure.pa.max }}</span>
      </AppStepper>
      <strong v-else class="row-value">{{ sheet.armure.pa.current }}/{{ sheet.armure.pa.max }}</strong>
    </div>
    <div v-if="editing && !readonly" class="row">
      <span class="row-label">Armure max</span>
      <AppStepper v-model="sheet.armure.pa.max" label="Armure max" testid="pa-max" />
    </div>

    <div class="row">
      <span class="row-label"><Battery :size="15" /> Énergie</span>
      <AppStepper v-if="!readonly" v-model="sheet.armure.pe.current" :max="sheet.armure.pe.max" label="Points d'énergie" testid="pe">
        <span>{{ sheet.armure.pe.current }}</span>
        <span class="row-max">/{{ sheet.armure.pe.max }}</span>
      </AppStepper>
      <strong v-else class="row-value">{{ sheet.armure.pe.current }}/{{ sheet.armure.pe.max }}</strong>
    </div>
    <div v-if="editing && !readonly" class="row">
      <span class="row-label">Énergie max</span>
      <AppStepper v-model="sheet.armure.pe.max" label="Énergie max" testid="pe-max" />
    </div>
  </AppCard>
</template>

<style scoped>
.armor {
  --row-value-width: 3.6rem;
}

.armor :deep(.stepper-value) {
  min-width: var(--row-value-width);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  min-height: 40px;
}

.row-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
  font-weight: 600;
  color: var(--accent-strong);
}

.row-value {
  width: calc(2 * 34px + 2 * var(--space-xs) + var(--row-value-width));
  text-align: center;
  font-size: 1.1rem;
}

.row-max {
  color: var(--muted);
  font-size: 0.85em;
}

.armor-select {
  max-width: 14rem;
}
</style>
