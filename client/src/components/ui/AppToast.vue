<script setup lang="ts">
import { ref } from 'vue'
import { X, Star } from 'lucide-vue-next'
import AppIconBtn from './AppIconBtn.vue'
import { toasts, dismissToast, type Toast } from '../../composables/useToast'

/** Élément affiché à droite, par toast. Le premier par défaut. */
const selected = ref<Record<number, number>>({})

function current(toast: Toast) {
  return toast.details![selected.value[toast.id] ?? 0]
}

function runAction(toast: Toast) {
  toast.onAction?.()
  dismissToast(toast.id)
}
</script>

<template>
  <Teleport to="body">
    <!-- aria-live : les lecteurs d'ecran annoncent le toast a son apparition -->
    <TransitionGroup
      name="toast"
      tag="div"
      class="toast-stack"
      role="status"
      aria-live="polite"
    >
      <div v-for="toast in toasts" :key="toast.id" class="toast" :class="{ 'toast--details': toast.details?.length }">
        <div class="toast-body">
          <span class="toast-message">{{ toast.message }}</span>
          <div v-if="toast.details?.length" class="toast-details">
            <ul class="toast-list">
              <li v-for="(d, i) in toast.details" :key="i">
                <button
                  type="button"
                  class="toast-item"
                  :class="{ active: (selected[toast.id] ?? 0) === i }"
                  data-testid="toast-detail-item"
                  @click="selected[toast.id] = i"
                >
                  {{ d.label }}
                </button>
              </li>
            </ul>
            <div class="toast-info" data-testid="toast-detail">
              <div class="toast-info-head">
                <strong class="toast-info-title">{{ current(toast).label }}</strong>
                <AppIconBtn
                  v-if="current(toast).pin"
                  variant="bare"
                  :title="current(toast).pin!.isPinned() ? 'Retirer des favoris' : 'Ajouter aux favoris'"
                  data-testid="toast-detail-pin"
                  @click="current(toast).pin!.toggle()"
                >
                  <Star :size="16" :class="{ 'toast-star--on': current(toast).pin!.isPinned() }" />
                </AppIconBtn>
              </div>
              <span v-if="current(toast).meta" class="toast-info-meta">{{ current(toast).meta }}</span>
              <p class="toast-info-text">{{ current(toast).text }}</p>
            </div>
          </div>
        </div>
        <button
          v-if="toast.actionLabel"
          type="button"
          class="toast-action"
          @click="runAction(toast)"
        >
          {{ toast.actionLabel }}
        </button>
        <button type="button" class="toast-close" title="Fermer" aria-label="Fermer" @click="dismissToast(toast.id)">
          <X :size="16" />
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style scoped>
.toast-stack {
  position: fixed;
  bottom: calc(1rem + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  z-index: 1100;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: min(92vw, 560px);
  pointer-events: none;
}

.toast {
  pointer-events: auto;
  box-sizing: border-box;
  width: 100%;
  max-width: 380px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-sm) var(--space-sm) var(--space-md);
  border-radius: var(--radius-lg);
  background: var(--surface-3);
  border: 1px solid var(--border-strong);
  box-shadow: var(--shadow-card);
  color: var(--fg);
  font-size: 0.88rem;
}

.toast--details {
  max-width: none;
}

.toast-body {
  flex: 1;
  min-width: 0;
  align-self: center;
}

/* Liste a gauche, fiche de l'element choisi a droite ; chacune defile seule */
.toast-details {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
  gap: var(--space-sm);
  margin-top: var(--space-xs);
  max-height: 40vh;
}

.toast-list {
  list-style: none;
  margin: 0;
  padding: 0;
  overflow-y: auto;
}

.toast-item {
  display: block;
  width: 100%;
  padding: 0.15rem var(--space-xs);
  border: none;
  border-radius: var(--radius-xs);
  background: none;
  font: inherit;
  font-size: 0.82rem;
  text-align: left;
  color: var(--accent-strong);
  text-decoration: underline;
  cursor: pointer;
}

.toast-item.active {
  background: var(--accent-soft);
  font-weight: 700;
  text-decoration: none;
}

.toast-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  overflow-y: auto;
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}

.toast-info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-xs);
}

.toast-star--on {
  color: var(--accent);
  fill: currentColor;
}

.toast-info-title {
  font-family: var(--title-font);
  color: var(--accent-strong);
}

.toast-info-meta {
  font-size: 0.75rem;
  color: var(--muted);
}

.toast-info-text {
  margin: 0;
  font-size: 0.8rem;
  white-space: pre-wrap;
}

.toast-close {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 1.6rem;
  height: 1.6rem;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: none;
  color: var(--muted);
  cursor: pointer;
}

.toast-close:hover {
  background: var(--surface-2);
  color: var(--text);
}

.toast-action {
  background: none;
  border: none;
  padding: 0.2rem 0.4rem;
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--accent-strong);
  cursor: pointer;
  white-space: nowrap;
}

.toast-enter-active,
.toast-leave-active {
  transition: opacity 180ms ease, transform 180ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
