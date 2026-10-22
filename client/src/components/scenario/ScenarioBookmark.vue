<script setup lang="ts">
import { Flag } from 'lucide-vue-next'

// La ligne rouge « on en est là » : la page s'ouvre dessus (plans/47).
</script>

<template>
  <div class="bookmark" data-testid="scenario-bookmark" role="separator" aria-label="On en est là">
    <span class="bookmark-line" />
    <span class="bookmark-tag"><Flag :size="13" fill="currentColor" /> On en est là</span>
    <span class="bookmark-line" />
  </div>
</template>

<style scoped>
.bookmark {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--danger);
  scroll-margin-top: 30vh;
}

.bookmark-line {
  flex: 1;
  height: 3px;
  border-radius: var(--radius-pill);
  background: var(--danger);
}

.bookmark-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-family: var(--title-font);
  font-size: 0.82rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
}
</style>
