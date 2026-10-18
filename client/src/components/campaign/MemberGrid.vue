<script setup lang="ts">
import { User } from 'lucide-vue-next'
import type { CampaignMember } from '../../api/campaigns'

// Grille des personnages de la campagne : portrait rond, nom dessous,
// pastille verte quand le joueur est connecté.
defineProps<{
  members: CampaignMember[]
  /** Ids des joueurs connectés. */
  online: Set<number>
}>()

const emit = defineEmits<{ (e: 'select', member: CampaignMember): void }>()
</script>

<template>
  <div class="member-grid">
    <button
      v-for="m in members"
      :key="m.userId"
      type="button"
      class="member"
      :data-testid="`member-${m.userId}`"
      @click="emit('select', m)"
    >
      <span class="portrait">
        <img v-if="m.portraitUrl" :src="m.portraitUrl" alt="" />
        <img v-else-if="m.avatarUrl" :src="m.avatarUrl" alt="" />
        <User v-else :size="28" class="placeholder" />
      </span>
      <span
        v-if="online.has(m.userId)"
        class="online-dot"
        title="Connecté"
        :data-testid="`member-online-${m.userId}`"
      />
      <span class="name">{{ m.characterName ?? '—' }}</span>
      <span class="username">{{ m.username }}</span>
    </button>
  </div>
</template>

<style scoped>
.member-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(92px, 1fr));
  gap: var(--space-sm);
}

.member {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
  padding: var(--space-sm) var(--space-xs);
  background: none;
  border: none;
  border-radius: var(--radius-lg);
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.member:hover .portrait {
  border-color: var(--accent);
}

.portrait {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--border);
  background: var(--surface-2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: border-color 160ms ease;
}

.portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder {
  color: var(--muted);
}

/* Pastille sur le coin du portrait (exception autorisée : badge d'angle). */
.online-dot {
  position: absolute;
  top: calc(var(--space-sm) + 2px);
  left: calc(50% + 20px);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #2f9e44;
  border: 2px solid var(--surface);
}

.name {
  font-weight: 700;
  font-size: 0.85rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.username {
  font-size: 0.72rem;
  color: var(--muted);
}
</style>
