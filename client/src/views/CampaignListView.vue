<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Plus, LogIn, Map, Crown } from 'lucide-vue-next'
import {
  fetchCampaigns,
  createCampaign,
  joinCampaign,
  CAMPAIGN_SYSTEMS,
  type CampaignSummary,
  type CampaignSystem,
} from '../api/campaigns'
import { user } from '../composables/useAuth'
import { enterCampaign } from '../composables/useCampaignEntry'
import { myCampaigns } from '../utils/entryRoute'
import { systemLabel } from '../data/systems'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppModal from '../components/ui/AppModal.vue'

const router = useRouter()

const campaigns = ref<CampaignSummary[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const mine = computed(() => myCampaigns(campaigns.value, user.value?.id ?? 0))
const others = computed(() => campaigns.value.filter((c) => !mine.value.includes(c)))

// Création : système + nom, le créateur devient MJ.
const showCreate = ref(false)
const newName = ref('')
const newSystem = ref<CampaignSystem>('wow-forever')
const createError = ref<string | null>(null)

onMounted(load)

async function load() {
  loading.value = true
  try {
    campaigns.value = await fetchCampaigns()
  } finally {
    loading.value = false
  }
}

async function enter(c: CampaignSummary) {
  error.value = null
  try {
    router.push(await enterCampaign(c))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

function onPick(id: number | null) {
  const c = mine.value.find((m) => m.id === id)
  if (c) void enter(c)
}

function openCreate() {
  newName.value = ''
  newSystem.value = 'wow-forever'
  createError.value = null
  showCreate.value = true
}

async function handleCreate() {
  createError.value = null
  try {
    const created = await createCampaign(newName.value.trim(), newSystem.value)
    showCreate.value = false
    // Le serveur l'a déjà rendue active : le MJ arrive sur son écran.
    if (user.value) user.value = { ...user.value, activeCampaignId: created.id }
    router.push(`/campagnes/${created.id}`)
  } catch (e) {
    createError.value = e instanceof Error ? e.message : 'Erreur'
  }
}

async function handleJoin(c: CampaignSummary) {
  error.value = null
  try {
    await joinCampaign(c.id)
    await enter({ ...c, isMember: true })
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <Map :size="22" />
        Campagnes
      </AppPageHead>
    </template>

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>

    <template v-else>
      <AppCard title="Sélection de la campagne">
        <div class="pick">
          <AppSelect
            v-if="mine.length > 0"
            :model-value="null as number | null"
            data-testid="campaign-select"
            @update:model-value="onPick"
          >
            <option :value="null" disabled>Choisir une campagne…</option>
            <option v-for="c in mine" :key="c.id" :value="c.id">
              {{ c.name }}{{ c.gmUserId === user?.id ? ' (MJ)' : '' }}
            </option>
          </AppSelect>
          <p v-else class="hint">Pas encore de campagne. Crée la tienne ou rejoins-en une.</p>
          <AppButton variant="primary" block data-testid="campaign-create" @click="openCreate">
            <Plus :size="16" />
            Créer une campagne
          </AppButton>
        </div>
      </AppCard>

      <p v-if="error" class="form-error">{{ error }}</p>

      <AppCard v-if="others.length > 0" title="Rejoindre">
        <div class="campaigns-list">
          <div v-for="c in others" :key="c.id" class="campaign-card">
            <div class="campaign-info">
              <span class="campaign-name">{{ c.name }}</span>
              <span class="campaign-meta">
                <Crown :size="13" class="meta-icon" />
                {{ c.gmUsername }}
                <span class="meta-sep">&middot;</span>
                {{ c.memberCount }} joueur{{ c.memberCount > 1 ? 's' : '' }}
                <span class="meta-sep">&middot;</span>
                {{ systemLabel(c.system) }}
              </span>
            </div>
            <AppIconBtn title="Rejoindre" :data-testid="`campaign-join-${c.id}`" @click="handleJoin(c)">
              <LogIn :size="18" />
            </AppIconBtn>
          </div>
        </div>
      </AppCard>
    </template>

    <AppModal v-model="showCreate" title="Nouvelle campagne">
      <form id="create-campaign" class="create-form" @submit.prevent="handleCreate">
        <label class="field">
          <span class="field-label">Système</span>
          <AppSelect v-model="newSystem" data-testid="campaign-system">
            <option v-for="s in CAMPAIGN_SYSTEMS" :key="s.value" :value="s.value">{{ s.label }}</option>
          </AppSelect>
        </label>
        <label class="field">
          <span class="field-label">Nom de la campagne</span>
          <AppInput v-model="newName" :required="true" :autofocus="true" data-testid="campaign-name" />
        </label>
        <p class="hint"><Crown :size="13" class="meta-icon" /> En créant la campagne, tu en seras le MJ.</p>
        <p v-if="createError" class="form-error">{{ createError }}</p>
      </form>
      <template #footer>
        <AppButton @click="showCreate = false">Annuler</AppButton>
        <AppButton type="submit" form="create-campaign" variant="primary">Créer</AppButton>
      </template>
    </AppModal>
  </AppPageLayout>
</template>

<style scoped>
.pick,
.create-form {
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
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
}

.hint {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}

.campaigns-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.campaign-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.campaign-info {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.campaign-name {
  font-weight: 700;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.campaign-meta {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  color: var(--muted);
}

.meta-icon {
  opacity: 0.6;
}

.form-error {
  color: var(--danger);
  font-size: 0.85rem;
  margin: 0;
}
</style>
