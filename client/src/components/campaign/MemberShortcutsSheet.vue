<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Eye, Send, TriangleAlert } from 'lucide-vue-next'
import { sendGmMessage, type CampaignMember } from '../../api/campaigns'
import { showToast } from '../../composables/useToast'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppTextarea from '../ui/AppTextarea.vue'

// Raccourcis du MJ sur un portrait : voir la fiche, rappel à l'ordre en un
// tap, ou message libre. Le message part tout de suite dans le journal
// « Échange avec le MJ » du joueur et s'ouvre au milieu de son écran.
const props = defineProps<{ campaignId: number }>()
const member = defineModel<CampaignMember | null>({ required: true })

const router = useRouter()

const WARNING = "Tu n'es pas assez RP"

const draft = ref('')
const sending = ref(false)

watch(member, () => { draft.value = '' })

async function send(body: string) {
  if (!member.value || !body.trim() || sending.value) return
  sending.value = true
  try {
    await sendGmMessage(props.campaignId, member.value.userId, body.trim())
    showToast(`Message envoyé à ${member.value.characterName ?? member.value.username}`)
    member.value = null
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Le message n'est pas parti")
  } finally {
    sending.value = false
  }
}

function viewSheet() {
  if (!member.value) return
  router.push(`/campagnes/${props.campaignId}/personnage/${member.value.userId}`)
}
</script>

<template>
  <AppBottomSheet
    :model-value="member !== null"
    :title="member?.characterName ?? member?.username ?? ''"
    @update:model-value="!$event && (member = null)"
  >
    <div class="shortcuts">
      <AppButton block data-testid="shortcut-sheet" @click="viewSheet">
        <Eye :size="16" />
        Voir la fiche
      </AppButton>
      <AppButton block variant="danger" :disabled="sending" data-testid="shortcut-warning" @click="send(WARNING)">
        <TriangleAlert :size="16" />
        {{ WARNING }}
      </AppButton>
      <form class="message" @submit.prevent="send(draft)">
        <AppTextarea v-model="draft" :rows="3" placeholder="Message au joueur…" data-testid="shortcut-message" />
        <AppIconBtn
          type="submit"
          variant="primary"
          title="Envoyer"
          :disabled="sending || !draft.trim()"
          data-testid="shortcut-send"
        >
          <Send :size="18" />
        </AppIconBtn>
      </form>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.shortcuts {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.message {
  display: flex;
  align-items: flex-end;
  gap: var(--space-sm);
}

.message > :first-child {
  flex: 1;
  min-width: 0;
}
</style>
