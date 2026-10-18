<script setup lang="ts">
import { computed } from 'vue'
import { Trash2 } from 'lucide-vue-next'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppInput from '../ui/AppInput.vue'
import AppSelect from '../ui/AppSelect.vue'
import AppStepper from '../ui/AppStepper.vue'
import AppTextarea from '../ui/AppTextarea.vue'
import { DOMAINS } from '../../data/sindragosa/domains'
import { ITEM_TYPE_LABELS, WEAPON_SIZE_LABELS, isEquippable, weaponDamage } from '../../utils/sindragosa/equipment'
import type { ItemRow, ItemType } from '../../types/character'

/** Édition d'un objet : nom, type, quantité ; gabarit et domaine d'une arme, AP d'une armure. */
const props = defineProps<{ item: ItemRow | null }>()
const open = defineModel<boolean>({ required: true })
const emit = defineEmits<{ (e: 'remove'): void }>()

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
    if (!isEquippable(item)) item.equipped = false
  },
})
</script>

<template>
  <AppBottomSheet v-model="open" title="Objet" description="Nom, type et caractéristiques de l'objet.">
    <div v-if="item" class="editor" data-testid="item-editor">
      <AppInput v-model="item.name" placeholder="Nom de l'objet" data-testid="item-name" />
      <div class="editor-line">
        <AppSelect v-model="type" class="editor-grow" data-testid="item-type">
          <option v-for="(label, id) in ITEM_TYPE_LABELS" :key="id" :value="id">{{ label }}</option>
        </AppSelect>
        <AppStepper v-model="item.quantity" :min="1" label="Quantité" testid="item-quantity" />
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
        <p class="editor-hint" data-testid="item-damage">Dégâts : {{ weaponDamage(item) }} + marge − armure</p>
      </template>

      <div v-if="item.type === 'armure'" class="editor-line">
        <span class="editor-label">Armure Physique</span>
        <AppStepper :model-value="item.armor ?? 0" :min="0" @update:model-value="item.armor = $event" label="Armure Physique" testid="item-armor" />
      </div>

      <AppTextarea v-model="item.description" :rows="3" placeholder="Description" />

      <AppButton variant="danger" block data-testid="item-remove" @click="emit('remove')">
        <Trash2 :size="16" /> Jeter l'objet
      </AppButton>
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

.editor-hint {
  margin: 0;
  font-size: 0.85rem;
  color: var(--muted);
}
</style>
