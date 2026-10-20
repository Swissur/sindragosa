<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowDown, ArrowUp, Clover, Dices, Skull, Check, Droplet, EyeOff } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppToggleGroup, { type AppToggleItem } from '../ui/AppToggleGroup.vue'
import { character, unlockedAdvanced } from '../../composables/useCharacter'
import { rollRequest, closeRollSheet } from '../../composables/useRollSheet'
import { useRollHistory } from '../../composables/useRollHistory'
import { playDiceRoll } from '../../composables/useDice3D'
import { POOL_DICE_STYLES } from '../../data/poolDiceStyles'
import { showToast } from '../../composables/useToast'
import { DOMAINS, STATS, advancedDomainById, domainById } from '../../data/sindragosa/domains'
import { rollPool, DIFFICULTY_LABELS, type PoolResult } from '../../utils/sindragosa/pool'
import { rollSetup, poolSummary, tickReasonFor, SPECIALTY_LEVEL_LABELS, type RollMode } from '../../utils/sindragosa/rollSetup'
import { applyTick, type TickTarget } from '../../utils/sindragosa/sheet'
import { itemFromRecipe, weaponDamage } from '../../utils/sindragosa/equipment'
import { consumeComponents, hasComponents } from '../../utils/sindragosa/crafting'
import { secretRollMessage } from '../../utils/sindragosa/secretRoll'
import { sendMessageToGm } from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import { useGmCampaign } from '../../composables/useGmCampaign'

/**
 * Feuille de jet Sindragosa (plans/32) : on choisit domaine, spécialité,
 * avantage et chance, on lance la réserve de d6, puis on décide de cocher.
 * « Lancer en secret » : le lanceur voit tout, mais le jet ne part ni au log
 * de campagne ni en moment critique ; le résultat va au MJ dans leur échange.
 */

const { addRoll } = useRollHistory()
const { gmCampaignId } = useGmCampaign()

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
  rollSetup(character.value, {
    domainId: domainId.value,
    specialtyId: specialtyId.value,
    mode: mode.value,
    luck: luck.value,
    power: rollRequest.value?.power ? 1 : 0,
  }),
)

const MODE_ITEMS: AppToggleItem[] = [
  { value: 'desavantage', icon: ArrowDown, title: 'Désavantage (−1d6)', testid: 'roll-mode-desavantage' },
  { value: 'avantage', icon: ArrowUp, title: 'Avantage (+1d6)', testid: 'roll-mode-avantage' },
]

const domainLabel = (id: string) => domainById(id)?.label ?? advancedDomainById(id)?.label ?? ''

const title = computed(() => rollRequest.value?.label || domainLabel(domainId.value) || 'Jet')

/** Fabrication : il faut avoir les composants du patron pour lancer. */
const missingComponents = computed(() => {
  const recipe = rollRequest.value?.recipe
  return !!recipe && !hasComponents(character.value.items, recipe)
})

/** Sort : la mana qu'il coûte, et s'il en reste assez pour le lancer. */
const manaCost = computed(() => rollRequest.value?.manaCost ?? 0)
const missingMana = computed(() => character.value.manaCurrent < manaCost.value)

/** Joueur d'une campagne : il a un MJ à qui envoyer le jet. */
const canRollSecret = computed(() => !!user.value?.activeCampaignId && gmCampaignId.value === null)
/** Le résultat affiché vient d'un jet secret. */
const secret = ref(false)

/** Ce qu'on lance, spécialité comprise : « Acrobatie & Furtivité · Équilibre ». */
const rollLabel = computed(() => {
  const specialty = specialties.value.find((x) => x.id === specialtyId.value)
  return specialty ? `${title.value} · ${specialty.name}` : title.value
})

async function roll(asSecret = false) {
  const s = setup.value
  if (!s || s.count === 0 || rolling.value || missingComponents.value || missingMana.value) return
  rolling.value = true
  secret.value = asSecret
  // Comme les composants, la mana part dès le jet, qu'il réussisse ou non.
  character.value.manaCurrent -= manaCost.value
  // Les composants sont utilisés dès le jet, qu'il réussisse ou non.
  const recipe = rollRequest.value?.recipe
  if (recipe) character.value.items = consumeComponents(character.value.items, recipe)
  const r = rollPool(s.count, s.specialtyLevel)
  const spent = Math.min(luck.value, character.value.pcCurrent)
  character.value.pcCurrent -= spent
  luck.value = 0

  const summary = poolSummary(r, s.specialtyLevel, s.sources)
  const dropped = r.rerolledFrom !== null ? [r.rerolledFrom] : []
  const styleAt = (i: number) => POOL_DICE_STYLES[summary.sources![i]]
  await playDiceRoll([
    ...r.dice.map((value, i) => ({ sides: 6, value, kind: 'domaine', critFrom: summary.critFrom, style: styleAt(i) })),
    ...dropped.map((value, i) => ({ sides: 6, value, kind: 'domaine', dropped: true, style: styleAt(r.dice.length + i) })),
  ])

  result.value = r
  ticked.value = false
  rolling.value = false
  // Fabrication réussie (au moins 1 succès) : l'objet arrive dans l'inventaire du fabricant.
  if (recipe && r.successes > 0) {
    const item = itemFromRecipe(recipe)
    character.value.items.push(item)
    showToast(`${item.name}${item.quantity > 1 ? ` ×${item.quantity}` : ''} rejoint ton inventaire !`)
  } else if (recipe) {
    showToast('Fabrication ratée : les composants sont perdus.')
  }
  addRoll({
    characterName: character.value.name,
    kind: 'domaine',
    label: rollLabel.value,
    die: 0,
    sides: 6,
    bonus: 0,
    total: r.successes,
    rolls: r.dice,
    dropped: dropped.length ? dropped : undefined,
    pool: summary,
  }, rollRequest.value?.context ?? 'fiche', { secret: asSecret })

  const campaignId = user.value?.activeCampaignId
  if (asSecret && campaignId) {
    sendMessageToGm(campaignId, secretRollMessage(character.value.name, rollLabel.value, s, r))
      .catch(() => showToast("Le jet secret n'est pas parti au MJ"))
  }
}

const tickReason = computed(() => (result.value ? tickReasonFor(result.value, character.value.sessionTicks) : null))

const tickTargets = computed<{ target: TickTarget; label: string }[]>(() => {
  const list: { target: TickTarget; label: string }[] = [
    { target: { kind: setup.value?.kind ?? 'domain', id: domainId.value }, label: domainLabel(domainId.value) },
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
  return `Dégâts = ${weaponDamage(w)} + marge (tes succès − ceux de la défense) − armure`
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
            <optgroup v-if="unlockedAdvanced.length" label="Domaines avancés">
              <option v-for="d in unlockedAdvanced" :key="d.id" :value="d.id">
                {{ d.label }} ({{ character.advancedDomains[d.id]?.rank ?? 0 }})
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
          :disabled="!setup || setup.count === 0 || rolling || missingComponents || missingMana"
          data-testid="roll-launch"
          @click="roll()"
        >
          <Dices :size="18" /> Lancer
        </AppButton>
        <AppButton
          v-if="canRollSecret"
          size="small"
          class="roll-secret"
          :disabled="!setup || setup.count === 0 || rolling || missingComponents || missingMana"
          data-testid="roll-secret"
          @click="roll(true)"
        >
          <EyeOff :size="14" /> Lancer en secret
        </AppButton>
        <p v-if="missingComponents" class="roll-note" data-testid="roll-missing-components">Il manque des composants.</p>
        <p v-if="manaCost" class="roll-note" data-testid="roll-mana">
          <Droplet :size="13" /> {{ missingMana ? `Pas assez de mana (${manaCost} requis).` : `Coûte ${manaCost} mana.` }}
        </p>
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
        <p v-if="secret" class="roll-note" data-testid="roll-secret-note">
          <EyeOff :size="13" /> Jet secret : seul le MJ en reçoit le résultat.
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

.roll-secret {
  align-self: center;
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
