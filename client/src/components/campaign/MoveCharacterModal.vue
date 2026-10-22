<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { fetchCampaigns, moveMemberCharacter, type CampaignSummary } from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import AppModal from '../ui/AppModal.vue'
import AppButton from '../ui/AppButton.vue'
import AppSelect from '../ui/AppSelect.vue'

// Envoie le perso d'un membre dans une autre campagne du même système. Le joueur
// choisit parmi les campagnes qu'il ne mène pas ; le MJ, parmi ses autres campagnes.
const props = defineProps<{ campaignId: number; userId: number; characterName: string; asGm: boolean }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'moved', toCampaignId: number): void }>()

const campaigns = ref<CampaignSummary[]>([])
const target = ref('')
const busy = ref(false)
const error = ref<string | null>(null)

const targets = computed(() => {
  const system = campaigns.value.find((c) => c.id === props.campaignId)?.system
  return campaigns.value.filter(
    (c) => c.id !== props.campaignId && c.system === system && (c.gmUserId === user.value?.id) === props.asGm,
  )
})

watch(open, async (isOpen) => {
  if (!isOpen) return
  target.value = ''
  error.value = null
  try {
    campaigns.value = await fetchCampaigns()
  } catch {
    error.value = 'Impossible de charger les campagnes.'
  }
})

async function move() {
  const toId = Number(target.value)
  if (!toId || busy.value) return
  busy.value = true
  error.value = null
  try {
    await moveMemberCharacter(props.campaignId, props.userId, toId)
    open.value = false
    emit('moved', toId)
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Erreur'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <AppModal v-model="open" :title="`Déplacer ${characterName}`" description="Choisir la campagne où envoyer le personnage.">
    <p v-if="!targets.length && !error" class="move-empty">Aucune autre campagne disponible.</p>
    <AppSelect v-else v-model="target" data-testid="move-target">
      <option value="">Choisir une campagne…</option>
      <option v-for="c in targets" :key="c.id" :value="String(c.id)">{{ c.name }}</option>
    </AppSelect>
    <p v-if="error" class="move-error">{{ error }}</p>
    <template #footer>
      <AppButton @click="open = false">Annuler</AppButton>
      <AppButton variant="primary" :disabled="!target || busy" data-testid="move-confirm" @click="move">Déplacer</AppButton>
    </template>
  </AppModal>
</template>

<style scoped>
.move-empty {
  margin: 0;
  color: var(--muted);
}

.move-error {
  margin: var(--space-sm) 0 0;
  color: var(--danger);
  font-size: 0.85rem;
}
</style>
