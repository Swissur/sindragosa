<script setup lang="ts">
import { computed, ref } from 'vue'
import { ScrollText, Hexagon, ShieldHalf } from 'lucide-vue-next'
import AppTabs from '../ui/AppTabs.vue'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import HeroCard from '../character-sheet/HeroCard.vue'
import ResourcesCard from '../character-sheet/ResourcesCard.vue'
import KnightIdentity from './KnightIdentity.vue'
import KnightVitalsCard from './KnightVitalsCard.vue'
import KnightAspectsCard from './KnightAspectsCard.vue'
import KnightArmorCard from './KnightArmorCard.vue'
import KnightRollSheet from './KnightRollSheet.vue'
import { knightDerived } from '../../utils/knight/sheet'
import type { CaracId } from '../../data/knight/aspects'
import type { Character } from '../../types/character'
import type { KnightSheet as KnightSheetData } from '../../types/knight'

/** Fiche d'un chevalier Knight (plans/43) : identité, aspects, méta-armure. */
const props = defineProps<{
  character: Character
  sheet: KnightSheetData
  editing?: boolean
  readonly?: boolean
  portraitOverrideUrl?: string | null
}>()

type TabId = 'chevalier' | 'aspects' | 'armure'
const activeTab = ref<TabId>('chevalier')

const TABS = [
  { value: 'chevalier', label: 'Chevalier', icon: ScrollText },
  { value: 'aspects', label: 'Aspects', icon: Hexagon },
  { value: 'armure', label: 'Méta-armure', icon: ShieldHalf },
]

const derived = computed(() => knightDerived(props.sheet))

const PROFILE: { key: 'hautFait' | 'motivations' | 'avantages' | 'inconvenients'; label: string; placeholder: string }[] = [
  { key: 'hautFait', label: 'Haut fait', placeholder: "L'acte héroïque qui l'a mené au Knight" },
  { key: 'motivations', label: 'Motivations', placeholder: 'Mineures et majeure' },
  { key: 'avantages', label: 'Avantages', placeholder: 'Tirés des lames du tarot' },
  { key: 'inconvenients', label: 'Inconvénients', placeholder: 'Tirés des lames du tarot' },
]

const rollOpen = ref(false)
const rollBase = ref<CaracId | null>(null)

function openRoll(carac: CaracId) {
  rollBase.value = carac
  rollOpen.value = true
}
</script>

<template>
  <AppTabs v-model="activeTab" class="sheet-tabs" :tabs="TABS" icon-only-mobile />

  <template v-if="activeTab === 'chevalier'">
    <HeroCard :character="character" :editing="editing" :readonly="readonly" :portrait-override-url="portraitOverrideUrl">
      <template #identity>
        <KnightIdentity :sheet="sheet" :editing="editing" :readonly="readonly" />
      </template>
    </HeroCard>
    <KnightVitalsCard :character="character" :sheet="sheet" :derived="derived" :editing="editing" :readonly="readonly" />
    <ResourcesCard :character="character" :editing="editing" :readonly="readonly" />
    <AppCard title="Profil">
      <AppAccordion v-for="p in PROFILE" :key="p.key" :title="p.label" :default-open="editing">
        <AppTextarea v-if="editing && !readonly" v-model="sheet.identite[p.key]" :rows="3" :placeholder="p.placeholder" />
        <p v-else class="profile-text">{{ sheet.identite[p.key] || '—' }}</p>
      </AppAccordion>
    </AppCard>
  </template>

  <KnightAspectsCard
    v-if="activeTab === 'aspects'"
    :sheet="sheet"
    :editing="editing"
    :readonly="readonly"
    @roll="openRoll"
  />

  <KnightArmorCard v-if="activeTab === 'armure'" :sheet="sheet" :editing="editing" :readonly="readonly" />

  <KnightRollSheet v-if="!readonly" v-model="rollOpen" :sheet="sheet" :character-name="character.name" :base="rollBase" />
</template>

<style scoped>
.sheet-tabs {
  margin-bottom: var(--space-md);
}

.profile-text {
  margin: 0;
  font-size: 0.9rem;
  white-space: pre-wrap;
}
</style>
