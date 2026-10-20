<script setup lang="ts">
import { computed } from 'vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppBadge from '../ui/AppBadge.vue'
import { ARCHETYPES, BLASONS, SECTIONS, archetypeById, blasonById } from '../../data/knight/identity'
import type { KnightSheet } from '../../types/knight'

/** Ce qui suit le nom d'un chevalier dans `HeroCard` : surnom, archétype, section, blason. */
const props = defineProps<{ sheet: KnightSheet; editing?: boolean; readonly?: boolean }>()

const archetype = computed(() => archetypeById(props.sheet.identite.archetype))
const blason = computed(() => blasonById(props.sheet.identite.blason))
</script>

<template>
  <div v-if="editing && !readonly" class="identity">
    <AppInput v-model="sheet.identite.surnom" placeholder="Surnom" data-testid="knight-surnom" />
    <AppSelect v-model="sheet.identite.archetype" data-testid="knight-archetype">
      <option value="">Archétype à choisir</option>
      <option v-for="a in ARCHETYPES" :key="a.id" :value="a.id">{{ a.label }}</option>
    </AppSelect>
    <p v-if="archetype" class="identity-hint">Bonus suggéré : {{ archetype.bonus }} (à appliquer sur les caracs)</p>
    <AppSelect v-model="sheet.identite.section" data-testid="knight-section">
      <option value="">Sans section</option>
      <option v-for="s in SECTIONS" :key="s" :value="s">{{ s }}</option>
    </AppSelect>
    <AppSelect v-model="sheet.identite.blason" data-testid="knight-blason">
      <option value="">Blason à choisir</option>
      <option v-for="b in BLASONS" :key="b.id" :value="b.id">{{ b.label }}</option>
    </AppSelect>
  </div>
  <div v-else class="identity">
    <p v-if="sheet.identite.surnom" class="identity-surnom">« {{ sheet.identite.surnom }} »</p>
    <p class="identity-badges" data-testid="knight-identity">
      <AppBadge v-if="archetype" variant="info">{{ archetype.label }}</AppBadge>
      <AppBadge v-if="sheet.identite.section" variant="active">{{ sheet.identite.section }}</AppBadge>
      <AppBadge v-if="blason" variant="pm">{{ blason.label }}</AppBadge>
      <span v-if="!archetype && !sheet.identite.section && !blason" class="identity-hint">Archétype à choisir</span>
    </p>
    <p v-if="blason" class="identity-hint">Vœu : {{ blason.voeu }}</p>
  </div>
</template>

<style scoped>
.identity {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.identity-surnom {
  margin: 0;
  font-style: italic;
  color: var(--accent-strong);
}

.identity-badges {
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.identity-hint {
  margin: 0;
  font-size: 0.82rem;
  color: var(--muted);
}
</style>
