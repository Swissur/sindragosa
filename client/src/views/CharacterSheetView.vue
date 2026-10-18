<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ScrollText, BookOpen, Sparkles, Pencil, PencilOff } from 'lucide-vue-next'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppTabs from '../components/ui/AppTabs.vue'
import { useCharacter, loadCharacter } from '../composables/useCharacter'
import { showToast } from '../composables/useToast'

import HeroCard from '../components/character-sheet/HeroCard.vue'
import VitalsCard from '../components/character-sheet/VitalsCard.vue'
import StatsCard from '../components/character-sheet/StatsCard.vue'
import ResourcesCard from '../components/character-sheet/ResourcesCard.vue'
import WeaponsCard from '../components/character-sheet/WeaponsCard.vue'
import SessionTicksBanner from '../components/character-sheet/SessionTicksBanner.vue'
import DomainsCard from '../components/character-sheet/DomainsCard.vue'
import DistinctionsCard from '../components/character-sheet/DistinctionsCard.vue'
import CraftsCard from '../components/character-sheet/CraftsCard.vue'
import UnlockedAbilitiesCard from '../components/abilities/UnlockedAbilitiesCard.vue'

const { character, loading, loadError, saveStatus, computedHp, computedInitiative, unlocked, unlockedAdvanced } = useCharacter()
const route = useRoute()

const id = route.query.id ? Number(route.query.id) : undefined
loadCharacter(id)

type TabId = 'heros' | 'domaines' | 'avances'
const activeTab = ref<TabId>('heros')
const editing = ref(false)
const newPowers = ref(false)

const TABS = [
  { value: 'heros', label: 'Héros', icon: ScrollText },
  { value: 'domaines', label: 'Domaines', icon: BookOpen },
  { value: 'avances', label: 'Domaines avancés', icon: Sparkles },
]

// Un domaine qui monte peut débloquer des compétences ou ouvrir un domaine avancé :
// pastille sur l'onglet Domaines avancés.
watch(() => unlocked.value.length, (now, before) => {
  if (loading.value || before === undefined || now <= before) return
  showToast(now - before > 1 ? `${now - before} nouvelles compétences !` : 'Nouvelle compétence débloquée !')
  if (activeTab.value !== 'avances') newPowers.value = true
})

watch(() => unlockedAdvanced.value.length, (now, before) => {
  if (loading.value || before === undefined || now <= before) return
  showToast(now - before > 1 ? `${now - before} domaines avancés s'ouvrent !` : 'Un domaine avancé s’ouvre !')
  if (activeTab.value !== 'avances') newPowers.value = true
})

watch(activeTab, (tab) => { if (tab === 'avances') newPowers.value = false })
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        {{ character.name || 'Fiche' }}
        <template #actions>
          <AppIconBtn
            :variant="editing ? 'primary' : 'ghost'"
            :title="editing ? 'Terminer l’édition' : 'Modifier la fiche'"
            data-testid="sheet-edit"
            @click="editing = !editing"
          >
            <PencilOff v-if="editing" :size="18" />
            <Pencil v-else :size="18" />
          </AppIconBtn>
        </template>
      </AppPageHead>
      <p v-if="saveStatus === 'error'" class="save-status">Erreur de sauvegarde</p>
    </template>

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>

    <AppEmptyState v-else-if="loadError" variant="error">
      <p>{{ loadError }}</p>
      <template #actions>
        <AppButton size="small" @click="loadCharacter(id)">Réessayer</AppButton>
      </template>
    </AppEmptyState>

    <template v-else>
      <AppTabs
        v-model="activeTab"
        class="sheet-tabs"
        :tabs="TABS.map((t) => ({ ...t, dot: t.value === 'avances' && newPowers }))"
        icon-only-mobile
      />

      <template v-if="activeTab === 'heros'">
        <HeroCard :character="character" :editing="editing" />
        <VitalsCard :character="character" :hp-max="computedHp" :initiative="computedInitiative" :editing="editing" />
        <StatsCard :character="character" :editing="editing" />
        <WeaponsCard :character="character" :editing="editing" />
        <ResourcesCard :character="character" :editing="editing" />
      </template>

      <template v-if="activeTab === 'domaines'">
        <SessionTicksBanner :session-ticks="character.sessionTicks" />
        <DomainsCard :character="character" :editing="editing" />
        <CraftsCard :character="character" :editing="editing" />
      </template>

      <template v-if="activeTab === 'avances'">
        <DistinctionsCard :character="character" :advanced="unlockedAdvanced" />
        <UnlockedAbilitiesCard :character="character" :unlocked="unlocked" />
      </template>
    </template>
  </AppPageLayout>
</template>

<style scoped>
.save-status {
  margin: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--danger);
}

.sheet-tabs {
  margin-bottom: var(--space-md);
}
</style>
