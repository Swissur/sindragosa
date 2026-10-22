<script setup lang="ts">
import { ref, watch } from 'vue'
import { Eye, EyeOff, ImagePlus, Lock, Trash2, UserRound } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppInput from '../ui/AppInput.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import AppButton from '../ui/AppButton.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import { updateCodexEntry, type CodexEntry } from '../../api/codex'
import { uploadScenarioImage } from '../../api/scenarios'
import { imageFileToJpeg } from '../../utils/imageFile'
import { showToast } from '../../composables/useToast'

/**
 * Fiche PNJ côté MJ (plans/47) : ce que les joueurs liront une fois la fiche
 * révélée, et ses notes secrètes, qui ne quittent jamais le serveur.
 */
const props = defineProps<{ campaignId: number; entry: CodexEntry | null }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{
  (e: 'saved', entry: CodexEntry): void
  (e: 'toggle-reveal'): void
  (e: 'remove'): void
}>()

const name = ref('')
const description = ref('')
const gmNotes = ref('')
const saving = ref(false)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

watch(open, (isOpen) => {
  if (!isOpen || !props.entry) return
  name.value = props.entry.name
  description.value = props.entry.description
  gmNotes.value = props.entry.gmNotes
})

async function save() {
  const entry = props.entry
  if (!entry || !name.value.trim() || saving.value) return
  saving.value = true
  try {
    emit('saved', await updateCodexEntry(props.campaignId, entry.id, {
      name: name.value.trim(),
      description: description.value,
      gmNotes: gmNotes.value,
      expectedVersion: entry.version,
    }))
    open.value = false
  } catch {
    showToast('La fiche n\'a pas pu être enregistrée.')
  } finally {
    saving.value = false
  }
}

async function onPortrait(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  const entry = props.entry
  if (!file || !entry) return
  uploading.value = true
  try {
    const { data, mimeType } = await imageFileToJpeg(file)
    const { imageId } = await uploadScenarioImage(props.campaignId, data, mimeType)
    emit('saved', await updateCodexEntry(props.campaignId, entry.id, { imageId }))
  } catch {
    showToast('Le portrait n\'a pas pu être importé.')
  } finally {
    uploading.value = false
    if (fileInput.value) fileInput.value.value = ''
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" title="Fiche PNJ" description="Portrait, description pour les joueurs et notes secrètes du MJ.">
    <form v-if="entry" class="npc-form" data-testid="npc-sheet" @submit.prevent="save">
      <div class="npc-top">
        <button type="button" class="npc-portrait" title="Changer le portrait" @click="fileInput?.click()">
          <img v-if="entry.imageId" :src="`/api/images/${entry.imageId}`" alt="" />
          <ImagePlus v-else-if="!uploading" :size="22" />
          <UserRound v-else :size="22" class="uploading" />
        </button>
        <input ref="fileInput" type="file" accept="image/*" hidden @change="onPortrait" />
        <AppInput v-model="name" class="npc-name" placeholder="Nom du PNJ" required data-testid="npc-name" />
        <AppIconBtn
          :variant="entry.hidden ? 'ghost' : 'success'"
          :title="entry.hidden ? 'Révéler aux joueurs' : 'Cacher aux joueurs'"
          data-testid="npc-reveal"
          @click="emit('toggle-reveal')"
        >
          <EyeOff v-if="entry.hidden" :size="18" />
          <Eye v-else :size="18" />
        </AppIconBtn>
      </div>

      <p class="npc-state">
        {{ entry.hidden ? 'Cachée : les joueurs ne la voient pas encore.' : 'Révélée : dans les Fiches des joueurs.' }}
      </p>

      <AppTextarea v-model="description" :rows="4" placeholder="Ce que les joueurs liront (apparence, rôle, ce qu'ils savent)…" />

      <label class="npc-secret-label"><Lock :size="14" /> Notes secrètes du MJ</label>
      <AppTextarea v-model="gmNotes" :rows="4" placeholder="Motivations, secrets, statistiques… jamais montrées." data-testid="npc-gm-notes" />

      <div class="npc-actions">
        <AppButton variant="danger" @click="emit('remove')"><Trash2 :size="15" /> Supprimer</AppButton>
        <AppButton variant="primary" type="submit" class="npc-grow" :disabled="saving || !name.trim()" data-testid="npc-save">
          {{ saving ? 'Sauvegarde…' : 'Enregistrer' }}
        </AppButton>
      </div>
    </form>
  </AppBottomSheet>
</template>

<style scoped>
.npc-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.npc-top {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.npc-portrait {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--surface-2);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
  cursor: pointer;
}

.npc-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.uploading {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  50% { opacity: 0.3; }
}

.npc-name {
  flex: 1;
  min-width: 0;
}

.npc-state {
  margin: 0;
  font-size: 0.8rem;
  color: var(--muted);
}

.npc-secret-label {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--danger);
}

.npc-actions {
  display: flex;
  gap: var(--space-sm);
}

.npc-grow {
  flex: 1;
}
</style>
