<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Bot, Trash2, BookOpen, Download } from "lucide-vue-next";
import {
  fetchOAuthConnections,
  revokeOAuthConnection,
  type OAuthConnection,
} from "../../api/oauth";
import { relativeTime } from "../../utils/relativeTime";
import { showToast } from "../../composables/useToast";
import AppCard from "../ui/AppCard.vue";
import AppButton from "../ui/AppButton.vue";
import AppIconBtn from "../ui/AppIconBtn.vue";
import AppEmptyState from "../ui/AppEmptyState.vue";
import AppModal from "../ui/AppModal.vue";

/** Guide joueur : le repo est public, l'app ne sert pas docs/. */
const GUIDE_URL =
  "https://github.com/tmouchart/arran-dnd/blob/main/docs/isilwen-connecteur.md";

/** Zip du plugin (connecteur + skills), servi par l'API, pas par Vue Router. */
const PLUGIN_URL = "/plugin";

const connections = ref<OAuthConnection[]>([]);
const loading = ref(true);
const loadError = ref(false);

const toRevoke = ref<OAuthConnection | null>(null);
const revoking = ref(false);

async function load() {
  loading.value = true;
  loadError.value = false;
  try {
    connections.value = await fetchOAuthConnections();
  } catch {
    loadError.value = true;
  } finally {
    loading.value = false;
  }
}

function addedOn(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR");
}

async function confirmRevoke() {
  const target = toRevoke.value;
  if (!target) return;
  revoking.value = true;
  try {
    await revokeOAuthConnection(target.id);
    connections.value = connections.value.filter((c) => c.id !== target.id);
    toRevoke.value = null;
    showToast("Accès révoqué");
  } catch {
    showToast("La révocation a échoué. Réessaie.");
  } finally {
    revoking.value = false;
  }
}

onMounted(load);
</script>

<template>
  <AppCard title="Isilwen dans Claude / ChatGPT">
    <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>

    <AppEmptyState v-else-if="loadError" variant="error">
      <p>Impossible de charger les connexions.</p>
      <template #actions>
        <AppButton size="small" @click="load">Réessayer</AppButton>
      </template>
    </AppEmptyState>

    <AppEmptyState v-else-if="connections.length === 0" variant="empty">
      <p>Isilwen n'est encore branchée nulle part.</p>
      <p>
        Ajoute le connecteur arran-dnd.fly.dev/mcp dans Claude ou ChatGPT pour
        parler à Isilwen sans ouvrir l'app.
      </p>
      <template #actions>
        <AppButton as="a" :href="GUIDE_URL" target="_blank" rel="noopener">
          <BookOpen :size="16" />
          Voir le guide
        </AppButton>
        <AppButton
          as="a"
          :href="PLUGIN_URL"
          download
          data-testid="isilwen-plugin-download"
        >
          <Download :size="16" />
          Télécharger le plugin
        </AppButton>
      </template>
    </AppEmptyState>

    <template v-else>
      <ul class="char-list">
        <li v-for="c in connections" :key="c.id" class="char-row">
          <Bot :size="20" class="conn-icon" />
          <div class="conn-text">
            <span class="name">{{ c.clientName }}</span>
            <span class="meta">
              Ajouté le {{ addedOn(c.createdAt) }} · Dernière utilisation
              {{ relativeTime(c.lastUsedAt) || "jamais" }}
            </span>
          </div>
          <AppIconBtn
            variant="danger"
            title="Révoquer"
            :size="32"
            data-testid="oauth-revoke"
            @click="toRevoke = c"
          >
            <Trash2 :size="15" />
          </AppIconBtn>
        </li>
      </ul>

      <div class="links">
        <a class="guide-link" :href="GUIDE_URL" target="_blank" rel="noopener">
          Guide de connexion
        </a>
        <a
          class="guide-link"
          :href="PLUGIN_URL"
          download
          data-testid="isilwen-plugin-download"
        >
          Télécharger le plugin
        </a>
      </div>
    </template>

    <AppModal
      :model-value="toRevoke !== null"
      :title="`Révoquer l'accès de ${toRevoke?.clientName} ?`"
      @update:model-value="toRevoke = null"
    >
      <p class="revoke-text">
        {{ toRevoke?.clientName }} ne pourra plus lire ta fiche, ta campagne, ton
        journal ni tes notes. Tu pourras l'autoriser de nouveau plus tard.
      </p>
      <template #footer>
        <AppButton variant="ghost" :disabled="revoking" @click="toRevoke = null">
          Annuler
        </AppButton>
        <AppButton variant="danger" :disabled="revoking" @click="confirmRevoke">
          Révoquer
        </AppButton>
      </template>
    </AppModal>
  </AppCard>
</template>

<style scoped>
/* Meme moule que la liste des personnages d'OptionsView : ses styles sont
   scopes, on ne peut pas les atteindre depuis ici. */
.char-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.char-row {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  padding: var(--space-md);
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-2);
}

.conn-icon {
  color: var(--accent-strong);
  flex-shrink: 0;
}

.conn-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.name {
  font-weight: 600;
  font-size: 0.95rem;
}

.meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-md);
  margin-top: var(--space-md);
}

.guide-link {
  font-size: 0.8rem;
  color: var(--accent-strong);
}

.revoke-text {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.45;
}
</style>
