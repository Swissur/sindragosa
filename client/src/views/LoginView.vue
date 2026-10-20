<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { login } from "../composables/useAuth";
import { register as apiRegister } from "../api/auth";
import { user } from "../composables/useAuth";
import AppInput from "../components/ui/AppInput.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppTabs from "../components/ui/AppTabs.vue";
import { safeNext } from "../utils/safeNext";

const router = useRouter();
const route = useRoute();

const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
const error = ref("");
const loading = ref(false);
const mode = ref<"login" | "register">("login");

const MODE_TABS = [
  { value: "login", label: "Se connecter" },
  { value: "register", label: "Créer un compte" },
];

function firstQueryString(q: unknown): string | undefined {
  if (q == null) return undefined;
  if (Array.isArray(q)) {
    const x = q[0];
    return typeof x === "string" && x ? x : undefined;
  }
  return typeof q === "string" && q ? q : undefined;
}

function applyQueryCredentials() {
  const u = firstQueryString(route.query.username);
  const p = firstQueryString(route.query.password);
  if (u) username.value = u;
  if (p) password.value = p;
  if (u || p) {
    const { username: _u, password: _p, ...rest } = route.query;
    router.replace({ path: route.path, query: rest });
  }
}

watch(() => route.query, applyQueryCredentials, { deep: true, immediate: true })

watch(
  () => route.query.error,
  (val) => {
    if (val === 'google_failed') error.value = 'La connexion Google a échoué. Réessaie.'
    else if (val === 'google_cancelled') error.value = 'Connexion Google annulée.'
    if (val) {
      const { error: _e, ...rest } = route.query
      router.replace({ path: route.path, query: rest })
    }
  },
  { immediate: true },
)

// Destination apres connexion : `?next=` s'il est present et interne a l'app.
const nextTarget = computed(() => safeNext(route.query.next));

function switchMode(m: "login" | "register") {
  mode.value = m;
  error.value = "";
  password.value = "";
  passwordConfirm.value = "";
}

async function submit() {
  error.value = "";

  if (mode.value === "register") {
    if (password.value !== passwordConfirm.value) {
      error.value = "Les mots de passe ne correspondent pas";
      return;
    }
    loading.value = true;
    try {
      const u = await apiRegister(username.value.trim(), password.value);
      user.value = u;
      router.push("/");
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Erreur lors de la création du compte";
    } finally {
      loading.value = false;
    }
    return;
  }

  loading.value = true;
  try {
    await login(username.value.trim(), password.value);
    router.push(nextTarget.value ?? "/");
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Erreur de connexion";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="login-wrap">
    <div class="login-card">
      <h1 class="login-title">Sindragosa</h1>

      <AppTabs
        class="mode-tabs"
        :model-value="mode"
        :tabs="MODE_TABS"
        @update:model-value="switchMode($event as 'login' | 'register')"
      />

      <form class="login-form" @submit.prevent="submit">
        <label class="field-label" for="username">Identifiant</label>
        <AppInput
          id="username"
          v-model="username"
          autocomplete="username"
          :required="true"
        />

        <label class="field-label" for="password">Mot de passe</label>
        <AppInput
          id="password"
          v-model="password"
          type="password"
          :autocomplete="mode === 'register' ? 'new-password' : 'current-password'"
          :required="true"
        />

        <template v-if="mode === 'register'">
          <label class="field-label" for="password-confirm">Confirmer le mot de passe</label>
          <AppInput
            id="password-confirm"
            v-model="passwordConfirm"
            type="password"
            autocomplete="new-password"
            :required="true"
          />
        </template>

        <p v-if="error" class="login-error">{{ error }}</p>

        <AppButton type="submit" variant="primary" block :disabled="loading" class="login-btn">
          <template v-if="loading">{{ mode === 'register' ? 'Création…' : 'Connexion…' }}</template>
          <template v-else>{{ mode === 'register' ? 'Créer mon compte' : 'Se connecter' }}</template>
        </AppButton>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* .login-wrap / .login-card / .login-title vivent dans style.css. */

.mode-tabs {
  margin-bottom: 1.5rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--muted);
  margin-top: 0.6rem;
}


.login-error {
  color: var(--danger);
  font-size: 0.85rem;
  margin: 0.25rem 0 0;
}

:global(:root[data-theme='dark']) .login-btn.btn.primary {
  background: linear-gradient(180deg, #7d6240, #5c4830);
  color: #f2e8dc;
  border-color: color-mix(in srgb, #4a3825 75%, black);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.38);
}

.login-btn {
  margin-top: 1rem;
  width: 100%;
  padding: 0.65rem;
  font-size: 0.95rem;
}
</style>
