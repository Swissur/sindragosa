<script setup lang="ts">
import { computed } from 'vue'
import { Swords } from 'lucide-vue-next'
import { strikeWeapons, weaponDamage, weaponDomainId } from '../../utils/sindragosa/equipment'
import { rollSetup } from '../../utils/sindragosa/rollSetup'
import { domainById } from '../../data/sindragosa/domains'
import { openRollSheet } from '../../composables/useRollSheet'
import type { Character, ItemRow } from '../../types/character'

/**
 * L'attaque de chaque arme équipée, en tête de la liste des compétences (plans/35) ;
 * l'arme de la forme prise, ou les mains nues sans arme (plans/39).
 */
const props = defineProps<{ character: Character; readonly?: boolean }>()

const strikes = computed(() =>
  strikeWeapons(props.character).map((w) => {
    const domainId = weaponDomainId(w)
    const setup = rollSetup(props.character, { domainId, specialtyId: '', mode: 'normal', luck: 0 })
    return { weapon: w, domainId, detail: `${domainById(domainId)?.label} · ${setup?.count ?? 0}d6 · ${weaponDamage(w)} dégâts` }
  }),
)

function strike(w: ItemRow, domainId: string) {
  if (!props.readonly) openRollSheet({ domainId, label: w.name, weapon: w, context: 'fiche' })
}
</script>

<template>
  <ul v-if="strikes.length" class="strikes">
    <li v-for="s in strikes" :key="s.weapon.id">
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

.strike {
  width: 100%;
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
