<script setup lang="ts">
import { computed } from 'vue'
import { SPECIALTY_INFO } from '../../data/sindragosa/domainInfo'
import { catalogSpecialtyName } from '../../utils/sindragosa/prerequisites'

/** Ce que couvre une spécialité : infobulle et confirmation du choix. */
const props = defineProps<{ name: string }>()

const description = computed(
  () => SPECIALTY_INFO[props.name] ?? SPECIALTY_INFO[catalogSpecialtyName(props.name)]
    ?? 'Spécialité proposée par le joueur : son usage se discute avec le MJ.',
)
</script>

<template>
  <p class="spec-text">{{ description }}</p>
</template>

<style scoped>
.spec-text {
  margin: 0;
}
</style>
