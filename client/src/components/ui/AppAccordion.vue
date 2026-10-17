<script setup lang="ts">
import { CollapsibleRoot, CollapsibleTrigger, CollapsibleContent } from 'reka-ui'
import { ChevronDown } from 'lucide-vue-next'

/**
 * Section repliable : un en-tête cliquable, un contenu.
 * `v-model:open` pour piloter l'état, sinon `defaultOpen`.
 */
defineProps<{
  title: string
  /** Texte discret à droite du titre (un compte, un résumé). */
  hint?: string
  defaultOpen?: boolean
  testid?: string
}>()

const open = defineModel<boolean | undefined>('open', { default: undefined })
</script>

<template>
  <CollapsibleRoot v-model:open="open" :default-open="defaultOpen" class="accordion">
    <CollapsibleTrigger class="accordion-head" :data-testid="testid">
      <span class="accordion-title">
        <slot name="icon" />
        {{ title }}
      </span>
      <span v-if="hint" class="accordion-hint">{{ hint }}</span>
      <ChevronDown :size="16" class="accordion-chevron" aria-hidden="true" />
    </CollapsibleTrigger>
    <CollapsibleContent class="accordion-body">
      <slot />
    </CollapsibleContent>
  </CollapsibleRoot>
</template>

<style scoped>
.accordion {
  border-bottom: 1px solid var(--border);
}

.accordion:last-child {
  border-bottom: none;
}

.accordion-head {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  width: 100%;
  min-height: 40px;
  padding: var(--space-xs) 0;
  background: none;
  border: none;
  color: var(--text);
  cursor: pointer;
  font: inherit;
  text-align: left;
}

.accordion-title {
  flex: 1;
  display: inline-flex;
  align-items: center;
  gap: var(--space-sm);
  font-family: var(--title-font);
  font-weight: 600;
  color: var(--accent-strong);
}

.accordion-hint {
  font-size: 0.8rem;
  color: var(--muted);
}

.accordion-chevron {
  color: var(--muted);
  transition: transform 0.15s;
}

.accordion-head[data-state='open'] .accordion-chevron {
  transform: rotate(180deg);
}

.accordion-body {
  padding-bottom: var(--space-sm);
}
</style>
