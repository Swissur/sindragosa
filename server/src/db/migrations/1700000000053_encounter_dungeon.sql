-- Référence « donjon / raid » d'une rencontre : classe les combats tout prêts
-- importés d'un donjon (client/src/data/sindragosa/dungeons/) et ceux du MJ.
ALTER TABLE encounter_template ADD COLUMN dungeon varchar(120);
