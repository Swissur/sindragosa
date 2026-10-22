<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { Plus, Swords, Shield, FlaskRound, Package, Gem, PersonStanding } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppAccordion from '../ui/AppAccordion.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import ItemEditorSheet from './ItemEditorSheet.vue'
import GiveItemSheet from './GiveItemSheet.vue'
import { user } from '../../composables/useAuth'
import { removeWithUndo } from '../../composables/useUndoRemove'
import { showToast } from '../../composables/useToast'
import { isEquippable, weaponDamage } from '../../utils/sindragosa/equipment'
import { advancedDomainById, domainById } from '../../data/sindragosa/domains'
import type { Character, ItemRow, ItemType } from '../../types/character'

/**
 * Inventaire (plans/35-equipement.md), rangé par catégorie, chacune repliée.
 * Taper un objet l'ouvre ; l'icône de corps équipe une arme ou une armure :
 * l'armure compte dans l'AP, l'arme donne une attaque.
 */
const props = defineProps<{ character: Character }>()

const TYPE_ICONS: Record<ItemType, Component> = {
  arme: Swords,
  armure: Shield,
  consommable: FlaskRound,
  composant: Package,
  divers: Gem,
}

const GROUP_LABELS: Record<ItemType, string> = {
  arme: 'Armes',
  armure: 'Armures',
  consommable: 'Consommables',
  composant: 'Composants',
  divers: 'Divers',
}

const groups = computed(() =>
  (Object.keys(GROUP_LABELS) as ItemType[])
    .map((type) => ({ type, items: props.character.items.filter((i) => (i.type ?? 'divers') === type) }))
    .filter((g) => g.items.length),
)

const editingId = ref<string | null>(null)
const editing = computed(() => props.character.items.find((i) => i.id === editingId.value) ?? null)
const editorOpen = computed({
  get: () => editing.value !== null,
  set: (v: boolean) => { if (!v) editingId.value = null },
})

/** La ligne sous le nom : la catégorie est déjà dans le titre du groupe. */
function detail(item: ItemRow): string {
  if (item.type === 'arme') return `${weaponDamage(item)} dégâts`
  if (item.type === 'armure') return `AP ${item.armor ?? 0}`
  const bonus = item.domainBonus
  if (!bonus?.dice) return ''
  const label = domainById(bonus.domainId)?.label ?? advancedDomainById(bonus.domainId)?.label ?? bonus.domainId
  return `${bonus.dice > 0 ? '+' : ''}${bonus.dice}d6 ${label}`
}

function addItem() {
  const item: ItemRow = { id: crypto.randomUUID(), name: '', description: '', quantity: 1, type: 'divers' }
  props.character.items.push(item)
  editingId.value = item.id
}

/** Copie non équipée, rangée juste sous l'original. */
function duplicate() {
  const i = props.character.items.findIndex((x) => x.id === editingId.value)
  const item = props.character.items[i]
  if (!item) return
  props.character.items.splice(i + 1, 0, { ...item, id: crypto.randomUUID(), equipped: false })
  editingId.value = null
  showToast(`${item.name || 'Objet'} dupliqué`)
}

/** Donner : l'éditeur se ferme, le choix du joueur prend le relais. */
const canGive = computed(() => !!user.value?.activeCampaignId && !!props.character.id)
const givingId = ref<string | null>(null)
const giving = computed(() => props.character.items.find((i) => i.id === givingId.value) ?? null)
const giveOpen = computed({
  get: () => giving.value !== null,
  set: (v: boolean) => { if (!v) givingId.value = null },
})

function startGive() {
  givingId.value = editingId.value
  editingId.value = null
}

/** Tout donné : la ligne part ; sinon il en reste. */
function given(item: ItemRow, quantity: number) {
  const i = props.character.items.findIndex((x) => x.id === item.id)
  if (i < 0) return
  const row = props.character.items[i]
  if (quantity >= row.quantity) props.character.items.splice(i, 1)
  else row.quantity -= quantity
}

function remove() {
  const i = props.character.items.findIndex((x) => x.id === editingId.value)
  const item = props.character.items[i]
  editingId.value = null
  if (item) removeWithUndo(props.character.items, i, item.name || 'Objet')
}
</script>

<template>
  <AppCard title="Objets">
    <template #titleActions>
      <AppIconBtn title="Ajouter un objet" data-testid="item-add" @click="addItem">
        <Plus :size="18" />
      </AppIconBtn>
    </template>

    <AppEmptyState v-if="!character.items.length">Sac vide. Fabrique ou ajoute un objet !</AppEmptyState>

    <template v-else>
      <AppAccordion
        v-for="g in groups"
        :key="g.type"
        :title="GROUP_LABELS[g.type]"
        :hint="`${g.items.length}`"
        :testid="`items-${g.type}`"
      >
        <template #icon><component :is="TYPE_ICONS[g.type]" :size="15" /></template>
        <ul class="items">
          <li v-for="item in g.items" :key="item.id" class="item" :data-testid="`item-${item.id}`">
            <button type="button" class="item-main" @click="editingId = item.id">
              <component :is="TYPE_ICONS[item.type ?? 'divers']" :size="16" class="item-icon" />
              <span class="item-text">
                <span class="item-name">{{ item.name || 'Nouvel objet' }}<template v-if="item.quantity > 1"> ×{{ item.quantity }}</template></span>
                <span v-if="detail(item)" class="item-detail">{{ detail(item) }}</span>
              </span>
            </button>
            <AppIconBtn
              v-if="isEquippable(item)"
              :title="item.equipped ? 'Retirer' : 'Équiper'"
              :aria-pressed="!!item.equipped"
              :data-testid="`item-equip-${item.id}`"
              @click="item.equipped = !item.equipped"
            >
              <PersonStanding :size="18" :class="item.equipped ? 'equip--on' : 'equip--off'" />
            </AppIconBtn>
          </li>
        </ul>
      </AppAccordion>
    </template>

    <ItemEditorSheet v-model="editorOpen" :item="editing" :can-give="canGive" @remove="remove" @duplicate="duplicate" @give="startGive" />
    <GiveItemSheet v-if="canGive" v-model="giveOpen" :item="giving" :character-id="Number(character.id)" @given="given" />
  </AppCard>
</template>

<style scoped>
.items {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.item {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.item-main {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: var(--space-xs) var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  background: none;
  color: var(--text);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.item-main:hover {
  background: var(--surface-2);
}

.item-icon {
  flex-shrink: 0;
  color: var(--accent);
}

.item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-detail {
  font-size: 0.78rem;
  color: var(--muted);
}

.equip--on {
  color: var(--accent);
  fill: color-mix(in srgb, var(--accent) 35%, transparent);
}

.equip--off {
  color: var(--muted);
  opacity: 0.5;
}
</style>
