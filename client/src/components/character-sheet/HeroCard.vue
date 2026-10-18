<script setup lang="ts">
import { computed, ref, toRef } from 'vue'
import { Upload, Trash2, Award } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import AppBadge from '../ui/AppBadge.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AbilityCard from '../abilities/AbilityCard.vue'
import { RACES, raceAbility, raceById } from '../../data/sindragosa/races'
import { withRace } from '../../utils/sindragosa/sheet'
import { RACE_PIN } from '../../utils/sindragosa/pins'
import { usePins } from '../../composables/usePins'
import type { Character } from '../../types/character'

/** Identité : portrait, nom, race (et son pouvoir), histoire. */
const props = defineProps<{
  character: Character
  editing?: boolean
  readonly?: boolean
  portraitOverrideUrl?: string | null
}>()

const race = computed(() => raceById(props.character.race))
const { isPinned, toggle } = usePins(toRef(props, 'character'))

const raceModel = computed({
  get: () => props.character.race,
  // `withRace` déplace le +1 racial d'une carac à l'autre
  set: (id: string) => Object.assign(props.character, withRace(props.character, id)),
})

const portraitInput = ref<HTMLInputElement | null>(null)
const portraitUploading = ref(false)

const portraitUrl = computed(() =>
  props.portraitOverrideUrl
    ?? (props.character.portraitImageId ? `/api/images/${props.character.portraitImageId}` : null),
)

async function handlePortraitChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  portraitUploading.value = true
  try {
    const base64: string = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve((reader.result as string).split(',')[1])
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const res = await fetch(`/api/characters/${props.character.id}/portrait`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: base64, mimeType: file.type }),
    })
    if (res.ok) props.character.portraitImageId = (await res.json()).portraitImageId
  } catch { /* le portrait reste celui d'avant */ }
  portraitUploading.value = false
  if (portraitInput.value) portraitInput.value.value = ''
}

async function removePortrait() {
  await fetch(`/api/characters/${props.character.id}/portrait`, { method: 'DELETE', credentials: 'include' })
  props.character.portraitImageId = null
}
</script>

<template>
  <AppCard class="hero">
    <div class="hero-top">
      <div class="portrait-wrapper">
        <button
          type="button"
          class="portrait"
          :disabled="readonly"
          title="Changer le portrait"
          @click="portraitInput?.click()"
        >
          <img v-if="portraitUrl" :src="portraitUrl" alt="" class="portrait-img" />
          <Upload v-else :size="22" class="portrait-placeholder" />
          <span v-if="portraitUploading" class="portrait-loading">…</span>
        </button>
        <button
          v-if="portraitUrl && editing && !readonly"
          type="button"
          class="portrait-remove"
          title="Retirer le portrait"
          @click="removePortrait"
        >
          <Trash2 :size="12" />
        </button>
        <input ref="portraitInput" type="file" accept="image/*" hidden @change="handlePortraitChange" />
      </div>

      <div class="hero-id">
        <AppInput v-if="editing && !readonly" v-model="character.name" placeholder="Nom" data-testid="hero-name" />
        <h2 v-else class="hero-name" data-testid="hero-name">{{ character.name }}</h2>
        <AppSelect v-if="editing && !readonly" v-model="raceModel" data-testid="hero-race">
          <option value="">Race à choisir</option>
          <optgroup label="Alliance">
            <option v-for="r in RACES.filter((x) => x.faction === 'alliance')" :key="r.id" :value="r.id">{{ r.label }}</option>
          </optgroup>
          <optgroup label="Horde">
            <option v-for="r in RACES.filter((x) => x.faction === 'horde')" :key="r.id" :value="r.id">{{ r.label }}</option>
          </optgroup>
        </AppSelect>
        <p v-else class="hero-race" data-testid="hero-race">
          <template v-if="race">
            <AppBadge variant="info">{{ race.label }}</AppBadge>
            <AppBadge :variant="race.faction === 'alliance' ? 'info' : 'attaque'">
              {{ race.faction === 'alliance' ? 'Alliance' : 'Horde' }}
            </AppBadge>
          </template>
          <template v-else>Race à choisir</template>
        </p>
        <p v-if="character.titles.length" class="hero-titles">
          <AppBadge v-for="t in character.titles" :key="t" variant="active" data-testid="title">
            <Award :size="12" /> {{ t }}
          </AppBadge>
        </p>
        <AbilityCard
          v-if="race"
          :ability="raceAbility(race)"
          :character="character"
          :unlocked="true"
          :readonly="readonly"
          :pinned="readonly ? undefined : isPinned(RACE_PIN)"
          hide-type
          @toggle-pin="toggle(RACE_PIN)"
        />
        <AppAccordion title="Histoire" :default-open="editing">
          <AppTextarea v-if="editing && !readonly" v-model="character.histoire" :rows="5" placeholder="D'où vient ton héros ?" />
          <p v-else class="hero-text">{{ character.histoire || 'Pas encore écrite.' }}</p>
        </AppAccordion>
      </div>
    </div>
  </AppCard>
</template>

<style scoped>
.hero-top {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.portrait-wrapper {
  position: relative;
  flex-shrink: 0;
}

.portrait {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  padding: 0;
  border-radius: 50%;
  border: 2px solid var(--accent);
  background: var(--surface-2);
  overflow: hidden;
  cursor: pointer;
}

.portrait:disabled {
  cursor: default;
}

.portrait-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.portrait-placeholder {
  color: var(--muted);
}

.portrait-loading {
  font-weight: 700;
}

/* Pastille sur le coin du portrait : une des exceptions permises */
.portrait-remove {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.4rem;
  height: 1.4rem;
  padding: 0;
  border-radius: 50%;
  border: none;
  background: var(--danger);
  color: var(--on-brand);
  cursor: pointer;
}

.hero-id {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.hero-name {
  margin: 0;
  font-family: var(--title-font);
  font-size: 1.25rem;
  color: var(--accent-strong);
}

.hero-race {
  margin: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--muted);
}

.hero-titles {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.hero-text {
  margin: 0;
  font-size: 0.9rem;
  white-space: pre-wrap;
}
</style>
