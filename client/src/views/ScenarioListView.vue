<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { BookMarked, Plus, ChevronRight } from 'lucide-vue-next'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppButton from '../components/ui/AppButton.vue'
import { createScenario, fetchScenarios, type ScenarioSummary } from '../api/scenarios'
import { useGmCampaign } from '../composables/useGmCampaign'
import { showToast } from '../composables/useToast'
import { relativeTime } from '../utils/relativeTime'

// Les scénarios du MJ (plans/47) pour sa campagne active.
const router = useRouter()
const { gmCampaignId, gmCampaignResolved } = useGmCampaign()

const scenarios = ref<ScenarioSummary[]>([])
const loading = ref(true)

watch(gmCampaignId, async (campaignId) => {
  if (!campaignId) { loading.value = false; return }
  loading.value = true
  try {
    scenarios.value = await fetchScenarios(campaignId)
  } catch {
    showToast('Impossible de charger les scénarios.')
  }
  loading.value = false
}, { immediate: true })

const creating = ref(false)
const newTitle = ref('')

async function create() {
  const campaignId = gmCampaignId.value
  if (!campaignId || !newTitle.value.trim()) return
  try {
    const scenario = await createScenario(campaignId, newTitle.value.trim())
    creating.value = false
    newTitle.value = ''
    router.push(`/scenarios/${scenario.id}`)
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'Erreur')
  }
}
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <BookMarked :size="22" /> Scénarios
        <template v-if="gmCampaignId" #actions>
          <AppIconBtn variant="primary" title="Nouveau scénario" data-testid="scenario-new" @click="creating = true">
            <Plus :size="18" />
          </AppIconBtn>
        </template>
      </AppPageHead>
    </template>

    <AppEmptyState v-if="!gmCampaignResolved || loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="!gmCampaignId">
      Les scénarios sont réservés au MJ de la campagne active.
    </AppEmptyState>
    <AppEmptyState v-else-if="!scenarios.length">
      Aucun scénario. Prépare ta prochaine aventure : texte, images, objets et PNJ à révéler.
    </AppEmptyState>
    <ul v-else class="scenario-list">
      <li v-for="s in scenarios" :key="s.id">
        <RouterLink :to="`/scenarios/${s.id}`" class="scenario-item" :data-testid="`scenario-${s.id}`">
          <div class="scenario-info">
            <span class="scenario-title">{{ s.title }}</span>
            <span class="scenario-meta">{{ s.blockCount }} bloc{{ s.blockCount > 1 ? 's' : '' }} · {{ relativeTime(s.updatedAt) }}</span>
          </div>
          <ChevronRight :size="18" class="scenario-chevron" />
        </RouterLink>
      </li>
    </ul>

    <AppModal v-model="creating" title="Nouveau scénario">
      <form class="create-form" @submit.prevent="create">
        <AppInput v-model="newTitle" placeholder="Titre (ex : Le secret de Comté-de-l'Or)" autofocus data-testid="scenario-title-input" />
      </form>
      <template #footer>
        <AppButton @click="creating = false">Annuler</AppButton>
        <AppButton variant="primary" :disabled="!newTitle.trim()" data-testid="scenario-create" @click="create">Créer</AppButton>
      </template>
    </AppModal>
  </AppPageLayout>
</template>

<style scoped>
.scenario-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.scenario-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md) var(--space-lg);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border);
  background: var(--surface);
  color: inherit;
  text-decoration: none;
  transition: border-color 120ms, background 120ms;
}

.scenario-item:hover {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 6%, var(--surface));
}

.scenario-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.scenario-title {
  font-family: var(--title-font);
  font-weight: 700;
  font-size: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scenario-meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.scenario-chevron {
  color: var(--muted);
  flex-shrink: 0;
}

.create-form {
  display: flex;
}

.create-form > * {
  flex: 1;
}
</style>
