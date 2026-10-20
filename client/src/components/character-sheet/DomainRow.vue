<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronDown, Gift, Plus, Trash2, Star } from 'lucide-vue-next'
import AppTickGauge from '../ui/AppTickGauge.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppButton from '../ui/AppButton.vue'
import AppModal from '../ui/AppModal.vue'
import AppStepper from '../ui/AppStepper.vue'
import { openRollSheet } from '../../composables/useRollSheet'
import { rewardTick } from '../../composables/gmReward'
import { addSpecialty } from '../../utils/sindragosa/sheet'
import { canAddSpecialty, DOMAIN_GAUGE_SLOTS, MAX_DOMAIN_RANK, MAX_SPECIALTY_LEVEL, TICKS_PER_SPECIALTY_LEVEL, ticksForRank } from '../../utils/sindragosa/progression'
import { SPECIALTY_LEVEL_LABELS } from '../../utils/sindragosa/rollSetup'
import type { Domain } from '../../data/sindragosa/domains'
import type { Character } from '../../types/character'

/**
 * Un domaine : taper la ligne ouvre le jet, le chevron déplie les spécialités
 * (au plus autant que le rang du domaine).
 */
const props = defineProps<{
  character: Character
  domain: Domain
  readonly?: boolean
  /** Mode MJ : coches en récompense, rang forcé, spécialités données (sans limite de rang) ou retirées. */
  gm?: boolean
  /** Favori de la fiche. Absent = pas de bouton (fiche d'un autre joueur). */
  pinned?: boolean
  /** Ids des spécialités épinglées. Absent = pas de bouton. */
  pinnedSpecialties?: string[]
}>()

const emit = defineEmits<{
  (e: 'toggle-pin'): void
  (e: 'toggle-specialty-pin', id: string): void
  (e: 'remove-specialty', specialty: Character['specialties'][number]): void
}>()

const expanded = ref(false)
const newName = ref('')
/** Modale « + Autre » : spécialité hors des suggestions. */
const otherOpen = ref(false)

const progress = computed(() => props.character.domains[props.domain.id] ?? { rank: 0, ticks: 0 })
const specialties = computed(() => props.character.specialties.filter((s) => s.domainId === props.domain.id))
const canAdd = computed(() => canAddSpecialty(progress.value.rank, specialties.value.length))
const showAdd = computed(() => props.gm || (canAdd.value && !props.readonly))

/** Rang forcé par le MJ : les coches en cours repartent de zéro. */
const forcedRank = computed({
  get: () => progress.value.rank,
  set: (rank: number) => {
    props.character.domains = { ...props.character.domains, [props.domain.id]: { rank, ticks: 0 } }
  },
})
const suggestions = computed(() =>
  props.domain.specialties.filter((n) => !specialties.value.some((s) => s.name === n)),
)

function roll(specialtyId?: string) {
  if (props.readonly) return
  openRollSheet({ domainId: props.domain.id, specialtyId, context: 'fiche' })
}

function add(name: string) {
  const next = addSpecialty(props.character, props.domain.id, name, crypto.randomUUID(), props.gm)
  if (!next) return
  props.character.specialties = next.specialties
  newName.value = ''
  otherOpen.value = false
}
</script>

<template>
  <div class="domain" :data-testid="`domain-${domain.id}`">
    <div class="domain-line">
      <button type="button" class="domain-main" :disabled="readonly" :data-testid="`domain-roll-${domain.id}`" @click="roll()">
        <span class="domain-name">{{ domain.label }}</span>
        <AppTickGauge
          :rank="progress.rank"
          :ticks="progress.ticks"
          :total="ticksForRank(progress.rank + 1)"
          :maxed="progress.rank >= MAX_DOMAIN_RANK"
          :slots="DOMAIN_GAUGE_SLOTS"
        />
      </button>
      <AppIconBtn
        v-if="pinned !== undefined"
        :title="pinned ? 'Retirer des favoris' : 'Ajouter aux favoris'"
        variant="bare"
        :data-testid="`domain-pin-${domain.id}`"
        @click="emit('toggle-pin')"
      >
        <Star :size="16" :class="{ 'domain-star--on': pinned }" />
      </AppIconBtn>
      <AppIconBtn
        v-if="gm"
        variant="primary"
        title="Récompense : une coche"
        :data-testid="`gm-reward-${domain.id}`"
        @click="rewardTick(character, { kind: 'domain', id: domain.id })"
      >
        <Gift :size="16" />
      </AppIconBtn>
      <AppIconBtn
        :title="expanded ? 'Replier' : 'Spécialités'"
        :data-testid="`domain-expand-${domain.id}`"
        @click="expanded = !expanded"
      >
        <ChevronDown :size="16" class="domain-chevron" :class="{ 'domain-chevron--open': expanded }" />
      </AppIconBtn>
    </div>

    <div v-if="expanded" class="domain-detail">
      <div v-if="gm" class="domain-force">
        <span class="domain-hint">Rang du domaine</span>
        <AppStepper v-model="forcedRank" :max="MAX_DOMAIN_RANK" label="Rang du domaine" :testid="`gm-rank-${domain.id}`" />
      </div>
      <p v-if="!specialties.length && readonly && !gm" class="domain-hint" data-testid="specialty-none">
        Aucune spécialité.
      </p>
      <p v-else-if="!specialties.length && !showAdd" class="domain-hint">
        Une spécialité par rang : monte ce domaine pour en choisir une.
      </p>
      <div v-for="s in specialties" :key="s.id" class="specialty" data-testid="specialty-row">
        <button type="button" class="specialty-main" :disabled="readonly" @click="roll(s.id)">
          <span class="specialty-name">{{ s.name }}</span>
          <AppTickGauge
            :rank="SPECIALTY_LEVEL_LABELS[s.level]"
            :ticks="s.ticks"
            :total="TICKS_PER_SPECIALTY_LEVEL"
            :maxed="s.level >= MAX_SPECIALTY_LEVEL"
            :slots="DOMAIN_GAUGE_SLOTS"
          />
        </button>
        <AppIconBtn
          v-if="pinnedSpecialties"
          :title="pinnedSpecialties.includes(s.id) ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          variant="bare"
          class="specialty-btn"
          :data-testid="`specialty-pin-${s.id}`"
          @click="emit('toggle-specialty-pin', s.id)"
        >
          <Star :size="16" :class="{ 'domain-star--on': pinnedSpecialties.includes(s.id) }" />
        </AppIconBtn>
        <AppIconBtn
          v-if="gm"
          variant="primary"
          class="specialty-btn"
          title="Récompense : une coche"
          :data-testid="`gm-reward-specialty-${s.id}`"
          @click="rewardTick(character, { kind: 'specialty', id: s.id })"
        >
          <Gift :size="16" />
        </AppIconBtn>
        <AppIconBtn
          v-if="gm"
          variant="danger"
          class="specialty-btn"
          title="Retirer la spécialité"
          :data-testid="`specialty-remove-${s.id}`"
          @click="emit('remove-specialty', s)"
        >
          <Trash2 :size="16" />
        </AppIconBtn>
        <!-- Sous le chevron du domaine : garde l'étoile et la jauge alignées -->
        <span v-else class="specialty-spacer" />
      </div>

      <div v-if="showAdd" class="specialty-suggestions">
        <AppButton v-for="n in suggestions" :key="n" size="small" @click="add(n)">{{ n }}</AppButton>
        <AppButton size="small" data-testid="specialty-other" @click="otherOpen = true">
          <Plus :size="14" /> Autre
        </AppButton>
      </div>
    </div>

    <AppModal v-model="otherOpen" :title="`Spécialité — ${domain.label}`">
      <form id="specialty-other-form" @submit.prevent="add(newName)">
        <AppInput v-model="newName" placeholder="Nom de la spécialité" autofocus data-testid="specialty-input" />
      </form>
      <template #footer>
        <AppButton @click="otherOpen = false">Annuler</AppButton>
        <AppButton type="submit" form="specialty-other-form" variant="primary" :disabled="!newName.trim()" data-testid="specialty-add">
          Ajouter
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.domain-line,
.specialty {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.domain-main,
.specialty-main {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.domain-main:hover:not(:disabled),
.specialty-main:hover:not(:disabled) {
  background: var(--surface-2);
}

.domain-main:disabled,
.specialty-main:disabled {
  cursor: default;
}

.domain-name,
.specialty-name {
  flex: 1;
  min-width: 0;
}

.domain-name {
  font-weight: 600;
}

.domain-star--on {
  color: var(--accent);
  fill: currentColor;
}

.domain-chevron {
  transition: transform 0.15s;
}

.domain-chevron--open {
  transform: rotate(180deg);
}

.domain-detail {
  display: flex;
  flex-direction: column;
  margin-left: var(--space-md);
  padding-left: var(--space-sm);
  border-left: 2px solid var(--border);
}

.domain-force {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-xs);
}

.domain-hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
}

.specialty-name {
  font-size: 0.92rem;
}

/* Lignes de spécialité plus serrées que celles des domaines : 32px de haut.
   Les boutons gardent 40px de large pour rester sous ceux du domaine. */
.specialty-main {
  min-height: 32px;
  padding-block: 0;
}

.specialty-btn {
  height: 32px;
  min-height: 32px;
}

.specialty-spacer {
  flex-shrink: 0;
  width: 40px;
}

.specialty-suggestions {
  margin-top: var(--space-xs);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}
</style>
