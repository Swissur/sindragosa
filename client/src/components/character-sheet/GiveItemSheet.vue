<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppStepper from '../ui/AppStepper.vue'
import { fetchCampaign, giveItem, type CampaignMember } from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import { showToast } from '../../composables/useToast'
import type { ItemRow } from '../../types/character'

/** Choix du joueur de la campagne active qui reçoit l'objet, et du nombre d'exemplaires s'il en a plusieurs. */
const props = defineProps<{ item: ItemRow | null; characterId: number }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'given', item: ItemRow, quantity: number): void }>()

const campaignId = computed(() => user.value?.activeCampaignId ?? null)
const members = ref<CampaignMember[]>([])
const status = ref<'loading' | 'ready' | 'error'>('loading')
const sending = ref(false)
/** Exemplaires donnés : un par défaut. */
const count = ref(1)

const recipients = computed(() => members.value.filter((m) => m.characterId && m.userId !== user.value?.id))

watch(open, async (isOpen) => {
  if (!isOpen || !campaignId.value) return
  count.value = 1
  status.value = 'loading'
  try {
    members.value = (await fetchCampaign(campaignId.value)).members
    status.value = 'ready'
  } catch {
    status.value = 'error'
  }
})

async function give(member: CampaignMember) {
  const item = props.item
  if (!item || !campaignId.value || sending.value) return
  sending.value = true
  try {
    await giveItem(campaignId.value, props.characterId, member.userId, item, count.value)
    showToast(`${item.name || 'Objet'}${count.value > 1 ? ` ×${count.value}` : ''} → ${member.characterName}`)
    emit('given', item, count.value)
    open.value = false
  } catch {
    showToast("L'objet n'a pas pu être donné.")
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" :title="`Donner ${item?.name || 'l\'objet'}`" description="Choisis le joueur qui reçoit l'objet.">
    <AppEmptyState v-if="status === 'loading'" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="status === 'error'" variant="error">Impossible de charger la campagne.</AppEmptyState>
    <AppEmptyState v-else-if="!recipients.length">Aucun autre joueur dans la campagne.</AppEmptyState>
    <div v-else class="recipients">
      <div v-if="(item?.quantity ?? 1) > 1" class="give-count">
        <span class="give-count-label">Quantité donnée</span>
        <AppStepper v-model="count" :min="1" :max="item!.quantity" label="Quantité donnée" testid="give-count">
          {{ count }}/{{ item!.quantity }}
        </AppStepper>
      </div>
      <AppButton
        v-for="m in recipients"
        :key="m.userId"
        block
        :disabled="sending"
        :data-testid="`give-to-${m.userId}`"
        @click="give(m)"
      >
        {{ m.characterName }} <span class="recipient-player">({{ m.username }})</span>
      </AppButton>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.recipients {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.give-count {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.give-count-label {
  color: var(--muted);
}

.recipient-player {
  color: var(--muted);
}
</style>
