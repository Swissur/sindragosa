-- Deuxième système de jeu (plans/43-systeme-knight.md). Le personnage porte son
-- système : toutes les fiches existantes sont WoW Forever. `sheet` range la fiche
-- propre au système (Knight : aspects, caracs, méta-armure…) ; les colonnes
-- Sindragosa restent où elles sont.
ALTER TABLE "character" ADD COLUMN system varchar(40) NOT NULL DEFAULT 'wow-forever';
ALTER TABLE "character" ADD COLUMN sheet jsonb NOT NULL DEFAULT '{}'::jsonb;
