<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, Crown, Swords, Settings, Bed, BookOpen, Moon, Coffee, Sunrise, Sunset } from 'lucide-vue-next'
import {
  activateCampaign,
  fetchCampaign,
  postRest,
  setCampaignSession,
  type CampaignDetail,
  type CampaignMember,
  type RestKind,
} from '../api/campaigns'
import { fetchCombats, type CombatSummary } from '../api/combats'
import { user } from '../composables/useAuth'
import { refreshActiveCombat } from '../composables/useActiveCombat'
import { liveSessionActive, onlineUserIds } from '../composables/useCampaignLive'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppBottomSheet from '../components/ui/AppBottomSheet.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppCheckbox from '../components/ui/AppCheckbox.vue'
import MemberGrid from '../components/campaign/MemberGrid.vue'
import MemberShortcutsSheet from '../components/campaign/MemberShortcutsSheet.vue'
import CombatPanelSheet from '../components/campaign/CombatPanelSheet.vue'
import CampaignOptionsSheet from '../components/campaign/CampaignOptionsSheet.vue'

const route = useRoute()
const router = useRouter()

const campaign = ref<CampaignDetail | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const isGm = computed(() => campaign.value?.gmUserId === user.value?.id)

/** Le flux SSE ne parle que de la campagne active. */
const isLive = computed(() => campaign.value != null && user.value?.activeCampaignId === campaign.value.id)

const online = computed(() => {
  if (isLive.value && onlineUserIds.value) return new Set(onlineUserIds.value)
  return new Set(campaign.value?.members.filter((m) => m.online).map((m) => m.userId) ?? [])
})

const sessionActive = computed(() =>
  (isLive.value ? liveSessionActive.value : null) ?? campaign.value?.sessionActive ?? false,
)

const combatsList = ref<CombatSummary[]>([])
const activeCombat = computed(() => combatsList.value.find((c) => c.status === 'active'))

// Panneaux de l'écran MJ
const shortcutsFor = ref<CampaignMember | null>(null)
const showCombat = ref(false)
const showRest = ref(false)
const showOptions = ref(false)
const confirmEndSession = ref(false)
/** Décoché par défaut : le MJ peut toujours lancer le repos long à la main. */
const endWithLongRest = ref(false)

onMounted(load)

async function load() {
  loading.value = true
  error.value = null
  try {
    campaign.value = await fetchCampaign(Number(route.params.id))
    combatsList.value = await fetchCombats(campaign.value.id)
    await makeActive(campaign.value)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    loading.value = false
  }
}

/** Ouvrir une campagne, c'est y entrer : présence et session arrivent par son flux. */
async function makeActive(c: CampaignDetail) {
  const me = user.value
  if (!me || me.activeCampaignId === c.id) return
  const isMember = c.gmUserId === me.id || c.members.some((m) => m.userId === me.id)
  if (!isMember) return
  await activateCampaign(c.id)
  user.value = { ...me, activeCampaignId: c.id }
}

async function reloadCombats() {
  if (!campaign.value) return
  combatsList.value = await fetchCombats(campaign.value.id)
  void refreshActiveCombat()
}

function onMemberSelect(m: CampaignMember) {
  if (isGm.value) shortcutsFor.value = m
  else router.push(`/campagnes/${campaign.value!.id}/personnage/${m.userId}`)
}

// Repos partagé (MJ) — le serveur applique et diffuse, le feu de camp part tout seul.
// La fin de séance passe par « Fin de session ».
const resting = ref(false)
const restError = ref<string | null>(null)

async function doRest(kind: RestKind) {
  if (!campaign.value || resting.value) return
  resting.value = true
  restError.value = null
  try {
    await postRest(campaign.value.id, kind)
    showRest.value = false
  } catch {
    restError.value = "Le repos n'a pas pu être lancé."
  } finally {
    resting.value = false
  }
}

const sessionBusy = ref(false)

async function setSession(active: boolean) {
  if (!campaign.value || sessionBusy.value) return
  sessionBusy.value = true
  confirmEndSession.value = false
  try {
    const result = await setCampaignSession(campaign.value.id, active, endWithLongRest.value)
    campaign.value = { ...campaign.value, sessionActive: result.sessionActive }
    if (isLive.value) liveSessionActive.value = result.sessionActive
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    sessionBusy.value = false
  }
}
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <template #actions>
          <AppIconBtn title="Campagnes" @click="router.push('/campagnes')">
            <ArrowLeft :size="18" />
          </AppIconBtn>
          <AppIconBtn v-if="campaign && !isGm" title="Options" @click="showOptions = true">
            <Settings :size="18" />
          </AppIconBtn>
        </template>
        {{ campaign?.name ?? 'Campagne' }}
      </AppPageHead>
    </template>

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="error && !campaign" variant="error">{{ error }}</AppEmptyState>

    <template v-else-if="campaign">
      <div class="gm-banner">
        <Crown :size="16" class="gm-icon" />
        <span>MJ : <strong>{{ campaign.gmUsername }}</strong></span>
        <span v-if="sessionActive" class="session-tag" data-testid="session-tag">Session en cours</span>
      </div>

      <AppEmptyState v-if="campaign.members.length === 0">
        Aucun joueur n'a encore rejoint cette campagne.
      </AppEmptyState>
      <MemberGrid v-else :members="campaign.members" :online="online" @select="onMemberSelect" />

      <div
        v-if="activeCombat"
        class="active-combat"
        data-testid="active-combat"
        @click="router.push(`/campagnes/${campaign.id}/combat/${activeCombat.id}`)"
      >
        <Swords :size="20" class="combat-icon" />
        <div class="active-combat-info">
          <span class="combat-name">{{ activeCombat.name }}</span>
          <span class="combat-round">Round {{ activeCombat.roundNumber }}</span>
        </div>
        <AppButton variant="primary" size="small">Rejoindre</AppButton>
      </div>

      <template v-if="isGm">
        <nav class="gm-tools" aria-label="Outils du MJ">
          <AppIconBtn title="Combat" data-testid="gm-combat" @click="showCombat = true">
            <Swords :size="20" />
          </AppIconBtn>
          <AppIconBtn title="Repos" data-testid="gm-rest" @click="showRest = true">
            <Bed :size="20" />
          </AppIconBtn>
          <AppIconBtn title="Savoir" data-testid="gm-savoir" @click="router.push('/savoir')">
            <BookOpen :size="20" />
          </AppIconBtn>
          <AppIconBtn title="Options" data-testid="gm-options" @click="showOptions = true">
            <Settings :size="20" />
          </AppIconBtn>
        </nav>

        <AppButton
          v-if="!sessionActive"
          variant="primary"
          block
          :disabled="sessionBusy"
          data-testid="session-start"
          @click="setSession(true)"
        >
          <Sunrise :size="16" />
          Début de la session
        </AppButton>
        <AppButton
          v-else
          variant="danger"
          block
          :disabled="sessionBusy"
          data-testid="session-end"
          @click="endWithLongRest = false; confirmEndSession = true"
        >
          <Sunset :size="16" />
          Fin de session
        </AppButton>
        <p v-if="error" class="form-error">{{ error }}</p>
      </template>

      <MemberShortcutsSheet v-if="isGm" v-model="shortcutsFor" :campaign-id="campaign.id" />
      <CombatPanelSheet
        v-if="isGm"
        v-model="showCombat"
        :campaign="campaign"
        :active-combat="activeCombat"
        @combats-changed="reloadCombats"
      />
      <CampaignOptionsSheet v-model="showOptions" :campaign="campaign" :is-gm="isGm" @updated="load" />
    </template>

    <!-- Repos partagé (MJ) : chaque repos remet à zéro les usages de sa période. -->
    <AppBottomSheet v-model="showRest" title="Faire reposer le groupe">
      <div class="rest-choices">
        <button type="button" class="rest-choice" :disabled="resting" data-testid="rest-court" @click="doRest('court')">
          <Coffee :size="20" class="rest-choice-icon" />
          <span class="rest-choice-text">
            <strong>Repos court</strong>
            <small>Une pause — les usages « combat » et « repos court » reviennent.</small>
          </span>
        </button>
        <button type="button" class="rest-choice" :disabled="resting" data-testid="rest-long" @click="doRest('long')">
          <Moon :size="20" class="rest-choice-icon" />
          <span class="rest-choice-text">
            <strong>Repos long</strong>
            <small>Une nuit — PV au max, états levés, usages du jour rendus.</small>
          </span>
        </button>
      </div>
      <p v-if="restError" class="rest-error">{{ restError }}</p>
    </AppBottomSheet>

    <AppModal v-model="confirmEndSession" title="Fin de session">
      <p class="confirm">
        Tout le groupe récupère 2 points de chance et ses coches de séance sont remises à zéro.
      </p>
      <AppCheckbox v-model="endWithLongRest" testid="session-end-long-rest">
        Le groupe fait aussi un repos long
      </AppCheckbox>
      <template #footer>
        <AppButton @click="confirmEndSession = false">Annuler</AppButton>
        <AppButton variant="danger" data-testid="session-end-confirm" @click="setSession(false)">Terminer</AppButton>
      </template>
    </AppModal>
  </AppPageLayout>
</template>

<style scoped>
.gm-banner {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  font-size: 0.9rem;
  color: var(--muted);
}

.gm-icon {
  color: var(--accent);
}

.session-tag {
  margin-left: auto;
  padding: 0.1rem var(--space-sm);
  border-radius: var(--radius-pill);
  background: var(--accent-soft);
  color: var(--accent-strong);
  font-size: 0.75rem;
  font-weight: 700;
}

.gm-tools {
  display: flex;
  justify-content: center;
  gap: var(--space-md);
  padding: var(--space-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.active-combat {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 2px solid var(--accent);
  border-radius: var(--radius-lg);
  cursor: pointer;
}

.active-combat-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.combat-icon {
  color: var(--accent);
}

.combat-name {
  font-weight: 700;
}

.combat-round {
  font-size: 0.8rem;
  color: var(--muted);
}

.form-error {
  color: var(--danger);
  font-size: 0.85rem;
  margin: 0;
}

.confirm {
  margin: 0;
}

/* ── Repos partagé ──────────────────────────────────────────────────────── */
.rest-choices {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.rest-choice {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  width: 100%;
  padding: var(--space-md);
  text-align: left;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: inherit;
  font: inherit;
  cursor: pointer;
  transition: border-color 160ms ease, background 160ms ease;
}

.rest-choice:hover:not(:disabled) {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.rest-choice:disabled {
  opacity: 0.6;
  cursor: default;
}

.rest-choice-icon {
  flex-shrink: 0;
  color: var(--brand-strong);
}

.rest-choice-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.rest-choice-text small {
  color: var(--muted);
  font-size: 0.8rem;
}

.rest-error {
  margin: var(--space-md) 0 0;
  color: var(--danger);
  font-size: 0.85rem;
}
</style>
