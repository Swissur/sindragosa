<script setup lang="ts">
import { computed } from 'vue'
import { Gift } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import type { CampaignMember } from '../../api/campaigns'

/** Le MJ choisit le héros qui reçoit une copie de l'objet du scénario. */
const props = defineProps<{ itemName: string; members: CampaignMember[]; sending: boolean }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'pick', member: CampaignMember): void }>()

const heroes = computed(() => props.members.filter((m) => m.characterId))
</script>

<template>
  <AppBottomSheet v-model="open" :title="`Donner ${itemName || 'l\'objet'}`" description="Choisis le héros qui reçoit l'objet.">
    <AppEmptyState v-if="!heroes.length">Aucun héros dans la campagne.</AppEmptyState>
    <div v-else class="heroes">
      <AppButton
        v-for="m in heroes"
        :key="m.userId"
        block
        :disabled="sending"
        :data-testid="`scenario-give-to-${m.userId}`"
        @click="emit('pick', m)"
      >
        <Gift :size="15" /> {{ m.characterName }}
        <span class="hero-player">{{ m.username }}</span>
      </AppButton>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.heroes {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.hero-player {
  color: var(--muted);
  font-size: 0.8rem;
  font-weight: 500;
}
</style>
