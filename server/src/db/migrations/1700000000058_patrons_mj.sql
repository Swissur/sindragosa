-- Patrons accordés ou oubliés par le MJ (plans/45-mode-mj-fiche.md) :
-- { [recipeId]: true (appris en bonus) | false (oublié) }. Sans entrée, le rang du métier décide.
ALTER TABLE "character" ADD COLUMN recipe_grants jsonb NOT NULL DEFAULT '{}'::jsonb;
