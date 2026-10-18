#!/usr/bin/env bash
# Sauvegarde quotidienne de la base, lancée par une tâche planifiée DSM en root (plan 36).
# Les images étant stockées en base, ce dump suffit à tout restaurer.
set -euo pipefail

BACKUP_DIR=/volume1/docker/sindragosa/backups
KEEP_DAYS=14

mkdir -p "$BACKUP_DIR"
/usr/local/bin/docker exec sindragosa-prod-postgres-1 pg_dump -U sindragosa sindragosa \
  | gzip > "$BACKUP_DIR/sindragosa-$(date +%F).sql.gz"
find "$BACKUP_DIR" -name 'sindragosa-*.sql.gz' -mtime +"$KEEP_DAYS" -delete
