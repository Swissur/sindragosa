# 35 — Équipement : objets typés, armes et armures équipées

Décidé le 2026-10-18.

## Règles

- **Dégâts des armes** : fixes, selon le gabarit (à tester en jeu).

| Gabarit | Dégâts |
|---|---|
| Légère (dague, arme de jet) | 2 |
| Une main | 3 |
| Deux mains | 5 |

  Plus un bonus éventuel (patron, enchantement). Dégâts infligés = dégâts de l'arme + marge − armure.
- **Armure Physique (AP)** = somme des armures **équipées** + bonus des compétences (réglé à la main).
- **Fabrication** : un jet réussi (au moins 1 succès) met l'objet directement dans l'inventaire du fabricant. Les composants ne sont pas décomptés (pas suivis par l'app).

## Objets

Chaque objet a un **type** : Arme, Armure, Consommable, Composant, Divers.

- Arme : gabarit, domaine d'attaque, bonus de dégâts.
- Armure : valeur d'AP.
- Arme et Armure ont une icône de corps : allumée = équipé.
  - Une armure équipée ajoute son AP à la défense.
  - Une arme équipée ajoute son attaque à la liste des compétences (onglet Domaines avancés, section Compétences) et à l'onglet Combat de Mes actions.

L'ancienne liste « Armes » de la fiche disparaît : les armes deviennent des objets.

## Patron → objet

`itemFromRecipe` lit l'effet du patron :

- « Arme… » → Arme ; « 2 mains » → deux mains ; « dégâts légers », « jet », dague → légère ; sinon une main. Domaine : précision / estoc / dague → Combat de précision ; jet, munitions, arc → Tir & Lancer ; sinon Mêlée bourrine.
- « Armure physique +N » → Armure, AP N.
- « Composant… » → Composant ; potions, élixirs, fioles → Consommable ; sinon Divers.
- Quantité : la taille du lot, sinon 1.

## Base

Migration 050 : `armor_bonus` ajouté ; les anciennes armes (`weapons`) deviennent des objets équipés, puis la colonne disparaît. `armor` garde l'AP totale (synchronisée par la fiche, comme `hp_max`) : le combat la lit.

## Vérification

Tests unitaires (gabarits, AP, patron → objet), e2e (équiper une armure change l'AP ; fabriquer ajoute à l'inventaire ; une arme équipée apparaît dans Mes actions).
