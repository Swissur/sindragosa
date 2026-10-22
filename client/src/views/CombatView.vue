<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  Plus,
  Minus,
  Heart,
  HeartCrack,
  Skull,
  Zap,
  CheckCheck,
  LayoutList,
  Map,
  Eye,
  EyeOff,
  Dices,
  Shield,
  Trash2,
  FlaskConical,
  UserPlus,
  Gift,
} from "lucide-vue-next";
import { useCombat } from "../composables/useCombat";
import { user } from "../composables/useAuth";
import { setParticipantStates } from "../api/combats";
import { postCampaignRoll, fetchCampaign, type CampaignMember } from "../api/campaigns";
import { BESTIARY } from "../data/sindragosa/bestiary";
import type { Monster } from "../utils/sindragosa/bestiary";
import { catalogMonsterFields, filterCatalog } from "../utils/monsterSession";
import { rollPool, DIFFICULTY_LABELS, type Difficulty } from "../utils/sindragosa/pool";
import { membresAbsents } from "../utils/combatRoster";
import { hpGradientColor } from "../utils/hpGradientColor";
import { playDiceRoll } from "../composables/useDice3D";
import { celebrate } from "../composables/useCriticalMoment";
import AppPageLayout from "../components/ui/AppPageLayout.vue";
import AppPageHead from "../components/ui/AppPageHead.vue";
import AppIconBtn from "../components/ui/AppIconBtn.vue";
import AppButton from "../components/ui/AppButton.vue";
import AppInput from "../components/ui/AppInput.vue";
import AppEmptyState from "../components/ui/AppEmptyState.vue";
import AppModal from "../components/ui/AppModal.vue";
import AppBottomSheet from "../components/ui/AppBottomSheet.vue";
import AppTabs, { type AppTab } from "../components/ui/AppTabs.vue";
import EtatsRow from "../components/etats/EtatsRow.vue";
import EtatsSheet from "../components/etats/EtatsSheet.vue";
import { sortEtats, type Etat, type EtatEntry } from "../data/etats";
import BattleMapTab from "../components/battle/BattleMapTab.vue";
import ActionsPanel from "../components/actions/ActionsPanel.vue";
import LootSheet from "../components/loot/LootSheet.vue";
import type { CombatParticipant } from "../api/combats";
import { showToast } from "../composables/useToast";
import { useGmCampaign } from "../composables/useGmCampaign";

const route = useRoute();
const router = useRouter();

// Lus depuis la route à chaque fois : le composant est réutilisé quand on passe
// d'un combat à l'autre (lien « Fight » depuis un combat déjà ouvert).
const campaignId = computed(() => Number(route.params.id));
const combatId = computed(() => Number(route.params.cid));
const { gmCampaignId } = useGmCampaign();

const {
  combat,
  connecting,
  error,
  idle,
  isGm,
  connect,
  disconnect,
  markActivity,
  nextTurn,
  prevTurn,
  updateHp,
  setVisibility,
  addMonster,
  addPlayer,
  removeMonster,
  finish,
} = useCombat();

// Tab: timeline vs actions vs carte
type CombatTab = "timeline" | "actions" | "map";
const activeTab = ref<CombatTab>("timeline");

// L'onglet Actions n'existe que pour les joueurs. Le log des jets vit dans le
// tiroir global (App.vue), il n'a plus d'onglet ici.
// Tablette et ordinateur : l'ordre du combat et le champ de bataille sur le
// même écran, côte à côte, pas en onglets. Le téléphone garde les onglets.
const splitQuery = window.matchMedia("(min-width: 768px)");
const split = ref(splitQuery.matches);
const onSplitChange = (e: MediaQueryListEvent) => { split.value = e.matches; };
splitQuery.addEventListener("change", onSplitChange);
onBeforeUnmount(() => splitQuery.removeEventListener("change", onSplitChange));

const combatTabs = computed<AppTab[]>(() => [
  { value: "timeline", label: "Combat", icon: LayoutList },
  ...(isGm.value ? [] : [{ value: "actions", label: "Mes actions", icon: Zap }]),
  ...(split.value ? [] : [{ value: "map", label: "Champ de bataille", icon: Map }]),
]);

// La carte 3D coûte un contexte WebGL et un sol de 1152 px à peindre : on ne
// la construit pas tant que personne n'a ouvert l'onglet (ou que l'écran
// n'est pas assez large pour l'afficher d'office).
const mapEverOpened = ref(false);
watch([activeTab, split], ([tab, isSplit]) => {
  if (isSplit && tab === "map") activeTab.value = "timeline";
  if (tab === "map" || isSplit) mapEverOpened.value = true;
}, { immediate: true });

// Expanded card (click to toggle)
const expandedId = ref<number | null>(null);

// ── Les états préjudiciables ────────────────────────────────────────────────
// La cible est retenue par son id, pas par l'objet : chaque état SSE remplace
// les participants, un objet mémorisé serait figé sur la version d'avant.
const etatsTargetId = ref<number | null>(null);
const etatsTarget = computed(
  () => combat.value?.participants.find((p) => p.id === etatsTargetId.value) ?? null,
);
const showEtats = computed({
  get: () => etatsTarget.value !== null,
  set: (v: boolean) => { if (!v) etatsTargetId.value = null; },
});

/**
 * Ce que la ligne compacte montre, par participant : l'état s'il est seul, le
 * nombre sinon, rien du tout si la liste est vide.
 */
// `Map` est deja pris par l'icone Lucide de l'onglet : un objet fait l'affaire.
const etatsBrief = computed(() => {
  const out: Record<number, { etat: Etat | null; count: number }> = {};
  for (const p of combat.value?.participants ?? []) {
    const list = sortEtats(p.states);
    if (list.length === 0) continue;
    out[p.id] = { etat: list.length === 1 ? list[0] : null, count: list.length };
  }
  return out;
});

function applyEtats(participantId: number, states: EtatEntry[]): Promise<void> {
  return setParticipantStates(campaignId.value, combatId.value, participantId, states);
}

// Add monster bottom sheet
const showAddMonster = ref(false);
// Entrée en jeu du renfort ajouté : tout de suite, ou gardé en réserve.
const addHidden = ref(false);

// ── Faire entrer un PJ en cours de combat ───────────────────────────────────
// Les membres sont chargés une fois à l'ouverture de l'écran (MJ seulement) :
// le bouton n'apparaît que s'il reste un PJ hors du combat.
const showAddPlayer = ref(false);
const members = ref<CampaignMember[]>([]);
const absentPlayers = computed(() =>
  membresAbsents(members.value, combat.value?.participants ?? []),
);

watch(isGm, async (gm) => {
  if (!gm || members.value.length > 0) return;
  try {
    members.value = (await fetchCampaign(campaignId.value)).members;
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Erreur");
  }
}, { immediate: true });

async function handleAddPlayer(m: CampaignMember) {
  try {
    await addPlayer(m.userId);
    showAddPlayer.value = false;
    showToast(`${m.characterName ?? m.username} rejoint le combat !`);
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Erreur");
  }
}

/** Fait entrer un PNJ en scène, ou le renvoie en réserve. */
async function toggleVisibility(p: CombatParticipant, hidden: boolean) {
  await setVisibility(p.id, hidden);
  if (hidden) showToast(`${p.name} passe en réserve.`);
}
const monsterSearchQuery = ref("");
const filteredMonsters = computed(() =>
  filterCatalog(monsterSearchQuery.value, BESTIARY),
);

// Custom monster form
const STAT_KEYS = ['For', 'Agi', 'End', 'Int', 'Sag', 'Cha'] as const
interface CustomMonsterForm {
  name: string; init: number; pv: number; armor: number; defense: number; threat: number;
  stats: Record<typeof STAT_KEYS[number], number>;
}
const showCustomForm = ref(false);
const defaultCustomForm = (): CustomMonsterForm => ({
  name: "Nouveau monstre", init: 5, pv: 10, armor: 0, defense: 3, threat: 1,
  stats: { For: 2, Agi: 2, End: 2, Int: 2, Sag: 2, Cha: 2 },
})
const customForm = ref<CustomMonsterForm>(defaultCustomForm());

// Delete confirmation
const confirmDeleteId = ref<number | null>(null);

// Finish confirmation
const showFinishConfirm = ref(false);
/** Butin d'un combat de boss : s'ouvre à la fin du combat, rouvrable par le cadeau. */
const showLoot = ref(false);
const hasLoot = computed(() => isGm.value && (combat.value?.loot?.length ?? 0) > 0);


// Release the SSE connection when the tab goes to the background (forgotten tab),
// reconnect when the user comes back. Lets Fly auto-stop the machine when idle.
function handleVisibility(): void {
  if (document.hidden) {
    disconnect();
  } else {
    connect(campaignId.value, combatId.value);
  }
}

// Manual resume after the inactivity timeout paused the combat.
function resumeCombat(): void {
  connect(campaignId.value, combatId.value);
}

watch(combatId, () => connect(campaignId.value, combatId.value));

onMounted(() => {
  connect(campaignId.value, combatId.value);
  document.addEventListener("visibilitychange", handleVisibility);
  window.addEventListener("pointerdown", markActivity);
});
// `onBeforeUnmount` et pas `onUnmounted` : Vue diffère les hooks `unmounted`
// après le montage du composant suivant. Avec `onUnmounted`, ce `disconnect()`
// coupait le flux que le mode table venait juste d'ouvrir — la tablette
// affichait « en attente d'un combat » alors que le combat tournait.
onBeforeUnmount(() => {
  disconnect();
  document.removeEventListener("visibilitychange", handleVisibility);
  window.removeEventListener("pointerdown", markActivity);
});

// Scroll to active participant on turn change
const timelineRef = ref<HTMLElement | null>(null);
watch(
  () => combat.value?.currentTurnIndex,
  async () => {
    await nextTick();
    const active = timelineRef.value?.querySelector(".participant-card.active");
    active?.scrollIntoView({ behavior: "smooth", block: "center" });
  },
);

function hasPlayed(index: number): boolean {
  if (!combat.value) return false;
  return index < combat.value.currentTurnIndex;
}

function hpStatusIcon(status: string | undefined) {
  if (!status) return { icon: Heart, color: "#27ae60" };
  switch (status) {
    case "intact":
      return { icon: Heart, color: "#27ae60" };
    case "blesse":
      return { icon: Heart, color: "#e67e22" };
    case "mal_en_point":
      return { icon: HeartCrack, color: "#c0392b" };
    case "agonisant":
      return { icon: HeartCrack, color: "#7b241c" };
    case "mort":
      return { icon: Skull, color: "#999" };
    default:
      return { icon: Heart, color: "#27ae60" };
  }
}

function adjustHp(p: CombatParticipant, delta: number) {
  if (p.hpCurrent == null || p.hpMax == null) return;
  const newHp = Math.max(0, Math.min(p.hpCurrent + delta, p.hpMax));
  updateHp(p.id, newHp);
}

function canAdjustHp(p: CombatParticipant): boolean {
  if (p.kind === "monster") return isGm.value;
  return p.userId === user.value?.id;
}

// ── Jets des monstres : réserves de d6 (plans/33) ─────────────────────────
interface MonsterPoolRoll {
  dice: number[]
  successes: number
  reached: Difficulty
  critFail: boolean
  /** Dégâts fixes de l'attaque ; absent pour un jet de défense. */
  damage?: number
}

const monsterRolls = ref<Record<string, MonsterPoolRoll>>({});

/**
 * Lance une réserve pour un monstre : attaque (avec ses dégâts) ou défense.
 * Le jet part dans le journal, caché aux joueurs (asMonster).
 */
async function rollMonsterPool(participant: CombatParticipant, key: string, label: string, pool: number, damage?: number) {
  const r = rollPool(pool);
  await playDiceRoll(r.dice.map((value) => ({ sides: 6, value, kind: "domaine", critFrom: 6 })));
  monsterRolls.value[key] = { dice: r.dice, successes: r.successes, reached: r.reached, critFail: r.isCriticalFailure, damage };
  // Le MJ n'a pas de log local : sa fanfare part d'ici. Les joueurs, eux,
  // reçoivent l'event `critical` allégé (sans le chiffre) par le SSE.
  if (r.isCriticalFailure) celebrate("fumble", participant.name);
  else if (r.reached === "exploit") celebrate("critical", participant.name);
  postCampaignRoll(campaignId.value, {
    kind: damage === undefined ? "domaine" : "weapon",
    label,
    context: "combat",
    die: 0,
    sides: 6,
    bonus: 0,
    total: r.successes,
    rolls: r.dice,
    pool: { critFrom: 6, reached: r.reached, critFail: r.isCriticalFailure },
    asMonster: participant.name,
  }).catch(() => { /* silencieux */ });
}


async function handleAddFromCatalog(m: Monster) {
  await addMonster({ ...catalogMonsterFields(m), hidden: addHidden.value });
  monsterSearchQuery.value = "";
  showAddMonster.value = false;
}

function openCustomForm() {
  customForm.value = defaultCustomForm();
  showCustomForm.value = true;
}

function setAddMonsterOpen(open: boolean) {
  showAddMonster.value = open;
  if (!open) showCustomForm.value = false;
}

async function handleSubmitCustomMonster() {
  const f = customForm.value;
  await addMonster({
    name: f.name,
    init: f.init,
    pv: f.pv,
    armor: f.armor,
    defense: f.defense,
    threat: f.threat,
    statFor: f.stats.For,
    statAgi: f.stats.Agi,
    statEnd: f.stats.End,
    statInt: f.stats.Int,
    statSag: f.stats.Sag,
    statCha: f.stats.Cha,
    hidden: addHidden.value,
  });
  showCustomForm.value = false;
  showAddMonster.value = false;
}

async function handleConfirmDelete() {
  if (confirmDeleteId.value === null) return;
  await removeMonster(confirmDeleteId.value);
  confirmDeleteId.value = null;
}

function openFinishConfirm() {
  showFinishConfirm.value = true;
}

async function handleFinish() {
  try {
    await finish();
  } catch (e) {
    showToast(e instanceof Error ? e.message : "Le combat n'a pas pu être terminé");
    return;
  }
  showFinishConfirm.value = false;
  // Le MJ retourne à son écran ; s'il y a du butin, après l'avoir distribué.
  if (hasLoot.value) showLoot.value = true;
  else goBack();
}

watch(showLoot, (open) => {
  if (!open && combat.value?.status === "finished") goBack();
});

// L'écran de campagne est celui du MJ : un joueur retourne à sa fiche.
function goBack() {
  router.push(gmCampaignId.value === campaignId.value ? `/campagnes/${campaignId.value}` : "/personnage");
}
</script>

<template>
  <AppPageLayout mode="scroll" :width="split ? 'full' : 'default'" class="combat-page">
    <template #top-bar>
      <AppPageHead>
        <template #actions>
          <AppIconBtn
            v-if="hasLoot && combat?.status === 'finished'"
            variant="primary"
            title="Butin"
            data-testid="loot-open"
            @click="showLoot = true"
          >
            <Gift :size="18" />
          </AppIconBtn>
          <AppIconBtn title="Retour" @click="goBack">
            <ArrowLeft :size="18" />
          </AppIconBtn>
        </template>
        {{ combat?.name ?? "Combat" }}
      </AppPageHead>
    </template>

    <div class="combat-content">

      <AppEmptyState v-if="connecting" variant="loading"
        >Connexion…</AppEmptyState
      >
      <AppEmptyState v-else-if="error" variant="error">{{
        error
      }}</AppEmptyState>
      <AppEmptyState v-else-if="idle" variant="empty">
        Combat en pause après une longue inactivité.
        <template #actions>
          <AppButton variant="primary" @click="resumeCombat">Reprendre</AppButton>
        </template>
      </AppEmptyState>

      <template v-else-if="combat">
        <!-- Tabs: Timeline / Actions (joueur) -->
        <AppTabs
          v-if="combatTabs.length > 1"
          :model-value="activeTab"
          :tabs="combatTabs"
          @update:model-value="activeTab = $event as CombatTab"
        />

        <div class="combat-body" :class="{ 'combat-body--split': split }">
        <!-- Tab: Champ de bataille 3D -->
        <!-- Montée au premier affichage, puis gardée : un v-if reconstruisait
             toute la scène three.js (sol 1152px, décor, 3 canvas par pion) à
             chaque passage d'onglet, et fuyait ses textures au passage. -->
        <BattleMapTab
          v-if="mapEverOpened"
          v-show="split || activeTab === 'map'"
          class="combat-map"
          :combat="combat"
          :is-gm="isGm"
        />

        <!-- Tab: Actions (player only) -->
        <div v-if="activeTab === 'actions' && !isGm" class="actions-tab">
          <ActionsPanel />
        </div>

        <!-- Timeline -->
        <div v-show="activeTab === 'timeline'" class="combat-columns">
        <div
          ref="timelineRef"
          class="timeline"
        >
          <div
            v-for="(p, idx) in combat.participants"
            :key="p.id"
            class="participant-card"
            :data-testid="idx === combat.currentTurnIndex && combat.status === 'active' ? 'active-participant' : 'participant'"
            :data-participant-id="p.id"
            :data-participant-name="p.name"
            :class="{
              active:
                idx === combat.currentTurnIndex && combat.status === 'active',
              played: hasPlayed(idx) && combat.status === 'active',
              monster: p.kind === 'monster',
              dead:
                (p.kind === 'monster' &&
                  p.hpCurrent !== null &&
                  p.hpCurrent <= 0) ||
                p.hpStatus === 'mort',
              expanded: expandedId === p.id,
            }"
            @click="expandedId = expandedId === p.id ? null : p.id"
          >
            <!-- Summary row -->
            <div class="card-summary">
              <div class="card-left">
                <CheckCheck
                  v-if="hasPlayed(idx) && combat.status === 'active'"
                  :size="12"
                  class="played-icon"
                />
                <span class="card-kind-dot" :class="p.kind" />
                <span class="card-name">{{ p.name }}</span>
                <span
                  v-if="etatsBrief[p.id]"
                  class="card-etats"
                  :title="`${etatsBrief[p.id]!.count} état(s)`"
                >
                  <component
                    :is="etatsBrief[p.id]!.etat!.icon"
                    v-if="etatsBrief[p.id]!.etat?.icon"
                    :size="12"
                  />
                  <template v-else-if="etatsBrief[p.id]!.etat">{{
                    etatsBrief[p.id]!.etat!.emoji
                  }}</template>
                  <template v-else>{{ etatsBrief[p.id]!.count }}</template>
                </span>
              </div>
              <div class="card-right">
                <span v-if="isGm || p.kind === 'player'" class="card-init"><Zap :size="13" /> {{
                  p.initiative
                }}</span>
                <span v-if="p.armor && (isGm || p.kind === 'player')" class="card-def" title="Armure"><Shield :size="13" /> {{ p.armor }}</span>
                <button v-if="isGm && p.kind === 'monster'" class="trash-btn" title="Mettre en réserve" @click.stop="toggleVisibility(p, true)"><EyeOff :size="13" /></button>
                <button v-if="isGm && p.kind === 'monster'" class="trash-btn" title="Supprimer" @click.stop="confirmDeleteId = p.id"><Trash2 :size="13" /></button>
                <!-- Inline HP controls (GM monsters) -->
                <template v-if="canAdjustHp(p) && p.hpCurrent !== null && p.hpMax !== null">
                  <div class="card-hp-inline" @click.stop>
                    <button class="hp-btn-sm" @click="adjustHp(p, -1)"><Minus :size="12" /></button>
                    <span class="card-hp" :style="{ color: hpGradientColor(p.hpCurrent!, p.hpMax!) }">{{ p.hpCurrent }}/{{ p.hpMax }}</span>
                    <button class="hp-btn-sm" @click="adjustHp(p, 1)"><Plus :size="12" /></button>
                  </div>
                </template>
                <!-- HP display (read-only) -->
                <template v-else-if="p.hpCurrent !== null && p.hpMax !== null">
                  <span class="card-hp" :style="{ color: hpGradientColor(p.hpCurrent, p.hpMax) }">{{ p.hpCurrent }}/{{ p.hpMax }}</span>
                </template>
                <template v-else-if="p.hpStatus">
                  <component
                    :is="hpStatusIcon(p.hpStatus).icon"
                    :size="16"
                    :style="{ color: hpStatusIcon(p.hpStatus).color }"
                  />
                </template>
              </div>
            </div>

            <!-- Expanded: les états. Les pastilles ne togglent pas : la cible
                 tactile serait trop petite, tout passe par la sheet. -->
            <div
              v-if="expandedId === p.id && (isGm || p.states.length > 0)"
              class="card-etats-row"
              @click.stop
            >
              <EtatsRow :states="p.states" size="sm" />
              <AppIconBtn
                v-if="isGm"
                title="États"
                :data-testid="`open-etats-${p.id}`"
                @click="etatsTargetId = p.id"
              >
                <FlaskConical :size="16" />
              </AppIconBtn>
            </div>

            <!-- Expanded: HP buttons -->
            <div
              v-if="
                expandedId === p.id && canAdjustHp(p) && p.hpCurrent !== null
              "
              class="card-hp-controls"
              @click.stop
            >
              <button class="hp-btn" @click="adjustHp(p, -5)">-5</button>
              <button class="hp-btn" @click="adjustHp(p, -1)">-1</button>
              <span class="hp-display" :style="{ color: hpGradientColor(p.hpCurrent!, p.hpMax!) }">{{ p.hpCurrent }} / {{ p.hpMax }}</span>
              <button class="hp-btn" @click="adjustHp(p, 1)">+1</button>
              <button class="hp-btn" @click="adjustHp(p, 5)">+5</button>
            </div>

            <!-- Expanded: Monster details (GM only) -->
            <div
              v-if="
                expandedId === p.id && p.kind === 'monster' && isGm && p.attacks
              "
              class="card-monster-details"
              @click.stop
            >
              <div class="detail-row">
                <span class="detail-label">Armure</span> {{ p.armor }}
                <span class="detail-sep">·</span>
                <span class="detail-label">Menace</span> {{ p.threat }}
                <span class="detail-sep">·</span>
                <span class="detail-label">Défense</span> {{ p.defense }}d6
                <button
                  v-if="p.defense"
                  class="roll-atk-btn"
                  title="Lancer la défense"
                  :data-testid="`monster-defense-${p.id}`"
                  @click.stop="rollMonsterPool(p, `${p.id}-def`, `${p.name} · défense`, p.defense)"
                >
                  <Dices :size="14" />
                </button>
              </div>
              <div v-if="monsterRolls[`${p.id}-def`]" class="monster-roll-result">
                <span class="monster-roll-atk">
                  Déf : <strong>{{ monsterRolls[`${p.id}-def`].successes }}</strong> succès
                  <span class="monster-roll-detail">({{ monsterRolls[`${p.id}-def`].dice.join(' ') }})</span>
                </span>
              </div>
              <div
                v-if="p.attacks && p.attacks.length > 0"
                class="detail-section"
              >
                <span class="detail-heading">Attaques</span>
                <div
                  v-for="(atk, ai) in p.attacks"
                  :key="ai"
                  class="detail-atk"
                >
                  <div class="detail-atk-row">
                    <span>{{ atk.name }} {{ atk.pool }}d6 · {{ atk.damage }} dégâts{{ atk.note ? ` ${atk.note}` : "" }}{{ atk.range ? ` · ${atk.range}m` : "" }}</span>
                    <button
                      class="roll-atk-btn"
                      title="Lancer l'attaque"
                      :data-testid="`monster-attack-${p.id}-${ai}`"
                      @click.stop="rollMonsterPool(p, `${p.id}-${ai}`, atk.name, atk.pool, atk.damage)"
                    >
                      <Dices :size="14" />
                    </button>
                  </div>
                  <div
                    v-if="monsterRolls[`${p.id}-${ai}`]"
                    class="monster-roll-result"
                    :data-testid="`monster-roll-${p.id}-${ai}`"
                    :class="{
                      'monster-roll-result--fumble': monsterRolls[`${p.id}-${ai}`].critFail,
                      'monster-roll-result--critical': monsterRolls[`${p.id}-${ai}`].reached === 'exploit',
                    }"
                  >
                    <span class="monster-roll-atk">
                      Att : <strong>{{ monsterRolls[`${p.id}-${ai}`].successes }}</strong> succès
                      · {{ DIFFICULTY_LABELS[monsterRolls[`${p.id}-${ai}`].reached] }}
                      <span class="monster-roll-detail">({{ monsterRolls[`${p.id}-${ai}`].dice.join(' ') }})</span>
                    </span>
                    <span v-if="monsterRolls[`${p.id}-${ai}`].critFail" class="monster-roll-crit">Échec critique</span>
                    <span v-else class="monster-roll-dmg">
                      Dég : <strong>{{ monsterRolls[`${p.id}-${ai}`].damage }}</strong> + marge − armure
                    </span>
                  </div>
                </div>
              </div>
              <div
                v-if="p.abilities && (p.abilities as unknown[]).length > 0"
                class="detail-section"
              >
                <span class="detail-heading">Capacités</span>
                <div
                  v-for="(ab, i) in p.abilities"
                  :key="i"
                  class="detail-ability"
                >
                  <strong>{{ ab.name }}</strong> — {{ ab.description }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- La réserve du MJ : renforts et embusqués pas encore entrés en scène. -->
        <div v-if="isGm && combat.reserve.length > 0" class="reserve">
          <div class="reserve-head">
            <EyeOff :size="13" /> En réserve
          </div>
          <div
            v-for="p in combat.reserve"
            :key="p.id"
            class="participant-card reserve-card"
          >
            <div class="card-summary">
              <div class="card-left">
                <span class="card-kind-dot monster" />
                <span class="card-name">{{ p.name }}</span>
              </div>
              <div class="card-right">
                <span class="card-init"><Zap :size="13" /> {{ p.initiative }}</span>
                <button class="trash-btn" title="Faire entrer en jeu" @click.stop="toggleVisibility(p, false)"><Eye :size="13" /></button>
                <button class="trash-btn" title="Supprimer" @click.stop="confirmDeleteId = p.id"><Trash2 :size="13" /></button>
              </div>
            </div>
          </div>
        </div>

        </div>

        <!-- Les commandes du tour, au MJ seul : c'est lui qui mène le combat.
             Dans la page, sous la carte : la barre du bas de l'app reste la
             même partout. -->
        <div v-if="isGm && combat.status === 'active'" class="combat-footer">
          <div class="footer-left">
            <AppIconBtn title="Précédent" @click="prevTurn">
              <ChevronLeft :size="18" />
            </AppIconBtn>
          </div>
          <div class="footer-center">
            <AppIconBtn
              title="Ajouter un monstre"
              @click="showAddMonster = true"
            >
              <Plus :size="18" />
            </AppIconBtn>
            <AppIconBtn
              v-if="absentPlayers.length > 0"
              title="Ajouter un PJ"
              data-testid="add-player"
              @click="showAddPlayer = true"
            >
              <UserPlus :size="18" />
            </AppIconBtn>
            <AppButton
              size="small"
              variant="danger"
              @click="openFinishConfirm"
            >
              Terminer
            </AppButton>
          </div>
          <AppButton
            variant="primary"
            size="small"
            class="next-btn"
            @click="nextTurn"
          >
            Suivant
            <ChevronRight :size="14" />
          </AppButton>
        </div>
        </div>

      </template>
    </div>

    <EtatsSheet
      v-if="etatsTarget"
      v-model="showEtats"
      :name="etatsTarget.name"
      :states="etatsTarget.states"
      :apply="(states: EtatEntry[]) => applyEtats(etatsTarget!.id, states)"
      @update:states="(states) => { if (etatsTarget) etatsTarget.states = states; }"
    />

    <!-- Bottom sheet: Add monster -->
    <AppBottomSheet
      :model-value="showAddMonster"
      :title="showCustomForm ? 'Monstre custom' : 'Ajouter un renfort'"
      @update:model-value="setAddMonsterOpen"
    >
      <div class="add-monster-body">
          <!-- Entrée en jeu : tout de suite, ou gardé pour plus tard. -->
          <AppTabs
            :model-value="addHidden ? 'reserve' : 'now'"
            :tabs="[
              { value: 'now', label: 'Maintenant', icon: Eye },
              { value: 'reserve', label: 'En réserve', icon: EyeOff },
            ]"
            @update:model-value="addHidden = $event === 'reserve'"
          />

          <!-- Custom form -->
          <template v-if="showCustomForm">
            <div class="custom-form-grid">
              <div class="custom-field custom-field--full">
                <label>Nom</label>
                <AppInput v-model="customForm.name" placeholder="Nom du monstre" />
              </div>
              <div class="custom-field">
                <label>Menace (R)</label>
                <AppInput v-model="customForm.threat" type="number" :min="0" :max="5" text-align="center" />
              </div>
              <div class="custom-field">
                <label>PV</label>
                <AppInput v-model="customForm.pv" type="number" :min="1" text-align="center" />
              </div>
              <div class="custom-field">
                <label>Armure</label>
                <AppInput v-model="customForm.armor" type="number" :min="0" text-align="center" />
              </div>
              <div class="custom-field">
                <label>Défense (d6)</label>
                <AppInput v-model="customForm.defense" type="number" :min="0" text-align="center" />
              </div>
              <div class="custom-field">
                <label>Init</label>
                <AppInput v-model="customForm.init" type="number" text-align="center" />
              </div>
            </div>
            <div class="custom-stats-grid">
              <div v-for="s in STAT_KEYS" :key="s" class="custom-stat">
                <label>{{ s.toUpperCase() }}</label>
                <AppInput v-model="customForm.stats[s]" type="number" text-align="center" />
              </div>
            </div>
            <div class="custom-form-actions">
              <AppButton variant="ghost" @click="showCustomForm = false">Retour</AppButton>
              <AppButton variant="primary" @click="handleSubmitCustomMonster">Ajouter</AppButton>
            </div>
          </template>

          <!-- Bestiary search -->
          <template v-else>
            <AppInput v-model="monsterSearchQuery" placeholder="Rechercher un monstre…" :autofocus="true" />
            <div class="bestiary-results">
              <div
                v-for="m in filteredMonsters"
                :key="m.name"
                class="bestiary-item"
                @click="handleAddFromCatalog(m)"
              >
                <span class="bestiary-name">{{ m.name }}</span>
                <span class="bestiary-meta">R {{ m.threat }} · {{ m.hp }} PV · armure {{ m.armor }}</span>
              </div>
            </div>
            <AppButton variant="ghost" block @click="openCustomForm">
              <Plus :size="16" />
              Monstre custom
            </AppButton>
          </template>
      </div>
    </AppBottomSheet>

    <!-- Bottom sheet: Ajouter un PJ -->
    <AppBottomSheet v-model="showAddPlayer" title="Ajouter un PJ">
      <div class="add-player-body">
        <AppEmptyState v-if="absentPlayers.length === 0">
          Tout le monde est déjà dans le combat.
        </AppEmptyState>
        <template v-else>
          <div
            v-for="m in absentPlayers"
            :key="m.userId"
            class="roster-item"
            :data-testid="`add-player-${m.userId}`"
            @click="handleAddPlayer(m)"
          >
            <span class="roster-name">{{ m.characterName ?? m.username }}</span>
            <span class="roster-meta">{{ m.username }}</span>
          </div>
        </template>
      </div>
    </AppBottomSheet>

    <!-- Delete confirmation -->
    <AppModal
      :model-value="confirmDeleteId !== null"
      title="Supprimer ce monstre du combat ?"
      @update:model-value="confirmDeleteId = null"
    >
      <template #footer>
        <AppButton variant="ghost" @click="confirmDeleteId = null">Annuler</AppButton>
        <AppButton variant="danger" @click="handleConfirmDelete">Supprimer</AppButton>
      </template>
    </AppModal>

    <LootSheet v-if="combat && hasLoot" v-model="showLoot" :campaign-id="campaignId" :combat="combat" />

    <!-- Finish confirmation -->
    <AppModal v-model="showFinishConfirm" title="Terminer ce combat ?">
      <template #footer>
        <AppButton variant="ghost" @click="showFinishConfirm = false"
          >Annuler</AppButton
        >
        <AppButton variant="danger" @click="handleFinish"
          >Terminer</AppButton
        >
      </template>
    </AppModal>
  </AppPageLayout>
</template>

<style scoped>
/* Layout : la colonne log a disparu (tiroir global), une seule colonne */
/* Une carte qui apparaît en cours de combat, c'est un renfort qui débarque :
   côté joueur, ça ne doit pas juste « pop ». */
@keyframes reveal-in {
  from { opacity: 0; transform: translateY(-6px); }
  to { opacity: 1; transform: none; }
}

.participant-card {
  animation: reveal-in 0.28s ease-out;
}

.reserve {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: 0.8rem;
}

.reserve-head {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.78rem;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Pointillés + grisé : c'est là, mais ce n'est pas encore en jeu. */
.reserve-card {
  border-style: dashed;
  opacity: 0.72;
}

.combat-columns {
  display: flex;
  flex-direction: column;
}

.combat-body {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

/* Côte à côte : l'ordre du combat à gauche, la carte et ses commandes à
   droite. La 2e ligne en `1fr` absorbe la hauteur de la liste : les
   commandes restent collées sous la carte. */
.combat-body--split {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr);
  grid-template-rows: auto 1fr;
  align-items: start;
}

.combat-body--split .combat-columns,
.combat-body--split .actions-tab {
  grid-column: 1;
  grid-row: 1 / span 2;
}

.combat-body--split .combat-map {
  grid-column: 2;
  grid-row: 1;
}

.combat-body--split .combat-footer {
  grid-column: 2;
  grid-row: 2;
}

.combat-content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* Timeline */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.participant-card {
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition:
    border-color 150ms ease,
    opacity 150ms ease;
  flex-shrink: 0;
  cursor: pointer;
}

.participant-card.active {
  border-color: var(--accent);
  border-width: 2px;
  background: var(--accent-soft);
}

.participant-card.played {
  opacity: 0.5;
}

.participant-card.dead {
  opacity: 0.35;
  text-decoration: line-through;
}

.card-summary {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 0.8rem;
  min-height: 48px;
}

.card-left {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  min-width: 0;
}

.played-icon {
  color: var(--muted);
  flex-shrink: 0;
}

.card-kind-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.card-kind-dot.player {
  background: #27ae60;
}
.card-kind-dot.monster {
  background: #c0392b;
}

/* L'indicateur ambre de la ligne compacte. */
.card-etats {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  min-width: 18px;
  height: 18px;
  padding: 0 0.25rem;
  font-size: 0.68rem;
  font-weight: 700;
  line-height: 1;
  border-radius: var(--radius-pill);
  background: color-mix(in srgb, var(--etat) 18%, transparent);
  border: 1px solid color-mix(in srgb, var(--etat) 45%, transparent);
  border-style: solid;
  color: var(--etat);
}

.card-etats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
  padding: 0 0.8rem 0.6rem;
}

.card-name {
  font-weight: 700;
  font-size: 0.9rem;
  color: var(--text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-shrink: 0;
}

.card-init {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.75rem;
  color: #d4ac0d;
  font-weight: 600;
}
.card-def {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  font-size: 0.75rem;
  color: #3b82f6;
  font-weight: 600;
}

.card-hp {
  font-size: 0.82rem;
  font-weight: 700;
  color: #c0392b;
}

.card-hp-inline {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.hp-btn-sm {
  width: 26px;
  height: 26px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.hp-btn-sm:active {
  background: var(--accent-soft);
}

/* Expanded HP controls */
.card-hp-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.4rem 0.8rem 0.6rem;
  border-top: 1px solid var(--border);
}

.hp-btn {
  width: 36px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hp-btn:active {
  background: var(--accent-soft);
}

.hp-display {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text);
  min-width: 60px;
  text-align: center;
}

/* Monster details expanded */
.card-monster-details {
  padding: 0.4rem 0.8rem 0.6rem;
  border-top: 1px solid var(--border);
  font-size: 0.78rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.detail-row {
  color: var(--muted);
}
.detail-label {
  font-weight: 700;
  color: var(--text);
}
.detail-sep {
  margin: 0 0.2rem;
}

.detail-section {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  padding-top: 0.35rem;
  border-top: 1px solid var(--border);
}
.detail-heading {
  font-weight: 700;
  color: var(--text);
  font-size: 0.75rem;
  text-transform: uppercase;
}
.detail-atk {
  color: var(--muted);
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed color-mix(in srgb, var(--border) 50%, transparent);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.detail-atk:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.detail-atk-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
}
.roll-atk-btn {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--accent-strong);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.roll-atk-btn:active {
  background: var(--accent-soft);
}

.monster-roll-result {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.6rem;
  padding: 0.3rem 0.5rem;
  border-radius: var(--radius-md);
  background: color-mix(in srgb, var(--accent) 10%, var(--surface));
  border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
  font-size: 0.78rem;
}
.monster-roll-atk,
.monster-roll-dmg {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  color: var(--text);
}
.monster-roll-atk strong,
.monster-roll-dmg strong {
  font-size: 0.9rem;
  color: var(--accent-strong);
}
.monster-roll-detail {
  font-size: 0.7rem;
  color: var(--muted);
  font-family: var(--mono-font, monospace);
}
.monster-roll-crit {
  width: 100%;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.monster-roll-result--fumble {
  background: color-mix(in srgb, #c95f56 10%, var(--surface));
  border-color: #c95f56;
}
.monster-roll-result--fumble .monster-roll-atk,
.monster-roll-result--fumble .monster-roll-atk strong,
.monster-roll-result--fumble .monster-roll-crit {
  color: #c95f56;
}
.monster-roll-result--critical {
  background: color-mix(in srgb, #d4ac0d 10%, var(--surface));
  border-color: #d4ac0d;
}
.monster-roll-result--critical .monster-roll-atk,
.monster-roll-result--critical .monster-roll-atk strong,
.monster-roll-result--critical .monster-roll-crit {
  color: #c8950a;
}
.detail-ability {
  color: var(--muted);
  line-height: 1.3;
  padding-bottom: 0.35rem;
  border-bottom: 1px dashed color-mix(in srgb, var(--border) 50%, transparent);
}
.detail-ability:last-child {
  border-bottom: none;
  padding-bottom: 0;
}


/* Commandes du tour. Sur téléphone, collées au bas de la zone qui défile
   (juste au-dessus de la barre de l'app) ; à côté, sous la carte. */
.combat-footer {
  position: sticky;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm);
  background: var(--surface-2);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  gap: 0.5rem;
}

.combat-body--split .combat-footer {
  position: static;
}

.next-btn {
  white-space: nowrap;
  flex-shrink: 0;
}

.footer-left {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

.footer-center {
  display: flex;
  gap: 0.3rem;
  align-items: center;
}

/* Add monster sheet */
.add-monster-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.bestiary-results {
  max-height: 40vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.bestiary-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 120ms ease;
}

.bestiary-item:hover {
  background: var(--accent-soft);
}

.bestiary-name {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--text);
}
.bestiary-meta {
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
}

.add-player-body {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.roster-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-sm);
  padding: 0.5rem 0.6rem;
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: background 120ms ease;
}

.roster-item:hover {
  background: var(--accent-soft);
}

.roster-name {
  font-weight: 600;
  font-size: 0.88rem;
  color: var(--text);
}

.roster-meta {
  font-size: 0.75rem;
  color: var(--muted);
  white-space: nowrap;
}

/* Trash button on monster cards */
.trash-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: var(--muted);
  cursor: pointer;
  border-radius: var(--radius-xs);
  padding: 0;
  transition: color 120ms, background 120ms;
}
.trash-btn:hover {
  color: var(--danger, #c0392b);
  background: color-mix(in srgb, var(--danger, #c0392b) 12%, transparent);
}

/* Custom monster form */
.custom-form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
}
.custom-field { display: flex; flex-direction: column; gap: 0.2rem; }
.custom-field label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
}
.custom-field--full { grid-column: 1 / -1; }

.custom-stats-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.4rem;
}
.custom-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.15rem;
}
.custom-stat label {
  font-size: 0.68rem;
  font-weight: 700;
  color: var(--muted);
  text-transform: uppercase;
}

.custom-form-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  margin-top: 0.25rem;
}
</style>
