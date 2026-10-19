<script setup lang="ts">
import { CheckboxRoot, CheckboxIndicator } from 'reka-ui'
import { Check } from 'lucide-vue-next'

defineProps<{
  modelValue: boolean
  disabled?: boolean
  testid?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

// La case et son libellé forment un seul <label> : toute la ligne est tapable.
</script>

<template>
  <label class="app-checkbox" :data-disabled="disabled || undefined">
    <CheckboxRoot
      :model-value="modelValue"
      :disabled="disabled"
      :data-testid="testid"
      class="box"
      @update:model-value="emit('update:modelValue', $event === true)"
    >
      <CheckboxIndicator class="mark">
        <Check :size="16" :stroke-width="3" aria-hidden="true" />
      </CheckboxIndicator>
    </CheckboxRoot>
    <span class="text"><slot /></span>
  </label>
</template>

<style scoped>
.app-checkbox {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  cursor: pointer;
}

.app-checkbox[data-disabled] {
  opacity: 0.5;
  cursor: default;
}

.box {
  flex: none;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  border: 2px solid var(--border-strong);
  border-radius: var(--radius-xs);
  background: var(--surface);
  color: var(--on-brand);
  cursor: inherit;
  transition: background 150ms ease, border-color 150ms ease;
}

.box[data-state='checked'] {
  background: var(--brand);
  border-color: var(--brand);
}

.mark {
  display: flex;
}

.text {
  line-height: 1.3;
}
</style>
