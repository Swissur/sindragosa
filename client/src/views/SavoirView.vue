<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowLeft, BookOpen, Sparkles, Crown, Check, Lock } from 'lucide-vue-next'
import { fetchCampaign, fetchMemberCharacter, type CampaignMember } from '../api/campaigns'
import { user } from '../composables/useAuth'
import { toCharacter } from '../composables/useCharacter'
import { ADVANCED_DOMAINS, type AdvancedDomain } from '../data/sindragosa/domains'
import { ABILITIES } from '../data/sindragosa/abilities'
import { TITLES } from '../data/sindragosa/titles'
import { prerequisiteLabel, unlockedAbilities } from '../utils/sindragosa/prerequisites'
import { openingAbilities, unlockedAdvancedDomains } from '../utils/sindragosa/advanced'
import { progressState } from '../utils/sindragosa/sheet'
import type { Character } from '../types/character'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppSelect from '../components/ui/AppSelect.vue'
import AppTabs from '../components/ui/AppTabs.vue'
import AppCard from '../components/ui/AppCard.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AbilitiesPanel from '../components/abilities/AbilitiesPanel.vue'

/**
 * Le savoir du MJ : tout le catalogue (compétences, domaines avancés, titres).
 * En choisissant un personnage de la campagne, on voit ce qu'il a déjà débloqué
 * sans repasser par sa fiche.
 */
const router = useRouter()

const campaignId = computed(() => user.value?.activeCampaignId ?? null)
const members = ref<CampaignMember[]>([])
const selectedUserId = ref<number | null>(null)
const character = ref<Character | null>(null)
const error = ref<string | null>(null)

onMounted(async () => {
  if (!campaignId.value) return
  try {
    const campaign = await fetchCampaign(campaignId.value)
    if (campaign.gmUserId === user.value?.id) members.value = campaign.members.filter((m) => m.characterId)
  } catch { /* le catalogue reste utilisable sans la campagne */ }
})

watch(selectedUserId, async (userId) => {
  error.value = null
  character.value = null
  if (userId === null || !campaignId.value) return
  try {
    character.value = toCharacter(await fetchMemberCharacter(campaignId.value, userId))
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
})

const unlocked = computed(() => (character.value ? unlockedAbilities(progressState(character.value)) : []))
const openAdvanced = computed(() => {
  if (!character.value) return new Set<string>()
  return new Set(unlockedAdvancedDomains(progressState(character.value), unlocked.value).map((d) => d.id))
})
/** Comment s'ouvre un domaine avancé : par ses compétences s'il en a, sinon par ses prérequis. */
function advancedHowTo(d: AdvancedDomain): string {
  const abilities = openingAbilities(d, ABILITIES)
  return abilities.length
    ? `Compétence : ${abilities.map((a) => a.name).join(' ou ')}`
    : d.prerequisites.map(prerequisiteLabel).join(' · ')
}
const ownedTitles =computed(() => new Set(character.value?.titles ?? []))

type TabId = 'competences' | 'avances' | 'titres'
const activeTab = ref<TabId>('competences')
const TABS = [
  { value: 'competences', label: 'Compétences', icon: BookOpen },
  { value: 'avances', label: 'Domaines avancés', icon: Sparkles },
  { value: 'titres', label: 'Titres', icon: Crown },
]
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <template #actions>
          <AppIconBtn title="Retour" @click="router.back()">
            <ArrowLeft :size="18" />
          </AppIconBtn>
        </template>
        Savoir
      </AppPageHead>
    </template>

    <AppSelect v-if="members.length" v-model="selectedUserId" data-testid="savoir-character">
      <option :value="null">Tout le catalogue</option>
      <option v-for="m in members" :key="m.userId" :value="m.userId">
        {{ m.characterName ?? m.username }}
      </option>
    </AppSelect>
    <p v-if="error" class="form-error">{{ error }}</p>

    <AppTabs
      :model-value="activeTab"
      :tabs="TABS"
      :icon-only-mobile="true"
      @update:model-value="activeTab = $event as TabId"
    />

    <AbilitiesPanel
      v-if="activeTab === 'competences'"
      :key="character ? `c-${selectedUserId}` : 'catalogue'"
      :character="character"
      :unlocked="unlocked"
      readonly
    />

    <AppCard v-else-if="activeTab === 'avances'">
      <ul class="rows">
        <li
          v-for="d in ADVANCED_DOMAINS"
          :key="d.id"
          class="row"
          :class="{ 'row--locked': character && !openAdvanced.has(d.id) }"
        >
          <span class="row-head">
            <template v-if="character">
              <Check v-if="openAdvanced.has(d.id)" :size="15" class="ok" />
              <Lock v-else :size="15" />
            </template>
            <strong>{{ d.label }}</strong>
          </span>
          <span class="row-meta">{{ advancedHowTo(d) }}</span>
        </li>
      </ul>
    </AppCard>

    <AppCard v-else>
      <AppEmptyState v-if="TITLES.length === 0">Aucun titre.</AppEmptyState>
      <ul v-else class="rows">
        <li
          v-for="t in TITLES"
          :key="t"
          class="row"
          :class="{ 'row--locked': character && !ownedTitles.has(t) }"
        >
          <span class="row-head">
            <Check v-if="character && ownedTitles.has(t)" :size="15" class="ok" />
            {{ t }}
          </span>
        </li>
      </ul>
    </AppCard>
  </AppPageLayout>
</template>

<style scoped>
.rows {
  list-style: none;
  margin: 0;
  padding: 0;
}

.row {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  padding: var(--space-xs) 0;
  border-bottom: 1px solid var(--border);
}

.row:last-child {
  border-bottom: none;
}

.row--locked {
  opacity: 0.55;
}

.row-head {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.row-meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.ok {
  color: var(--accent-strong);
}

.form-error {
  margin: 0;
  color: var(--danger);
  font-size: 0.85rem;
}
</style>
