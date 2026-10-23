<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRightLeft, Eye, KeyRound, Send, Settings, TriangleAlert } from 'lucide-vue-next'
import { resetMemberPassword, sendGmMessage, type CampaignMember } from '../../api/campaigns'
import { showToast } from '../../composables/useToast'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppInput from '../ui/AppInput.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import MoveCharacterModal from './MoveCharacterModal.vue'

// Raccourcis du MJ sur un portrait : voir la fiche, rappel à l'ordre en un tap,
// ou message libre. Le message part tout de suite dans le journal « Échange avec
// le MJ » du joueur et s'ouvre au milieu de son écran.
// La roue dentée ouvre les réglages : nouveau mot de passe si le joueur a oublié
// le sien, et déplacement du perso dans une autre campagne du MJ.
const props = defineProps<{ campaignId: number }>()
const member = defineModel<CampaignMember | null>({ required: true })
const emit = defineEmits<{ (e: 'moved'): void }>()

const router = useRouter()

const WARNING = "Tu n'es pas assez RP"

const draft = ref('')
const sending = ref(false)
/** Le membre à déplacer : la feuille se ferme, la modale prend le relais. */
const moving = ref<CampaignMember | null>(null)
const moveOpen = ref(false)

const settingsOpen = ref(false)
const newPassword = ref('')

watch(member, () => {
  draft.value = ''
  settingsOpen.value = false
  newPassword.value = ''
})

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

async function resetPassword() {
  if (!member.value || newPassword.value.length < 6 || sending.value) return
  sending.value = true
  try {
    await resetMemberPassword(props.campaignId, member.value.userId, newPassword.value)
    showToast(`Mot de passe de ${member.value.username} réinitialisé`)
    settingsOpen.value = false
    newPassword.value = ''
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Le mot de passe n'a pas changé")
  } finally {
    sending.value = false
  }
}

function startMove() {
  moving.value = member.value
  member.value = null
  moveOpen.value = true
}

function onMoved() {
  showToast(`${moving.value?.characterName ?? 'Le personnage'} a changé de campagne`)
  emit('moved')
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
    <template #titleActions>
      <AppIconBtn
        variant="bare"
        title="Réglages"
        :aria-pressed="settingsOpen"
        data-testid="shortcut-settings"
        @click="settingsOpen = !settingsOpen"
      >
        <Settings :size="18" />
      </AppIconBtn>
    </template>
    <div class="shortcuts">
      <div v-if="settingsOpen" class="settings">
        <form class="password" @submit.prevent="resetPassword">
          <label class="password-label" for="member-new-password">
            <KeyRound :size="14" />
            Nouveau mot de passe de {{ member?.username }}
          </label>
          <div class="password-row">
            <AppInput
              id="member-new-password"
              v-model="newPassword"
              type="text"
              autocomplete="off"
              placeholder="6 caractères minimum"
              data-testid="shortcut-password"
            />
            <AppButton
              type="submit"
              variant="primary"
              :disabled="sending || newPassword.length < 6"
              data-testid="shortcut-password-save"
            >
              Réinitialiser
            </AppButton>
          </div>
        </form>
        <AppButton v-if="member?.characterId" block data-testid="shortcut-move" @click="startMove">
          <ArrowRightLeft :size="16" />
          Déplacer vers une autre campagne
        </AppButton>
      </div>

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

  <MoveCharacterModal
    v-if="moving"
    v-model="moveOpen"
    :campaign-id="campaignId"
    :user-id="moving.userId"
    :character-name="moving.characterName ?? moving.username"
    :as-gm="true"
    @moved="onMoved"
  />
</template>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding: var(--space-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.password {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.password-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.8rem;
  color: var(--muted);
}

.password-row {
  display: flex;
  gap: var(--space-sm);
}

.password-row > :first-child {
  flex: 1;
  min-width: 0;
}

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
