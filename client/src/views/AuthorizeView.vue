<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Sparkles,
  ScrollText,
  Users,
  BookOpen,
  NotebookPen,
  ShieldCheck,
  WifiOff,
} from "lucide-vue-next";
import { fetchOAuthRequest, decideOAuth } from "../api/oauth";
import { user, logout } from "../composables/useAuth";
import AppButton from "../components/ui/AppButton.vue";
import AppEmptyState from "../components/ui/AppEmptyState.vue";

const route = useRoute();
const router = useRouter();

const SCOPE_LINES = [
  { icon: ScrollText, label: "Lire ta fiche de personnage" },
  { icon: Users, label: "Voir ta campagne et les autres personnages" },
  { icon: BookOpen, label: "Lire ton journal de bord" },
  { icon: NotebookPen, label: "Lire tes notes personnelles" },
];

const requestId = typeof route.query.request === "string" ? route.query.request : "";

const loading = ref(true);
/** Lien mort : pas d'identifiant, demande inconnue, expiree ou deja tranchee. */
const dead = ref(false);
const clientName = ref("");
const deciding = ref<"approve" | "deny" | null>(null);
const networkError = ref(false);

onMounted(async () => {
  if (!requestId) {
    dead.value = true;
    loading.value = false;
    return;
  }
  try {
    const req = await fetchOAuthRequest(requestId);
    clientName.value = req.clientName;
  } catch {
    dead.value = true;
  } finally {
    loading.value = false;
  }
});

async function decide(approved: boolean) {
  deciding.value = approved ? "approve" : "deny";
  networkError.value = false;
  try {
    const redirectTo = await decideOAuth(requestId, approved);
    // On quitte l'app : retour vers Claude / ChatGPT.
    window.location.href = redirectTo;
  } catch {
    networkError.value = true;
    deciding.value = null;
  }
}

async function switchAccount() {
  await logout();
  router.push({ path: "/login", query: { next: route.fullPath } });
}
</script>

<template>
  <div class="login-wrap">
    <div class="login-card">
      <h1 class="login-title">Terres d'Arran</h1>

      <AppEmptyState v-if="loading" variant="loading">
        Isilwen consulte le miroir…
      </AppEmptyState>

      <AppEmptyState v-else-if="dead" variant="error">
        <p class="dead-title">Ce lien de connexion n'est plus valide</p>
        <p>
          Redemande la connexion depuis ton assistant : ce lien à usage unique est
          déjà utilisé ou a expiré.
        </p>
        <template #actions>
          <AppButton variant="ghost" @click="router.push('/options')">
            Retour à mes options
          </AppButton>
        </template>
      </AppEmptyState>

      <template v-else>
        <Sparkles :size="32" class="consent-sparkles" />

        <h2 class="consent-title">{{ clientName }} veut parler à Isilwen en ton nom</h2>
        <p class="consent-sub">Isilwen pourra, en ton nom :</p>

        <ul class="scope-list">
          <li v-for="line in SCOPE_LINES" :key="line.label" class="scope-item">
            <component :is="line.icon" :size="16" class="scope-icon" />
            <span>{{ line.label }}</span>
          </li>
        </ul>

        <p class="consent-safe">
          <ShieldCheck :size="14" />
          <span>Rien ne sera modifié sans ton accord.</span>
        </p>

        <p class="consent-account">
          Connecté en tant que {{ user?.username }} ·
          <button type="button" class="link-btn" @click="switchAccount">
            Changer de compte
          </button>
        </p>

        <div class="consent-actions">
          <AppButton
            variant="ghost"
            data-testid="oauth-deny"
            :disabled="deciding !== null"
            @click="decide(false)"
          >
            Refuser
          </AppButton>
          <AppButton
            variant="primary"
            data-testid="oauth-approve"
            :disabled="deciding !== null"
            @click="decide(true)"
          >
            {{ deciding === "approve" ? "Autorisation…" : "Autoriser" }}
          </AppButton>
        </div>

        <p v-if="networkError" class="consent-network-error">
          <WifiOff :size="14" />
          <span>La connexion a échoué. Réessaie.</span>
        </p>
      </template>
    </div>
  </div>
</template>

<style scoped>
.dead-title {
  font-weight: 700;
}

.consent-sparkles {
  color: var(--accent);
  display: block;
  margin-bottom: var(--space-md);
}

.consent-title {
  font-family: var(--title-font);
  font-size: 1.1rem;
  font-weight: 700;
  line-height: 1.3;
  margin: 0 0 var(--space-sm);
  color: var(--text);
}

.consent-sub {
  font-size: 0.88rem;
  color: var(--muted);
  margin: 0 0 var(--space-md);
}

.scope-list {
  list-style: none;
  margin: 0 0 var(--space-lg);
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.scope-item {
  display: flex;
  align-items: center;
  gap: var(--space-md);
  font-size: 0.9rem;
}

.scope-icon {
  color: var(--accent-strong);
  flex-shrink: 0;
}

.consent-safe {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  font-size: 0.78rem;
  color: var(--muted);
  margin: 0 0 var(--space-lg);
}

.consent-account {
  font-size: 0.78rem;
  color: var(--muted);
  margin: 0 0 var(--space-md);
}

.link-btn {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--accent-strong);
  text-decoration: underline;
  font-size: inherit;
}

.consent-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.consent-actions > * {
  flex: 1;
}

@media (min-width: 400px) {
  .consent-actions {
    flex-direction: row;
  }
}

.consent-network-error {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
  color: var(--danger);
  font-size: 0.82rem;
  margin: var(--space-md) 0 0;
}
</style>
