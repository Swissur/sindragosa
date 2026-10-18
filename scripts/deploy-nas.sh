#!/usr/bin/env bash
# Construit l'image sur le PC, l'envoie sur le NAS et relance l'app (plan 36).
# Usage : scripts/deploy-nas.sh <utilisateur>@<ip-du-nas>
set -euo pipefail

NAS="${1:?Usage: scripts/deploy-nas.sh <utilisateur>@<ip-du-nas>}"
NAS_DIR=/volume1/docker/sindragosa
# Le SFTP de Synology ne montre que les dossiers partagés, à la racine (sans /volume1).
SFTP_DIR=/docker/sindragosa
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ARCHIVE="$(mktemp -d)/sindragosa.tar.gz"

echo "▶ Build de l'image"
docker build -t sindragosa:latest "$ROOT"

echo "▶ Export de l'image"
docker save sindragosa:latest | gzip > "$ARCHIVE"

echo "▶ Copie vers $NAS:$NAS_DIR"
scp "$ARCHIVE" "$ROOT/docker-compose.nas.yml" "$ROOT/scripts/backup-nas.sh" "$NAS:$SFTP_DIR/"
rm -f "$ARCHIVE"

echo "▶ Chargement et redémarrage sur le NAS (mot de passe sudo demandé)"
# Sur Synology, docker vit dans /usr/local/bin, absent du PATH de sudo.
# Container Manager fournit `docker compose` ou `docker-compose` selon sa version.
REMOTE=$(cat <<EOF
set -e
cd $NAS_DIR
DOCKER=/usr/local/bin/docker
sudo \$DOCKER load -i sindragosa.tar.gz
rm sindragosa.tar.gz
if sudo \$DOCKER compose version >/dev/null 2>&1; then
  sudo \$DOCKER compose -f docker-compose.nas.yml up -d
else
  sudo /usr/local/bin/docker-compose -f docker-compose.nas.yml up -d
fi
sudo \$DOCKER image prune -f
EOF
)
ssh -t "$NAS" "$REMOTE"

echo "✓ Déployé"
