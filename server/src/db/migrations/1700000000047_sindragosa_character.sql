-- Fiche Sindragosa (plans/31-refonte-regles-sindragosa.md § 3) : les personnages
-- créés avec les règles d'Arran sont supprimés, la fiche passe au modèle d6.
DELETE FROM "character";

ALTER TABLE "character"
  DROP COLUMN profile,
  DROP COLUMN level,
  DROP COLUMN mp_max,
  DROP COLUMN mp_current,
  DROP COLUMN defense,
  DROP COLUMN initiative_bonus,
  DROP COLUMN dex,
  DROP COLUMN con,
  DROP COLUMN skills,
  DROP COLUMN martial_formations,
  DROP COLUMN paths,
  DROP COLUMN mystic_talent,
  DROP COLUMN armor_id,
  DROP COLUMN shield_id,
  DROP COLUMN defense_bonus,
  DROP COLUMN attack_contact_bonus,
  DROP COLUMN attack_distance_bonus,
  DROP COLUMN attack_magique_bonus,
  DROP COLUMN hp_level_gains,
  DROP COLUMN pr_current,
  DROP COLUMN competences;

ALTER TABLE "character" RENAME COLUMN people TO race;

ALTER TABLE "character"
  ALTER COLUMN str SET DEFAULT 2,
  ALTER COLUMN int SET DEFAULT 2,
  ALTER COLUMN wis SET DEFAULT 2,
  ALTER COLUMN cha SET DEFAULT 2,
  ALTER COLUMN hp_max SET DEFAULT 20,
  ALTER COLUMN hp_current SET DEFAULT 20,
  ALTER COLUMN pc_current SET DEFAULT 2,
  ADD COLUMN agi integer NOT NULL DEFAULT 2,
  ADD COLUMN "end" integer NOT NULL DEFAULT 2,
  -- Armure physique (AP), saisie à la main tant que l'équipement n'est pas défini.
  ADD COLUMN armor integer NOT NULL DEFAULT 0,
  -- { [domainId]: { rank, ticks } }
  ADD COLUMN domains jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- [{ id, domainId, name, level, ticks }]
  ADD COLUMN specialties jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- { [advancedDomainId]: { rank, ticks } }
  ADD COLUMN advanced_domains jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Titres (classes émergentes) accordés par le MJ.
  ADD COLUMN titles jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Usages consommés par période : { [période]: { [abilityId]: nombre } }.
  -- Un repos ou une fin de séance vide les périodes qu'il remet à zéro.
  ADD COLUMN ability_uses jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Coches validées pendant la séance en cours : { success, critFail }.
  ADD COLUMN session_ticks jsonb NOT NULL DEFAULT '{"success":0,"critFail":0}'::jsonb,
  -- Compteurs libres (Mana, Rage, Énergie…) : [{ id, name, current, max }]
  ADD COLUMN resources jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Métiers d'artisanat connus : { [craftId]: rang }
  ADD COLUMN crafts jsonb NOT NULL DEFAULT '{}'::jsonb;
