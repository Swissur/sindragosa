import { createRouter, createWebHistory } from 'vue-router'
import CharacterSheetView from '../views/CharacterSheetView.vue'
import CharacterListView from '../views/CharacterListView.vue'
import ActionsView from '../views/ActionsView.vue'
import LoginView from '../views/LoginView.vue'
import JetsView from '../views/JetsView.vue'
import InventaireView from '../views/InventaireView.vue'
import OptionsView from '../views/OptionsView.vue'
import JournalView from '../views/JournalView.vue'
import JournalPageView from '../views/JournalPageView.vue'
import NoteEditView from '../views/NoteEditView.vue'
import NoteDrawingView from '../views/NoteDrawingView.vue'
import CampaignListView from '../views/CampaignListView.vue'
import CampaignView from '../views/CampaignView.vue'
import CampaignCharacterView from '../views/CampaignCharacterView.vue'
import EncounterEditView from '../views/EncounterEditView.vue'
import CombatView from '../views/CombatView.vue'
import { authReady, user, initAuth } from '../composables/useAuth'
import { safeNext, PENDING_NEXT_KEY } from '../utils/safeNext'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
    { path: '/', redirect: '/personnage' },
    { path: '/personnages', name: 'characters', component: CharacterListView },
    { path: '/personnage', name: 'character', component: CharacterSheetView },
    { path: '/actions', name: 'actions', component: ActionsView },
    { path: '/inventaire', name: 'inventaire', component: InventaireView },
    { path: '/jets', name: 'jets', component: JetsView },
    { path: '/journal', name: 'journal', component: JournalView },
    { path: '/journal/note/:id', name: 'journal-note', component: NoteEditView },
    { path: '/journal/dessin/:id', name: 'journal-dessin', component: NoteDrawingView },
    { path: '/journal/:id', name: 'journal-page', component: JournalPageView },
    { path: '/campagnes', name: 'campaigns', component: CampaignListView },
    { path: '/campagnes/:id', name: 'campaign', component: CampaignView },
    { path: '/campagnes/:campaignId/personnage/:userId', name: 'campaign-character', component: CampaignCharacterView },
    { path: '/campagnes/:id/rencontres/:eid', name: 'encounter-edit', component: EncounterEditView },
    { path: '/campagnes/:id/combat/:cid', name: 'combat', component: CombatView },
    { path: '/options', name: 'options', component: OptionsView },
    // Mode table : la tablette au milieu de la table. Plein écran, sans barres.
    { path: '/table', name: 'viewer', component: () => import('../views/ViewerView.vue'), meta: { viewer: true } },
    // POC du champ de bataille 3D — pions en dur, rien n'est sauvegardé.
    // Pas de garde `DEV` : on la teste depuis le téléphone, donc sur le build servi par l'API.
    { path: '/battle-poc', name: 'battle-poc', component: () => import('../views/BattlePocView.vue') },
    // Kitchen sink du design system — dev uniquement, absent du build de prod
    ...(import.meta.env.DEV
      ? [{ path: '/component-library', name: 'component-library', component: () => import('../views/ComponentLibraryView.vue') }]
      : []),
  ],
})

// Retour de Google : leur redirection ne garde pas notre `?next=`, on l'avait
// mis de cote dans sessionStorage. On ne le reprend qu'une fois, au premier
// aiguillage suivant le demarrage de l'app.
let pendingNextRead = false

function takePendingNext(): string | null {
  if (pendingNextRead) return null
  pendingNextRead = true
  try {
    const raw = sessionStorage.getItem(PENDING_NEXT_KEY)
    sessionStorage.removeItem(PENDING_NEXT_KEY)
    return safeNext(raw)
  } catch {
    return null
  }
}

router.beforeEach(async (to) => {
  if (!authReady.value) await initAuth()
  if (to.meta.public) return true
  if (!user.value) return { name: 'login', query: { next: to.fullPath } }
  const pending = takePendingNext()
  if (pending && pending !== to.fullPath) return pending
  return true
})
