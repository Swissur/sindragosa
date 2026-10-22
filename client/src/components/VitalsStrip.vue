<script setup lang="ts">
import { onMounted } from 'vue'
import { Droplet, Gem, Clover, Shield } from 'lucide-vue-next'
import { useCharacter, loadCharacter, computedArmor, LUCK_PER_SESSION } from '../composables/useCharacter'
import { useActiveCombat } from '../composables/useActiveCombat'
import { hpGradientColor } from '../utils/hpGradientColor'

/** PV, mana et chance du joueur, toujours sous les yeux dans la barre du bas. */
const { character, computedHp } = useCharacter()
// L'armure ne compte qu'en combat : elle n'apparaît que quand on en a un pion.
const { activeCombat } = useActiveCombat()

// On peut arriver sur une page qui ne charge pas la fiche (journal, options…).
onMounted(() => {
  if (!character.value.id) loadCharacter()
})
</script>

<template>
  <div v-if="character.id" class="vitals-strip">
    <span class="vital" title="Points de vie" data-testid="bar-hp">
      <Droplet :size="15" class="vital-icon vital-icon--hp" />
      <span :style="{ color: hpGradientColor(character.hpCurrent, computedHp) }">{{ character.hpCurrent }}</span>
      <span class="vital-max">/{{ computedHp }}</span>
    </span>
    <span v-if="character.manaMax > 0" class="vital" title="Mana" data-testid="bar-mana">
      <Gem :size="15" class="vital-icon vital-icon--mana" />
      {{ character.manaCurrent }}<span class="vital-max">/{{ character.manaMax }}</span>
    </span>
    <span v-if="!character.knight" class="vital" title="Points de chance" data-testid="bar-luck">
      <Clover :size="15" class="vital-icon vital-icon--luck" />
      {{ character.pcCurrent }}<span class="vital-max">/{{ LUCK_PER_SESSION }}</span>
    </span>
    <span v-if="activeCombat?.participating" class="vital" title="Armure" data-testid="bar-armor">
      <Shield :size="15" class="vital-icon vital-icon--armor" />
      {{ computedArmor }}
    </span>
  </div>
</template>

<style scoped>
.vitals-strip {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  gap: var(--space-md);
}

.vital {
  display: inline-flex;
  align-items: center;
  gap: 0.15rem;
  font-family: var(--title-font);
  font-size: 0.88rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
  color: var(--text);
}

.vital-max {
  font-size: 0.75rem;
  color: var(--muted);
}

.vital-icon {
  flex-shrink: 0;
}

.vital-icon--hp {
  color: var(--danger);
  fill: color-mix(in srgb, var(--danger) 70%, transparent);
}

.vital-icon--mana {
  color: #3b7dd8;
  fill: color-mix(in srgb, #3b7dd8 30%, transparent);
}

.vital-icon--armor {
  color: var(--muted);
  fill: color-mix(in srgb, var(--muted) 25%, transparent);
}

.vital-icon--luck {
  color: var(--success);
  fill: color-mix(in srgb, var(--success) 30%, transparent);
}
</style>
