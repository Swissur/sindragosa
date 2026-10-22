<script setup lang="ts">
import { computed, toRef } from 'vue'
import { Star, Swords } from 'lucide-vue-next'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { strikePin, strikes as strikesOf } from '../../utils/sindragosa/strikes'
import { openRollSheet } from '../../composables/useRollSheet'
import { usePins } from '../../composables/usePins'
import type { Character, ItemRow } from '../../types/character'

/**
 * L'attaque de chaque arme équipée, en tête de la liste des compétences (plans/35) ;
 * l'arme de la forme prise, ou les mains nues sans arme (plans/39). L'étoile
 * met l'attaque en favori.
 */
const props = defineProps<{ character: Character; readonly?: boolean }>()

const strikes = computed(() => strikesOf(props.character))
const { isPinned, toggle } = usePins(toRef(props, 'character'))

function strike(w: ItemRow, domainId: string) {
  if (!props.readonly) openRollSheet({ domainId, label: w.name, weapon: w, context: 'fiche' })
}
</script>

<template>
  <ul v-if="strikes.length" class="strikes">
    <li v-for="s in strikes" :key="s.weapon.id" class="strike-row">
      <button
        type="button"
        class="strike"
        :disabled="readonly"
        :data-testid="`strike-${s.weapon.id}`"
        @click="strike(s.weapon, s.domainId)"
      >
        <Swords :size="16" class="strike-icon" />
        <span class="strike-text">
          <span class="strike-name">Frapper : {{ s.weapon.name }}</span>
          <span class="strike-detail">{{ s.detail }}</span>
        </span>
      </button>
      <AppIconBtn
        v-if="!readonly"
        variant="bare"
        :title="isPinned(strikePin(s.weapon)) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        :data-testid="`strike-pin-${s.weapon.id}`"
        @click="toggle(strikePin(s.weapon))"
      >
        <Star :size="16" :class="{ 'strike-star--on': isPinned(strikePin(s.weapon)) }" />
      </AppIconBtn>
    </li>
  </ul>
</template>

<style scoped>
.strikes {
  list-style: none;
  margin: 0 0 var(--space-sm);
  padding: 0 0 var(--space-sm);
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  border-bottom: 1px solid var(--border);
}

.strike-row {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.strike {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: var(--space-xs) var(--space-sm);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.strike:disabled {
  cursor: default;
}

.strike-star--on {
  color: var(--accent);
  fill: currentColor;
}

.strike-icon {
  color: var(--accent);
}

.strike-text {
  display: flex;
  flex-direction: column;
}

.strike-name {
  font-weight: 600;
}

.strike-detail {
  font-size: 0.78rem;
  color: var(--muted);
}
</style>
