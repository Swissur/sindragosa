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
import { showToast, type ToastDetail } from '../composables/useToast'
import { usePins } from '../composables/usePins'
import { abilityDetail, advancedDetail } from '../utils/sindragosa/unlockDetails'
import type { Pin } from '../utils/sindragosa/pins'

import HeroCard from '../components/character-sheet/HeroCard.vue'
import VitalsCard from '../components/character-sheet/VitalsCard.vue'
import StatsCard from '../components/character-sheet/StatsCard.vue'
import ResourcesCard from '../components/character-sheet/ResourcesCard.vue'
import SessionTicksBanner from '../components/character-sheet/SessionTicksBanner.vue'
import DomainsCard from '../components/character-sheet/DomainsCard.vue'
import CraftsCard from '../components/character-sheet/CraftsCard.vue'
import UnlockedAbilitiesCard from '../components/abilities/UnlockedAbilitiesCard.vue'

const { character, loading, loadError, saveStatus, computedHp, computedInitiative, unlocked, unlockedAdvanced } = useCharacter()
const route = useRoute()

const id = route.query.id ? Number(route.query.id) : undefined
loadCharacter(id)

type TabId = 'heros' | 'domaines' | 'competences'
const activeTab = ref<TabId>('heros')
const editing = ref(false)
/** Pastille « du nouveau ici » sur un onglet. */
const news = ref<Partial<Record<TabId, boolean>>>({})

const TABS = [
  { value: 'heros', label: 'Héros', icon: ScrollText },
  { value: 'domaines', label: 'Domaines', icon: BookOpen },
  { value: 'competences', label: 'Compétences', icon: Sparkles },
]

// Un domaine qui monte peut débloquer des compétences ou ouvrir un domaine avancé :
// toast qui reste, avec la fiche de chaque nouveauté, et pastille sur l'onglet.
// On ne compare que deux états du même perso : un chargement n'est pas un déblocage.
function onAdded<T extends { id: string | number }>(list: () => T[], tab: TabId, announce: (added: T[]) => void) {
  watch(() => ({ owner: character.value.id, list: list() }), (now, before) => {
    if (loading.value || now.owner !== before.owner) return
    const known = new Set(before.list.map((x) => x.id))
    const added = now.list.filter((x) => !known.has(x.id))
    if (!added.length) return
    announce(added)
    if (activeTab.value !== tab) news.value[tab] = true
  })
}

// L'étoile du toast épingle la nouveauté dans « Mes actions »
const { isPinned, toggle } = usePins(character)
const pinnable = (detail: ToastDetail, pin: Pin): ToastDetail => ({
  ...detail,
  pin: { isPinned: () => isPinned(pin), toggle: () => toggle(pin) },
})

onAdded(() => unlocked.value, 'competences', (added) => showToast(
  added.length > 1 ? `${added.length} nouvelles compétences !` : 'Nouvelle compétence débloquée !',
  { persistent: true, details: added.map((a) => pinnable(abilityDetail(a), `ability:${a.id}`)) },
))

onAdded(() => unlockedAdvanced.value, 'domaines', (added) => showToast(
  added.length > 1 ? `${added.length} domaines avancés s'ouvrent !` : 'Un domaine avancé s’ouvre !',
  { persistent: true, details: added.map((d) => pinnable(advancedDetail(d), `domain:${d.id}`)) },
))

watch(activeTab, (tab) => { news.value[tab] = false })
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
        :tabs="TABS.map((t) => ({ ...t, dot: !!news[t.value as TabId] }))"
        icon-only-mobile
      />

      <template v-if="activeTab === 'heros'">
        <HeroCard :character="character" :editing="editing" />
        <VitalsCard :character="character" :hp-max="computedHp" :initiative="computedInitiative" :editing="editing" />
        <StatsCard :character="character" :editing="editing" />
        <ResourcesCard :character="character" :editing="editing" />
      </template>

      <template v-if="activeTab === 'domaines'">
        <SessionTicksBanner :session-ticks="character.sessionTicks" />
        <DomainsCard :character="character" :advanced="unlockedAdvanced" />
        <CraftsCard :character="character" :editing="editing" />
      </template>

      <template v-if="activeTab === 'competences'">
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
