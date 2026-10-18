<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { fetchGmMessages, type GmMessage } from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import { incomingGmMessage } from '../../composables/useCampaignLive'
import { relativeTime } from '../../utils/relativeTime'
import AppEmptyState from '../ui/AppEmptyState.vue'

// « Échange avec le MJ » : les messages du MJ dans la campagne active.
// Le joueur voit les siens, le MJ tout ce qu'il a envoyé.
const campaignId = computed(() => user.value?.activeCampaignId ?? null)

const messages = ref<GmMessage[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const newestFirst = computed(() => [...messages.value].reverse())

async function load() {
  error.value = null
  if (!campaignId.value) { loading.value = false; return }
  try {
    messages.value = await fetchGmMessages(campaignId.value)
  } catch {
    error.value = 'Impossible de charger les messages.'
  } finally {
    loading.value = false
  }
}

onMounted(load)
watch(incomingGmMessage, (m) => { if (m) void load() })
</script>

<template>
  <div class="gm-exchange">
    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="!campaignId">Rejoins une campagne pour échanger avec ton MJ.</AppEmptyState>
    <AppEmptyState v-else-if="error" variant="error">{{ error }}</AppEmptyState>
    <AppEmptyState v-else-if="messages.length === 0">Aucun message du MJ pour l'instant.</AppEmptyState>

    <ul v-else class="messages" data-testid="gm-messages">
      <li v-for="m in newestFirst" :key="m.id" class="message">
        <span class="meta">
          <template v-if="m.toUserId !== user?.id">À {{ m.toUsername }} · </template>
          {{ relativeTime(m.createdAt) }}
        </span>
        <p class="body">{{ m.body }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.messages {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.message {
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.meta {
  font-size: 0.75rem;
  color: var(--muted);
}

.body {
  margin: 0.15rem 0 0;
  white-space: pre-wrap;
}
</style>
