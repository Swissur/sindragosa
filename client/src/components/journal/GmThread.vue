<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import { Send } from 'lucide-vue-next'
import type { GmMessage } from '../../api/campaigns'
import { user } from '../../composables/useAuth'
import { showToast } from '../../composables/useToast'
import { relativeTime } from '../../utils/relativeTime'
import AppEmptyState from '../ui/AppEmptyState.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppTextarea from '../ui/AppTextarea.vue'

// Un tête-à-tête MJ ↔ joueur façon tchat : les messages du plus ancien au plus
// récent, les miens à droite, la zone d'écriture en bas. Ctrl+Entrée envoie.
const props = defineProps<{
  messages: GmMessage[]
  /** Nom affiché sur les messages de l'autre. */
  otherName: string
  placeholder: string
  send: (body: string) => Promise<void>
}>()

const draft = ref('')
const sending = ref(false)

const list = ref<HTMLElement | null>(null)

/** Le fil s'ouvre sur le dernier message, et y revient à chaque nouveau. */
async function scrollToLatest() {
  await nextTick()
  if (list.value) list.value.scrollTop = list.value.scrollHeight
}

onMounted(scrollToLatest)
watch(() => props.messages.length, scrollToLatest)

async function submit() {
  const body = draft.value.trim()
  if (!body || sending.value) return
  sending.value = true
  try {
    await props.send(body)
    draft.value = ''
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Le message n'est pas parti")
  } finally {
    sending.value = false
  }
}
</script>

<template>
  <div class="thread">
    <AppEmptyState v-if="messages.length === 0" class="empty">Aucun message pour l'instant.</AppEmptyState>
    <ul v-else ref="list" class="messages" data-testid="gm-messages">
      <li
        v-for="m in messages"
        :key="m.id"
        class="message"
        :class="{ mine: m.fromUserId === user?.id }"
      >
        <span class="meta">{{ m.fromUserId === user?.id ? 'Moi' : otherName }} · {{ relativeTime(m.createdAt) }}</span>
        <p class="body">{{ m.body }}</p>
      </li>
    </ul>

    <form class="composer" @submit.prevent="submit">
      <AppTextarea
        v-model="draft"
        :rows="2"
        :placeholder="placeholder"
        data-testid="gm-exchange-draft"
        @keydown.enter.ctrl.prevent="submit"
        @keydown.enter.meta.prevent="submit"
      />
      <AppIconBtn
        type="submit"
        variant="primary"
        title="Envoyer (Ctrl+Entrée)"
        :disabled="sending || !draft.trim()"
        data-testid="gm-exchange-send"
      >
        <Send :size="18" />
      </AppIconBtn>
    </form>
  </div>
</template>

<style scoped>
.thread {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  /* Le journal coupe ce qui déborde : on laisse la place à l'anneau de focus
     de la zone d'écriture. */
  padding: var(--space-xs);
}

.empty {
  flex: 1;
}

.composer {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  gap: var(--space-sm);
}

.composer > :first-child {
  flex: 1;
  min-width: 0;
}

.messages {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.message {
  max-width: 85%;
  align-self: flex-start;
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.message.mine {
  align-self: flex-end;
  background: var(--accent-soft);
  border-color: var(--accent);
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
