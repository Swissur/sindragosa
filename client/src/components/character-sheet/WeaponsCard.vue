<script setup lang="ts">
import { Plus, Trash2, Swords } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { removeWithUndo } from '../../composables/useUndoRemove'
import { openRollSheet } from '../../composables/useRollSheet'
import { DOMAINS, domainById } from '../../data/sindragosa/domains'
import type { Character, WeaponRow } from '../../types/character'

/**
 * Armes : dégâts fixes et domaine d'attaque. Taper une arme lance l'attaque ;
 * dégâts = arme + marge − armure.
 */
const props = defineProps<{ character: Character; editing?: boolean; readonly?: boolean }>()

function add() {
  props.character.weapons.push({ id: crypto.randomUUID(), name: 'Arme', damage: 2, domainId: 'melee-bourrine' })
}

function attack(w: WeaponRow) {
  openRollSheet({ domainId: w.domainId, label: w.name, weapon: w, context: 'fiche' })
}
</script>

<template>
  <AppCard v-if="character.weapons.length || (editing && !readonly)" title="Armes">
    <template v-if="editing && !readonly" #titleActions>
      <AppIconBtn title="Ajouter une arme" data-testid="weapon-add" @click="add">
        <Plus :size="16" />
      </AppIconBtn>
    </template>
    <ul class="rows">
      <li v-for="(w, i) in character.weapons" :key="w.id" class="row" data-testid="weapon-row">
        <template v-if="editing && !readonly">
          <div class="row-edit">
            <AppInput v-model="w.name" placeholder="Nom" />
            <div class="row-edit-line">
              <AppInput v-model="w.damage" type="number" :min="0" class="row-damage" text-align="center" />
              <AppSelect v-model="w.domainId" class="row-domain">
                <option v-for="d in DOMAINS" :key="d.id" :value="d.id">{{ d.label }}</option>
              </AppSelect>
            </div>
          </div>
          <AppIconBtn variant="danger" title="Supprimer" @click="removeWithUndo(character.weapons, i, w.name)">
            <Trash2 :size="16" />
          </AppIconBtn>
        </template>
        <button v-else type="button" class="weapon" :disabled="readonly" @click="attack(w)">
          <Swords :size="16" class="weapon-icon" />
          <span class="weapon-name">{{ w.name }}</span>
          <span class="weapon-meta">{{ domainById(w.domainId)?.label }} · {{ w.damage }} dégâts</span>
        </button>
      </li>
    </ul>
  </AppCard>
</template>

<style scoped>
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.row {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.row-edit {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.row-edit-line {
  display: flex;
  gap: var(--space-xs);
}

.row-damage {
  width: 4rem;
}

.row-domain {
  flex: 1;
  min-width: 0;
}

.weapon {
  flex: 1;
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

.weapon:disabled {
  cursor: default;
}

.weapon-icon {
  color: var(--accent);
}

.weapon-name {
  flex: 1;
  font-weight: 600;
}

.weapon-meta {
  font-size: 0.8rem;
  color: var(--muted);
}
</style>
