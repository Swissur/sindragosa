<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft, ScrollText, BookOpen, Sparkles, Crown } from 'lucide-vue-next'
import { fetchCampaign, fetchMemberCharacter, patchMemberCharacter } from '../api/campaigns'
import type { ServerCharacter } from '../api/characters'
import { toCharacter } from '../composables/useCharacter'
import { user } from '../composables/useAuth'
import { showToast } from '../composables/useToast'
import { computeMaxHp, domainRanks, progressState } from '../utils/sindragosa/sheet'
import { initiative } from '../utils/sindragosa/combat'
import { unlockedAbilities } from '../utils/sindragosa/prerequisites'
import { unlockedAdvancedDomains } from '../utils/sindragosa/advanced'
import { SPECIALTY_LEVEL_LABELS } from '../utils/sindragosa/rollSetup'
import type { Character } from '../types/character'

import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppTabs from '../components/ui/AppTabs.vue'
import HeroCard from '../components/character-sheet/HeroCard.vue'
import VitalsCard from '../components/character-sheet/VitalsCard.vue'
import StatsCard from '../components/character-sheet/StatsCard.vue'
import ResourcesCard from '../components/character-sheet/ResourcesCard.vue'
import SessionTicksBanner from '../components/character-sheet/SessionTicksBanner.vue'
import DomainsCard from '../components/character-sheet/DomainsCard.vue'
import CraftsCard from '../components/character-sheet/CraftsCard.vue'
import AbilitiesPanel from '../components/abilities/AbilitiesPanel.vue'
import UnlockedAbilitiesCard from '../components/abilities/UnlockedAbilitiesCard.vue'
import GmToolsSheet from '../components/character-sheet/GmToolsSheet.vue'

/** Fiche d'un membre, en lecture. Le MJ y règle caracs, récompenses, rangs et titres. */
const route = useRoute()
const router = useRouter()

const character = ref<Character | null>(null)
const portraitDataUrl = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const isGm = ref(false)
const showGmTools = ref(false)

const campaignId = Number(route.params.campaignId)
const targetUserId = Number(route.params.userId)

function applyRow(raw: ServerCharacter) {
  character.value = toCharacter(raw)
  portraitDataUrl.value = (raw as unknown as Record<string, unknown>).portraitDataUrl as string | null
}

onMounted(async () => {
  loading.value = true
  try {
    const [raw, campaign] = await Promise.all([fetchMemberCharacter(campaignId, targetUserId), fetchCampaign(campaignId)])
    applyRow(raw)
    isGm.value = campaign.gmUserId === user.value?.id
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    loading.value = false
  }
})

const hpMax = computed(() => (character.value ? computeMaxHp(character.value) : 0))
const init = computed(() => (character.value ? initiative(character.value.stats, domainRanks(character.value)) : 0))
const unlocked = computed(() => (character.value ? unlockedAbilities(progressState(character.value)) : []))
const unlockedAdvanced = computed(() =>
  character.value ? unlockedAdvancedDomains(progressState(character.value), unlocked.value) : [],
)

// Seul le MJ retire une spécialité, et c'est définitif : elle perd tous ses rangs.
type Specialty = Character['specialties'][number]
const toRemove = ref<Specialty | null>(null)
const removeOpen = computed({
  get: () => toRemove.value !== null,
  set: (v: boolean) => { if (!v) toRemove.value = null },
})
const removing = ref(false)

async function confirmRemove() {
  const s = toRemove.value
  if (!s || !character.value) return
  removing.value = true
  try {
    const specialties = character.value.specialties.filter((x) => x.id !== s.id)
    applyRow(await patchMemberCharacter(campaignId, targetUserId, { specialties }))
    showToast(`${s.name} retirée.`)
    toRemove.value = null
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'La spécialité n’a pas pu être retirée.')
  } finally {
    removing.value = false
  }
}

type TabId = 'heros' | 'domaines' | 'competences'
const activeTab = ref<TabId>('heros')
const TABS = [
  { value: 'heros', label: 'Héros', icon: ScrollText },
  { value: 'domaines', label: 'Domaines', icon: BookOpen },
  { value: 'competences', label: 'Compétences', icon: Sparkles },
]
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <template #actions>
          <AppIconBtn
            v-if="isGm && character"
            variant="primary"
            title="Outils du MJ"
            data-testid="open-gm-tools"
            @click="showGmTools = true"
          >
            <Crown :size="18" />
          </AppIconBtn>
          <AppIconBtn title="Retour à la campagne" @click="router.push(`/campagnes/${campaignId}`)">
            <ArrowLeft :size="18" />
          </AppIconBtn>
        </template>
        Fiche de {{ character?.name ?? 'personnage' }}
      </AppPageHead>
    </template>

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="error" variant="error">{{ error }}</AppEmptyState>

    <template v-else-if="character">
      <AppTabs v-model="activeTab" class="sheet-tabs" :tabs="TABS" icon-only-mobile />

      <template v-if="activeTab === 'heros'">
        <HeroCard :character="character" :portrait-override-url="portraitDataUrl" readonly />
        <VitalsCard :character="character" :hp-max="hpMax" :initiative="init" readonly />
        <StatsCard :character="character" readonly />
        <ResourcesCard :character="character" readonly />
      </template>

      <template v-if="activeTab === 'domaines'">
        <SessionTicksBanner :session-ticks="character.sessionTicks" />
        <DomainsCard
          :character="character"
          :advanced="unlockedAdvanced"
          readonly
          :can-remove-specialty="isGm"
          @remove-specialty="(s) => (toRemove = s)"
        />
        <CraftsCard :character="character" readonly />
      </template>

      <template v-if="activeTab === 'competences'">
        <!-- Le MJ voit tout le catalogue, verrouillées comprises ; un autre joueur, seulement ce qui est débloqué. -->
        <AbilitiesPanel v-if="isGm" :character="character" :unlocked="unlocked" readonly />
        <UnlockedAbilitiesCard v-else :character="character" :unlocked="unlocked" readonly />
      </template>

      <AppModal v-model="removeOpen" title="Retirer la spécialité ?">
        <p v-if="toRemove" class="remove-text">
          <strong>{{ toRemove.name }}</strong> ({{ SPECIALTY_LEVEL_LABELS[toRemove.level] }}) sera retirée de la fiche
          et perdra tous ses rangs. C'est irréversible.
        </p>
        <template #footer>
          <AppButton @click="toRemove = null">Annuler</AppButton>
          <AppButton variant="danger" :disabled="removing" data-testid="specialty-remove-confirm" @click="confirmRemove">
            Retirer
          </AppButton>
        </template>
      </AppModal>

      <GmToolsSheet
        v-if="isGm"
        v-model="showGmTools"
        :character="character"
        :campaign-id="campaignId"
        :user-id="targetUserId"
        @saved="applyRow"
      />
    </template>
  </AppPageLayout>
</template>

<style scoped>
.sheet-tabs {
  margin-bottom: var(--space-md);
}

.remove-text {
  margin: 0;
}
</style>
