---
name: deploie-nas
description: Donne à l'utilisateur les commandes Git Bash exactes pour publier Sindragosa sur le NAS Synology (plan 36), après avoir vérifié ce qui peut l'être côté PC
triggers:
  - déploie sur le nas
  - publie sur le nas
  - mets en ligne
  - comment je publie
---

L'utilisateur lance lui-même le déploiement dans Git Bash : il tape ses mots de passe, Claude ne se connecte jamais au NAS (choix de sécurité, voir plan 36). Ton rôle : vérifier ce qui peut l'être sur le PC, puis lui donner des instructions claires. Contexte complet : `plans/36-hebergement-nas.md`.

## 1. Vérifications côté PC (fais-les toi-même, outil Bash)

- `docker info` doit répondre. Sinon, la première instruction sera d'ouvrir Docker Desktop et d'attendre le logo vert.
- `git status --short` et `git log -1 --oneline` : l'image embarque **le dossier tel quel**, modifications non commitées comprises. S'il y en a, dis-le en une ligne (« tu vas publier aussi : … ») pour qu'il choisisse de commiter avant ou non.
- `git branch --show-current` : signale la branche publiée.

Ne lance pas le build toi-même : le script le refait de toute façon.

## 2. Instructions à donner (en français, courtes, commandes en blocs)

Adresse du NAS (`<utilisateur>@<ip-du-nas>`) : le dépôt est public, elle n'est donc pas écrite ici. Reprends-la de ta mémoire locale (`hebergement-nas`) et écris-la en clair dans les commandes ; à défaut, demande-la à l'utilisateur. Hors de chez lui, il remplace l'IP par le nom Tailscale du NAS.

1. Ouvrir Git Bash, puis :
   ```
   cd /c/JDRAPP/Sindragosa/sindragosa
   scripts/deploy-nas.sh <utilisateur>@<ip-du-nas>
   ```
2. Ce qui va se passer :
   - le build (rapide si peu de choses ont changé) ;
   - le mot de passe DSM est demandé **3 fois** : copie, connexion, puis `Password:` pour sudo. Les caractères ne s'affichent pas, c'est normal ;
   - l'avertissement « post-quantum key exchange » s'affiche à chaque connexion : sans importance ;
   - c'est fini quand `✓ Déployé` apparaît.
3. Vérifier : ouvrir l'adresse `ts.net` sur le téléphone (attendre ~20 s, les migrations tournent au démarrage) et recharger la page.

## 3. Si ça bloque

Termine par : « Si ça s'arrête avant `✓ Déployé`, envoie-moi une capture de la fin. » Pour diagnostiquer, appuie-toi sur la section « Pièges Synology rencontrés » du plan 36. Pour lire les logs de l'app, la commande à lui donner (en SSH sur le NAS) est :
```
sudo /usr/local/bin/docker logs sindragosa-prod-app-1 --tail 50
```
