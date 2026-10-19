<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { Dices, Gem, Gift, Shield, Sword } from 'lucide-vue-next'
import { giveLoot, type CombatLoot, type CombatState } from '../../api/combats'
import { lootDetail, pickLoot, remainingLoot } from '../../utils/sindragosa/loot'
import { showToast } from '../../composables/useToast'
import AppBottomSheet from '../ui/AppBottomSheet.vue'
import AppButton from '../ui/AppButton.vue'
import AppBadge from '../ui/AppBadge.vue'
import AppEmptyState from '../ui/AppEmptyState.vue'

// Butin d'un combat de boss (plans/41), côté MJ : « Faire tomber » tire un objet
// au sort (ou le MJ en tape un), puis il le donne à un héros du combat.
const props = defineProps<{ campaignId: number; combat: CombatState }>()
const open = defineModel<boolean>({ required: true })

/** L'objet tombé, en attente d'un héros. */
const picked = ref<number | null>(null)
/** Pendant le tirage : l'objet que la roue éclaire. */
const spinning = ref<number | null>(null)
const giving = ref(false)
let timers: ReturnType<typeof setTimeout>[] = []

const loot = computed<CombatLoot[]>(() => props.combat.loot)
const left = computed(() => remainingLoot(loot.value))
const heroes = computed(() => props.combat.participants.filter((p) => p.kind === 'player' && p.userId !== null))
const highlighted = computed(() => spinning.value ?? picked.value)

const ICONS = { arme: Sword, armure: Shield } as const
const iconOf = (item: CombatLoot) => ICONS[item.type as keyof typeof ICONS] ?? Gem

function clearTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

watch(open, (isOpen) => {
  if (isOpen) return
  clearTimers()
  spinning.value = null
  picked.value = null
})
onBeforeUnmount(clearTimers)

/** La roue passe sur les objets restants en ralentissant, puis s'arrête sur le tiré. */
function roll() {
  const result = pickLoot(loot.value)
  if (result === null) return
  clearTimers()
  picked.value = null
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const pool = left.value
  const steps = reduced || pool.length === 1 ? 0 : 10 + pool.indexOf(result)
  let delay = 0
  for (let s = 0; s < steps; s++) {
    delay += 50 + s * 12
    timers.push(setTimeout(() => (spinning.value = pool[s % pool.length]), delay))
  }
  timers.push(setTimeout(() => {
    spinning.value = null
    picked.value = result
  }, delay + 120))
}

function choose(index: number) {
  if (loot.value[index].givenTo || spinning.value !== null) return
  picked.value = picked.value === index ? null : index
}

async function give(userId: number, heroName: string) {
  if (picked.value === null) return
  const item = loot.value[picked.value]
  giving.value = true
  try {
    await giveLoot(props.campaignId, props.combat.id, picked.value, userId)
    showToast(`${item.name} → ${heroName}`)
    picked.value = null
  } catch (e) {
    showToast(e instanceof Error ? e.message : 'Erreur')
  } finally {
    giving.value = false
  }
}
</script>

<template>
  <AppBottomSheet v-model="open" :title="`Butin — ${combat.name}`" description="Tirer et distribuer le butin du combat">
    <div class="loot">
      <ul class="loot-list">
        <li
          v-for="(item, i) in loot"
          :key="i"
          class="loot-item"
          :class="{ given: item.givenTo, lit: highlighted === i, spinning: spinning === i }"
          :data-testid="`loot-item-${i}`"
          @click="choose(i)"
        >
          <component :is="iconOf(item)" :size="18" class="loot-icon" />
          <div class="loot-info">
            <span class="loot-name">{{ item.name }}</span>
            <span class="loot-detail">{{ lootDetail(item) }}<template v-if="item.chance"> · {{ item.chance }} %</template></span>
            <span v-if="item.description" class="loot-desc">{{ item.description }}</span>
          </div>
          <AppBadge v-if="item.givenTo" variant="info">{{ item.givenTo }}</AppBadge>
        </li>
      </ul>

      <AppEmptyState v-if="left.length === 0">Tout le butin est distribué.</AppEmptyState>

      <template v-else>
        <div v-if="picked !== null && spinning === null" class="give">
          <span class="give-label"><Gift :size="14" /> <span data-testid="loot-picked">{{ loot[picked].name }}</span> pour…</span>
          <div class="heroes">
            <AppButton
              v-for="h in heroes"
              :key="h.id"
              size="small"
              :disabled="giving"
              :data-testid="`loot-give-${h.userId}`"
              @click="give(h.userId!, h.name)"
            >
              {{ h.name }}
            </AppButton>
          </div>
        </div>

        <AppButton
          variant="primary"
          block
          :disabled="spinning !== null || giving"
          data-testid="loot-roll"
          @click="roll"
        >
          <Dices :size="16" />
          Faire tomber
        </AppButton>
      </template>
    </div>
  </AppBottomSheet>
</template>

<style scoped>
.loot {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.loot-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.loot-item {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  padding: var(--space-sm) var(--space-md);
  background: var(--surface-2);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: border-color 0.12s, background 0.12s;
}

.loot-item.lit {
  border-color: var(--accent);
  background: var(--accent-soft);
}

/* L'objet tiré, une fois la roue arrêtée, se signale par un petit bond. */
.loot-item.lit:not(.spinning) {
  animation: loot-drop 0.35s ease-out;
}

.loot-item.given {
  opacity: 0.55;
  cursor: default;
}

.loot-icon {
  flex-shrink: 0;
  color: var(--accent-strong);
}

.loot-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.loot-name {
  font-weight: 700;
}

.loot-detail {
  font-size: 0.78rem;
  color: var(--muted);
}

.loot-desc {
  font-size: 0.8rem;
}

.give {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
}

.give-label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: 0.85rem;
  font-weight: 600;
}

.heroes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-xs);
}

@keyframes loot-drop {
  0% { transform: scale(1); }
  45% { transform: scale(1.04); }
  100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .loot-item.lit:not(.spinning) { animation: none; }
}
</style>
