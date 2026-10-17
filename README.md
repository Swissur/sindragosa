# Sindragosa — compagnon de table

Application web pour jouer aux **Terres d’Arran**, jeu de rôle sur table français utilisant le moteur **Chroniques Oubliées**, dans l’univers des bandes dessinées *Elfes*, *Nains*, *Orcs & Gobelins*, *Mages*, etc.

L’objectif est de réduire la paperasse (calculs, consultation des règles, suivi de personnage) pour que joueurs et meneurs passent plus de temps à la table.

---

## Fonctionnalités

- **Fiche personnage** — caractéristiques, compétences, PV/PM, attaques, voies, inventaire.
- **Campagnes** — membres, journal de bord, codex, rencontres et combats en direct (initiative, plateau, jets de dés partagés).
- **Interface** — en français, pensée mobile d’abord, style fantasy (Vue 3 + Vite).

---

## Stack

| Partie | Technologie |
|--------|-------------|
| Client | Vue 3, Vite, TypeScript, Tailwind, Lucide |
| API | Node.js, Express, Drizzle ORM |
| Base | PostgreSQL |
| Données de règles | Markdown statique dans `knowledge/`, catalogues dans `client/src/data/` |

---

## Prérequis

- **Node.js** 20 ou plus récent
- **Docker Desktop** (pour PostgreSQL)

---

## Démarrage rapide

```bash
cp server/.env.example server/.env   # puis remplacer JWT_SECRET
npm install
docker compose up -d
npm run dev
```

- **API** : [http://localhost:3566](http://localhost:3566) — santé : `GET /api/health`
- **Interface** : [http://localhost:5173](http://localhost:5173)

Les scripts racine (`npm run build`, `npm start`, `npm run db:migrate`) s’appuient sur les workspaces `client` et `server`.

---

## Structure du dépôt

| Dossier | Rôle |
|---------|------|
| `knowledge/` | Règles et références rédigées à la main (Markdown) |
| `server/` | API Node + PostgreSQL |
| `client/` | Interface utilisateur |

Pour la cartographie détaillée et les conventions (langue UI, intégrité des règles), voir **[AGENTS.md](AGENTS.md)**. Plan produit : **[docs/PLAN.md](docs/PLAN.md)**. Perspectives : **[ROADMAP.md](ROADMAP.md)**.

---

## Règles et droits d’auteur

Les mécaniques officielles doivent rester alignées sur le *Livre du joueur Terres d’Arran* ; le PDF n’est pas inclus dans ce dépôt (œuvre protégée). Le dossier `knowledge/` sert de **référence privée** pour une table : attention à ce que vous publiez si le dépôt est public.
