<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  Plus, MoveRight, MoveHorizontal, Minus, Ellipsis, Scan, BookOpen, CircleMinus,
  Repeat2, Type, Trash2, User, MapPin, FileText,
} from 'lucide-vue-next'
import AppIconBtn from '../../ui/AppIconBtn.vue'
import AppToggleGroup from '../../ui/AppToggleGroup.vue'
import AppBottomSheet from '../../ui/AppBottomSheet.vue'
import AppModal from '../../ui/AppModal.vue'
import AppInput from '../../ui/AppInput.vue'
import AppButton from '../../ui/AppButton.vue'
import AppEmptyState from '../../ui/AppEmptyState.vue'
import CodexBoardCanvas, { type BoardSelection } from './CodexBoardCanvas.vue'
import type { CodexEntry } from '../../../api/codex'
import {
  createLink, deleteLink, fetchBoard, moveNode, placeNode, removeNode, resizeNode, updateLink,
  type Board, type BoardLink, type LinkDirection,
} from '../../../api/codexBoard'
import { liveCodexBoard } from '../../../composables/useCampaignLive'
import { useCampaignRolls } from '../../../composables/useCampaignRolls'
import { showToast } from '../../../composables/useToast'
import { freeSpot } from '../../../utils/codexBoard'

const props = defineProps<{
  campaignId: number
  entries: CodexEntry[]
}>()

const emit = defineEmits<{
  (e: 'open-entry', entryId: number): void
}>()

const { wake } = useCampaignRolls()

const board = ref<Board | null>(null)
const loading = ref(true)
const selection = ref<BoardSelection>(null)
const canvas = ref<InstanceType<typeof CodexBoardCanvas> | null>(null)

/** Un état plus ancien que celui affiché (réponse HTTP doublée par le flux live) est ignoré. */
function applyBoard(next: Board) {
  if (board.value && next.rev < board.value.rev) return
  board.value = next
  const sel = selection.value
  if (sel?.kind === 'node' && !next.nodes.some((n) => n.id === sel.id)) selection.value = null
  if (sel?.kind === 'link' && !next.links.some((l) => l.id === sel.id)) selection.value = null
}

watch(liveCodexBoard, (next) => { if (next) applyBoard(next) })

async function load() {
  loading.value = true
  try {
    applyBoard(await fetchBoard(props.campaignId))
  } catch {
    showToast('Impossible de charger le tableau.')
  }
  loading.value = false
}

/** Toute écriture renvoie le tableau entier. */
async function write(request: () => Promise<Board>, error: string) {
  wake()
  try {
    applyBoard(await request())
  } catch (e: any) {
    if (e?.status === 409 && e.body?.linkId) {
      selection.value = { kind: 'link', id: e.body.linkId }
      showToast('Ces deux fiches sont déjà reliées.')
      return
    }
    showToast(error)
    void load()
  }
}

onMounted(() => {
  // Le flux live peut s'être endormi : on le réveille pour voir les autres.
  wake()
  void load()
})

// ── Sélection ────────────────────────────────────────────────────────────────

const selectedNode = computed(() => {
  const sel = selection.value
  return sel?.kind === 'node' ? board.value?.nodes.find((n) => n.id === sel.id) ?? null : null
})

const selectedLink = computed(() => {
  const sel = selection.value
  return sel?.kind === 'link' ? board.value?.links.find((l) => l.id === sel.id) ?? null : null
})

// ── Fiches ───────────────────────────────────────────────────────────────────

const showAdd = ref(false)

const unplaced = computed(() => {
  const placed = new Set(board.value?.nodes.map((n) => n.entryId))
  return props.entries.filter((e) => !placed.has(e.id))
})

function place(entry: CodexEntry) {
  showAdd.value = false
  const spot = freeSpot(board.value?.nodes ?? [], canvas.value?.center() ?? { x: 0, y: 0 })
  void write(() => placeNode(props.campaignId, entry.id, Math.round(spot.x), Math.round(spot.y)), "Impossible de poser la fiche.")
}

function onMove(nodeId: number, x: number, y: number) {
  // La fiche reste où le doigt l'a lâchée pendant que le serveur confirme.
  const node = board.value?.nodes.find((n) => n.id === nodeId)
  if (node) Object.assign(node, { x, y })
  void write(() => moveNode(props.campaignId, nodeId, x, y), 'Impossible de déplacer la fiche.')
}

function onResize(nodeId: number, x: number, y: number, w: number, h: number) {
  const node = board.value?.nodes.find((n) => n.id === nodeId)
  if (node) Object.assign(node, { x, y, w, h })
  void write(() => resizeNode(props.campaignId, nodeId, { x, y, w, h }), "Impossible d'agrandir le lieu.")
}

function removeSelectedNode() {
  const node = selectedNode.value
  if (!node) return
  selection.value = null
  void write(() => removeNode(props.campaignId, node.id), 'Impossible de retirer la fiche.')
}

// ── Flèches ──────────────────────────────────────────────────────────────────

/** Style des prochaines flèches, quand aucune n'est sélectionnée. */
const penDirection = ref<LinkDirection>('one')
const penDashed = ref(false)

const DIRECTION_ITEMS = [
  { value: 'one', icon: MoveRight, title: 'Sens unique', testid: 'board-direction-one' },
  { value: 'both', icon: MoveHorizontal, title: 'Va-et-vient', testid: 'board-direction-both' },
]
const STROKE_ITEMS = [
  { value: 'solid', icon: Minus, title: 'Trait plein', testid: 'board-stroke-solid' },
  { value: 'dashed', icon: Ellipsis, title: 'Pointillé', testid: 'board-stroke-dashed' },
]

const direction = computed(() => selectedLink.value?.direction ?? penDirection.value)
const stroke = computed(() => ((selectedLink.value?.dashed ?? penDashed.value) ? 'dashed' : 'solid'))

function patchLink(link: BoardLink, data: Parameters<typeof updateLink>[2]) {
  // Le style change tout de suite à l'écran, le serveur suit.
  if (data.direction) link.direction = data.direction
  if (data.dashed !== undefined) link.dashed = data.dashed
  void write(() => updateLink(props.campaignId, link.id, data), 'Impossible de modifier la flèche.')
}

function setDirection(value: string) {
  // Re-cliquer le bouton actif le désélectionne : on garde le choix.
  if (value !== 'one' && value !== 'both') return
  if (selectedLink.value) patchLink(selectedLink.value, { direction: value })
  else penDirection.value = value
}

function setStroke(value: string) {
  if (value !== 'solid' && value !== 'dashed') return
  if (selectedLink.value) patchLink(selectedLink.value, { dashed: value === 'dashed' })
  else penDashed.value = value === 'dashed'
}

function onConnect(fromNodeId: number, toNodeId: number) {
  void write(
    () => createLink(props.campaignId, {
      fromNodeId, toNodeId, direction: penDirection.value, dashed: penDashed.value, label: '',
    }),
    'Impossible de relier les fiches.',
  )
}

function reverseSelectedLink() {
  if (selectedLink.value) patchLink(selectedLink.value, { reverse: true })
}

function deleteSelectedLink() {
  const link = selectedLink.value
  if (!link) return
  selection.value = null
  void write(() => deleteLink(props.campaignId, link.id), 'Impossible de supprimer la flèche.')
}

// ── Libellé ──────────────────────────────────────────────────────────────────

const showLabel = ref(false)
const labelDraft = ref('')

function openLabel() {
  labelDraft.value = selectedLink.value?.label ?? ''
  showLabel.value = true
}

function saveLabel() {
  showLabel.value = false
  const link = selectedLink.value
  if (!link) return
  link.label = labelDraft.value.trim()
  patchLink(link, { label: link.label })
}

const hint = computed(() => {
  if (selectedNode.value?.type === 'lieu') return 'Tire la flèche vers une fiche pour les relier, ou le coin pour agrandir le lieu.'
  if (selectedNode.value) return 'Tire la poignée vers une autre fiche pour les relier.'
  if (selectedLink.value) return null
  if (!board.value?.nodes.length) return 'Pose des fiches avec le +, puis relie-les.'
  return 'Touche une fiche pour la relier à une autre.'
})
</script>

<template>
  <div class="codex-board">
    <div class="board-toolbar">
      <!-- Fiche sélectionnée -->
      <template v-if="selectedNode">
        <AppIconBtn title="Ouvrir la fiche" data-testid="board-open-entry" @click="emit('open-entry', selectedNode.entryId)">
          <BookOpen :size="18" />
        </AppIconBtn>
        <AppIconBtn title="Retirer du tableau" data-testid="board-remove-node" @click="removeSelectedNode">
          <CircleMinus :size="18" />
        </AppIconBtn>
      </template>

      <!-- Rien, ou une flèche : le style (de la flèche, ou des prochaines) -->
      <template v-else>
        <AppIconBtn v-if="!selectedLink" variant="primary" title="Poser une fiche" data-testid="board-add" @click="showAdd = true">
          <Plus :size="18" />
        </AppIconBtn>
        <AppToggleGroup :model-value="direction" :items="DIRECTION_ITEMS" @update:model-value="setDirection" />
        <AppToggleGroup :model-value="stroke" :items="STROKE_ITEMS" @update:model-value="setStroke" />
      </template>

      <template v-if="selectedLink">
        <AppIconBtn
          title="Inverser le sens"
          data-testid="board-reverse"
          :disabled="selectedLink.direction === 'both'"
          @click="reverseSelectedLink"
        >
          <Repeat2 :size="18" />
        </AppIconBtn>
        <AppIconBtn title="Libellé" data-testid="board-label" @click="openLabel">
          <Type :size="18" />
        </AppIconBtn>
        <AppIconBtn variant="danger" title="Supprimer la flèche" data-testid="board-delete-link" @click="deleteSelectedLink">
          <Trash2 :size="18" />
        </AppIconBtn>
      </template>
      <AppIconBtn v-else title="Recadrer" data-testid="board-fit" @click="canvas?.fit()">
        <Scan :size="18" />
      </AppIconBtn>
    </div>

    <p v-if="hint" class="board-hint">{{ hint }}</p>

    <div class="board-surface">
      <AppEmptyState v-if="loading && !board" variant="loading">Chargement…</AppEmptyState>
      <CodexBoardCanvas
        v-else-if="board"
        ref="canvas"
        :nodes="board.nodes"
        :links="board.links"
        :selection="selection"
        @select="selection = $event"
        @move="onMove"
        @resize="onResize"
        @connect="onConnect"
      />
    </div>

    <!-- ── Poser une fiche ── -->
    <AppBottomSheet v-model="showAdd" title="Poser une fiche">
      <AppEmptyState v-if="!entries.length">Aucune fiche pour le moment : crée-en une dans la liste.</AppEmptyState>
      <AppEmptyState v-else-if="!unplaced.length">Toutes les fiches sont déjà sur le tableau.</AppEmptyState>
      <ul v-else class="add-list">
        <li v-for="entry in unplaced" :key="entry.id">
          <AppButton :block="true" :data-testid="`board-place-${entry.id}`" @click="place(entry)">
            <User v-if="entry.type === 'personnage'" :size="16" />
            <MapPin v-else-if="entry.type === 'lieu'" :size="16" />
            <FileText v-else :size="16" />
            {{ entry.name }}
          </AppButton>
        </li>
      </ul>
    </AppBottomSheet>

    <!-- ── Libellé de la flèche ── -->
    <AppModal v-model="showLabel" title="Libellé de la flèche">
      <form id="board-label-form" @submit.prevent="saveLabel">
        <AppInput
          v-model="labelDraft"
          placeholder="trahit, frère de, doit de l'or à…"
          :autofocus="true"
          data-testid="board-label-input"
          maxlength="40"
        />
      </form>
      <template #footer>
        <AppButton @click="showLabel = false">Annuler</AppButton>
        <AppButton variant="primary" type="submit" form="board-label-form" data-testid="board-label-save">
          Enregistrer
        </AppButton>
      </template>
    </AppModal>
  </div>
</template>

<style scoped>
.codex-board {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  gap: var(--space-sm);
}

.board-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-sm);
  flex-shrink: 0;
}

.board-hint {
  margin: 0;
  font-size: 0.78rem;
  color: var(--muted);
  font-style: italic;
  flex-shrink: 0;
}

.board-surface {
  flex: 1;
  min-height: 320px;
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  background: var(--surface-2);
  overflow: hidden;
}

.add-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}
</style>
