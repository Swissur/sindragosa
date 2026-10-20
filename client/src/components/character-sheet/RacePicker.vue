<script setup lang="ts">
import { computed, ref } from 'vue'
import { Axe, ChevronDown, Shield } from 'lucide-vue-next'
import AppButton from '../ui/AppButton.vue'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppTabs from '../ui/AppTabs.vue'
import AppBadge from '../ui/AppBadge.vue'
import { RACES, raceById, type Faction } from '../../data/sindragosa/races'
import { STATS } from '../../data/sindragosa/domains'
import { USES_PER_LABELS } from '../../utils/sindragosa/abilityUses'

/** Bouton « Choisir ma race » : ouvre un panneau de cartes, taper une race la choisit et ferme. */
const model = defineModel<string>({ required: true })

/** Le portrait de chaque race : `assets/races/<id>.png`. */
const PORTRAITS = Object.fromEntries(
  Object.entries(import.meta.glob<string>('../../assets/races/*.png', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop()!.replace('.png', ''), url]),
)

const open = ref(false)
const current = computed(() => raceById(model.value))
const faction = ref<Faction>('alliance')
const tabs = [
  { value: 'alliance', label: 'Alliance', icon: Shield },
  { value: 'horde', label: 'Horde', icon: Axe },
]
const shown = computed(() => RACES.filter((r) => r.faction === faction.value))

const statAbbr = (id: string) => STATS.find((s) => s.id === id)?.abbr

function openPicker() {
  // Ouvre sur la faction de la race actuelle
  faction.value = current.value?.faction ?? 'alliance'
  open.value = true
}

function pick(id: string) {
  model.value = id
  open.value = false
}
</script>

<template>
  <AppButton
    class="race-trigger"
    :class="current && `race--${current.faction}`"
    data-testid="hero-race"
    @click="openPicker"
  >
    <img v-if="current" :src="PORTRAITS[current.id]" alt="" class="race-portrait race-portrait--small" />
    <span class="race-trigger-label">{{ current ? current.label : 'Choisir ma race' }}</span>
    <ChevronDown :size="16" />
  </AppButton>

  <AppBottomSheet v-model="open" title="Choisis ta race" description="Taper une race la choisit.">
    <div class="race-picker">
      <AppTabs v-model="faction" :tabs="tabs" />
      <button
        v-for="r in shown"
        :key="r.id"
        type="button"
        class="race-option"
        :class="`race--${r.faction}`"
        :aria-pressed="r.id === model"
        :data-testid="`race-option-${r.id}`"
        @click="pick(r.id)"
      >
        <span class="race-head">
          <img :src="PORTRAITS[r.id]" alt="" class="race-portrait" />
          <span class="race-title">
            <strong class="race-name">{{ r.label }}</strong>
            <span class="race-flavor">{{ r.flavor }}</span>
          </span>
          <AppBadge variant="active">+1 {{ statAbbr(r.stat) }}</AppBadge>
        </span>
        <span class="race-power">
          <span class="race-power-head">
            <strong>{{ r.power.name }}</strong>
            <AppBadge variant="info">{{ r.power.actionLabel }}</AppBadge>
            <AppBadge variant="limitée">{{ USES_PER_LABELS[r.power.usesPer] }}</AppBadge>
          </span>
          <span class="race-effect">{{ r.power.effect }}</span>
        </span>
      </button>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
/* Couleurs de blason propres à chaque faction, indépendantes du thème choisi */
.race--alliance {
  --race-trim: #d6ad3c;
  --race-tint: rgba(42, 79, 176, 0.1);
}

.race--horde {
  --race-trim: #8c6a3c;
  --race-tint: rgba(179, 34, 26, 0.1);
}

.race-trigger-label {
  flex: 1;
  text-align: left;
}

.race-picker {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.race-option {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-md);
  border: 2px solid var(--race-trim);
  border-radius: var(--radius-lg);
  background: linear-gradient(var(--race-tint), var(--race-tint)), var(--surface);
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.race-option[aria-pressed='true'] {
  background: var(--accent-soft);
  outline: 2px solid var(--accent);
  outline-offset: 1px;
}

.race-head {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.race-portrait {
  flex-shrink: 0;
  width: 4.5rem;
  height: 3.5rem;
  border: 2px solid var(--race-trim);
  border-radius: var(--radius-sm);
  object-fit: cover;
}

.race-portrait--small {
  width: 1.6rem;
  height: 1.6rem;
  border-width: 1px;
  border-radius: 50%;
}

.race-title {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.race-name {
  font-family: var(--title-font);
  font-size: 1.05rem;
  color: var(--accent-strong);
}

.race-flavor {
  font-size: 0.85rem;
  font-style: italic;
  color: var(--muted);
}

.race-power {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  padding: var(--space-sm);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
}

.race-power-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-xs);
}

.race-effect {
  font-size: 0.85rem;
}
</style>
