<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Lock } from 'lucide-vue-next'
import AppTextarea from '../ui/AppTextarea.vue'
import { fetchMyCodexNote, saveMyCodexNote } from '../../api/codex'
import { useAutosave } from '../../composables/useAutosave'

/** Mes notes privées sur une fiche (plans/47) : personne d'autre ne les lit, pas même le MJ. */
const props = defineProps<{ campaignId: number; entryId: number }>()

const content = ref('')
const loaded = ref(false)
const { status, schedule, flush } = useAutosave<string>((text) => saveMyCodexNote(props.campaignId, props.entryId, text))

onMounted(async () => {
  try {
    content.value = (await fetchMyCodexNote(props.campaignId, props.entryId)).content
  } catch { /* zone vide, on peut quand même écrire */ }
  loaded.value = true
})

function onInput(value: string) {
  content.value = value
  schedule(value)
}
</script>

<template>
  <div class="my-note">
    <span class="my-note-label">
      <Lock :size="13" /> Mes notes
      <span class="my-note-status">{{ status === 'saving' ? 'Sauvegarde…' : status === 'error' ? 'Nouvel essai…' : '' }}</span>
    </span>
    <AppTextarea
      :model-value="content"
      :rows="3"
      :disabled="!loaded"
      placeholder="Ce que tu en penses, ce que tu soupçonnes… visible par toi seul."
      data-testid="codex-my-note"
      @update:model-value="onInput"
      @blur="flush"
    />
  </div>
</template>

<style scoped>
.my-note {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.my-note-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--muted);
}

.my-note-status {
  font-weight: 500;
  margin-left: auto;
}
</style>
