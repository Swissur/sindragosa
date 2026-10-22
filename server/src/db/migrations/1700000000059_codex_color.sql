-- Couleur d'une fiche (plans/44-tableau-des-fiches.md) : '' = pas de couleur,
-- sinon un « #rrggbb ». Le tableau des fiches en teinte la carte.
ALTER TABLE "codex_entry" ADD COLUMN IF NOT EXISTS "color" varchar(7) NOT NULL DEFAULT '';
