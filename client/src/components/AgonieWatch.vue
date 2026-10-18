<script setup lang="ts">
import { ref, watch } from 'vue'
import AgonieModal from './AgonieModal.vue'
import { useCharacter } from '../composables/useCharacter'

/** Agonie : à 0 PV, les jets de mort s'ouvrent d'eux-mêmes. Posé sur la fiche et dans le combat. */
const { character, loading } = useCharacter()

const showAgonie = ref(false)
const isStabilised = ref(false)

watch(
  () => character.value.hpCurrent,
  (hp) => {
    if (loading.value) return
    if (hp === 0 && !isStabilised.value) showAgonie.value = true
    if (hp > 0) {
      isStabilised.value = false
      showAgonie.value = false
    }
  },
  { immediate: true },
)

function onStabilise() {
  showAgonie.value = false
  isStabilised.value = true
}
</script>

<template>
  <AgonieModal
    v-if="showAgonie"
    :character-name="character.name"
    @stabilise="onStabilise"
    @death="showAgonie = false"
    @close="showAgonie = false"
  />
</template>
