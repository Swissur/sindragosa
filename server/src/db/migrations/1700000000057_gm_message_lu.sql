-- « Échange avec le MJ » : un message est lu quand son destinataire ouvre le fil.
-- Les messages déjà échangés passent pour lus.
ALTER TABLE gm_message ADD COLUMN read_at timestamp with time zone;
UPDATE gm_message SET read_at = created_at;
