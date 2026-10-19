// Généré depuis docs/regles/Artisanat (Sindragosa).pdf par une transcription assistée ; le catalogue prime désormais sur le PDF (voir CLAUDE.md).
import type { Craft, Recipe } from './types'
import { COMPONENT_RECIPES } from './componentRecipes'

export const CRAFTS: Craft[] = [
  {
    "id": "forge",
    "label": "Forge & Métallurgie",
    "kind": "base",
    "basis": "Artisanat lourd - Force",
    "summary": "Armes, plaques, minage, gros œuvrage."
  },
  {
    "id": "cuir",
    "label": "Travail du Cuir & Écorchage",
    "kind": "base",
    "basis": "Artisanat de précision - Agilité",
    "summary": "Cuir, mailles légères, couture, écorchage."
  },
  {
    "id": "ingenierie",
    "label": "Ingénierie Goblino-Gnome",
    "kind": "base",
    "basis": "Ingénierie - Intelligence",
    "summary": "Explosifs, tourelles, gadgets, automates."
  },
  {
    "id": "alchimie",
    "label": "Alchimie & Herboristerie",
    "kind": "base",
    "basis": "Alchimie & Botanique - Sagesse",
    "summary": "Potions, Plantes, Toxines."
  },
  {
    "id": "forge-magie",
    "label": "Forge-Magie & Enchantement Métallique",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Arcanes",
    "summary": "Armes runiques, lames d'énergie."
  },
  {
    "id": "alchimi-cuir",
    "label": "Alchimi-Cuir & Toxicologie Végétale",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Alchimie",
    "summary": "Armures empoisonnées, masques à gaz."
  },
  {
    "id": "meca-botanique",
    "label": "Méca-Botanique & Chimiste Explosif",
    "kind": "hybrid",
    "basis": "Ingénierie + Alchimie/Nature",
    "summary": "Grenades de spores, robots alchimiques."
  },
  {
    "id": "electro-mecanique",
    "label": "Électro-Mécanique (Ingénierie de la Foudre)",
    "kind": "hybrid",
    "basis": "Ingénierie + Chamanisme",
    "summary": "Condensateurs, cages électriques."
  },
  {
    "id": "necro-forge",
    "label": "Nécro-Forge & Sang-Métal",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Ombre/Nécromancie",
    "summary": "Lames vampiriques, cuirasses maudites."
  },
  {
    "id": "cuirasse-sacree",
    "label": "Cuirasse Sacrée & Orfèvrerie Bénie",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Sacré",
    "summary": "Reliques d'argent, tissus de lumière."
  },
  {
    "id": "archerie-artisan",
    "label": "Archerie d'Artisan & Pièges de Chasse",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Tir/Survie",
    "summary": "Arbalètes d'engrenage, empennages rares."
  },
  {
    "id": "horlogerie-chronomantique",
    "label": "Horlogerie Chronomantique",
    "kind": "hybrid",
    "basis": "Ingénierie + Chronomancie",
    "summary": "Cadrans de hâte, horloges de réversion."
  },
  {
    "id": "forge-feu",
    "label": "Forge-Feu & Pyro-Métallurgie",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Pyromancie",
    "summary": "Armes de magma, pyrite incandescente."
  },
  {
    "id": "tissage-vegetal",
    "label": "Tissage Végétal & Tisses-Bois",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Druidisme",
    "summary": "Écorce de fer tissée, capes de lianes."
  },
  {
    "id": "gemmologie",
    "label": "Gemmologie & Cristallomancie",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Precision + Arcanes",
    "summary": "Taillage de rubis, prismes magiques."
  },
  {
    "id": "artillerie-siege",
    "label": "Artillerie de Siège & Canonnerie",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Ingénierie",
    "summary": "Mortiers portables, démolition de fortins."
  },
  {
    "id": "botterie-acrobatie",
    "label": "Botterie & Équipement d'Acrobatie",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Acrobatie",
    "summary": "Bottes silencieuses, crampons de dragon."
  },
  {
    "id": "cyber-equipement",
    "label": "Cyber-Équipement & Exosquelettes",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Ingénierie + Force",
    "summary": "Servo-bras, plaques cinétiques."
  },
  {
    "id": "parcheminerie-runique",
    "label": "Parcheminerie & Tissage Runique",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Arcanes",
    "summary": "Parchemins de sorts, reliures d'acier."
  },
  {
    "id": "prothesiste",
    "label": "Prothésiste & Chirurgie Mécanique",
    "kind": "hybrid",
    "basis": "Ingénierie + Soins",
    "summary": "Membres en mithril, injecteurs automatiques."
  },
  {
    "id": "chimie-explosive",
    "label": "Chimie Explosive & Poudre Noire",
    "kind": "hybrid",
    "basis": "Ingénierie + Alchimie + Tir",
    "summary": "Poudre enrichie, mines au naphte."
  },
  {
    "id": "charpenterie-marine",
    "label": "Charpenterie de Marine & Siège",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Tactique",
    "summary": "Barricades d'urgence, béliers lourds."
  },
  {
    "id": "tissage-ambre",
    "label": "Tissage d'Ambre & Soie d'Arachnide",
    "kind": "hybrid",
    "basis": "Artisanat de précision + Nature/Ombre",
    "summary": "Tunique en soie d'araignée, filets d'acier-soie."
  },
  {
    "id": "dracono-forge",
    "label": "Dracono-Forge & Écaillage Légendaire",
    "kind": "hybrid",
    "basis": "Artisanat lourd + Précision + Magie draconique",
    "summary": "Armures en écailles de dragon, armes en os d'Ancien."
  }
]

/** Les patrons du PDF. */
export const PDF_RECIPES: Recipe[] = [
  {
    "id": "forge-r1-01",
    "craft": "forge",
    "rank": 1,
    "name": "Pointe de lance renforcée",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Lingot de Fer"
      },
      {
        "qty": 1,
        "name": "Lanière de cuir"
      }
    ],
    "effect": "+1 aux dégâts de perforation de l'arme."
  },
  {
    "id": "forge-r1-02",
    "craft": "forge",
    "rank": 1,
    "name": "Plastron du recrue en fer",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Fer"
      }
    ],
    "effect": "Armure physique +1."
  },
  {
    "id": "forge-r1-03",
    "craft": "forge",
    "rank": 1,
    "name": "Bouclier rond cerclé",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Fer"
      },
      {
        "qty": 1,
        "name": "Bois dur"
      }
    ],
    "effect": "Permet la capacité Blocage basique."
  },
  {
    "id": "forge-r1-04",
    "craft": "forge",
    "rank": 1,
    "name": "Dague de jet équilibrée",
    "batch": 3,
    "components": [
      {
        "qty": 1,
        "name": "Lingot de Fer"
      }
    ],
    "effect": "Arme de jet (portée 8m), dégâts légers."
  },
  {
    "id": "forge-r1-05",
    "craft": "forge",
    "rank": 1,
    "name": "Marteau d'artisan en fonte",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Fer"
      }
    ],
    "effect": "Outil de forge ; +1 aux jets de fabrication lourde."
  },
  {
    "id": "forge-r1-06",
    "craft": "forge",
    "rank": 1,
    "name": "Rivetage d'épaulières",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Lingot de Fer"
      }
    ],
    "effect": "Amélioration d'armure : +1 PV max au porteur."
  },
  {
    "id": "forge-r1-07",
    "craft": "forge",
    "rank": 1,
    "name": "Jambières en mailles simples",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Fer"
      }
    ],
    "effect": "Armure physique +1."
  },
  {
    "id": "forge-r1-08",
    "craft": "forge",
    "rank": 1,
    "name": "Masse à ailettes lourde",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Fer"
      },
      {
        "qty": 1,
        "name": "Manche en bois"
      }
    ],
    "effect": "Arme à 1 main, +1d6 contre les armures en cuir."
  },
  {
    "id": "forge-r1-09",
    "craft": "forge",
    "rank": 1,
    "name": "Lingot de Fer",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Minerais de Fer"
      }
    ],
    "effect": "Composant de base raffiné pour d'autres patrons."
  },
  {
    "id": "forge-r1-10",
    "craft": "forge",
    "rank": 1,
    "name": "Plaque de renfort de bouclier",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Lingot de Fer"
      }
    ],
    "effect": "Amélioration : le bouclier gagne +1 point de solidité."
  },
  {
    "id": "forge-r2-01",
    "craft": "forge",
    "rank": 2,
    "name": "Épée longue en acier trempé",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Cuir traité"
      }
    ],
    "effect": "Arme tranchante à 1 main ; relance les résultats de 1 sur les dégâts."
  },
  {
    "id": "forge-r2-02",
    "craft": "forge",
    "rank": 2,
    "name": "Cuirasse de plaques de garde",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots d'Acier"
      }
    ],
    "effect": "Armure physique +2."
  },
  {
    "id": "forge-r2-03",
    "craft": "forge",
    "rank": 2,
    "name": "Piques d'armure dissuasives",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots d'Acier"
      }
    ],
    "effect": "Amélioration : inflige 1 dégât physique à quiconque vous agrippe en mêlée."
  },
  {
    "id": "forge-r2-04",
    "craft": "forge",
    "rank": 2,
    "name": "Grand bouclier de rempart",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Manche renforcé"
      }
    ],
    "effect": "Armure physique +1 en posture défensive ; blocage amélioré."
  },
  {
    "id": "forge-r2-05",
    "craft": "forge",
    "rank": 2,
    "name": "Hache d'armes à deux mains",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Manche renforcé"
      }
    ],
    "effect": "Arme lourde à 2 mains ; déclenche un saignement sur un critique (6)."
  },
  {
    "id": "forge-r2-06",
    "craft": "forge",
    "rank": 2,
    "name": "Gantelets de poigne de fer",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Cuir traité"
      }
    ],
    "effect": "Armure physique +1 ; immunise au désarmement léger."
  },
  {
    "id": "forge-r2-07",
    "craft": "forge",
    "rank": 2,
    "name": "Bottes de cuirassé articulées",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots d'Acier"
      }
    ],
    "effect": "Armure physique +1 ; +1 aux tests pour résister au renversement."
  },
  {
    "id": "forge-r2-08",
    "craft": "forge",
    "rank": 2,
    "name": "Lame d'estoc en acier fin",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots d'Acier"
      }
    ],
    "effect": "Arme de précision à 1 main ; ignore 1 point d'armure adverse."
  },
  {
    "id": "forge-r2-09",
    "craft": "forge",
    "rank": 2,
    "name": "Lingot d'Acier",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Minerais de Fer"
      },
      {
        "qty": 1,
        "name": "Charbon purifié"
      }
    ],
    "effect": "Composant intermédiaire de qualité supérieure."
  },
  {
    "id": "forge-r2-10",
    "craft": "forge",
    "rank": 2,
    "name": "Chaînes d'ancrage lourdes",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots d'Acier"
      }
    ],
    "effect": "Utilitaires de capture/immobilisation sur le terrain."
  },
  {
    "id": "forge-r3-01",
    "craft": "forge",
    "rank": 3,
    "name": "Plastron complet en mithril",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 2,
        "name": "Cuirs durcis"
      }
    ],
    "effect": "Armure physique +3 ; aucune pénalité de déplacement."
  },
  {
    "id": "forge-r3-02",
    "craft": "forge",
    "rank": 3,
    "name": "Marteau de guerre des pics",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 1,
        "name": "Bois-fer"
      }
    ],
    "effect": "Arme à 2 mains ; brise 1 point d'armure physique par impact lourd."
  },
  {
    "id": "forge-r3-03",
    "craft": "forge",
    "rank": 3,
    "name": "Bouclier réfléchissant à pointes",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 1,
        "name": "Noyau de pierre"
      }
    ],
    "effect": "Armure physique +2 ; renvoie 2 dégâts physiques à l'attaquant sur un blocage réussi."
  },
  {
    "id": "forge-r3-04",
    "craft": "forge",
    "rank": 3,
    "name": "Lame bâtarde d'exécuteur",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 1,
        "name": "Fil de soie"
      }
    ],
    "effect": "Arme versatile (1 ou 2 mains) ; +1d6 aux dégâts sur cible sous 30 % PV."
  },
  {
    "id": "forge-r3-05",
    "craft": "forge",
    "rank": 3,
    "name": "Jambières d'acier-mithril articulées",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Mithril"
      }
    ],
    "effect": "Armure physique +2 ; +1d6 aux jets contre les balayages."
  },
  {
    "id": "forge-r3-06",
    "craft": "forge",
    "rank": 3,
    "name": "Pointe de carreau en mithril",
    "batch": 10,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Mithril"
      }
    ],
    "effect": "Munitions d'arbalète ; traversent l'armure de cuir sans malus."
  },
  {
    "id": "forge-r3-07",
    "craft": "forge",
    "rank": 3,
    "name": "Épaulières du colosse",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 1,
        "name": "Cuir épais"
      }
    ],
    "effect": "Armure physique +1 ; +5 PV maximaux au porteur."
  },
  {
    "id": "forge-r3-08",
    "craft": "forge",
    "rank": 3,
    "name": "Lingot de Mithril",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Minerais de Mithril"
      },
      {
        "qty": 1,
        "name": "Flux arcanique"
      }
    ],
    "effect": "Composant rare pour objets de rang 3+."
  },
  {
    "id": "forge-r3-09",
    "craft": "forge",
    "rank": 3,
    "name": "Heaume à visière de chevalier",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Mithril"
      }
    ],
    "effect": "Armure physique +1 ; immunise aux éblouissements légers."
  },
  {
    "id": "forge-r3-10",
    "craft": "forge",
    "rank": 3,
    "name": "Lame courte de parade",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Mithril"
      }
    ],
    "effect": "Arme en main gauche ; +1 à la réserve de parade."
  },
  {
    "id": "forge-r4-01",
    "craft": "forge",
    "rank": 4,
    "name": "Harnois de plaques en thorium massif",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 3,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 1,
        "name": "Flux de maître"
      }
    ],
    "effect": "Armure physique +4 ; réduit de 1 point tous les dégâts physiques tranchants subis."
  },
  {
    "id": "forge-r4-02",
    "craft": "forge",
    "rank": 4,
    "name": "Grande épée de démolition",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Bois-fer"
      }
    ],
    "effect": "Arme lourde à 2 mains ; inflige le double de dégâts aux structures et boucliers."
  },
  {
    "id": "forge-r4-03",
    "craft": "forge",
    "rank": 4,
    "name": "Pavois de citadelle en thorium",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Noyaux de pierre lourde"
      }
    ],
    "effect": "Armure physique +3 ; permet de couvrir un allié adjacent."
  },
  {
    "id": "forge-r4-04",
    "craft": "forge",
    "rank": 4,
    "name": "Faux de moissonneur de fer",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 1,
        "name": "Os géant"
      }
    ],
    "effect": "Arme à 2 mains ; touche jusqu'à 2 cibles adjacentes en un coup."
  },
  {
    "id": "forge-r4-05",
    "craft": "forge",
    "rank": 4,
    "name": "Gantelets de titan en thorium",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Cuirs durcis"
      }
    ],
    "effect": "Armure physique +2 ; +1 au Rang du Domaine Athlétisme."
  },
  {
    "id": "forge-r4-06",
    "craft": "forge",
    "rank": 4,
    "name": "Bottes de roc inébranlable",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Thorium"
      }
    ],
    "effect": "Armure physique +2 ; immunise au renversement et aux vagues de choc légères."
  },
  {
    "id": "forge-r4-07",
    "craft": "forge",
    "rank": 4,
    "name": "Masse d'arme de maître de forge",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Thorium"
      }
    ],
    "effect": "Arme à 1 main ; étourdit la cible pendant 1 tour sur un 6 naturel."
  },
  {
    "id": "forge-r4-08",
    "craft": "forge",
    "rank": 4,
    "name": "Plaques d'armure de monture lourde",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Sangles de cuir"
      }
    ],
    "effect": "Équipement de monture : +50 % de PV à la monture."
  },
  {
    "id": "forge-r4-09",
    "craft": "forge",
    "rank": 4,
    "name": "Lingot de Thorium",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Minerais de Thorium"
      },
      {
        "qty": 1,
        "name": "Essence de sang"
      }
    ],
    "effect": "Composant épique."
  },
  {
    "id": "forge-r4-10",
    "craft": "forge",
    "rank": 4,
    "name": "Trident de perforation d'élite",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Thorium"
      }
    ],
    "effect": "Arme d'hast ; applique un saignement lourd sur un coup critique."
  },
  {
    "id": "forge-r5-01",
    "craft": "forge",
    "rank": 5,
    "name": "Égide du Titan noir en adamantine",
    "batch": null,
    "components": [
      {
        "qty": 12,
        "name": "Lingots d'Adamantine"
      },
      {
        "qty": 3,
        "name": "Cœurs de lave"
      },
      {
        "qty": 2,
        "name": "Cuirs légendaires"
      }
    ],
    "effect": "Armure physique +6 ; annule le premier coup critique subi lors de chaque combat."
  },
  {
    "id": "forge-r5-02",
    "craft": "forge",
    "rank": 5,
    "name": "Lame d'infini écrasante",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Lingots d'Adamantine"
      },
      {
        "qty": 2,
        "name": "Éclats de météorite"
      },
      {
        "qty": 1,
        "name": "Essence de force"
      }
    ],
    "effect": "Arme à 2 mains légendaire ; ignore 100 % de l'armure physique sur un 5 ou un 6."
  },
  {
    "id": "forge-r5-03",
    "craft": "forge",
    "rank": 5,
    "name": "Pavois d'invulnérabilité en arcanite",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 2,
        "name": "Diamants bruts"
      }
    ],
    "effect": "Armure physique +5 ; absorbe totalement la première attaque magique subie par combat."
  },
  {
    "id": "forge-r5-04",
    "craft": "forge",
    "rank": 5,
    "name": "Marteau d'annihilation d'Azeroth",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Lingots d'Adamantine"
      },
      {
        "qty": 3,
        "name": "Noyaux de séisme"
      }
    ],
    "effect": "Arme lourdissime à 2 mains ; provoque une onde de choc au sol à chaque frappe lourde."
  },
  {
    "id": "forge-r5-05",
    "craft": "forge",
    "rank": 5,
    "name": "Harnois complet du souverain antique",
    "batch": null,
    "components": [
      {
        "qty": 14,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 4,
        "name": "Écailles légendaires"
      },
      {
        "qty": 2,
        "name": "Gemmes taillées"
      }
    ],
    "effect": "Armure physique +7 ; +20 PV maximaux au porteur."
  },
  {
    "id": "forge-r5-06",
    "craft": "forge",
    "rank": 5,
    "name": "Épée courte d'assassin impérial",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Lingots d'Adamantine"
      }
    ],
    "effect": "Arme de précision ; ajoute +2d6 aux dégâts des attaques sournoises."
  },
  {
    "id": "forge-r5-07",
    "craft": "forge",
    "rank": 5,
    "name": "Gantelets brise-montagne",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Lingots d'Adamantine"
      }
    ],
    "effect": "Armure physique +3 ; double les dégâts portés à mains nues."
  },
  {
    "id": "forge-r5-08",
    "craft": "forge",
    "rank": 5,
    "name": "Jambières d'invincibilité",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Lingots d'Arcanite"
      }
    ],
    "effect": "Armure physique +4 ; immunise à l'enracinement et au ralentissement physique."
  },
  {
    "id": "forge-r5-09",
    "craft": "forge",
    "rank": 5,
    "name": "Couronne de seigneur de guerre en arcanite",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 1,
        "name": "Rubis parfait"
      }
    ],
    "effect": "Armure physique +2 ; +1d6 à tous les jets de Commandement."
  },
  {
    "id": "forge-r5-10",
    "craft": "forge",
    "rank": 5,
    "name": "Lingot d'Arcanite",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Minerais de Thorium"
      },
      {
        "qty": 1,
        "name": "Cristal d'Arcane"
      },
      {
        "qty": 1,
        "name": "Catalyste sacré"
      }
    ],
    "effect": "Le composant de forge le plus précieux du jeu."
  },
  {
    "id": "cuir-r1-01",
    "craft": "cuir",
    "rank": 1,
    "name": "Bottes en cuir souple",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      },
      {
        "qty": 1,
        "name": "Fil simple"
      }
    ],
    "effect": "Armure physique +1."
  },
  {
    "id": "cuir-r1-02",
    "craft": "cuir",
    "rank": 1,
    "name": "Plastron du traqueur brut",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs bruts"
      }
    ],
    "effect": "Armure physique +1."
  },
  {
    "id": "cuir-r1-03",
    "craft": "cuir",
    "rank": 1,
    "name": "Lanières de poignet renforcées",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cuir brut"
      }
    ],
    "effect": "Amélioration : +1 aux jets d'Escalade."
  },
  {
    "id": "cuir-r1-04",
    "craft": "cuir",
    "rank": 1,
    "name": "Cape courte de forestier",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      },
      {
        "qty": 1,
        "name": "Laine"
      }
    ],
    "effect": "Protections contre le vent léger ; aucun bonus d'armure."
  },
  {
    "id": "cuir-r1-05",
    "craft": "cuir",
    "rank": 1,
    "name": "Gants de dextérité de dépeceur",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      }
    ],
    "effect": "Outil : +1 aux jets d'Écorchage."
  },
  {
    "id": "cuir-r1-06",
    "craft": "cuir",
    "rank": 1,
    "name": "Jambières en cuir simple",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      }
    ],
    "effect": "Armure physique +1."
  },
  {
    "id": "cuir-r1-07",
    "craft": "cuir",
    "rank": 1,
    "name": "Fourreau de dague ajusté",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cuir brut"
      }
    ],
    "effect": "Amélioration : degainer une dague devient une action gratuite."
  },
  {
    "id": "cuir-r1-08",
    "craft": "cuir",
    "rank": 1,
    "name": "Rembourrage de casque en cuir",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cuir brut"
      }
    ],
    "effect": "Amélioration : absorbe 1 point de dégât étourdissant."
  },
  {
    "id": "cuir-r1-09",
    "craft": "cuir",
    "rank": 1,
    "name": "Lanière de cuir",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Peaux brutes"
      }
    ],
    "effect": "Composant de base raffiné."
  },
  {
    "id": "cuir-r1-10",
    "craft": "cuir",
    "rank": 1,
    "name": "Sacoche de ceinturon de récolte",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      }
    ],
    "effect": "Permet de porter 5 petits consommables supplémentaires."
  },
  {
    "id": "cuir-r2-01",
    "craft": "cuir",
    "rank": 2,
    "name": "Plastron en cuir durci",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs traités"
      },
      {
        "qty": 2,
        "name": "Lanières de cuir"
      }
    ],
    "effect": "Armure physique +2."
  },
  {
    "id": "cuir-r2-02",
    "craft": "cuir",
    "rank": 2,
    "name": "Cape d'ombrage et d'esquive",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs traités"
      },
      {
        "qty": 1,
        "name": "Teinture"
      }
    ],
    "effect": "+1d6 aux tests de Furtivité nocturne."
  },
  {
    "id": "cuir-r2-03",
    "craft": "cuir",
    "rank": 2,
    "name": "Bottes de pas silencieux",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs traités"
      }
    ],
    "effect": "Armure physique +1 ; annule le bruit des pas sur le bois."
  },
  {
    "id": "cuir-r2-04",
    "craft": "cuir",
    "rank": 2,
    "name": "Gantelets de tireur d'élite",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs traités"
      },
      {
        "qty": 1,
        "name": "Fil de soie"
      }
    ],
    "effect": "Armure physique +1 ; +1 aux jets d'attaque à l'arc."
  },
  {
    "id": "cuir-r2-05",
    "craft": "cuir",
    "rank": 2,
    "name": "Renfort d'armure en cuir épais",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs traités"
      }
    ],
    "effect": "Amélioration : ajoute +1 à l'armure d'un plastron existant."
  },
  {
    "id": "cuir-r2-06",
    "craft": "cuir",
    "rank": 2,
    "name": "Masque de rodeur des bois",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs traités"
      }
    ],
    "effect": "Cache l'identité ; protège de la poussière et du sable."
  },
  {
    "id": "cuir-r2-07",
    "craft": "cuir",
    "rank": 2,
    "name": "Jambières d'agilité en cuir souple",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs traités"
      }
    ],
    "effect": "Armure physique +1 ; +1 mètre de déplacement par tour."
  },
  {
    "id": "cuir-r2-08",
    "craft": "cuir",
    "rank": 2,
    "name": "Ceinture à étuis de lancer",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs traités"
      }
    ],
    "effect": "Permet de stocker 6 dagues ou fioles prêtes à l'emploi."
  },
  {
    "id": "cuir-r2-09",
    "craft": "cuir",
    "rank": 2,
    "name": "Cuir durci",
    "batch": 2,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs bruts"
      },
      {
        "qty": 1,
        "name": "Sel de roche"
      }
    ],
    "effect": "Composant intermédiaire raffiné."
  },
  {
    "id": "cuir-r2-10",
    "craft": "cuir",
    "rank": 2,
    "name": "Bracelets de protection contre les toxines",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs traités"
      },
      {
        "qty": 1,
        "name": "Herbe amère"
      }
    ],
    "effect": "+1 aux jets pour résister aux poisons légers."
  },
  {
    "id": "cuir-r3-01",
    "craft": "cuir",
    "rank": 3,
    "name": "Plastron en cuir d'ours de Norfendre",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs épais"
      },
      {
        "qty": 2,
        "name": "Fourrures d'hiver"
      }
    ],
    "effect": "Armure physique +3 ; +1d6 de résistance aux dégâts de Givre."
  },
  {
    "id": "cuir-r3-02",
    "craft": "cuir",
    "rank": 3,
    "name": "Cape du traqueur de brume",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs épais"
      },
      {
        "qty": 1,
        "name": "Soie d'araignée"
      }
    ],
    "effect": "Armure physique +1 ; permet de se camoufler en milieu naturel."
  },
  {
    "id": "cuir-r3-03",
    "craft": "cuir",
    "rank": 3,
    "name": "Gantelets de poigne du félin",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 2,
        "name": "Griffes de bête"
      }
    ],
    "effect": "Armure physique +1 ; permet d'escalader sans équipement."
  },
  {
    "id": "cuir-r3-04",
    "craft": "cuir",
    "rank": 3,
    "name": "Bottes d'esquive acrobatique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs épais"
      }
    ],
    "effect": "Armure physique +2 ; +1d6 aux jets d'Acrobatie."
  },
  {
    "id": "cuir-r3-05",
    "craft": "cuir",
    "rank": 3,
    "name": "Jambières renforcées en cuir de dragonnet",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs épais"
      },
      {
        "qty": 2,
        "name": "Écailles mineures"
      }
    ],
    "effect": "Armure physique +2 ; +1 aux jets de sauvegarde contre le Feu."
  },
  {
    "id": "cuir-r3-06",
    "craft": "cuir",
    "rank": 3,
    "name": "Casque de vision nocturne en cuir",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 1,
        "name": "Oeil de nyctaclope"
      }
    ],
    "effect": "Armure physique +1 ; permet de voir dans la pénombre."
  },
  {
    "id": "cuir-r3-07",
    "craft": "cuir",
    "rank": 3,
    "name": "Doublure d'armure isolante",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 2,
        "name": "Laines rares"
      }
    ],
    "effect": "Amélioration : immunise au froid environnemental."
  },
  {
    "id": "cuir-r3-08",
    "craft": "cuir",
    "rank": 3,
    "name": "Cuir d'élite",
    "batch": 3,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 1,
        "name": "Huile végétale"
      }
    ],
    "effect": "Composant rare de rang 3."
  },
  {
    "id": "cuir-r3-09",
    "craft": "cuir",
    "rank": 3,
    "name": "Carquois de rapidité de tir",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      }
    ],
    "effect": "Recharger un arc ou une arbalète ne consomme plus d'action."
  },
  {
    "id": "cuir-r3-10",
    "craft": "cuir",
    "rank": 3,
    "name": "Ceinturon de colosse en cuir dur",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      }
    ],
    "effect": "Armure physique +1 ; +3 PV maximaux."
  },
  {
    "id": "cuir-r4-01",
    "craft": "cuir",
    "rank": 4,
    "name": "Plastron en écailles de basilic",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 4,
        "name": "Écailles de basilic"
      },
      {
        "qty": 2,
        "name": "Fils de soie d'ombre"
      }
    ],
    "effect": "Armure physique +4 ; 25 % de chances de dévier un sort d'altération."
  },
  {
    "id": "cuir-r4-02",
    "craft": "cuir",
    "rank": 4,
    "name": "Manteau de l'assassin de la Voile Sanglante",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Teintures"
      }
    ],
    "effect": "Armure physique +2 ; +2d6 aux dégâts lors du premier tour de combat depuis la Furtivité."
  },
  {
    "id": "cuir-r4-03",
    "craft": "cuir",
    "rank": 4,
    "name": "Bottes de célérité du guépard",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Tendons de bête rapide"
      }
    ],
    "effect": "Armure physique +2 ; +3 mètres de déplacement permanent."
  },
  {
    "id": "cuir-r4-04",
    "craft": "cuir",
    "rank": 4,
    "name": "Gantelets de maître escrimeur",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Fils d'argent"
      }
    ],
    "effect": "Armure physique +2 ; +1 à la réserve de dé d'Attaque de précision."
  },
  {
    "id": "cuir-r4-05",
    "craft": "cuir",
    "rank": 4,
    "name": "Jambières d'imperméabilité au venin",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Glandes de poison"
      }
    ],
    "effect": "Armure physique +3 ; immunise aux poisons acides."
  },
  {
    "id": "cuir-r4-06",
    "craft": "cuir",
    "rank": 4,
    "name": "Cape d'invisibilité sous la pluie",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 1,
        "name": "Essence d'eau"
      }
    ],
    "effect": "Permet de devenir totalement invisible sous une forte averse."
  },
  {
    "id": "cuir-r4-07",
    "craft": "cuir",
    "rank": 4,
    "name": "Harnais de combat pour bête liée",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs d'élite"
      }
    ],
    "effect": "Équipement de compagnon animal : +3 à son Armure physique."
  },
  {
    "id": "cuir-r4-08",
    "craft": "cuir",
    "rank": 4,
    "name": "Cuir légendaire",
    "batch": 3,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 1,
        "name": "Essence de feu"
      }
    ],
    "effect": "Composant épique pour patrons légendaires."
  },
  {
    "id": "cuir-r4-09",
    "craft": "cuir",
    "rank": 4,
    "name": "Casque de prédateur des sommets",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs d'élite"
      }
    ],
    "effect": "Armure physique +2 ; immunise aux attaques de surprise de face."
  },
  {
    "id": "cuir-r4-10",
    "craft": "cuir",
    "rank": 4,
    "name": "Renfort d'armure en écailles d'élite",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Écailles rares"
      }
    ],
    "effect": "Amélioration : +2 d'armure sur un plastron existant."
  },
  {
    "id": "cuir-r5-01",
    "craft": "cuir",
    "rank": 5,
    "name": "Plastron légendaire du Dragon d'Albâtre",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 4,
        "name": "Écailles de dragon d'albâtre"
      },
      {
        "qty": 2,
        "name": "Fils d'or sacré"
      }
    ],
    "effect": "Armure physique +6 ; immunité totale aux dégâts de Souffle de dragon."
  },
  {
    "id": "cuir-r5-02",
    "craft": "cuir",
    "rank": 5,
    "name": "Manteau des ombres éternelles",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 3,
        "name": "Essences de vide"
      },
      {
        "qty": 2,
        "name": "Soies de nuit"
      }
    ],
    "effect": "Armure physique +3 ; permet d'entrer en Furtivité en plein combat une fois par repos court."
  },
  {
    "id": "cuir-r5-03",
    "craft": "cuir",
    "rank": 5,
    "name": "Bottes de vent céleste",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 2,
        "name": "Plumes de griffon alpha"
      }
    ],
    "effect": "Armure physique +3 ; permet de marcher sur l'eau et d'ignorer les pièges au sol."
  },
  {
    "id": "cuir-r5-04",
    "craft": "cuir",
    "rank": 5,
    "name": "Gantelets de frappe mortelle du Cobra",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 3,
        "name": "Venins concentrés"
      }
    ],
    "effect": "Armure physique +3 ; toutes vos attaques à dague appliquent une toxine paralysante."
  },
  {
    "id": "cuir-r5-05",
    "craft": "cuir",
    "rank": 5,
    "name": "Jambières de l'Archidruide des serres",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 2,
        "name": "Essences de nature purifiée"
      }
    ],
    "effect": "Armure physique +5 ; régénère 2 PV par tour en milieu naturel."
  },
  {
    "id": "cuir-r5-06",
    "craft": "cuir",
    "rank": 5,
    "name": "Casque du Vengeur de la Nuit",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Cuirs légendaires"
      }
    ],
    "effect": "Armure physique +3 ; vision parfaite à travers les illusions et le brouillard magique."
  },
  {
    "id": "cuir-r5-07",
    "craft": "cuir",
    "rank": 5,
    "name": "Cape de peau de Chimaera géante",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 1,
        "name": "Cœur d'éléments"
      }
    ],
    "effect": "Armure physique +4 ; réduit tous les dégâts magiques subis de 20 %."
  },
  {
    "id": "cuir-r5-08",
    "craft": "cuir",
    "rank": 5,
    "name": "Cuir primordial de wyrm",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs légendaires"
      },
      {
        "qty": 1,
        "name": "Sang de wyrm"
      }
    ],
    "effect": "Le matériau de cuir le plus rare du monde."
  },
  {
    "id": "cuir-r5-09",
    "craft": "cuir",
    "rank": 5,
    "name": "Ceinturon de puissance du Traqueur d'Âmes",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Cuirs légendaires"
      }
    ],
    "effect": "Armure physique +3 ; +10 PV maximaux et +1d6 en Furtivité."
  },
  {
    "id": "cuir-r5-10",
    "craft": "cuir",
    "rank": 5,
    "name": "Harnais de maître des bêtes primordiales",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Cuirs légendaires"
      }
    ],
    "effect": "Équipement de compagnon : votre bête gagne +30 % de PV et +2d6 aux dégâts."
  },
  {
    "id": "ingenierie-r1-01",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Dynamite artisanale légère",
    "batch": 3,
    "components": [
      {
        "qty": 1,
        "name": "Poudre noire"
      },
      {
        "qty": 1,
        "name": "Papier kraft"
      },
      {
        "qty": 1,
        "name": "Mèche"
      }
    ],
    "effect": "Explosif de zone (3m) ; inflige des dégâts de feu légers."
  },
  {
    "id": "ingenierie-r1-02",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Lunettes de vision nocturne simples",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Verres"
      },
      {
        "qty": 1,
        "name": "Lingot de Bronze"
      }
    ],
    "effect": "Élimine le malus d'obscurité légère."
  },
  {
    "id": "ingenierie-r1-03",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Détonateur à poussoir mécanique",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Pièce de cuivre"
      },
      {
        "qty": 1,
        "name": "Ressort"
      }
    ],
    "effect": "Outil : permet d'amorcer des charges à 5m de distance."
  },
  {
    "id": "ingenierie-r1-04",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Botte à impulsion saise",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Pièces de cuivre"
      },
      {
        "qty": 1,
        "name": "Ressort"
      }
    ],
    "effect": "+2m sur la distance d'un saut. Risque de dysfonctionnement (1 sur 6)."
  },
  {
    "id": "ingenierie-r1-05",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Boîte à musique apaisante",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Pièces de cuivre"
      },
      {
        "qty": 1,
        "name": "Engrenage"
      }
    ],
    "effect": "Distraction : attire l'attention d'un garde non-combattant pendant 1 tour."
  },
  {
    "id": "ingenierie-r1-06",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Petite grenade foudroyante",
    "batch": 2,
    "components": [
      {
        "qty": 1,
        "name": "Poudre noire"
      },
      {
        "qty": 1,
        "name": "Fil d'étain"
      }
    ],
    "effect": "Zone (2m) ; étourdit les bêtes pendant 1 tour."
  },
  {
    "id": "ingenierie-r1-07",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Ressort",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Bronze"
      }
    ],
    "effect": "Composant mécanique de base."
  },
  {
    "id": "ingenierie-r1-08",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Mire de précision réglable",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Verre"
      },
      {
        "qty": 1,
        "name": "Pièce de cuivre"
      }
    ],
    "effect": "Amélioration d'arme à feu : +1 au jet de touche à longue distance."
  },
  {
    "id": "ingenierie-r1-09",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Frictionneur d'étincelles",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Pierre à feu"
      },
      {
        "qty": 1,
        "name": "Lingot de Cuivre"
      }
    ],
    "effect": "Outil : allume un feu instantanément même sous la pluie."
  },
  {
    "id": "ingenierie-r1-10",
    "craft": "ingenierie",
    "rank": 1,
    "name": "Tromblon d'apprenti ingénieur",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Pièces de cuivre"
      },
      {
        "qty": 1,
        "name": "Bois simple"
      }
    ],
    "effect": "Arme à feu de portée courte ; dégâts légers en cône."
  },
  {
    "id": "ingenierie-r2-01",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Bombe à fragmentation en bronze",
    "batch": 2,
    "components": [
      {
        "qty": 2,
        "name": "Poudres fortes"
      },
      {
        "qty": 2,
        "name": "Engrenages"
      }
    ],
    "effect": "Zone (4m) ; dégâts de feu et éclats métalliques."
  },
  {
    "id": "ingenierie-r2-02",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Bottes à fusée modèle Gnomique",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Bronze"
      },
      {
        "qty": 2,
        "name": "Poudres fortes"
      },
      {
        "qty": 1,
        "name": "Huile végétale"
      }
    ],
    "effect": "Action Rapide : +10m de déplacement instantané. (Risque de brûlure sur un 1)."
  },
  {
    "id": "ingenierie-r2-03",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Tourelle automatique miniature",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de bronze"
      },
      {
        "qty": 2,
        "name": "Engrenages"
      },
      {
        "qty": 1,
        "name": "Canon"
      }
    ],
    "effect": "Tourelle posée au sol ; tire 1 projectile par tour pendant 2 tours."
  },
  {
    "id": "ingenierie-r2-04",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Lunettes de pistage infrarouge",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Verres"
      },
      {
        "qty": 2,
        "name": "Pièces de bronze"
      }
    ],
    "effect": "Détecte les sources de chaleur à travers le feuillage dense."
  },
  {
    "id": "ingenierie-r2-05",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Piège à ressort de mâchoire d'acier",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de fer"
      },
      {
        "qty": 2,
        "name": "Ressorts"
      }
    ],
    "effect": "Piège au sol : immobilise la cible (Enracinement 1 tour)."
  },
  {
    "id": "ingenierie-r2-06",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Pistolet à double canon compact",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Bronze"
      },
      {
        "qty": 1,
        "name": "Crosse en bois"
      }
    ],
    "effect": "Arme à feu ; permet de tirer 2 fois avant de recharger."
  },
  {
    "id": "ingenierie-r2-07",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Chapeau d'ingénieur à hélice",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Pièces de bronze"
      },
      {
        "qty": 1,
        "name": "Tissu"
      },
      {
        "qty": 1,
        "name": "Hélice"
      }
    ],
    "effect": "Ralentit les chutes verticales (anti-dégâts de chute)."
  },
  {
    "id": "ingenierie-r2-08",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Engrenage de précision",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lingots de Bronze"
      }
    ],
    "effect": "Composant intermédiaire raffiné."
  },
  {
    "id": "ingenierie-r2-09",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Détonateur radio-mécanique",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Pièces de bronze"
      },
      {
        "qty": 1,
        "name": "Quartz"
      }
    ],
    "effect": "Active un piège à plus de 15m de distance."
  },
  {
    "id": "ingenierie-r2-10",
    "craft": "ingenierie",
    "rank": 2,
    "name": "Charge de démolition de coffre",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Poudres fortes"
      },
      {
        "qty": 1,
        "name": "Boîtier de fer"
      }
    ],
    "effect": "Fait sauter les serrures de portes non-magiques."
  },
  {
    "id": "ingenierie-r3-01",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Grenade au plasma de fer",
    "batch": 2,
    "components": [
      {
        "qty": 3,
        "name": "Poudres lourdes"
      },
      {
        "qty": 3,
        "name": "Plaques de fer"
      },
      {
        "qty": 1,
        "name": "Détonateur à poussoir mécanique"
      }
    ],
    "effect": "Zone (5m) ; dégâts lourds et assomme (Étourdissement 1 tour)."
  },
  {
    "id": "ingenierie-r3-02",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Casque de contrôle mental gnomique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de fer"
      },
      {
        "qty": 2,
        "name": "Quartz arcaniques"
      },
      {
        "qty": 1,
        "name": "Émetteur"
      }
    ],
    "effect": "Force un humanoïde à obéir pendant 1 tour (Risque d'inversion 1 sur 6)."
  },
  {
    "id": "ingenierie-r3-03",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Robot d'assistance de terrain",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de fer"
      },
      {
        "qty": 3,
        "name": "Engrenages"
      },
      {
        "qty": 1,
        "name": "Pile à vapeur"
      }
    ],
    "effect": "Automate suiveur qui porte 20kg de matériel et absorbe 1 coup à votre place."
  },
  {
    "id": "ingenierie-r3-04",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Viseur télescopique pour fusil",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lentilles"
      },
      {
        "qty": 2,
        "name": "Pièces de fer"
      }
    ],
    "effect": "Amélioration : augmente la portée des armes à feu de +10m."
  },
  {
    "id": "ingenierie-r3-05",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Bottes de saut de grenouille gobline",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de fer"
      },
      {
        "qty": 2,
        "name": "Ressorts"
      },
      {
        "qty": 2,
        "name": "Poudres noires"
      }
    ],
    "effect": "Permet d'effectuer un bond de 12m par-dessus des obstacles."
  },
  {
    "id": "ingenierie-r3-06",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Fusil à pompe à dispersion",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de fer"
      },
      {
        "qty": 1,
        "name": "Canon"
      }
    ],
    "effect": "Arme à 2 mains ; inflige de lourds dégâts en cône à bout portant (3m)."
  },
  {
    "id": "ingenierie-r3-07",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Rayon rétrécisseur gnomique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de fer"
      },
      {
        "qty": 1,
        "name": "Lentille"
      },
      {
        "qty": 1,
        "name": "Quartz"
      }
    ],
    "effect": "Réduit la taille et les dégâts d'un ennemi de 50 % pendant 2 tours."
  },
  {
    "id": "ingenierie-r3-08",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Pile à vapeur",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Fer"
      },
      {
        "qty": 1,
        "name": "Essence d'eau"
      }
    ],
    "effect": "Source d'énergie pour appareils de rang 3+."
  },
  {
    "id": "ingenierie-r3-09",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Mine sous-marine/terrestre à pression",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Poudres noires"
      },
      {
        "qty": 2,
        "name": "Plaques de fer"
      }
    ],
    "effect": "Explose lorsqu'un ennemi marche dessus."
  },
  {
    "id": "ingenierie-r3-10",
    "craft": "ingenierie",
    "rank": 3,
    "name": "Cape d'invisibilité à réfraction optique",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lentilles"
      },
      {
        "qty": 2,
        "name": "Fils d'argent"
      },
      {
        "qty": 1,
        "name": "Engrenage"
      }
    ],
    "effect": "Rends invisible tant que vous restez parfaitement immobile."
  },
  {
    "id": "ingenierie-r4-01",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Obus de mortier de siège portable",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Poudres lourdes"
      },
      {
        "qty": 4,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 1,
        "name": "Amorçage d'élite"
      }
    ],
    "effect": "Tir de longue portée (30m) ; d'immenses dégâts de zone (6m) aux structures et troupes."
  },
  {
    "id": "ingenierie-r4-02",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Exosquelette assisté par piston (Torse)",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 4,
        "name": "Pistons hydrauliques"
      },
      {
        "qty": 2,
        "name": "Piles à vapeur"
      }
    ],
    "effect": "Augmente votre Force de +2 Rangs et votre Armure de +3 pendant 3 tours."
  },
  {
    "id": "ingenierie-r4-03",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Tourelle mitrailleuse bitube",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 4,
        "name": "Engrenages de précision"
      },
      {
        "qty": 2,
        "name": "Canons"
      }
    ],
    "effect": "Tourelle lourde : tire 2 salve de projectiles par tour pendant 3 tours."
  },
  {
    "id": "ingenierie-r4-04",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Gyro-reflecteur de sorts mécanique",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 2,
        "name": "Lentilles d'arcanite"
      },
      {
        "qty": 1,
        "name": "Quartz"
      }
    ],
    "effect": "Réaction : renvoie un sort magique hostile à son lanceur."
  },
  {
    "id": "ingenierie-r4-05",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Lunettes de vision à travers les murs",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lentilles d'arcanite"
      },
      {
        "qty": 3,
        "name": "Quartz arcaniques"
      }
    ],
    "effect": "Permet de voir les formes de vie derrière des cloisons de bois ou de pierre fine."
  },
  {
    "id": "ingenierie-r4-06",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Détonateur à fréquence éloignée",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de Thorium"
      },
      {
        "qty": 1,
        "name": "Émetteur"
      }
    ],
    "effect": "Active des explosifs à n'importe quelle distance à portée de vue."
  },
  {
    "id": "ingenierie-r4-07",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Pistolet mitrailleur automatique",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 2,
        "name": "Chargeurs tambours"
      }
    ],
    "effect": "Arme à 1 main ; tire une salve de 3 projectiles rapides en un seul tour."
  },
  {
    "id": "ingenierie-r4-08",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Moteur à combustion interne d'ingénieur",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Huiles incendiaires"
      },
      {
        "qty": 1,
        "name": "Pile d'élite"
      }
    ],
    "effect": "Composant moteur pour véhicules et gros automates."
  },
  {
    "id": "ingenierie-r4-09",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Bombe à décharge électrique aveuglante",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Poudres noires"
      },
      {
        "qty": 2,
        "name": "Bobines de cuivre pur"
      }
    ],
    "effect": "Zone (5m) ; désoriente et réduit au silence les cibles pendant 1 tour."
  },
  {
    "id": "ingenierie-r4-10",
    "craft": "ingenierie",
    "rank": 4,
    "name": "Bottes de Nitro-Propulsion avancées",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 3,
        "name": "Poudres Nitro"
      }
    ],
    "effect": "+15m de déplacement instantané ; permet de voler brièvement."
  },
  {
    "id": "ingenierie-r5-01",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Bombe à fission d'Azérite tactique",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Poudres d'Azérite"
      },
      {
        "qty": 8,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 2,
        "name": "Détonateurs à fréquence éloignée"
      },
      {
        "qty": 1,
        "name": "Cœur d'énergie"
      }
    ],
    "effect": "L'explosif ultime : rase une structure complète, inflige de colossaux dégâts hybrides dans un rayon de 15m."
  },
  {
    "id": "ingenierie-r5-02",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Combinaison d'Exosquelette colossal d'invasion",
    "batch": null,
    "components": [
      {
        "qty": 12,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 6,
        "name": "Pistons hydrauliques"
      },
      {
        "qty": 4,
        "name": "Piles d'élite"
      }
    ],
    "effect": "Vous pilotez un mecha géant pendant 3 tours : Armure +6, PV temporaires +30, attaques dévastatrices."
  },
  {
    "id": "ingenierie-r5-03",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Automate majordome de réparation (\"Jeeves\")",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Pièces d'Arcanite"
      },
      {
        "qty": 4,
        "name": "Rubis parfaits"
      },
      {
        "qty": 2,
        "name": "Micro-processeurs méca"
      }
    ],
    "effect": "Invoque un robot permanent qui répare les armures du groupe et sert de banque mobile."
  },
  {
    "id": "ingenierie-r5-04",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Canon à impulsion d'énergie profane",
    "batch": null,
    "components": [
      {
        "qty": 10,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 3,
        "name": "Lentilles d'arcanite"
      },
      {
        "qty": 1,
        "name": "Cœur d'Arcane"
      }
    ],
    "effect": "Arme à 2 mains ; tire un rayon continu qui traverse tous les ennemis en ligne droite (20m)."
  },
  {
    "id": "ingenierie-r5-05",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Générateur de trou de ver de téléportation",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 4,
        "name": "Cristaux du Néant"
      },
      {
        "qty": 2,
        "name": "Gyroscopes de maître"
      }
    ],
    "effect": "Téléporte l'intégralité du groupe dans n'importe quelle grande capitale d'Azeroth."
  },
  {
    "id": "ingenierie-r5-06",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Botte d'envol ultime à antigravité",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 3,
        "name": "Piles d'élite"
      }
    ],
    "effect": "Permet de voler librement dans les airs pendant 2 tours complets par combat."
  },
  {
    "id": "ingenierie-r5-07",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Dispositif de contrôle mental de zone",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 2,
        "name": "Émetteurs"
      }
    ],
    "effect": "Soumet jusqu'à 3 ennemis humanoïdes proches à vos ordres pendant 1 tour."
  },
  {
    "id": "ingenierie-r5-08",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Rayon désintégrateur de matière",
    "batch": null,
    "components": [
      {
        "qty": 9,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 3,
        "name": "Lentilles d'arcanite"
      }
    ],
    "effect": "Détruit instantanément un objet non-magique, une porte blindée ou un bouclier ennemi."
  },
  {
    "id": "ingenierie-r5-09",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Tourelle de défense à plasma arcanique",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Plaques d'Arcanite"
      },
      {
        "qty": 2,
        "name": "Cœurs d'énergie"
      }
    ],
    "effect": "Tourelle suprême : tire des orbes de plasma explosifs chaque tour pendant 3 tours."
  },
  {
    "id": "ingenierie-r5-10",
    "craft": "ingenierie",
    "rank": 5,
    "name": "Cœur d'énergie",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cristaux d'Azérite"
      },
      {
        "qty": 3,
        "name": "Lingots d'Arcanite"
      }
    ],
    "effect": "Le composant d'ingénierie le plus puissant du jeu."
  },
  {
    "id": "alchimie-r1-01",
    "craft": "alchimie",
    "rank": 1,
    "name": "Potion de soins mineure",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Feuillargent"
      },
      {
        "qty": 1,
        "name": "Fiole d'eau"
      }
    ],
    "effect": "Restaure 10 PV instantanément."
  },
  {
    "id": "alchimie-r1-02",
    "craft": "alchimie",
    "rank": 1,
    "name": "Élixir de peau de grès",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Terre-racine"
      }
    ],
    "effect": "+1 AP (Armure physique) pour le prochain combat."
  },
  {
    "id": "alchimie-r1-03",
    "craft": "alchimie",
    "rank": 1,
    "name": "Huile de frappe enflammée",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Poussière de braise"
      },
      {
        "qty": 1,
        "name": "Huile végétale"
      }
    ],
    "effect": "Enduit sur arme : +1d6 de dégâts de Feu au prochain coup."
  },
  {
    "id": "alchimie-r1-04",
    "craft": "alchimie",
    "rank": 1,
    "name": "Décoction de Chat-Huant (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Champignons d'ombre"
      },
      {
        "qty": 1,
        "name": "Eau-de-vie"
      }
    ],
    "effect": "Élimine tous les malus de vision nocturne pendant 1 heure."
  },
  {
    "id": "alchimie-r1-05",
    "craft": "alchimie",
    "rank": 1,
    "name": "Baume anti-saignement",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Pacifique"
      },
      {
        "qty": 1,
        "name": "Graisse animale"
      }
    ],
    "effect": "Stoppe immédiatement un effet de Saignement actif."
  },
  {
    "id": "alchimie-r1-06",
    "craft": "alchimie",
    "rank": 1,
    "name": "Poison de crapaud-buffle",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Glande à venin mineure"
      }
    ],
    "effect": "Enduit sur lame (3 charges) : 25 % de chances d'infliger un engourdissement (-1m de déplacement)."
  },
  {
    "id": "alchimie-r1-07",
    "craft": "alchimie",
    "rank": 1,
    "name": "Potion d'apaisement mental mineure",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Mageroie"
      }
    ],
    "effect": "Restaure +3 RP (Résistance Psychique)."
  },
  {
    "id": "alchimie-r1-08",
    "craft": "alchimie",
    "rank": 1,
    "name": "Tonique de l'Hirondelle (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Feuillargent"
      },
      {
        "qty": 1,
        "name": "Alcohest"
      }
    ],
    "effect": "Régénère 2 PV par tour pendant 3 tours (S'interrompt si vous subissez un coup lourd)."
  },
  {
    "id": "alchimie-r1-09",
    "craft": "alchimie",
    "rank": 1,
    "name": "Solvant de rouille léger",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Herbe amère"
      }
    ],
    "effect": "Décape une serrure grippée ou annule 1 point de dégradation sur un outil."
  },
  {
    "id": "alchimie-r1-10",
    "craft": "alchimie",
    "rank": 1,
    "name": "Sérum d'endurance de voyage",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Douce-amère"
      }
    ],
    "effect": "Annule les effets de la fatigue lors des longues marches."
  },
  {
    "id": "alchimie-r2-01",
    "craft": "alchimie",
    "rank": 2,
    "name": "Potion de soins moyenne",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Églantine"
      },
      {
        "qty": 1,
        "name": "Fiole d'eau purifiée"
      }
    ],
    "effect": "Restaure 20 PV instantanément."
  },
  {
    "id": "alchimie-r2-02",
    "craft": "alchimie",
    "rank": 2,
    "name": "Élixir du Griffon (Mutagène de Réflexe) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Églantine"
      },
      {
        "qty": 1,
        "name": "Tendon de bête"
      }
    ],
    "effect": "Accorde +1 à la réserve de d6 pour toutes les Parades pendant 1 combat. (Toxicité : -2 PV Max pour la scène)."
  },
  {
    "id": "alchimie-r2-03",
    "craft": "alchimie",
    "rank": 2,
    "name": "Philtre de Tonnerre (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Sang-royal"
      },
      {
        "qty": 1,
        "name": "Alcohest"
      }
    ],
    "effect": "Augmente vos dégâts physiques de +2 points par dé pendant 2 tours."
  },
  {
    "id": "alchimie-r2-04",
    "craft": "alchimie",
    "rank": 2,
    "name": "Potion de clarté mentale",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Mageroie"
      },
      {
        "qty": 1,
        "name": "Rosée du matin"
      }
    ],
    "effect": "Restaure +6 RP et retire un état de Confusion."
  },
  {
    "id": "alchimie-r2-05",
    "craft": "alchimie",
    "rank": 2,
    "name": "Huile de contre-bête (Huile de Tueur)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Graisses animales"
      },
      {
        "qty": 1,
        "name": "Dent de prédateur"
      }
    ],
    "effect": "Enduit sur arme (5 charges) : +1d6 dégâts supplémentaires contre les Bêtes et Monstres."
  },
  {
    "id": "alchimie-r2-06",
    "craft": "alchimie",
    "rank": 2,
    "name": "Poison de Veuve Noire",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Venins de veuve"
      }
    ],
    "effect": "Enduit sur lame : inflige des dégâts de Nature continus pendant 3 tours (ignore l'armure)."
  },
  {
    "id": "alchimie-r2-07",
    "craft": "alchimie",
    "rank": 2,
    "name": "Élixir de célérité d'Aard",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Chape-argent"
      }
    ],
    "effect": "+3 mètres de déplacement par tour pour le combat en cours."
  },
  {
    "id": "alchimie-r2-08",
    "craft": "alchimie",
    "rank": 2,
    "name": "Fiole de fumée d'aveuglement",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Poudre de suie"
      },
      {
        "qty": 1,
        "name": "Herbivore lyophilisé"
      }
    ],
    "effect": "Lancer au sol : crée un nuage de 3m qui désoriente les cibles (1 tour)."
  },
  {
    "id": "alchimie-r2-09",
    "craft": "alchimie",
    "rank": 2,
    "name": "Sérum de Sang-de-Dragonnet",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Sang de dragonnet"
      },
      {
        "qty": 1,
        "name": "Alcohest"
      }
    ],
    "effect": "Immunise aux brûlures de Feu pendant 2 tours."
  },
  {
    "id": "alchimie-r2-10",
    "craft": "alchimie",
    "rank": 2,
    "name": "Potion de vision des auras magiques",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Ortis-de-mer"
      }
    ],
    "effect": "Perçoit les objets, pièges et runes magiques dissimulés à travers les murs fins."
  },
  {
    "id": "alchimie-r3-01",
    "craft": "alchimie",
    "rank": 3,
    "name": "Potion de soins majeure",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Sansam aveugle"
      },
      {
        "qty": 1,
        "name": "Fleur de peste"
      }
    ],
    "effect": "Restaure 35 PV instantanément."
  },
  {
    "id": "alchimie-r3-02",
    "craft": "alchimie",
    "rank": 3,
    "name": "Décoction de l'Ours Garou (Stimulant de Masse) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Gromsanguine"
      },
      {
        "qty": 1,
        "name": "Moelle de bête géante"
      }
    ],
    "effect": "+10 PV temporaires et immunité au renversement pendant 3 tours. (Toxicité : -1d6 en Agilité après l'effet)."
  },
  {
    "id": "alchimie-r3-03",
    "craft": "alchimie",
    "rank": 3,
    "name": "Philtre du Marabout (Vision de l'Invisible) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Champignons du Néant"
      },
      {
        "qty": 1,
        "name": "Œil de chimère"
      }
    ],
    "effect": "Permet de voir les cibles totalement invisibles ou camouflées à 15m."
  },
  {
    "id": "alchimie-r3-04",
    "craft": "alchimie",
    "rank": 3,
    "name": "Poison paralytique mortel",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Glandes de basilic"
      }
    ],
    "effect": "Enduit sur lame : sur un critique (6), la cible subit l'état Étourdissement 1 tour."
  },
  {
    "id": "alchimie-r3-05",
    "craft": "alchimie",
    "rank": 3,
    "name": "Huile de massacre de Morts-Vivants",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Poussières de tombe"
      },
      {
        "qty": 1,
        "name": "Eau bénite"
      }
    ],
    "effect": "Enduit sur arme : convertit les dégâts en Sacré et inflige +2d6 aux spectres/zombies."
  },
  {
    "id": "alchimie-r3-06",
    "craft": "alchimie",
    "rank": 3,
    "name": "Élixir de Force du Titan",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Gromsanguine"
      },
      {
        "qty": 1,
        "name": "Racine d'acier"
      }
    ],
    "effect": "Accorde +1 Rang temporaire dans le Domaine Mêlée bourrine ou Athlétisme pour 1 combat."
  },
  {
    "id": "alchimie-r3-07",
    "craft": "alchimie",
    "rank": 3,
    "name": "Potion d'immunité mentale",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Sauge-argent"
      }
    ],
    "effect": "Restaure 100 % de la RP et immunise totalement à la Peur pour 3 tours."
  },
  {
    "id": "alchimie-r3-08",
    "craft": "alchimie",
    "rank": 3,
    "name": "Fiole d'Acide de Gargouille (Corrosif)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Sécrétions acides"
      },
      {
        "qty": 1,
        "name": "Fiole renforcée"
      }
    ],
    "effect": "Lancer sur cible : dissout 2 points d'Armure Physique de la victime de manière permanente."
  },
  {
    "id": "alchimie-r3-09",
    "craft": "alchimie",
    "rank": 3,
    "name": "Sérum de Phénix (Soin de Réanimation)",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Plume de phénix"
      },
      {
        "qty": 2,
        "name": "Larmes d'ambre"
      }
    ],
    "effect": "Stabilise instantanément un allié mourant (à 0 PV) et le remet debout avec 10 PV."
  },
  {
    "id": "alchimie-r3-10",
    "craft": "alchimie",
    "rank": 3,
    "name": "Potion de métamorphose aqueuse",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Algues-de-kelp"
      },
      {
        "qty": 1,
        "name": "Essence d'eau"
      }
    ],
    "effect": "Permet de respirer sous l'eau et de nager à vitesse double pendant 1 heure."
  },
  {
    "id": "alchimie-r4-01",
    "craft": "alchimie",
    "rank": 4,
    "name": "Potion de soins supérieure",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lotus de givre"
      },
      {
        "qty": 2,
        "name": "Sansams"
      }
    ],
    "effect": "Restaure 50 PV instantanément."
  },
  {
    "id": "alchimie-r4-02",
    "craft": "alchimie",
    "rank": 4,
    "name": "Décoction d'Ifrit (Stimulant de Fureur) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cœurs de feu"
      },
      {
        "qty": 1,
        "name": "Poudre Nitro"
      }
    ],
    "effect": "Vos attaques déclenchent une explosion de Feu (3m) autour de la cible. (Toxicité : Subit 3 dégâts de Feu par tour)."
  },
  {
    "id": "alchimie-r4-03",
    "craft": "alchimie",
    "rank": 4,
    "name": "Philtre de Moire (Invulnérabilité Mentale) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Fleurs de Lotus"
      },
      {
        "qty": 1,
        "name": "Cervelle de Fiend"
      }
    ],
    "effect": "Immunise aux sorts du Vide/Ombre et renvoie 50 % des dégâts psychiques à l'agresseur."
  },
  {
    "id": "alchimie-r4-04",
    "craft": "alchimie",
    "rank": 4,
    "name": "Flacon de résistance élémentaire suprême",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lotus de givre"
      },
      {
        "qty": 1,
        "name": "Cœur d'éléments"
      }
    ],
    "effect": "Réduit tous les dégâts de Feu, Givre et Foudre subis de 50 % pendant 1 scène."
  },
  {
    "id": "alchimie-r4-05",
    "craft": "alchimie",
    "rank": 4,
    "name": "Venin de Wyverne royale",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Glandes de Wyverne"
      },
      {
        "qty": 1,
        "name": "Fiole d'acide"
      }
    ],
    "effect": "Enduit sur arme : perfore l'armure et détruit 3 PV maximaux par coup porté."
  },
  {
    "id": "alchimie-r4-06",
    "craft": "alchimie",
    "rank": 4,
    "name": "Huile de tueur de Démons & Fél",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cendres de démon"
      },
      {
        "qty": 1,
        "name": "Catalyste sacré"
      }
    ],
    "effect": "Enduit sur arme : +3d6 de dégâts contre les démons et interrompt leurs incantations."
  },
  {
    "id": "alchimie-r4-07",
    "craft": "alchimie",
    "rank": 4,
    "name": "Élixir de vitesse d'Ombre (Passe-muraille)",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Soies de nuit"
      },
      {
        "qty": 1,
        "name": "Essence d'ombre"
      }
    ],
    "effect": "Permet de traverser les corps physiques et portes en bois pendant 1 tour."
  },
  {
    "id": "alchimie-r4-08",
    "craft": "alchimie",
    "rank": 4,
    "name": "Bombe d'Acide phosphorique étouffant",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Fioles d'acide"
      },
      {
        "qty": 1,
        "name": "Poudre Nitro"
      }
    ],
    "effect": "Zone (5m) : inflige d'immenses dégâts d'acide et aveugle toutes les victimes (2 tours)."
  },
  {
    "id": "alchimie-r4-09",
    "craft": "alchimie",
    "rank": 4,
    "name": "Sérum de Clairvoyance suprême",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Œils de wyrm"
      },
      {
        "qty": 1,
        "name": "Cristal de mana"
      }
    ],
    "effect": "Révèle la position de tous les ennemis, pièges et trésors cachés dans un rayon de 50 mètres."
  },
  {
    "id": "alchimie-r4-10",
    "craft": "alchimie",
    "rank": 4,
    "name": "Potion de purification totale de Peste",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lotus de givre"
      },
      {
        "qty": 1,
        "name": "Eau bénite majeure"
      }
    ],
    "effect": "Purifie instantanément toutes les maladies, malédictions légères et poisons actifs du corps."
  },
  {
    "id": "alchimie-r5-01",
    "craft": "alchimie",
    "rank": 5,
    "name": "Elixir de Résurrection du Phénix Céleste",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cœur de Phénix primordial"
      },
      {
        "qty": 2,
        "name": "Lotus Noirs"
      },
      {
        "qty": 1,
        "name": "Poussière d'étoile"
      }
    ],
    "effect": "Si consommé avant un coup fatal, le joueur ressuscite immédiatement au tour suivant avec 100 % de ses PV et de sa RP."
  },
  {
    "id": "alchimie-r5-02",
    "craft": "alchimie",
    "rank": 5,
    "name": "Décoction de Leshen Ancien (Mutagène Régénératif Suprême) (Style Witcher)",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cœur de Leshen Ancien"
      },
      {
        "qty": 2,
        "name": "Lotus Noirs"
      },
      {
        "qty": 1,
        "name": "Sang de Wyrm"
      }
    ],
    "effect": "Régénère 10 PV par tour, augmente l'Armure de +3 et immunise à la mort immédiate pendant 5 tours. (Toxicité : Réduit la RP Max à 0 pour 1 jour après le combat)."
  },
  {
    "id": "alchimie-r5-03",
    "craft": "alchimie",
    "rank": 5,
    "name": "Flacon du Sang des Dieux (Légendaire)",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Lotus Noir"
      },
      {
        "qty": 3,
        "name": "Sangs de démon majeur"
      },
      {
        "qty": 1,
        "name": "Essence de titan"
      }
    ],
    "effect": "Accorde +20 PV Max, +10 RP Max et +1d6 sur TOUS les jets du joueur pendant tout un donjon."
  },
  {
    "id": "alchimie-r5-04",
    "craft": "alchimie",
    "rank": 5,
    "name": "Toxine de mort subite du Dragon Noir",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Venins de Dragon Noir"
      },
      {
        "qty": 1,
        "name": "Acide d'Ancien"
      }
    ],
    "effect": "Enduit suprême : ignore 100 % de l'armure physique et inflige 10 dégâts de Nature bruts par coup."
  },
  {
    "id": "alchimie-r5-05",
    "craft": "alchimie",
    "rank": 5,
    "name": "Huile d'Annihilation des Titans",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Éclats de météorite"
      },
      {
        "qty": 1,
        "name": "Poussière d'Arcanite"
      }
    ],
    "effect": "Enduit sur arme : ajoute +4d6 de dégâts purs contre n'importe quelle créature géante ou Boss."
  },
  {
    "id": "alchimie-r5-06",
    "craft": "alchimie",
    "rank": 5,
    "name": "Potion d'Invulnérabilité d'Adamantine",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Lotus Noirs"
      },
      {
        "qty": 1,
        "name": "Poussière d'Adamantine"
      }
    ],
    "effect": "Rend le buveur totalement insensible à TOUS les dégâts physiques et magiques pendant 1 tour complet."
  },
  {
    "id": "alchimie-r5-07",
    "craft": "alchimie",
    "rank": 5,
    "name": "Philtre de Métamorphose en Chimère",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Sang de Chimère"
      },
      {
        "qty": 2,
        "name": "Lotus Noirs"
      }
    ],
    "effect": "Transforme le buveur en une monstrueuse bête de combat pendant 3 tours (PV +30, Attaques dévastatrices)."
  },
  {
    "id": "alchimie-r5-08",
    "craft": "alchimie",
    "rank": 5,
    "name": "Bombe d'Acide Moléculaire de l'Abîme",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Fioles d'acide suprême"
      },
      {
        "qty": 1,
        "name": "Noyau d'élémentaire d'eau"
      }
    ],
    "effect": "Zone (8m) : détruit 100 % de l'armure physique de TOUS les ennemis touchés et dissout le sol."
  },
  {
    "id": "alchimie-r5-09",
    "craft": "alchimie",
    "rank": 5,
    "name": "Sérum d'Arrêt du Temps (Chronomantic Elixir)",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Sable du temps primordial"
      },
      {
        "qty": 2,
        "name": "Lotus Noirs"
      }
    ],
    "effect": "Fige tous les ennemis à proximité pendant 1 tour, vous laissant une phase d'action totalement libre."
  },
  {
    "id": "alchimie-r5-10",
    "craft": "alchimie",
    "rank": 5,
    "name": "Décoction de Mutagène d'Archidémon",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Cœur d'Archidémon"
      },
      {
        "qty": 2,
        "name": "Lotus Noirs"
      }
    ],
    "effect": "Multiplie par 2 tous vos dégâts infligés pendant 3 tours. (Toxicité : Vous perdez 5 PV par tour actif)."
  },
  {
    "id": "forge-magie-01",
    "craft": "forge-magie",
    "rank": null,
    "name": "Lame en acier arcanique du Protecteur",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 2,
        "name": "Essences d'Arcane"
      }
    ],
    "effect": "Épée à 1 main ; convertit tous ses dégâts en dégâts d'Arcane et ignore l'armure physique."
  },
  {
    "id": "forge-magie-02",
    "craft": "forge-magie",
    "rank": null,
    "name": "Gantelets de rune d'absorption",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 1,
        "name": "Encre arcanique"
      }
    ],
    "effect": "Absorbe le premier sort magique direct reçu lors de chaque combat."
  },
  {
    "id": "forge-magie-03",
    "craft": "forge-magie",
    "rank": null,
    "name": "Sceptre de guerre en arcanite gravé",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 2,
        "name": "Cristaux de mana"
      }
    ],
    "effect": "Arme de mêlée qui augmente les dégâts des sorts du porteur de +1d6."
  },
  {
    "id": "forge-magie-04",
    "craft": "forge-magie",
    "rank": null,
    "name": "Bouclier de diffraction arcanique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Lentille d'arcanite"
      }
    ],
    "effect": "Réfléchit les projectiles magiques vers leurs lanceurs sur un blocage réussi."
  },
  {
    "id": "forge-magie-05",
    "craft": "forge-magie",
    "rank": null,
    "name": "Harnois de plaques de flux magique",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 3,
        "name": "Essences d'Arcane purifiées"
      }
    ],
    "effect": "Armure physique +4 ; régénère 1 point de Mana chaque fois que vous subissez un coup physique."
  },
  {
    "id": "alchimi-cuir-01",
    "craft": "alchimi-cuir",
    "rank": null,
    "name": "Cape en cuir imbibée de venin de vipera",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 2,
        "name": "Venins concentrés"
      }
    ],
    "effect": "Tout ennemi vous attaquant en mêlée subit un empoisonnement continu pendant 2 tours."
  },
  {
    "id": "alchimi-cuir-02",
    "craft": "alchimi-cuir",
    "rank": null,
    "name": "Plastron du chimiste de l'ombre",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Fioles d'acide"
      }
    ],
    "effect": "Armure +3 ; immunise totalement aux projections d'acides et de toxines."
  },
  {
    "id": "alchimi-cuir-03",
    "craft": "alchimi-cuir",
    "rank": null,
    "name": "Bottes de pas d'acide corrosive",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs traités"
      },
      {
        "qty": 1,
        "name": "Fiole d'acide"
      }
    ],
    "effect": "Vos pas laissent des mares d'acide au sol qui blessent les poursuivants."
  },
  {
    "id": "alchimi-cuir-04",
    "craft": "alchimi-cuir",
    "rank": null,
    "name": "Gantelets à seringues de toxine paralysante",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs d'élite"
      },
      {
        "qty": 2,
        "name": "Poisons paralytiques mortels"
      }
    ],
    "effect": "Vos attaques à mains nues appliquent un ralentissement de 50 % à la cible."
  },
  {
    "id": "alchimi-cuir-05",
    "craft": "alchimi-cuir",
    "rank": null,
    "name": "Masque de respiration à filtres alchimiques",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs fins"
      },
      {
        "qty": 1,
        "name": "Filtre de charbon végétal"
      }
    ],
    "effect": "Immunité totale aux gaz asphyxiants, pestes et fumées explosives."
  },
  {
    "id": "meca-botanique-01",
    "craft": "meca-botanique",
    "rank": null,
    "name": "Grenade à dispersion de spores acides",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Boîtiers de fer"
      },
      {
        "qty": 3,
        "name": "Spores de champignons vénéneux"
      }
    ],
    "effect": "Zone (4m) ; blesse et dissout 1 point d'armure de toutes les victimes."
  },
  {
    "id": "meca-botanique-02",
    "craft": "meca-botanique",
    "rank": null,
    "name": "Automate distillateur de soins d'urgence",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de bronze"
      },
      {
        "qty": 2,
        "name": "Potions de soins majeures"
      }
    ],
    "effect": "Robot suiveur qui distribue 1 soin automatique par tour à l'allié le plus affaibli."
  },
  {
    "id": "meca-botanique-03",
    "craft": "meca-botanique",
    "rank": null,
    "name": "Mine à graines de ronces mécanisées",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de fer"
      },
      {
        "qty": 2,
        "name": "Graines d'épines métalliques"
      }
    ],
    "effect": "Piège au sol : inflige des dégâts et enracine les victimes (Enracinement 2 tours)."
  },
  {
    "id": "meca-botanique-04",
    "craft": "meca-botanique",
    "rank": null,
    "name": "Arroseur de pesticide au naphte",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Pièces de Thorium"
      },
      {
        "qty": 2,
        "name": "Huiles incendiaires"
      }
    ],
    "effect": "Lance-flammes à 2 mains ; inflige le triple de dégâts aux créatures végétales et bêtes."
  },
  {
    "id": "meca-botanique-05",
    "craft": "meca-botanique",
    "rank": null,
    "name": "Pomme de pin explosive à retardement",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Poudres Nitro"
      },
      {
        "qty": 1,
        "name": "Écorce de Bois-fer"
      }
    ],
    "effect": "Explosif dissimulable en milieu naturel ; détonation indétectable."
  },
  {
    "id": "electro-mecanique-01",
    "craft": "electro-mecanique",
    "rank": null,
    "name": "Condensateur de foudre sur plastron",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de fer"
      },
      {
        "qty": 2,
        "name": "Bobines de cuivre pur"
      },
      {
        "qty": 1,
        "name": "Cristal de foudre"
      }
    ],
    "effect": "Absorbe les dégâts de Foudre subis pour recharger vos capacités mécaniques."
  },
  {
    "id": "electro-mecanique-02",
    "craft": "electro-mecanique",
    "rank": null,
    "name": "Piège à cage de Faraday électrifiée",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Pièces de bronze"
      },
      {
        "qty": 2,
        "name": "Fils d'acier"
      },
      {
        "qty": 1,
        "name": "Pile à vapeur"
      }
    ],
    "effect": "Piège au sol : paralyse et étourdit la cible (Étourdissement 2 tours)."
  },
  {
    "id": "electro-mecanique-03",
    "craft": "electro-mecanique",
    "rank": null,
    "name": "Pistolet à arc d'éclairs voltaïques",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 1,
        "name": "Générateur à manivelle"
      }
    ],
    "effect": "Arme à 1 main ; tire un éclair qui rebondit sur une seconde cible à proximité."
  },
  {
    "id": "electro-mecanique-04",
    "craft": "electro-mecanique",
    "rank": null,
    "name": "Gantelets à décharge de condensateur",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Plaques de fer"
      },
      {
        "qty": 2,
        "name": "Condensateurs"
      }
    ],
    "effect": "Attaque de mêlée électrique qui interrompt les incantations de sorts."
  },
  {
    "id": "electro-mecanique-05",
    "craft": "electro-mecanique",
    "rank": null,
    "name": "Tourelle à paratonnerre de zone",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 2,
        "name": "Mâts de cuivre"
      }
    ],
    "effect": "Attire tous les sorts d'Éclair ennemis sur la tourelle au lieu des joueurs."
  },
  {
    "id": "necro-forge-01",
    "craft": "necro-forge",
    "rank": null,
    "name": "Lame d'acier sanglant du Massacreur",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 2,
        "name": "Essences de sang séché"
      }
    ],
    "effect": "Épée à 1 main ; restaure en PV 15 % des dégâts physiques qu'elle inflige."
  },
  {
    "id": "necro-forge-02",
    "craft": "necro-forge",
    "rank": null,
    "name": "Cuirasse de sépulture maudite",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 3,
        "name": "Poussières de tombe"
      }
    ],
    "effect": "Armure +4 ; émet un râle d'ombre qui réduit la vitesse d'attaque des agresseurs."
  },
  {
    "id": "necro-forge-03",
    "craft": "necro-forge",
    "rank": null,
    "name": "Bouclier d'os et de fer riveté",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Fer"
      },
      {
        "qty": 2,
        "name": "Crânes d'élite"
      }
    ],
    "effect": "Armure +2 ; absorbe 5 PV supplémentaires sur chaque blocage réussi."
  },
  {
    "id": "necro-forge-04",
    "craft": "necro-forge",
    "rank": null,
    "name": "Faux d'agonie en sang-métal",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 2,
        "name": "Essences d'ombre"
      }
    ],
    "effect": "Arme à 2 mains ; applique un saignement noir qui empêche la régénération de PV."
  },
  {
    "id": "necro-forge-05",
    "craft": "necro-forge",
    "rank": null,
    "name": "Gantelets de poigne de la mort",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 1,
        "name": "Chaîne impie"
      }
    ],
    "effect": "Armure +2 ; augmente la portée de la compétence Poigne de la mort de +5m."
  },
  {
    "id": "cuirasse-sacree-01",
    "craft": "cuirasse-sacree",
    "rank": null,
    "name": "Tunique en fil d'or béni du Croisé",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs fins"
      },
      {
        "qty": 2,
        "name": "Fils d'or sacré"
      },
      {
        "qty": 1,
        "name": "Eau bénite"
      }
    ],
    "effect": "Armure +2 ; +1d6 aux jets de sauvegarde contre les malédictions et la Peur."
  },
  {
    "id": "cuirasse-sacree-02",
    "craft": "cuirasse-sacree",
    "rank": null,
    "name": "Reliquaire d'argent de la Lumière",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Lingots d'Argent"
      },
      {
        "qty": 1,
        "name": "Fragment de cristal sacré"
      }
    ],
    "effect": "Accessoire : émet un flash de lumière qui repousse les Morts-vivants proches."
  },
  {
    "id": "cuirasse-sacree-03",
    "craft": "cuirasse-sacree",
    "rank": null,
    "name": "Plastron en cuir béni de Paladin",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Cuirs durcis"
      },
      {
        "qty": 2,
        "name": "Poussières de sanctuaires"
      }
    ],
    "effect": "Armure +3 ; soigne le porteur de 2 PV chaque fois qu'il subit des dégâts du Sacré."
  },
  {
    "id": "cuirasse-sacree-04",
    "craft": "cuirasse-sacree",
    "rank": null,
    "name": "Bottes de marcheur de sanctuaires",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs épais"
      },
      {
        "qty": 1,
        "name": "Huile bénite"
      }
    ],
    "effect": "Armure +1 ; immunise aux sols maudits ou impies."
  },
  {
    "id": "cuirasse-sacree-05",
    "craft": "cuirasse-sacree",
    "rank": null,
    "name": "Gantelets de bénédiction d'acier-argent",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Argent"
      },
      {
        "qty": 2,
        "name": "Cuirs fins"
      }
    ],
    "effect": "Armure +2 ; augmente l'efficacité des sorts de soins reçus de +20 %."
  },
  {
    "id": "archerie-artisan-01",
    "craft": "archerie-artisan",
    "rank": null,
    "name": "Arbalète lourde à double engrenage",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Bois-fer"
      },
      {
        "qty": 2,
        "name": "Engrenages"
      },
      {
        "qty": 1,
        "name": "Corde en boyau"
      }
    ],
    "effect": "Arme à distance à 2 mains ; tire 2 carreaux simultanément sur la même cible."
  },
  {
    "id": "archerie-artisan-02",
    "craft": "archerie-artisan",
    "rank": null,
    "name": "Empennage de flèche en plumes de griffon",
    "batch": 20,
    "components": [
      {
        "qty": 2,
        "name": "Plumes de griffon"
      },
      {
        "qty": 5,
        "name": "Bois d'ébène"
      }
    ],
    "effect": "Munitions d'arc ; ignorent les malus de vent et de portée maximale."
  },
  {
    "id": "archerie-artisan-03",
    "craft": "archerie-artisan",
    "rank": null,
    "name": "Arc composite à poulies gnomiques",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Bois-fer"
      },
      {
        "qty": 2,
        "name": "Engrenages"
      }
    ],
    "effect": "Arme à distance ; réduit le score de Force requis pour tirer au maximum de puissance."
  },
  {
    "id": "archerie-artisan-04",
    "craft": "archerie-artisan",
    "rank": null,
    "name": "Piège à mâchoire dentelée en acier-soie",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de fer"
      },
      {
        "qty": 1,
        "name": "Fil de soie"
      }
    ],
    "effect": "Piège au sol : inflige de lourds dégâts et applique un saignement béant."
  },
  {
    "id": "archerie-artisan-05",
    "craft": "archerie-artisan",
    "rank": null,
    "name": "Carquois renforcé de dégainage éclair",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs durcis"
      },
      {
        "qty": 1,
        "name": "Sangle de cuir"
      }
    ],
    "effect": "Offre 1 attaque à distance gratuite lors du premier tour de combat."
  },
  {
    "id": "horlogerie-chronomantique-01",
    "craft": "horlogerie-chronomantique",
    "rank": null,
    "name": "Chronomètre de réversion temporelle",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Engrenages de précision"
      },
      {
        "qty": 1,
        "name": "Cristal de temps"
      },
      {
        "qty": 1,
        "name": "Boîtier d'or"
      }
    ],
    "effect": "Accessoire : efface les dégâts subis lors du tout dernier tour (1 fois par combat)."
  },
  {
    "id": "horlogerie-chronomantique-02",
    "craft": "horlogerie-chronomantique",
    "rank": null,
    "name": "Cadran de hâte mécanique à ressort",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Engrenages"
      },
      {
        "qty": 1,
        "name": "Ressort"
      }
    ],
    "effect": "Action Rapide : accorde +1 action supplémentaire pendant le tour en cours."
  },
  {
    "id": "horlogerie-chronomantique-03",
    "craft": "horlogerie-chronomantique",
    "rank": null,
    "name": "Sablier de stase de poche",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Verres"
      },
      {
        "qty": 1,
        "name": "Sable du temps"
      }
    ],
    "effect": "Plonge un ennemi et vous-même en stase inciblable pendant 1 tour."
  },
  {
    "id": "horlogerie-chronomantique-04",
    "craft": "horlogerie-chronomantique",
    "rank": null,
    "name": "Bottes d'accélération chronométrique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Plaques de fer"
      },
      {
        "qty": 2,
        "name": "Engrenages de précision"
      }
    ],
    "effect": "Double votre vitesse de déplacement pendant 2 tours."
  },
  {
    "id": "horlogerie-chronomantique-05",
    "craft": "horlogerie-chronomantique",
    "rank": null,
    "name": "Aiguille de perturbation d'incantation",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de cuivre"
      },
      {
        "qty": 1,
        "name": "Quartz"
      }
    ],
    "effect": "Rayon à distance : augmente le temps d'incantation du sort ennemi en cours de 1 tour."
  },
  {
    "id": "forge-feu-01",
    "craft": "forge-feu",
    "rank": null,
    "name": "Lame en acier forgé au magma",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 2,
        "name": "Cœurs de lave"
      }
    ],
    "effect": "Épée à 1 main ; inflige 50 % de ses dégâts sous forme de brûlures de Feu."
  },
  {
    "id": "forge-feu-02",
    "craft": "forge-feu",
    "rank": null,
    "name": "Cuirasse de pyrite incandescente",
    "batch": null,
    "components": [
      {
        "qty": 7,
        "name": "Lingots de Pyrite"
      },
      {
        "qty": 2,
        "name": "Essences de feu"
      }
    ],
    "effect": "Armure +4 ; renvoie 3 dégâts de Feu à quiconque vous frappe en mêlée."
  },
  {
    "id": "forge-feu-03",
    "craft": "forge-feu",
    "rank": null,
    "name": "Bouclier de plaque de fournaise",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Fer"
      },
      {
        "qty": 1,
        "name": "Pierre de foyer"
      }
    ],
    "effect": "Armure +2 ; absorbe 100 % des dégâts de Feu subis de face."
  },
  {
    "id": "forge-feu-04",
    "craft": "forge-feu",
    "rank": null,
    "name": "Marteau de frappe pyrotechnique",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Poudres Nitro"
      }
    ],
    "effect": "Arme à 2 mains ; déclenche une explosion de feu à chaque coup critique."
  },
  {
    "id": "forge-feu-05",
    "craft": "forge-feu",
    "rank": null,
    "name": "Gantelets de manipulation des braises",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 1,
        "name": "Cuir légendaire"
      }
    ],
    "effect": "Armure +2 ; permet de saisir des objets incandescents à mains nues sans dégâts."
  },
  {
    "id": "tissage-vegetal-01",
    "craft": "tissage-vegetal",
    "rank": null,
    "name": "Plastron en écorce de Bois-Fer tressée",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Écorces de Bois-fer"
      },
      {
        "qty": 2,
        "name": "Lianes renforcées"
      }
    ],
    "effect": "Armure +3 ; se régénère de 1 PV par tour sous la lumière du soleil."
  },
  {
    "id": "tissage-vegetal-02",
    "craft": "tissage-vegetal",
    "rank": null,
    "name": "Cape de camouflage en lianes de jungle",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Feuillets de lianes"
      },
      {
        "qty": 1,
        "name": "Soie végétale"
      }
    ],
    "effect": "+2d6 aux tests de Furtivité en forêt ou jungle."
  },
  {
    "id": "tissage-vegetal-03",
    "craft": "tissage-vegetal",
    "rank": null,
    "name": "Bottes de marcheur de frondaisons",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Écorces"
      },
      {
        "qty": 2,
        "name": "Feutres"
      }
    ],
    "effect": "Armure +1 ; aucun bruit de pas sur les feuilles mortes ou branches."
  },
  {
    "id": "tissage-vegetal-04",
    "craft": "tissage-vegetal",
    "rank": null,
    "name": "Gantelets d'emprise des ronces",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Écorces"
      },
      {
        "qty": 2,
        "name": "Épines de ronces"
      }
    ],
    "effect": "Armure +1 ; vos attaques à mains nues appliquent un enracinement léger."
  },
  {
    "id": "tissage-vegetal-05",
    "craft": "tissage-vegetal",
    "rank": null,
    "name": "Bouclier en bois d'Ancien tressé",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Bois d'Ancien"
      },
      {
        "qty": 1,
        "name": "Sève sacrée"
      }
    ],
    "effect": "Armure +2 ; réduit les dégâts des attaques à distance physiques de 2 points par dé."
  },
  {
    "id": "gemmologie-01",
    "craft": "gemmologie",
    "rank": null,
    "name": "Prisme de réfraction magique sur plastron",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Diamant brut"
      },
      {
        "qty": 2,
        "name": "Montures en argent"
      },
      {
        "qty": 1,
        "name": "Essence d'Arcane"
      }
    ],
    "effect": "Amélioration : divise un sort magique hostile reçu en 3 rayons inoffensifs (1 fois par combat)."
  },
  {
    "id": "gemmologie-02",
    "craft": "gemmologie",
    "rank": null,
    "name": "Rubis de vitalité serti",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Rubis parfait"
      },
      {
        "qty": 1,
        "name": "Monture en or"
      }
    ],
    "effect": "Amélioration d'armure : +10 PV maximaux au porteur."
  },
  {
    "id": "gemmologie-03",
    "craft": "gemmologie",
    "rank": null,
    "name": "Saphir de clarté spirituelle serti",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Saphir parfait"
      },
      {
        "qty": 1,
        "name": "Monture en argent"
      }
    ],
    "effect": "Amélioration d'arme : réduit le coût en mana des sorts de 10 %."
  },
  {
    "id": "gemmologie-04",
    "craft": "gemmologie",
    "rank": null,
    "name": "Émeraude de résistance aux toxines sertie",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Émeraude brute"
      },
      {
        "qty": 1,
        "name": "Monture en bronze"
      }
    ],
    "effect": "Amélioration : +1d6 aux jets de sauvegarde contre les poisons."
  },
  {
    "id": "gemmologie-05",
    "craft": "gemmologie",
    "rank": null,
    "name": "Lentille prismatique de détection des illusions",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Gemmes taillées"
      },
      {
        "qty": 1,
        "name": "Monture en bronze"
      }
    ],
    "effect": "Monocle : permet de voir à travers les métamorphoses et illusions."
  },
  {
    "id": "artillerie-siege-01",
    "craft": "artillerie-siege",
    "rank": null,
    "name": "Mortier d'infanterie portable de campagne",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 3,
        "name": "Poudres lourdes"
      },
      {
        "qty": 1,
        "name": "Trépied"
      }
    ],
    "effect": "Arme lourde posée : tire des obus à 25m infligeant de colossaux dégâts de zone aux structures."
  },
  {
    "id": "artillerie-siege-02",
    "craft": "artillerie-siege",
    "rank": null,
    "name": "Obus perforant de blindage",
    "batch": 3,
    "components": [
      {
        "qty": 3,
        "name": "Poudres lourdes"
      },
      {
        "qty": 3,
        "name": "Pièces d'Arcanite"
      }
    ],
    "effect": "Munitions de mortier ; ignorent 100 % de l'armure physique des véhicules/portes."
  },
  {
    "id": "artillerie-siege-03",
    "craft": "artillerie-siege",
    "rank": null,
    "name": "Canon de poche à double rétro-poussoir",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 2,
        "name": "Poudres Nitro"
      }
    ],
    "effect": "Arme à 2 mains ; projette une volée de ferraille en cône et vous repousse de 2m en arrière."
  },
  {
    "id": "artillerie-siege-04",
    "craft": "artillerie-siege",
    "rank": null,
    "name": "Affût de tir stabilisé pour arbalète/fusil",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Plaques de fer"
      },
      {
        "qty": 2,
        "name": "Niveau à bulle"
      }
    ],
    "effect": "Amélioration : annule le malus de tir en position accroupie ou ancrée."
  },
  {
    "id": "artillerie-siege-05",
    "craft": "artillerie-siege",
    "rank": null,
    "name": "Charge de démolition de murailles",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Poudres lourdes"
      },
      {
        "qty": 2,
        "name": "Boîtiers d'arcanite"
      }
    ],
    "effect": "Fait sauter un pan de mur en pierre fine ou une fortification."
  },
  {
    "id": "botterie-acrobatie-01",
    "craft": "botterie-acrobatie",
    "rank": null,
    "name": "Bottes à semelles de feutre d'ombre",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs fins"
      },
      {
        "qty": 2,
        "name": "Feutres"
      }
    ],
    "effect": "Armure +1 ; annule totalement le bruit de vos déplacements sur n'importe quel sol."
  },
  {
    "id": "botterie-acrobatie-02",
    "craft": "botterie-acrobatie",
    "rank": null,
    "name": "Crampons d'escalade en griffes de dragon",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs durcis"
      },
      {
        "qty": 2,
        "name": "Griffes de dragonnet"
      }
    ],
    "effect": "Permet d'escalader les parois rocheuses ou glacées à vitesse de marche normale."
  },
  {
    "id": "botterie-acrobatie-03",
    "craft": "botterie-acrobatie",
    "rank": null,
    "name": "Bottes à ressorts d'amortissement de chute",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs traités"
      },
      {
        "qty": 2,
        "name": "Ressorts"
      }
    ],
    "effect": "Armure +1 ; réduit de 80 % les dégâts subis lors d'une chute verticale."
  },
  {
    "id": "botterie-acrobatie-04",
    "craft": "botterie-acrobatie",
    "rank": null,
    "name": "Bottes de marcheur de corde roide",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Cuirs fins"
      },
      {
        "qty": 1,
        "name": "Sangle de cuir"
      }
    ],
    "effect": "+2d6 aux jets d'Acrobatie sur les surfaces très étroites ou glissantes."
  },
  {
    "id": "botterie-acrobatie-05",
    "craft": "botterie-acrobatie",
    "rank": null,
    "name": "Bottes d'impulsion de franchissement",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Cuirs durcis"
      },
      {
        "qty": 1,
        "name": "Piston hydraulique"
      }
    ],
    "effect": "Action Rapide : franchit un obstacle ou un fossé de 4m sans test de dé."
  },
  {
    "id": "cyber-equipement-01",
    "craft": "cyber-equipement",
    "rank": null,
    "name": "Servo-bras hydraulique de puissance",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 2,
        "name": "Pistons hydrauliques"
      },
      {
        "qty": 1,
        "name": "Pile à vapeur"
      }
    ],
    "effect": "Armure de bras : accorde le Rang 5 automatique en Force pour 1 jet de charge ou de jet d'objet."
  },
  {
    "id": "cyber-equipement-02",
    "craft": "cyber-equipement",
    "rank": null,
    "name": "Plaque d'absorption d'énergie cinétique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Plaques de fer"
      },
      {
        "qty": 2,
        "name": "Ressorts"
      }
    ],
    "effect": "Amélioration de plastron : emmagasine les coups subis pour relâcher une onde de choc au bout de 5 impacts."
  },
  {
    "id": "cyber-equipement-03",
    "craft": "cyber-equipement",
    "rank": null,
    "name": "Gantelet à marteau-pilon mécanique",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 1,
        "name": "Piston hydraulique"
      }
    ],
    "effect": "Attaque à mains nues qui démolit les boucliers et assomme la cible (Étourdissement 1 tour)."
  },
  {
    "id": "cyber-equipement-04",
    "craft": "cyber-equipement",
    "rank": null,
    "name": "Jambières d'assistance à la marche lourde",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Plaques de Thorium"
      },
      {
        "qty": 2,
        "name": "Pistons hydrauliques"
      }
    ],
    "effect": "Armure +3 ; annule totalement les pénalités de charge d'inventaire excessive."
  },
  {
    "id": "cyber-equipement-05",
    "craft": "cyber-equipement",
    "rank": null,
    "name": "Casque à viseur d'acquisition ciblée",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de fer"
      },
      {
        "qty": 1,
        "name": "Micro-processeur méca"
      }
    ],
    "effect": "Armure +1 ; +1d6 aux jets de touche sur cible désignée."
  },
  {
    "id": "parcheminerie-runique-01",
    "craft": "parcheminerie-runique",
    "rank": null,
    "name": "Parchemin d'incantation de Bouclier d'Arcane",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Papyrus de soie"
      },
      {
        "qty": 1,
        "name": "Encre arcanique"
      }
    ],
    "effect": "Consommable : lance le sort Bouclier d'Arcane gratuitement sans consommer de mana."
  },
  {
    "id": "parcheminerie-runique-02",
    "craft": "parcheminerie-runique",
    "rank": null,
    "name": "Reliure d'acier pour grimoire de sort",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Plaques de fer"
      },
      {
        "qty": 1,
        "name": "Cuir durci"
      }
    ],
    "effect": "Amélioration : le grimoire peut servir de bouclier secondaire (+1 Armure)."
  },
  {
    "id": "parcheminerie-runique-03",
    "craft": "parcheminerie-runique",
    "rank": null,
    "name": "Parchemin de téléportation de repli",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Papyrus de soie"
      },
      {
        "qty": 1,
        "name": "Poussière de téléportation"
      }
    ],
    "effect": "Consommable : téléporte le lanceur à 15m en arrière hors du combat."
  },
  {
    "id": "parcheminerie-runique-04",
    "craft": "parcheminerie-runique",
    "rank": null,
    "name": "Pousse de runes d'encre sur manteau",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Encres arcaniques"
      },
      {
        "qty": 1,
        "name": "Fil de soie"
      }
    ],
    "effect": "Amélioration de cape : +1d6 de résistance contre les sorts de Peur et d'Ombre."
  },
  {
    "id": "parcheminerie-runique-05",
    "craft": "parcheminerie-runique",
    "rank": null,
    "name": "Parchemin de métamorphose rapide",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Papyrus de soie"
      },
      {
        "qty": 1,
        "name": "Essence de polymorphe"
      }
    ],
    "effect": "Consommable : transforme une cible non-boss en mouton pendant 1 tour."
  },
  {
    "id": "prothesiste-01",
    "craft": "prothesiste",
    "rank": null,
    "name": "Prothèse de bras articulé en mithril",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Lingots de Mithril"
      },
      {
        "qty": 2,
        "name": "Fils d'argent"
      },
      {
        "qty": 1,
        "name": "Engrenage"
      }
    ],
    "effect": "Remplace un bras perdu : accorde +1 permanent en Force et ne ressent pas la douleur."
  },
  {
    "id": "prothesiste-02",
    "craft": "prothesiste",
    "rank": null,
    "name": "Prothèse de legère de gambe en acier-ressort",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Lingots d'Acier"
      },
      {
        "qty": 2,
        "name": "Ressorts"
      }
    ],
    "effect": "Remplace une jambe perdue : conserve 100 % de la vitesse de marche normale."
  },
  {
    "id": "prothesiste-03",
    "craft": "prothesiste",
    "rank": null,
    "name": "Injecteur automatique de sérum de soins sur harnais",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Pièces de bronze"
      },
      {
        "qty": 1,
        "name": "Seringue de verre"
      },
      {
        "qty": 1,
        "name": "Potion de soins mineure"
      }
    ],
    "effect": "Accessoire : injecte automatiquement la potion lorsque le porteur tombe sous 20 % PV."
  },
  {
    "id": "prothesiste-04",
    "craft": "prothesiste",
    "rank": null,
    "name": "Placage crânien en plaques de fer de protection",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Plaques de fer"
      },
      {
        "qty": 1,
        "name": "Fil de soie"
      }
    ],
    "effect": "Prothèse crânienne : immunise aux coups assommants à la tête."
  },
  {
    "id": "prothesiste-05",
    "craft": "prothesiste",
    "rank": null,
    "name": "Oeil optique mécanique à lentille grossissante",
    "batch": null,
    "components": [
      {
        "qty": 1,
        "name": "Lentille"
      },
      {
        "qty": 1,
        "name": "Boîtier de fer"
      },
      {
        "qty": 1,
        "name": "Fil d'argent"
      }
    ],
    "effect": "Remplace un œil perdu : offre la vision nocturne et +1 aux jets de Perception."
  },
  {
    "id": "chimie-explosive-01",
    "craft": "chimie-explosive",
    "rank": null,
    "name": "Cartouche de poudre noire enrichie au nitre",
    "batch": 10,
    "components": [
      {
        "qty": 2,
        "name": "Poudres noires"
      },
      {
        "qty": 1,
        "name": "Nitre purifié"
      },
      {
        "qty": 1,
        "name": "Douille"
      }
    ],
    "effect": "Munitions d'arme à feu ; +2 points de dégâts de feu par tir."
  },
  {
    "id": "chimie-explosive-02",
    "craft": "chimie-explosive",
    "rank": null,
    "name": "Mine incendiaire à dispersion de naphte",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Boîtiers de fer"
      },
      {
        "qty": 2,
        "name": "Huiles incendiaires"
      }
    ],
    "effect": "Piège au sol : explose en une marre de feu continu pendant 3 tours."
  },
  {
    "id": "chimie-explosive-03",
    "craft": "chimie-explosive",
    "rank": null,
    "name": "Capsule d'acide nitrique pour tromblon",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Fioles d'acide"
      },
      {
        "qty": 1,
        "name": "Poudre noire"
      }
    ],
    "effect": "Munition : réduit la valeur d'armure de la cible de 1 point."
  },
  {
    "id": "chimie-explosive-04",
    "craft": "chimie-explosive",
    "rank": null,
    "name": "Grenade fumigène à phosphore aveuglant",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Phosphores"
      },
      {
        "qty": 1,
        "name": "Boîtier de fer"
      }
    ],
    "effect": "Zone (5m) : aveugle toutes les victimes et bloque la ligne de vue pendant 2 tours."
  },
  {
    "id": "chimie-explosive-05",
    "craft": "chimie-explosive",
    "rank": null,
    "name": "Poudre d'amorce Nitro haute vélocité",
    "batch": null,
    "components": [
      {
        "qty": 2,
        "name": "Poudres Nitro"
      },
      {
        "qty": 1,
        "name": "Poudre noire"
      }
    ],
    "effect": "Composant d'artisanat pour explosifs de rang 4+."
  },
  {
    "id": "charpenterie-marine-01",
    "craft": "charpenterie-marine",
    "rank": null,
    "name": "Barricade de fortification d'urgence démontable",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Bois-fer"
      },
      {
        "qty": 2,
        "name": "Crochets de fer"
      }
    ],
    "effect": "Déploie un couvert total contre les tirs à distance pour 2 personnes en 1 tour."
  },
  {
    "id": "charpenterie-marine-02",
    "craft": "charpenterie-marine",
    "rank": null,
    "name": "Bélier de démolition lourd à tête de bronze",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Bois durs"
      },
      {
        "qty": 2,
        "name": "Plaques de bronze"
      },
      {
        "qty": 4,
        "name": "Manches en bois"
      }
    ],
    "effect": "Outil de siège : enfonce les portes de donjon renforcées en 1 coup."
  },
  {
    "id": "charpenterie-marine-03",
    "craft": "charpenterie-marine",
    "rank": null,
    "name": "Béquille de stabilisation de navire/véhicule",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Bois d'épinette"
      },
      {
        "qty": 2,
        "name": "Pistons hydrauliques"
      }
    ],
    "effect": "Empêche un navire ou chariot de chavirer lors de tempêtes ou chocs."
  },
  {
    "id": "charpenterie-marine-04",
    "craft": "charpenterie-marine",
    "rank": null,
    "name": "Poutre de renforcement de plafond de donjon",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Bois-fer"
      }
    ],
    "effect": "Empêche les effondrements de pierre dans les galeries d'exploration."
  },
  {
    "id": "charpenterie-marine-05",
    "craft": "charpenterie-marine",
    "rank": null,
    "name": "Planche d'abordage à crampons d'acier",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Bois durs"
      },
      {
        "qty": 2,
        "name": "Crochets de fer"
      }
    ],
    "effect": "Permet de franchir un précipice ou un fossé de 5m en toute sécurité."
  },
  {
    "id": "tissage-ambre-01",
    "craft": "tissage-ambre",
    "rank": null,
    "name": "Tunique en soie de reine araignée",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Soies d'araignée géante"
      },
      {
        "qty": 2,
        "name": "Fils d'ambre"
      }
    ],
    "effect": "Armure +2 ; +1d6 en Agilité, immunise aux ralentissements et toiles."
  },
  {
    "id": "tissage-ambre-02",
    "craft": "tissage-ambre",
    "rank": null,
    "name": "Filet de capture en fil d'acier-soie",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Soies d'araignée"
      },
      {
        "qty": 2,
        "name": "Fils d'acier"
      }
    ],
    "effect": "Consommable de jet : incoupable par des armes tranchantes simples (Enracinement 2 tours)."
  },
  {
    "id": "tissage-ambre-03",
    "craft": "tissage-ambre",
    "rank": null,
    "name": "Cape d'ambre fossilisé protectrice",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Cuirs fins"
      },
      {
        "qty": 2,
        "name": "Poudres d'ambre pur"
      }
    ],
    "effect": "Armure +2 ; absorbe les 5 premiers dégâts d'acide reçus lors de chaque combat."
  },
  {
    "id": "tissage-ambre-04",
    "craft": "tissage-ambre",
    "rank": null,
    "name": "Gantelets de poigne adhésive en soie",
    "batch": null,
    "components": [
      {
        "qty": 3,
        "name": "Soies d'araignée"
      },
      {
        "qty": 1,
        "name": "Larmes d'ambre"
      }
    ],
    "effect": "Armure +1 ; empêche de lâcher ses armes ou de glisser sur les surfaces gelées."
  },
  {
    "id": "tissage-ambre-05",
    "craft": "tissage-ambre",
    "rank": null,
    "name": "Cocon de soins en soie d'araignée",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Soies d'araignée"
      },
      {
        "qty": 1,
        "name": "Baume anti-saignement"
      }
    ],
    "effect": "Consommable : enveloppe un allié au repos pour doubler sa vitesse de régénération."
  },
  {
    "id": "dracono-forge-01",
    "craft": "dracono-forge",
    "rank": null,
    "name": "Cuirasse en écailles de Dragon Noir de la Fournaise",
    "batch": null,
    "components": [
      {
        "qty": 8,
        "name": "Écailles de dragon noir"
      },
      {
        "qty": 4,
        "name": "Lingots de Thorium"
      },
      {
        "qty": 2,
        "name": "Cœurs de lave"
      }
    ],
    "effect": "Armure +5 ; immunité totale aux brûlures et dégâts de Souffle de dragon de Feu."
  },
  {
    "id": "dracono-forge-02",
    "craft": "dracono-forge",
    "rank": null,
    "name": "Lame d'estoc en os de Dragon Rouge",
    "batch": null,
    "components": [
      {
        "qty": 5,
        "name": "Os de dragon rouge"
      },
      {
        "qty": 2,
        "name": "Lingots d'Arcanite"
      },
      {
        "qty": 1,
        "name": "Essence de feu"
      }
    ],
    "effect": "Épée à 1 main ; déclenche des Succès Critiques sur un résultat de 5 ou 6."
  },
  {
    "id": "dracono-forge-03",
    "craft": "dracono-forge",
    "rank": null,
    "name": "Pavois en Écailles de Dragon Bleu arcanique",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Écailles de dragon bleu"
      },
      {
        "qty": 4,
        "name": "Lingots d'Arcanite"
      }
    ],
    "effect": "Armure +4 ; absorbe 50 % de tous les dégâts d'Arcane subis."
  },
  {
    "id": "dracono-forge-04",
    "craft": "dracono-forge",
    "rank": null,
    "name": "Gantelets à griffes de Dragon Vert",
    "batch": null,
    "components": [
      {
        "qty": 4,
        "name": "Os de dragon vert"
      },
      {
        "qty": 2,
        "name": "Cuirs légendaires"
      }
    ],
    "effect": "Armure +3 ; vos attaques à mains nues appliquent un poison de sommeil léger."
  },
  {
    "id": "dracono-forge-05",
    "craft": "dracono-forge",
    "rank": null,
    "name": "Heaume du Seigneur des Dragons d'Azeroth",
    "batch": null,
    "components": [
      {
        "qty": 6,
        "name": "Écailles de dragon ancestral"
      },
      {
        "qty": 2,
        "name": "Rubis parfaits"
      }
    ],
    "effect": "Armure +4 ; immunise à la Peur provoquée par les monstres géants et dragons."
  }
]

/** Le PDF, plus les patrons de composants maison. */
export const RECIPES: Recipe[] = [...PDF_RECIPES, ...COMPONENT_RECIPES]
