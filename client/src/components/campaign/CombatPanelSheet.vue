<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Play, Square, Pencil, Trash2, Plus, ArrowLeft } from 'lucide-vue-next'
import {
  createEncounter,
  deleteEncounter,
  fetchEncounters,
  type CampaignDetail,
  type EncounterSummary,
} from '../../api/campaigns'
import { createCombat, finishCombat, type CombatSummary } from '../../api/combats'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'

// Volet combat du MJ : les rencontres préparées, chacune avec ▶ (choisir les
// joueurs puis lancer), ■ si elle tourne, crayon et poubelle.
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

watch(open, async (isOpen) => {
  if (!isOpen) return
  launching.value = undefined
  showCreate.value = false
  error.value = null
  try {
    encounters.value = await fetchEncounters(props.campaign.id)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
})

const title = computed(() => {
  if (launching.value === undefined) return 'Combat'
  return launching.value?.name ?? 'Combat vide'
})

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
    <!-- Étape 1 : les rencontres -->
    <div v-if="launching === undefined" class="panel">
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

      <AppEmptyState v-if="encounters.length === 0 && !showCreate">
        Aucune rencontre. Prépare tes combats !
      </AppEmptyState>

      <ul v-else class="encounters">
        <li v-for="enc in encounters" :key="enc.id" class="encounter" :data-testid="`encounter-${enc.id}`">
          <div class="encounter-info">
            <span class="encounter-name">{{ enc.name }}</span>
            <span class="encounter-meta">{{ enc.monsterCount }} ennemi{{ enc.monsterCount > 1 ? 's' : '' }}</span>
          </div>
          <AppIconBtn
            v-if="isRunning(enc)"
            variant="danger"
            title="Arrêter le combat"
            data-testid="encounter-stop"
            @click="stop"
          >
            <Square :size="16" />
          </AppIconBtn>
          <AppIconBtn
            v-else
            variant="primary"
            title="Démarrer le combat"
            :disabled="!!activeCombat"
            data-testid="encounter-play"
            @click="startLaunch(enc)"
          >
            <Play :size="16" />
          </AppIconBtn>
          <AppIconBtn title="Éditer" @click="router.push(`/campagnes/${campaign.id}/rencontres/${enc.id}`)">
            <Pencil :size="16" />
          </AppIconBtn>
          <AppIconBtn variant="danger" title="Effacer" @click="confirmDelete = enc">
            <Trash2 :size="16" />
          </AppIconBtn>
        </li>
      </ul>
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

.encounter {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-xs) var(--space-xs) var(--space-xs) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.encounter-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.encounter-name {
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.encounter-meta {
  font-size: 0.78rem;
  color: var(--muted);
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
