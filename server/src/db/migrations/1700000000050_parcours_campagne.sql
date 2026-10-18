-- Parcours campagne (plans/34-ux-parcours-campagne.md).

-- Système de jeu choisi à la création (un seul pour l'instant).
ALTER TABLE campaign ADD COLUMN system varchar(40) NOT NULL DEFAULT 'wow-forever';
-- Une session est en cours : « Début de la session » / « Fin de session ».
ALTER TABLE campaign ADD COLUMN session_active boolean NOT NULL DEFAULT false;

-- Messages du MJ à un joueur (journal « Échange avec le MJ »).
CREATE TABLE gm_message (
  id serial PRIMARY KEY,
  campaign_id integer NOT NULL REFERENCES campaign(id) ON DELETE CASCADE,
  to_user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  from_user_id integer NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX gm_message_campaign_to ON gm_message (campaign_id, to_user_id);
