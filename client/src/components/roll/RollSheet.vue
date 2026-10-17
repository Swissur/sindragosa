<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowDown, ArrowUp, Clover, Dices, Skull, Check } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import { character } from '../../composables/useCharacter'
import { rollRequest, closeRollSheet } from '../../composables/useRollSheet'
import { useRollHistory } from '../../composables/useRollHistory'
import { playDiceRoll } from '../../composables/useDice3D'
import { showToast } from '../../composables/useToast'
import { DOMAINS, STATS, domainById } from '../../data/sindragosa/domains'
import { rollPool, DIFFICULTY_LABELS, type PoolResult } from '../../utils/sindragosa/pool'
import { rollSetup, poolSummary, tickReasonFor, SPECIALTY_LEVEL_LABELS, type RollMode } from '../../utils/sindragosa/rollSetup'
import { applyTick, type TickTarget } from '../../utils/sindragosa/sheet'

/**
 * Feuille de jet Sindragosa (plans/32) : on choisit domaine, spécialité,
 * avantage et chance, on lance la réserve de d6, puis on décide de cocher.
 */

const { addRoll } = useRollHistory()

const domainId = ref('')
const specialtyId = ref('')
const mode = ref<RollMode>('normal')
const luck = ref(0)
const result = ref<PoolResult | null>(null)
const ticked = ref(false)
const rolling = ref(false)

const open = computed({
  get: () => rollRequest.value !== null,
  set: (v: boolean) => { if (!v) closeRollSheet() },
})

watch(rollRequest, (req) => {
  if (!req) return
  domainId.value = req.domainId
  specialtyId.value = req.specialtyId ?? ''
  mode.value = 'normal'
  luck.value = 0
  result.value = null
  ticked.value = false
})

const domainGroups = computed(() =>
  STATS.map((s) => ({ stat: s, domains: DOMAINS.filter((d) => d.stat === s.id) })),
)

const specialties = computed(() => character.value.specialties.filter((s) => s.domainId === domainId.value))

watch(domainId, () => {
  if (!specialties.value.some((s) => s.id === specialtyId.value)) specialtyId.value = ''
})

const setup = computed(() =>
  rollSetup(character.value, { domainId: domainId.value, specialtyId: specialtyId.value, mode: mode.value, luck: luck.value }),
)

const MODE_ITEMS: AppToggleItem[] = [
  { value: 'desavantage', icon: ArrowDown, title: 'Désavantage (−1d6)', testid: 'roll-mode-desavantage' },
  { value: 'avantage', icon: ArrowUp, title: 'Avantage (+1d6)', testid: 'roll-mode-avantage' },
]

const title = computed(() => rollRequest.value?.label ?? domainById(domainId.value)?.label ?? 'Jet')

async function roll() {
  const s = setup.value
  if (!s || s.count === 0 || rolling.value) return
  rolling.value = true
  const r = rollPool(s.count, s.specialtyLevel)
  const spent = Math.min(luck.value, character.value.pcCurrent)
  character.value.pcCurrent -= spent
  luck.value = 0

  const summary = poolSummary(r, s.specialtyLevel)
  const dropped = r.rerolledFrom !== null ? [r.rerolledFrom] : []
  await playDiceRoll([
    ...r.dice.map((value) => ({ sides: 6, value, kind: 'domaine', critFrom: summary.critFrom })),
    ...dropped.map((value) => ({ sides: 6, value, kind: 'domaine', dropped: true })),
  ])

  result.value = r
  ticked.value = false
  rolling.value = false
  const specialty = specialties.value.find((x) => x.id === specialtyId.value)
  addRoll({
    characterName: character.value.name,
    kind: 'domaine',
    label: specialty ? `${title.value} · ${specialty.name}` : title.value,
    die: 0,
    sides: 6,
    bonus: 0,
    total: r.successes,
    rolls: r.dice,
    dropped: dropped.length ? dropped : undefined,
    pool: summary,
  }, rollRequest.value?.context ?? 'fiche')
}

const tickReason = computed(() => (result.value ? tickReasonFor(result.value, character.value.sessionTicks) : null))

const tickTargets = computed<{ target: TickTarget; label: string }[]>(() => {
  const list: { target: TickTarget; label: string }[] = [
    { target: { kind: 'domain', id: domainId.value }, label: domainById(domainId.value)?.label ?? '' },
  ]
  const s = specialties.value.find((x) => x.id === specialtyId.value)
  if (s) list.push({ target: { kind: 'specialty', id: s.id }, label: s.name })
  return list
})

function tick(target: TickTarget, label: string) {
  if (!tickReason.value) return
  const out = applyTick(character.value, target, tickReason.value)
  if (!out.ok) {
    showToast(out.reason === 'rang-max' ? `${label} est déjà au maximum.` : 'Plus de coche possible cette séance.')
    return
  }
  character.value = out.character
  ticked.value = true
  if (out.rankedUp) {
    const level = target.kind === 'specialty' ? SPECIALTY_LEVEL_LABELS[out.newRank] : `rang ${out.newRank}`
    showToast(`${label} passe ${level} !`)
  }
}

const weaponHint = computed(() => {
  const w = rollRequest.value?.weapon
  if (!w || !result.value) return null
  return `Dégâts = ${w.damage} + marge (tes succès − ceux de la défense) − armure`
})
</script>

<template>
  <AppBottomSheet v-model="open" :title="title" description="Prépare et lance une réserve de d6.">
    <div class="roll" data-testid="roll-sheet">
      <template v-if="!result">
        <div class="roll-fields">
          <AppSelect v-model="domainId" data-testid="roll-domain">
            <optgroup v-for="g in domainGroups" :key="g.stat.id" :label="g.stat.label">
              <option v-for="d in g.domains" :key="d.id" :value="d.id">
                {{ d.label }} ({{ character.domains[d.id]?.rank ?? 0 }})
              </option>
            </optgroup>
          </AppSelect>
          <AppSelect v-if="specialties.length" v-model="specialtyId" data-testid="roll-specialty">
            <option value="">Sans spécialité</option>
            <option v-for="s in specialties" :key="s.id" :value="s.id">
              {{ s.name }} · {{ SPECIALTY_LEVEL_LABELS[s.level] }}
            </option>
          </AppSelect>
        </div>

        <div class="roll-options">
          <AppToggleGroup
            :model-value="mode === 'normal' ? '' : mode"
            :items="MODE_ITEMS"
            @update:model-value="mode = ($event || 'normal') as RollMode"
          />
          <span class="roll-luck">
            <Clover :size="16" class="roll-luck-icon" />
            <AppStepper v-model="luck" :max="character.pcCurrent" label="Chance" testid="roll-luck" />
          </span>
        </div>

        <p v-if="setup" class="roll-formula" data-testid="roll-formula">
          <template v-for="(p, i) in setup.parts" :key="p.label">
            <span v-if="i > 0">{{ p.value < 0 ? ' − ' : ' + ' }}</span>{{ p.label }} {{ Math.abs(p.value) }}
          </template>
          = <strong>{{ setup.count }}d6</strong>
        </p>

        <AppButton
          variant="primary"
          block
          :disabled="!setup || setup.count === 0 || rolling"
          data-testid="roll-launch"
          @click="roll"
        >
          <Dices :size="18" /> Lancer
        </AppButton>
      </template>

      <template v-else>
        <div class="roll-dice" data-testid="roll-dice">
          <span
            v-for="(d, i) in result.dice"
            :key="i"
            class="roll-die"
            :class="{
              'roll-die--success': d >= 5,
              'roll-die--crit': d >= (setup?.specialtyLevel === 3 ? 5 : 6),
              'roll-die--one': d === 1,
            }"
          >{{ d }}</span>
        </div>
        <p class="roll-outcome" data-testid="roll-outcome">
          <strong data-testid="roll-successes">{{ result.successes }}</strong>
          succès · {{ DIFFICULTY_LABELS[result.reached] }}
        </p>
        <p v-if="result.rerolledFrom !== null" class="roll-note">Un 1 a été relancé (spécialité).</p>
        <p v-if="result.isCriticalFailure" class="roll-critfail" data-testid="roll-critfail">
          <Skull :size="16" /> Échec critique
        </p>
        <p v-if="weaponHint" class="roll-note">{{ weaponHint }}</p>

        <div v-if="tickReason && !ticked" class="roll-ticks">
          <span class="roll-ticks-label">
            {{ tickReason === 'crit-fail' ? 'On apprend de ses erreurs :' : 'Réussite marquante ?' }}
          </span>
          <AppButton
            v-for="t in tickTargets"
            :key="t.target.kind"
            size="small"
            :data-testid="`roll-tick-${t.target.kind}`"
            @click="tick(t.target, t.label)"
          >
            <Check :size="14" /> {{ t.label }}
          </AppButton>
        </div>
        <p v-else-if="ticked" class="roll-note">Coche ajoutée.</p>

        <AppButton block data-testid="roll-again" @click="result = null">
          <Dices :size="16" /> Relancer
        </AppButton>
      </template>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.roll {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.roll-fields {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.roll-options {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.roll-luck {
  display: inline-flex;
  align-items: center;
  gap: var(--space-xs);
}

.roll-luck-icon {
  color: var(--accent);
}

.roll-formula {
  margin: 0;
  text-align: center;
  color: var(--muted);
  font-size: 0.9rem;
}

.roll-formula strong {
  color: var(--text);
}

.roll-dice {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-sm);
}

.roll-die {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.3rem;
  height: 2.3rem;
  border-radius: var(--radius-sm);
  border: 2px solid var(--border-strong);
  background: var(--surface-2);
  font-weight: 700;
  font-size: 1.1rem;
}

.roll-die--success {
  border-color: var(--accent);
  color: var(--accent-strong);
  background: var(--accent-soft);
}

.roll-die--crit {
  border-color: var(--brand);
  box-shadow: 0 0 0 2px var(--brand);
}

.roll-die--one {
  opacity: 0.45;
}

.roll-outcome {
  margin: 0;
  text-align: center;
  font-size: 1.05rem;
}

.roll-outcome strong {
  font-size: 1.6rem;
  color: var(--accent-strong);
}

.roll-critfail {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  margin: 0;
  padding: var(--space-sm);
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--danger) 15%, transparent);
  color: var(--danger);
  font-weight: 700;
}

.roll-note {
  margin: 0;
  text-align: center;
  font-size: 0.85rem;
  color: var(--muted);
}

.roll-ticks {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

.roll-ticks-label {
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
