-- La mana (plans/40-mana.md) : jauge des lanceurs de sorts. Le max est calculé
-- par le client (carac magique + rangs magiques) et stocké pour le repos.
ALTER TABLE "character" ADD COLUMN mana_current integer NOT NULL DEFAULT 0;
ALTER TABLE "character" ADD COLUMN mana_max integer NOT NULL DEFAULT 0;
