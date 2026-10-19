<script setup lang="ts">
import { ref, computed, onMounted, type Component } from "vue";
import { useRouter } from "vue-router";
import {
  LogOut,
  Sun,
  Moon,
  UserCircle,
  Trash2,
  Upload,
  Palette,
  ScrollText,
  Crown,
  Axe,
  Skull,
  Sparkles,
} from "lucide-vue-next";
import { user, logout } from "../composables/useAuth";
import { updateMe } from "../api/auth";
import {
  fetchCharacters,
  activateCharacter,
  deleteCharacter,
  createCharacter,
  type ServerCharacter,
} from "../api/characters";
import { raceById } from "../data/sindragosa/races";
import AppPageLayout from "../components/ui/AppPageLayout.vue";
import AppPageHead from "../components/ui/AppPageHead.vue";
import AppCard from "../components/ui/AppCard.vue";
import AppBadge from "../components/ui/AppBadge.vue";
import AppEmptyState from "../components/ui/AppEmptyState.vue";
import AppIconBtn from "../components/ui/AppIconBtn.vue";
import AppButton from "../components/ui/AppButton.vue";
import DiceStyleCard from "../components/options/DiceStyleCard.vue";

const router = useRouter();

// ─── Theme ───────────────────────────────────────────────────────────────────
type Theme = "light" | "dark";
const STORAGE_KEY = "arran-theme";

function getCurrentTheme(): Theme {
  return (document.documentElement.dataset.theme as Theme) ?? "light";
}

const theme = ref<Theme>(getCurrentTheme());

function applyTheme(next: Theme) {
  theme.value = next;
  document.documentElement.dataset.theme = next;
  localStorage.setItem(STORAGE_KEY, next);
}

function toggleTheme() {
  applyTheme(theme.value === "dark" ? "light" : "dark");
}

const themeLabel = computed(() =>
  theme.value === "dark" ? "Passer en mode clair" : "Passer en mode sombre",
);

// ─── Style (artistic theme) ──────────────────────────────────────────────────
type AppStyle = "" | "alliance" | "horde" | "demons" | "arcane";
const STYLE_KEY = "arran-style";

const styleOptions: { value: AppStyle; label: string; desc: string; icon: Component }[] = [
  { value: "", label: "Classique", desc: "Le style par défaut", icon: ScrollText },
  { value: "alliance", label: "Alliance", desc: "Bleu roi et enluminures", icon: Crown },
  { value: "horde", label: "Horde", desc: "Sang, fer et totems", icon: Axe },
  { value: "demons", label: "Démons", desc: "Gangrène et crânes", icon: Skull },
  { value: "arcane", label: "Arcane", desc: "Éclairs et étincelles", icon: Sparkles },
];

// Un style retiré (ancien Grimoire, Vitrail…) encore en localStorage n'a plus
// de CSS : on le traite comme Classique.
const savedStyle = document.documentElement.dataset.style as AppStyle | undefined;
const currentStyle = ref<AppStyle>(
  styleOptions.some((o) => o.value === savedStyle) ? savedStyle! : "",
);

function applyStyle(next: AppStyle) {
  currentStyle.value = next;
  if (next) {
    document.documentElement.dataset.style = next;
  } else {
    delete document.documentElement.dataset.style;
  }
  localStorage.setItem(STYLE_KEY, next);
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
const avatarInput = ref<HTMLInputElement | null>(null);
const avatarSaving = ref(false);
const avatarError = ref<string | null>(null);

function triggerAvatarPick() {
  avatarInput.value?.click();
}

async function handleAvatarChange(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  if (!file.type.startsWith("image/")) {
    avatarError.value = "Fichier invalide — choisir une image.";
    return;
  }
  avatarError.value = null;
  avatarSaving.value = true;
  try {
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const dataUrl = ev.target?.result as string;
      const updated = await updateMe({ avatarUrl: dataUrl });
      if (user.value) user.value = { ...user.value, avatarUrl: updated.avatarUrl };
      avatarSaving.value = false;
    };
    reader.readAsDataURL(file);
  } catch {
    avatarError.value = "Erreur lors de la sauvegarde.";
    avatarSaving.value = false;
  }
}

async function removeAvatar() {
  avatarSaving.value = true;
  try {
    const updated = await updateMe({ avatarUrl: null });
    if (user.value) user.value = { ...user.value, avatarUrl: updated.avatarUrl };
  } finally {
    avatarSaving.value = false;
  }
}

// ─── Username ─────────────────────────────────────────────────────────────────
const usernameEdit = ref(user.value?.username ?? "");
const usernameSaving = ref(false);
const usernameError = ref<string | null>(null);

async function saveUsername() {
  const next = usernameEdit.value.trim();
  if (!next || next === user.value?.username) return;
  usernameSaving.value = true;
  usernameError.value = null;
  try {
    const updated = await updateMe({ username: next });
    if (user.value) user.value = { ...user.value, username: updated.username };
  } catch (err) {
    usernameError.value = err instanceof Error ? err.message : "Erreur";
    usernameEdit.value = user.value?.username ?? "";
  } finally {
    usernameSaving.value = false;
  }
}

// ─── Logout ───────────────────────────────────────────────────────────────────
async function handleLogout() {
  await logout();
  router.push("/login");
}

// ─── Characters ───────────────────────────────────────────────────────────────
const characters = ref<ServerCharacter[]>([]);
const loading = ref(false);
const listError = ref<string | null>(null);
const activating = ref<number | null>(null);
const deleting = ref<number | null>(null);
const creating = ref(false);

async function load() {
  loading.value = true;
  listError.value = null;
  try {
    characters.value = await fetchCharacters();
  } catch {
    listError.value = "Impossible de charger les personnages.";
  } finally {
    loading.value = false;
  }
}

async function handleActivate(c: ServerCharacter) {
  if (c.isActive) return;
  activating.value = c.id;
  try {
    await activateCharacter(c.id);
    characters.value = characters.value.map((ch) => ({
      ...ch,
      isActive: ch.id === c.id,
    }));
  } finally {
    activating.value = null;
  }
}

function openSheet(c: ServerCharacter) {
  router.push({ path: "/personnage", query: { id: c.id } });
}

async function handleDelete(c: ServerCharacter) {
  const isModified = c.name !== "Nouveau héros";
  if (isModified && !confirm(`Supprimer « ${c.name} » définitivement ?`)) return;
  deleting.value = c.id;
  try {
    await deleteCharacter(c.id);
    characters.value = characters.value.filter((ch) => ch.id !== c.id);
  } finally {
    deleting.value = null;
  }
}

async function handleCreate() {
  creating.value = true;
  try {
    const created = await createCharacter({});
    router.push({ path: "/personnage", query: { id: created.id } });
  } finally {
    creating.value = false;
  }
}

function listMetaLine(c: ServerCharacter): string {
  return raceById(c.race)?.label ?? "Race à choisir";
}

onMounted(load);
</script>

<template>
  <AppPageLayout>
    <template #top-bar>
      <AppPageHead>Options</AppPageHead>
    </template>

    <!-- ── Profil ─────────────────────────────────────────────────────────── -->
    <AppCard title="Profil">
      <div class="profile-section">
        <div class="avatar-wrapper">
          <div class="avatar" :class="{ saving: avatarSaving }" @click="triggerAvatarPick">
            <img v-if="user?.avatarUrl" :src="user.avatarUrl" alt="Avatar" class="avatar-img" />
            <UserCircle v-else :size="48" class="avatar-placeholder" />
            <div class="avatar-overlay">
              <Upload :size="16" />
            </div>
          </div>
          <AppIconBtn
            v-if="user?.avatarUrl"
            variant="danger"
            title="Supprimer l'avatar"
            :size="28"
            :disabled="avatarSaving"
            class="avatar-remove"
            @click="removeAvatar"
          >
            <Trash2 :size="14" />
          </AppIconBtn>
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            class="visually-hidden"
            @change="handleAvatarChange"
          />
        </div>
        <div class="profile-info">
          <div class="username-row">
            <input
              v-model="usernameEdit"
              class="username-input"
              type="text"
              maxlength="32"
              :disabled="usernameSaving"
              @blur="saveUsername"
              @keydown.enter.prevent="saveUsername"
            />
            <span v-if="usernameSaving" class="username-saving">…</span>
          </div>
          <span v-if="usernameError" class="avatar-error">{{ usernameError }}</span>
          <span class="profile-hint">Clique sur l'avatar pour le changer</span>
          <span v-if="avatarError" class="avatar-error">{{ avatarError }}</span>
        </div>
      </div>
    </AppCard>

    <!-- ── Apparence ──────────────────────────────────────────────────────── -->
    <AppCard title="Apparence">
      <div class="option-row">
        <span class="option-label">
          <component :is="theme === 'dark' ? Moon : Sun" :size="16" />
          Mode {{ theme === "dark" ? "sombre" : "clair" }}
        </span>
        <button
          type="button"
          class="theme-toggle"
          :aria-label="themeLabel"
          :title="themeLabel"
          @click="toggleTheme"
        >
          <span class="toggle-track" :class="{ dark: theme === 'dark' }">
            <span class="toggle-thumb" />
          </span>
        </button>
      </div>

      <div class="style-section">
        <span class="option-label style-section-label">
          <Palette :size="16" />
          Style artistique
        </span>
        <div class="style-grid">
          <button
            v-for="opt in styleOptions"
            :key="opt.value"
            type="button"
            class="style-card"
            :class="{ active: currentStyle === opt.value, [opt.value || 'default']: true }"
            :data-testid="`style-${opt.value || 'default'}`"
            @click="applyStyle(opt.value)"
          >
            <span class="style-card-name">
              <component :is="opt.icon" :size="16" aria-hidden="true" />
              {{ opt.label }}
            </span>
            <span class="style-card-desc">{{ opt.desc }}</span>
          </button>
        </div>
      </div>

      <DiceStyleCard />
    </AppCard>

    <!-- ── Personnages ────────────────────────────────────────────────────── -->
    <AppCard title="Personnages">
      <template #titleActions>
        <AppButton
          size="small"
          :disabled="creating"
          @click="handleCreate"
        >
          {{ creating ? "…" : "+ Créer" }}
        </AppButton>
      </template>

      <AppEmptyState v-if="loading" variant="loading">Chargement…</AppEmptyState>

      <AppEmptyState v-else-if="listError" variant="error">
        <p>{{ listError }}</p>
        <template #actions>
          <AppButton size="small" @click="load">Réessayer</AppButton>
        </template>
      </AppEmptyState>

      <ul v-else class="char-list">
        <li
          v-for="c in characters"
          :key="c.id"
          class="char-row"
          :class="{ active: c.isActive }"
        >
          <label
            class="active-check"
            :title="c.isActive ? 'Personnage actif' : 'Définir comme actif'"
          >
            <input
              type="checkbox"
              :checked="c.isActive"
              :disabled="activating !== null"
              @change="handleActivate(c)"
            />
            <span class="check-mark" :class="{ checked: c.isActive }">✓</span>
          </label>

          <button type="button" class="char-name" @click="openSheet(c)">
            <span class="name-row">
              <span class="name">{{ c.name }}</span>
              <AppBadge v-if="c.isActive" variant="active">Actif</AppBadge>
            </span>
            <span class="meta">{{ listMetaLine(c) }}</span>
          </button>

          <AppIconBtn
            variant="danger"
            title="Supprimer"
            :size="32"
            :disabled="deleting === c.id"
            @click="handleDelete(c)"
          >
            <Trash2 :size="15" />
          </AppIconBtn>
        </li>
      </ul>

      <AppEmptyState v-if="!loading && !listError && characters.length === 0">
        Aucun personnage. Crée-en un !
      </AppEmptyState>
    </AppCard>

    <!-- ── Historique des jets ────────────────────────────────────────────── -->
    <AppCard title="Historique des jets">
      <div class="option-row">
        <span class="option-label">🎲 Voir tous vos jets de dés</span>
        <AppButton size="small" @click="router.push('/jets')">
          Ouvrir
        </AppButton>
      </div>
    </AppCard>


    <!-- ── Compte ─────────────────────────────────────────────────────────── -->
    <AppCard title="Compte">
      <div class="option-row">
        <span class="option-label">
          <LogOut :size="16" />
          Se déconnecter
        </span>
        <AppButton variant="danger" size="small" @click="handleLogout">
          Déconnexion
        </AppButton>
      </div>
    </AppCard>
  </AppPageLayout>
</template>

<style scoped>
/* ── Profil ──────────────────────────────────────────────────────────────── */
.profile-section {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.avatar-wrapper {
  position: relative;
  flex-shrink: 0;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  background: var(--surface-2);
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: border-color 160ms ease;
}

.avatar:hover {
  border-color: var(--accent);
}

.avatar.saving {
  opacity: 0.6;
  pointer-events: none;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  color: var(--muted);
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0;
  transition: opacity 160ms ease;
  border-radius: 50%;
}

.avatar:hover .avatar-overlay {
  opacity: 1;
}

.avatar-remove {
  position: absolute;
  bottom: -6px;
  right: -6px;
}

.profile-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.username-row {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.username-input {
  font-family: var(--title-font);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--fg);
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  padding: 0 0 1px;
  outline: none;
  width: 100%;
  max-width: 14rem;
  transition: border-color 160ms ease;
}

.username-input:hover,
.username-input:focus {
  border-bottom-color: var(--accent);
}

.username-input:disabled {
  opacity: 0.5;
}

.username-saving {
  font-size: 0.85rem;
  color: var(--muted);
}

.profile-hint {
  font-size: 0.78rem;
  color: var(--muted);
}

.avatar-error {
  font-size: 0.78rem;
  color: var(--danger, #e05252);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  clip: rect(0, 0, 0, 0);
  overflow: hidden;
}

/* ── Option row ───────────────────────────────────────────────────────────── */
.option-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.1rem 0;
}

.option-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  font-weight: 500;
  color: var(--fg);
}

/* ── Theme toggle switch ──────────────────────────────────────────────────── */
.theme-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.toggle-track {
  display: flex;
  align-items: center;
  width: 44px;
  height: 24px;
  border-radius: var(--radius-pill);
  background: var(--border-strong);
  padding: 2px;
  transition: background 200ms ease;
  position: relative;
}

.toggle-track.dark {
  background: var(--accent);
}

.toggle-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.25);
  transition: transform 200ms ease;
}

.toggle-track.dark .toggle-thumb {
  transform: translateX(20px);
}

/* ── Style selector ──────────────────────────────────────────────────────── */
.style-section {
  margin-top: 1rem;
  padding-top: 0.85rem;
  border-top: 1px solid var(--border);
}

.style-section-label {
  margin-bottom: 0.6rem;
}

.style-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.style-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  padding: 0.7rem 0.5rem;
  border-radius: var(--radius-md);
  border: 2px solid var(--border);
  background: var(--surface-2);
  cursor: pointer;
  transition:
    border-color 160ms ease,
    background 160ms ease,
    box-shadow 200ms ease,
    transform 120ms ease;
  text-align: center;
}

.style-card:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

/* La carte active s'entoure d'un halo à la couleur de son thème (--swatch) */
.style-card.active {
  border-color: var(--swatch);
  box-shadow: 0 0 0 2px var(--surface), 0 0 0 4px var(--swatch), 0 0 14px var(--swatch);
}

.style-card-name {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-family: var(--title-font);
  font-size: 0.88rem;
  font-weight: 700;
  color: var(--text);
}

.style-card-desc {
  font-size: 0.72rem;
  color: var(--muted);
}

/* Chaque carte est un aperçu de son thème, quel que soit le thème actif :
   ces couleurs sont propres à chaque faction, aucun token ne les couvre. */
.style-card.default {
  --swatch: #68492e;
  grid-column: 1 / -1;
  border-top: 3px solid #68492e;
}

.style-card.alliance {
  --swatch: #c9a032;
  border-color: #c9a032;
  background: linear-gradient(160deg, #2a4fb3, #122660);
}
.style-card.alliance .style-card-name { font-family: 'Cinzel Decorative', serif; color: #f2d27a; }
.style-card.alliance .style-card-desc { color: #cfd8f5; }

.style-card.horde {
  --swatch: #e0402f;
  border-color: #b3221a;
  background:
    url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 6'><path d='M0 0h16L12 6 8 1 4 6z' fill='%23b3221a'/></svg>") repeat-x left top / 12px 5px,
    linear-gradient(160deg, #2a110d, #120706);
}
.style-card.horde .style-card-name { font-family: 'New Rocker', serif; color: #ff5a3c; }
.style-card.horde .style-card-desc { color: #d9b8ad; }

.style-card.demons {
  --swatch: #6fd13f;
  border-color: #6fd13f;
  background: linear-gradient(160deg, #3a1a56, #0f1a0c);
  box-shadow: inset 0 0 12px rgba(111, 209, 63, 0.25);
}
.style-card.demons .style-card-name { font-family: 'Pirata One', serif; font-weight: 400; font-size: 1rem; color: #9ef06a; }
.style-card.demons .style-card-desc { color: #cdb8e0; }

.style-card.arcane {
  --swatch: #a58bff;
  border-color: #b9a2ff;
  background: linear-gradient(135deg, #e9defc, #f9e3f3, #dff3fb);
}
.style-card.arcane .style-card-name { font-family: 'Marcellus SC', serif; color: #5a3dba; }
.style-card.arcane .style-card-desc { color: #675c86; }

/* ── Characters ───────────────────────────────────────────────────────────── */
.char-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.char-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.75rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border);
  background: var(--surface-2);
  transition: border-color 160ms ease;
}

.char-row.active {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent-soft) 40%, var(--surface));
}

.active-check {
  display: flex;
  align-items: center;
  cursor: pointer;
  flex-shrink: 0;
}

.active-check input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.check-mark {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--border-strong);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: transparent;
  transition: all 160ms ease;
}

.check-mark.checked {
  border-color: var(--accent);
  background: var(--accent-soft);
  color: var(--accent-strong);
}

.char-name {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.15rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: left;
  color: inherit;
}

.char-name:hover .name {
  color: var(--accent-strong);
}

.name {
  font-weight: 600;
  font-size: 0.95rem;
  transition: color 160ms ease;
}

.meta {
  font-size: 0.78rem;
  color: var(--muted);
}

.name-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

/* ── Buttons ──────────────────────────────────────────────────────────────── */
.btn {
  border: none;
  cursor: pointer;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: background 160ms ease, opacity 160ms ease;
}

.btn.small {
  font-size: 0.82rem;
  padding: 0.35rem 0.75rem;
}

.btn.ghost {
  background: var(--surface-2);
  border: 1px solid var(--border);
  color: var(--fg);
}

.btn.ghost:hover:not(:disabled) {
  border-color: var(--accent);
  color: var(--accent-strong);
}

.btn.danger {
  background: color-mix(in srgb, #e05252 15%, var(--surface));
  border: 1px solid color-mix(in srgb, #e05252 35%, transparent);
  color: #e05252;
}

.btn.danger:hover:not(:disabled) {
  background: color-mix(in srgb, #e05252 25%, var(--surface));
}

.btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
