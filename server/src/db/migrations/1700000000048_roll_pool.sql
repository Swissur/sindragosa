-- Jets Sindragosa : une réserve de d6 (plans/31 § 4).
-- `rolls` porte les dés, `total` le nombre de succès, `sides` vaut 6.
-- `pool` garde ce qui ne se déduit pas des dés : à partir de quelle face un dé
-- est critique (6, ou 5 avec une spécialité Maître), le palier atteint et
-- l'échec critique. NULL pour les jets d'un seul dé (agonie, monstres).
ALTER TABLE roll_event ADD COLUMN pool jsonb;
