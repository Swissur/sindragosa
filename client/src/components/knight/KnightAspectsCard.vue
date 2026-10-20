<script setup lang="ts">
import { Dices } from 'lucide-vue-next'
import AppCard from '../ui/AppCard.vue'
import AppStepper from '../ui/AppStepper.vue'
import { ASPECTS, ASPECT_MAX, ASPECT_MIN, CARAC_LABELS, OVERDRIVE_MAX, type AspectId, type CaracId } from '../../data/knight/aspects'
import { setAspect } from '../../utils/knight/sheet'
import type { KnightSheet } from '../../types/knight'

/**
 * Les 5 aspects et leurs caracs (plans/43). Un aspect plafonne ses 3 caracs ;
 * les overdrives ajoutent des réussites automatiques. Taper une carac lance un
 * combo depuis elle.
 */
const props = defineProps<{ sheet: KnightSheet; editing?: boolean; readonly?: boolean }>()

const emit = defineEmits<{ (e: 'roll', carac: CaracId): void }>()

const onAspect = (id: AspectId, v: number) => setAspect(props.sheet, id, v)
</script>

<template>
  <AppCard v-for="a in ASPECTS" :key="a.id" class="aspect" :data-testid="`aspect-${a.id}`">
    <div class="card-head aspect-head">
      <h3 class="aspect-name">{{ a.label }}</h3>
      <AppStepper
        v-if="editing && !readonly"
        :model-value="sheet.aspects[a.id]"
        :min="ASPECT_MIN"
        :max="ASPECT_MAX"
        :label="a.label"
        :testid="`aspect-${a.id}`"
        @update:model-value="onAspect(a.id, $event)"
      />
      <span v-else class="aspect-score">{{ sheet.aspects[a.id] }}</span>
    </div>

    <div class="caracs">
      <template v-for="c in a.caracs" :key="c">
        <div v-if="editing && !readonly" class="carac carac--edit" :data-testid="`carac-${c}`">
          <span class="carac-name">{{ CARAC_LABELS[c] }}</span>
          <AppStepper v-model="sheet.carac[c]" :max="sheet.aspects[a.id]" :label="CARAC_LABELS[c]" :testid="`carac-${c}`" />
          <span class="carac-od-label">Overdrive</span>
          <AppStepper v-model="sheet.overdrive[c]" :max="OVERDRIVE_MAX" :label="`Overdrive ${CARAC_LABELS[c]}`" :testid="`od-${c}`" />
        </div>
        <button
          v-else
          type="button"
          class="carac"
          :disabled="readonly"
          :title="`Jet de ${CARAC_LABELS[c]}`"
          :data-testid="`carac-${c}`"
          @click="emit('roll', c)"
        >
          <span class="carac-name">{{ CARAC_LABELS[c] }}</span>
          <span class="carac-od" :class="{ 'carac-od--empty': !sheet.overdrive[c] }">
            <span v-for="i in OVERDRIVE_MAX" :key="i" class="od-dot" :class="{ 'od-dot--on': i <= sheet.overdrive[c] }" />
          </span>
          <span class="carac-value">{{ sheet.carac[c] }}</span>
          <Dices v-if="!readonly" :size="16" class="carac-roll" />
        </button>
      </template>
    </div>
  </AppCard>
</template>

<style scoped>
.aspect + .aspect {
  margin-top: var(--space-sm);
}

.aspect-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  min-height: 40px;
}

.aspect-name {
  margin: 0;
  font-family: var(--title-font);
  font-size: 1.1rem;
  color: var(--accent-strong);
}

.aspect-score {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: var(--brand);
  color: var(--on-brand);
  font-weight: 800;
  font-size: 1.1rem;
}

.caracs {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.carac {
  display: grid;
  grid-template-columns: 1fr auto 2rem 1rem;
  align-items: center;
  gap: var(--space-sm);
  min-height: 40px;
  padding: 0 var(--space-sm);
  border: none;
  border-radius: var(--radius-md);
  background: var(--surface-2);
  color: inherit;
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.carac:disabled {
  cursor: default;
  grid-template-columns: 1fr auto 2rem;
}

.carac--edit {
  grid-template-columns: 1fr auto;
  row-gap: var(--space-xs);
  padding: var(--space-xs) var(--space-sm);
  cursor: default;
}

.carac-name {
  font-weight: 600;
}

.carac-od-label {
  font-size: 0.8rem;
  color: var(--muted);
}

.carac-od {
  display: inline-flex;
  gap: 3px;
}

.carac-od--empty {
  opacity: 0.35;
}

.od-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1.5px solid var(--accent);
}

.od-dot--on {
  background: var(--accent);
}

.carac-value {
  font-size: 1.15rem;
  font-weight: 800;
  text-align: center;
  color: var(--accent-strong);
}

.carac-roll {
  color: var(--muted);
}
</style>
