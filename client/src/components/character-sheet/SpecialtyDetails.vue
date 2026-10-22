<script setup lang="ts">
import { computed } from 'vue'
import { SPECIALTY_INFO } from '../../data/sindragosa/domainInfo'
import { abilitiesRequiringSpecialty } from '../../utils/sindragosa/specialtyInfo'
import { catalogSpecialtyName } from '../../utils/sindragosa/prerequisites'
import { SPECIALTY_LEVEL_LABELS } from '../../utils/sindragosa/rollSetup'

/** Ce que couvre une spécialité et les compétences qu'elle ouvre : infobulle et confirmation du choix. */
const props = defineProps<{ name: string }>()

const description = computed(
  () => SPECIALTY_INFO[props.name] ?? SPECIALTY_INFO[catalogSpecialtyName(props.name)]
    ?? 'Spécialité proposée par le joueur : son usage se discute avec le MJ.',
)
const uses = computed(() => abilitiesRequiringSpecialty(props.name))
</script>

<template>
  <div class="spec-details">
    <p class="spec-text">{{ description }}</p>
    <template v-if="uses.length">
      <p class="spec-uses-title">Ouvre la voie à</p>
      <ul class="spec-uses">
        <li v-for="u in uses" :key="u.abilityId">
          {{ u.name }} <span class="spec-level">· {{ SPECIALTY_LEVEL_LABELS[u.level] }}</span>
        </li>
      </ul>
    </template>
  </div>
</template>

<style scoped>
.spec-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.spec-text,
.spec-uses-title {
  margin: 0;
}

.spec-uses-title {
  font-weight: 700;
  color: var(--muted);
}

.spec-uses {
  margin: 0;
  padding-left: var(--space-lg);
}

.spec-level {
  color: var(--muted);
}
</style>
