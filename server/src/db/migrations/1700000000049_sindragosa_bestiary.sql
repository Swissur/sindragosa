-- Bestiaire au système d6 (plans/33-bestiaire-sindragosa.md).
-- Les monstres enregistrés sont au format CO : on les supprime (seul le bac à
-- sable en contient, `npm run seed-dev` le recrée). Les joueurs en combat restent.
DELETE FROM encounter_monster;
DELETE FROM combat_participant WHERE kind = 'monster';

-- Rencontres
ALTER TABLE encounter_monster DROP COLUMN nc;
ALTER TABLE encounter_monster DROP COLUMN rd;
ALTER TABLE encounter_monster ADD COLUMN threat integer NOT NULL DEFAULT 0;
ALTER TABLE encounter_monster RENAME COLUMN def TO armor;
ALTER TABLE encounter_monster ALTER COLUMN armor SET DEFAULT 0;
ALTER TABLE encounter_monster ADD COLUMN defense integer NOT NULL DEFAULT 2;
ALTER TABLE encounter_monster RENAME COLUMN stat_dex TO stat_agi;
ALTER TABLE encounter_monster RENAME COLUMN stat_con TO stat_end;
ALTER TABLE encounter_monster ALTER COLUMN stat_for SET DEFAULT 2;
ALTER TABLE encounter_monster ALTER COLUMN stat_agi SET DEFAULT 2;
ALTER TABLE encounter_monster ALTER COLUMN stat_end SET DEFAULT 2;
ALTER TABLE encounter_monster ALTER COLUMN stat_int SET DEFAULT 2;
ALTER TABLE encounter_monster ALTER COLUMN stat_sag SET DEFAULT 2;
ALTER TABLE encounter_monster ALTER COLUMN stat_cha SET DEFAULT 2;

-- Participants : `def` portait déjà l'armure des joueurs, il prend son vrai nom.
ALTER TABLE combat_participant DROP COLUMN nc;
ALTER TABLE combat_participant ADD COLUMN threat integer;
ALTER TABLE combat_participant RENAME COLUMN def TO armor;
ALTER TABLE combat_participant ALTER COLUMN armor SET DEFAULT 0;
ALTER TABLE combat_participant ADD COLUMN defense integer;
ALTER TABLE combat_participant RENAME COLUMN stat_dex TO stat_agi;
ALTER TABLE combat_participant RENAME COLUMN stat_con TO stat_end;
