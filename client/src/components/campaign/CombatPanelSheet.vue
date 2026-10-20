<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Play, Plus, ArrowLeft, Castle, Download, Check, Trash2, Hammer } from 'lucide-vue-next'
import {
  createEncounter,
  deleteDungeon,
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

// Volet combat du MJ, en deux sections : les Créations du MJ (avec le combat
// vide et la nouvelle rencontre) puis les Donjons chargés, repliés par défaut.
// Chaque rencontre a ▶ (choisir les joueurs puis lancer), ■ si elle tourne,
// crayon et poubelle. Un donjon chargé s'efface d'un coup.
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
const confirmDeleteDungeon = ref<string | null>(null)

const creationsOpen = ref(true)
const dungeonsOpen = ref(false)

/** Étape « Donjons prêts » : la liste des donjons à importer. */
const showDungeons = ref(false)
const importingName = ref<string | null>(null)

const groups = computed(() => groupByDungeon(encounters.value))
const creations = computed(() => groups.value.find((g) => g.dungeon === null)?.items ?? [])
const dungeonGroups = computed(() => groups.value.filter((g) => g.dungeon !== null))

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
    creationsOpen.value = true
    dungeonsOpen.value = dungeonGroups.value.some((g) => g.items.some(isRunning))
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
    dungeonsOpen.value = true
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

async function handleDeleteDungeon(dungeon: string) {
  confirmDeleteDungeon.value = null
  error.value = null
  try {
    await deleteDungeon(props.campaign.id, dungeon)
    encounters.value = encounters.value.filter((e) => e.dungeon !== dungeon)
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
      <AppAccordion
        v-model:open="creationsOpen"
        title="Créations"
        :hint="`${creations.length} combat${creations.length > 1 ? 's' : ''}`"
        testid="section-creations"
      >
        <template #icon><Hammer :size="16" /></template>
        <div class="section">
          <div class="panel-actions">
            <AppButton size="small" data-testid="combat-empty" @click="startLaunch(null)">
              <Play :size="14" />
              Combat vide
            </AppButton>
            <AppIconBtn title="Nouvelle rencontre" data-testid="encounter-new" @click="showCreate = !showCreate">
              <Plus :size="18" />
            </AppIconBtn>
          </div>

          <form v-if="showCreate" class="create-form" @submit.prevent="handleCreate">
            <AppInput v-model="newName" class="grow" placeholder="Nom de la rencontre" :required="true" :autofocus="true" />
            <AppButton type="submit" variant="primary">Créer</AppButton>
          </form>

          <AppEmptyState v-if="creations.length === 0 && !showCreate">
            Aucune rencontre. Prépare tes combats !
          </AppEmptyState>

          <ul v-else class="encounters">
            <EncounterRow
              v-for="enc in creations"
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
        </div>
      </AppAccordion>

      <AppAccordion
        v-model:open="dungeonsOpen"
        title="Donjons"
        :hint="`${dungeonGroups.length} donjon${dungeonGroups.length > 1 ? 's' : ''}`"
        testid="section-dungeons"
      >
        <template #icon><Castle :size="16" /></template>
        <div class="section">
          <AppButton size="small" class="self-start" data-testid="dungeons-open" @click="showDungeons = true">
            <Download :size="14" />
            Charger un donjon
          </AppButton>

          <AppEmptyState v-if="dungeonGroups.length === 0">Aucun donjon chargé.</AppEmptyState>

          <div v-else class="dungeon-groups">
            <AppAccordion
              v-for="group in dungeonGroups"
              :key="group.dungeon!"
              :title="group.dungeon!"
              :hint="`${group.items.length} combat${group.items.length > 1 ? 's' : ''}`"
              :default-open="group.items.some(isRunning)"
              :testid="`dungeon-group-${group.dungeon}`"
            >
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
              <div class="dungeon-actions">
                <AppIconBtn
                  variant="danger"
                  title="Effacer le donjon"
                  :disabled="group.items.some(isRunning)"
                  :data-testid="`dungeon-delete-${group.dungeon}`"
                  @click="confirmDeleteDungeon = group.dungeon"
                >
                  <Trash2 :size="16" />
                </AppIconBtn>
              </div>
            </AppAccordion>
          </div>
        </div>
      </AppAccordion>
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

  <AppModal
    :model-value="confirmDeleteDungeon !== null"
    title="Effacer le donjon"
    @update:model-value="confirmDeleteDungeon = null"
  >
    <p class="confirm">Effacer « {{ confirmDeleteDungeon }} » et tous ses combats ? Tu pourras le recharger.</p>
    <template #footer>
      <AppButton @click="confirmDeleteDungeon = null">Annuler</AppButton>
      <AppButton variant="danger" data-testid="dungeon-delete-confirm" @click="handleDeleteDungeon(confirmDeleteDungeon!)">
        Effacer
      </AppButton>
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

.section {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.dungeon-groups {
  padding-left: var(--space-sm);
}

.dungeon-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: var(--space-sm);
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
