-- États Sindragosa (plans/42-etats.md) : la liste passe d'ids (« renverse ») à
-- des objets avec une durée ({ "id": "renverse", "turns": 2 }). Les états
-- d'Arran posés aujourd'hui sont effacés : ils ne durent qu'un combat.
UPDATE "character" SET states = '[]'::jsonb;
UPDATE combat_participant SET states = '[]'::jsonb;
