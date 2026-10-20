<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'
import {
  fetchCampaign,
  fetchGmMessages,
  markGmMessagesRead,
  sendGmMessage,
  sendMessageToGm,
  type CampaignMember,
  type GmMessage,
} from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import { incomingGmMessage } from '../../composables/useCampaignLive'
import { refreshGmUnread } from '../../composables/useGmUnread'
import { relativeTime } from '../../utils/relativeTime'
import { hasUnreadFrom, lastMessageWith, threadWith } from '../../utils/gmThreads'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import GmThread from './GmThread.vue'

// « Échange avec le MJ » : le tête-à-tête MJ ↔ joueur dans la campagne active.
// Le joueur a un seul fil, avec son MJ. Le MJ choisit un joueur dans la liste
// (`?joueur=<id>` dans l'URL) et lui répond dans son fil.
const route = useRoute()
const router = useRouter()

const campaignId = computed(() => user.value?.activeCampaignId ?? null)

const messages = ref<GmMessage[]>([])
const isGm = ref(false)
const players = ref<CampaignMember[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const selectedId = computed(() => {
  const id = Number(route.query.joueur)
  return Number.isInteger(id) && id > 0 ? id : null
})
const selected = computed(() => players.value.find((p) => p.userId === selectedId.value) ?? null)

function playerName(p: CampaignMember): string {
  return p.characterName ?? p.username
}

async function load() {
  error.value = null
  if (!campaignId.value) { loading.value = false; return }
  try {
    const res = await fetchGmMessages(campaignId.value)
    messages.value = res.messages
    isGm.value = res.isGm
    if (res.isGm && players.value.length === 0) players.value = (await fetchCampaign(campaignId.value)).members
    void markShownRead()
  } catch {
    error.value = 'Impossible de charger les messages.'
  } finally {
    loading.value = false
  }
}

/** Le fil affiché est lu : ses messages pour moi perdent leur pastille. */
async function markShownRead() {
  const me = user.value?.id
  if (!campaignId.value || !me) return
  const withUserId = isGm.value ? selectedId.value : null
  if (isGm.value && withUserId === null) return
  const unread = messages.value.filter((m) =>
    m.toUserId === me && m.readAt === null && (withUserId === null || m.fromUserId === withUserId))
  if (unread.length === 0) return
  try {
    await markGmMessagesRead(campaignId.value, withUserId ?? undefined)
    const now = new Date().toISOString()
    for (const m of unread) m.readAt = now
    await refreshGmUnread()
  } catch { /* reste non lu, on réessaiera à la prochaine ouverture */ }
}

async function toGm(body: string) {
  await sendMessageToGm(campaignId.value!, body)
  await load()
}

async function toSelected(body: string) {
  await sendGmMessage(campaignId.value!, selectedId.value!, body)
  await load()
}

function open(playerId: number | null) {
  const query = { ...route.query, joueur: playerId ?? undefined }
  router.replace({ query })
}

onMounted(load)
watch(incomingGmMessage, (m) => { if (m) void load() })
watch(selectedId, () => { void markShownRead() })
</script>

<template>
  <div class="gm-exchange">
    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="!campaignId">Rejoins une campagne pour échanger avec ton MJ.</AppEmptyState>
    <AppEmptyState v-else-if="error" variant="error">{{ error }}</AppEmptyState>

    <!-- Joueur : un seul fil, avec le MJ. -->
    <GmThread v-else-if="!isGm" :messages="messages" other-name="MJ" placeholder="Écrire au MJ…" :send="toGm" />

    <!-- MJ : le fil d'un joueur. -->
    <template v-else-if="selected">
      <div class="thread-head">
        <AppIconBtn title="Tous les joueurs" data-testid="gm-exchange-back" @click="open(null)">
          <ArrowLeft :size="18" />
        </AppIconBtn>
        <strong>{{ playerName(selected) }}</strong>
      </div>
      <GmThread
        :messages="threadWith(messages, selected.userId)"
        :other-name="playerName(selected)"
        :placeholder="`Écrire à ${playerName(selected)}…`"
        :send="toSelected"
      />
    </template>

    <!-- MJ : la liste des joueurs. -->
    <AppEmptyState v-else-if="players.length === 0">Aucun joueur dans la campagne.</AppEmptyState>
    <ul v-else class="players">
      <li v-for="p in players" :key="p.userId">
        <button
          type="button"
          class="player"
          :class="{ unread: hasUnreadFrom(messages, p.userId, user!.id) }"
          :data-testid="`gm-exchange-player-${p.userId}`"
          @click="open(p.userId)"
        >
          <span class="player-head">
            <strong>
              <span
                v-if="hasUnreadFrom(messages, p.userId, user!.id)"
                class="unread-dot"
                :data-testid="`gm-exchange-unread-${p.userId}`"
              />
              {{ playerName(p) }}
            </strong>
            <span v-if="lastMessageWith(messages, p.userId)" class="when">
              {{ relativeTime(lastMessageWith(messages, p.userId)!.createdAt) }}
            </span>
          </span>
          <span class="preview">{{ lastMessageWith(messages, p.userId)?.body ?? 'Aucun message' }}</span>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.gm-exchange {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.thread-head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.players {
  min-height: 0;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

/* Ligne de conversation : nom + aperçu du dernier message, toute la ligne est tapable. */
.player {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  width: 100%;
  min-height: 40px;
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.player-head {
  display: flex;
  justify-content: space-between;
  gap: var(--space-sm);
}

.player.unread {
  border-color: var(--accent);
}

.player.unread .preview {
  color: var(--text);
}

.unread-dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin-right: var(--space-xs);
  vertical-align: middle;
  border-radius: 50%;
  background: var(--accent-strong);
}

.when {
  font-size: 0.75rem;
  color: var(--muted);
}

.preview {
  font-size: 0.85rem;
  color: var(--muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
