<script setup lang="ts">
import { computed, ref } from 'vue'
import { Swords, Star, Tent, Dices } from 'lucide-vue-next'
import AppTabs from '../ui/AppTabs.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppButton from '../ui/AppButton.vue'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AgonieWatch from '../AgonieWatch.vue'
import ActionTile from './ActionTile.vue'
import AbilityCard from '../abilities/AbilityCard.vue'
import { ACTION_TYPES, COMBAT_ACTION_TYPES } from '../abilities/actionTypes'
import { useCharacter, loadCharacter } from '../../composables/useCharacter'
import { openRollSheet } from '../../composables/useRollSheet'
import { usePins } from '../../composables/usePins'
import { DOMAINS, domainById } from '../../data/sindragosa/domains'
import { raceAbility, raceById } from '../../data/sindragosa/races'
import { rollSetup } from '../../utils/sindragosa/rollSetup'
import { USES_PER_LABELS } from '../../utils/sindragosa/abilityUses'
import { strikeWeapons, weaponDamage, weaponDomainId } from '../../utils/sindragosa/equipment'
import type { Ability } from '../../data/sindragosa/types'
import type { Pin } from '../../utils/sindragosa/pins'

/**
 * Mes actions, onglet du combat (plans/32) : des tuiles prêtes à lancer. Favoris épinglés,
 * Combat (armes et compétences d'action), Hors combat (domaines et le reste).
 * Hors combat, les favoris vivent dans l'onglet Favoris de la fiche.
 */
const { character, loading, loadError, unlocked, unlockedAdvanced } = useCharacter()

const { pins, toggle, isPinned } = usePins(character)

type TabId = 'favoris' | 'combat' | 'hors-combat'
const activeTab = ref<TabId>('favoris')
const TABS = [
  { value: 'favoris', label: 'Favoris', icon: Star },
  { value: 'combat', label: 'Combat', icon: Swords },
  { value: 'hors-combat', label: 'Hors combat', icon: Tent },
]

const domainPin = (id: string): Pin => `domain:${id}`
const abilityPin = (id: number): Pin => `ability:${id}`
const specialtyPin = (id: string): Pin => `specialty:${id}`

function poolLabel(domainId: string, specialtyId = ''): string {
  const s = rollSetup(character.value, { domainId, specialtyId, mode: 'normal', luck: 0 })
  return s ? `${s.count}d6` : ''
}

/** Domaines entamés, puis domaines avancés ouverts : tout ce qui se lance hors combat. */
const startedDomains = computed<{ id: string; label: string }[]>(() => [
  ...DOMAINS.filter((d) => {
    const p = character.value.domains[d.id]
    return p && (p.rank > 0 || p.ticks > 0)
  }),
  ...unlockedAdvanced.value,
])

/** Les armes équipées (ou celle de la forme, ou les mains nues) : leur attaque est une action de combat. */
const weapons = computed(() => strikeWeapons(character.value))

/** Le pouvoir racial se range avec les compétences débloquées. */
const abilities = computed(() => {
  const race = raceById(character.value.race)
  return race ? [raceAbility(race), ...unlocked.value] : unlocked.value
})
const activeAbilities = computed(() => abilities.value.filter((a) => a.actionType !== 'passif'))
const combatAbilities = computed(() => activeAbilities.value.filter((a) => COMBAT_ACTION_TYPES.includes(a.actionType)))
const otherAbilities = computed(() => activeAbilities.value.filter((a) => !COMBAT_ACTION_TYPES.includes(a.actionType)))

const pinnedDomains = computed(() =>
  pins.value
    .filter((p) => p.startsWith('domain:'))
    .map((p) => domainById(p.slice(7)) ?? unlockedAdvanced.value.find((d) => d.id === p.slice(7)))
    .filter((d) => !!d),
)
// Une spécialité épinglée puis supprimée ne s'affiche plus
const pinnedSpecialties = computed(() =>
  character.value.specialties.filter((s) => pins.value.includes(specialtyPin(s.id))),
)
const pinnedAbilities = computed(() => {
  const ids = new Set(pins.value.filter((p) => p.startsWith('ability:')).map((p) => Number(p.slice(8))))
  // Une compétence épinglée puis reperdue (rang retiré) ne s'affiche plus
  return abilities.value.filter((a) => ids.has(a.id))
})

function abilityDetail(a: Ability): string {
  return a.usesPer ? `${ACTION_TYPES[a.actionType].label} · ${USES_PER_LABELS[a.usesPer]}` : ACTION_TYPES[a.actionType].label
}

const openedAbility = ref<Ability | null>(null)
const abilitySheetOpen = computed({
  get: () => openedAbility.value !== null,
  set: (v: boolean) => { if (!v) openedAbility.value = null },
})

const rollDomain = (domainId: string) => openRollSheet({ domainId, context: 'actions' })
</script>

<template>
  <div data-testid="actions-panel">
    <AgonieWatch />

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="loadError" variant="error">
      <p>{{ loadError }}</p>
      <template #actions>
        <AppButton size="small" @click="loadCharacter()">Réessayer</AppButton>
      </template>
    </AppEmptyState>
    <AppEmptyState v-else-if="!character.id">Aucun personnage.</AppEmptyState>

    <template v-else>
      <AppTabs v-model="activeTab" class="actions-tabs" :tabs="TABS" icon-only-mobile />

      <div v-if="activeTab === 'favoris'" class="tiles">
        <ActionTile
          v-for="d in pinnedDomains"
          :key="d.id"
          :icon="Dices"
          :label="d.label"
          :detail="poolLabel(d.id)"
          :pinned="true"
          :testid="`tile-domain-${d.id}`"
          @activate="rollDomain(d.id)"
          @toggle-pin="toggle(domainPin(d.id))"
        />
        <ActionTile
          v-for="s in pinnedSpecialties"
          :key="s.id"
          :icon="Dices"
          :label="s.name"
          :detail="`${domainById(s.domainId)?.label ?? ''} · ${poolLabel(s.domainId, s.id)}`"
          :pinned="true"
          :testid="`tile-specialty-${s.id}`"
          @activate="openRollSheet({ domainId: s.domainId, specialtyId: s.id, context: 'actions' })"
          @toggle-pin="toggle(specialtyPin(s.id))"
        />
        <ActionTile
          v-for="a in pinnedAbilities"
          :key="a.id"
          :icon="ACTION_TYPES[a.actionType].icon"
          :label="a.name"
          :detail="abilityDetail(a)"
          :pinned="true"
          :testid="`tile-ability-${a.id}`"
          @activate="openedAbility = a"
          @toggle-pin="toggle(abilityPin(a.id))"
        />
        <AppEmptyState v-if="!pinnedDomains.length && !pinnedSpecialties.length && !pinnedAbilities.length">
          Épingle tes domaines et compétences préférés depuis les autres onglets.
        </AppEmptyState>
      </div>

      <div v-if="activeTab === 'combat'" class="tiles">
        <ActionTile
          v-for="w in weapons"
          :key="w.id"
          :icon="Swords"
          :label="w.name"
          :detail="`${poolLabel(weaponDomainId(w))} · ${weaponDamage(w)} dégâts`"
          :testid="`tile-weapon-${w.id}`"
          @activate="openRollSheet({ domainId: weaponDomainId(w), label: w.name, weapon: w, context: 'actions' })"
        />
        <ActionTile
          v-for="a in combatAbilities"
          :key="a.id"
          :icon="ACTION_TYPES[a.actionType].icon"
          :label="a.name"
          :detail="abilityDetail(a)"
          :pinned="isPinned(abilityPin(a.id))"
          :testid="`tile-ability-${a.id}`"
          @activate="openedAbility = a"
          @toggle-pin="toggle(abilityPin(a.id))"
        />
        <AppEmptyState v-if="!weapons.length && !combatAbilities.length">
          Pas encore de compétence de combat.
        </AppEmptyState>
      </div>

      <div v-if="activeTab === 'hors-combat'" class="tiles">
        <ActionTile
          v-for="d in startedDomains"
          :key="d.id"
          :icon="Dices"
          :label="d.label"
          :detail="poolLabel(d.id)"
          :pinned="isPinned(domainPin(d.id))"
          :testid="`tile-domain-${d.id}`"
          @activate="rollDomain(d.id)"
          @toggle-pin="toggle(domainPin(d.id))"
        />
        <ActionTile
          v-for="a in otherAbilities"
          :key="a.id"
          :icon="ACTION_TYPES[a.actionType].icon"
          :label="a.name"
          :detail="abilityDetail(a)"
          :pinned="isPinned(abilityPin(a.id))"
          :testid="`tile-ability-${a.id}`"
          @activate="openedAbility = a"
          @toggle-pin="toggle(abilityPin(a.id))"
        />
        <AppEmptyState v-if="!startedDomains.length && !otherAbilities.length">
          Aucun domaine entamé : lance-les depuis l'onglet Domaines de ta fiche.
        </AppEmptyState>
      </div>

      <AppBottomSheet v-model="abilitySheetOpen" :title="openedAbility?.name">
        <AbilityCard
          v-if="openedAbility"
          :ability="openedAbility"
          :character="character"
          :unlocked="true"
          :default-open="true"
          :pinned="isPinned(abilityPin(openedAbility.id))"
          roll-context="actions"
          @toggle-pin="toggle(abilityPin(openedAbility.id))"
          @attack="openedAbility = null"
        />
      </AppBottomSheet>
    </template>
  </div>
</template>

<style scoped>
.actions-tabs {
  margin-bottom: var(--space-md);
}

.tiles {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@media (min-width: 560px) {
  .tiles {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
