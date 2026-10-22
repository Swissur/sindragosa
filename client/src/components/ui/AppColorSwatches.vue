<script setup lang="ts">
import { Ban } from 'lucide-vue-next'
import { ToggleGroupRoot, ToggleGroupItem } from 'reka-ui'

export interface AppColorSwatch {
  /** Couleur CSS. '' = « pas de couleur » (pastille barrée). */
  value: string
  /** Infobulle + nom accessible */
  label: string
}

defineProps<{
  modelValue: string
  colors: AppColorSwatch[]
  /** Préfixe des data-testid : `<testid>-<hex sans #>`, `<testid>-none`. */
  testid?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

// reka-ui apporte la navigation clavier (flèches) et aria-pressed. Re-cliquer
// la pastille active ne désélectionne rien : une couleur est toujours choisie.
function onUpdate(value: unknown) {
  if (typeof value === 'string') emit('update:modelValue', value)
}
</script>

<template>
  <ToggleGroupRoot
    type="single"
    :model-value="modelValue"
    class="swatches"
    @update:model-value="onUpdate"
  >
    <ToggleGroupItem
      v-for="c in colors"
      :key="c.value"
      :value="c.value"
      :title="c.label"
      :aria-label="c.label"
      :data-testid="testid ? `${testid}-${c.value ? c.value.replace('#', '') : 'none'}` : undefined"
      class="swatch"
      :style="c.value ? { background: c.value } : undefined"
    >
      <Ban v-if="!c.value" :size="18" aria-hidden="true" />
    </ToggleGroupItem>
  </ToggleGroupRoot>
</template>

<style scoped>
.swatches {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-sm);
}

.swatch {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 2px solid var(--surface);
  border-radius: 50%;
  background: var(--surface-2);
  color: var(--muted);
  box-shadow: 0 0 0 1px var(--border-strong);
  cursor: pointer;
}

.swatch[data-state='on'] {
  box-shadow: 0 0 0 3px var(--brand);
}
</style>
