<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { MessagesSquare } from 'lucide-vue-next'
import { incomingGmMessage } from '../../composables/useCampaignLive'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'

// Le MJ m'a écrit (ou un joueur, si je suis MJ) : le message s'ouvre au milieu
// de l'écran, où que je sois. Il reste ensuite dans le journal « Échange avec le MJ ».
const router = useRouter()

const open = computed({
  get: () => incomingGmMessage.value !== null,
  set: (v) => { if (!v) incomingGmMessage.value = null },
})

const title = computed(() => {
  const m = incomingGmMessage.value
  return !m || m.fromGm ? 'Message du MJ' : `Message de ${m.fromUsername}`
})

function toJournal() {
  const m = incomingGmMessage.value
  incomingGmMessage.value = null
  // Le MJ arrive directement dans le fil du joueur qui lui a écrit.
  router.push({ path: '/journal', query: { tab: 'mj', joueur: m && !m.fromGm ? m.fromUserId : undefined } })
}
</script>

<template>
  <AppModal v-model="open" :title="title">
    <p class="body" data-testid="gm-message-body">{{ incomingGmMessage?.body }}</p>
    <template #footer>
      <AppButton data-testid="gm-message-journal" @click="toJournal">
        <MessagesSquare :size="18" /> Messagerie
      </AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.body {
  margin: 0;
  font-size: 1.05rem;
  white-space: pre-wrap;
}
</style>
