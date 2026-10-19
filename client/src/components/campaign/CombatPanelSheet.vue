<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Play, Plus, ArrowLeft, Castle, Download, Check } from 'lucide-vue-next'
import {
  createEncounter,
  deleteEncounter,
  fetchEncounters,
  importDungeonEncounters,
  type CampaignDetail,
  type EncounterSummary,
} from '../../api/campaigns'
import { createCombat, finishCombat, type CombatSummary } from '../../api/combats'
import { DUNGEONS } from '../../data/sindragosa/dungeons'
import type { Dungeon } from '../../data/sindragosa/types'
import { dungeonEncounters, groupByDungeon } from '../../utils/sindragosa/dungeons'
import EncounterRow from './EncounterRow.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'

// Volet combat du MJ : les rencontres préparées, classées par donjon, chacune
// avec ▶ (choisir les joueurs puis lancer), ■ si elle tourne, crayon et poubelle.
// Le château ouvre les donjons prêts, à importer d'un coup dans la campagne.
const props = defineProps<{
  campaign: CampaignDetail
  activeCombat: CombatSummary | undefined
}>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'combats-changed'): void }>()

const router = useRouter()

const encounters = ref<EncounterSummary[]>([])
const error = ref<string | null>(null)

const showCreate = ref(false)
const newName = ref('')

/** Étape 2 : choix des joueurs. `undefined` = liste, `null` = combat vide. */
const launching = ref<EncounterSummary | null | undefined>(undefined)
const excluded = ref<Set<number>>(new Set())

const confirmDelete = ref<EncounterSummary | null>(null)

/** Étape « Donjons prêts » : la liste des donjons à importer. */
const showDungeons = ref(false)
const importingName = ref<string | null>(null)

const groups = computed(() => groupByDungeon(encounters.value))

async function loadEncounters() {
  encounters.value = await fetchEncounters(props.campaign.id)
}

watch(open, async (isOpen) => {
  if (!isOpen) return
  launching.value = undefined
  showCreate.value = false
  showDungeons.value = false
  error.value = null
  try {
    await loadEncounters()
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
})

const title = computed(() => {
  if (showDungeons.value) return 'Donjons prêts'
  if (launching.value === undefined) return 'Combat'
  return launching.value?.name ?? 'Combat vide'
})

function isImported(d: Dungeon) {
  return encounters.value.some((e) => e.dungeon === d.name)
}

async function handleImport(d: Dungeon) {
  error.value = null
  importingName.value = d.name
  try {
    await importDungeonEncounters(props.campaign.id, d.name, dungeonEncounters(d))
    await loadEncounters()
    showDungeons.value = false
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    importingName.value = null
  }
}

function isRunning(enc: EncounterSummary) {
  return props.activeCombat?.encounterId === enc.id
}

function startLaunch(enc: EncounterSummary | null) {
  excluded.value = new Set()
  error.value = null
  launching.value = enc
}

function togglePlayer(userId: number) {
  const next = new Set(excluded.value)
  if (next.has(userId)) next.delete(userId)
  else next.add(userId)
  excluded.value = next
}

async function launch() {
  error.value = null
  try {
    const result = await createCombat(props.campaign.id, {
      encounterId: launching.value?.id,
      excludedUserIds: [...excluded.value],
    })
    open.value = false
    router.push(`/campagnes/${props.campaign.id}/combat/${result.id}`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

async function stop() {
  if (!props.activeCombat) return
  error.value = null
  try {
    await finishCombat(props.campaign.id, props.activeCombat.id)
    emit('combats-changed')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

async function handleCreate() {
  error.value = null
  try {
    const enc = await createEncounter(props.campaign.id, { name: newName.value.trim() })
    newName.value = ''
    router.push(`/campagnes/${props.campaign.id}/rencontres/${enc.id}`)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

async function handleDelete(enc: EncounterSummary) {
  confirmDelete.value = null
  try {
    await deleteEncounter(props.campaign.id, enc.id)
    encounters.value = encounters.value.filter((e) => e.id !== enc.id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" :title="title">
    <!-- Donjons prêts : import en un coup -->
    <div v-if="showDungeons" class="panel">
      <ul class="encounters">
        <li v-for="d in DUNGEONS" :key="d.name" class="dungeon" :data-testid="`dungeon-${d.name}`">
          <div class="dungeon-info">
            <span class="dungeon-name">{{ d.name }}</span>
            <span class="dungeon-meta">
              {{ d.kind === 'raid' ? 'Raid' : 'Donjon' }} · {{ d.encounters.length }} combats · {{ d.monsters.length }} monstres
            </span>
            <p class="dungeon-desc">{{ d.description }}</p>
          </div>
          <AppIconBtn v-if="isImported(d)" title="Déjà dans la campagne" disabled>
            <Check :size="16" />
          </AppIconBtn>
          <AppIconBtn
            v-else
            variant="primary"
            title="Importer ses combats"
            :disabled="importingName !== null"
            data-testid="dungeon-import"
            @click="handleImport(d)"
          >
            <Download :size="16" />
          </AppIconBtn>
        </li>
      </ul>
      <div class="launch-actions">
        <AppIconBtn title="Retour" @click="showDungeons = false">
          <ArrowLeft :size="18" />
        </AppIconBtn>
      </div>
    </div>

    <!-- Étape 1 : les rencontres -->
    <div v-else-if="launching === undefined" class="panel">
      <div class="panel-actions">
        <AppButton size="small" data-testid="combat-empty" @click="startLaunch(null)">
          <Play :size="14" />
          Combat vide
        </AppButton>
        <div class="panel-icons">
          <AppIconBtn title="Donjons prêts" data-testid="dungeons-open" @click="showDungeons = true">
            <Castle :size="18" />
          </AppIconBtn>
          <AppIconBtn title="Nouvelle rencontre" data-testid="encounter-new" @click="showCreate = !showCreate">
            <Plus :size="18" />
          </AppIconBtn>
        </div>
      </div>

      <form v-if="showCreate" class="create-form" @submit.prevent="handleCreate">
        <AppInput v-model="newName" class="grow" placeholder="Nom de la rencontre" :required="true" :autofocus="true" />
        <AppButton type="submit" variant="primary">Créer</AppButton>
      </form>

      <AppEmptyState v-if="encounters.length === 0 && !showCreate">
        Aucune rencontre. Prépare tes combats, ou importe un donjon !
      </AppEmptyState>

      <template v-for="group in groups" :key="group.dungeon ?? ''">
        <ul v-if="group.dungeon === null" class="encounters">
          <EncounterRow
            v-for="enc in group.items"
            :key="enc.id"
            :encounter="enc"
            :running="isRunning(enc)"
            :locked="!!activeCombat"
            @play="startLaunch(enc)"
            @stop="stop"
            @edit="router.push(`/campagnes/${campaign.id}/rencontres/${enc.id}`)"
            @delete="confirmDelete = enc"
          />
        </ul>
        <AppAccordion
          v-else
          :title="group.dungeon"
          :hint="`${group.items.length} combat${group.items.length > 1 ? 's' : ''}`"
          :default-open="group.items.some(isRunning)"
          :testid="`dungeon-group-${group.dungeon}`"
        >
          <template #icon><Castle :size="16" /></template>
          <ul class="encounters">
            <EncounterRow
              v-for="enc in group.items"
              :key="enc.id"
              :encounter="enc"
              :running="isRunning(enc)"
              :locked="!!activeCombat"
              @play="startLaunch(enc)"
              @stop="stop"
              @edit="router.push(`/campagnes/${campaign.id}/rencontres/${enc.id}`)"
              @delete="confirmDelete = enc"
            />
          </ul>
        </AppAccordion>
      </template>
    </div>

    <!-- Étape 2 : choix des joueurs -->
    <div v-else class="panel">
      <span class="label">Choix des joueurs</span>
      <div class="players">
        <button
          v-for="m in campaign.members"
          :key="m.userId"
          type="button"
          class="player"
          :class="{ excluded: excluded.has(m.userId) }"
          @click="togglePlayer(m.userId)"
        >
          {{ m.characterName ?? m.username }}
        </button>
      </div>
      <div class="launch-actions">
        <AppIconBtn title="Retour" @click="launching = undefined">
          <ArrowLeft :size="18" />
        </AppIconBtn>
        <AppButton variant="primary" data-testid="combat-launch" @click="launch">
          <Play :size="16" />
          Lancer !
        </AppButton>
      </div>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>
  </AppBottomSheet>

  <AppModal :model-value="confirmDelete !== null" title="Effacer la rencontre" @update:model-value="confirmDelete = null">
    <p class="confirm">Effacer « {{ confirmDelete?.name }} » ?</p>
    <template #footer>
      <AppButton @click="confirmDelete = null">Annuler</AppButton>
      <AppButton variant="danger" @click="handleDelete(confirmDelete!)">Effacer</AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.panel-actions,
.launch-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.create-form {
  display: flex;
  gap: var(--space-sm);
}

.grow {
  flex: 1;
  min-width: 0;
}

.encounters {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.panel-icons {
  display: flex;
  gap: var(--space-xs);
}

.dungeon {
  display: flex;
  align-items: flex-start;
  gap: var(--space-xs);
  padding: var(--space-sm) var(--space-xs) var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.dungeon-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dungeon-name {
  font-weight: 700;
}

.dungeon-meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.dungeon-desc {
  margin: var(--space-xs) 0 0;
  font-size: 0.82rem;
}

.label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
}

.players {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.player {
  min-height: 40px;
  padding: 0 var(--space-md);
  background: var(--accent-soft);
  border: 1px solid var(--accent);
  border-radius: var(--radius-pill);
  font: inherit;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--accent-strong);
  cursor: pointer;
}

.player.excluded {
  background: var(--surface-3);
  border-color: var(--border);
  color: var(--muted);
  text-decoration: line-through;
}

.form-error {
  margin: var(--space-sm) 0 0;
  color: var(--danger);
  font-size: 0.85rem;
}

.confirm {
  margin: 0;
}
</style>
