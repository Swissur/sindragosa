<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { onBeforeRouteLeave, useRoute, useRouter } from 'vue-router'
import {
  ArrowUpDown, Eye, EyeOff, Flag, Gift, Image as ImageIcon, ImagePlus, Package, Pencil, Send, Trash2, Type, UserPlus, UserRound,
} from 'lucide-vue-next'
import AppPageLayout from '../components/ui/AppPageLayout.vue'
import AppPageHead from '../components/ui/AppPageHead.vue'
import AppIconBtn from '../components/ui/AppIconBtn.vue'
import AppButton from '../components/ui/AppButton.vue'
import AppInput from '../components/ui/AppInput.vue'
import AppTextarea from '../components/ui/AppTextarea.vue'
import AppModal from '../components/ui/AppModal.vue'
import AppBadge from '../components/ui/AppBadge.vue'
import AppEmptyState from '../components/ui/AppEmptyState.vue'
import NoteContent from '../components/journal/NoteContent.vue'
import ItemEditorSheet from '../components/character-sheet/ItemEditorSheet.vue'
import ScenarioBlockFrame from '../components/scenario/ScenarioBlockFrame.vue'
import ScenarioBookmark from '../components/scenario/ScenarioBookmark.vue'
import ScenarioGiveSheet from '../components/scenario/ScenarioGiveSheet.vue'
import NpcSheet from '../components/scenario/NpcSheet.vue'
import {
  deleteScenario, fetchScenario, giveItemBlock, saveScenario, shareImageBlock, uploadScenarioImage,
  type Scenario, type ScenarioBlock,
} from '../api/scenarios'
import { createCodexEntry, deleteCodexEntry, fetchCodexEntries, revealCodexEntry, type CodexEntry } from '../api/codex'
import { fetchCampaign, type CampaignMember } from '../api/campaigns'
import { useGmCampaign } from '../composables/useGmCampaign'
import { useAutosave } from '../composables/useAutosave'
import { showToast } from '../composables/useToast'
import { imageFileToJpeg } from '../utils/imageFile'
import { mergeServerFields, moveBlock, newBlockId, removeBlock } from '../utils/scenario'
import { relativeTime } from '../utils/relativeTime'
import { ITEM_TYPE_LABELS } from '../utils/sindragosa/equipment'
import type { ItemRow } from '../types/character'

// Un scénario du MJ (plans/47) : des blocs à lire, à montrer, à donner, à révéler,
// et la ligne rouge qui dit où la table en est restée.
const route = useRoute()
const router = useRouter()
const { gmCampaignId } = useGmCampaign()
const scenarioId = Number(route.params.sid)

const scenario = ref<Scenario | null>(null)
const status = ref<'loading' | 'ready' | 'error'>('loading')
const entries = ref<Map<number, CodexEntry>>(new Map())
const members = ref<CampaignMember[]>([])
const organizing = ref(false)

// ── Chargement et sauvegarde auto ────────────────────────────────────────────

const { status: saveStatus, schedule, flush } = useAutosave<Pick<Scenario, 'title' | 'blocks' | 'bookmark'>>(
  async (data) => { await saveScenario(gmCampaignId.value!, scenarioId, data) },
)
let skipNextSave = false

watch(gmCampaignId, async (campaignId) => {
  if (!campaignId) return
  try {
    const [loaded, codex, campaign] = await Promise.all([
      fetchScenario(campaignId, scenarioId),
      fetchCodexEntries(campaignId),
      fetchCampaign(campaignId),
    ])
    skipNextSave = true
    scenario.value = loaded
    entries.value = new Map(codex.map((e) => [e.id, e]))
    members.value = campaign.members
    status.value = 'ready'
    await nextTick()
    jumpToBookmark('auto')
  } catch {
    status.value = 'error'
  }
}, { immediate: true })

watch(
  () => scenario.value && { title: scenario.value.title, blocks: scenario.value.blocks, bookmark: scenario.value.bookmark },
  (data) => {
    if (skipNextSave) { skipNextSave = false; return }
    if (data) schedule(JSON.parse(JSON.stringify(data)))
  },
  { deep: true },
)

onBeforeRouteLeave(() => flush())

function jumpToBookmark(behavior: ScrollBehavior = 'smooth') {
  document.querySelector('[data-testid="scenario-bookmark"]')?.scrollIntoView({ behavior, block: 'center' })
}

// ── Blocs ────────────────────────────────────────────────────────────────────

const blocks = computed(() => scenario.value?.blocks ?? [])

const BLOCK_LABELS = { texte: 'Texte', image: 'Image', objet: 'Objet', pnj: 'PNJ' } as const
const BLOCK_ICONS = { texte: Type, image: ImageIcon, objet: Package, pnj: UserRound } as const

function addBlock(block: ScenarioBlock) {
  scenario.value!.blocks.push(block)
}

function toggleFlag(id: string) {
  const s = scenario.value!
  s.bookmark = s.bookmark === id ? null : id
}

function move(id: string, delta: -1 | 1) {
  const s = scenario.value!
  s.blocks = moveBlock(s.blocks, id, delta)
}

function remove(id: string) {
  const s = scenario.value!
  const next = removeBlock(s.blocks, s.bookmark, id)
  s.blocks = next.blocks
  s.bookmark = next.bookmark
}

// Texte : on lit le rendu, un tap passe en édition.
const editingTextId = ref<string | null>(null)
const vFocus = { mounted: (el: HTMLElement) => el.focus() }

function addText() {
  const id = newBlockId()
  addBlock({ id, type: 'texte', text: '' })
  editingTextId.value = id
}

// Image : importée réduite, montrée aux joueurs d'un tap.
const imageInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

async function onImagePicked(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file || !gmCampaignId.value) return
  uploading.value = true
  try {
    const { data, mimeType } = await imageFileToJpeg(file)
    const { imageId } = await uploadScenarioImage(gmCampaignId.value, data, mimeType)
    addBlock({ id: newBlockId(), type: 'image', imageId, caption: '' })
  } catch {
    showToast('L\'image n\'a pas pu être importée.')
  } finally {
    uploading.value = false
    if (imageInput.value) imageInput.value.value = ''
  }
}

async function share(block: ScenarioBlock) {
  await flush()
  try {
    const saved = await shareImageBlock(gmCampaignId.value!, scenarioId, block.id)
    scenario.value!.blocks = mergeServerFields(scenario.value!.blocks, saved)
    showToast('🖼️ Image montrée aux joueurs')
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'Erreur')
  }
}

// Objet : édité avec l'éditeur de l'inventaire, donné en copie à un héros.
const editingItemBlock = ref<Extract<ScenarioBlock, { type: 'objet' }> | null>(null)
const itemEditorOpen = ref(false)
const giveOpen = ref(false)
const giving = ref(false)

function addItem() {
  const block: ScenarioBlock = { id: newBlockId(), type: 'objet', item: { name: '', type: 'divers', quantity: 1 }, givenTo: [] }
  addBlock(block)
  openItem(scenario.value!.blocks[scenario.value!.blocks.length - 1] as typeof block)
}

function openItem(block: Extract<ScenarioBlock, { type: 'objet' }>) {
  block.item.quantity ??= 1
  editingItemBlock.value = block
  itemEditorOpen.value = true
}

function startGive(block: Extract<ScenarioBlock, { type: 'objet' }>) {
  editingItemBlock.value = block
  itemEditorOpen.value = false
  giveOpen.value = true
}

async function giveTo(member: CampaignMember) {
  const block = editingItemBlock.value
  if (!block || giving.value) return
  giving.value = true
  await flush()
  try {
    const saved = await giveItemBlock(gmCampaignId.value!, scenarioId, block.id, member.userId)
    scenario.value!.blocks = mergeServerFields(scenario.value!.blocks, saved)
    showToast(`🎁 ${block.item.name || 'Objet'} → ${member.characterName}`)
    giveOpen.value = false
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'Erreur')
  } finally {
    giving.value = false
  }
}

function removeEditingItem() {
  if (editingItemBlock.value) remove(editingItemBlock.value.id)
  itemEditorOpen.value = false
}

// PNJ : une fiche du Codex au MJ, cachée jusqu'à ce qu'il la révèle.
const npcEntry = ref<CodexEntry | null>(null)
const npcOpen = ref(false)
const npcBlockId = ref<string | null>(null)

async function addNpc() {
  try {
    const entry = await createCodexEntry(gmCampaignId.value!, { name: 'Nouveau PNJ', type: 'personnage', secret: true })
    entries.value.set(entry.id, entry)
    const id = newBlockId()
    addBlock({ id, type: 'pnj', entryId: entry.id })
    openNpc(id, entry)
  } catch {
    showToast('Le PNJ n\'a pas pu être créé.')
  }
}

function openNpc(blockId: string, entry: CodexEntry | undefined) {
  if (!entry) return
  npcBlockId.value = blockId
  npcEntry.value = entry
  npcOpen.value = true
}

function onNpcSaved(entry: CodexEntry) {
  entries.value.set(entry.id, entry)
  npcEntry.value = entry
}

async function toggleReveal(entry: CodexEntry) {
  try {
    const updated = await revealCodexEntry(gmCampaignId.value!, entry.id, !entry.hidden)
    onNpcSaved(updated)
    showToast(updated.hidden ? `${updated.name} est de nouveau caché` : `📜 ${updated.name} révélé aux joueurs`)
  } catch {
    showToast('Erreur')
  }
}

async function removeNpc() {
  const entry = npcEntry.value
  if (!entry) return
  try {
    await deleteCodexEntry(gmCampaignId.value!, entry.id)
    entries.value.delete(entry.id)
    if (npcBlockId.value) remove(npcBlockId.value)
    npcOpen.value = false
  } catch {
    showToast('La fiche n\'a pas pu être supprimée.')
  }
}

// ── Titre et suppression ─────────────────────────────────────────────────────

const renaming = ref(false)
const newTitle = ref('')
const confirmingDelete = ref(false)

function startRename() {
  newTitle.value = scenario.value?.title ?? ''
  renaming.value = true
}

function rename() {
  if (scenario.value && newTitle.value.trim()) scenario.value.title = newTitle.value.trim()
  renaming.value = false
}

async function destroy() {
  try {
    await deleteScenario(gmCampaignId.value!, scenarioId)
    skipNextSave = true
    scenario.value = null
    router.push('/scenarios')
  } catch {
    showToast('Le scénario n\'a pas pu être supprimé.')
  }
}
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        <span class="title">{{ scenario?.title ?? 'Scénario' }}</span>
        <template v-if="scenario" #actions>
          <AppIconBtn v-if="scenario.bookmark !== null" title="Aller au drapeau" data-testid="scenario-jump" @click="jumpToBookmark()">
            <Flag :size="18" />
          </AppIconBtn>
          <AppIconBtn
            :variant="organizing ? 'primary' : 'ghost'"
            title="Réorganiser les blocs"
            data-testid="scenario-organize"
            @click="organizing = !organizing"
          >
            <ArrowUpDown :size="18" />
          </AppIconBtn>
          <AppIconBtn title="Renommer" @click="startRename"><Pencil :size="18" /></AppIconBtn>
          <AppIconBtn variant="danger" title="Supprimer le scénario" @click="confirmingDelete = true"><Trash2 :size="18" /></AppIconBtn>
        </template>
      </AppPageHead>
    </template>

    <AppEmptyState v-if="status === 'loading'" variant="loading">Chargement…</AppEmptyState>
    <AppEmptyState v-else-if="status === 'error' || !scenario" variant="error">Scénario introuvable.</AppEmptyState>

    <div v-else class="scenario">
      <p class="save-status" :class="`save-status--${saveStatus}`">
        {{ saveStatus === 'saving' ? 'Sauvegarde…' : saveStatus === 'error' ? 'Hors ligne, nouvel essai bientôt…' : 'Enregistré' }}
      </p>

      <ScenarioBookmark v-if="scenario.bookmark === ''" />
      <AppEmptyState v-if="!blocks.length">
        Ajoute un premier bloc : du texte à lire, une image à montrer, un objet à donner, un PNJ à révéler.
      </AppEmptyState>

      <template v-for="(block, index) in blocks" :key="block.id">
        <ScenarioBlockFrame
          :icon="BLOCK_ICONS[block.type]"
          :label="block.type === 'pnj' ? (entries.get(block.entryId)?.name ?? 'PNJ') : BLOCK_LABELS[block.type]"
          :flagged="scenario.bookmark === block.id"
          :organizing="organizing"
          :first="index === 0"
          :last="index === blocks.length - 1"
          :testid="`scenario-block-${index}`"
          @flag="toggleFlag(block.id)"
          @move="move(block.id, $event)"
          @remove="remove(block.id)"
        >
          <!-- Texte -->
          <template v-if="block.type === 'texte'">
            <AppTextarea
              v-if="editingTextId === block.id"
              v-model="block.text"
              v-focus
              :rows="6"
              placeholder="Mise en scène, dialogues, ce qui se passe… (markdown : **gras**, # titre, - liste)"
              @blur="editingTextId = null"
            />
            <NoteContent v-else-if="block.text" :content="block.text" editable @edit="editingTextId = block.id" />
            <button v-else type="button" class="empty-text" @click="editingTextId = block.id">Écrire…</button>
          </template>

          <!-- Image -->
          <template v-else-if="block.type === 'image'">
            <img :src="`/api/images/${block.imageId}`" :alt="block.caption" class="block-image" />
            <AppInput v-model="block.caption" placeholder="Légende (vue par les joueurs)" />
            <span v-if="block.sharedAt" class="block-note">Montrée {{ relativeTime(block.sharedAt) }}</span>
          </template>

          <!-- Objet -->
          <template v-else-if="block.type === 'objet'">
            <button type="button" class="item-summary" @click="openItem(block)">
              <span class="item-name">
                {{ block.item.name || 'Objet sans nom' }}<template v-if="(block.item.quantity ?? 1) > 1"> ×{{ block.item.quantity }}</template>
              </span>
              <span class="block-note">{{ ITEM_TYPE_LABELS[block.item.type ?? 'divers'] }}</span>
              <span v-if="block.item.description" class="item-desc">{{ block.item.description }}</span>
            </button>
            <div v-if="block.givenTo.length" class="given">
              <AppBadge v-for="(name, i) in block.givenTo" :key="i" variant="info">🎁 {{ name }}</AppBadge>
            </div>
          </template>

          <!-- PNJ -->
          <template v-else-if="block.type === 'pnj'">
            <button
              v-if="entries.get(block.entryId)"
              type="button"
              class="npc-summary"
              @click="openNpc(block.id, entries.get(block.entryId))"
            >
              <span class="npc-portrait">
                <img v-if="entries.get(block.entryId)!.imageId" :src="`/api/images/${entries.get(block.entryId)!.imageId}`" alt="" />
                <UserRound v-else :size="20" />
              </span>
              <span class="npc-text">
                <AppBadge :variant="entries.get(block.entryId)!.hidden ? 'limitée' : 'active'">
                  {{ entries.get(block.entryId)!.hidden ? 'Caché' : 'Révélé' }}
                </AppBadge>
                <span class="item-desc">{{ entries.get(block.entryId)!.description || 'Pas encore de description.' }}</span>
              </span>
            </button>
            <span v-else class="block-note">Cette fiche a été supprimée du Codex.</span>
          </template>

          <template #actions>
            <AppIconBtn
              v-if="block.type === 'image'"
              :variant="block.sharedAt ? 'success' : 'primary'"
              :title="block.sharedAt ? 'Montrer à nouveau' : 'Montrer aux joueurs'"
              :data-testid="`scenario-block-${index}-share`"
              @click="share(block)"
            >
              <Send :size="17" />
            </AppIconBtn>
            <AppIconBtn
              v-else-if="block.type === 'objet'"
              variant="primary"
              title="Donner à un héros"
              :disabled="!block.item.name"
              :data-testid="`scenario-block-${index}-give`"
              @click="startGive(block)"
            >
              <Gift :size="17" />
            </AppIconBtn>
            <AppIconBtn
              v-else-if="block.type === 'pnj' && entries.get(block.entryId)"
              :variant="entries.get(block.entryId)!.hidden ? 'ghost' : 'success'"
              :title="entries.get(block.entryId)!.hidden ? 'Révéler aux joueurs' : 'Cacher aux joueurs'"
              :data-testid="`scenario-block-${index}-reveal`"
              @click="toggleReveal(entries.get(block.entryId)!)"
            >
              <EyeOff v-if="entries.get(block.entryId)!.hidden" :size="17" />
              <Eye v-else :size="17" />
            </AppIconBtn>
          </template>
        </ScenarioBlockFrame>
        <ScenarioBookmark v-if="scenario.bookmark === block.id" />
      </template>

      <div class="add-bar">
        <span class="add-label">Ajouter</span>
        <AppIconBtn title="Texte" data-testid="scenario-add-text" @click="addText"><Type :size="18" /></AppIconBtn>
        <AppIconBtn title="Image" :disabled="uploading" data-testid="scenario-add-image" @click="imageInput?.click()"><ImagePlus :size="18" /></AppIconBtn>
        <AppIconBtn title="Objet" data-testid="scenario-add-item" @click="addItem"><Package :size="18" /></AppIconBtn>
        <AppIconBtn title="PNJ" data-testid="scenario-add-npc" @click="addNpc"><UserPlus :size="18" /></AppIconBtn>
        <input ref="imageInput" type="file" accept="image/*" hidden @change="onImagePicked" />
      </div>
    </div>

    <ItemEditorSheet
      v-model="itemEditorOpen"
      :item="(editingItemBlock?.item as ItemRow | undefined) ?? null"
      can-give
      @give="editingItemBlock && startGive(editingItemBlock)"
      @remove="removeEditingItem"
      @duplicate="editingItemBlock && addBlock({ ...JSON.parse(JSON.stringify(editingItemBlock)), id: newBlockId(), givenTo: [] })"
    />
    <ScenarioGiveSheet
      v-model="giveOpen"
      :item-name="editingItemBlock?.item.name ?? ''"
      :members="members"
      :sending="giving"
      @pick="giveTo"
    />
    <NpcSheet
      v-if="gmCampaignId"
      v-model="npcOpen"
      :campaign-id="gmCampaignId"
      :entry="npcEntry"
      @saved="onNpcSaved"
      @toggle-reveal="npcEntry && toggleReveal(npcEntry)"
      @remove="removeNpc"
    />

    <AppModal v-model="renaming" title="Renommer le scénario">
      <form class="rename-form" @submit.prevent="rename">
        <AppInput v-model="newTitle" autofocus />
      </form>
      <template #footer>
        <AppButton @click="renaming = false">Annuler</AppButton>
        <AppButton variant="primary" :disabled="!newTitle.trim()" @click="rename">Renommer</AppButton>
      </template>
    </AppModal>

    <AppModal v-model="confirmingDelete" title="Supprimer le scénario ?">
      <p class="confirm-text">
        Les blocs disparaissent. Les fiches PNJ restent dans le Codex, les objets donnés restent dans les inventaires.
      </p>
      <template #footer>
        <AppButton @click="confirmingDelete = false">Annuler</AppButton>
        <AppButton variant="danger" @click="destroy">Supprimer</AppButton>
      </template>
    </AppModal>
  </AppPageLayout>
</template>

<style scoped>
.title {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.scenario {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
  padding-bottom: var(--space-lg);
}

.save-status {
  margin: 0;
  align-self: flex-end;
  font-size: 0.74rem;
  color: var(--muted);
}

.save-status--error {
  color: var(--danger);
}

.empty-text {
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-md);
  background: none;
  color: var(--muted);
  min-height: 40px;
  font: inherit;
  font-style: italic;
  cursor: pointer;
}

.block-image {
  display: block;
  width: 100%;
  max-height: 50dvh;
  object-fit: contain;
  border-radius: var(--radius-md);
  background: var(--surface-2);
}

.block-note {
  font-size: 0.78rem;
  color: var(--muted);
}

.item-summary,
.npc-summary {
  display: flex;
  border: none;
  background: none;
  padding: 0;
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.item-summary {
  flex-direction: column;
  gap: 0.1rem;
}

.item-name {
  font-weight: 700;
}

.item-desc {
  font-size: 0.86rem;
  color: var(--text);
  white-space: pre-wrap;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.given {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

.npc-summary {
  align-items: flex-start;
  gap: var(--space-md);
}

.npc-portrait {
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  border-radius: 50%;
  overflow: hidden;
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--muted);
  display: flex;
  align-items: center;
  justify-content: center;
}

.npc-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.npc-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-xs);
  min-width: 0;
}

.add-bar {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm);
  border: 1px dashed var(--border-strong);
  border-radius: var(--radius-lg);
}

.add-label {
  flex: 1;
  font-family: var(--title-font);
  font-weight: 700;
  color: var(--muted);
}

.rename-form {
  display: flex;
}

.rename-form > * {
  flex: 1;
}

.confirm-text {
  margin: 0;
}
</style>
