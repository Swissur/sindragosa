---
name: lance-serveur
description: Démarre la base Postgres et l'app Sindragosa dans Docker (image de prod reconstruite), jusqu'à ce que http://localhost:8080 réponde
triggers:
  - lance le serveur
  - démarre le serveur
  - relance le serveur
---

Exécute toi-même toutes les étapes, depuis la racine du projet, sans demander de confirmation. L'utilisateur n'a plus qu'à ouvrir le navigateur. Utilise l'outil Bash (syntaxe POSIX).

## 1. Prérequis

- `docker info` doit répondre. Sinon : demande d'ouvrir Docker Desktop, attendre le logo vert, et arrête-toi là.
- `server/.env` doit exister. Sinon : `cp server/.env.example server/.env`, remplace le port `5432` par `5440` dans `DATABASE_URL` et `JWT_SECRET` par `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

## 2. Base de données (port 5440)

Si un conteneur tourne déjà en publiant le port 5440, réutilise-le tel quel — c'est souvent celui d'une autre copie du projet (`C:\JDRAPP\arran-dnd-main\arran-dnd`), qui partage la même base :

```bash
docker ps --filter publish=5440 --format '{{.Names}}'
```

Sinon : `docker compose up -d`.

## 3. Image de l'app

Toujours reconstruire, pour embarquer le code actuel (le cache Docker rend ça rapide si rien n'a changé) :

```bash
docker build -t sindragosa .
```

Si le build échoue, montre les dernières lignes d'erreur et arrête-toi.

## 4. Conteneur de l'app

```bash
docker rm -f sindragosa 2>/dev/null
docker run -d --name sindragosa -p 8080:8080 --env-file server/.env \
  -e PORT=8080 \
  -e DATABASE_URL=postgres://arran:arran_dev@host.docker.internal:5440/arrandnd \
  sindragosa
```

Les deux `-e` sont indispensables : `server/.env` contient `PORT=3566` et `localhost` (qui, dans un conteneur, désigne le conteneur lui-même).

## 5. Vérification

Attends que `curl -s -o /dev/null -w '%{http_code}' http://localhost:8080/` renvoie `200` (boucle d'une seconde, 60 s max). En cas d'échec, affiche `docker logs sindragosa | tail -30` et diagnostique.

## 6. Réponse

Court : « C'est prêt → http://localhost:8080 ». Ajoute :
- pour voir les logs : `docker logs -f sindragosa`
- pour arrêter : `docker stop sindragosa`
