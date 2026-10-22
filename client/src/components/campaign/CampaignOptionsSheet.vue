<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRightLeft, LogOut, Trash2, Save } from 'lucide-vue-next'
import {
  deleteCampaign,
  leaveCampaign,
  updateCampaign,
  CAMPAIGN_SYSTEMS,
  type CampaignDetail,
  type CampaignSystem,
} from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import MoveCharacterModal from './MoveCharacterModal.vue'

// Options de la campagne (engrenage). Le MJ la règle ou la supprime, le joueur
// la quitte ou emmène son perso dans une autre campagne.
const props = defineProps<{ campaign: CampaignDetail; isGm: boolean }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'updated'): void }>()

const router = useRouter()

const name = ref('')
const system = ref<CampaignSystem>('wow-forever')
const error = ref<string | null>(null)
const confirmDelete = ref(false)
const moveOpen = ref(false)
const me = computed(() => props.campaign.members.find((m) => m.userId === user.value?.id && m.characterId))

watch(open, (isOpen) => {
  if (!isOpen) return
  name.value = props.campaign.name
  system.value = props.campaign.system
  error.value = null
})

async function save() {
  error.value = null
  try {
    await updateCampaign(props.campaign.id, { name: name.value.trim(), system: system.value })
    open.value = false
    emit('updated')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

/** La campagne quittée n'est plus active : le flux SSE suit `user`. */
function forgetActive() {
  if (user.value?.activeCampaignId === props.campaign.id) {
    user.value = { ...user.value, activeCampaignId: null }
  }
}

async function handleDelete() {
  try {
    await deleteCampaign(props.campaign.id)
    forgetActive()
    router.push('/campagnes')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}

function onMoved(toId: number) {
  if (user.value?.activeCampaignId === props.campaign.id) {
    user.value = { ...user.value, activeCampaignId: toId }
  }
  // L'écran de campagne est celui du MJ : le joueur retrouve sa fiche
  router.push('/personnage')
}

async function handleLeave() {
  try {
    await leaveCampaign(props.campaign.id)
    forgetActive()
    router.push('/campagnes')
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" title="Options de la campagne">
    <form v-if="isGm" class="options" @submit.prevent="save">
      <label class="field">
        <span class="field-label">Nom</span>
        <AppInput v-model="name" :required="true" />
      </label>
      <label class="field">
        <span class="field-label">Système</span>
        <AppSelect v-model="system">
          <option v-for="s in CAMPAIGN_SYSTEMS" :key="s.value" :value="s.value">{{ s.label }}</option>
        </AppSelect>
      </label>
      <AppButton type="submit" variant="primary" block>
        <Save :size="16" />
        Enregistrer
      </AppButton>
      <AppButton variant="danger" block @click="confirmDelete = true">
        <Trash2 :size="16" />
        Supprimer la campagne
      </AppButton>
    </form>

    <div v-else class="options">
      <AppButton v-if="me" block data-testid="move-character" @click="moveOpen = true">
        <ArrowRightLeft :size="16" />
        Déplacer mon personnage
      </AppButton>
      <AppButton variant="danger" block @click="handleLeave">
        <LogOut :size="16" />
        Quitter la campagne
      </AppButton>
    </div>

    <p v-if="error" class="form-error">{{ error }}</p>
  </AppBottomSheet>

  <MoveCharacterModal
    v-if="me"
    v-model="moveOpen"
    :campaign-id="campaign.id"
    :user-id="me.userId"
    :character-name="me.characterName ?? 'mon personnage'"
    :as-gm="false"
    @moved="onMoved"
  />

  <AppModal v-model="confirmDelete" title="Supprimer la campagne">
    <p class="confirm">Supprimer « {{ campaign.name }} » ? Cette action est irréversible.</p>
    <template #footer>
      <AppButton @click="confirmDelete = false">Annuler</AppButton>
      <AppButton variant="danger" @click="handleDelete">Supprimer</AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.options {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.field {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.field-label {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--muted);
}

.form-error {
  margin: var(--space-sm) 0 0;
  color: var(--danger);
  font-size: 0.85rem;
}

.confirm {
  margin: 0;
}
</style>
