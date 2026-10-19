<script setup lang="ts">
defineProps<{
  title?: string
}>()

// `border-solid` est obligatoire : sans le preflight Tailwind, border-style
// vaut `none` par defaut et la bordure serait invisible.
const CARD =
  'block bg-card border border-solid border-[var(--border-strong)] rounded-xl ' +
  'p-[var(--space-md)] mb-[var(--space-md)] shadow-[var(--shadow-card)]'

// Grille 1fr / auto / 1fr : le titre reste centre sur la carte, avec ou sans
// boutons a droite.
const CARD_HEAD =
  'grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center ' +
  'mb-[var(--space-md)] gap-[var(--space-sm)]'
</script>

<template>
  <!-- Les classes `card` / `card-head` restent : les 3 themes les ciblent. -->
  <section :class="[CARD, 'card']">
    <div v-if="title || $slots.titleActions" :class="[CARD_HEAD, 'card-head']">
      <h2 v-if="title" class="card-title">{{ title }}</h2>
      <div v-if="$slots.titleActions" class="card-title-actions">
        <slot name="titleActions" />
      </div>
    </div>
    <slot v-else-if="$slots.title" name="title" />
    <slot />
  </section>
</template>

<style scoped>
/* Cible du contenu slotte -> doit rester en CSS */
:slotted(h2) {
  font-size: 0.96rem;
  margin: 0 0 0.8rem;
  font-weight: 600;
  font-family: var(--title-font);
  color: var(--accent-strong);
  letter-spacing: 0;
}

/* Titre de carte = titre de section : centre, plus grand, couleur de marque
   et deux filets d'ornement pour le distinguer des sous-titres (accordeons). */
.card-title {
  grid-column: 2;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  font-size: clamp(1.1rem, 4.6vw, 1.3rem);
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: center;
  color: var(--brand-strong);
}

.card-title::before,
.card-title::after {
  content: '';
  flex: none;
  width: 1.4rem;
  height: 2px;
  border-radius: var(--radius-pill);
  background: linear-gradient(to right, transparent, var(--brand));
}

.card-title::after {
  background: linear-gradient(to left, transparent, var(--brand));
}

.card-title-actions {
  grid-column: 3;
  justify-self: end;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}
</style>
