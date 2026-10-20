<script setup lang="ts">
import { computed } from 'vue'
import { ETATS, normalizeEtats, type EtatEntry, type EtatId } from '../../data/etats'

/**
 * Les états de sa propre fiche, en tags : un tap pose ou retire l'état.
 * Seuls les états actifs s'affichent, sauf avec `all` (pour en poser un nouveau).
 * Multi-sélection, donc pas AppToggleGroup (mono-sélection), comme EtatsSheet.
 * Un état posé ici n'a pas de durée : les durées se règlent en combat.
 */
const props = defineProps<{ states: readonly EtatEntry[]; readonly?: boolean; all?: boolean }>()

const emit = defineEmits<{ (e: 'update:states', states: EtatEntry[]): void }>()

const active = computed(() => new Map(normalizeEtats(props.states).map((e) => [e.id, e])))
const shown = computed(() => (props.all && !props.readonly ? ETATS : ETATS.filter((e) => active.value.has(e.id))))

function toggle(id: EtatId) {
  const current = [...active.value.values()]
  emit('update:states', active.value.has(id) ? current.filter((e) => e.id !== id) : [...current, { id }])
}
</script>

<template>
  <div class="etats-tags">
    <button
      v-for="e in shown"
      :key="e.id"
      type="button"
      class="etat-tag"
      :class="[`etat-tag--${e.id}`, { active: active.has(e.id) }]"
      :data-testid="`etat-toggle-${e.id}`"
      :aria-pressed="active.has(e.id)"
      :title="e.effect"
      :disabled="readonly"
      @click="toggle(e.id)"
    >
      <component :is="e.icon" v-if="e.icon" :size="13" class="etat-tag-icon" />
      <span v-else>{{ e.emoji }}</span>
      {{ e.label }}
      <span v-if="active.get(e.id)?.turns" class="etat-tag-turns">· {{ active.get(e.id)!.turns }}</span>
    </button>
    <span v-if="!shown.length" class="etats-none">Aucun</span>
  </div>
</template>

<style scoped>
.etats-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.etat-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.6rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1.2;
  cursor: pointer;
  color: var(--muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-style: solid;
  border-radius: var(--radius-pill);
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.etat-tag:disabled {
  cursor: default;
}

.etat-tag.active {
  background: color-mix(in srgb, var(--etat) 18%, transparent);
  border-color: color-mix(in srgb, var(--etat) 45%, transparent);
  color: var(--etat);
}

.etat-tag--affaibli {
  --etat: var(--etat-affaibli);
}

.etat-tag--renverse .etat-tag-icon {
  transform: rotate(90deg);
}

.etat-tag-turns {
  font-weight: 700;
}

.etats-none {
  font-size: 0.8rem;
  color: var(--muted);
}
</style>
