<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Copy, Gift, Trash2 } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import { ADVANCED_DOMAINS, DOMAINS } from '../../data/sindragosa/domains'
import { COMPONENT_NAMES, findComponentName } from '../../utils/sindragosa/crafting'
import { ITEM_TYPE_LABELS, WEAPON_SIZE_LABELS, isEquippable } from '../../utils/sindragosa/equipment'
import type { ItemRow, ItemType } from '../../types/character'

/**
 * Édition d'un objet : type et quantité, puis gabarit et domaine d'une arme, AP
 * d'une armure ou domaine lié d'un objet divers (±d6, malus = objet maudit),
 * puis nom et description.
 */
const props = defineProps<{ item: ItemRow | null; canGive?: boolean }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'remove'): void; (e: 'duplicate'): void; (e: 'give'): void }>()

const type = computed({
  get: () => props.item?.type ?? 'divers',
  set: (t: ItemType) => {
    const item = props.item
    if (!item) return
    item.type = t
    if (t === 'arme') {
      item.size ??= 'une-main'
      item.domainId ??= 'melee-bourrine'
      item.damageBonus ??= 0
    }
    if (t === 'armure') item.armor ??= 1
    // Une arme ou une armure est toujours unique : deux épées, ce sont deux lignes.
    if (isEquippable(item)) item.quantity = 1
    else item.equipped = false
  },
})

/** Objet divers : le domaine qu'il aide (ou gêne), '' = aucun. */
const bonusDomain = computed({
  get: () => props.item?.domainBonus?.domainId ?? '',
  set: (domainId: string) => {
    const item = props.item
    if (!item) return
    if (domainId) item.domainBonus = { domainId, dice: item.domainBonus?.dice ?? 1 }
    else delete item.domainBonus
  },
})
const bonusDice = computed({
  get: () => props.item?.domainBonus?.dice ?? 0,
  set: (dice: number) => {
    const bonus = props.item?.domainBonus
    if (bonus) props.item!.domainBonus = { ...bonus, dice }
  },
})

/** Composant : nom choisi dans le catalogue de l'artisanat, ou en texte libre. */
const FREE_TEXT = '__libre__'
const freeText = ref(false)
watch(() => [props.item?.id, props.item?.type], () => {
  const name = props.item?.name ?? ''
  freeText.value = !!name && !findComponentName(name)
}, { immediate: true })

const componentChoice = computed({
  get: () => freeText.value ? FREE_TEXT : findComponentName(props.item?.name ?? '') ?? '',
  set: (v: string) => {
    freeText.value = v === FREE_TEXT
    if (!freeText.value && props.item) props.item.name = v
  },
})
</script>

<template>
  <AppBottomSheet v-model="open" title="Objet" description="Type, caractéristiques et nom de l'objet.">
    <div v-if="item" class="editor" data-testid="item-editor">
      <div class="editor-line">
        <AppSelect v-model="type" class="editor-grow" data-testid="item-type">
          <option v-for="(label, id) in ITEM_TYPE_LABELS" :key="id" :value="id">{{ label }}</option>
        </AppSelect>
        <AppStepper v-if="!isEquippable(item)" v-model="item.quantity" :min="1" label="Quantité" testid="item-quantity" />
      </div>

      <template v-if="item.type === 'arme'">
        <div class="editor-line">
          <AppSelect v-model="item.size" class="editor-grow" data-testid="item-size">
            <option v-for="(label, id) in WEAPON_SIZE_LABELS" :key="id" :value="id">{{ label }}</option>
          </AppSelect>
          <AppSelect v-model="item.domainId" class="editor-grow" data-testid="item-domain">
            <option v-for="d in DOMAINS" :key="d.id" :value="d.id">{{ d.label }}</option>
          </AppSelect>
        </div>
        <div class="editor-line">
          <span class="editor-label">Bonus de dégâts</span>
          <AppStepper :model-value="item.damageBonus ?? 0" :min="-5" @update:model-value="item.damageBonus = $event" label="Bonus de dégâts" testid="item-damage-bonus" />
        </div>
      </template>

      <div v-if="item.type === 'armure'" class="editor-line">
        <span class="editor-label">Armure Physique</span>
        <AppStepper :model-value="item.armor ?? 0" :min="0" @update:model-value="item.armor = $event" label="Armure Physique" testid="item-armor" />
      </div>

      <div v-if="(item.type ?? 'divers') === 'divers'" class="editor-line">
        <AppSelect v-model="bonusDomain" class="editor-grow" data-testid="item-bonus-domain">
          <option value="">Aucun domaine lié</option>
          <optgroup label="Domaines">
            <option v-for="d in DOMAINS" :key="d.id" :value="d.id">{{ d.label }}</option>
          </optgroup>
          <optgroup label="Domaines avancés">
            <option v-for="d in ADVANCED_DOMAINS" :key="d.id" :value="d.id">{{ d.label }}</option>
          </optgroup>
        </AppSelect>
        <AppStepper v-if="item.domainBonus" v-model="bonusDice" :min="-3" :max="3" label="Dés en plus ou en moins" testid="item-bonus-dice">
          {{ bonusDice > 0 ? '+' : '' }}{{ bonusDice }}d6
        </AppStepper>
      </div>

      <AppSelect v-if="item.type === 'composant'" v-model="componentChoice" data-testid="item-component">
        <option value="" disabled>Choisir un composant…</option>
        <option v-for="name in COMPONENT_NAMES" :key="name" :value="name">{{ name }}</option>
        <option :value="FREE_TEXT">Texte libre</option>
      </AppSelect>
      <AppInput v-if="item.type !== 'composant' || freeText" v-model="item.name" placeholder="Nom de l'objet" data-testid="item-name" />
      <AppTextarea v-model="item.description" :rows="3" placeholder="Description" />

      <AppButton v-if="isEquippable(item)" block data-testid="item-duplicate" @click="emit('duplicate')">
        <Copy :size="16" /> Dupliquer
      </AppButton>
      <div class="editor-line">
        <AppButton v-if="canGive" class="editor-grow" data-testid="item-give" @click="emit('give')">
          <Gift :size="16" /> Donner l'objet
        </AppButton>
        <AppButton variant="danger" class="editor-grow" data-testid="item-remove" @click="emit('remove')">
          <Trash2 :size="16" /> Jeter l'objet
        </AppButton>
      </div>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.editor {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.editor-line {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.editor-grow {
  flex: 1;
  min-width: 0;
}

.editor-label {
  flex: 1;
  font-weight: 600;
}
</style>
