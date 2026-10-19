-- Table de butin des combats de boss (plans/41) : définie sur la rencontre,
-- copiée dans le combat à son lancement. Dans le combat, chaque objet garde
-- `givenTo` (le héros qui l'a reçu) une fois distribué.
ALTER TABLE encounter_template ADD COLUMN loot jsonb NOT NULL DEFAULT '[]'::jsonb;
ALTER TABLE combat ADD COLUMN loot jsonb NOT NULL DEFAULT '[]'::jsonb;
