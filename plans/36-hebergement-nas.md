# 36 — Hébergement sur le NAS (Synology DS220+)

## Objectif

Mettre Sindragosa en ligne **gratuitement, pour une phase de test** : l'app et la base
tournent dans Docker sur le NAS, et Tailscale Funnel la publie en HTTPS sur une adresse
fixe du type `https://ds220.xxxx.ts.net`. Pas de nom de domaine, pas de port ouvert sur
la box, rien à installer pour les joueurs. Login par mot de passe uniquement (pas de
connexion Google pour l'instant).

## Pourquoi pas une simple adresse `http://192.168.x.x`

L'app exige le HTTPS, sans quoi deux choses cassent :

- le cookie de session est `secure` en production ([auth.ts](../server/src/routes/auth.ts)) :
  le navigateur le refuse en `http://`, le login échoue en silence ;
- le client utilise `crypto.randomUUID()` (objets, spécialités, réserves, historique de jets),
  qui n'existe que dans un contexte sécurisé (HTTPS ou `localhost`).

Funnel fournit un vrai certificat : aucun changement de code.

## Pourquoi ça colle

- **DS220+** : Celeron J4025 (x86-64), 2 Go de RAM, Container Manager (DSM 7.2).
  Même architecture qu'un PC : l'image construite sur le PC tourne telle quelle.
- **RAM** : DSM ~1 Go, Node ~200 Mo, Postgres ~100 Mo. Ça tient. Barrette de 4 Go si
  le NAS fait déjà tourner des paquets lourds.
- **Une seule image** : le [Dockerfile](../Dockerfile) sert l'API et le client.
- **Migrations automatiques** au démarrage hors Fly ([server/src/index.ts](../server/src/index.ts)).
- **Tout est en base** (images comprises) : un `pg_dump` = une sauvegarde complète.
- **Inscription** : `/api/auth/register` existe, les joueurs créent leur compte eux-mêmes.

## Architecture

```
Téléphone ──HTTPS──▶ Tailscale Funnel ──▶ tailscaled (paquet DSM) ─▶ 127.0.0.1:8080 (app) ─▶ postgres
                                          └──────────────── NAS ─────────────────────────────┘
```

- L'app n'écoute que sur `127.0.0.1` : invisible depuis le wifi, joignable seulement via Funnel.
- Postgres n'a aucun port publié. DSM n'est pas exposé.

## Fichiers

| Fichier | Rôle |
|---|---|
| [docker-compose.nas.yml](../docker-compose.nas.yml) | Postgres + app, projet `sindragosa-prod` |
| [nas.env.example](../nas.env.example) | Modèle du `.env` à poser sur le NAS (secrets) |
| [scripts/deploy-nas.sh](../scripts/deploy-nas.sh) | Build sur le PC → copie → `docker load` → `up -d` |
| [scripts/backup-nas.sh](../scripts/backup-nas.sh) | `pg_dump` quotidien, 14 jours gardés |

## Étapes (une seule fois)

1. **DSM** — installer *Container Manager* et *Tailscale* (Centre de paquets).
   Panneau de configuration → Terminal & SNMP → activer SSH.
   Services de fichiers → FTP → activer SFTP (utilisé par `scp`).
   Créer le dossier `/volume1/docker/sindragosa`.
   → vérif : `ssh <user>@<ip-du-nas>` puis `sudo docker ps` répond.

2. **Tailscale** — se connecter au compte Tailscale depuis le paquet. Dans la console
   d'admin Tailscale : activer *MagicDNS*, *HTTPS Certificates*, et autoriser Funnel
   (attribut `funnel` dans la politique d'accès ; la console le propose au premier essai).
   → vérif : le NAS apparaît dans la console avec son nom `ds220.xxxx.ts.net`.

3. **Secrets** — sur le NAS, copier `nas.env.example` en `/volume1/docker/sindragosa/.env`,
   remplir `POSTGRES_PASSWORD`, `JWT_SECRET` (générés sur le NAS avec `openssl rand -hex`,
   pour éviter tout caractère spécial dans `DATABASE_URL`) et `CLIENT_URL` (l'adresse `ts.net`),
   puis `chmod 600 .env`. Ne plus jamais changer `POSTGRES_PASSWORD` après le premier démarrage :
   Postgres ne le lit qu'à la création de la base.
   → vérif : `cat .env` montre les trois lignes remplies.

4. **Premier déploiement** — depuis le PC (Git Bash) : `scripts/deploy-nas.sh <user>@<ip-du-nas>`.
   → vérif : sur le NAS, `curl http://127.0.0.1:8080/api/health` répond.

5. **Funnel** — sur le NAS :
   `sudo /var/packages/Tailscale/target/bin/tailscale funnel --bg 8080`
   → vérif : `https://ds220.xxxx.ts.net` affiche la page de login sur un téléphone en 4G.

6. **Sauvegardes** — Panneau de configuration → Planificateur de tâches → script défini
   par l'utilisateur, en `root`, quotidien : `bash /volume1/docker/sindragosa/backup-nas.sh`.
   Hyper Backup copie `backups/` hors du NAS (disque USB ou cloud).
   → vérif : lancer la tâche à la main, un `.sql.gz` apparaît ; le restaurer dans une base
   vide en local et ouvrir une fiche.

7. **Test temps réel** — deux téléphones, un MJ et un joueur : créer une campagne,
   lancer un combat et un jet.
   → vérif : le jet apparaît chez l'autre sans recharger, et le flux tient plus de 5 min
   (les flux SSE envoient un `: ping` toutes les 25 s).

## Pièges Synology rencontrés (2026-10-18)

- **QuickConnect** ne relaie que l'interface DSM : le SSH passe par l'IP locale (ou Tailscale).
- **SFTP** doit être activé (Services de fichiers → FTP) pour `scp`, et il ne montre que les
  dossiers partagés à la racine : `/docker/sindragosa`, pas `/volume1/docker/sindragosa`.
- **`sudo docker`** : introuvable, docker vit dans `/usr/local/bin` (absent du PATH de sudo).
  Les scripts l'appellent par son chemin complet.
- **Tailscale** : le binaire est `/var/packages/Tailscale/target/bin/tailscale` (casse exacte).

## État

Étapes 1 à 6 faites le 2026-10-18 : l'app répond en 4G sur l'adresse `ts.net`, la sauvegarde
quotidienne tourne. Reste : le test temps réel (étape 7) et la copie hors NAS par Hyper Backup.

## Mises à jour

L'utilisateur lance lui-même `scripts/deploy-nas.sh <utilisateur>@<ip-du-nas>` dans Git Bash
(mot de passe DSM demandé 3 fois) — environ 2 min, coupure de quelques secondes. Les
migrations passent au redémarrage de l'app. `/deploie-nas` rappelle la marche à suivre.

Écarté pour l'instant : laisser Claude déployer seul. Il faudrait une clé SSH et un sudo
docker sans mot de passe sur le NAS, ce que l'utilisateur préfère ne pas ouvrir.

## Ce qu'on accepte

- Le site tombe si le NAS ou la box tombe (coupure, mise à jour DSM).
- Funnel est un service gratuit avec une bande passante limitée : largement suffisant
  pour une table de jeu.

## Plus tard

- Connexion Google : ajouter `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`,
  `GOOGLE_REDIRECT_URI` (adresse `ts.net` ou futur domaine) dans le compose et le `.env`.
- Nom de domaine + Cloudflare Tunnel si on veut une adresse plus jolie.
- Build de l'image par GitHub Actions (ghcr.io) pour ne plus passer par le PC.
