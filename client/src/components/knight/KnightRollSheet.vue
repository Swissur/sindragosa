<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Dices, RotateCcw } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppSelect from '../ui/AppSelect.vue'
import { ASPECTS, CARAC_LABELS, DIFFICULTIES, type CaracId } from '../../data/knight/aspects'
import { POOL_DICE_STYLES } from '../../data/poolDiceStyles'
import { playDiceRoll } from '../../composables/useDice3D'
import { useRollHistory } from '../../composables/useRollHistory'
import { comboSetup } from '../../utils/knight/sheet'
import { comboPool, comboTier, isComboSuccess, rollCombo, type ComboResult } from '../../utils/knight/combo'
import type { KnightSheet } from '../../types/knight'

/**
 * Jet de combo Knight (plans/43) : une carac de base, une carac en combo, une
 * difficulté facultative. Le jet part dans le log de la campagne comme les autres.
 */
const props = defineProps<{
  sheet: KnightSheet
  characterName: string
  /** Carac de base proposée à l'ouverture (celle qu'on a tapée sur la fiche). */
  base: CaracId | null
}>()

const open = defineModel<boolean>({ required: true })

const { addRoll } = useRollHistory()

const base = ref<CaracId>('combat')
const combo = ref<CaracId>('force')
/** '' = pas de difficulté annoncée. */
const difficulty = ref<number | ''>('')
const result = ref<ComboResult | null>(null)
const rolling = ref(false)

/** Le combo par défaut : une autre carac du même aspect que la base. */
function defaultCombo(c: CaracId): CaracId {
  const aspect = ASPECTS.find((a) => a.caracs.includes(c))!
  return aspect.caracs.find((x) => x !== c)!
}

watch(open, (isOpen) => {
  if (!isOpen) return
  if (props.base) {
    base.value = props.base
    combo.value = defaultCombo(props.base)
  }
  difficulty.value = ''
  result.value = null
})

const setup = computed(() => comboSetup(props.sheet, base.value, combo.value))

const title = computed(() => `${CARAC_LABELS[base.value]} + ${CARAC_LABELS[combo.value]}`)

const tier = computed(() => {
  if (!result.value || !setup.value) return null
  return comboTier(comboPool(result.value, setup.value.baseCount, difficulty.value === '' ? null : difficulty.value), result.value.total)
})

async function roll() {
  const s = setup.value
  if (!s || s.count === 0 || rolling.value) return
  rolling.value = true
  const r = rollCombo(s.count, s.overdrive)
  const pool = comboPool(r, s.baseCount, difficulty.value === '' ? null : difficulty.value)
  const dice = [...r.dice, ...r.exploitDice]
  await playDiceRoll(dice.map((value, i) => ({ sides: 6, value, kind: 'ability', style: POOL_DICE_STYLES[pool.sources![i]] })))
  result.value = r
  rolling.value = false
  addRoll({
    characterName: props.characterName,
    kind: 'ability',
    label: title.value,
    die: 0,
    sides: 6,
    bonus: r.overdrive,
    total: r.total,
    rolls: dice,
    pool,
  }, 'fiche')
}
</script>

<template>
  <AppBottomSheet v-model="open" :title="title" description="Prépare et lance un jet de combo.">
    <div class="combo" data-testid="knight-roll-sheet">
      <template v-if="!result">
        <label class="field">
          <span class="field-label">Base</span>
          <AppSelect v-model="base" data-testid="knight-roll-base">
            <optgroup v-for="a in ASPECTS" :key="a.id" :label="a.label">
              <option v-for="c in a.caracs" :key="c" :value="c">{{ CARAC_LABELS[c] }} ({{ sheet.carac[c] }})</option>
            </optgroup>
          </AppSelect>
        </label>
        <label class="field">
          <span class="field-label">Combo</span>
          <AppSelect v-model="combo" data-testid="knight-roll-combo">
            <optgroup v-for="a in ASPECTS" :key="a.id" :label="a.label">
              <option v-for="c in a.caracs" :key="c" :value="c" :disabled="c === base">
                {{ CARAC_LABELS[c] }} ({{ sheet.carac[c] }})
              </option>
            </optgroup>
          </AppSelect>
        </label>
        <label class="field">
          <span class="field-label">Difficulté</span>
          <AppSelect v-model="difficulty" data-testid="knight-roll-difficulty">
            <option value="">Aucune</option>
            <option v-for="d in DIFFICULTIES" :key="d.value" :value="d.value">{{ d.label }} ({{ d.value }})</option>
          </AppSelect>
        </label>

        <p v-if="setup" class="combo-count" data-testid="knight-roll-count">
          {{ setup.count }}d6<template v-if="setup.overdrive"> + {{ setup.overdrive }} overdrive</template>
        </p>
        <p v-else class="combo-hint">La base et le combo doivent être deux caracs différentes.</p>

        <AppButton
          variant="primary"
          block
          :disabled="!setup || setup.count === 0 || rolling"
          data-testid="knight-roll-go"
          @click="roll"
        >
          <Dices :size="16" />
          Lancer
        </AppButton>
      </template>

      <template v-else>
        <div class="combo-dice">
          <span
            v-for="(d, i) in result.dice"
            :key="`d${i}`"
            class="combo-die"
            :class="{ 'combo-die--success': isComboSuccess(d) }"
          >{{ d }}</span>
        </div>
        <template v-if="result.exploitDice.length">
          <p class="combo-exploit-label">Relance d'exploit</p>
          <div class="combo-dice">
            <span
              v-for="(d, i) in result.exploitDice"
              :key="`e${i}`"
              class="combo-die"
              :class="{ 'combo-die--success': isComboSuccess(d) }"
            >{{ d }}</span>
          </div>
        </template>
        <p class="combo-total" data-testid="knight-roll-total">
          <strong>{{ result.total }}</strong> réussite{{ result.total > 1 ? 's' : '' }}
          <span v-if="result.overdrive" class="combo-detail">({{ result.successes }} aux dés + {{ result.overdrive }} overdrive)</span>
        </p>
        <p
          v-if="tier"
          class="combo-tier"
          :class="{ 'combo-tier--bad': result.critFail || tier === 'Échec', 'combo-tier--good': result.exploit || tier === 'Réussite' }"
          data-testid="knight-roll-tier"
        >{{ tier }}</p>
        <AppButton block @click="result = null">
          <RotateCcw :size="16" />
          Nouveau jet
        </AppButton>
      </template>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.combo {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--muted);
}

.combo-count {
  margin: 0;
  font-weight: 700;
  font-size: 1.1rem;
  text-align: center;
  color: var(--accent-strong);
}

.combo-hint {
  margin: 0;
  color: var(--danger);
  font-size: 0.85rem;
}

.combo-dice {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  justify-content: center;
}

.combo-die {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: var(--radius-sm);
  border: 2px solid var(--border);
  background: var(--surface-2);
  color: var(--muted);
  font-weight: 700;
}

.combo-die--success {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-strong);
}

.combo-exploit-label {
  margin: 0;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-strong);
}

.combo-total {
  margin: 0;
  text-align: center;
}

.combo-total strong {
  font-size: 1.5rem;
  color: var(--accent-strong);
}

.combo-detail {
  color: var(--muted);
  font-size: 0.85rem;
}

.combo-tier {
  margin: 0;
  text-align: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.combo-tier--good {
  color: var(--accent-strong);
}

.combo-tier--bad {
  color: var(--danger);
}
</style>
