<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import { computed, defineAsyncComponent, onBeforeUnmount, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { UserCircle, Loader2, ScrollText, Backpack, BookOpenText, Palette, Dices, History, Wrench, Tv, Crown } from "lucide-vue-next";
import AppToast from "./components/ui/AppToast.vue";
import RollSheet from "./components/roll/RollSheet.vue";
import DiceBar from "./components/DiceBar.vue";
import VitalsStrip from "./components/VitalsStrip.vue";
import RollLogDrawer from "./components/roll-log/RollLogDrawer.vue";
import Dice3DOverlay from "./components/dice3d/Dice3DOverlay.vue";
import CampfireOverlay from "./components/campfire/CampfireOverlay.vue";
import RestSummaryModal from "./components/campfire/RestSummaryModal.vue";
import GmMessageModal from "./components/campaign/GmMessageModal.vue";
import CriticalMomentOverlay from "./components/CriticalMomentOverlay.vue";
import { user, authReady } from "./composables/useAuth";
import { useActiveCombat, refreshActiveCombat } from "./composables/useActiveCombat";
import { wakeCombat } from "./composables/useCombat";
import { useDiceBar } from "./composables/useDiceBar";
import { useCampaignRolls } from "./composables/useCampaignRolls";
import { useGmCampaign } from "./composables/useGmCampaign";
import { gmUnreadCount, refreshGmUnread } from "./composables/useGmUnread";
import { incomingGmMessage } from "./composables/useCampaignLive";
import { primeAudio } from "./utils/sfx";

const isDev = import.meta.env.DEV;
const devToolsOpen = ref(false);
// Chargé à la demande : le code des outils de dev sort dans son propre chunk et
// n'est jamais téléchargé en prod.
const DevToolsSheet = defineAsyncComponent(() => import("./components/dev/DevToolsSheet.vue"));
const route = useRoute();
const { activeCombat } = useActiveCombat();
const { diceBarOpen, toggleDiceBar } = useDiceBar();
const { gmCampaignId, gmCampaignResolved } = useGmCampaign();
const {
  unread,
  panelOpen,
  togglePanel,
  connect: connectRolls,
  disconnect: disconnectRolls,
  wake: wakeRolls,
} = useCampaignRolls();

// La barre du bas (dés + log + profil) est en flux mais recouvre le tiroir de
// log : on publie sa hauteur réelle pour que le tiroir s'arrête juste au-dessus.
const bottomDockRef = ref<HTMLElement | null>(null);
const observer = new ResizeObserver(([entry]) => {
  document.documentElement.style.setProperty(
    "--bottom-bars",
    `${entry.target.getBoundingClientRect().height}px`,
  );
});
watch(bottomDockRef, (el, prev) => {
  if (prev) observer.unobserve(prev);
  if (el) observer.observe(el);
});
onBeforeUnmount(() => observer.disconnect());

// Resync le combat actif (raccourci « Fight ») et branche le log de
// jets sur la campagne active : au login et au retour au premier plan.
watch(user, (u) => {
  if (!u) { disconnectRolls(); return; }
  refreshActiveCombat();
  if (u.activeCampaignId) connectRolls(u.activeCampaignId);
  else disconnectRolls();
  void refreshGmUnread();
}, { immediate: true });
// Un message du MJ (ou d'un joueur, pour le MJ) arrive : pastille sur le Journal.
watch(incomingGmMessage, (m) => { if (m) void refreshGmUnread(); });
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && user.value) {
    refreshActiveCombat();
    wakeRolls();
    wakeCombat();
  }
});
// L'AudioContext démarre suspendu tant que l'utilisateur n'a rien tapé : on le
// réveille au tout premier geste, sinon le premier critique de la séance est muet.
document.addEventListener("pointerdown", () => primeAudio(), { once: true });

// Mode table : la page occupe tout l'écran, sans barres ni tiroir.
const isViewer = computed(() => !!route.meta.viewer);

// Apply saved theme + style on boot
type Theme = "light" | "dark";
const STORAGE_KEY = "arran-theme";
const STYLE_KEY = "arran-style";
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedTheme =
  (localStorage.getItem(STORAGE_KEY) as Theme | null) ??
  (prefersDark ? "dark" : "light");
document.documentElement.dataset.theme = savedTheme;

const savedStyle = localStorage.getItem(STYLE_KEY) ?? "";
if (savedStyle) {
  document.documentElement.dataset.style = savedStyle;
}
</script>

<template>
  <div v-if="!authReady" class="boot-screen">
    <Loader2 :size="36" class="boot-spinner" />
    <p class="boot-text">Chargement en cours</p>
  </div>
  <div v-else-if="isViewer" class="app-shell">
    <RouterView />
    <Dice3DOverlay />
    <CriticalMomentOverlay />
    <AppToast />
  </div>
  <div v-else class="app-shell" :class="{ 'shell-docked': panelOpen }">
    <header class="top-nav">
      <RouterLink :to="gmCampaignId ? `/campagnes/${gmCampaignId}` : '/personnage'" class="brand">Sindragosa</RouterLink>
        <nav class="nav-links">
        <!-- Le MJ n'a pas de fiche : son écran et le journal suffisent. -->
        <RouterLink
          v-if="gmCampaignId"
          :to="`/campagnes/${gmCampaignId}`"
          class="nav-link"
          title="Écran MJ"
          data-testid="nav-gm-screen"
          ><Crown :size="20"
        /></RouterLink>
        <template v-else>
          <RouterLink
            v-if="activeCombat?.participating"
            :to="activeCombat.url"
            class="nav-link nav-fight"
            title="Rejoindre le combat"
            data-testid="nav-fight"
            >Fight</RouterLink
          >
          <RouterLink to="/personnage" class="nav-link" title="Personnage"
            ><ScrollText :size="20"
          /></RouterLink>
          <RouterLink to="/inventaire" class="nav-link" title="Inventaire"
            ><Backpack :size="20"
          /></RouterLink>
        </template>
        <RouterLink to="/journal" class="nav-link nav-link--badged" title="Journal" data-testid="nav-journal"
          ><BookOpenText :size="20"
          /><span v-if="gmUnreadCount > 0" class="nav-badge" data-testid="nav-journal-unread"
        /></RouterLink>
        <RouterLink
          v-if="isDev"
          to="/component-library"
          class="nav-link nav-link--dev"
          title="Bibliothèque de composants (dev)"
          ><Palette :size="20"
        /></RouterLink>
      </nav>
    </header>
    <main class="main">
      <RouterView />
    </main>
    <div ref="bottomDockRef" class="bottom-dock">
      <DiceBar />
      <nav class="bottom-nav">
        <div class="bottom-nav-tools">
          <button
            type="button"
            class="nav-link"
            :class="{ 'nav-link--on': diceBarOpen }"
            :title="diceBarOpen ? 'Ranger les dés' : 'Lancer des dés'"
            @click="toggleDiceBar()"
          >
            <Dices :size="20" />
          </button>
          <button
            type="button"
            class="nav-link"
            :class="{ 'nav-link--on': panelOpen }"
            title="Historique des jets"
            @click="togglePanel()"
          >
            <History :size="20" />
            <span v-if="unread > 0 && !panelOpen" class="nav-badge" />
          </button>
          <RouterLink to="/table" class="nav-link" title="Mode table" data-testid="nav-viewer">
            <Tv :size="20" />
          </RouterLink>
          <button
            v-if="isDev"
            type="button"
            class="nav-link nav-link--dev"
            title="Outils de dev"
            @click="devToolsOpen = true"
          >
            <Wrench :size="20" />
          </button>
        </div>
        <!-- Le MJ n'a pas de fiche : on attend de savoir qui on est avant de la charger. -->
        <VitalsStrip v-if="user && gmCampaignResolved && !gmCampaignId" />
        <RouterLink v-if="user" to="/options" class="nav-user" title="Options">
          <div class="nav-avatar">
            <img
              v-if="user.avatarUrl"
              :src="user.avatarUrl"
              alt="Avatar"
              class="nav-avatar-img"
            />
            <UserCircle v-else :size="22" />
          </div>
          <span class="nav-username">{{ user.username }}</span>
        </RouterLink>
      </nav>
    </div>
    <RollLogDrawer />
    <Dice3DOverlay />
    <CriticalMomentOverlay />
    <CampfireOverlay />
    <DevToolsSheet v-if="isDev" v-model="devToolsOpen" />
    <RestSummaryModal />
    <GmMessageModal v-if="user" />
    <RollSheet v-if="user" />
    <AppToast />
  </div>
</template>

<style scoped>
.boot-screen {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  background: var(--surface);
  color: var(--muted);
}

.boot-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.boot-text {
  font-family: var(--title-font);
  font-size: 1.05rem;
  letter-spacing: 0.02em;
}

.app-shell {
  --nav-height: 3.6rem;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* Réservé par les vues qui posent une barre fixe en bas (footer de combat).
     Sans ça la barre de dés, dernier élément du flux, passerait dessous. */
  padding-bottom: var(--bottom-dock, 0px);
}

@media (min-width: 740px) {
  .app-shell {
    --nav-height: 3.85rem;
  }
}

.top-nav {
  flex-shrink: 0;
  z-index: 10;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-bottom: 1px solid var(--border-strong);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--surface) 92%, white),
    var(--surface)
  );
  box-shadow: var(--shadow-soft);
}

.brand {
  font-family: var(--title-font);
  font-weight: 700;
  font-size: clamp(1.08rem, 2.7vw, 1.32rem);
  color: var(--brand-strong);
  text-decoration: none;
  letter-spacing: 0.03em;
  white-space: nowrap;
}

@media (max-width: 739px) {
  .brand {
    display: none;
  }
}

.nav-links {
  display: flex;
  gap: 0.35rem;
}

/* 7 icônes tiennent tout juste sur un téléphone. Filet de sécurité : on scrolle
   plutôt que de rétrécir les boutons (tous les contrôles restent à 40px). */
@media (max-width: 739px) {
  .nav-links {
    overflow-x: auto;
    scrollbar-width: none;
  }

  .nav-links::-webkit-scrollbar {
    display: none;
  }
}

/* Le tiroir de log est docké sur desktop : il ne recouvre pas le contenu */
@media (min-width: 900px) {
  .shell-docked {
    padding-right: 400px;
  }
}

/* ── Barre du bas ───────────────────────────────────────────────────────── */
/* Outils de séance (dés, log, profil), sous le pouce. Passe au-dessus du
   tiroir de log : on doit pouvoir lancer un dé en lisant l'historique. */
.bottom-dock {
  flex-shrink: 0;
  z-index: 21;
}

.bottom-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  padding-bottom: max(0.55rem, env(safe-area-inset-bottom));
  border-top: 1px solid var(--border-strong);
  background: linear-gradient(
    0deg,
    color-mix(in srgb, var(--surface) 92%, white),
    var(--surface)
  );
}

.bottom-nav-tools {
  display: flex;
  gap: 0.35rem;
}

/* ── User pill ──────────────────────────────────────────────────────────── */
.nav-user {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  padding: 0.22rem 0.6rem 0.22rem 0.28rem;
  border-radius: var(--radius-pill);
  border: 1px solid var(--border);
  background: var(--surface-2);
  transition:
    border-color 160ms ease,
    background 160ms ease;
  color: inherit;
  max-width: 160px;
}

.nav-user:hover,
.nav-user.router-link-active {
  border-color: var(--accent);
  background: var(--accent-soft);
}

.nav-avatar {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--muted);
}

.nav-avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-username {
  font-family: var(--title-font);
  font-size: 0.97rem;
  font-weight: 700;
  color: var(--fg);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 739px) {
  .nav-username {
    display: none;
  }

  .nav-user {
    padding: 0.22rem;
    border-radius: 50%;
    max-width: none;
  }
}

.nav-link {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-pill);
  color: var(--muted);
  text-decoration: none;
  font-size: 1.15rem;
  border: 1px solid var(--border);
  background: var(--surface-2);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition:
    border-color 160ms ease,
    color 160ms ease,
    background-color 160ms ease;
}

.nav-link:hover {
  color: var(--accent-strong);
  border-color: var(--accent);
  background: var(--accent-soft);
}

/* Lien qui porte une .nav-badge (Journal : message du MJ non lu) */
.nav-link--badged {
  position: relative;
}

/* Les deux outils de séance sont des <button>, pas des liens */
button.nav-link {
  position: relative;
  padding: 0;
  cursor: pointer;
  font: inherit;
  flex-shrink: 0;
}

/* Pastille « jets non lus » : elle doit se poser sur le coin de l'icône, aucun
   flux ne peut le faire — cas légitime de position: absolute. */
.nav-badge {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent-strong);
}

.nav-link--on,
.nav-link.router-link-active {
  color: var(--accent-strong);
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent-soft) 72%, var(--surface));
}

/* Raccourci vers le combat en cours : un rond rouge qui pulse, impossible à rater */
.nav-fight,
.nav-fight:hover,
.nav-fight.router-link-active {
  color: var(--bg);
  background: var(--danger);
  border-color: var(--danger);
  font-family: var(--title-font);
  font-size: 0.68rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  animation: fight-pulse 1.6s ease-out infinite;
}

@keyframes fight-pulse {
  0% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--danger) 55%, transparent); }
  100% { box-shadow: 0 0 0 8px transparent; }
}

/* Dev-only entry: tinted so it never gets mistaken for a real feature */
.nav-link--dev {
  color: var(--brand);
  border-color: color-mix(in srgb, var(--brand) 45%, transparent);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
}

@media (min-width: 740px) {
  .top-nav,
  .bottom-nav {
    padding-inline: 1.35rem;
  }
}
</style>
