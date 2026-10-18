<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Component } from 'vue'
import { Plus, Swords, Shield, FlaskRound, Package, Gem, PersonStanding } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppIconBtn from '../ui/AppIconBtn.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'
import ItemEditorSheet from './ItemEditorSheet.vue'
import { removeWithUndo } from '../../composables/useUndoRemove'
import { ITEM_TYPE_LABELS, isEquippable, weaponDamage } from '../../utils/sindragosa/equipment'
import type { Character, ItemRow, ItemType } from '../../types/character'

/**
 * Inventaire (plans/35-equipement.md). Taper un objet l'ouvre ; l'icône de corps
 * équipe une arme ou une armure : l'armure compte dans l'AP, l'arme donne une attaque.
 */
const props = defineProps<{ character: Character }>()

const TYPE_ICONS: Record<ItemType, Component> = {
  arme: Swords,
  armure: Shield,
  consommable: FlaskRound,
  composant: Package,
  divers: Gem,
}

const editingId = ref<string | null>(null)
const editing = computed(() => props.character.items.find((i) => i.id === editingId.value) ?? null)
const editorOpen = computed({
  get: () => editing.value !== null,
  set: (v: boolean) => { if (!v) editingId.value = null },
})

function detail(item: ItemRow): string {
  if (item.type === 'arme') return `${weaponDamage(item)} dégâts`
  if (item.type === 'armure') return `AP ${item.armor ?? 0}`
  return ITEM_TYPE_LABELS[item.type ?? 'divers']
}

function addItem() {
  const item: ItemRow = { id: crypto.randomUUID(), name: '', description: '', quantity: 1, type: 'divers' }
  props.character.items.push(item)
  editingId.value = item.id
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

    <ul v-else class="items">
      <li v-for="item in character.items" :key="item.id" class="item" :data-testid="`item-${item.id}`">
        <button type="button" class="item-main" @click="editingId = item.id">
          <component :is="TYPE_ICONS[item.type ?? 'divers']" :size="16" class="item-icon" />
          <span class="item-text">
            <span class="item-name">{{ item.name || 'Nouvel objet' }}<template v-if="item.quantity > 1"> ×{{ item.quantity }}</template></span>
            <span class="item-detail">{{ detail(item) }}</span>
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

    <ItemEditorSheet v-model="editorOpen" :item="editing" @remove="remove" />
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
