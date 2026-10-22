<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { Images } from 'lucide-vue-next'
import { incomingSharedImage } from '../../composables/useCampaignLive'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'

// Le MJ montre une image (plans/47) : elle s'ouvre en grand, où que l'on soit.
// Elle reste ensuite dans l'onglet Images du Journal.
const props = defineProps<{ viewer?: boolean }>()
const router = useRouter()

const open = computed({
  get: () => incomingSharedImage.value !== null,
  set: (v) => { if (!v) incomingSharedImage.value = null },
})

function toGallery() {
  incomingSharedImage.value = null
  router.push({ path: '/journal', query: { tab: 'images' } })
}
</script>

<template>
  <AppModal v-model="open" :title="incomingSharedImage?.caption || 'Le MJ vous montre…'" wide>
    <img
      v-if="incomingSharedImage"
      :src="`/api/images/${incomingSharedImage.imageId}`"
      :alt="incomingSharedImage.caption"
      class="shared-image"
      data-testid="shared-image"
    />
    <template v-if="!props.viewer" #footer>
      <AppButton data-testid="shared-image-gallery" @click="toGallery">
        <Images :size="16" /> Galerie
      </AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.shared-image {
  display: block;
  width: 100%;
  max-height: 70dvh;
  object-fit: contain;
  border-radius: var(--radius-md);
}
</style>
