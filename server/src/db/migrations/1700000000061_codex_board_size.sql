-- Taille d'une fiche posée sur le tableau (plans/44-tableau-des-fiches.md) :
-- un lieu s'agrandit pour contenir des personnages. NULL = taille par défaut du type.
ALTER TABLE "codex_board_node" ADD COLUMN IF NOT EXISTS "w" real;
ALTER TABLE "codex_board_node" ADD COLUMN IF NOT EXISTS "h" real;
