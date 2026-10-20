-- Tableau des fiches (plans/44-tableau-des-fiches.md) : les fiches posées sur le
-- tableau partagé de la campagne, et les flèches qui les relient.
CREATE TABLE IF NOT EXISTS "codex_board_node" (
  "id"             serial PRIMARY KEY,
  "campaign_id"    integer NOT NULL REFERENCES "campaign"("id") ON DELETE CASCADE,
  "codex_entry_id" integer NOT NULL UNIQUE REFERENCES "codex_entry"("id") ON DELETE CASCADE,
  "x"              real NOT NULL DEFAULT 0,
  "y"              real NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS "codex_board_link" (
  "id"           serial PRIMARY KEY,
  "campaign_id"  integer NOT NULL REFERENCES "campaign"("id") ON DELETE CASCADE,
  "from_node_id" integer NOT NULL REFERENCES "codex_board_node"("id") ON DELETE CASCADE,
  "to_node_id"   integer NOT NULL REFERENCES "codex_board_node"("id") ON DELETE CASCADE,
  -- 'one' : de from vers to. 'both' : va-et-vient.
  "direction"    varchar(4) NOT NULL DEFAULT 'one',
  "dashed"       boolean NOT NULL DEFAULT false,
  "label"        text NOT NULL DEFAULT ''
);
