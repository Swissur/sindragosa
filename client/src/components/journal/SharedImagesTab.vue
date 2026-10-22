<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppModal from '../ui/AppModal.vue'
import { fetchSharedImages, type SharedImage } from '../../api/scenarios'
import { user } from '../../composables/useAuth'
import { incomingSharedImage } from '../../composables/useCampaignLive'
import { relativeTime } from '../../utils/relativeTime'

// Les images que le MJ a montrées pendant les séances (plans/47), la dernière en tête.
const campaignId = computed(() => user.value?.activeCampaignId ?? null)
const images = ref<SharedImage[]>([])
const loading = ref(true)
const zoomed = ref<SharedImage | null>(null)
const zoomOpen = computed({
  get: () => zoomed.value !== null,
  set: (v) => { if (!v) zoomed.value = null },
})

async function load() {
  if (!campaignId.value) { loading.value = false; return }
  try {
    images.value = await fetchSharedImages(campaignId.value)
  } catch { /* galerie vide */ }
  loading.value = false
}

watch(campaignId, load, { immediate: true })
// Une image arrive pendant qu'on regarde la galerie : elle s'y range aussitôt.
watch(incomingSharedImage, (img) => { if (img) void load() })
</script>

<template>
  <AppEmptyState v-if="!campaignId">Les images appartiennent à ta campagne active.</AppEmptyState>
  <AppEmptyState v-else-if="loading" variant="loading">Chargement…</AppEmptyState>
  <AppEmptyState v-else-if="!images.length">
    Le MJ n'a encore montré aucune image. Cartes, portraits et indices arriveront ici.
  </AppEmptyState>
  <ul v-else class="gallery" data-testid="shared-images">
    <li v-for="img in images" :key="img.id">
      <button type="button" class="tile" @click="zoomed = img">
        <img :src="`/api/images/${img.imageId}`" :alt="img.caption" loading="lazy" />
        <span class="tile-caption">{{ img.caption || relativeTime(img.sharedAt) }}</span>
      </button>
    </li>
  </ul>

  <AppModal v-model="zoomOpen" :title="zoomed?.caption || 'Image du MJ'" wide>
    <img v-if="zoomed" :src="`/api/images/${zoomed.imageId}`" :alt="zoomed.caption" class="zoomed" />
  </AppModal>
</template>

<style scoped>
.gallery {
  list-style: none;
  margin: 0;
  padding: 0 0 var(--space-lg);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: var(--space-sm);
}

.tile {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface);
  overflow: hidden;
  cursor: pointer;
  color: inherit;
  font: inherit;
}

.tile img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.tile-caption {
  padding: var(--space-xs) var(--space-sm);
  font-size: 0.8rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.zoomed {
  display: block;
  width: 100%;
  max-height: 70dvh;
  object-fit: contain;
  border-radius: var(--radius-md);
}
</style>
