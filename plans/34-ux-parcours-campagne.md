# 34 — Parcours campagne : UX d'après la maquette

Source : `docs/Untitled-2026-02-23-2243.excalidraw` (maquette du 2026-10-18).

## Parcours

```
Login ─► Sélection de la campagne (si 0 ou >1 campagnes, sinon sautée)
           │  [Créer une campagne] ─► modale : système + nom (« j'en serai le MJ »)
           ▼
   MJ ─► Écran MJ (CampaignView)
   PJ ─► 0 perso : création d'une fiche
         1 perso : sa fiche
         >1 perso : choix du personnage (avatars + nom) ─► sa fiche
```

## Décisions (validées avec l'utilisateur)

| Sujet | Décision |
|---|---|
| Sélection de campagne | Refonte de `/campagnes` : sélecteur de *mes* campagnes + Créer (modale). Rejoindre reste en dessous. 1 seule campagne → écran sauté. |
| Écran MJ | Refonte de `CampaignView` : grille de portraits (pastille verte = connecté), raccourcis au tap, barre Combat / Repos / Savoir / Options, bouton de session. |
| Messages MJ → joueur | Nouvelle table `gm_message`, onglet « Échange avec le MJ » dans le Journal, popup au centre de l'écran du joueur via le SSE de campagne. |
| Session | `campaign.session_active`. « Fin de session » applique l'ancienne « Fin de séance », qui quitte le menu repos (court / long seulement). |
| Engrenage | Options de la campagne : renommer, système, supprimer (MJ) ; quitter (joueur). |
| Savoir | Nouvelle page `/savoir`, liée depuis l'écran MJ seulement (le joueur avance à l'aveugle). |
| Choix du perso | Choisir un perso l'active **et** le met dans la campagne active. |
| Système | Colonne `campaign.system`, défaut `wow-forever`, un seul choix pour l'instant. |

## Étapes

1. Migration 050 : `campaign.system`, `campaign.session_active`, table `gm_message` → verify : `npm run db:migrate`.
2. Serveur : création avec système, `PATCH /campaigns/:id`, `POST /campaigns/:id/activate`, `POST /campaigns/:id/session`, présence (`online` par membre + évènement SSE `presence`), messages (`routes/gmMessages.ts`), activation d'un perso → membre de la campagne active → verify : tests unitaires (présence, session).
3. Aiguillage d'entrée : `/` résout la destination (`utils/entryRoute.ts`, testé).
4. `/campagnes` refondu, `/personnages` devient le choix du personnage (avatars).
5. `CampaignView` refondu : grille, raccourcis + message, volet Combat (▶/■, crayon, poubelle, choix des joueurs, Lancer !), repos, options, session.
6. Journal : onglet « Échange avec le MJ » + popup global.
7. `/savoir`.
8. `CombatView` : sur tablette/desktop, ordre du combat et champ de bataille côte à côte, pas en onglets.
9. Vérif : `npm test`, `vue-tsc`, e2e touchés.
