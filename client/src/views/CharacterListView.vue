<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { Plus, User } from "lucide-vue-next";
import {
  fetchCharacters,
  activateCharacter,
  createCharacter,
  type ServerCharacter,
} from "../api/characters";
import { raceById } from "../data/sindragosa/races";
import AppPageLayout from "../components/ui/AppPageLayout.vue";
import AppPageHead from "../components/ui/AppPageHead.vue";
import AppIconBtn from "../components/ui/AppIconBtn.vue";
import AppEmptyState from "../components/ui/AppEmptyState.vue";
import AppButton from "../components/ui/AppButton.vue";

// Choix du personnage : affiché quand le joueur en a plusieurs. Le perso
// choisi devient actif et le serveur le met dans la campagne active.
const router = useRouter();
const characters = ref<ServerCharacter[]>([]);
const loading = ref(false);
const listError = ref<string | null>(null);
const busy = ref(false);

async function load() {
  loading.value = true;
  listError.value = null;
  try {
    characters.value = await fetchCharacters();
  } catch {
    listError.value = "Impossible de charger tes personnages.";
  } finally {
    loading.value = false;
  }
}

async function choose(c: ServerCharacter) {
  if (busy.value) return;
  busy.value = true;
  try {
    if (!c.isActive) await activateCharacter(c.id);
    router.push({ path: "/personnage", query: { id: c.id } });
  } finally {
    busy.value = false;
  }
}

async function handleCreate() {
  if (busy.value) return;
  busy.value = true;
  try {
    const created = await createCharacter({});
    await activateCharacter(created.id);
    router.push({ path: "/personnage", query: { id: created.id } });
  } finally {
    busy.value = false;
  }
}

onMounted(load);
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>
        Choix du personnage
        <template #actions>
          <AppIconBtn variant="primary" title="Nouveau personnage" :disabled="busy" @click="handleCreate">
            <Plus :size="18" />
          </AppIconBtn>
        </template>
      </AppPageHead>
    </template>

    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>

    <AppEmptyState v-else-if="listError" variant="error">
      <p>{{ listError }}</p>
      <template #actions>
        <AppButton size="small" @click="load">Réessayer</AppButton>
      </template>
    </AppEmptyState>

    <AppEmptyState v-else-if="characters.length === 0">Aucun personnage.</AppEmptyState>

    <div v-else class="char-grid">
      <button
        v-for="c in characters"
        :key="c.id"
        type="button"
        class="char-pick"
        :class="{ active: c.isActive }"
        :disabled="busy"
        :data-testid="`pick-character-${c.id}`"
        @click="choose(c)"
      >
        <span class="portrait">
          <img v-if="c.portraitImageId" :src="`/api/images/${c.portraitImageId}`" alt="" />
          <User v-else :size="30" class="placeholder" />
        </span>
        <span class="name">{{ c.name }}</span>
        <span class="meta">{{ raceById(c.race)?.label ?? "Race à choisir" }}</span>
      </button>
    </div>
  </AppPageLayout>
</template>

<style scoped>
.char-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: var(--space-md);
}

.char-pick {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-xs);
  padding: var(--space-sm);
  background: none;
  border: none;
  border-radius: var(--radius-lg);
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.char-pick:hover .portrait,
.char-pick.active .portrait {
  border-color: var(--accent);
}

.portrait {
  width: 72px;
  height: 72px;
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

.name {
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta {
  font-size: 0.75rem;
  color: var(--muted);
}
</style>
