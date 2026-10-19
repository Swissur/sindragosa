<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppStepper from '../ui/AppStepper.vue'
import { ETATS, normalizeEtats, type EtatEntry, type EtatId } from '../../data/etats'
import { showToast } from '../../composables/useToast'

const open = defineModel<boolean>({ required: true })

const props = defineProps<{
  /** Le porteur des etats — affiche dans le titre. */
  name: string
  states: readonly EtatEntry[]
  /**
   * L'ecriture cote serveur. Absente sur sa propre fiche : la sauvegarde auto
   * de la fiche se charge d'ecrire `character.states`.
   */
  apply?: (states: EtatEntry[]) => Promise<void>
}>()

const emit = defineEmits<{ (e: 'update:states', states: EtatEntry[]): void }>()

const local = ref<EtatEntry[]>(normalizeEtats(props.states))
const byId = computed(() => new Map(local.value.map((e) => [e.id, e])))

watch(
  () => props.states,
  (v) => { local.value = normalizeEtats(v) },
)

/** Duree donnee au prochain etat pose ; 0 = sans duree. La plupart des competences disent « 1 tour ». */
const duration = ref(1)

// Chaque tap ecrit tout de suite : pas de bouton Valider. On affiche le
// resultat sans attendre, et on revient en arriere si le serveur refuse.
// Changer la duree d'un etat pose : le retirer, puis le reposer.
async function toggle(id: EtatId) {
  const before = local.value
  const next = byId.value.has(id)
    ? before.filter((e) => e.id !== id)
    : [...before, duration.value > 0 ? { id, turns: duration.value } : { id }]
  local.value = next
  emit('update:states', next)
  if (!props.apply) return
  try {
    await props.apply(next)
  } catch {
    local.value = before
    emit('update:states', before)
    showToast("L'état n'a pas pu être enregistré.")
  }
}
</script>

<template>
  <!-- Le libelle texte sous l'icone deroge a la regle « boutons icone seule »
       du projet : cet ecran s'ouvre rarement et sous pression en combat, 17
       pictogrammes de meme teinte sans mot y sont illisibles.
       AppToggleGroup ne convient pas : il est mono-selection, or on peut etre
       A terre *et* Desarme. Ces toggles restent donc locaux au composant. -->
  <AppBottomSheet v-model="open" :title="`États — ${name}`">
    <div class="etats-duration">
      <span class="etats-duration-label">Durée</span>
      <AppStepper v-model="duration" :max="99" label="Durée de l'état" testid="etat-duration">
        {{ duration > 0 ? `${duration} tour${duration > 1 ? 's' : ''}` : 'Sans durée' }}
      </AppStepper>
    </div>
    <div class="etats-grid">
      <button
        v-for="e in ETATS"
        :key="e.id"
        type="button"
        class="etat-toggle"
        :class="[`etat-toggle--${e.id}`, { active: byId.has(e.id) }]"
        :data-testid="`etat-toggle-${e.id}`"
        :aria-pressed="byId.has(e.id)"
        :title="e.effect"
        @click="toggle(e.id)"
      >
        <component :is="e.icon" v-if="e.icon" :size="18" class="etat-toggle-icon" />
        <span v-else class="etat-toggle-emoji">{{ e.emoji }}</span>
        <span class="etat-toggle-label">{{ e.label }}</span>
        <span v-if="byId.get(e.id)?.turns" class="etat-toggle-turns">{{ byId.get(e.id)!.turns }} t.</span>
      </button>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.etats-duration {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  margin-bottom: var(--space-sm);
}

.etats-duration-label {
  font-size: 0.85rem;
  font-weight: 600;
}

.etats-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: var(--space-xs);
}

@media (min-width: 480px) {
  .etats-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.etat-toggle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  min-height: 56px;
  padding: var(--space-xs);
  font-family: inherit;
  font-size: 0.7rem;
  font-weight: 600;
  line-height: 1.1;
  text-align: center;
  cursor: pointer;
  color: var(--muted);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-style: solid;
  border-radius: var(--radius-md);
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.etat-toggle:hover {
  border-color: color-mix(in srgb, var(--etat) 45%, transparent);
  color: var(--etat);
}

.etat-toggle.active {
  background: color-mix(in srgb, var(--etat) 18%, transparent);
  border-color: color-mix(in srgb, var(--etat) 45%, transparent);
  color: var(--etat);
}

.etat-toggle--affaibli {
  --etat: var(--etat-affaibli);
}

.etat-toggle--renverse .etat-toggle-icon {
  transform: rotate(90deg);
}

.etat-toggle-emoji {
  font-size: 1.05rem;
  line-height: 1;
}

.etat-toggle-label {
  overflow-wrap: anywhere;
}

.etat-toggle-turns {
  font-weight: 700;
}
</style>
