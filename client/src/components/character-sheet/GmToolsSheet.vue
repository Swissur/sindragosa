<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Award, Plus, Gift, Save, X } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppBadge from '../ui/AppBadge.vue'
import { patchMemberCharacter, type GmCharacterPatch } from '../../api/campaigns'
import { showToast } from '../../composables/useToast'
import { ADVANCED_DOMAINS, DOMAINS, STATS } from '../../data/sindragosa/domains'
import { applyTick, computeMaxHp, type TickTarget } from '../../utils/sindragosa/sheet'
import { MAX_DOMAIN_RANK } from '../../utils/sindragosa/progression'
import type { Character } from '../../types/character'
import type { ServerCharacter } from '../../api/characters'

/**
 * Outils du MJ sur la fiche d'un joueur (plans/32) : caracs, récompense (une
 * coche hors limite de séance), rang forcé, titres. Tout se règle sur un
 * brouillon, puis part en un seul envoi.
 */
const props = defineProps<{ character: Character; campaignId: number; userId: number }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'saved', row: ServerCharacter): void }>()

// Copie profonde : `structuredClone` refuse les objets réactifs de Vue
const copy = (c: Character): Character => JSON.parse(JSON.stringify(c))
const draft = ref<Character>(copy(props.character))
watch(open, (v) => { if (v) draft.value = copy(props.character) })

// Une cible de progression : « domain:id », « advanced:id » ou « specialty:id »
const rewardTarget = ref('')
const forceTarget = ref('')
const newTitle = ref('')
const saving = ref(false)

function parseTarget(value: string): TickTarget | null {
  const [kind, id] = value.split(':')
  if (!id || (kind !== 'domain' && kind !== 'advanced' && kind !== 'specialty')) return null
  return { kind, id }
}

function reward() {
  const target = parseTarget(rewardTarget.value)
  if (!target) return
  const out = applyTick(draft.value, target, 'reward')
  if (!out.ok) { showToast('Déjà au maximum.'); return }
  draft.value = out.character
  showToast(out.rankedUp ? `Coche ajoutée : nouveau rang ${out.newRank} !` : 'Coche ajoutée.')
}

const forced = computed({
  get: () => {
    const t = parseTarget(forceTarget.value)
    if (!t || t.kind === 'specialty') return 0
    return (t.kind === 'domain' ? draft.value.domains : draft.value.advancedDomains)[t.id]?.rank ?? 0
  },
  set: (rank: number) => {
    const t = parseTarget(forceTarget.value)
    if (!t || t.kind === 'specialty') return
    const key = t.kind === 'domain' ? 'domains' : 'advancedDomains'
    draft.value[key] = { ...draft.value[key], [t.id]: { rank, ticks: 0 } }
  },
})

function addTitle() {
  const t = newTitle.value.trim()
  if (!t || draft.value.titles.includes(t)) return
  draft.value.titles = [...draft.value.titles, t]
  newTitle.value = ''
}

async function save() {
  saving.value = true
  const d = draft.value
  const patch: GmCharacterPatch = {
    ...d.stats,
    domains: d.domains,
    specialties: d.specialties,
    advancedDomains: d.advancedDomains,
    titles: d.titles,
    hpMax: computeMaxHp(d),
  }
  try {
    emit('saved', await patchMemberCharacter(props.campaignId, props.userId, patch))
    showToast('Fiche mise à jour.')
    open.value = false
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'Échec de l’enregistrement')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" :title="`Outils du MJ · ${character.name}`" description="Caracs, récompenses, rangs et titres du joueur.">
    <div class="gm" data-testid="gm-tools">
      <section>
        <h3 class="gm-title">Caractéristiques</h3>
        <div class="gm-stats">
          <div v-for="s in STATS" :key="s.id" class="gm-stat">
            <span class="gm-stat-abbr">{{ s.abbr }}</span>
            <AppStepper v-model="draft.stats[s.id]" :min="1" :label="s.label" :testid="`gm-stat-${s.id}`" />
          </div>
        </div>
      </section>

      <section>
        <h3 class="gm-title">Récompense (hors limite de séance)</h3>
        <div class="gm-line">
          <AppSelect v-model="rewardTarget" class="gm-grow" data-testid="gm-reward-target">
            <option value="">Choisir…</option>
            <optgroup label="Domaines">
              <option v-for="d in DOMAINS" :key="d.id" :value="`domain:${d.id}`">{{ d.label }}</option>
            </optgroup>
            <optgroup v-if="draft.specialties.length" label="Spécialités">
              <option v-for="s in draft.specialties" :key="s.id" :value="`specialty:${s.id}`">{{ s.name }}</option>
            </optgroup>
            <optgroup label="Domaines avancés">
              <option v-for="d in ADVANCED_DOMAINS" :key="d.id" :value="`advanced:${d.id}`">{{ d.label }}</option>
            </optgroup>
          </AppSelect>
          <AppIconBtn variant="primary" title="Ajouter une coche" :disabled="!rewardTarget" data-testid="gm-reward" @click="reward">
            <Gift :size="16" />
          </AppIconBtn>
        </div>
      </section>

      <section>
        <h3 class="gm-title">Forcer un rang</h3>
        <div class="gm-line">
          <AppSelect v-model="forceTarget" class="gm-grow" data-testid="gm-force-target">
            <option value="">Choisir…</option>
            <optgroup label="Domaines">
              <option v-for="d in DOMAINS" :key="d.id" :value="`domain:${d.id}`">{{ d.label }}</option>
            </optgroup>
            <optgroup label="Domaines avancés">
              <option v-for="d in ADVANCED_DOMAINS" :key="d.id" :value="`advanced:${d.id}`">{{ d.label }}</option>
            </optgroup>
          </AppSelect>
          <AppStepper
            v-model="forced"
            :max="MAX_DOMAIN_RANK"
            label="Rang"
            testid="gm-force-rank"
            :disabled="!forceTarget"
          />
        </div>
      </section>

      <section>
        <h3 class="gm-title">Titres</h3>
        <div class="gm-titles">
          <AppBadge v-for="t in draft.titles" :key="t" variant="active">
            <Award :size="12" /> {{ t }}
            <button type="button" class="gm-title-remove" :title="`Retirer ${t}`" @click="draft.titles = draft.titles.filter((x) => x !== t)">
              <X :size="12" />
            </button>
          </AppBadge>
        </div>
        <div class="gm-line">
          <AppInput v-model="newTitle" placeholder="Nouveau titre" class="gm-grow" data-testid="gm-title-input" />
          <AppIconBtn title="Ajouter le titre" :disabled="!newTitle.trim()" data-testid="gm-title-add" @click="addTitle">
            <Plus :size="16" />
          </AppIconBtn>
        </div>
      </section>

      <AppButton variant="primary" block :disabled="saving" data-testid="gm-save" @click="save">
        <Save :size="16" /> Enregistrer
      </AppButton>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.gm {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.gm-title {
  margin: 0 0 var(--space-xs);
  font-size: 0.9rem;
  font-family: var(--title-font);
  color: var(--accent-strong);
}

.gm-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-xs) var(--space-md);
}

.gm-stat {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.gm-stat-abbr {
  font-weight: 700;
  color: var(--muted);
}

.gm-line {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.gm-grow {
  flex: 1;
  min-width: 0;
}

.gm-titles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
  margin-bottom: var(--space-xs);
}

.gm-title-remove {
  display: inline-flex;
  padding: 0;
  border: none;
  background: none;
  color: inherit;
  cursor: pointer;
}
</style>
