-- Scénarios du MJ (plans/47-scenarios-mj.md).

-- Un scénario : une liste de blocs (texte, image, objet, PNJ) et le drapeau
-- « on en est là » (id du bloc après lequel il se pose, '' = tout en haut).
CREATE TABLE IF NOT EXISTS "scenario" (
  "id"          serial PRIMARY KEY,
  "campaign_id" integer NOT NULL REFERENCES "campaign"("id") ON DELETE CASCADE,
  "title"       text NOT NULL DEFAULT '',
  "blocks"      jsonb NOT NULL DEFAULT '[]'::jsonb,
  "bookmark"    varchar(40),
  "created_at"  timestamptz NOT NULL DEFAULT now(),
  "updated_at"  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS "scenario_campaign" ON "scenario"("campaign_id");

-- Images que le MJ a montrées aux joueurs : la galerie du Journal.
CREATE TABLE IF NOT EXISTS "shared_image" (
  "id"          serial PRIMARY KEY,
  "campaign_id" integer NOT NULL REFERENCES "campaign"("id") ON DELETE CASCADE,
  "image_id"    integer NOT NULL REFERENCES "generated_images"("id") ON DELETE CASCADE,
  "caption"     text NOT NULL DEFAULT '',
  "shared_at"   timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "shared_image_campaign_image" ON "shared_image"("campaign_id", "image_id");

-- Fiches PNJ du MJ : cachées tant qu'il ne les révèle pas, portrait, notes secrètes.
ALTER TABLE "codex_entry" ADD COLUMN IF NOT EXISTS "gm_owned" boolean NOT NULL DEFAULT false;
ALTER TABLE "codex_entry" ADD COLUMN IF NOT EXISTS "hidden" boolean NOT NULL DEFAULT false;
ALTER TABLE "codex_entry" ADD COLUMN IF NOT EXISTS "gm_notes" text NOT NULL DEFAULT '';
ALTER TABLE "codex_entry" ADD COLUMN IF NOT EXISTS "image_id" integer REFERENCES "generated_images"("id") ON DELETE SET NULL;

-- Notes privées d'un joueur sur une fiche (une par joueur et par fiche).
CREATE TABLE IF NOT EXISTS "codex_player_note" (
  "id"             serial PRIMARY KEY,
  "codex_entry_id" integer NOT NULL REFERENCES "codex_entry"("id") ON DELETE CASCADE,
  "user_id"        integer NOT NULL REFERENCES "user"("id") ON DELETE CASCADE,
  "content"        text NOT NULL DEFAULT '',
  "updated_at"     timestamptz NOT NULL DEFAULT now()
);
CREATE UNIQUE INDEX IF NOT EXISTS "codex_player_note_entry_user" ON "codex_player_note"("codex_entry_id", "user_id");
