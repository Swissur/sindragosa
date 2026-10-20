// Généré depuis docs/regles/Compétences & Domaines (Sindragosa).pdf par une transcription assistée ; le catalogue prime désormais sur le PDF (voir CLAUDE.md).
import type { Ability } from './types'

export const ABILITIES: Ability[] = [
  {
    "id": 1,
    "name": "Attaque sournoise",
    "nameEn": "Backstab",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Agilité (Combat de précision)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Être positionné strictement dans le dos de la cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une frappe mortelle sous les côtes. Ajoute +2d6 aux dégâts de base et ignore la valeur de bouclier de la cible."
  },
  {
    "id": 2,
    "name": "Estropier",
    "nameEn": "Mutilate",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Dagues",
        "level": 1
      },
      {
        "kind": "domain",
        "id": "escamotage-crochetage",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision) + Spécialité Dagues (Lvl 1) + Agilité (Escamotage & Crochetage)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite de tenir deux dagues en main ET que la cible souffre déjà d'un saignement ou de poison.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Frappe instantanément avec les deux armes, infligeant les dégâts maximaux de votre arme de main gauche et appliquant un saignement lourd pour 2 tours."
  },
  {
    "id": 3,
    "name": "Poinçon sanglant",
    "nameEn": "Garrote",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Furtivité",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Spécialité Furtivité (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utilisable uniquement depuis l'état de Furtivité / Dissimulation.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Étrangle la cible par derrière. La cible est réduite au silence pour 1 tour et subit un dégât de saignement garanti au début de ses 3 prochains tours."
  },
  {
    "id": 4,
    "name": "Suriner",
    "nameEn": "Gouge",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision) + Domaine Tactique & Analyse",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit être face à vous. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Blesse les yeux de l'adversaire. La cible est Incapable pendant 1 tour. Tout dégât direct subi par la cible rompt immédiatement cet effet."
  },
  {
    "id": 5,
    "name": "Volée de lames",
    "nameEn": "Fan of Knives",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Lancer de Shurikens/Dagues",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer) + Spécialité Lancer de Shurikens/Dagues (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Être entouré d'au moins 2 ennemis à moins de 3 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Projette des lames dans toutes les directions. Effectue un jet d'attaque global infligeant des dégâts physiques légers à tous les ennemis proches."
  },
  {
    "id": 6,
    "name": "Heurt de bouclier",
    "nameEn": "Shield Slam",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Bouclier",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine) + Spécialité Bouclier (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir bloqué ou paré une attaque au tour précédent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Assène un coup lourd avec le tranchant du bouclier. Inflige des dégâts basés sur votre armure et dissipe 1 effet magique bénéfique sur la cible."
  },
  {
    "id": 7,
    "name": "Vengeance",
    "nameEn": "Revenge",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine) + Endurance (Résistance physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'active uniquement immédiatement après avoir esquivé ou paré un coup.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Balaye largement avec votre arme. Inflige des dégâts physiques à jusqu'à 2 cibles devant vous sans consommer d'énergie."
  },
  {
    "id": 8,
    "name": "Ivresse du combat",
    "nameEn": "Victory Rush",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme) + Endurance (Volonté & Récupération)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'active uniquement dans le tour qui suit l'élimination d'un ennemi donnant de l'expérience.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Un coup de grâce victorieux qui inflige des dégâts moyens et vous rend immédiatement 20 % de vos Points de Vie maximaux."
  },
  {
    "id": 9,
    "name": "Onde de choc",
    "nameEn": "Shockwave",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Masses",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine) + Force (Intimidation physique) + Spécialité Masses (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "effect": "Frappe le sol de toutes vos forces. Envoie une onde de choc en cône devant vous, assommant (Étourdissement) tous les ennemis touchés pendant 1 tour."
  },
  {
    "id": 10,
    "name": "Renvoi de sort",
    "nameEn": "Spell Reflection",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures) + Sagesse (Perception & Sens)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Poste de réaction)",
    "condition": "Nécessite un bouclier ou une arme à deux mains. Utilisable 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Vous levez votre garde contre un sort direct dirigé contre vous. Le sort est annulé et renvoyé instantanément à son lanceur.",
    "notes": "'Action Rapide (Poste de réaction)' mapped to reaction."
  },
  {
    "id": 11,
    "name": "Mur protecteur",
    "nameEn": "Shield Wall",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures) + Endurance (Résistance physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite un bouclier équipé. Utilisable 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Réduit tous les dégâts physiques et magiques subis de 50 % pendant 2 tours. Votre vitesse de déplacement est réduite de moitié pendant cette durée."
  },
  {
    "id": 12,
    "name": "Témérité",
    "nameEn": "Recklessness",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Intimidation physique) + Charisme (Commandement & Inspiration)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Vos PV doivent être inférieurs à 50 %.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous entrez dans une fureur incontrôlable. Pendant 2 tours, toutes vos attaques réussies sont converties en Succès Critiques, mais votre valeur d'armure tombe à 0."
  },
  {
    "id": 13,
    "name": "Tir traqueur",
    "nameEn": "Marked Shot",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer) + Sagesse (Perception & Sens)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être sous l'effet de votre capacité de Pistage ou de Marque du Chasseur.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Décoche une flèche d'une précision mortelle. Ajoute +1d6 au jet de touche et révèle la cible à travers les obstacles ou le camouflage pendant 3 tours.",
    "notes": "Source reads 'Type d'activation' (OCR), read as Type d'action."
  },
  {
    "id": 14,
    "name": "Tir dispersif",
    "nameEn": "Scatter Shot",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer) + Agilité (Acrobatie & Furtivité)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit se trouver à moins de 3 mètres de vous. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Un tir à bout portant qui inflige de légers dégâts et désoriente la cible pendant 1 tour, annulant son attaque en cours et vous permettant de vous reculer sans provoquer d'attaque d'opportunité."
  },
  {
    "id": 15,
    "name": "Envenimer",
    "nameEn": "Envenom",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Poisons",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision) + Intelligence (Alchimie & Herboristerie) + Spécialité Poisons (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite qu'au moins 2 doses de poison soient appliquées sur la cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Consomme les poisons présents sur l'ennemi pour faire injecter une dose massive. Inflige des dégâts de nature instantanés basés sur le nombre de doses consommées."
  },
  {
    "id": 16,
    "name": "Tir de la chimère",
    "nameEn": "Chimera Shot",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer) + Intelligence (Alchimie & Herboristerie)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Tire une flèche infusée d'une double toxine. Frappe la cible principale et rebondit sur une seconde cible à proximité, infligeant des dégâts de nature à la première et de givre à la seconde."
  },
  {
    "id": 17,
    "name": "Volée de flèches",
    "nameEn": "Volley",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer) + Domaine Tactique & Analyse",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une ligne de vue dégagée sur une zone circulaire de 5 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Fait pleuvoir une rafale de flèches sur la zone ciblée pendant 1 tour. Tous les ennemis dans la zone subissent des dégâts physiques et sont ralentis de 30 %."
  },
  {
    "id": 18,
    "name": "Dissimulation dans l'ombre",
    "nameEn": "Shadowmeld",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Discrétion dans l'ombre",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Spécialité Discrétion dans l'ombre (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Rester parfaitement immobile.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous fondez instantanément dans le décor. Annule toutes les menaces directes sur vous. L'effet prend fin dès que vous vous déplacez ou effectuez une action."
  },
  {
    "id": 19,
    "name": "Camouflage d'esprit",
    "nameEn": "Camouflage",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Endurance (Survie en milieu hostile)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Doit être activé hors de la portée de vue directe des ennemis.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous drapez d'un manteau végétal ou rocheux. Tant que vous vous déplacez à mi-vitesse en milieu naturel, vous êtes indétectable à plus de 5 mètres."
  },
  {
    "id": 20,
    "name": "Charge fulgurante",
    "nameEn": "Charge",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme) + Force (Mêlée bourrine)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit se trouver entre 6 et 15 mètres de vous, sur un terrain dégagé.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous précipitez à une vitesse folle sur l'ennemi. Immobilise la cible pendant 1 tour et vous génère un bonus de +1d6 sur votre prochaine attaque physique dans le même tour."
  },
  {
    "id": 21,
    "name": "Interception",
    "nameEn": "Intervene",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme) + Charisme (Commandement & Inspiration)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Un allié à moins de 8 mètres doit être ciblé par une attaque physique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous courez vous interposer. Vous subissez la frappe à la place de l'allié en appliquant votre propre valeur d'armure."
  },
  {
    "id": 22,
    "name": "Déchirement",
    "nameEn": "Rend",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Tranchant (Haches/Épées)",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine) + Spécialité Tranchant (Haches/Épées) (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une arme tranchante.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Entaille profondément la chair de l'ennemi. Inflige des dégâts légers et applique un saignement qui inflige des dégâts continus ignorant l'armure pendant 3 tours."
  },
  {
    "id": 23,
    "name": "Coup bas",
    "nameEn": "Cheap Shot",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "escamotage-crochetage",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Agilité (Escamotage & Crochetage)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utilisable uniquement depuis la Furtivité.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une frappe déloyale au niveau des reins. Assomme la cible (Étourdissement) pendant 2 tours sans infliger de dégâts majeurs."
  },
  {
    "id": 24,
    "name": "Aiguillon perfide",
    "nameEn": "Kidney Shot",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Dagues/Lutte",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision) + Spécialité Dagues/Lutte (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir porté au moins une attaque réussie lors du tour précédent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Un coup vicieux ciblant les organes vitaux. Étourdit la cible pour 1 tour et augmente les dégâts qu'elle subit de toutes les sources de +1 par dé pendant cette durée."
  },
  {
    "id": 25,
    "name": "Pression mortelle",
    "nameEn": "Mortal Strike",
    "category": "Voies offensives",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Armes à deux mains",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine) + Domaine Tactique & Analyse + Spécialité Armes à deux mains (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Une frappe de spécialiste qui cause de lourds dégâts physiques et réduit l'efficacité de tous les soins reçus par la cible de 50 % pendant 2 tours."
  },
  {
    "id": 26,
    "name": "Second souffle",
    "nameEn": "Second Wind",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Second souffle",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Spécialité Second souffle (Lvl 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche automatiquement si vous n'avez subi aucun dégât pendant 1 tour complet.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous récupérez progressivement 5 % de votre total de Points de Vie au début de chaque tour où vous ne subissez pas d'attaque."
  },
  {
    "id": 27,
    "name": "Rage régénérante",
    "nameEn": "Enraged Regeneration",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Force (Intimidation physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Vos PV doivent être sous le seuil des 30 %. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Votre fureur stoppe l'hémorragie. Vous récupérez immédiatement 20 % de vos PV maximaux et vos compétences de mêlée génèrent le double de menace."
  },
  {
    "id": 28,
    "name": "Peau de fer",
    "nameEn": "Ironbark / Barkskin Advanced",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique) + Sagesse (Communion naturelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Endurcit la chair d'un allié ou de vous-même. Réduit tous les dégâts subis de 20 % et empêche les attaques d'interrompre le lancement de sorts pendant 2 tours."
  },
  {
    "id": 29,
    "name": "Feinte",
    "nameEn": "Feint",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Combat de précision) Rang 1 + Charisme (Tromperie & Discipline) Rang 1",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Portée : Mêlée",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Exécutez un mouvement trompeur pour désorienter votre cible. Lors de votre prochaine attaque au cours du même tour, vous ignorez la capacité de Parade ou de Blocage de l'adversaire.",
    "notes": "'Acrobatie & Combat de précision' split into two prereqs; 'Tromperie & Discipline' mapped to tromperie-comedie; no Condition d'activation, Portée used."
  },
  {
    "id": 30,
    "name": "Esquive miraculeuse",
    "nameEn": "Evasion",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Esquive",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Spécialité Esquive (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Vos réflexes deviennent surhumains. Pendant 1 tour complet, augmente votre chance d'esquiver les attaques de mêlée de +3d6."
  },
  {
    "id": 31,
    "name": "Cape d'ombre",
    "nameEn": "Cloak of Shadows",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité) + Charisme (Magie de l'Ombre & Fél) + Endurance (Tolérance aux toxines)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 1,
    "effect": "Vous vous enveloppez d'un voile d'ombre. Dissipe instantanément tous les effets magiques, malédictions et poisons néfastes qui vous affectent et vous rend inciblable par les sorts pendant 1 tour."
  },
  {
    "id": 32,
    "name": "Anti-toxine de terrain",
    "nameEn": "Anti-venom",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines) + Sagesse (Médecine & Soins)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite d'avoir une trousse de soins ou des fioles neutres à portée de main.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Neutralise immédiatement 1 poison ou une maladie d'origine naturelle sur vous-même ou un allié adjacent."
  },
  {
    "id": 33,
    "name": "Conversion de sang",
    "nameEn": "Blood Tap",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Charisme (Magie de l'Ombre & Fél)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 10 % de vos PV actuels.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Sacrifie une portion de votre vitalité pour recharger immédiatement votre ressource principale (Mana, Énergie ou Rage)."
  },
  {
    "id": 34,
    "name": "Volonté des Réprouvés",
    "nameEn": "Will of the Forsaken",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Sagesse (Volonté spirituelle)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Être affecté par un effet de Peur, de Sommeil ou de Charme.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous brisez instantanément l'emprise mentale subie. Vous devenez immunisé à ces mêmes effets pour le restant du tour."
  },
  {
    "id": 35,
    "name": "Dissuasion",
    "nameEn": "Deterrence / Aspect of the Turtle",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique) + Agilité (Combat de précision)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite de tenir une arme en main. Utilisable 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Vous faites mouliner votre arme à une vitesse folle. Pare toutes les attaques de mêlée et dévie les projectiles tirés de face pendant 1 tour, mais vous empêche d'attaquer."
  },
  {
    "id": 36,
    "name": "Posture défensive",
    "nameEn": "Defensive Stance",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures) + Endurance (Résistance physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide (Changement de posture)",
    "condition": "Ne peut pas être combiné avec une posture offensive.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit tous les dégâts subis de 20 %, mais réduit également tous les dégâts physiques que vous infligez de 10 %."
  },
  {
    "id": 37,
    "name": "Totem de peau de pierre",
    "nameEn": "Stoneskin Totem",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique) + Sagesse (Communion naturelle)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Planté au sol (portée fixe de 8 mètres autour du totem).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Invoque un totem de terre qui augmente l'armure physique de tous les alliés situés dans la zone d'effet d'un montant fixe."
  },
  {
    "id": 38,
    "name": "Sol béni",
    "nameEn": "Consecration",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures) + Sagesse (Magie divine & Sacrée)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Vous devez vous tenir au centre de la zone d'activation.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Sanctifie le sol sous vos pieds sur 3 mètres de rayon pendant 2 tours. Tous les ennemis dans la zone subissent des dégâts du Sacré continus et vous gagnez +1d6 en défense tant que vous y restez."
  },
  {
    "id": 39,
    "name": "Bouclier saint",
    "nameEn": "Sacred Shield",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Sagesse (Magie divine & Sacrée)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit être sous la barre des 50 % de PV. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Entoure la cible d'un bouclier de Lumière qui absorbe un montant fixe de dégâts lors de la prochaine attaque subie."
  },
  {
    "id": 40,
    "name": "Dernier rempart",
    "nameEn": "Last Stand",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique) + Force (Intimidation physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Vos PV doivent être inférieurs à 20 %. Utilisable 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Vous augmentez temporairement votre santé maximale de 30 % pendant 2 tours. À la fin de l'effet, les PV temporaires sont perdus."
  },
  {
    "id": 41,
    "name": "Présence de sang",
    "nameEn": "Blood Presence",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique) + Charisme (Magie de l'Ombre & Fél)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura)",
    "condition": "Être en état de combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Convertit 10 % de tous les dégâts physiques directs que vous infligez en soins personnels instantanés."
  },
  {
    "id": 42,
    "name": "Forme d'ours",
    "nameEn": "Bear Form",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle) + Endurance (Résistance physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite d'avoir les mains libres de tout objet magique lourd.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous vous métamorphosez en ours. Augmente vos PV maximaux et votre armure de +50 %, mais vous empêche d'utiliser des outils ou de lancer des sorts humains.",
    "alternatePrerequisites": [
      {
        "kind": "specialty",
        "name": "Forme animale",
        "level": 1
      }
    ],
    "notes": "Débloquée aussi par la spécialité Forme animale, qui donne en même temps la Forme de félin (décidé le 2026-10-19, plans/39)."
  },
  {
    "id": 43,
    "name": "Instinct de survie",
    "nameEn": "Survival Instincts",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Survie en milieu hostile) + Sagesse (Perception & Sens)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Ne fonctionne qu'en Forme d'Ours ou de Chat. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Réduit tous les dégâts subis de 50 % pendant 1 tour complet."
  },
  {
    "id": 44,
    "name": "Camouflage d'écorce",
    "nameEn": "Symbiosis - Bark",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Survie en milieu hostile) + Agilité (Acrobatie & Furtivité)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se trouver dans une forêt, une jungle ou un milieu naturel dense.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous bénéficiez d'un bonus permanent de +1d6 à tous vos tests de Furtivité et de Résistance physique tant que vous combattez en milieu naturel."
  },
  {
    "id": 45,
    "name": "Sang vampirique",
    "nameEn": "Vampiric Blood",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération) + Charisme (Magie de l'Ombre & Fél) + Domaine Médecine & Soins",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Amplifie votre système sanguin. Augmente tous les soins que vous recevez de 50 % pendant 2 tours."
  },
  {
    "id": 46,
    "name": "Déflagration d'Arcane",
    "nameEn": "Arcane Blast",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Sorts d'Arcane",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Spécialité Sorts d'Arcane (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Chaque lancer consécutif augmente son coût en mana de 50 %.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Frappe la cible avec de la magie brute. Chaque lancer consécutif réussi ajoute +1d6 de dégâts supplémentaires (cumulable jusqu'à 3 fois)."
  },
  {
    "id": 47,
    "name": "Déplacement",
    "nameEn": "Displacement",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Téléportation",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Spécialité Téléportation (Lvl 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Doit être utilisé dans les 2 tours suivant le lancement du sort Transfert.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous re-téléporte instantanément à la position exacte où vous vous trouviez avant de lancer votre dernier Transfert."
  },
  {
    "id": 48,
    "name": "Barrière de glace",
    "nameEn": "Ice Barrier",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Domaine Résistance physique",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Invoque un bouclier de givre qui absorbe un montant fixe de dégâts. Tant que le bouclier est actif, les attaquants en mêlée sont ralentis de 30 %."
  },
  {
    "id": 49,
    "name": "Ingestion d'élixir",
    "nameEn": "Potion Absorption",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie) + Endurance (Tolérance aux toxines)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite de consommer une potion d'Alchimie.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous digérez instantanément l'élixir : vous bénéficiez de ses effets au double de sa valeur normale pendant 1 tour."
  },
  {
    "id": 50,
    "name": "Détonation de Poudre",
    "nameEn": "Gunpowder Burst",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Explosifs",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie) + Spécialité Explosifs (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir une charge explosive dans votre inventaire.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Lance une bombe à retardement. Éclate après 1 tour, infligeant de lourds dégâts de feu dans une zone de 3 mètres et aveuglant les cibles pour 1 tour."
  },
  {
    "id": 51,
    "name": "Rétro-conception",
    "nameEn": "Reverse Engineering",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie) + Domaine Tactique & Analyse",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Analyser un mécanisme ou un piège mécanique déclenché ou désarmé.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous identifiez la faille. Vous gagnez +2d6 pour désamorcer ou réutiliser tous les pièges de même catégorie pour le reste de la séance."
  },
  {
    "id": 52,
    "name": "Nova de givre",
    "nameEn": "Frost Nova",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Domaine Perception & Sens",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Une onde de froid éclate autour de vous (3m de rayon). Tous les ennemis proches sont Enracinés sur place par la glace pendant 1 tour."
  },
  {
    "id": 53,
    "name": "Veines de glace",
    "nameEn": "Icy Veins",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Endurance (Volonté & Récupération)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 1,
    "effect": "Le sang froid coule dans vos veines. Vos temps d'incantation sont réduits de moitié et vous devenez totalement immunisé aux retards d'incantation causés par les coups subis pendant 2 tours."
  },
  {
    "id": 54,
    "name": "Combustion",
    "nameEn": "Combustion",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Sorts de Feu",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Domaine Tactique & Analyse + Spécialité Sorts de Feu (Lvl 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous vous enflammez de puissance. Pendant 1 tour, tous vos sorts de dégâts de Feu réussis déclenchent automatiquement des Succès Critiques."
  },
  {
    "id": 55,
    "name": "Choc de flammes",
    "nameEn": "Flamestrike",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Sorts de Feu",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Spécialité Sorts de Feu (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une canalisation d'un tour complet ou un déclenchement préparé.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Fait surgir une colonne de feu au sol. Inflige des dégâts de feu de zone et laisse une zone brûlante au sol qui blesse quiconque y pénètre pendant 2 tours."
  },
  {
    "id": 56,
    "name": "Implosion d'Ombre-flamme",
    "nameEn": "Shadowflame",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Charisme (Magie de l'Ombre & Fél)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être affectée à la fois par une brûlure et une malédiction.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Fait exploser les afflictions sur la cible. Consomme les effets négatifs pour infliger des dégâts hybrides Ombre/Feu extrêmement violents."
  },
  {
    "id": 57,
    "name": "Rayon rétricisseur",
    "nameEn": "Shrink Ray",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Bricolage Goblino-Gnome",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie) + Spécialité Bricolage Goblino-Gnome (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite l'outil Rayon Réducteur Gnomique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vise un ennemi pour réduire sa taille. La cible subit un malus de -2d6 à tous ses jets de Force et inflige 50 % de dégâts de moins pendant 2 tours. (Risque de contrecoup : 1 sur 6 de vous rétrécir vous-même !)"
  },
  {
    "id": 58,
    "name": "Botte à ressorts",
    "nameEn": "Spring Shoes",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie) + Agilité (Acrobatie & Furtivité)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Doit être utilisé lors d'un déplacement.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous effectuez un bond mécanique impressionnant de 10 mètres par-dessus des obstacles ou des ennemis sans déclencher d'attaques d'opportunité."
  },
  {
    "id": 59,
    "name": "Transmutation de matière",
    "nameEn": "Transmutation",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie) + Intelligence (Magie profane & Arcanes)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Nécessite un laboratoire d'alchimie ou des composants rares.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Convertit un minerai ou un composant classique en une version de qualité supérieure (ex: Fer en Or, ou Fleur commune en Lotus d'Arthanas)."
  },
  {
    "id": 60,
    "name": "Analyse des failles",
    "nameEn": "Analyze Weakness",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Tactique & Analyse) + Sagesse (Perception & Sens)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Observer une cible pendant au moins 1 tour sans attaquer.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Révèle le point faible de l'ennemi à tout le groupe. La prochaine attaque portée par n'importe quel allié contre cette cible gagne +1d6 au jet de touche."
  },
  {
    "id": 61,
    "name": "Altération temporelle",
    "nameEn": "Alter Time",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Chronomancie",
        "level": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Spécialité Chronomancie (Lvl 1) + Sagesse (Perception & Sens)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Marque votre état physique à l'instant T. Utilisable 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 1,
    "effect": "Vous enregistrez vos PV et votre position actuelle. Si vous réactivez le sort dans les 2 tours, vous retournez instantanément à cet état exact, effaçant les dégâts subis entre-temps."
  },
  {
    "id": 62,
    "name": "Potion de sommeil léger",
    "nameEn": "Sleeping Potion",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie) + Sagesse (Médecine & Soins)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "S'administre au contact ou jetée sur une cible hors de combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Plonge une cible humanoïde sans défense ou surprise dans un sommeil magique profond pendant 1 heure."
  },
  {
    "id": 63,
    "name": "Bombe à fragmentation",
    "nameEn": "Cluster Bomb",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie) + Force (Mêlée bourrine)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'être lancée à plus de 5 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Lance un obus qui se sépare en 3 sous-munitions. Inflige des dégâts de feu et fait tomber à terre (A terre) les cibles touchées dans une large zone."
  },
  {
    "id": 64,
    "name": "Distorsion Spatiale",
    "nameEn": "Blink Step",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes) + Agilité (Acrobatie & Furtivité)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche lors de l'utilisation du sort Transfert.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Laisse un leurre de miroirs d'arcanes à votre position de départ qui attire la première attaque ennemie subie."
  },
  {
    "id": 65,
    "name": "Décodage runique",
    "nameEn": "Rune Decipher",
    "category": "Voies arcaniques, technomancie & érudition",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "histoire-geographie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Histoire & Géographie) + Intelligence (Magie profane & Arcanes)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite la présence de runes Titans, Elfiques ou Démoniaques.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous déchiffrez les lignes de pouvoir d'un glyphe ou d'un portail, permettant de désactiver ou d'activer le mécanisme sans déclencher son piège magique."
  },
  {
    "id": 66,
    "name": "Lumière du Sacré",
    "nameEn": "Holy Light",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Soins Sacrés",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Spécialité Soins Sacrés (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Demande un temps d'incantation ininterrompu.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Canalyse la Lumière pour prodiguer un soin massif sur une cible unique à portée de vue."
  },
  {
    "id": 67,
    "name": "Mots de pouvoir : Bouclier",
    "nameEn": "Power Word: Shield",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible ne doit pas être déjà sous l'effet de la Lassitude de l'Âme (2 tours d'attente par cible).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Absorbe instantanément un montant fixe de dégâts sur un allié. L'allié gagne +2 mètres de déplacement tant que le bouclier persiste."
  },
  {
    "id": 68,
    "name": "Châtiment",
    "nameEn": "Smite",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Charisme (Persuasion & Diplomatie)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Inflige des dégâts du Sacré à l'ennemi et réduit les dégâts infligés par la prochaine attaque de cet ennemi d'un montant fixe."
  },
  {
    "id": 69,
    "name": "Totem de courroux de l'air",
    "nameEn": "Windfury Totem",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Force (Mêlée bourrine)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posé au sol (portée de 5 mètres).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Infuse les armes des alliés proches de la fureur du vent. Chaque attaque de mêlée réussie a 20 % de chances de déclencher immédiatement une seconde attaque gratuite."
  },
  {
    "id": 70,
    "name": "Horion de feu",
    "nameEn": "Flame Shock",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Agilité (Tir & Lancer)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Brûle l'ennemi avec des éléments incandescents. Inflige des dégâts de feu légers instantanés et applique une brûlure continue pour 3 tours."
  },
  {
    "id": 71,
    "name": "Horion de givre",
    "nameEn": "Frost Shock",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Domaine Perception & Sens",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Glace le sang de l'ennemi. Inflige des dégâts de givre instantanés et réduit la vitesse de déplacement de la cible de 50 % pendant 2 tours."
  },
  {
    "id": 72,
    "name": "Éclat lunaire",
    "nameEn": "Moonfire",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Domaine Perception & Sens",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable uniquement sous Forme Humanoïde ou d'Abo-lunaire (Satyre/Chouette).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Un rayon de lumière lunaire frappe la cible d'en haut. Inflige des dégâts d'Arcane/Nature instantanés et révèle les cibles camouflées."
  },
  {
    "id": 73,
    "name": "Rétablissement",
    "nameEn": "Regrowth",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Sagesse (Médecine & Soins)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Ne peut pas être relancé sur une cible bénéficiant déjà de son effet de soin continu.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Prodige un soin instantané moyen, suivi d'une régénération de PV au début des 3 prochains tours de la cible."
  },
  {
    "id": 74,
    "name": "Guérison des maladies",
    "nameEn": "Cure Disease",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Médecine & Soins) + Sagesse (Magie divine & Sacrée)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'être au contact de la cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Éradique totalement 1 maladie ou infection magique (ex: Peste de la Non-mort) du corps d'un personnage."
  },
  {
    "id": 75,
    "name": "Imposition des mains",
    "nameEn": "Lay on Hands",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Endurance (Volonté & Récupération) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Vide intégralement votre réserve de mana/ressource divine. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 1,
    "effect": "Touche un allié au bord de la mort et restaure instantanément la totalité de ses Points de Vie maximaux."
  },
  {
    "id": 76,
    "name": "Purification des esprits",
    "nameEn": "Cleanse Spirit",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un allié souffrant d'une malédiction ou d'un envoûtement.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Dissipe 1 effet de malédiction ou 1 altération d'esprit élémentaire affectant la cible."
  },
  {
    "id": 77,
    "name": "Esprit du loup",
    "nameEn": "Ghost Wolf",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Agilité (Acrobatie & Furtivité)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable uniquement hors de combat ou en extérieur.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous vous métamorphosez en loup spectral. Votre vitesse de déplacement est augmentée de 30 % et votre vitesse ne peut pas être réduite sous sa valeur normale."
  },
  {
    "id": 78,
    "name": "Grâce du marcheur d'esprit",
    "nameEn": "Spiritwalker's Grace",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous vous liez aux esprits ancêtres. Pendant 1 tour, vous pouvez lancer des sorts nécessitant une incantation tout en continuant à vous déplacer librement."
  },
  {
    "id": 79,
    "name": "Colère de la nature",
    "nameEn": "Wrath",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Magie de la Nature",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Spécialité Magie de la Nature (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une ligne de vue directe sur l'ennemi.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Projette une boule d'énergie solaire/naturelle. Inflige des dégâts de nature et augmente les dégâts de votre prochain sort de Feu stellaire."
  },
  {
    "id": 80,
    "name": "Sarments",
    "nameEn": "Entangling Roots",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Domaine Survie en milieu hostile",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit toucher le sol (inopérant sur les cibles volantes).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Fait surgir des ronces du sol qui immobilisent (Enracinement) la cible et lui infligent des dégâts de nature légers chaque tour. Tout dégât direct important reçu brise les sarments."
  },
  {
    "id": 81,
    "name": "Tranquillité",
    "nameEn": "Tranquility",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Sagesse (Médecine & Soins) + Sagesse (Volonté spirituelle)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "Vous devez rester immobile pendant toute la durée de la canalisation. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 1,
    "effect": "Une pluie de lumière naturelle régénère massivement les PV de tous les alliés dans un rayon de 10 mètres à la fin de votre tour."
  },
  {
    "id": 82,
    "name": "Écrasement sacré",
    "nameEn": "Holy Shock",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Agilité (Combat de précision)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Un éclair de lumière instantané. S'il vise un ennemi, inflige des dégâts du Sacré ; s'il vise un allié, soigne instantanément la cible."
  },
  {
    "id": 83,
    "name": "Bénédiction de liberté",
    "nameEn": "Blessing of Freedom",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Agilité (Acrobatie & Furtivité)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "L'allié doit être entravé par un ralentissement ou un enracinement.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Accorde à la cible une immunité totale contre tous les effets de ralentissement et d'entrave au déplacement pendant 2 tours."
  },
  {
    "id": 84,
    "name": "Bénédiction de protection",
    "nameEn": "Blessing of Protection / BoP",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée) + Force (Maîtrise des armures)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 1,
    "effect": "Place un bouclier de Lumière physique sur un allié. La cible devient totalement immunisée à tous les dégâts physiques pendant 1 tour, mais ne peut pas porter d'attaques physiques pendant cette durée."
  },
  {
    "id": 85,
    "name": "Apaisement",
    "nameEn": "Soothe",
    "category": "Voies divines, spirituelles & naturelles",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme) + Charisme (Persuasion & Diplomatie)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit être sous l'effet d'un état de Rage ou de Fureur.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Calme instantanément les esprits d'une bête ou d'un monstre furieux, annulant ses bonus d'attaque furieuse et stoppant sa charge."
  },
  {
    "id": 86,
    "name": "Trait d'ombre",
    "nameEn": "Shadow Bolt",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Sorts d'Ombre",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Spécialité Sorts d'Ombre (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une canalisation courte.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Projette une volée de magie du Vide. Inflige des dégâts d'Ombre et applique une marque qui augmente de +1 les dégâts de vos prochains sorts de malédiction."
  },
  {
    "id": 87,
    "name": "Douleur maudite",
    "nameEn": "Shadow Word: Pain",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Limité à 3 cibles simultanées maximum.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Murmure des mots d'agonie dans l'esprit de l'ennemi. Inflige des dégâts d'Ombre instantanés légers, puis des dégâts mentaux continus au début des 3 prochains tours de la cible."
  },
  {
    "id": 88,
    "name": "Peur panique",
    "nameEn": "Fear",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Force (Intimidation physique)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit avoir un niveau mental/volonté inférieur au vôtre.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Inculque une terreur absolue. La cible s'enfuit en hurlant (Peur) dans une direction aléatoire pendant 1 tour. Tout dégât direct réveille la cible."
  },
  {
    "id": 89,
    "name": "Cri de ralliement",
    "nameEn": "Rallying Cry",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration) + Force (Intimidation physique)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Un rugissement héroïque qui accorde temporairement +15 % de PV maximaux à tous les alliés situés à moins de 10 mètres pendant 2 tours."
  },
  {
    "id": 90,
    "name": "Aura de dévotion",
    "nameEn": "Devotion Aura",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration) + Force (Maîtrise des armures)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura)",
    "condition": "Rester conscient et debout.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre seule présence rassurante augmente la valeur d'armure physique de tous les alliés à moins de 5 mètres d'un montant fixe."
  },
  {
    "id": 91,
    "name": "Vol de vie",
    "nameEn": "Drain Life",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Endurance (Volonté & Récupération)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "Nécessite de maintenir la canalisation sans subir de contrôle.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Siphon la vitalité de l'ennemi. Inflige des dégâts d'Ombre chaque tour et vous soigne d'un montant égal à 50 % des dégâts infligés."
  },
  {
    "id": 92,
    "name": "Ingestion d'âme",
    "nameEn": "Drain Soul",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Intelligence (Tactique & Analyse)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "La cible doit être sous la barre des 20 % de PV.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Tord l'esprit d'une cible agonisante. Si la cible meurt pendant la canalisation, vous générez un Éclat d'Âme (composant magique rare)."
  },
  {
    "id": 93,
    "name": "Hurlement psychique",
    "nameEn": "Psychic Scream",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Charisme (Tromperie & Comédie)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Émet une onde de choc mentale terrifiante autour de vous. Fait fuir de terreur (Peur) jusqu'à 3 ennemis proches pendant 1 tour."
  },
  {
    "id": 94,
    "name": "Séduction démocrate",
    "nameEn": "Seduction",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie) + Charisme (Tromperie & Comédie)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un humanoïde hors de combat ou non-agressif.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Charme un ennemi humanoïde. La cible est incapable d'agir ou d'attaquer pendant 2 tours tant qu'elle ne subit aucun dégât."
  },
  {
    "id": 95,
    "name": "Bénédiction de puissance",
    "nameEn": "Blessing of Might",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration) + Force (Mêlée bourrine)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Un seul allié peut bénéficier de votre bénédiction à la fois.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Infuse la force du héros dans les bras d'un allié. Augmente les dégâts physiques de ses attaques de mêlée de +1 par dé pendant 3 tours."
  },
  {
    "id": 96,
    "name": "Bannissement",
    "nameEn": "Banish",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Intelligence (Magie profane & Arcanes) + Domaine Volonté spirituelle",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler uniquement un Démon, un Élémentaire ou une Aberration.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Expulse temporairement la cible dans une poche dimensionnelle. La cible est totalement Invulnérable mais Incapable d'agir pendant 2 tours."
  },
  {
    "id": 97,
    "name": "Usurpation d'identité",
    "nameEn": "Disguise / Identity Theft",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie) + Agilité (Acrobatie & Furtivité)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Nécessite d'avoir observé la cible ou de posséder ses vêtements.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous déguisez parfaitement en un membre d'une faction ennemie. Vous gagnez +2d6 à tous vos tests de tromperie pour passer inaperçu parmi eux."
  },
  {
    "id": 98,
    "name": "Négociation agressive",
    "nameEn": "Hard Bargain",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce) + Force (Intimidation physique)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "Face à un marchand, un usurier ou un PNJ réticent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous utilisez votre carrure pour plier les prix. Réduit les coûts d'achat de 25 % ou augmente les récompenses de quêtes de 20 % par la contrainte."
  },
  {
    "id": 99,
    "name": "Simulation de mort",
    "nameEn": "Feign Death",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie) + Agilité (Acrobatie & Furtivité)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "S'effondrer au sol immédiatement après avoir subi un coup.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous laissez tomber au sol, simulant une mort instantanée. Tous les ennemis cessent immédiatement de vous cibler et redirigent leur menace sur vos alliés."
  },
  {
    "id": 100,
    "name": "Pacte du Fél",
    "nameEn": "Dark Pact",
    "category": "Voies d'ombre, fél, commandement & tromperie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél) + Endurance (Volonté & Récupération) + Sagesse (Volonté spirituelle)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Invoque un sacrifice sur un familier ou réduit votre propre réserve de PV de 20 %. Utilisable 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 1,
    "effect": "Convertit immédiatement la santé sacrifiée en un bouclier impénétrable d'Ombre égal à 200 % des PV sacrifiés pendant 2 tours."
  },
  {
    "id": 101,
    "name": "Tempête d'acier",
    "nameEn": "Bladestorm",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Armes à deux mains",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Avancé Ivresse du Combat (Rang 2) + Spécialité Armes à deux mains (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Durée : 2 tours)",
    "condition": "Nécessite une arme lourde à deux mains. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Vous devenez une toupie de mort ambulante. Pendant 2 tours, vous effectuez une attaque automatique sur tous les ennemis à moins de 3 mètres au début de votre tour. Vous êtes totalement immunisé aux contrôles de foule (Peur, Étourdissement, Immobilisation) pendant la durée."
  },
  {
    "id": 102,
    "name": "Siphon d'âme du massacreur",
    "nameEn": "Soul Reaper",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Exécution",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2) + Spécialité Exécution (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être sous les 35 % de PV. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Inflige de lourds dégâts physiques et applique une marque d'Ombre. Si la cible ne meurt pas dans le tour, la marque éclate au tour suivant, infligeant d'immenses dégâts d'Ombre supplémentaires et vous octroyant +30 % de vitesse de déplacement."
  },
  {
    "id": 103,
    "name": "Bond héroïque",
    "nameEn": "Heroic Leap",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "tactique-choc",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Domaine Avancé Tactique de Choc (Rang 1) + Agilité (Acrobatie & Furtivité Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler une zone au sol entre 8 et 18 mètres. Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "effect": "Vous vous projetez dans les airs et retampez violemment le sol à destination. Inflige des dégâts physiques de zone à l'atterrissage, réinitialise le temps de recharge de Charge et vous libère de tout enracinement."
  },
  {
    "id": 104,
    "name": "Poigne de la Mort",
    "nameEn": "Death Grip",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2) + Sagesse (Perception & Sens Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit se trouver entre 6 et 15 mètres. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Des chaînes spectrales surgissent de vos mains pour harponner la cible et l'attirer instantanément à vos pieds en mêlée. La cible subit un léger dégât d'Ombre et est forcée de vous cibler pendant 1 tour."
  },
  {
    "id": 105,
    "name": "Ivresse de la viande",
    "nameEn": "Meat Cleaver",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Haches à deux mains",
        "level": 2
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Spécialité Haches à deux mains (Lvl 2) + Domaine Avancé Ivresse du Combat (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche automatiquement après avoir touché au moins 2 cibles avec Enchaînement.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos 2 prochaines attaques ciblées (Heurtoir, Sanguinaire ou Exécution) frappent également jusqu'à 3 cibles secondaires adjacentes pour 50 % de leurs dégâts."
  },
  {
    "id": 106,
    "name": "Broyeur de crânes",
    "nameEn": "Colossus Smash",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Analyse des failles",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Tactique & Analyse (Rang 2) + Spécialité Analyse des failles (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "effect": "Une frappe de précision d'une puissance colossale. Inflige de lourds dégâts et ignore 100 % de l'armure physique de la cible pour tous vos coups portés durant les 2 prochains tours."
  },
  {
    "id": 107,
    "name": "Coup de bouclier dévastateur",
    "nameEn": "Shield Bash",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Boucliers",
        "level": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 3) + Spécialité Boucliers (Lvl 2) + Force (Intimidation physique Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite un bouclier lourd équipé. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Assène un choc frontal impitoyable. Inflige des dégâts basés sur la totalité de votre valeur d'armure, sonne la cible (Étourdissement 1 tour) et réduit les dégâts qu'elle inflige de 30 % pour 2 tours."
  },
  {
    "id": 108,
    "name": "Fureur de Berserker",
    "nameEn": "Berserker Rage",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Intimidation physique Rang 2) + Endurance (Volonté & Récupération Rang 2) + Domaine Avancé Ivresse du Combat (Rang 1)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Utilisable même sous l'effet d'un contrôle mental, d'une Peur ou d'un Incapacité. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Brise immédiatement toute Peur, Sommeil ou Incapacité. Vous générez immédiatement le maximum de votre ressource de Rage et devenez immunisé à la Peur pendant 2 tours."
  },
  {
    "id": 109,
    "name": "Bannière de ralliement de la Horde/Alliance",
    "nameEn": "War Banner",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "tactique-choc",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Intimidation physique Rang 2) + Charisme (Commandement & Inspiration Rang 3) + Domaine Avancé Tactique de Choc (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Plantée au sol. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Plante un étendard de guerre. Tous les alliés situés à moins de 10 mètres voient leur vitesse de déplacement augmentée de 30 % et bénéficient de +1d6 supplémentaire sur toutes leurs attaques de mêlée et à distance."
  },
  {
    "id": 110,
    "name": "Frappe de la gorge",
    "nameEn": "Throat Crush",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lutte / Mains nues",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 2) + Force (Mêlée bourrine Rang 2) + Spécialité Lutte / Mains nues (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit être en train d'incanter un sort.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Un coup violent au niveau de la pomme d'Adam. Interrompt le sort en cours et empêche la cible de parler ou d'incanter des sorts à composante verbale pendant 2 tours complets."
  },
  {
    "id": 111,
    "name": "Danse des lames",
    "nameEn": "Blade Flurry",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Combat à deux armes",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Agilité (Acrobatie & Furtivité Rang 2) + Spécialité Combat à deux armes (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide (Posture commutable)",
    "condition": "Maniement de deux armes à une main.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tant que la posture est active, toutes vos attaques sur votre cible principale infligent 40 % de leurs dégâts à tous les autres ennemis adjacents, mais votre régénération d'Énergie est réduite de 20 %."
  },
  {
    "id": 112,
    "name": "Vaincre les faibles",
    "nameEn": "Overpower",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'active uniquement lorsqu'un ennemi esquive une de vos attaques.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une contre-attaque éclair impossible à esquiver, parer ou bloquer. Inflige des dégâts physiques accrus et augmente les dégâts de votre prochaine Frappe mortelle de +1d6."
  },
  {
    "id": 113,
    "name": "Ombre sanglante",
    "nameEn": "Crimson Vial / Blood Thirst",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Poisons/Saignements",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 2) + Endurance (Volonté & Récupération Rang 3) + Spécialité Poisons/Saignements (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Vous consommez une concoc' de sang ou mordez la cible. Vous restaurez immédiatement 20 % de vos PV maximaux et annulez tous les saignements qui vous affectaient."
  },
  {
    "id": 114,
    "name": "Taillader",
    "nameEn": "Slice and Dice",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "danse-lames",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Domaine Avancé Danse des Lames (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 3 à 5 Points de Combo.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente votre vitesse d'attaque de 50 % pendant un nombre de tours égal au nombre de Points de Combo consommés."
  },
  {
    "id": 115,
    "name": "Venin mortel concentré",
    "nameEn": "Deadly Poison - Lethal",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "escamotage-crochetage",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "poisons-toxines",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Escamotage & Crochetage Rang 2) + Intelligence (Alchimie & Herboristerie Rang 2) + Domaine Avancé Poisons & Toxines (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Enduit d'arme)",
    "condition": "Armes enduites de poison avant le combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos attaques ont 30 % de chances d'infecter la cible. Chaque touche applique une dose de venin mortel (cumulable 5 fois). À 5 doses, la cible subit une explosion de dégâts de Nature instantanés."
  },
  {
    "id": 116,
    "name": "Marque de la mort",
    "nameEn": "Deathmark",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Saigneur de la Nuit"
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2) + Titre requis : Saigneur de la Nuit",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 2,
    "effect": "Gravez un sceau de mort sur la cible. Tous les saignements et poisons appliqués sur la cible pendant les 2 prochains tours sont dupliqués et infligent le double de leurs dégâts."
  },
  {
    "id": 117,
    "name": "Série de coups",
    "nameEn": "Killing Spree",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "danse-lames",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Agilité (Acrobatie & Furtivité Rang 3) + Domaine Avancé Danse des Lames (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Vous disparaissez dans un tourbillon d'acier. Vous vous téléportez d'ennemi en ennemi à moins de 8 mètres, effectuant 5 attaques ultra-rapides consécutives tout en étant totalement inciblable pendant la séquence."
  },
  {
    "id": 118,
    "name": "Poussée d'adrénaline",
    "nameEn": "Adrenaline Rush",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "energie-souffle",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité Rang 2) + Endurance (Énergie & Souffle Rang 3) + Domaine Avancé Ivresse du Combat (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Vos réserves d'énergie se régénèrent à une vitesse fulgurante. Pendant 2 tours, votre vitesse de recharge de capacité est doublée et la limite de vos Points de Combo augmente de +1."
  },
  {
    "id": 119,
    "name": "Ombre du Trompe-la-mort",
    "nameEn": "Cheat Death",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "poisons-toxines",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité Rang 3) + Endurance (Volonté & Récupération Rang 3) + Domaine Avancé Poisons & Toxines (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche uniquement sur un coup mortel. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Une attaque qui aurait dû vous tuer vous laisse à 1 % de vos PV à la place. Vous réduisez tous les dégâts subis de 85 % pendant 1 tour et gagnez un bonus de Furtivité instantané."
  },
  {
    "id": 120,
    "name": "Volée de piques",
    "nameEn": "Spike Barrage",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lancer d'armes",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Agilité (Tir & Lancer Rang 2) + Spécialité Lancer d'armes (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite au moins 3 armes de jet ou piques.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Lance une volée de piques en éventail. Tous les ennemis à portée moyenne subissent des dégâts de perforation et sont encloués au sol (Enracinement 1 tour)."
  },
  {
    "id": 121,
    "name": "Frappe de l'Ombre",
    "nameEn": "Shadowstrike",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Discrétion dans l'ombre",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2) + Spécialité Discrétion dans l'ombre (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'être en Furtivité ou sous Pas de l'ombre.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous franchissez les ombres pour frapper la cible jusqu'à 10 mètres de distance. Inflige d'immenses dégâts hybrides physique/Ombre et génère +2 Points de Combo."
  },
  {
    "id": 122,
    "name": "Bombe à la peste",
    "nameEn": "Plague Bomb",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une fiole de Peste. Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Libère un nuage de Peste verdâtre de 5 mètres de rayon. Tous les êtres vivants dans le nuage subissent des dégâts d'Ombre/Nature chaque tour et voient leurs soins reçus réduits de 70 %."
  },
  {
    "id": 123,
    "name": "Armée des morts",
    "nameEn": "Army of the Dead",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Chevalier de la Mort"
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 3) + Titre requis : Chevalier de la Mort",
    "actionType": "complete",
    "actionLabel": "Action Complète (Temps d'incantation : 1 tour)",
    "condition": "1 fois par séance de jeu / repos long.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "manaCost": 5,
    "effect": "Vous frottez votre lame au sol et invoquez une goule du néant par dé de votre réserve. L'armée de goules déferle sur le champ de bataille, provoquant tous les ennemis et infligeant des dégâts physiques continus pendant 3 tours."
  },
  {
    "id": 124,
    "name": "Sang-froid",
    "nameEn": "Cold Blood",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Votre prochaine capacité offensive ciblée (Attaque sournoise, Exécution, Estropier) est garantie d'être un Succès Critique."
  },
  {
    "id": 125,
    "name": "Désarmer",
    "nameEn": "Disarm",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée & Combat lourd) Rang 1 + Agilité (Acrobatie & Combat de précision) Rang 1",
    "actionType": "complete",
    "actionLabel": "Action Complète (Manœuvre)",
    "condition": "Portée : Mêlée",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Attaque ciblée sur l'arme adverse. Si vous touchez, vous n'infligez pas de dégâts physiques, mais vous faites voler l'arme principale de la cible à 3 mètres de distance. La cible doit dépenser une Action Rapide pour ramasser son arme au sol."
  },
  {
    "id": 126,
    "name": "Frappe de runes arcaniques",
    "nameEn": "Runic Strike",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "runes-anciennes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Runes Anciennes (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "S'active après avoir paré une attaque.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Inscrit une rune d'énergie sur la lame. Inflige des dégâts physiques et fait exploser la rune, infligeant des dégâts d'Arcane supplémentaires qui traversent l'armure."
  },
  {
    "id": 127,
    "name": "Moisson d'âmes",
    "nameEn": "Reaping",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Faux/Haches",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2) + Spécialité Faux/Haches (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Toucher au moins 2 cibles saignantes ou pestiférées.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Balaye largement. Convertit les effets de Peste en dégâts instantanés et vous soigne d'un montant fixe par ennemi touché."
  },
  {
    "id": 128,
    "name": "Frappe de la Mort",
    "nameEn": "Death Strike",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2) + Endurance (Volonté & Récupération Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir subi des dégâts dans les 2 derniers tours.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Une frappe impitoyable qui inflige des dégâts physiques et de Givre et vous soigne à hauteur de 25 % de tous les dégâts subis durant les 2 derniers tours."
  },
  {
    "id": 129,
    "name": "Aura de Peste",
    "nameEn": "Virulent Plague",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura)",
    "condition": "Être en combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tous les ennemis à moins de 3 mètres de vous ont 25 % de chances par tour de contracter la Peste virulente, subissant des dégâts d'Ombre continus et transmettant l'infection à leurs alliés proches."
  },
  {
    "id": 130,
    "name": "Vague de sang",
    "nameEn": "Blood Boil",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2) + Endurance (Volonté & Récupération Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Fait bouillir le sang de tous les ennemis à moins de 5 mètres. Inflige des dégâts d'Ombre de zone et propage les maladies présentes sur votre cible principale à tous les autres ennemis touchés."
  },
  {
    "id": 131,
    "name": "Furie sanguinaire",
    "nameEn": "Bloodlust / Heroism",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Domaine Avancé Ivresse du Combat (Rang 2) + Sagesse (Communion naturelle Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par séance de jeu / repos long.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "manaCost": 2,
    "effect": "Un rugissement ancestral traverse le groupe. Pendant 3 tours, tous les alliés gagnent +40 % de vitesse d'attaque et de lancer de sorts et relancent leurs résultats de 1 sur tous leurs d6 de dégâts."
  },
  {
    "id": 132,
    "name": "Frappe du Fléau",
    "nameEn": "Scourge Strike",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Épées à deux mains",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2) + Spécialité Épées à deux mains (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être infectée par au moins 1 maladie.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Une frappe impie qui inflige à la fois des dégâts physiques et des dégâts d'Ombre. Pour chaque maladie présente sur la cible, les dégâts d'Ombre augmentent de +1d6."
  },
  {
    "id": 133,
    "name": "Voile mortel",
    "nameEn": "Death Coil",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme de la Puissance Runique ou de la Mana d'Ombre.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Projette une masse d'énergie impie à portée moyenne. Inflige des dégâts d'Ombre à un ennemi OU soigne un serviteur mort-vivant allié du double de ce montant."
  },
  {
    "id": 134,
    "name": "Carapace anti-magie",
    "nameEn": "Anti-Magic Shell / AMS",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Vous vous entourez d'une barrière impie. Absorbe 80 % de tous les dégâts magiques subis pendant 2 tours, vous immunise aux applications de nouveaux effets magiques néfastes et convertit les dégâts absorbés en ressource."
  },
  {
    "id": 135,
    "name": "Hiver impitoyable",
    "nameEn": "Remorseless Winter",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Domaine Avancé Magie du Givre & Altération (Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Déclenche une tempête de neige glaciale autour de vous (5m de rayon) pendant 2 tours. Les ennemis dans la zone subissent des dégâts de Givre chaque tour, ont leur vitesse réduite de 50 % et sont gelés sur place (Enracinement) au bout du 2e tour."
  },
  {
    "id": 136,
    "name": "Balayage sauvage",
    "nameEn": "Sweep",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lutte / Mains nues",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 2) + Spécialité Lutte / Mains nues (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi de taille humanoïde en mêlée.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Un fauchage de jambe balaye l'adversaire. La cible tombe à terre (A terre) et subit un malus de -1d6 à son prochain jet d'initiative."
  },
  {
    "id": 137,
    "name": "Transpercement",
    "nameEn": "Impale",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lances/Javelots",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer Rang 3) + Force (Mêlée bourrine Rang 2) + Spécialité Lances/Javelots (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une lance à deux mains.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Cloue l'ennemi au mur ou au sol s'il se trouve à moins de 2 mètres d'une surface. La cible est immobilisée pendant 2 tours et subit un saignement lourd."
  },
  {
    "id": 138,
    "name": "Frenzy de l'Ombre",
    "nameEn": "Shadow Blades",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "danse-lames",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Danse des Lames (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 2,
    "effect": "Infuse vos lames d'énergie du Vide. Pendant 2 tours, toutes vos attaques de mêlée infligent des dégâts d'Ombre à la place des dégâts physiques (ignorant l'armure) et génèrent +1 Point de Combo supplémentaire par coup."
  },
  {
    "id": 139,
    "name": "Choc martial écrasant",
    "nameEn": "Shattering Throw",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Force (Mêlée bourrine Rang 2) + Domaine Tactique & Analyse (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi protégé par une barrière magique (Bouclier divin, Barrière de glace, Bloc de glace).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Projette votre arme avec une force colossale. Brise immédiatement la barrière d'invulnérabilité de la cible et lui inflige de lourds dégâts physiques."
  },
  {
    "id": 140,
    "name": "Avatar",
    "nameEn": "Avatar",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "tactique-choc",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Force (Intimidation physique Rang 3) + Domaine Avancé Tactique de Choc (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Vous vous transformez en un colosse de pierre. Pendant 2 tours, votre taille augmente, vous gagnez +20 % de dégâts, votre valeur d'armure est doublée et vous êtes totalement immunisé à toutes les formes d'entrave ou de contrôle."
  },
  {
    "id": 141,
    "name": "Embuscade mortelle",
    "nameEn": "Ambush",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Discrétion dans l'ombre",
        "level": 2
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Acrobatie & Furtivité Rang 3) + Spécialité Discrétion dans l'ombre (Lvl 2) + Agilité (Combat de précision Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utilisable uniquement depuis la Furtivité avec une arme à deux mains ou deux dagues.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une attaque d'ouverture terrifiante. Ajoute +3d6 à votre réserve de dégâts de base et étourdit la cible pendant 1 tour si l'attaque réussit."
  },
  {
    "id": 142,
    "name": "Rupture",
    "nameEn": "Rupture",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Poisons/Saignements",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 2) + Spécialité Poisons/Saignements (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 3 à 5 Points de Combo.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Éviscère la cible. Applique un saignement béant qui inflige des dégâts d'Ombre/Saignement ignoraient l'armure au début de chaque tour pendant un nombre de tours égal au nombre de Points de Combo dépensés."
  },
  {
    "id": 143,
    "name": "Tir de neutralisation",
    "nameEn": "Concussive Shot",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer Rang 2) + Sagesse (Perception & Sens Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "effect": "Décoche une flèche lourde non tranchante. Réduit la vitesse de déplacement de la cible de 50 % pendant 2 tours."
  },
  {
    "id": 144,
    "name": "Camouflage du serpent",
    "nameEn": "Cobra Shot",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "advanced",
        "id": "toxines-sauvages",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer Rang 3) + Sagesse (Communion naturelle Rang 1) + Domaine Avancé Toxines Sauvages (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utiliser un arc ou arbalète.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Tire un projectile infusé de venin de cobra. Inflige des dégâts de Nature et prolonge la durée de votre Serpent Sting actif sur la cible de 2 tours."
  },
  {
    "id": 145,
    "name": "Piège d'acier gnomique",
    "nameEn": "Steel Trap",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "escamotage-crochetage",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Escamotage & Crochetage Rang 2) + Intelligence (Technomancie & Ingénierie Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posé au sol hors de combat ou en dissimulation.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Déploie un piège à mâchoires dentelées. Le premier ennemi à marcher dessus subit de lourds dégâts physiques, est immobilisé (Enracinement) pendant 2 tours et saigne abondamment."
  },
  {
    "id": 146,
    "name": "Marque du traqueur céleste",
    "nameEn": "Hunter's Mark - Greater",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Pistage",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Perception & Sens Rang 3) + Agilité (Tir & Lancer Rang 2) + Spécialité Pistage (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler une personne à portée de vue.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Marque la cible d'un symbole lumineux invisible pour elle. La cible ne peut plus se camoufler ou devenir invisible, et toutes les attaques à distance de vos alliés contre elle gagnent +1d6 au jet de touche."
  },
  {
    "id": 147,
    "name": "Morsure de la mangouste",
    "nameEn": "Mongoose Bite",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lances/Bâtons",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Endurance (Survie en milieu hostile Rang 2) + Spécialité Lances/Bâtons (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir esquivé une attaque au tour précédent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une contre-attaque sauvage d'une rapidité fulgurante. Inflige des dégâts physiques massifs et augmente les dégâts de vos prochaines Morsures de la mangouste de +1d6 pendant 2 tours (cumulable 3 fois)."
  },
  {
    "id": 148,
    "name": "Tir mortel",
    "nameEn": "Kill Shot",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Analyse des failles",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Agilité (Tir & Lancer Rang 3) + Domaine Tactique & Analyse (Rang 2) + Spécialité Analyse des failles (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être sous les 20 % de PV. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Vous tentez de achever une cible blessée à distance. Si le coup réussit, il inflige le triple des dégâts normaux. Si la cible meurt, le temps de recharge est immédiatement réinitialisé."
  },
  {
    "id": 149,
    "name": "Bête féroce",
    "nameEn": "Dire Beast",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "dressage-sauvage",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 3) + Domaine Avancé Dressage Sauvage (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Invoque un esprit de bête sauvage locale (ours, rapace, basilic) qui déferle sur la cible, lui inflige des dégâts physiques et vous restaure immédiatement de l'Énergie/Focalisation."
  },
  {
    "id": 150,
    "name": "Ordre de tuer",
    "nameEn": "Kill Command",
    "category": "Voies martiales, guerre & sang",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "dressage-sauvage",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Domaine Avancé Dressage Sauvage (Rang 2) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Votre compagnon animal doit être en mêlée avec la cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous donnez l'ordre d'exécution. Votre compagnon animal bondit sur la gorge de la cible, infligeant des dégâts physiques massifs basés sur vos caractéristiques combinées."
  },
  {
    "id": 151,
    "name": "Superpuissance",
    "nameEn": "Arcane Power",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maitrise-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Maîtrise des Arcanes (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Vous canalisez l'énergie profane pure. Pendant 2 tours, tous vos sorts magiques infligent +30 % de dégâts supplémentaires et leur coût en mana est réduit de 30 %."
  },
  {
    "id": 152,
    "name": "Pousse de froid",
    "nameEn": "Cold Snap",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Magie du Givre & Altération (Rang 2) + Sagesse (Volonté spirituelle Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 4,
    "effect": "Une vague de froid réinitialise instantanément les temps de recharge de tous vos sorts de Givre (Bloc de glace, Barrière de glace, Nova de givre) et vous soigne de 10 % de vos PV."
  },
  {
    "id": 153,
    "name": "Bloc de glace",
    "nameEn": "Ice Block",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Magie du Givre & Altération (Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 4,
    "effect": "Vous vous enfermez dans un bloc de glace stygienne incassable pendant 2 tours. Vous devenez totalement invulnérable à tous les dégâts et dissipez tous les effets néfastes, mais vous ne pouvez effectuer aucune action."
  },
  {
    "id": 154,
    "name": "Souffle du dragon",
    "nameEn": "Dragon's Breath",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Pyromancie (Rang 2) + Force (Intimidation physique Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Projette un cône de flammes dévastateur à bout portant (4m devant vous). Tous les ennemis touchés subissent des dégâts de Feu et sont désorientés (Désorientation 1 tour)."
  },
  {
    "id": 155,
    "name": "Explosion pyrotechnique",
    "nameEn": "Pyroblast",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Pyromancie (Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Incanter : 1 tour complet)",
    "condition": "Peut être lancée instantanément après un double critique de Feu.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 5,
    "effect": "Projette un gigantesque rocher de feu incandescent. Inflige des dégâts de Feu colossaux à la cible et des dégâts de zone résiduels autour d'elle."
  },
  {
    "id": 156,
    "name": "Déflagration d'Ombre",
    "nameEn": "Shadowflame Blast",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Un rayon de flammes violettes s'échappe de vos mains en cône. Inflige des dégâts d'Ombre/Feu et réduit la vitesse de déplacement de tous les ennemis touchés de 70 % pendant 1 tour."
  },
  {
    "id": 157,
    "name": "Orbe de givre",
    "nameEn": "Frozen Orb",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Magie du Givre & Altération (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Lance un orbe de glace tournoyant qui avance lentement en ligne droite (10m). L'orbe inflige des dégâts de Givre chaque seconde à tous les ennemis proches et vous octroie des charges de Doigts de Givre."
  },
  {
    "id": 158,
    "name": "Doigts de givre",
    "nameEn": "Fingers of Frost",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Domaine Avancé Magie du Givre & Altération (Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche aléatoirement sur un sort de Givre réussi.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre prochain Javelot de glace traite la cible comme si elle était totalement congelée (Enracinée/Gelée), infligeant le triple de ses dégâts normaux."
  },
  {
    "id": 159,
    "name": "Distorsion temporelle",
    "nameEn": "Time Warp",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "chronomancie",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Archimage"
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Chronomancie (Rang 2) + Titre requis : Archimage",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par séance de jeu / repos long.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "manaCost": 4,
    "effect": "Vous altérez l'écoulement du temps pour tout le groupe. Tous les alliés à portée voient leur vitesse d'action augmentée de 30 % pendant 3 tours. Partage le même temps de recharge global que Furie sanguinaire."
  },
  {
    "id": 160,
    "name": "Annulation de la magie",
    "nameEn": "Spellsteal",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Décryptage de langues/Runes",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Spécialité Décryptage de langues/Runes (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "La cible doit posséder au moins 1 effet magique bénéfique actif.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Vous volez un effet magique bénéfique sur l'ennemi (Bouclier, Hâte, Soin continu). L'effet est retiré à l'ennemi et s'applique immédiatement sur vous pour sa durée restante."
  },
  {
    "id": 161,
    "name": "Choc arcanique",
    "nameEn": "Arcane Barrage",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maitrise-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Maîtrise des Arcanes (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme toutes vos charges de Charges Arcaniques.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Projette des orbes d'énergie pure sur plusieurs cibles. Les dégâts et le nombre de cibles secondaires touchées augmentent par charge arcanique consommée."
  },
  {
    "id": 162,
    "name": "Évocation",
    "nameEn": "Evocation",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Endurance (Volonté & Récupération Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée 1 tour)",
    "condition": "Doit rester immobile. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 3,
    "effect": "Vous canalisez le flux ley d'Azeroth. Restaure 100 % de votre réserve de Mana en 1 tour complet."
  },
  {
    "id": 163,
    "name": "Éruption solaire",
    "nameEn": "Solar Beam",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Magie de la Nature",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 3) + Intelligence (Magie profane & Arcanes Rang 2) + Spécialité Magie de la Nature (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Invoque un rayon de lumière solaire intense sur une zone au sol (3m de rayon). Tous les ennemis dans le rayon sont immédiatement Réduits au silence tant qu'ils restent dans la zone."
  },
  {
    "id": 164,
    "name": "Météore",
    "nameEn": "Meteor",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Pyromancie (Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Délai d'impact : 1 tour)",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 5,
    "effect": "Fait tomber un météore en fusion du ciel sur une zone ciblée. Inflige des dégâts de Feu monstrueux répartis équitablement entre tous les ennemis présents dans la zone d'impact et enflamme le sol."
  },
  {
    "id": 165,
    "name": "Chaîne d'éclairs",
    "nameEn": "Chain Lightning",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Esprits des éléments",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Intelligence (Magie profane & Arcanes Rang 2) + Spécialité Esprits des éléments (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Doit y avoir au moins 2 ennemis à moins de 5 mètres les uns des autres.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Projette un éclair foudroyant qui bondit sur jusqu'à 4 cibles consécutives. Chaque rebond inflige 20 % de dégâts de moins que le précédent."
  },
  {
    "id": 166,
    "name": "Horion de terre",
    "nameEn": "Earth Shock",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Force (Mêlée bourrine Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme votre réserve d'Énergie élémentaire/Bouclier de foudre.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Secoue la terre sous les pieds de l'ennemi à distance. Inflige d'immenses dégâts de Nature instantanés basés sur la quantité de ressource consommée."
  },
  {
    "id": 167,
    "name": "Totem de lien terrestre",
    "nameEn": "Earthgrab Totem",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Planté au sol (5m de rayon). Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Invoque un totem de pierre. Ancre immédiatement tous les ennemis dans la zone au sol (Enracinement 1 tour), puis ralentit leur vitesse de déplacement de 50 %."
  },
  {
    "id": 168,
    "name": "Totem d'imitation d'incantation",
    "nameEn": "Grounding Totem",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Invoque un totem paratonnerre. Le totem draine et détruit le prochain sort magique ciblé lancé par un ennemi contre vous ou vos alliés proches."
  },
  {
    "id": 169,
    "name": "Garde-tempête",
    "nameEn": "Stormkeeper",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maitrise-elements",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Domaine Avancé Maîtrise des Éléments (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Vous levez votre arme vers les cieux pour charger la foudre. Vos 2 prochains sorts d'Éclair ou de Chaîne d'éclairs sont instantannés et déclenchent obligatoirement une Surcharge Élémentaire."
  },
  {
    "id": 170,
    "name": "Ascendance élémentaire",
    "nameEn": "Ascendance",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maitrise-elements",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Grand Chaman"
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Domaine Avancé Maîtrise des Éléments (Rang 3) + Titre requis : Grand Chaman",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 5,
    "effect": "Vous vous transformez en un élémentaire d'eau, de feu ou d'air pur pendant 2 tours. Vos attaques de mêlée deviennent des frappes de vent à distance (15m) ou vos sorts de soins sont dupliqués sur tous les alliés."
  },
  {
    "id": 171,
    "name": "Nova de foudre",
    "nameEn": "Lightning Shield Burst",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Esprits des éléments",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 2) + Spécialité Esprits des éléments (Lvl 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "S'active lorsque votre Bouclier de foudre atteint 20 charges ou après avoir été frappé 3 fois en mêlée.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Libère une décharge foudroyante qui repousse tous les ennemis adjacents à 3 mètres et leur inflige des dégâts de Nature."
  },
  {
    "id": 172,
    "name": "Pluie guérisseuse",
    "nameEn": "Healing Rain",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler une zone au sol (5m de rayon).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Invoque une pluie curative sur la zone ciblée pendant 2 tours. Tous les alliés se tenant dans la pluie récupèrent des PV au début de leur tour."
  },
  {
    "id": 173,
    "name": "Totem de marée de soins",
    "nameEn": "Healing Tide Totem",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Domaine Médecine & Soins (Rang 3)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 3,
    "effect": "Invoque un totem d'eau puissant. Émet une onde de soins majeurs toutes les secondes pour tous les membres du groupe situés à moins de 15 mètres pendant 2 tours."
  },
  {
    "id": 174,
    "name": "Totem de lien d'esprit",
    "nameEn": "Spirit Link Totem",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Sagesse (Volonté spirituelle Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 3,
    "effect": "Invoque un totem qui lie les âmes de tous les alliés dans une zone de 5 mètres. Chaque tour, la santé de tous les alliés dans la zone est égalrisée (pourcentage de PV identique) et les dégâts qu'ils subissent sont réduits de 15 %."
  },
  {
    "id": 175,
    "name": "Vague d'explosion",
    "nameEn": "Blast Wave",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Une déflagration de feu repousse tous les ennemis adjacents à 4 mètres et réduit leur vitesse de déplacement de 70 % pendant 1 tour."
  },
  {
    "id": 176,
    "name": "Froid mordant",
    "nameEn": "Cone of Cold",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Magie du Givre & Altération (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Projette une rafale de glace en cône devant vous. Inflige des dégâts de Givre et ralentit la vitesse des cibles de 80 % pendant 2 tours."
  },
  {
    "id": 177,
    "name": "Nova arcanique",
    "nameEn": "Arcane Explosion",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maitrise-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Maîtrise des Arcanes (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Être entouré d'au moins 2 ennemis.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Une onde de choc d'énergie pure éclate autour de vous (3m). Inflige des dégâts d'Arcane à tous les ennemis et a 30 % de chances de générer une Charge Arcanique."
  },
  {
    "id": 178,
    "name": "Image miroir",
    "nameEn": "Mirror Image",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Charisme (Tromperie & Comédie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 3,
    "effect": "Vous créez 3 doubles illusoires de vous-même pendant 2 tours. Les attaques ennemies ont 75 % de chances de frapper une illusion à votre place (détruisant l'illusion). Les copies lancent de petits sorts d'éclair."
  },
  {
    "id": 179,
    "name": "Invisibilité arcanique",
    "nameEn": "Invisibility",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Sorts d'Arcane",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Agilité (Acrobatie & Furtivité Rang 2) + Spécialité Sorts d'Arcane (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Délai : 1 tour)",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 3,
    "effect": "Vous vous effacez progressivement de la réalité. Au bout d'un tour, vous devenez totalement Invisible pendant 3 tours et perdez toute menace générée auprès des monstres."
  },
  {
    "id": 180,
    "name": "Rune de puissance",
    "nameEn": "Rune of Power",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "runes-anciennes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Runes Anciennes (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Placer au sol sous vos pieds. Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Grave une rune magique brillante au sol. Tant que vous vous tenez sur la rune, tous vos sorts magiques infligent +40 % de dégâts supplémentaires."
  },
  {
    "id": 181,
    "name": "Armure de glace",
    "nameEn": "Ice Armor",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Magie du Givre & Altération (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Armure magique)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente votre armure physique d'un montant fixe. Tous les attaquants qui vous frappent en mêlée voient leur vitesse d'attaque réduite de 25 % pendant 1 tour."
  },
  {
    "id": 182,
    "name": "Armure de la fournaise",
    "nameEn": "Molten Armor",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Armure magique)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente vos chances de coup critique de +1d6 et inflige automatiquement de légers dégâts de Feu à quiconque vous frappe en mêlée."
  },
  {
    "id": 183,
    "name": "Présence de l'esprit",
    "nameEn": "Presence of Mind",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 3,
    "effect": "Votre prochain sort d'Arcane nécessitant normalement un temps d'incantation devient instantané."
  },
  {
    "id": 184,
    "name": "Bouclier de terre",
    "nameEn": "Earth Shield",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 2) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Placé sur un allié (max 1 bouclier actif à la fois).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Entoure l'allié de 9 orbes de terre protectrices. Chaque fois que l'allié subit une attaque, une orbe est consommée pour le soigner d'un montant fixe et réduire le temps d'interruption de sort."
  },
  {
    "id": 185,
    "name": "Afflux de soins",
    "nameEn": "Surge of Healing",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 2) + Sagesse (Médecine & Soins Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Coût en mana élevé.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Un soin d'urgence d'une rapidité extrême qui restaure un montant élevé de PV à une cible unique au bord du K.O."
  },
  {
    "id": 186,
    "name": "Rayon de météore arcanique",
    "nameEn": "Arcane Orb",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maitrise-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Maîtrise des Arcanes (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Projette un orbe arcanique étincelant en ligne droite devant vous. L'orbe traverse les ennemis, infligeant des dégâts d'Arcane et générant 1 Charge Arcanique par ennemi traversé."
  },
  {
    "id": 187,
    "name": "Forme d'esprit végétal",
    "nameEn": "Treant Form / Tree of Life",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Archidruide"
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 3) + Domaine Médecine & Soins (Rang 3) + Titre requis : Archidruide",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 3,
    "effect": "Vous vous métamorphosez en un Arbre de Vie antique pendant 3 tours. Vos soins de zone sont augmentés de 50 %, votre armure augmente de +100 % et vous êtes immunisé au contrôle mental."
  },
  {
    "id": 188,
    "name": "Éclat solaire",
    "nameEn": "Sunfire",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Magie de la Nature",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Spécialité Magie de la Nature (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un groupe d'ennemis proches.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Invoque un rayon de chaleur solaire qui brûle la cible et se propage à tous les ennemis situés à moins de 3 mètres, infligeant des dégâts de Feu/Nature continus pour 3 tours."
  },
  {
    "id": 189,
    "name": "Météores célestes",
    "nameEn": "Starfall",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "astral-celeste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 3) + Intelligence (Magie profane & Arcanes Rang 2) + Domaine Avancé Astral & Céleste (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme de la Puissance Céleste/Astrale. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Déclenche une pluie d'étoiles filantes sur un rayon de 8 mètres autour de vous pendant 2 tours. Inflige des dégâts d'Arcane à tous les ennemis dans la zone et vous permet d'incanter en vous déplaçant."
  },
  {
    "id": 190,
    "name": "Éruption astrale",
    "nameEn": "Starsurge",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "astral-celeste",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Astral & Céleste (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme de la Puissance Céleste.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Projette un rayon d'énergie astrale pure qui combine les pouvoirs du Soleil et de la Lune. Inflige d'immenses dégâts d'Arcane/Nature instantanés et augmente les dégâts de vos prochains Éclat lunaire et Éclat solaire."
  },
  {
    "id": 191,
    "name": "Typhon",
    "nameEn": "Typhoon",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Force (Athlétisme Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Invoque une rafale de vent violent en cône devant vous (5m). Repousse violemment tous les ennemis touchés à 5 mètres et réduit leur vitesse de déplacement de 50 % pendant 1 tour."
  },
  {
    "id": 192,
    "name": "Rétablissement naturel",
    "nameEn": "Renewal",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Endurance (Volonté & Récupération Rang 3)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable sous n'importe quelle forme druidique. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 2,
    "effect": "Un afflux de sève vitale vous soigne instantanément de 30 % de vos Points de Vie maximaux."
  },
  {
    "id": 193,
    "name": "Emprise de la nature",
    "nameEn": "Nature's Grasp",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Domaine Survie en milieu hostile (Rang 1)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Active un bouclier de ronces réactif. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 2,
    "effect": "Pendant 2 tours, le prochain ennemi qui vous frappe en mêlée est automatiquement immobilisé au sol par des sarments (Enracinement 2 tours)."
  },
  {
    "id": 194,
    "name": "Célérité céleste",
    "nameEn": "Dash - Tiger's Dash",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Forme animale",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 2) + Agilité (Acrobatie & Furtivité Rang 3) + Spécialité Forme animale (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Forme de Félide active. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Augmente votre vitesse de déplacement de +200 % pendant 1 tour, diminuant progressivement sur 2 tours. Vous pouvez franchir les précipices sans test de dé."
  },
  {
    "id": 195,
    "name": "Griffe d'ombre",
    "nameEn": "Rip / Ferocious Bite",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Forme animale",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Agilité (Combat de précision Rang 3) + Sagesse (Communion naturelle Rang 2) + Spécialité Forme animale (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Forme de Félide active. Consomme 3 à 5 Points de Combo.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Une morsure sauvage qui transperce les os. Inflige d'immenses dégâts physiques et convertit les dégâts excédentaires en dégâts d'Ombre/Saignement si la cible est sous les 25 % de PV."
  },
  {
    "id": 196,
    "name": "Éclipse Lunaire/Solaire",
    "nameEn": "Eclipse System",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "astral-celeste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle Rang 3) + Intelligence (Magie profane & Arcanes Rang 3) + Domaine Avancé Astral & Céleste (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche alternativement après avoir lancé 2 sorts de Nature ou 2 sorts d'Arcane.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous entrez en Éclipse. Vos sorts de la catégorie opposée voient leurs dégâts augmentés de 30 % et leur temps d'incantation réduit de moitié pendant 2 tours."
  },
  {
    "id": 197,
    "name": "Esprit du volcan",
    "nameEn": "Volcanic Surge",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maitrise-elements",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Domaine Avancé Pyromancie (Rang 2) + Domaine Avancé Maîtrise des Éléments (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Fait surgir de la lave sous les pieds de la cible. Projette l'ennemi en l'air (Incapacité 1 tour) et lui inflige d'immenses dégâts de Feu."
  },
  {
    "id": 198,
    "name": "Totem de bouffée d'air",
    "nameEn": "Wind Rush Totem",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 2) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Planté au sol. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 2,
    "effect": "Crée un couloir de vent de 10 mètres de long. Tous les alliés traversant le couloir voient leur vitesse de déplacement augmentée de +60 % pendant 2 tours."
  },
  {
    "id": 199,
    "name": "Vague de magma",
    "nameEn": "Lava Surge",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "advanced",
        "id": "maitrise-elements",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Domaine Avancé Maîtrise des Éléments (Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche aléatoirement (15 % de chances) lorsque votre Horion de feu inflige un dégât continu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre prochain sort d'Éclair de lave devient instantané et ne consomme aucune ressource."
  },
  {
    "id": 200,
    "name": "Réincarnation ancestrale",
    "nameEn": "Reincarnation",
    "category": "Voies arcaniques, éléments & chronomancie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Mangeur de Totems"
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle & Chamanisme Rang 3) + Sagesse (Volonté spirituelle Rang 3) + Titre requis : Mangeur de Totems",
    "actionType": "reaction",
    "actionLabel": "Réaction hors tour",
    "condition": "S'active uniquement lors de votre mort. 1 fois par séance de jeu.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "manaCost": 3,
    "effect": "Lorsque votre personnage meurt et tombe à 0 PV, les esprits vous ramènent immédiatement à la vie avec 40 % de vos Points de Vie et Mana maximaux, effaçant tous les effets néfastes. (201 à 240)"
  },
  {
    "id": 201,
    "name": "Courroux vengeur",
    "nameEn": "Avenging Wrath / Wings",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "lumiere-vengeuse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Charisme (Commandement & Inspiration Rang 3) + Domaine Avancé Lumière Vengeuse (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Des ailes de Lumière pure apparaissent dans votre dos. Pendant 2 tours, tous vos soins, dégâts et chances de coups critiques sont augmentés de +30 %."
  },
  {
    "id": 202,
    "name": "Châtiment divin",
    "nameEn": "Holy Shock / Divine Storm",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Armes à deux mains",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Sagesse (Magie divine & Sacrée Rang 3) + Spécialité Armes à deux mains (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 3 charges de Puissance Sacrée.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Vous faites touroyer votre arme infusée de Lumière. Inflige de lourds dégâts du Sacré à tous les ennemis à moins de 4 mètres et soigne tous les alliés proches de 20 % des dégâts infligés."
  },
  {
    "id": 203,
    "name": "Bénédiction de sanctification",
    "nameEn": "Blessing of Sanctuary",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Sagesse (Volonté spirituelle Rang 3) + Force (Maîtrise des armures Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Un allié à moins de 10 mètres est étourdi, effrayé ou réduit au silence.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Libère immédiatement l'allié de tous les effets de contrôle de foule subis et lui accorde une immunité à ces mêmes effets pendant 1 tour."
  },
  {
    "id": 204,
    "name": "Main de rétribution",
    "nameEn": "Hand of Reckoning",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 2) + Sagesse (Magie divine & Sacrée Rang 2) + Force (Intimidation physique Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous pointez votre doigt accusateur sur l'ennemi. Force immédiatement la cible à vous attaquer en mêlée pendant 1 tour et inflige des dégâts du Sacré si la cible n'était pas tournée vers vous."
  },
  {
    "id": 205,
    "name": "Bouclier du vengeur",
    "nameEn": "Avenger's Shield",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Boucliers",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 3) + Sagesse (Magie divine & Sacrée Rang 2) + Spécialité Boucliers (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite un bouclier. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous lancez votre bouclier comme un disque de Lumière. Le bouclier rebondit sur jusqu'à 3 cibles consécutives, infligeant des dégâts du Sacré, interrompant leurs incantations et les réduisant au silence pendant 1 tour."
  },
  {
    "id": 206,
    "name": "Marteau de courroux",
    "nameEn": "Hammer of Wrath",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Exécution",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Agilité (Tir & Lancer Rang 2) + Spécialité Exécution (Lvl 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "La cible doit être sous les 20 % de PV (ou être sous l'effet de Courroux vengeur).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Projette un marteau de lumière magique à portée moyenne. Inflige d'immenses dégâts du Sacré garantis."
  },
  {
    "id": 207,
    "name": "Gardien des anciens rois",
    "nameEn": "Guardian of Ancient Kings",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Paladin du Sacré"
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Force (Maîtrise des armures Rang 3) + Titre requis : Paladin du Sacré",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 3,
    "effect": "Invoque un esprit de gardien angélique géant qui se superpose à vous pendant 2 tours. Réduit tous les dégâts subis de 50 % et double l'efficacité de vos soins reçus."
  },
  {
    "id": 208,
    "name": "Sceau de piété",
    "nameEn": "Seal of Righteousness",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Force (Mêlée bourrine Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Toutes vos attaques physiques de mêlée déclenchent une décharge de Lumière supplémentaire qui inflige 20 % de dégâts du Sacré secondaires à la cible et aux ennemis proches."
  },
  {
    "id": 209,
    "name": "Aura de vindicte",
    "nameEn": "Retribution Aura",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura)",
    "condition": "Lorsqu'un allié situé à moins de 10 mètres subit un coup critique ou meurt.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous gagnez immédiatement l'effet Courroux vengeur pendant 1 tour complet sans consommer son temps de recharge."
  },
  {
    "id": 210,
    "name": "Mot de gloire",
    "nameEn": "Word of Glory",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 3 charges de Puissance Sacrée.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Une invocation divine qui restaure instantanément d'importants PV à un allié désigné. Les soins sont augmentés de 100 % si la cible est sous les 30 % de PV."
  },
  {
    "id": 211,
    "name": "Pénitence",
    "nameEn": "Penance",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Volonté spirituelle Rang 2) + Domaine Avancé Discipline & Absolution (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Canalyse une salve de 3 rayons de lumière sacrée. Si vous ciblez un allié, soigne la cible 3 fois. Si vous ciblez un ennemi, inflige 3 décharges de dégâts du Sacré."
  },
  {
    "id": 212,
    "name": "Extase",
    "nameEn": "Rapture",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Avancé Discipline & Absolution (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Pendant 2 tours, votre sort Mot de pouvoir : Bouclier n'a plus aucun temps de recharge et absorbe 200 % de dégâts en plus."
  },
  {
    "id": 213,
    "name": "Salut spirituel",
    "nameEn": "Fade",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Agilité (Acrobatie & Furtivité Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous vous rendez transparent aux yeux des ennemis pendant 1 tour. Annule temporairement toute la menace accumulée, forçant les ennemis à attaquer vos alliés."
  },
  {
    "id": 214,
    "name": "Prière de soins",
    "nameEn": "Prayer of Healing",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Médecine & Soins Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps d'incantation ininterrompu.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Émet une onde de soins d'une portée de 10 mètres. Soigne simultanément jusqu'à 5 alliés du groupe."
  },
  {
    "id": 215,
    "name": "Prière de guérison",
    "nameEn": "Prayer of Mending",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Domaine Avancé Discipline & Absolution (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Placée sur un allié.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Dépose un sceau curatif dormant sur l'allié. La prochaine fois que l'allié subit des dégâts, le sceau le soigne instantanément et bondit sur un autre allié proche (jusqu'à 4 rebonds)."
  },
  {
    "id": 216,
    "name": "Esprit rédemptoir",
    "nameEn": "Spirit of Redemption",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Séraphin"
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Volonté spirituelle Rang 3) + Titre requis : Séraphin",
    "actionType": "passif",
    "actionLabel": "Passif (Réaction à la mort)",
    "condition": "Se déclenche uniquement à votre mort.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "À votre mort, vous devenez un esprit d'ange lumineux pendant 2 tours. Vous êtes totalement invulnérable et pouvez lancer tous vos sorts de soins gratuitement sans consommer de mana avant de rendre l'âme."
  },
  {
    "id": 217,
    "name": "Révélation divine",
    "nameEn": "Holy Nova",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Intelligence (Magie profane & Arcanes Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Être entouré d'alliés et d'ennemis proches (3m).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Une déflagration de Lumière éclate autour de vous. Inflige des dégâts du Sacré à tous les ennemis proches et soigne tous les alliés adjacents."
  },
  {
    "id": 218,
    "name": "Focalisation de la foi",
    "nameEn": "Leap of Faith / Life Grip",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Volonté spirituelle Rang 2) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un allié situé entre 6 et 18 mètres. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Une grappin de lumière divine attire instantanément l'allié désigné jusqu'à votre position, le sortant d'une zone dangereuse ou d'un piège au sol."
  },
  {
    "id": 219,
    "name": "Châtiment des impies",
    "nameEn": "Exorcism",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Tactique & Analyse (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Si la cible est un Démon ou un Mort-vivant, le coup est un critique garanti.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Un rayon céleste transperce la cible. Inflige de lourds dégâts du Sacré et fait brûler la cible pour des dégâts continus pendant 2 tours."
  },
  {
    "id": 220,
    "name": "Mot de pouvoir : Invalidation",
    "nameEn": "Purify / Dispel Magic",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un allié ou un ennemi.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Dissipe immédiatement 2 effets magiques néfastes sur un allié OR retire 1 effet magique bénéfique sur un ennemi."
  },
  {
    "id": 221,
    "name": "Lumière éblouissante",
    "nameEn": "Blinding Light",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Charisme (Intimidation physique Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Émet un flash de lumière aveuglant autour de vous (4m de rayon). Tous les ennemis proches sont désorientés (Désorientation 1 tour). Tout dégât autre que du Sacré annule l'effet."
  },
  {
    "id": 222,
    "name": "Sceau de vengeance",
    "nameEn": "Seal of Vengeance / Truth",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Tranchant (Haches/Épées)",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Spécialité Tranchant (Haches/Épées) (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos attaques de mêlée posent une marque de Feu Sacré sur la cible (cumulable 5 fois). Chaque dose inflige des dégâts du Sacré continus chaque tour."
  },
  {
    "id": 223,
    "name": "Jugement de lumière",
    "nameEn": "Judgement of Light",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Agilité (Tir & Lancer Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Projette un marteau de lumière sur l'ennemi. Inflige des dégâts du Sacré et marque la cible. Les 25 prochaines attaques de vos alliés contre cette cible soignent les attaquants d'un montant fixe."
  },
  {
    "id": 224,
    "name": "Sceau de sagesse",
    "nameEn": "Seal of Wisdom",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Endurance (Volonté & Récupération Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos attaques de mêlée ont 40 % de chances de vous restaurer immédiatement 5 % de votre réserve de Mana maximale."
  },
  {
    "id": 225,
    "name": "Mot de pouvoir : Réconciliation",
    "nameEn": "Atonement",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Avancé Discipline & Absolution (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "S'active lorsque vous appliquez un Bouclier ou une Rénovation sur un allié.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'allié gagne le statut Expiation pendant 2 tours. 50 % de tous les dégâts magiques du Sacré/Ombre que vous infligez aux ennemis soignent automatiquement tous les alliés sous Expiation."
  },
  {
    "id": 226,
    "name": "Symbole de foi",
    "nameEn": "Symbol of Hope",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Sagesse (Volonté spirituelle Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée 1 tour)",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Vous chantez un hymne céleste. Restaure 15 % de la réserve de Mana de tous les soigneurs du groupe et réduit le temps de recharge de leurs capacités défensives de 1 tour."
  },
  {
    "id": 227,
    "name": "Apothéose",
    "nameEn": "Apotheosis",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Séraphin"
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Médecine & Soins (Rang 3) + Titre requis : Séraphin",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 3,
    "effect": "Vous devenez l'incarnation vivante de la Lumière pendant 2 tours. Le coût de tous vos sorts de soins est réduit de 100 % et les temps de recharge de vos mots de soins sont réinitialisés."
  },
  {
    "id": 228,
    "name": "Halo sacré",
    "nameEn": "Halo",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Crée un anneau de Lumière qui s'étend vers l'extérieur jusqu'à 15 mètres puis revient vers vous. Inflige des dégâts du Sacré à tous les ennemis traversés et soigne tous les alliés traversés."
  },
  {
    "id": 229,
    "name": "Étoile divine",
    "nameEn": "Divine Star",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Agilité (Tir & Lancer Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Projette une étoile de Lumière en ligne droite devant vous (8m) qui revient comme un boomerang. Inflige des dégâts du Sacré à l'aller et soigne les alliés au retour."
  },
  {
    "id": 230,
    "name": "Barrière d'absolution",
    "nameEn": "Ultimate Penitence",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Avancé Discipline & Absolution (Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 5,
    "effect": "Vous vous élevez dans les airs et projetez une salve de 6 rayons de lumière/ombre en 1 tour, soignant les alliés les plus affaiblis et pilonnant les ennemis proches tout en vous accordant un bouclier impénétrable."
  },
  {
    "id": 231,
    "name": "Rénovation divine",
    "nameEn": "Renew",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'applique instantanément.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Remplit le corps de l'allié d'énergie curative. Restaure des PV immédiatement puis offre un soin continu au début des 3 prochains tours de la cible."
  },
  {
    "id": 232,
    "name": "Puits de lumière",
    "nameEn": "Lightwell",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Sagesse (Médecine & Soins Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Invoqué au sol. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 3,
    "effect": "Crée une fontaine de Lumière au sol. Les alliés blessés situés à moins de 8 mètres consomment automatiquement une charge du puits pour se soigner lorsqu'ils tombent sous les 50 % de PV (6 charges max)."
  },
  {
    "id": 233,
    "name": "Vœu de chasteté divine",
    "nameEn": "Pain Suppression",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "discipline-absolution",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Volonté spirituelle Rang 3) + Sagesse (Magie divine & Sacrée Rang 3) + Domaine Avancé Discipline & Absolution (Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Utilisable même si vous êtes étourdi ou réduit au silence. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Réduit instantanément tous les dégâts subis par un allié désigné de 40 % pendant 2 tours et augmente sa résistance aux contrôles de 50 %."
  },
  {
    "id": 234,
    "name": "Gardien divin",
    "nameEn": "Divine Guardian",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 3) + Charisme (Commandement & Inspiration Rang 3) + Sagesse (Magie divine & Sacrée Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 2,
    "effect": "Tous les alliés situés à moins de 8 mètres réduisent les dégâts qu'ils subissent de 20 % pendant 2 tours, et 20 % des dégâts qu'ils subissent vous sont redirigés."
  },
  {
    "id": 235,
    "name": "Flammes du Ciel",
    "nameEn": "Purifying Flames",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 3) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi infecté ou maudit.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Fait calciner les maladies sur la cible. Consomme les effets négatifs pour déclencher une explosion de dégâts du Sacré/Feu."
  },
  {
    "id": 236,
    "name": "Éclair aveuglant de clarté",
    "nameEn": "Infusion of Light",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche lors d'un coup critique réussi avec Écrasement sacré.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit le temps d'incantation de votre prochain sort de Lumière du Sacré de 100 % (devient instantané) ou réduit son coût en mana de 50 %."
  },
  {
    "id": 237,
    "name": "Sceau du martyr",
    "nameEn": "Seal of the Martyr",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Endurance (Volonté & Récupération Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Active en permanence.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Toutes vos attaques de mêlée infligent 30 % de dégâts du Sacré supplémentaires, mais vous subissez 10 % des dégâts infligés sous forme de dégâts réels non réduisibles."
  },
  {
    "id": 238,
    "name": "Marteau du vertueux",
    "nameEn": "Hammer of the Righteous",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Masses/Marteaux",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 2) + Sagesse (Magie divine & Sacrée Rang 2) + Spécialité Masses/Marteaux (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une arme à une main et un bouclier.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Frappe la cible avec un marteau béni. Inflige des dégâts physiques à la cible et émet une onde de choc de Lumière qui touche jusqu'à 3 autres ennemis proches."
  },
  {
    "id": 239,
    "name": "Bouclier de piété",
    "nameEn": "Shield of the Righteous",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Boucliers",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 3) + Sagesse (Magie divine & Sacrée Rang 2) + Spécialité Boucliers (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 3 charges de Puissance Sacrée.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous frappez l'ennemi avec la face plat de votre bouclier. Inflige des dégâts du Sacré en cône devant vous et augmente votre valeur d'armure de +50 % pendant 1 tour."
  },
  {
    "id": 240,
    "name": "Bénédiction de rois",
    "nameEn": "Blessing of Kings / BoK",
    "category": "Voies divines, lumière & sacré",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Paladin du Sacré"
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Sagesse (Magie divine & Sacrée Rang 3) + Titre requis : Paladin du Sacré",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat / Buff de groupe",
    "condition": "Lancé sur le groupe avant le combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Accorde une bénédiction royale à tous les membres du groupe. Augmente toutes leurs Caractéristiques principales de +1d6 de base et leur octroie un bouclier d'absorption passif."
  },
  {
    "id": 241,
    "name": "Métamorphose démoniaque",
    "nameEn": "Metamorphosis",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Démoniste du Conseil"
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 3) + Titre requis : Démoniste du Conseil",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme la totalité de votre Fureur démoniaque. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 5,
    "effect": "Vous vous transformez en un Démon majeur cornu pendant 2 tours. Votre armure augmente de +200 %, vos attaques deviennent des décharges de Feu du Fél à distance et vous débloquez des compétences physiques démoniaques."
  },
  {
    "id": 242,
    "name": "Invocateur de Guetteur de l'Équilibre",
    "nameEn": "Summon Observer / Felhunter",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Temps d'incantation : 1 tour)",
    "condition": "Consomme 1 Éclat d'Âme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Invoque un Chasseur corrompu du Fél. Le serviteur possède des capacités passives de détection de l'invisibilité et peut dévorer 1 effet magique bénéfique sur l'ennemi toutes les 2 tours."
  },
  {
    "id": 243,
    "name": "Invocateur d'Infierno",
    "nameEn": "Summon Infernal",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Pyromancie (Rang 2) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 1 Éclat d'Âme. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 4,
    "effect": "Fait tomber une météorite verdoyante du ciel sur une zone ciblée. Inflige d'immenses dégâts de Feu du Fél, étourdit tous les ennemis dans la zone (Étourdissement 1 tour) et fait surgir un Infernale géant de pierre de feu pendant 2 tours."
  },
  {
    "id": 244,
    "name": "Immolation",
    "nameEn": "Immolate",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi à portée moyenne.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Enflamme la chair de l'ennemi. Inflige des dégâts de Feu instantanés et applique une brûlure continue de Feu du Fél pour 3 tours, générant des fragments d'Éclat d'Âme."
  },
  {
    "id": 245,
    "name": "Pluie de Feu du Fél",
    "nameEn": "Rain of Fire",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Pyromancie (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 3 Éclats d'Âme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Fait pleuvoir des braises infernales sur une zone circulaire au sol (6m de rayon) pendant 2 tours. Inflige de lourds dégâts de Feu du Fél à tous les ennemis présents dans la zone."
  },
  {
    "id": 246,
    "name": "Trait du Chaos maudit",
    "nameEn": "Chaos Bolt - Empowered",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Trait du Chaos",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 3) + Spécialité Trait du Chaos (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Temps d'incantation : 1 tour)",
    "condition": "Consomme 2 Éclats d'Âme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 5,
    "effect": "Lance un dragon de flammes du Fél guidé. Touche automatiquement, ignore l'armure et les boucliers, inflige un coup critique garanti et réduit la santé maximale de la cible de 15 %."
  },
  {
    "id": 247,
    "name": "Connexion d'âme",
    "nameEn": "Life Tap",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Endurance (Volonté & Récupération Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Sacrifie 15 % de vos PV actuels.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Convertit immédiatement votre propre sang en énergie magique, restaurant 20 % de votre réserve de Mana maximale ou générant 1 Éclat d'Âme."
  },
  {
    "id": 248,
    "name": "Siphon de vie de groupe",
    "nameEn": "Soul Leech",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Malédictions & Aflliction (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche lorsque vos sorts de dégâts d'Ombre/Feu infligent des dégâts.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "15 % de tous les dégâts que vous infligez sont convertis en un bouclier d'absorption passif entourant votre personnage (cumulable jusqu'à 30 % de vos PV max)."
  },
  {
    "id": 249,
    "name": "Affliction instable",
    "nameEn": "Unstable Affliction",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Malédictions & Affliction (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 1 Éclat d'Âme. (1 seule affliction instable active par cible).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Place une malédiction noire sur l'ennemi infligeant de lourds dégâts d'Ombre continus sur 3 tours. Si un soigneur ennemi tente de dissiper ce sort, la malédiction éclate au visage du soigneur, lui infligeant de monstrueux dégâts d'Ombre et le réduisant au silence pendant 2 tours."
  },
  {
    "id": 250,
    "name": "Agonie progressive",
    "nameEn": "Agony",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Malédictions & Affliction (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'applique instantanément.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Torture la cible avec une douleur grandissante. Inflige de faibles dégâts d'Ombre au début, mais les dégâts augmentent à chaque tour (jusqu'à 10 piles) pendant 4 tours."
  },
  {
    "id": 251,
    "name": "Corrompre l'âme",
    "nameEn": "Corruption",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Malédictions & Affliction (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'applique instantanément.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Infecte le sang de l'ennemi. Inflige des dégâts d'Ombre continus à chaque tour pendant 3 tours. Si la cible meurt sous Corruption, vous générez 1 Éclat d'Âme."
  },
  {
    "id": 252,
    "name": "Graine de Corruption",
    "nameEn": "Seed of Corruption",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Malédictions & Affliction (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 1 Éclat d'Âme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Implante une graine du Néant dans la chair de l'ennemi. Dès que la cible subit un montant fixe de dégâts de n'importe quelle source, la graine éclate, infligeant des dégâts d'Ombre à tous les ennemis à moins de 5 mètres et leur appliquant le sort Corruption."
  },
  {
    "id": 253,
    "name": "Malédiction de fatigue",
    "nameEn": "Curse of Exhaustion",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Malédictions",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Spécialité Malédictions (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Un ennemi ne peut porter qu'une seule malédiction de Démoniste à la fois.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Accable le corps de l'ennemi d'une lourdeur extrême. Réduit sa vitesse de déplacement de 50 % pendant 2 tours."
  },
  {
    "id": 254,
    "name": "Malédiction des langues",
    "nameEn": "Curse of Tongues",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "histoire-geographie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Intelligence (Histoire & Géographie Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un lanceur de sorts.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Force la cible à parler en démoniaque. Augmente le temps d'incantation de tous ses sorts de 30 % pendant 2 tours."
  },
  {
    "id": 255,
    "name": "Malédiction de faiblesse",
    "nameEn": "Curse of Weakness",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Force (Intimidation physique Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un attaquant physique.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Draine la force musculaire de l'ennemi. Réduit les dégâts physiques de ses attaques de mêlée de 20 % et l'empêche de porter des coups critiques pendant 2 tours."
  },
  {
    "id": 256,
    "name": "Pierre de soins démoniaque",
    "nameEn": "Create Healthstone",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Fabriquée avant le combat (max 3 pierres dans l'inventaire).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Façonne une pierre verte de sang infusé. Consommer la pierre en combat restaure instantanément 25 % de vos PV maximaux sans consommer d'action principale."
  },
  {
    "id": 257,
    "name": "Porte des Démons",
    "nameEn": "Demonic Gateway",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Téléportation",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Intelligence (Magie profane & Arcanes Rang 2) + Spécialité Téléportation (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Place 2 portails démoniaques au sol reliés entre 10 et 25 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Crée un passage abyssal. Tout allié marchant sur le premier portail est immédiatement téléporté au second portail, distançant les ennemis."
  },
  {
    "id": 258,
    "name": "Cercle de téléportation démoniaque",
    "nameEn": "Demonic Circle: Teleport",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Un cercle doit avoir été tracé au sol auparavant à moins de 20 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous vous téléportez instantanément sur votre cercle tracé, brisant tous les effets de ralentissement, d'enracinement et d'étourdissement qui vous affectaient."
  },
  {
    "id": 259,
    "name": "Singularité du Vide",
    "nameEn": "Singularity",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Magie du Vide (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Invoque un mini trou noir au-dessus de la cible. La singularité attire tous les ennemis situés à moins de 8 mètres vers son centre, leur inflige des dégâts d'Ombre et vous soigne de 20 % des dégâts infligés."
  },
  {
    "id": 260,
    "name": "Éruption du Vide",
    "nameEn": "Void Eruption",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Pénitent du Vide"
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Magie du Vide (Rang 3) + Titre requis : Pénitent du Vide",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Atteindre 100 points d'Insalubrité / Énergie du Vide.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 5,
    "effect": "Vous entrez en Forme du Vide. Libère une explosion d'Ombre de zone, transforme votre Trait d'Ombre en Fouet mental instantané et augmente tous vos dégâts d'Ombre de +20 % tant que l'énergie ne tombe pas à zéro."
  },
  {
    "id": 261,
    "name": "Attaque mentale",
    "nameEn": "Mind Blast",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Sagesse (Volonté spirituelle Rang 2) + Domaine Avancé Magie du Vide (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Envoie une décharge de démence directement dans le cerveau de l'ennemi. Inflige de lourds dégâts d'Ombre et absorbe une partie des prochains soins reçus par la cible."
  },
  {
    "id": 262,
    "name": "Fouet mental",
    "nameEn": "Mind Flay",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Magie du Vide (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée 1 tour)",
    "condition": "Maintenir la canalisation sans bouger.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Un rayon d'énergie ténébreuse relie votre main au cerveau de la cible. Inflige des dégâts d'Ombre répétés à chaque seconde et ralentit la vitesse de déplacement de la cible de 50 %."
  },
  {
    "id": 263,
    "name": "Ombre du Démon",
    "nameEn": "Grimoire of Sacrifice",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Sacrifie votre serviteur démon actif. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 4,
    "effect": "Vous tuez votre démon pour absorber son essence. Vous gagnez la capacité spéciale du démon sacrifié (Silence, Bouclier, Invisibilité) et vos sorts infligent +15 % de dégâts supplémentaires pendant 3 tours."
  },
  {
    "id": 264,
    "name": "Malédiction d'agonie éternelle",
    "nameEn": "Doom",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 1 Éclat d'Âme. (S'éclate au bout de 3 tours).",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Place une condamnation à mort sur l'ennemi. Au bout de 3 tours, le sort éclate, infligeant des dégâts d'Ombre massifs à la cible et invoquant un Démon Gardien de la Terreur si la cible meurt de l'explosion."
  },
  {
    "id": 265,
    "name": "Sombres pensées",
    "nameEn": "Mind Sear",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Magie du Vide (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "Cibler un ennemi entouré d'autres ennemis.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Fait jaillir des hallucinations terrifiantes du cerveau de la cible. Inflige des dégâts d'Ombre de zone à tous les autres ennemis situés à moins de 5 mètres de la cible principale."
  },
  {
    "id": 266,
    "name": "Étreinte vampirique",
    "nameEn": "Vampiric Embrace",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Médecine & Soins (Rang 2) + Domaine Avancé Magie du Vide (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 4,
    "effect": "Vous vous liez à vos alliés par l'Ombre pendant 2 tours. 50 % de tous les dégâts magiques d'Ombre à cible unique que vous infligez soignent automatiquement l'allié le plus affaibli du groupe."
  },
  {
    "id": 267,
    "name": "Fantôme de l'Ombre",
    "nameEn": "Shadowy Apparitions",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Magie du Vide (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche lors d'un coup critique réussi avec Attaque mentale ou Douleur maudite.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous invoquez un double spectral d'ombre flottant qui marche lentement vers la cible et lui inflige des dégâts d'Ombre supplémentaires à l'impact."
  },
  {
    "id": 268,
    "name": "Peste dévorante",
    "nameEn": "Devouring Plague",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Magie du Vide (Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme 50 points d'Insalubrité / Énergie du Vide.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Infecte la cible avec une maladie ténébreuse instantanée. Inflige d'immenses dégâts d'Ombre immédiats, puis des dégâts continus sur 2 tours, et vous soigne de 50 % des dégâts infligés."
  },
  {
    "id": 269,
    "name": "Silence psychique",
    "nameEn": "Silence",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous étouffez la voix de la cible par une onde mentale. Réduit la cible au silence (Silence 2 tours), l'empêchant de lancer le moindre sort magique."
  },
  {
    "id": 270,
    "name": "Horreur psychique",
    "nameEn": "Psychic Horror",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Magie du Vide (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Projette un spectre d'effroi dans l'esprit de l'ennemi. Étourdit la cible (Étourdissement 1 tour) et lui fait lâcher ses armes principales pendant 2 tours."
  },
  {
    "id": 271,
    "name": "Soumission de démon",
    "nameEn": "Enslave Demon",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Charisme (Persuasion & Diplomatie Rang 2) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Temps d'incantation : 1 tour)",
    "condition": "Cibler un Démon non-boss d'un niveau égal ou inférieur au vôtre.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Tord la volonté d'un démon ennemi. Le démon devient votre serviteur soumis pendant 1 heure, obéissant à vos ordres. (Le démon a 5 % de chances par tour de se libérer)."
  },
  {
    "id": 272,
    "name": "Onde du Fél",
    "nameEn": "Fel Pulse",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite d'effectuer un bond ou une esquive.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Émet une onde de flammes vertes autour de vous lors de votre réception au sol, infligeant des dégâts de Feu du Fél à tous les ennemis adjacents."
  },
  {
    "id": 273,
    "name": "Pacte de sang du succube",
    "nameEn": "Seductive Command",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite d'avoir séduit la cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous donnez un ordre fatal à un ennemi charmé. La cible effectue immédiatement une attaque physique de mêlée sur l'un de ses propres alliés proches avant de se réveiller du charme."
  },
  {
    "id": 274,
    "name": "Trait du Néant",
    "nameEn": "Void Bolt",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "advanced",
        "id": "magie-vide",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Domaine Avancé Magie du Vide (Rang 3) + Intelligence (Magie profane & Arcanes Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Utilisable uniquement sous Forme du Vide. Temps de recharge : 1 tour.",
    "cooldownTurns": 1,
    "usesPer": null,
    "manaCost": 5,
    "effect": "Projette une masse de matière noire. Inflige de lourds dégâts d'Ombre et prolonge la durée de vos sorts Douleur maudite et Attaque mentale actifs sur toutes les cibles proches de 2 tours."
  },
  {
    "id": 275,
    "name": "Main de Gul'dan",
    "nameEn": "Hand of Gul'dan",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Consomme 1 à 3 Éclats d'Âme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 5,
    "effect": "Fait tomber une comète de Feu du Fél qui s'écrase sur la cible. Inflige des dégâts de zone et fait surgir de 1 à 3 sauvagions démoniaques (Imp) qui pilonnent les ennemis proches."
  },
  {
    "id": 276,
    "name": "Implosion d'Imps",
    "nameEn": "Implosion",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Avoir au moins 2 sauvagions démoniaques (Imps) actifs sous vos ordres.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Vous ordonnez à tous vos sauvagions de se précipiter sur la cible et d'exploser. Chaque sauvagon s'autodétruit, infligeant des dégâts de Feu du Fél de zone à l'impact."
  },
  {
    "id": 277,
    "name": "Trait de l'Ombre ardent",
    "nameEn": "Incinerate",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une ligne de vue.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Lance une vague de feu ondulante le long du sol vers l'ennemi. Inflige des dégâts de Feu du Fél et génère des fragments d'Éclat d'Âme."
  },
  {
    "id": 278,
    "name": "Bénédiction de la Nuit noire",
    "nameEn": "Nightfall",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Domaine Avancé Malédictions & Affliction (Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche aléatoirement quand Corruption inflige des dégâts.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre prochain sort de Trait d'Ombre devient instantané et ses dégâts sont augmentés de +50 %."
  },
  {
    "id": 279,
    "name": "Moisson d'âmes du Néant",
    "nameEn": "Soul Harvest",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maledictions-affliction",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Démoniste du Conseil"
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Malédictions & Affliction (Rang 3) + Titre requis : Démoniste du Conseil",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 5,
    "effect": "Vous moissonnez les essences des tourmentés. Pendant 2 tours, votre vitesse de génération d'Éclat d'Âme est triplée et tous vos sorts d'Ombre/Feu infligent +20 % de dégâts."
  },
  {
    "id": 280,
    "name": "Malédiction du Fléau supérieur",
    "nameEn": "Doomguard / Terrorguard Summon",
    "category": "Voies de l'ombre, fél & démonologie",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 3) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Incanter : 1 tour)",
    "condition": "Consomme 1 Éclat d'Âme + Sacrifice rituel. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 5,
    "effect": "Invoque un Gardien de la Terreur géant ailéarmé d'une grande épée. Le démon pilonne la cible avec des traits de ruine et applique des malédictions d'affaiblissement pendant 3 tours."
  },
  {
    "id": 281,
    "name": "Exosquelette à vapeur gnomique",
    "nameEn": "Steam Armor Suit",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2) + Force (Maîtrise des armures Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Enfilage d'armure)",
    "condition": "Déployé depuis une caisse d'ingénieur. 1 fois par séance de jeu.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "effect": "Vous enfilez un exosquelette mécanique pendant 3 tours. Votre valeur d'armure augmente de +300 %, votre Force passe au Rang 5 et vous débloquez un lance-flammes intégré, mais votre Agilité tombe à 0."
  },
  {
    "id": 282,
    "name": "Tourelle mitrailleuse automatique",
    "nameEn": "Turret Deploy",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2) + Agilité (Tir & Lancer Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posée au sol à vos pieds.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Invoque une tourelle mécanique sur trépied pendant 2 tours. La tourelle effectue automatiquement une attaque à distance sur l'ennemi le plus proche au début de chaque tour."
  },
  {
    "id": 283,
    "name": "Rayon de contrôle mental gnomique",
    "nameEn": "Mind Control Cap",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2) + Charisme (Persuasion & Diplomatie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite le casque Casque de Contrôle Mental Gnomique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Projette un rayon d'ondes mentales sur un ennemi humanoïde. La cible est forcée de combattre aux côtés de votre groupe pendant 2 tours. (Risque de contrecoup : 1 sur 6 d'inverser le contrôle sur vous-même !)"
  },
  {
    "id": 284,
    "name": "Potion de rapidité extrême",
    "nameEn": "Swiftness Potion",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consommer une potion de vitesse préparée.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente votre vitesse de déplacement de +100 % pendant 2 tours et vous permet d'effectuer 1 action rapide supplémentaire par tour."
  },
  {
    "id": 285,
    "name": "Potion d'invisibilité alchimique",
    "nameEn": "Invisibility Potion",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "elixirs-arcaniques",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 3) + Domaine Avancé Élixirs Arcaniques (Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consommer une potion d'invisibilité. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Vous devenez totalement Invisible pendant 3 tours. Attaquer ou lancer un sort rompt immédiatement l'effet."
  },
  {
    "id": 286,
    "name": "Flacon du titan mortel",
    "nameEn": "Flask of the Titans",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "elixirs-arcaniques",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 3) + Domaine Avancé Élixirs Arcaniques (Rang 3) + Endurance (Volonté & Récupération Rang 3)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat / Buff de longue durée",
    "condition": "Consommé avant une expédition/donjon.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente vos Points de Vie maximaux de +30 % et votre résistance physique de +2d6 pendant toute la durée de la séance de jeu (ne se cumule pas avec d'autres flacons)."
  },
  {
    "id": 287,
    "name": "Dispositif de réanimation gnomique",
    "nameEn": "Goblin Jumper Cables",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Médecine & Soins (Rang 2) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Hors combat)",
    "condition": "Cibler un allié mort depuis moins de 5 minutes.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous appliquez des électrodes d'ingénieur sur le cœur du défunt. A 66 % de chances de ramener l'allié à la vie avec 10 % de ses PV. (33 % de chances de détruire le câble et de brûler le corps !)"
  },
  {
    "id": 288,
    "name": "Filet de capture renforcé",
    "nameEn": "Net-o-Matic",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler une personne à moins de 10 mètres (terrestre ou volante).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Projette un filet de câbles d'acier. Immobilise la cible au sol (Enracinement 2 tours) et fait chuter les cibles volantes au sol."
  },
  {
    "id": 289,
    "name": "Bombe au plasma de Fer",
    "nameEn": "Iron Grenade",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Explosifs",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 2) + Spécialité Explosifs (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une grenade d'inventaire.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Explosion mécanique en zone (3m). Inflige des dégâts physiques/Feu et assomme (Étourdissement 1 tour) tous les ennemis touchés dans le rayon d'impact."
  },
  {
    "id": 290,
    "name": "Bottes de fusée hyper-propulsées",
    "nameEn": "Nitro Boosts",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 1) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Augmente votre vitesse de déplacement de +150 % pendant 2 tours. (Risque de fuite : 1 sur 10 de déclencher un incendie de ceinture qui vous propulse en l'air !)"
  },
  {
    "id": 291,
    "name": "Déguisement de cochon nain",
    "nameEn": "Noggenfogger Elixir",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 2) + Charisme (Tromperie & Comédie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Boire une fiole de Simolixir de Noggenfogger.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Déclenche un effet aléatoire sur 1d3 : 1 : Vous devenez un squelette léger (Marche sur l'eau) ; 2 : Vous rétrécissez (Esquive +1d6) ; 3 : Vous devenez léger comme une plume (Chute lente)."
  },
  {
    "id": 292,
    "name": "Huile de feu d'artifice",
    "nameEn": "Fire Oil Weapon Coating",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Tranchant/Perçant",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 2) + Spécialité Tranchant/Perçant (Lvl 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat / Enduit",
    "condition": "Appliqué sur une arme.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos 5 prochaines attaques réussies avec cette arme déclenchent une explosion de flammes infligeant des dégâts de Feu secondaires."
  },
  {
    "id": 293,
    "name": "Cape de réflexion mécanique",
    "nameEn": "Gyrofreeze Ice Reflector",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2) + Domaine Résistance physique (Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Lancé lorsqu'un sort de Givre/Feu/Ombre vous cible. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Active un miroir mécanique tournoyant. Renvoye instantanément le sort magique hostile à son lanceur d'origine."
  },
  {
    "id": 294,
    "name": "Couteau suisse d'ingénieur",
    "nameEn": "Ultimate Gnomish Army Knife",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Bricolage Goblino-Gnome",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 2) + Spécialité Bricolage Goblino-Gnome (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Outil universel)",
    "condition": "Conservé dans votre sac.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Remplace l'intégralité des outils de récolte et d'artisanat (Marteau de forge, Couteau à dépecer, Pioche de minage, Trousse de crochetage) et vous donne +1d6 sur tous les tests d'Artisanat."
  },
  {
    "id": 295,
    "name": "Seringue de sang-de-dragon",
    "nameEn": "Dragonblood Serum",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "elixirs-arcaniques",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 3) + Domaine Avancé Élixirs Arcaniques (Rang 2) + Endurance (Tolérance aux toxines Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Vous vous injectez du sang de dragon noir. Pendant 2 tours, votre armure augmente de +100 % et vous crachez du feu sur quiconque vous frappe en mêlée."
  },
  {
    "id": 296,
    "name": "Robot dépanneur portable",
    "nameEn": "Jeeves / Repair Bot",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Maître Ingénieur"
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 3) + Titre requis : Maître Ingénieur",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Déployé au sol. 1 fois par séance de jeu.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "effect": "Invoque un majordome mécanique chic (Jeeves) pendant 10 minutes. Permet à tout le groupe de réparer gratuitement ses armes/armures endommagées, de vendre du bric-à-brac et d'accéder à la Banque de Guilde."
  },
  {
    "id": 297,
    "name": "Viseur télescopique gnomique",
    "nameEn": "Sniper Scope",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Armes à feu/Arcs",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 2) + Agilité (Tir & Lancer Rang 3) + Spécialité Armes à feu/Arcs (Lvl 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide (Visée)",
    "condition": "Fixé sur une arme à distance.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous ajustez la lentille de votre viseur. Augmente la portée maximale de votre arme à distance de +10 mètres et votre prochaine attaque ignore la couverture partielle de la cible."
  },
  {
    "id": 298,
    "name": "Potion de libre action",
    "nameEn": "Free Action Potion",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie & Herboristerie Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Boire une potion de libre action. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Vous rend totalement immunisé aux étourdissements, ralentissements et enracinements pendant 2 tours complets. N'annule pas les effets déjà subis avant l'ingestion."
  },
  {
    "id": 299,
    "name": "Pierre de téléportation de Dalaran",
    "nameEn": "Hearthstone / Wormhole Generator",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Téléportation & Portails",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Spécialité Téléportation & Portails (Lvl 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat (Incanter : 1 minute)",
    "condition": "1 fois par séance de jeu.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "effect": "Ouvre un trou de ver instable au-dessus du groupe. Téléporte instantanément l'intégralité du groupe de joueurs dans une capitale majeure d'Azeroth ou à l'Auberge liée de leur choix."
  },
  {
    "id": 300,
    "name": "Bombe à fission d'azérite",
    "nameEn": "Azerite World-Breaker Bomb",
    "category": "Voies techniques, artisanat & tactique",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Maître Bricoleur"
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2) + Titre requis : Maître Bricoleur",
    "actionType": "complete",
    "actionLabel": "Action Complète (Incanter / Amorcer : 1 tour)",
    "condition": "Nécessite une charge d'Azérite stygienne pure. 1 fois par campagne / événement majeur.",
    "cooldownTurns": null,
    "usesPer": "campagne",
    "manaCost": 2,
    "effect": "Vous déployez une charge de destruction massive. Éclate au tour suivant, détruisant toutes les structures et fortins dans un rayon de 30 mètres et infligeant d'immenses dégâts hybrides Feu/Arcane/Physique à tous les êtres présents dans la zone."
  },
  {
    "id": 301,
    "name": "Endurcissement des Plaines",
    "nameEn": "Thick Hide",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 2) + Force (Maîtrise des armures Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre peau ou cuir chevelu s'épaissit sous les coups. Augmente vos Points de Vie maximaux de +10 % de façon permanente et réduit tous les dégâts physiques tranchants subis de 1 point par dé."
  },
  {
    "id": 302,
    "name": "Peau de roche du Tauren",
    "nameEn": "Toughness",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre constitution colossale repousse la douleur. Augmente votre réserve de Points de Vie maximaux de +20 % de façon permanente."
  },
  {
    "id": 303,
    "name": "Blindage de Plaques lourd",
    "nameEn": "Plate Mail Expertise",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Armures de plaques",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 3) + Spécialité Armures de plaques (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Nécessite de porter une armure lourde de Plaques complète.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous maîtrisez parfaitement la répartition du poids de votre armure. Augmente la valeur de protection d'Armure apportée par vos Plaques de +25 % et annule le malus de vitesse de déplacement lié aux armures lourdes."
  },
  {
    "id": 304,
    "name": "Rempart de la Croisade",
    "nameEn": "Shield Mastery",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Boucliers",
        "level": 2
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 2) + Spécialité Boucliers (Lvl 2) + Sagesse (Magie divine & Sacrée Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Nécessite d'avoir un bouclier équipé.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre bouclier devient une seconde muraille. Augmente votre Armure de base d'un montant fixe et vous permet d'appliquer la valeur de blocage de votre bouclier contre les attaques magiques de face."
  },
  {
    "id": 305,
    "name": "Robustesse des Titans",
    "nameEn": "Vitality of the Titans",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Protecteur d'Azeroth"
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Force (Intimidation physique Rang 2) + Titre requis : Protecteur d'Azeroth",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Infusé de la puissance originelle des Titans. Augmente vos Points de Vie maximaux de +30 % et vous gagnez +1d6 permanent sur tous vos tests de Résistance physique et d'Endurance."
  },
  {
    "id": 306,
    "name": "Forme de pierre alpine",
    "nameEn": "Stoneform Passive",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Extraction (Minage)",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Spécialité Extraction (Minage) (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre chair prend la densité du granit nain. Augmente votre valeur d'Armure physique naturelle de +15 % et vous rend totalement immunisé aux saignements légers."
  },
  {
    "id": 307,
    "name": "Métabolisme d'ours dévorant",
    "nameEn": "Survival of the Fittest",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Forme animale",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 2) + Sagesse (Communion naturelle Rang 2) + Spécialité Forme animale (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Actif sous Forme d'Ours ou de Protecteur.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente le bonus de Points de Vie de la Forme d'Ours de +15 % supplémentaires et convertit 5 % de votre Armure totale en dégâts physiques bonus sur vos attaques de mêlée."
  },
  {
    "id": 308,
    "name": "Présence de glace fortifiée",
    "nameEn": "Frost Presence",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Maîtrise des armures Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 2) + Domaine Avancé Magie du Givre & Altération (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Posture active.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une couche de givre magique recouvre votre armure. Augmente votre Armure physique de +30 %, vos Points de Vie maximaux de +10 % et réduit la menace générée par les alliés proches."
  },
  {
    "id": 309,
    "name": "Suture de chair abominable",
    "nameEn": "Thick Stitches",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines Rang 3) + Sagesse (Médecine & Soins Rang 2) + Domaine Avancé Nécromancie & Peste (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent (Modification corporelle).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Des pièces de chair renforcées cousues sur votre corps. Augmente vos Points de Vie maximaux de +15 % et vous immunise aux effets de poison d'origine organique."
  },
  {
    "id": 310,
    "name": "Armure de néant entrelacée",
    "nameEn": "Shadow Weave Armor",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 2) + Agilité (Artisanat délicat / Couture Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Nécessite d'habiller votre personnage avec des vêtements en tissu ou cuir enchanté.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos habits en tissu sont renforcés par des fils d'ombre. Accorde un bonus d'Armure physique égal à votre score de Charisme à un personnage ne portant pas d'armure lourde."
  },
  {
    "id": 311,
    "name": "Infusion d'Azérite sanguine",
    "nameEn": "Azerite Hardened Skin",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Intelligence (Technomancie & Ingénierie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Du sang d'Azérite cristallisé coule dans vos veines. Augmente votre Armure de +10 % et vos Points de Vie de +10 %. Chaque coup subit a 10 % de chances de déclencher un bouclier d'absorption temporaire."
  },
  {
    "id": 312,
    "name": "Discipline du défenseur sacré",
    "nameEn": "Anticipation",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Magie divine & Sacrée Rang 2) + Force (Maîtrise des armures Rang 2) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "En combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre lecture du combat anticipe les impacts. Réduit tous les dégâts physiques subis d'un montant fixe égal à votre Rang dans le Domaine Tactique & Analyse."
  },
  {
    "id": 313,
    "name": "Cuirassé d'engrenages gnomique",
    "nameEn": "Reinforced Plating",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ingenierie-goblino-gnome",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Technomancie & Ingénierie Rang 3) + Domaine Avancé Ingénierie Goblino-Gnome (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Nécessite d'équiper des modules d'armure d'ingénieur.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Des plaques mécaniques articulées absorbent les chocs. Augmente l'Armure de +20 % et réduit de 50 % les dégâts subis par les explosions ou le feu."
  },
  {
    "id": 314,
    "name": "Volonté d'acier indomptable",
    "nameEn": "Indomitable",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Lorsque vos Points de Vie tombent sous la barre des 30 %.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre corps refuse d'abandonner. Votre Armure physique est doublée (+100 %) et vous devenez immunisé aux coups critiques tant que vos PV restent sous le seuil des 30 %."
  },
  {
    "id": 315,
    "name": "Pacte de sang du Seigneur démon",
    "nameEn": "Demon Skin / Demon Armor",
    "category": "Passifs de survie, d'armure & de santé",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "demonologie-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Magie de l'Ombre & Fél Rang 3) + Domaine Avancé Démonologie & Fél (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura personnelle)",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre peau prend l'aspect écailleux et dur d'un démon majeur. Augmente votre Armure de +30 %, vos Points de Vie de +10 % et vous régénérez passivement 1 % de vos PV maximaux toutes les secondes en combat."
  },
  {
    "id": 316,
    "name": "Langue de serpenteur",
    "nameEn": "Lesser Suggestion",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 2) + Charisme (Tromperie & Comédie Rang 1)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "En discussion privée avec une cible non-hostile.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous glissez une suggestion subtile dans la conversation. La cible a 50 % de chances d'accepter une requête mineure (ex: baisser un prix de 10 %, fermer les yeux sur une infraction mineure) sans se rendre compte qu'elle a été influencée."
  },
  {
    "id": 317,
    "name": "Estimation de marchand goblino-gnome",
    "nameEn": "Appraiser's Eye",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Alchimie / Technomancie / Histoire Rang 2) + Charisme (Négociation & Commerce Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Examiner un objet ou un trésor pendant quelques secondes.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous identifiez instantanément la valeur exacte au marché noir et au marché officiel de l'objet, sa rareté, ainsi que d'éventuels vices cachés ou contrefaçons.",
    "notes": "Prérequis OU : Alchimie / Technomancie / Histoire Rang 2 — seul le premier (Alchimie & Herboristerie) est gardé."
  },
  {
    "id": 318,
    "name": "Négociation sous pression",
    "nameEn": "Hard Bargain",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 2) + Force (Intimidation physique Rang 2)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "Lors de l'achat ou de la revente d'un lot important auprès d'un marchand.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous associez argumentation commerciale et présence physique imposante. Vous obtenez une réduction de 20 % à l'achat ou un bonus de 20 % à la revente."
  },
  {
    "id": 319,
    "name": "Voix d'or du diplomate",
    "nameEn": "Diplomatic Immunity",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Ambassadeur"
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 3) + Domaine Tactique & Analyse (Rang 2) + Titre requis : Ambassadeur",
    "actionType": "dialogue",
    "actionLabel": "Action Rapide (Sociale)",
    "condition": "Face à des gardes ou une autorité locale en situation de tension.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous imposez le respect par votre stature diplomatique. Les autorités hésitent à vous arrêter ou à attaquer immédiatement, vous accordant un sursis de 5 minutes pour négocier ou vous expliquer."
  },
  {
    "id": 320,
    "name": "flair pour l'or",
    "nameEn": "Gold Scent",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Perception & Sens Rang 2) + Charisme (Négociation & Commerce Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "En exploration dans un lieu habité ou des ruines.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous détectez instinctivement la présence de bourses cachées, de coffres forts ou de PNJ aisés dans un rayon de 10 mètres."
  },
  {
    "id": 321,
    "name": "Faux-semblant parfait",
    "nameEn": "Poker Face",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre visage et vos réactions sont totalement insondables. Vous êtes immunisé aux sorts ou capacités visant à détecter vos mensonges ou lire vos émotions."
  },
  {
    "id": 322,
    "name": "Charme ensorcelant",
    "nameEn": "Charm Person",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 2) + Charisme (Magie de l'Ombre & Fél Rang 1)",
    "actionType": "dialogue",
    "actionLabel": "Action Complète (Sociale)",
    "condition": "Regarder la cible dans les yeux lors d'un échange. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 1,
    "effect": "La cible vous considère comme un ami cher et loyal pendant 1 heure. Elle répondra de manière favorable à vos questions tant que vous ne lui demandez pas de se mettre en danger.",
    "notes": "\"Action Complète (Sociale)\" classée dialogue (règle \"(Sociale)\")."
  },
  {
    "id": 323,
    "name": "Monopole commercial",
    "nameEn": "Monopoly Contract",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Signer un accord commercial ou de quête dans une ville/port.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous vous assurez l'exclusivité d'une transaction. Vos récompenses en or pour la quête associée sont augmentées de +30 % et les marchands concurrents ne peuvent pas intervenir."
  },
  {
    "id": 324,
    "name": "Discours motivant",
    "nameEn": "Inspiring Oration",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Charisme (Persuasion & Diplomatie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Hors combat)",
    "condition": "S'adresser à une foule ou à votre groupe pendant au moins 1 minute avant une expédition.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tous vos alliés et PNJ alliés reçoivent un bonus de +1d6 à tous leurs tests de Volonté et d'Initiative pour la durée de la scène à venir.",
    "notes": "\"Action Complète (Hors combat)\" classée complete (premier mot)."
  },
  {
    "id": 325,
    "name": "Lecture des intentions",
    "nameEn": "Cold Reading",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Perception & Sens Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Observer une personne parler pendant 30 secondes.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous percevez les besoins profonds, les peurs ou la motivation principale du PNJ (or, pouvoir, sécurité, vengeance), vous donnant +2d6 sur votre prochain test de persuasion ou de tromperie contre lui."
  },
  {
    "id": 326,
    "name": "Réseau de rumeurs",
    "nameEn": "Street Gossip",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Réseau d'informateurs",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 2) + Sagesse (Perception & Sens Rang 2) + Spécialité Réseau d'informateurs (Lvl 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat (1 heure en ville)",
    "condition": "Passer une heure dans les tavernes ou bas-fonds d'une ville.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous récoltez immédiatement 3 informations cruciales ou secrets locaux sur la politique, les marchands ou les menaces de la région."
  },
  {
    "id": 327,
    "name": "Intimidation polie",
    "nameEn": "Velvet Threat",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 2) + Force (Intimidation physique Rang 2)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "S'adresser à un noble, un marchand ou une figure d'autorité.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous formulez une menace sous la forme d'un compliment raffiné. Vous forcez la cible à coopérer sans entacher votre réputation publique ni déclencher d'hostilité ouverte de la garde."
  },
  {
    "id": 328,
    "name": "Pot-de-vin magistral",
    "nameEn": "Grease the Palms",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 2) + Charisme (Tromperie & Comédie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Offrir de l'or à un garde, un passeur ou un fonctionnaire.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous savez exactement quel montant proposer pour contourner la bureaucratie. L'accès ou le service vous est accordé instantanément sans poser de questions, et le PNJ gardera le silence."
  },
  {
    "id": 329,
    "name": "Vente de camelote magique",
    "nameEn": "Snake Oil Pitch",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 3) + Intelligence (Alchimie / Technomancie Rang 1)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "Tenter de vendre un objet sans valeur ou cassé.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous convainquez un acheteur ingenu que l'objet est un artefact rare ou magique, parvenant à le vendre au quintuple (x5) de sa valeur réelle.",
    "notes": "Prérequis OU : Alchimie / Technomancie Rang 1 — seul le premier (Alchimie & Herboristerie) est gardé."
  },
  {
    "id": 330,
    "name": "Infiltration aristocratique",
    "nameEn": "Nobility Etiquette",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "histoire-geographie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 3) + Intelligence (Histoire & Géographie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Dans les hautes sphères, cours royales ou banquets.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous maîtrisez parfaitement le protocole des nobles d'Azeroth. Vous êtes automatiquement accepté dans la haute société et gagnez un bonus permanent de +1d6 sur toutes vos interactions avec les dirigeants."
  },
  {
    "id": 331,
    "name": "Détournement d'attention",
    "nameEn": "Distraction",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Faire un scandale, lancer un objet ou faire un spectacle impromptu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tous les PNJ dans un rayon de 10 mètres détournent le regard vers vous pendant 1 tour, permettant à vos alliés d'agir en furtivité sans risque de se faire repérer."
  },
  {
    "id": 332,
    "name": "Présence pacificatrice",
    "nameEn": "Pacify",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Face à un groupe sur le point d'en venir aux mains (hors monstres/démons).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous désamorcez l'agressivité ambiante par un mot apaisant. Repousse le déclenchement du combat de 2 tours, laissant une fenêtre de négociation ultime."
  },
  {
    "id": 333,
    "name": "Troc d'urgence",
    "nameEn": "Emergency Barter",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Auprès de voyageurs ou mercenaires en milieu sauvage.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous échangez des fournitures de aventurier contre des consommables clés (potions, cartes, munitions) sans débourser une seule pièce d'or, à un taux d'échange très avantageux."
  },
  {
    "id": 334,
    "name": "Aura de confiance",
    "nameEn": "Aura of Trust",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 3) + Sagesse (Magie divine & Sacrée Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Aura)",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre présence dégage de la sérénité et de l'honnêteté. Les PNJ inconnus commencent systématiquement leurs interactions avec vous avec un a priori favorable (statut Amical de base)."
  },
  {
    "id": 335,
    "name": "Marchandage d'intermédiaire",
    "nameEn": "Broker's Margin",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Courtier / Marchand"
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 3) + Titre requis : Courtier / Marchand",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Lorsque vous revendez le butin amassé par votre groupe en ville.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous négociez au nom de toute votre équipe : tout l'or généré par la vente du butin de donjon ou de quête est augmenté de +15 % pour l'ensemble du groupe."
  },
  {
    "id": 336,
    "name": "Chant de la sirène / Barde",
    "nameEn": "Captivating Song",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Musique / Chant",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 2) + Charisme (Persuasion & Diplomatie Rang 2) + Spécialité Musique / Chant (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète (Canalisée)",
    "condition": "En jouant d'un instrument ou en chantant dans une taverne ou un lieu public.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous captivez l'audience. Tous les PNJ écoutant votre prestation subissent un malus de -2d6 à leur Perception, facilitant le vol à la tire ou le crochetage par vos coéquipiers."
  },
  {
    "id": 337,
    "name": "Double jeu politique",
    "nameEn": "Playing Both Sides",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Travailler simultanément pour deux factions rivales (ex: Baie-du-Butin et la Voile Sanglante).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos mensonges sont si bien structurés que vous pouvez accomplir des quêtes pour deux factions ennemies sans perdre votre réputation auprès de l'une ou de l'autre."
  },
  {
    "id": 338,
    "name": "Commandement imposant",
    "nameEn": "Intimidating Command",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Intimidation physique Rang 3) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler un PNJ de rang inférieur ou un garde.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous aboyez un ordre direct d'un ton indiscutable. Le PNJ obéit immédiatement sans réfléchir (ex: « Laisse cette porte ouverte ! », « Donne-moi ces clefs ! »)."
  },
  {
    "id": 339,
    "name": "Détection des faux-semblants",
    "nameEn": "Spot Lie",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Perception & Sens Rang 3) + Charisme (Tromperie & Comédie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Lors d'un dialogue.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le MJ vous informe automatiquement lorsqu'un PNJ tente de vous mentir, de vous cacher une information essentielle ou de vous manipuler."
  },
  {
    "id": 340,
    "name": "Discours rassembleur",
    "nameEn": "Crowd Rally",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Capitaine"
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Charisme (Persuasion & Diplomatie Rang 3) + Titre requis : Capitaine",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Devant une foule de citoyens ou de paysans armés. 1 fois par scénario.",
    "cooldownTurns": null,
    "usesPer": "scenario",
    "effect": "Vous haranguez la foule et levez une milice populaire temporaire de 5 à 10 PNJ locaux prêts à se battre à vos côtés pour défendre leur ville."
  },
  {
    "id": 341,
    "name": "Négociation de trêve",
    "nameEn": "Truce",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "persuasion-diplomatie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Charisme (Persuasion & Diplomatie Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "En plein combat contre un groupe d'ennemis intelligents blessés.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous proposez une trêve ou une reddition. Si l'ennemi est en difficulté, il stoppe immédiatement le combat pour écouter vos conditions de capitulation ou d'échange de prisonniers."
  },
  {
    "id": 342,
    "name": "Voix de stentor",
    "nameEn": "Stentorian Voice",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Intimidation physique Rang 2) + Charisme (Commandement & Inspiration Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "En extérieur ou dans une grande salle.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre voix porte à plus de 500 mètres sans effort magique. Permet de donner des ordres à des unités distantes ou de vous faire entendre au-dessus du bruit d'une bataille ou d'une tempête."
  },
  {
    "id": 343,
    "name": "Seduction féroce",
    "nameEn": "Seductive Charm",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tromperie-comedie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Charisme (Tromperie & Comédie Rang 3) + Agilité (Combat de précision Rang 1)",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue",
    "condition": "Cibler une personne attirée par votre personnage.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous utilisez votre attrait physique et votre charisme pour déstabiliser la cible. La cible subit un malus de -2d6 sur tous ses jets de Volonté et de Discernement face à vous pour le reste de la scène."
  },
  {
    "id": 344,
    "name": "Réputation légendaire",
    "nameEn": "Fame & Glory",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "commandement-inspiration",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Héros d'Azeroth"
      }
    ],
    "prerequisitesRaw": "Charisme (Commandement & Inspiration Rang 3) + Titre requis : Héros d'Azeroth",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Dans les zones contrôlées par votre faction.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre nom vous précède. Les auberges et repas vous sont offerts gratuitement, et les PNJ de votre faction se plient en quatre pour vous fournir abri et assistance."
  },
  {
    "id": 345,
    "name": "Pacte du sang d'or",
    "nameEn": "Gilded Contract",
    "category": "Voies sociales & commerce",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Baron Noir"
      }
    ],
    "prerequisitesRaw": "Charisme (Négociation & Commerce Rang 3) + Charisme (Magie de l'Ombre & Fél Rang 2) + Titre requis : Baron Noir",
    "actionType": "dialogue",
    "actionLabel": "Action de Dialogue / Contrat",
    "condition": "Faire signer un contrat scellé par une goutte de sang à un PNJ.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Le contrat devient magiquement contraignant. Si le PNJ rompt son engagement commercial ou sa promesse, il subit une malédiction d'Ombre qui réduit sa santé maximale de 50 % jusqu'à ce qu'il honore sa parole."
  },
  {
    "id": 346,
    "name": "Marche forcée du vétéran",
    "nameEn": "Forced March",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "energie-souffle",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Énergie & Souffle Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Exploration)",
    "condition": "Lors des déplacements de groupe sur longue distance.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous doublez la distance franchie par le groupe par jour de voyage sans accumuler de points de Fatigue. Vos alliés bénéficient également de votre endurance."
  },
  {
    "id": 347,
    "name": "Corps d'acier insensible",
    "nameEn": "Ignore Pain",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "ivresse-combat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Domaine Avancé Ivresse du Combat (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Consomme de la Rage ou de la Ferveur. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Vous refoulez la douleur par la volonté. Crée un bouclier d'absorption massif égal à 50 % des dégâts subis lors du dernier tour."
  },
  {
    "id": 348,
    "name": "Stase de survie cryogénique",
    "nameEn": "Cryo-Stasis",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-givre-alteration",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Domaine Avancé Magie du Givre & Altération (Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Se déclenche automatiquement si vous subissez une attaque mortelle. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "manaCost": 4,
    "effect": "Votre corps se pétrifie dans un givre protecteur à 1 PV. Vous devenez totalement inciblable et invulnérable pendant 1 tour tout en régénérant 20 % de vos PV maximaux."
  },
  {
    "id": 349,
    "name": "Volonté d'acier inébranlable",
    "nameEn": "Unyielding Will",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre esprit est ancré dans votre corps. Vous gagnez +2d6 sur tous vos jets de sauvegarde contre les tentatives de contrôle mental, de charme, de peur ou de terreur."
  },
  {
    "id": 350,
    "name": "Accoutumance aux fléaux",
    "nameEn": "Plague Resilience",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre système immunitaire a ingéré les pires poisons d'Azeroth. Vous êtes totalement immunisé aux maladies d'origine organique et réduisez les dégâts de Peste/Ombre subis de 25 %."
  },
  {
    "id": 351,
    "name": "Rempart de chair",
    "nameEn": "Meat Shield",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Forme animale / Forme colossale",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Spécialité Forme animale / Forme colossale (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Lorsque vos Points de Vie maximaux dépassent 100 PV.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre masse corporelle absorbe les chocs. Réduit de manière permanente tous les dégâts physiques tranchants et perçants subis d'un montant fixe égal à votre score d'Endurance."
  },
  {
    "id": 352,
    "name": "Deuxième cœur",
    "nameEn": "Second Heart",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Inflexible"
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Titre requis : Inflexible",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Se déclenche lorsque vos PV tombent à 0. 1 fois par séance de jeu.",
    "cooldownTurns": null,
    "usesPer": "seance",
    "effect": "Un spasme musculaire massif relance votre cœur. Vous ne tombez pas inconscient et récupérez immédiatement 25 % de vos PV maximaux sans interrompre votre tour."
  },
  {
    "id": 353,
    "name": "Résistance aux éléments de Norfendre",
    "nameEn": "Frostborn Resilience",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Climats extrêmes",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Survie en milieu hostile Rang 3) + Spécialité Climats extrêmes (Lvl 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous ne subissez aucun effet négatif lié au froid extrême, aux blizzards ou à la haute altitude. Vous réduisez de 2 points par dé tous les dégâts de Givre subis."
  },
  {
    "id": 354,
    "name": "Respiration de gargouille",
    "nameEn": "Gargoyle Lungs",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "energie-souffle",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Énergie & Souffle Rang 3) + Sagesse (Communion naturelle Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "En immersion aquatique ou dans des gaz toxiques.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous pouvez retenir votre respiration pendant une durée indéfinie (plusieurs heures) et êtes totalement immunisé à l'asphyxie, à la noyade et aux gaz de combat asphyxiants."
  },
  {
    "id": 355,
    "name": "Apaisement des saignements",
    "nameEn": "Clotting",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 2) + Sagesse (Médecine & Soins Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "S'active lorsque vous subissez un effet de saignement continu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Par une contraction musculaire ciblée, vous stoppez immédiatement tous les effets de saignement qui vous affectent."
  },
  {
    "id": 356,
    "name": "Peau de magma cristallisée",
    "nameEn": "Obsidian Skin",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "maitrise-elements",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Domaine Avancé Maîtrise des Éléments (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 3 tours.",
    "cooldownTurns": 3,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Votre peau prend la consistance de l'obsidienne. Vous devenez totalement immunisé aux dégâts de Feu et de Magma pendant 2 tours et gagnez +50 % d'Armure physique."
  },
  {
    "id": 357,
    "name": "Ténacité du sang ancien",
    "nameEn": "Ancient Bloodline",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 2) + Charisme (Magie de l'Ombre & Fél Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'efficacité de tous les soins reçus (potions, sorts, régénération) sur votre personnage est augmentée de +20 % de façon permanente."
  },
  {
    "id": 358,
    "name": "Ancrage au sol",
    "nameEn": "Grounded Stance",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 2) + Force (Athlétisme Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide (Posture)",
    "condition": "Les deux pieds ancrés au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous devenez totalement impossible à repousser, renverser (A terre) ou projeter dans les airs par des sorts ou attaques physiques tant que vous ne vous déplacez pas."
  },
  {
    "id": 359,
    "name": "Transfusion de vitalité",
    "nameEn": "Vitality Share",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Sagesse (Magie divine & Sacrée Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Sacrifie une portion de vos propres PV.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Vous déduisez jusqu'à 30 % de vos PV actuels pour les transférer sous forme de bouclier d'absorption pur sur un allié adjacent en danger imminent."
  },
  {
    "id": 360,
    "name": "Ingestion de poisons acides",
    "nameEn": "Corrosive Stomach",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "tolerance-toxines",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Tolérance aux toxines Rang 3) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous pouvez ingérer des acides, venins ou liquides corrompus sans subir de dégâts. Vous convertissez les toxines avalées en ressource de mana ou d'énergie."
  },
  {
    "id": 361,
    "name": "Tête brûlée",
    "nameEn": "Hard Head",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 2) + Force (Intimidation physique Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Réaction)",
    "condition": "Lors d'une tentative d'étourdissement ou de désorientation en mêlée.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "La durée de tous les étourdissements physiques subis est réduite de 1 tour (minimum 0 tour). S'il tombe à 0 tour, l'attaquant subit lui-même le contre-coup et est étourdi à votre place.",
    "notes": "\"Passif (Réaction)\" classé passif."
  },
  {
    "id": 362,
    "name": "Peau de dragon écailleuse",
    "nameEn": "Scales of the Aspect",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-draconique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Domaine Avancé Magie Draconique (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Des écailles draconiques invisibles renforcent votre cuir. Augmente votre résistance magique de base de +2d6 contre toutes les écoles de magie (Feu, Givre, Arcane, Ombre, Sacré, Nature)."
  },
  {
    "id": 363,
    "name": "Métabolisme de troll",
    "nameEn": "Troll Regeneration",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Endurance (Volonté & Récupération Rang 3) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent (y compris en combat).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous régénérez 2 % de vos PV maximaux au début de chacun de vos tours, même en plein combat ou sous l'effet de blessures béantes."
  },
  {
    "id": 364,
    "name": "Récurrence musculaire",
    "nameEn": "Muscle Memory",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "energie-souffle",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Endurance (Énergie & Souffle Rang 3) + Domaine Tactique & Analyse (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Les malus de fatigue physique sur vos jets de dés sont réduits de moitié. Vous pouvez combattre pendant plusieurs heures consécutives sans subir de pénalité de malus de dés de réserve."
  },
  {
    "id": 365,
    "name": "Rempart de ténacité ultime",
    "nameEn": "Indomitable Wall",
    "category": "Voies de l'endurance, ténacité & survie extrême",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-recuperation",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Inflexible"
      }
    ],
    "prerequisitesRaw": "Endurance (Résistance physique Rang 3) + Endurance (Volonté & Récupération Rang 3) + Titre requis : Inflexible",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Vous devenez un roc inébranlable pendant 2 tours. Tous les dégâts subis de toutes sources (physiques, magiques, toxines) sont réduits de 75 %."
  },
  {
    "id": 366,
    "name": "Démolition de structure",
    "nameEn": "Structure Breaker",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Armes à deux mains / Masse",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Spécialité Armes à deux mains / Masse (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un élément de décor (porte, mur, barricade, fortification, pont).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une frappe d'une violence inouïe qui inflige le quadruples (x4) de dégâts physiques aux objets inertes, brisant instantanément les portes renforcées et les mécanismes de défense."
  },
  {
    "id": 367,
    "name": "Projection d'ennemi",
    "nameEn": "Hurl Foe",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Lutte / Mains nues",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Spécialité Lutte / Mains nues (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Avoir empoigné (Agrippé) un ennemi de taille humanoïde au tour précédent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous attrapez l'adversaire et le projetez violemment à jusqu'à 8 mètres de distance. La cible et l'éventuel ennemi sur lequel elle atterrit subissent de lourds dégâts physiques et tombent à terre (A terre)."
  },
  {
    "id": 368,
    "name": "Balayage d'arme lourde",
    "nameEn": "Heavy Cleave",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Haches/Épées à deux mains",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Spécialité Haches/Épées à deux mains (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une arme lourde à deux mains et au moins 2 ennemis adjacents.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous décrivez un arc de cercle dévastateur. Vous effectuez un jet d'attaque unique comparé à la défense de tous les ennemis adjacents, infligeant 100 % de vos dégâts normaux à chaque cible touchée."
  },
  {
    "id": 369,
    "name": "Écrasement d'armure",
    "nameEn": "Shatter Armor",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Domaine Tactique & Analyse (Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Un coup ciblant la structure de la cuirasse adverse. Inflige des dégâts physiques et réduit la valeur d'Armure physique de la cible de 50 % de manière permanente pour le reste du combat."
  },
  {
    "id": 370,
    "name": "Lancer de débris colossal",
    "nameEn": "Boulder Throw",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Force (Mêlée bourrine Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite la présence de rochers, débris ou objets lourds de plus de 100 kg à proximité.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous arrachez un bloc de pierre du sol et le projetez à portée moyenne (12m). Inflige d'immenses dégâts physiques de zone à l'impact (3m de rayon) et renverse les victimes."
  },
  {
    "id": 371,
    "name": "Enfoncement de bouclier",
    "nameEn": "Shield Breaker",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "specialty",
        "name": "Masses à deux mains",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Spécialité Masses à deux mains (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cibler un ennemi qui bloque avec un bouclier ou sous posture défensive.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une frappe directe descendant de haut en bas. Annule instantanément la capacité de blocage de l'ennemi, brise son bouclier s'il est en bois/métal léger et lui inflige de lourds dégâts."
  },
  {
    "id": 372,
    "name": "Piétinement sismique",
    "nameEn": "Seismic Stomp",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "intimidation-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Force (Intimidation physique Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "effect": "Vous frappez le sol du talon de toutes vos forces. Tous les ennemis adjacents (2m de rayon) sont déstabilisés, subissent un léger dégât physique et sont désorientés (Désorientation 1 tour)."
  },
  {
    "id": 373,
    "name": "Poigne de fer étrangleuse",
    "nameEn": "Chokehold",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      },
      {
        "kind": "specialty",
        "name": "Lutte / Mains nues",
        "level": 2
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 2) + Spécialité Lutte / Mains nues (Lvl 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Cible empoignée par le cou.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous serrez la gorge de la cible avec une force colossale. La cible est réduite au silence (Silence), ne peut plus incanter et subit des dégâts physiques d'asphyxie chaque tour sans pouvoir se libérer facilement."
  },
  {
    "id": 374,
    "name": "Force titanique",
    "nameEn": "Titans' Grip",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Colosse"
      }
    ],
    "prerequisitesRaw": "Force (Mêlée bourrine Rang 3) + Force (Maîtrise des armures Rang 3) + Titre requis : Colosse",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre force brute dépasse les limites mortelles. Vous pouvez manier une arme à deux mains dans chaque main (Combat à deux armes lourd), bénéficiant de la puissance des deux armes lourdes simultanément."
  },
  {
    "id": 375,
    "name": "Impact de météore humain",
    "nameEn": "Body Slam",
    "category": "Voies de la force, brutalité & destruction",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Force (Athlétisme Rang 3) + Endurance (Résistance physique Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Effectuer une Charge ou un Bond héroïque préalable.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous projetez tout le poids de votre corps armuré contre la cible. Inflige des dégâts physiques basés sur votre Force + votre Armure totale, et assomme la cible (Étourdissement 1 tour)."
  },
  {
    "id": 376,
    "name": "Marteau de forge dévastateur",
    "nameEn": "Forgemaster's Strike",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Force (Mêlée bourrine Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Maniement d'un marteau ou d'une masse à deux mains.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous frappez un ennemi comme sur une enclume. Inflige de lourds dégâts physiques et réduit la valeur d'armure de la cible d'un montant fixe jusqu'à la fin du combat."
  },
  {
    "id": 377,
    "name": "Prospection filonienne",
    "nameEn": "Gemsmith's Eye",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 1) + Sagesse (Perception & Sens Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Récolte)",
    "condition": "En minant un gisement.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous repérez les failles dans la roche. Vous doublez la quantité de minerai récolté et avez 25 % de chances de trouver une gemme brute rare."
  },
  {
    "id": 378,
    "name": "Plaques de renfort d'urgence",
    "nameEn": "Field Repairs",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Sagesse (Médecine & Soins Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite des morceaux de métal ou des pièces d'armure brisées. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Vous réparez sommairement l'armure d'un allié en plein combat. Restaure 20 % de sa valeur d'armure maximale."
  },
  {
    "id": 379,
    "name": "Peau écorchée parfaite",
    "nameEn": "Flawless Skinning",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 1) + Domaine Survie en milieu hostile (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif (Récolte)",
    "condition": "Dépeçage d'une bête ou d'un dragon.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous prélevez le cuir sans le détériorer. Les cuirs et écailles récoltés sont de qualité supérieure, augmentant leur valeur de revente ou l'armure des objets fabriqués de +15 %."
  },
  {
    "id": 380,
    "name": "Point de couture renforcé",
    "nameEn": "Reinforced Stitching",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "armures-boucliers",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Domaine Maîtrise des armures (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Armures de cuir ou tissu fabriquées par vos soins.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Les doublures cousues absorbent les chocs. Vos créations en cuir/tissu augmentent les PV maximaux du porteur d'un montant fixe."
  },
  {
    "id": 381,
    "name": "Bistouri du dépeceur",
    "nameEn": "Skinner's Precision",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Combat de précision Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite une dague ou un couteau de dépeçage.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une entaille chirurgicale sur les articulations d'une bête ou d'un humanoïde. Inflige des dégâts physiques et applique un saignement garanti qui ignore l'armure."
  },
  {
    "id": 382,
    "name": "Amorçage ultra-rapide",
    "nameEn": "Quick Fuse",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 1) + Agilité (Tir & Lancer Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Lancer une grenade ou un explosif en d'inventaire.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous réduisez le temps de mèche. L'explosif détonne instantanément à l'impact au lieu de détoner à la fin du tour."
  },
  {
    "id": 383,
    "name": "Surcharge de tourelle",
    "nameEn": "Turret Overclock",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Domaine Tactique & Analyse (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Cibler une tourelle ou un automate allié actif.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous survoltez les rouages de la machine. La tourelle tire le double de projectiles pendant 1 tour, mais subit 20 % de dégâts de surchauffe."
  },
  {
    "id": 384,
    "name": "Blindage d'acier trempé",
    "nameEn": "Hardened Plating",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Votre maîtrise du marteau a endurci vos bras. Vous gagnez +10 % d'Armure physique de base et réduisez le coût en composants des patrons de forge lourde de 20 %."
  },
  {
    "id": 385,
    "name": "Mâchoire de fer",
    "nameEn": "Iron Grip",
    "category": "Perfectionnement des artisanats de départ",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Force (Athlétisme Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Maniement d'armes ou d'outils lourds.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Habitué à manier les grosses masses de forge. Vous ne pouvez jamais être désarmé de vos outils ou armes à deux mains."
  },
  {
    "id": 386,
    "name": "Lame d'acier arcanique",
    "nameEn": "Arcane Steel Encapsulation",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Magie profane & Arcanes Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Infuser une arme en métal avant le combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "L'arme brille d'une lueur bleue. Ses dégâts physiques sont intégralement convertis en dégâts d'Arcane et ignorent la valeur d'armure physique pendant 2 tours."
  },
  {
    "id": 387,
    "name": "Gravure de rune de puissance",
    "nameEn": "Runic Anvil",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "runes-anciennes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Domaine Avancé Runes Anciennes (Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Gravure sur une armure ou un bouclier.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Grave une rune permanente sur une pièce d'armure. Le porteur gagne +1d6 aux jets de résistance magique."
  },
  {
    "id": 388,
    "name": "Cuir imbibé de venin",
    "nameEn": "Poison-Soaked Leather",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Sagesse (Alchimie & Herboristerie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter une armure de cuir traitée aux toxines.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tout ennemi qui vous frappe en mêlée avec des armes courtes a 30 % de chances de contracter un empoisonnement léger qui lui inflige des dégâts de Nature continus."
  },
  {
    "id": 389,
    "name": "Manteau de fumée toxique",
    "nameEn": "Toxic Cloak Burst",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Sagesse (Alchimie & Herboristerie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Subir un coup physique. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Votre cape en cuir libère une poche d'acide lyophilisé, aveuglant les ennemis adjacents pendant 1 tour."
  },
  {
    "id": 390,
    "name": "Grenade de spores corrosives",
    "nameEn": "Spore Bomb",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse(Alchimie & Herboristerie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une capsule méca-botanique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Éclate en un nuage de champignons acides. Inflige des dégâts de Feu du Fél/Nature dans un rayon de 4 mètres et dissout l'armure de toutes les victimes."
  },
  {
    "id": 391,
    "name": "Automate de distillation portable",
    "nameEn": "Alchemical Automaton",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Déployer un petit robot alchimique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le petit robot distribue automatiquement 1 potion de soin légère par tour à l'allié le plus affaibli du groupe pendant 3 tours."
  },
  {
    "id": 392,
    "name": "Condensateur de foudre",
    "nameEn": "Lightning Rod Battery",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse (Communion naturelle & Chamanisme Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Subir des dégâts de Foudre/Éléments.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Absorbe les dégâts de Foudre subis et charge votre batterie. Votre prochaine attaque à distance projette un éclair foudroyant gratuit."
  },
  {
    "id": 393,
    "name": "Piège à cage de Faraday",
    "nameEn": "Electric Cage",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Sagesse (Communion naturelle & Chamanisme Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posé au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Lorsqu'un ennemi marche dessus, des arceaux métalliques surgissent et créent un dôme d'éclairs (Étourdissement et Enracinement 2 tours)."
  },
  {
    "id": 394,
    "name": "Lame de sang d'acier",
    "nameEn": "Blood-Iron Edge",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Charisme (Magie de l'Ombre & Fél Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Forger une arme avec des composants de sang séché ou de fer-noir.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'arme forged absorbe l'essence des blessures : 10 % des dégâts physiques qu'elle inflige sont restitués sous forme de soins au porteur."
  },
  {
    "id": 395,
    "name": "Cuirasse de sépulture",
    "nameEn": "Grave-Bound Plate",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Domaine Avancé Nécromancie & Peste (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter une armure lourde gravée de runes d'agonie.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Lorsque le porteur subit un coup critique, l'armure émet un râle d'ombre qui réduit la vitesse d'attaque de l'agresseur de 50 %."
  },
  {
    "id": 396,
    "name": "Tissage de fil de lumière",
    "nameEn": "Holy Thread Weaving",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Sagesse (Magie divine & Sacrée Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Fabriquer un vêtement ou un cuir avec des fils bénis.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le vêtement diffuse une aura de sérénité : le porteur gagne +1d6 contre les sorts de Peur et d'Ombre."
  },
  {
    "id": 397,
    "name": "Reliquaire d'argent béni",
    "nameEn": "Blessed Silver Relic",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 3) + Sagesse (Magie divine & Sacrée Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Porter une relique en argent façonnée par vos soins.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Émet un flash de Lumière sacrée qui soigne les alliés proches et repousse les Morts-vivants à 3 mètres."
  },
  {
    "id": 398,
    "name": "Arbalète à double engrenage",
    "nameEn": "Heavy Composite Crossbow",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Ingénierie Rang 1) + Agilité (Tir & Lancer Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utiliser une arbalète d'ingénieur/artisan.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Décoche 2 carreaux simultanément en une seule pression de détente. Chaque carreau inflige 70 % des dégâts normaux."
  },
  {
    "id": 399,
    "name": "Empennage de précision en plumes de griffon",
    "nameEn": "Griffon Feather Arrows",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Tir & Lancer Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Utiliser des flèches artisanales d'empennage rare.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos tirs à distance ignorent les malus liés au vent ou à la portée maximale."
  },
  {
    "id": 400,
    "name": "Chronomètre de réversion",
    "nameEn": "Reversion Clockwork",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "chronomancie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Domaine Avancé Chronomancie (Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Activer un dispositif d'horlogerie sur votre ceinture. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "manaCost": 4,
    "effect": "Annule les dégâts ou le changement de position subis lors du tout dernier tour en réinitialisant les rouages du temps sur votre personnage."
  },
  {
    "id": 401,
    "name": "Cadran de hâte mécanique",
    "nameEn": "Clockwork Haste",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "chronomancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Domaine Avancé Chronomancie (Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Activer le cadran. Temps de recharge : 2 tours.",
    "cooldownTurns": 2,
    "usesPer": null,
    "manaCost": 3,
    "effect": "Vous gagnez +1 action rapide supplémentaire lors de ce tour, mais vous subissez un malus de vitesse de 30 % au tour suivant."
  },
  {
    "id": 402,
    "name": "Lame de magma liquide",
    "nameEn": "Magma-Forged Blade",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Domaine Avancé Pyromancie (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Frapper le sol avec une arme de forge.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "L'arme s'enflamme de magma pur. Inflige des dégâts physiques et de Feu massifs et laisse une traînée de lave au sol pendant 1 tour."
  },
  {
    "id": 403,
    "name": "Cuirasse de pyrite incandescente",
    "nameEn": "Pyrite Shielding",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "advanced",
        "id": "pyromancie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Domaine Avancé Pyromancie (Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter une armure lourde de pyrite.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Renvoie 20 % de tous les dégâts de Feu subis sous forme de vague d'incandescence sur tous les ennemis adjacents."
  },
  {
    "id": 404,
    "name": "Armure d'écorce tissée",
    "nameEn": "Ironwood Braiding",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Sagesse (Communion naturelle Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter un plastron en cuir/écorce de Fer.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'armure se régénère en milieu naturel : le porteur gagne +10 % d'Armure et récupère des PV chaque tour sous le soleil ou en forêt."
  },
  {
    "id": 405,
    "name": "Cape de camouflage en lianes",
    "nameEn": "Vine Camouflage Cape",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "En extérieur en milieu naturel.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous gagnez un bonus permanent de +2d6 à tous vos tests de Furtivité tant que vous restez immobile près de la végétation."
  },
  {
    "id": 406,
    "name": "Prisme de réfraction magique",
    "nameEn": "Arcane Prismatic Gem",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Dextérité (Artisanat de précision Rang 2) + Intelligence (Magie profane & Arcanes Rang 1)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Porter une gemme prismatique taillée sur votre plastron. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "manaCost": 1,
    "effect": "Le cristal absorbe un sort magique direct ciblé et le divise en 3 rayons inoffensifs de lumière multicolore."
  },
  {
    "id": 407,
    "name": "Sertissage de rubis de santé",
    "nameEn": "Ruby Socketing",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Artisanat lourd Rang 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Tailler et sertir un rubis pur sur un anneau ou une arme.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente de façon permanente les PV maximaux du porteur de +10 %."
  },
  {
    "id": 408,
    "name": "Mortier d'infanterie portable",
    "nameEn": "Portable Siege Mortar",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Intelligence (Ingénierie Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Ancré au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Tire un obus de siège à longue distance (25m). Inflige de colossaux dégâts de Feu/Explosion aux structures, portes et groupes d'ennemis ramassés."
  },
  {
    "id": 409,
    "name": "Affût de canon renforcé",
    "nameEn": "Reinforced Gun Mount",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Maniement d'armes à feu lourdes ou de tromblons.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Annule totalement le recul des armes lourdes et augmente leurs dégâts physiques de +20 %."
  },
  {
    "id": 410,
    "name": "Semelles de feutre silencieux",
    "nameEn": "Shadowstep Boots",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter des bottes en cuir d'ombre confectionnées par vos soins.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos pas ne font strictement aucun bruit, quel que soit le sol (creux, bois, gravier), vous donnant un bonus permanent aux déplaceemnts furtifs."
  },
  {
    "id": 411,
    "name": "Bottes à crampons de dragon",
    "nameEn": "Dragon-Claw Boots",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Athlétisme Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Confectionnées avec des griffes de bêtes/dragons.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous devenez totalement insensible aux effets de verglas, de boue ou de sol glissant et pouvez escalader les parois rocheuses à vitesse normale."
  },
  {
    "id": 412,
    "name": "Servo-bras de puissance",
    "nameEn": "Hydraulic Power Arm",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Intelligence (Ingénierie Rang 3)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite d'équiper un bras mécanique assisté. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Injecte une pression hydraulique. Votre prochaine attaque de mêlée ou jet de projection bénéficie du Rang 5 automatique en Force."
  },
  {
    "id": 413,
    "name": "Plaque d'absorption cinétique",
    "nameEn": "Kinetic Absorber Plate",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Intégré dans un plastron lourd.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Chaque coup physique subit emmagasine de l'énergie. À 5 coups subis, le plastron décharge une onde cinétique qui repousse les ennemis adjacents."
  },
  {
    "id": 414,
    "name": "Parchemin d'incantation instantanée",
    "nameEn": "Spell Scroll Fabrication",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Magie profane & Arcanes Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat (Artisanat)",
    "condition": "Confection sur du papyrus/cuir fin avec des encres arcaniques.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Crée un parchemin à usage unique contenant un sort d'Arcane. Utiliser le parchemin en combat permet d'incanter le sort sans consommer de mana."
  },
  {
    "id": 415,
    "name": "Reliure de grimoire renforcée",
    "nameEn": "Iron-Bound Grimoire",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Artisanat lourd Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter un grimoire relié de plaques de fer.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le grimoire peut être utilisé comme bouclier d'urgence, offrant +10 % d'Armure au lanceur de sorts."
  },
  {
    "id": 416,
    "name": "Prothèse de membre en mithril",
    "nameEn": "Mithril Prosthetic",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Fixée sur un personnage mutilé ou ayant perdu un bras/jambe.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Remplace totalement le membre perdu. Le membre mécanique offre +1 point permanent en Force ou en Agilité et ne ressent pas la douleur."
  },
  {
    "id": 417,
    "name": "Injecteur automatique de sérum",
    "nameEn": "Auto-Injector Harness",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse (Médecine & Soins Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Réaction)",
    "condition": "Se déclenche automatiquement si le porteur tombe sous les 20 % de PV.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Injecte instantanément une fiole de soins ou de stimulant préparée sans consommer l'action du joueur."
  },
  {
    "id": 418,
    "name": "Cartouche de poudre noire enrichie",
    "nameEn": "Enhanced Black Powder",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Confection de munitions pour armes à feu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos tirs à l'arme à feu infligent +20 % de dégâts de Feu/Explosion supplémentaires et perforent l'armure de cible."
  },
  {
    "id": 419,
    "name": "Mine incendiaire à naphte",
    "nameEn": "Napalm Landmine",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posée au sol en dissimulation.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Détonne au passage d'un ennemi. Projette du liquide enflammé incandescant qui brûle la zone et les victimes pendant 3 tours."
  },
  {
    "id": 420,
    "name": "Béquille de fortification",
    "nameEn": "Emergency Barricade",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Nécessite des morceaux de bois ou de roche.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Monte une barricade de fortune en 1 tour. La barricade offre un couvert total contre les tirs à distance pour 2 personnes."
  },
  {
    "id": 421,
    "name": "Éperon de navire / Bélier lourd",
    "nameEn": "Battering Ram Construction",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Maniement d'un bélier ou d'une pièce de charpente lourde.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Enfonce les portes de donjon et renverse tous les gardes postés derrière la porte."
  },
  {
    "id": 422,
    "name": "Tunique en soie de veuve noire",
    "nameEn": "Spider-Silk Robe",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "toxines-sauvages",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 3) + Domaine Avancé Toxines Sauvages (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter un vêtement tissé en soie d'araignée rare.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'armure est d'une légèreté incroyable : accorde +1d6 en Agilité et rend le porteur totalement insensible aux toiles d'araignées et pièges de ralentissement."
  },
  {
    "id": 423,
    "name": "Filet de capture en fil d'acier-soie",
    "nameEn": "Steel-Silk Net",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Ingénierie Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer un filet artisanal sur une cible.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Enferme l'ennemi dans un filet incoupatble par des armes tranchantes classiques (Enracinement 2 tours)."
  },
  {
    "id": 424,
    "name": "Cuirasse en écailles de Dragon Noir",
    "nameEn": "Black Dragonscale Breastplate",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 3
      },
      {
        "kind": "advanced",
        "id": "magie-draconique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Dextérité (Artisanat de précision Rang 3) + Domaine Avancé Magie Draconique (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Confectionnée avec des écailles du Vol Noir.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Armure légendaire : offre une protection d'Armure massive, une immunité totale aux brûlures de Feu/Magma et renvoie les dégâts de feu aux attaquants."
  },
  {
    "id": 425,
    "name": "Forgeron de lames en os de dragon",
    "nameEn": "Dragon-Bone Weapons",
    "category": "Artisanats dérivés & hybrides",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Dextérité (Artisanat de précision Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Armes forgées dans des os de dragons majeurs.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Les armes créées possèdent une tranchant légendaire : elles déclenchent des Succès Critiques sur un résultat de 5 ou 6 de manière permanente."
  },
  {
    "id": 426,
    "name": "Affûtage à la pierre de filon",
    "nameEn": "Sharpening Stone",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat / Buff d'arme",
    "condition": "Utiliser une pierre d'affûtage sur une arme tranchante.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente les dégâts physiques de l'arme de +2 points par dé pour la durée du prochain combat."
  },
  {
    "id": 427,
    "name": "Contre-poids d'équilibrage",
    "nameEn": "Weapon Weight",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Dextérité (Artisanat de précision Rang 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Fixer un contre-poids en plomb sur une masse ou hache.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente la vitesse de frappe de l'arme lourde, réduisant ses pénalités d'initiative."
  },
  {
    "id": 428,
    "name": "Lunette de visée gnomique",
    "nameEn": "Gnomish Target Scope",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Dextérité (Artisanat de précision Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Fixée sur un arc ou une arbalète.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente les chances de coup critique à distance de +1d6."
  },
  {
    "id": 429,
    "name": "Sac à composants agrandi",
    "nameEn": "Herb Basket / Mining Bag",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif (Inventaire)",
    "condition": "Porter un sac spécialisé confectionné par vos soins.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Doubler la capacité d'emport de composants de récolte (minerais, cuirs, plantes) sans alourdir le personnage."
  },
  {
    "id": 430,
    "name": "Bouclier à piques démontables",
    "nameEn": "Spiked Shield Attachment",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Riveter des piques d'acier sur la face du bouclier.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "L'action Heurt de bouclier inflige +1d6 de dégâts de perforation supplémentaires."
  },
  {
    "id": 431,
    "name": "Huile d'entretien d'armure",
    "nameEn": "Armor Oil",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 1) + Intelligence (Alchimie & Herboristerie Rang 1)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Enduire les articulations d'une armure lourde.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Annule les malus de Furtivité liés aux bruits de frottement de métal pour 1 heure."
  },
  {
    "id": 432,
    "name": "Bombe de fumée aveuglante",
    "nameEn": "Smoke Bomb",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Lancer une capsule de fumée au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Crée un nuage d'opacité de 5 mètres de rayon. Empêche tous les tirs ciblés et sorts à distance d'entrer ou sortir du nuage pendant 2 tours."
  },
  {
    "id": 433,
    "name": "Détonateur à distance",
    "nameEn": "Remote Detonator",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Déclencher une charge d'explosif préalablement posée.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Fait sauter la bombe à n'importe quelle distance tant que vous avez la ligne de vue."
  },
  {
    "id": 434,
    "name": "Dynamo de recharge corporelle",
    "nameEn": "Body Dynamo",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Force (Athlétisme Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Courir ou se déplacer en combat avec un équipement dynamo.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos déplacements rechargent vos gadgets mécaniques de 1 tour supplémentaire par tranche de 10 mètres parcourus."
  },
  {
    "id": 435,
    "name": "Harnais de transport lourd",
    "nameEn": "Pack Mule Harness",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 1) + Force (Athlétisme Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Confectionné sur mesure.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous permet de porter un alliés inconscient ou une charge lourde de donjon sans subir de pénalité de déplacement."
  },
  {
    "id": 436,
    "name": "Marteau de démolition hydraulique",
    "nameEn": "Pneumatic Hammer",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Intelligence (Ingénierie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Maniement d'un marteau à vapeur.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Une frappe assistée par piston. Démolit les boucliers métalliques et assomme la cible (Étourdissement 1 tour)."
  },
  {
    "id": 437,
    "name": "Caparaçon de monture renforcé",
    "nameEn": "Mount Armor",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Dextérité (Artisanat de précision Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Équiper une monture (cheval, loup, kodo).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente les PV et l'armure de votre monture de +50 %, l'empêchant d'être désarçonnée facilement."
  },
  {
    "id": 438,
    "name": "Poudre de stase cryogénique",
    "nameEn": "Frost Powder",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Intelligence (Alchimie & Herboristerie Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une fiole de poudre gelante.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit la vitesse de déplacement de toutes les cibles dans une zone de 4 mètres de 80 % pendant 2 tours."
  },
  {
    "id": 439,
    "name": "Rivetage d'urgence",
    "nameEn": "Quick Riveting",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "En combat après avoir subi un coup brise-armure.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous réparez instantanément 1 point de dégradation d'armure subi par votre cuirasse."
  },
  {
    "id": 440,
    "name": "Roustons de sécurité en cuir",
    "nameEn": "Groin Guard",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Intégré dans vos vêtements de cuir.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous immunise totalement aux coups bas et attaques sournoises invalidantes visant les parties sensibles."
  },
  {
    "id": 441,
    "name": "Inhalateur de vapeur roborative",
    "nameEn": "Steam Inhaler",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "medecine-soins",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse (Médecine & Soins Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Prendre une bouffée sur votre masque à vapeur. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Annule tous vos effets de fatigue physique et vous redonne 15 % de vos PV maximaux."
  },
  {
    "id": 442,
    "name": "Gant de force à engrenages",
    "nameEn": "Power Gauntlet",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Donner un coup de poing à nu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Déclenche un piston en acier qui projette l'adversaire touché à 4 mètres en arrière."
  },
  {
    "id": 443,
    "name": "Piège à ressorts à pression",
    "nameEn": "Pressure Trap",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "escamotage-crochetage",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Agilité (Escamotage & Crochetage Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posé au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Propulse l'ennemi qui marche dessus dans les airs à 5 mètres de hauteur, lui infligeant des dégâts de chute à la réception."
  },
  {
    "id": 444,
    "name": "Vêtement ignifugé en cuir de salamandre",
    "nameEn": "Fireproof Leather",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "survie-milieu-hostile",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Domaine Survie en milieu hostile (Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Confectionné avec des peaux de créatures de feu.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit tous les dégâts de Feu subis d'un montant fixe permanent."
  },
  {
    "id": 445,
    "name": "Câble de grappin mécanique",
    "nameEn": "Mechanical Grapple",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Agilité (Acrobatie & Furtivité Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Viser une surface haute ou un rebord (15m max).",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous tire instantanément jusqu'au rebord ciblé, ignorant les obstacles au sol."
  },
  {
    "id": 446,
    "name": "Ceinture d'outils d'accès rapide",
    "nameEn": "Utility Belt",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Ingénierie Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Degaine et utilise n'importe quel consommable (potion, bombe, piège, parchemin) en Action Rapide au lieu d'une Action Complète."
  },
  {
    "id": 447,
    "name": "Masque à gaz filtrant",
    "nameEn": "Gas Mask",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Dextérité (Artisanat de précision Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter un masque à filtre artisanal.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Immunité totale aux brouillards de Peste, gaz asphyxiants et fumées d'alchimie."
  },
  {
    "id": 448,
    "name": "Renfort de bouclier en bois-fer",
    "nameEn": "Ironwood Shield Rim",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Dextérité (Artisanat de précision Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Cercler un bouclier en bois avec des bandes de fer.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le bouclier gagne +20 % de capacité de blocage et ne peut plus être fendu par des haches."
  },
  {
    "id": 449,
    "name": "Couteau universel du traqueur",
    "nameEn": "Multi-Tool Blade",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 1) + Intelligence (Ingénierie Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Conservé en poche.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous donne +1d6 sur tous les tests de dépeçage, crochetage et petites réparations mécaniques."
  },
  {
    "id": 450,
    "name": "Fonderie de poche portable",
    "nameEn": "Pocket Smelter",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Utilisable lors d'une pause en donjon.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Permet de fondre les minerais bruts en lingots de fer/acier directement sur le terrain sans retourner en ville."
  },
  {
    "id": 451,
    "name": "Botte à semelle magnétique",
    "nameEn": "Mag-Boots",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Force (Artisanat lourd Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Sur une surface métallique ou une plaque d'acier.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Fixe magnétiquement vos pieds au sol : vous devenez totalement impossible à renverser ou projeter par des vagues de choc."
  },
  {
    "id": 452,
    "name": "Fil de rasoir en acier étiré",
    "nameEn": "Razor Wire Trap",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Artisanat lourd Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Tendre un câble entre deux arbres/murs.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Le premier ennemi qui passe à vitesse élevée subit de lourds dégâts de tranchant au niveau des jambes et chute."
  },
  {
    "id": 453,
    "name": "Armure de plaques articulée sur mesure",
    "nameEn": "Custom-Fit Plate",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Dextérité (Artisanat de précision Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter une armure forgée exactement sur vos mensurations.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit de moitié toutes les pénalités d'Agilité et de Discrétion imposées par les armures de plaques lourd."
  },
  {
    "id": 454,
    "name": "Détonation à charge creuse",
    "nameEn": "Shaped Charge",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "tactique-analyse",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Domaine Tactique & Analyse (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Posée contre une porte ou un coffre renforcé.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Canalise 100 % de l'explosion vers l'avant, faisant sauter la serrure/porte sans faire de bruit ni blesser les personnes situées derrière la bombe."
  },
  {
    "id": 455,
    "name": "Viseur thermique nocturne",
    "nameEn": "Infrared Goggles",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse (Perception & Sens Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter des lunettes d'ingénieur thermiques.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous percevez la chaleur corporelle des cibles invisibles ou dissimulées dans l'obscurité totale à moins de 15 mètres."
  },
  {
    "id": 456,
    "name": "Marteau de forge béni",
    "nameEn": "Sanctified Anvil",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-divine-sacree",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Sagesse (Magie divine & Sacrée Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Frapper le sol avec un marteau béni.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Libère une onde de choc du Sacré qui blesse les dmons/morts-vivants et répare les armures des alliés proches."
  },
  {
    "id": 457,
    "name": "Tissage de cape en plumes de rapace",
    "nameEn": "Feathered Cloak",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter une cape tissée de plumes légères.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit tous les dégâts de chute de 80 % et permet d'effectuer des sauts plus longs."
  },
  {
    "id": 458,
    "name": "Capsule d'urgence à ressorts",
    "nameEn": "Emergency Ejector",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Se déclenche à la destruction d'un véhicule ou exosquelette.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Éjecte le pilote à 15 mètres dans les airs avec un parachute, le sauvant de l'explosion."
  },
  {
    "id": 459,
    "name": "Lame à dents de scie",
    "nameEn": "Serrated Edge Coating",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Artisanat lourd Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Modifier le tranchant d'une dague/épée avec des dents de scie.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Les attaques réussies appliquent un saignement qui réduit l'efficacité des soins reçus par la cible de 30 %."
  },
  {
    "id": 460,
    "name": "Rivetage de gemmes d'Ombre",
    "nameEn": "Shadow Socketing",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "magie-ombre-fel",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Charisme (Magie de l'Ombre & Fél Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Sertir une améthyste d'ombre sur une arme.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "L'arme inflige +1d6 dégâts d'Ombre supplémentaires sur chaque coup."
  },
  {
    "id": 461,
    "name": "Soufflet de forge amplifié",
    "nameEn": "Bellows Blast",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 1)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Utiliser un soufflet mécanique portatif.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Projette un jet d'air brûlant en cône (3m) qui aveugle les ennemis et attise les brûlures déjà présentes."
  },
  {
    "id": 462,
    "name": "Armure en cuir de Kodo matelassé",
    "nameEn": "Thick Kodo Hide",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 3) + Endurance (Résistance physique Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter un plastron en cuir de Kodo massif.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Offre une protection équivalente à une armure de mailles tout en conservant la souplesse du cuir."
  },
  {
    "id": 463,
    "name": "Dynamo de foudre sur bouclier",
    "nameEn": "Shock Shield Attachment",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Sagesse (Communion naturelle Rang 1)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Après avoir bloqué un coup avec votre bouclier.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Le bouclier décharge une étincelle foudroyante qui inflige des dégâts de Nature à l'attaquant."
  },
  {
    "id": 464,
    "name": "Graissage de rouages",
    "nameEn": "Oil Can",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Appliquer de l'huile sur un mécanisme ou fureur mécanique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit de 1 tour le temps de recharge d'un gadget ou tourelle allié."
  },
  {
    "id": 465,
    "name": "Tissage de fil d'or diplomatique",
    "nameEn": "Gilded Embroidery",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "negociation-commerce",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Charisme (Négociation & Commerce Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter des habits brodés de fils d'or pur.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente de +1d6 tous vos jets de persuasion et de négociation auprès des marchands et nobles."
  },
  {
    "id": 466,
    "name": "Pince de désamorçage de haute précision",
    "nameEn": "Defusal Kit",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Tenter de désamorcer une bombe ou un piège mécanique.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous gagnez +2d6 sur votre jet pour désamorcer les pièges sans les faire sauter."
  },
  {
    "id": 467,
    "name": "Pilonneuse à vapeur",
    "nameEn": "Steam Piston Stomp",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Intelligence (Ingénierie Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Ancrer des bottes à pistons au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Fait trembler le sol dans un rayon de 3 mètres, faisant tomber tous les ennemis à terre (A terre)."
  },
  {
    "id": 468,
    "name": "Cape en cuir de chauve-souris géante",
    "nameEn": "Bat-Wing Cloak",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "acrobatie-furtivite",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Agilité (Acrobatie & Furtivité Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Sauter depuis une hauteur de plus de 3 mètres.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Déploie la cape comme une aile volante, vous permettant de planer horizontalement sur de longues distances."
  },
  {
    "id": 469,
    "name": "Balise de téléportation d'ingénieur",
    "nameEn": "Beacon Receiver",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Intelligence (Magie profane & Arcanes Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Poser une balise au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 2,
    "effect": "Permet à l'ingénieur de se téléporter instantanément sur la balise posée depuis n'importe où dans la même région."
  },
  {
    "id": 470,
    "name": "Renfort de mailles sur doublure",
    "nameEn": "Chainmail Lining",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 2) + Dextérité (Artisanat de précision Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Coudre de fines mailles d'acier sous un vêtement en cuir.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Offre un bonus permanent de +15 % d'Armure physique contre les dagues et flèches."
  },
  {
    "id": 471,
    "name": "Seringue de venin d'urgence",
    "nameEn": "Wrist-Mounted Injector",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Intelligence (Alchimie & Herboristerie Rang 2)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Lors d'une attaque à mains nues ou dague.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Injecte une dose de poison mortel directement dans la veine de l'adversaire lors de l'impact."
  },
  {
    "id": 472,
    "name": "Marteau de forge géant en mithril",
    "nameEn": "Mithril Forgemaster Hammer",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 3
      },
      {
        "kind": "title",
        "name": "Maître Forgeron"
      }
    ],
    "prerequisitesRaw": "Force (Artisanat lourd Rang 3) + Titre requis : Maître Forgeron",
    "actionType": "passif",
    "actionLabel": "Passif (Outil/Arme)",
    "condition": "Maniement du marteau légendaire.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit le temps de fabrication des objets lourds de 50 % et ajoute +1d6 de dégâts de force sur toutes vos attaques de mêlée."
  },
  {
    "id": 473,
    "name": "Botte à amortisseur hydraulique",
    "nameEn": "Shock Absorber Boots",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "athletisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 2) + Force (Athlétisme Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Porter des bottes à pistons.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Annule les étourdissements provoqués par des chutes lourdes ou des attaques de piétinement."
  },
  {
    "id": 474,
    "name": "Harnais de tir pour arbalète lourde",
    "nameEn": "Crossbow Harness",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "artisanat-delicat",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "melee-bourrine",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Dextérité (Artisanat de précision Rang 2) + Force (Mêlée bourrine Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Équiper un harnais en cuir d'épaule.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Permet d'armer et de recharger les arbalètes lourdissimes à deux mains en Action Rapide au lieu d'une Action Complète."
  },
  {
    "id": 475,
    "name": "Bombe à fragmentation d'azérite",
    "nameEn": "Azerite Frag Grenade",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "explosifs-ingenierie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "artisanat-lourd",
        "rank": 2
      },
      {
        "kind": "title",
        "name": "Maître Démolisseur"
      }
    ],
    "prerequisitesRaw": "Intelligence (Ingénierie Rang 3) + Force (Artisanat lourd Rang 2) + Titre requis : Maître Démolisseur",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une grenade en azérite forgée. 1 fois par repos court.",
    "cooldownTurns": null,
    "usesPer": "repos-court",
    "effect": "Explosion dévastatrice dans un rayon de 6 mètres. Inflige des dégâts hybrides Feu/Arcane/Perforation, brise les armures et renverse toutes les victimes."
  },
  {
    "id": 476,
    "name": "Distillation d'urgence de terrain",
    "nameEn": "Field Alchemy",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie, Herboristerie & Toxicologie) Rang 1",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors-combat (5 minutes)",
    "condition": "Portée : Soi-même",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "En utilisant un alambic de voyage et au moins 2 herbes brutes quelconques, vous concoctez 1 Potion de soins mineure ou 1 Baume anti-saignement sans avoir besoin d'un laboratoire complet."
  },
  {
    "id": 477,
    "name": "Tolérance aux toxines de sorceleur",
    "nameEn": "Toxin Tolerance",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 2) + Endurance (Résistance Rang 1)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Réduit de 50 % les malus de toxicité subis lors de l'absorption de stimulants/décoctions lourdes."
  },
  {
    "id": 478,
    "name": "Application d'enduit éclair",
    "nameEn": "Quick Blade Coating",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "combat-precision",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 2) + Agilité (Combat de précision Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Enduire une arme d'huile ou de poison en combat.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Applique l'enduit en Action Rapide au lieu d'une Action Complète."
  },
  {
    "id": 479,
    "name": "Extraction de venin purifié",
    "nameEn": "Venom Extraction",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 1
      },
      {
        "kind": "domain",
        "id": "perception-sens",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie, Herboristerie & Toxicologie) Rang 1 + Sagesse (Perception, Sens & Pistage) Rang 1",
    "actionType": "passif",
    "actionLabel": "Passif (Récolte)",
    "condition": "Portée : Cadavre de bête vénéneuse / monstre",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Sur un cadavre de créature venimeuse (serpent, scorpion, basilic, wyverne), vous prélevez systématiquement 1 à 2 fioles de venin purifié utilisables pour l'enduit d'armes ou la confection de poisons sans déclencher de jet de risque de contamination."
  },
  {
    "id": 480,
    "name": "Potion d'Aéro-Inhalation",
    "nameEn": "Inhaled Elixirs",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 3)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Briser une fiole de potion au sol aux pieds du groupe.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Applique l'effet bénéfique d'une potion (soin, buff) à TOUS les alliés adjacents (rayon de 2m)."
  },
  {
    "id": 481,
    "name": "Maîtrise des fioles explosives",
    "nameEn": "Bomb Toss",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "tir-lancer",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 2) + Agilité (Tir & Lancer Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une bombe alchimique ou fiole d'acide.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente la portée du lancer de +5m et le rayon d'explosion de +1m."
  },
  {
    "id": 482,
    "name": "Alambic de conservation",
    "nameEn": "Preservation Techniques",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 2)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos consommables d'alchimie ne sont jamais détruits ou altérés par la chaleur, le gel ou les chocs."
  },
  {
    "id": 483,
    "name": "Potion à effet prolongé",
    "nameEn": "Extended Brews",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 3)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Boire un élixir ou une décoction.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Augmente la durée de tous les buffs apportés par vos fioles de +1 tour supplémentaire."
  },
  {
    "id": 484,
    "name": "Alchimie de combat désespérée",
    "nameEn": "Second Wind Draught",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "resistance-physique",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 3) + Endurance (Résistance Rang 2)",
    "actionType": "reaction",
    "actionLabel": "Action Rapide (Réaction)",
    "condition": "Subir un coup qui vous fait tomber sous 15 % PV. 1 fois par combat.",
    "cooldownTurns": null,
    "usesPer": "combat",
    "effect": "Consomme automatiquement une potion de soin de votre ceinturon sans dépenser d'action."
  },
  {
    "id": 485,
    "name": "Maître Toxicologue",
    "nameEn": "Master Poisoner",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 4
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 4)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Permanent.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vos poisons appliqués sur les armes ignorent 100 % de la résistance naturelle des cibles aux poisons."
  },
  {
    "id": 486,
    "name": "Transmutation de métaux vils",
    "nameEn": "Transmutation",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "magie-profane-arcanes",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 3) + Intelligence (Magie profane Rang 2)",
    "actionType": "hors-combat",
    "actionLabel": "Action Hors combat",
    "condition": "Utilisable 1 fois par jour en ville ou laboratoire.",
    "cooldownTurns": null,
    "usesPer": "jour",
    "manaCost": 2,
    "effect": "Transforme 5 Minerais de Fer en 2 Minerais de Mithril ou 1 Pierre précieuse."
  },
  {
    "id": 487,
    "name": "Philtre d'Inspiration créatrice",
    "nameEn": "Mind-Expanding Elixir",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 3
      },
      {
        "kind": "domain",
        "id": "volonte-spirituelle",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 3) + Sagesse (Volonté spirituelle Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Boire un philtre d'inspiration. 1 fois par repos long.",
    "cooldownTurns": null,
    "usesPer": "repos-long",
    "effect": "Accorde 1 coche de pratique gratuite dans un Domaine au choix pour la session en cours."
  },
  {
    "id": 488,
    "name": "Fumée de Peste lyophilisée",
    "nameEn": "Pestilence Capsule",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 4
      },
      {
        "kind": "advanced",
        "id": "necromancie-peste",
        "rank": 2
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 4) + Domaine Nécromancie & Ombre (Rang 2)",
    "actionType": "complete",
    "actionLabel": "Action Complète",
    "condition": "Lancer une fiole de peste au sol.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 4,
    "effect": "Libère un nuage verdâtre de 5m. Les victimes subissent des dégâts de Peste continus et voient leurs soins réduits de 50 %."
  },
  {
    "id": 489,
    "name": "Catalyste de fusion de décoctions",
    "nameEn": "Mutagenic Catalysis",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 5
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 5)",
    "actionType": "passif",
    "actionLabel": "Passif",
    "condition": "Préparation d'alchimie.",
    "cooldownTurns": null,
    "usesPer": null,
    "effect": "Vous permet d'associer les effets de 2 fioles différentes dans un seul et même flacon."
  },
  {
    "id": 490,
    "name": "Élixir de Sang de Troll",
    "nameEn": "Troll's Regeneration",
    "category": "Suite & fin des compétences d'artisanat",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "alchimie-herboristerie",
        "rank": 2
      },
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Alchimie & Herboristerie Rang 2) + Sagesse (Communion naturelle Rang 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Boire la fiole.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Régénère 3 PV par tour pendant 3 tours et permet de faire repousser des blessures légères."
  },
  {
    "id": 1001,
    "name": "Forme de félin",
    "nameEn": "Cat Form",
    "category": "Voies défensives, survie & endurance",
    "prerequisites": [
      {
        "kind": "domain",
        "id": "communion-naturelle-chamanisme",
        "rank": 1
      },
      {
        "kind": "specialty",
        "name": "Forme animale",
        "level": 1
      }
    ],
    "prerequisitesRaw": "Sagesse (Communion naturelle) + Spécialité Forme animale (Lvl 1)",
    "actionType": "rapide",
    "actionLabel": "Action Rapide",
    "condition": "Nécessite d'avoir les mains libres de tout objet magique lourd.",
    "cooldownTurns": null,
    "usesPer": null,
    "manaCost": 1,
    "effect": "Vous vous métamorphosez en grand félin. Vos griffes remplacent vos armes, et vous accédez aux techniques de la Forme de Félide (Griffe d'ombre, Célérité céleste, Instinct de survie).",
    "notes": "Compétence maison, absente du PDF : la Forme de Félide y est exigée mais rien ne la donnait (décidé le 2026-10-19, plans/39)."
  }
]
