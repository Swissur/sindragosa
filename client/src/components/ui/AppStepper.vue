<script setup lang="ts">
import { Minus, Plus } from 'lucide-vue-next'
import AppIconBtn from './AppIconBtn.vue'

/**
 * − valeur + : PV, chance, réserves, monnaie, caracs.
 * La valeur reste entre `min` et `max` ; `max` absent = pas de plafond.
 */
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
  /** Nom lu par les lecteurs d'écran et préfixe des testids (`<testid>-minus`…). */
  label: string
  testid?: string
  disabled?: boolean
}>(), { min: 0, max: undefined, testid: undefined })

const emit = defineEmits<{ (e: 'update:modelValue', value: number): void }>()

function step(delta: number) {
  const next = props.modelValue + delta
  if (next < props.min) return
  if (props.max !== undefined && next > props.max) return
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="stepper" role="group" :aria-label="label">
    <AppIconBtn
      :title="`${label} −1`"
      :disabled="disabled || modelValue <= min"
      :data-testid="testid && `${testid}-minus`"
      @click="step(-1)"
    >
      <Minus :size="16" />
    </AppIconBtn>
    <span class="stepper-value" :data-testid="testid && `${testid}-value`">
      <slot :value="modelValue">{{ modelValue }}</slot>
    </span>
    <AppIconBtn
      :title="`${label} +1`"
      :disabled="disabled || (max !== undefined && modelValue >= max)"
      :data-testid="testid && `${testid}-plus`"
      @click="step(1)"
    >
      <Plus :size="16" />
    </AppIconBtn>
  </div>
</template>

<style scoped>
.stepper {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.stepper-value {
  min-width: 2.2rem;
  text-align: center;
  font-weight: 700;
  font-size: 1.05rem;
  font-variant-numeric: tabular-nums;
}
</style>
