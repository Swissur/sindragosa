-- Équipement (plans/35-equipement.md).
-- L'AP devient : armures équipées + bonus des compétences. L'armure saisie à la
-- main jusqu'ici passe dans le bonus, pour garder le même total.
ALTER TABLE "character" ADD COLUMN armor_bonus integer NOT NULL DEFAULT 0;
UPDATE "character" SET armor_bonus = armor;

-- Les armes deviennent des objets équipés, gabarit une main (3 dégâts) : le bonus
-- garde les dégâts qui avaient été saisis.
UPDATE "character"
SET items = items || COALESCE((
  SELECT jsonb_agg(jsonb_build_object(
    'id', w->>'id',
    'name', w->>'name',
    'quantity', 1,
    'type', 'arme',
    'equipped', true,
    'size', 'une-main',
    'damageBonus', COALESCE((w->>'damage')::int, 3) - 3,
    'domainId', w->>'domainId'
  ))
  FROM jsonb_array_elements(weapons) AS w
), '[]'::jsonb);

ALTER TABLE "character" DROP COLUMN weapons;
