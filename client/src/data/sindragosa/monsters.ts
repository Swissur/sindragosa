// Généré par scripts/convert-bestiary.ts depuis le bestiaire CO — relancer le script plutôt que d’éditer à la main.
import type { Monster } from '../../utils/sindragosa/bestiary'

export const MONSTERS: Monster[] = [
  {
    "name": "Aigle",
    "size": "tres petite",
    "threat": 1,
    "stats": {
      "str": 1,
      "agi": 4,
      "end": 4,
      "int": 1,
      "wis": 4,
      "cha": 2
    },
    "hp": 1,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 9,
    "attacks": [
      {
        "name": "Serres",
        "pool": 5,
        "damage": 1
      }
    ],
    "abilities": [
      {
        "name": "Vol rapide",
        "description": "L'aigle a une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      }
    ],
    "description": "Ce profil peut être utilisé pour tous les oiseaux de proie de grande taille (environ 2 mètres d'envergure)."
  },
  {
    "name": "Aigle géant adulte",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 4,
      "cha": 2
    },
    "hp": 15,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 9,
    "attacks": [
      {
        "name": "Serres et bec",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Agripper",
        "description": "Sur un critique en attaque, l'aigle géant agrippe sa proie et ne la lâche plus. Il obtient un bonus de +2d6 en attaque et +2 aux dégâts contre la cible qu'il agrippe et celle-ci est immobilisée si elle est de taille inférieure. La victime peut essayer de se libérer au prix d'une action de mouvement en réussissant un test de FOR opposé."
      },
      {
        "name": "Vol rapide",
        "description": "L'aigle géant a une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      }
    ]
  },
  {
    "name": "Aigle géant jeune",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 1,
      "wis": 4,
      "cha": 2
    },
    "hp": 3,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 9,
    "attacks": [
      {
        "name": "Serres et bec",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Vol rapide",
        "description": "L'aigle géant a une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      }
    ],
    "description": "Les aigles géants sont des volatiles de grandes tailles, dont les spécimens adultes sont suffisamment puissants pour emporter dans leurs serres des humanoïdes de taille moyenne. Rares et sauvages, il arrive que certains d'entre eux soient domestiqués et dressés pour la chasse."
  },
  {
    "name": "Aspic",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 6,
      "agi": 3,
      "end": 6,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 8,
        "damage": 8
      },
      {
        "name": "Dard",
        "pool": 8,
        "damage": 2,
        "note": "venin"
      }
    ],
    "abilities": [
      {
        "name": "Agripper",
        "description": "sur un critique en attaque, l'aspic agrippe sa proie et ne la lâche plus. Il obtient un bonus de +2d6 en attaque et +2 aux dégâts contre la cible qu'il agrippe et celle-ci est immobilisée si elle est de taille inférieure. La victime peut essayer de se libérer au prix d'une action de mouvement en réussissant un test de FOR opposé."
      },
      {
        "name": "Vol rapide",
        "description": "l'aspic obtient une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      },
      {
        "name": "Venin",
        "description": "en cas d'échec d'un test de END (palier moyenne), la victime est affaiblie pendant 1d6 heures. Si la victime subit un nouvel empoisonnement du même type durant cette période, elle sombre dans l'inconscience pour 1d6 heures."
      },
      {
        "name": "Vision dans le noir",
        "description": "l'aspic voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "L'aspic est un cousin du dragon d'Akrähryng. Plus grand, plus rapide et plus robuste, il est dépourvu de souffle enflammé mais sa queue se termine par un dard venimeux."
  },
  {
    "name": "Bison",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 10,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Cornes",
        "pool": 7,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "le bison parcourt une distance maximale de 30 mètres et réalise une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature doit faire un test opposé de FOR ou être renversée. Dans ce cas, la créature piétine (ou embroche) sa victime et les DM sont doublés."
      }
    ],
    "description": "Ce profil correspond à tous les grands herbivores à cornes (taureau, etc.). Les femelles fuient généralement à moins de défendre un petit."
  },
  {
    "name": "Bison, grand mâle",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 8,
      "agi": 3,
      "end": 8,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 15,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 8,
    "attacks": [
      {
        "name": "Cornes",
        "pool": 9,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "le bison parcourt une distance maximale de 30 mètres et réalise une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature doit faire un test opposé de FOR ou être renversée. Dans ce cas, la créature piétine (ou embroche) sa victime et les DM sont doublés."
      }
    ],
    "description": "Un grand mâle, d'environ 1,80 m au garrot et pesant une tonne."
  },
  {
    "name": "Calmar géant",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 8,
      "agi": 5,
      "end": 8,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 10,
    "initiative": 10,
    "attacks": [
      {
        "name": "Tentacules (deux attaques)",
        "pool": 10,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Dévore",
        "description": "lorsque le calmar géant réussit une attaque avec un critique, il saisit sa proie entre ses tentacules et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus renversée et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      },
      {
        "name": "Nuage d'encre",
        "description": "le calmar peut émettre un nuage d'encre noire qui aveugle ses poursuivants au prix d'une action de mouvement. Le nuage occupe un volume de 10 mètres de côté considéré comme une zone de ténèbres (noir total) pendant 1d4 tours. Ensuite, la zone s'étend sur 20 mètres et est alors considérée comme de la pénombre pendant 1d4 tours supplémentaires."
      },
      {
        "name": "Propulsion (L)",
        "description": "sous l'eau, le calmar peut se déplacer de 60 mètres par tour en ligne droite au prix d'une action limitée."
      },
      {
        "name": "Vision dans le noir",
        "description": "le calmar géant voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Comme leurs cousins ordinaires, les calmars géants possèdent un long corps fuselé en forme de cornet et dix tentacules, dont deux plus longs. Toutefois, ceux-ci mesurent environ 3 mètres de long et ses deux tentacules principaux (ceux avec lesquels il attaque) atteignent jusqu'à 6 mètres de long."
  },
  {
    "name": "Centaure",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 8,
      "agi": 4,
      "end": 8,
      "int": 1,
      "wis": 3,
      "cha": 2
    },
    "hp": 15,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 8,
    "attacks": [
      {
        "name": "Sabots",
        "pool": 9,
        "damage": 3
      },
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 4
      },
      {
        "name": "Arc long",
        "pool": 9,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Attaque double (L)",
        "description": "Le centaure peut faire une attaque de sabot plus une attaque avec son épée dans le même tour."
      },
      {
        "name": "Charge (L)",
        "description": "Le centaure parcourt une distance maximale de 30 mètres et réalise une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature doit faire un test opposé de FOR ou être renversée. Dans ce cas, la créature piétine (ou embroche) sa victime et les DM sont doublés."
      },
      {
        "name": "Hybride",
        "description": "Étant un mélange de deux créatures, le centaure possède des caractéristiques particulières. Sa FOR de +6 fait référence à la puissance globale de la créature mais son buste humain lui octroie seulement un bonus de +3 en combat. Il est considéré comme une créature humanoïde pour tout ce qui concerne les attaques mentales mais pas pour les attaques physiques. Il en va de même pour la END en cas de progression dans un profil de personnage."
      }
    ],
    "description": "Le centaure est une créature pourvue d'un corps de cheval et d'un buste humain. Très rares, la plupart de ses représentants ont été éradiqués des Terres d'Arran. Il survit cependant quelques peuplades dans les prairies reculées à l'est de l'Ourann, en bordure de la Birkanie et au cœur des forêts les plus dépeuplées. Ces centaures sont généralement primitifs et bestiaux."
  },
  {
    "name": "Centaure chasseur",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 8,
      "agi": 4,
      "end": 8,
      "int": 2,
      "wis": 4,
      "cha": 2
    },
    "hp": 35,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 10,
    "initiative": 10,
    "attacks": [
      {
        "name": "Sabots",
        "pool": 10,
        "damage": 4
      },
      {
        "name": "Épée longue",
        "pool": 10,
        "damage": 4
      },
      {
        "name": "Arc long",
        "pool": 10,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Attaque double (L)",
        "description": "Le centaure peut faire une attaque de sabots plus une attaque avec son épée dans le même tour."
      },
      {
        "name": "Attaque éclair (L)",
        "description": "Le centaure peut réaliser une attaque de mêlée avec un bonus de +2d6 en attaque et aux DM. Alternativement, il peut réaliser deux attaques à distance dans le même tour."
      },
      {
        "name": "Charge (L)",
        "description": "Le centaure parcourt une distance maximale de 30 mètres et réalise une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature doit faire un test opposé de FOR ou être renversée. Dans ce cas, la créature piétine (ou embroche) sa victime et les DM sont doublés."
      },
      {
        "name": "Forestier",
        "description": "Le centaure a un bonus de +2d6 aux tests de perception, de survie et de discrétion en milieu naturel. De plus, il peut fournir des plantes capables de soigner 3d6 PV (ne fonctionne qu'une fois par personnage et par jour)."
      }
    ]
  },
  {
    "name": "Champion raykenn",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 5,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "hp": 18,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 6,
    "attacks": [
      {
        "name": "Massues (deux attaques)",
        "pool": 8,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "portez une attaque avec avantage (+1d6). Si le champion obtient un critique (même sans utiliser Imparable), il inflige +2 aux dégâts et l'attaque est automatiquement réussie (quelle que soit la défense de son adversaire)."
      },
      {
        "name": "Natation",
        "description": "Les raykenns sont parfaitement adaptés au milieu aquatique. En cas de combat dans l'eau, ils ne souffrent d'aucune pénalité tandis que les personnages subissent un malus de -2 (marais) à -5 (sous l'eau). Voir page 114 pour les règles sur les conditions difficiles et le NR."
      }
    ]
  },
  {
    "name": "Cheval",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 4,
      "cha": 2
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Ruade",
        "pool": 7,
        "damage": 4
      }
    ],
    "abilities": [],
    "description": "Un cheval de selle n'est pas apte à subir le stress du combat. Dans ce type de situation, le cavalier doit utiliser une action de mouvement et réussir un test de CHA difficulté 10 pour réussir à le maîtriser à chaque tour. En cas d'échec, le cheval prend la fuite. Animal domestique, le cheval n'est pas habitué à se défendre, il reçoit un malus de -2 en combat (déjà pris en compte dans ses caractéristiques)."
  },
  {
    "name": "Crocodile",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 2,
      "end": 5,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 8,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 6,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au crocodile de se dissimuler, la cible doit faire un test de SAG palier moyenne ou être surprise. S'il attaque avec succès une cible surprise, le crocodile inflige +2 aux dégâts supplémentaires et toute créature dont la FOR est inférieure à la sienne est renversée. Il obtient un bonus de +5 à tous les tests de discrétion."
      }
    ],
    "description": "Ces caractéristiques peuvent aussi être utilisées pour tous les lézards prédateurs de grande taille (environ 3 mètres) à forte dentition (alligator et autres varans)."
  },
  {
    "name": "Démon mineur",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 1,
      "agi": 4,
      "end": 1,
      "int": 2,
      "wis": 3,
      "cha": 2
    },
    "hp": 6,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Griffes et morsure",
        "pool": 5,
        "damage": 1
      },
      {
        "name": "Sous-tension",
        "pool": 5,
        "damage": 2,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Démon",
        "description": "Les démons ne sont pas considérés comme des créatures non vivantes. Toutefois, ils partagent avec celles-ci de nombreux traits. Ils ne respirent pas, ne dorment jamais, ne connaissent pas la fatigue et sont immunisées au poison et aux maladies non magiques. Ils n'ont pas besoin de se sustenter, du moins pas avec des nourritures terrestres."
      },
      {
        "name": "Résistance",
        "description": "Par défaut, tous les démons réduisent les DM de feu et d'acide de 10 points. D'autres capacités peuvent améliorer cette résistance."
      },
      {
        "name": "Télépathie",
        "description": "Les démons peuvent communiquer avec toutes les créatures par télépathie jusqu'à une distance de 50 mètres sans avoir besoin de partager une langue commune."
      },
      {
        "name": "Immortel",
        "description": "Un démon ne peut être tué à moins d'avoir recours à un rituel spécifique – a minima un rituel funéraire pour les démons les plus faibles (rang 4 de la voie culturelle de l'ordre du Temple). La mort de son enveloppe ne fait que le bannir temporairement."
      },
      {
        "name": "Vision dans le noir",
        "description": "Tous les démons voient dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Se fondre dans les ombres",
        "description": "Au prix d'une action de mouvement, le démon mineur peut gagner les ombres et y disparaître. Il peut en ressortir quand bon lui semble, à une distance maximale de 20 m de son point de disparition – toujours au prix d'une action de mouvement. Tant qu'il est dans les ombres, le démon mineur est insensible à tout type de DM – hormis les DM de zone. Il peut cependant être révélé à l'aide d'une source de lumière suffisamment puissante (tel qu'un sort de Lumières dansantes par exemple ou un feu plus important que celui d'une torche)."
      },
      {
        "name": "Venin démoniaque",
        "description": "Une créature blessée par le démon mineur doit réussir un test de END palier moyenne ou être affaiblie (utiliser 1d12) pendant 1d6 minutes."
      },
      {
        "name": "Vol",
        "description": "Un démon mineur peut léviter au prix d'une action gratuite et se déplacer en vol de 20 mètres par action de mouvement."
      },
      {
        "name": "Image décalée",
        "description": "Pendant 7 tours, chaque fois que le démon est touché, lancez 1d6. Sur un résultat de 5 ou 6 il ne subit pas de DM."
      },
      {
        "name": "Mirage",
        "description": "Pendant 7 minutes, le démon produit une illusion visuelle et sonore."
      },
      {
        "name": "Imitation",
        "description": "Pendant 7 minutes, le démon peut prendre l'apparence de quelqu'un d'autre."
      },
      {
        "name": "Brumes",
        "description": "Le démon créée une zone de brouillard de 20 m de diamètre qui agit comme la pénombre."
      },
      {
        "name": "Sous-tension",
        "description": "Pendant 7 tours, toute attaque de contact réussie provoque 1d6 DM à l'attaque. Permet d'attaquer à distance pour 1d6 DM."
      },
      {
        "name": "Armure de terre",
        "description": "Octroie une RD 6 contre le feu, le froid, l'électricité ou l'acide pendant 7 tours (en plus de la Résistance)."
      }
    ],
    "description": "Ce démon s'incarne rarement seul dans notre dimension, il s'agit plutôt du suivant d'un prince démon. À moins qu'un apprenti mystique n'ait cherché à jouer avec le feu... Le démon mineur est l'une des rares créatures démoniaques à pouvoir survivre en dehors du corps d'un hôte. Il n'a pas réellement de forme en vérité. Il ressemble davantage à une sorte de nuage ténébreux, une émanation informe et effrayante cherchant à se tapir dans les ombres pour mieux se repaître de la terreur des vivants."
  },
  {
    "name": "Démone dominatrice",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 3,
      "agi": 4,
      "end": 3,
      "int": 3,
      "wis": 3,
      "cha": 5
    },
    "hp": 25,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Griffes",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique",
        "pool": 6,
        "damage": 1
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+5 d'armure, sauf contre : armes traditionnelles."
      },
      {
        "name": "Absorption d'énergie (L)",
        "description": "une dominatrice peut aspirer l'énergie vitale de sa victime en l'enlaçant ou en l'embrassant. Si la victime n'est pas consentante, la dominatrice doit auparavant réussir un test d'attaque au contact puis gagner un test opposé de FOR. La victime de l'absorption d'énergie est affaiblie (utilise un d12 aux tests) pour 24 heures mais ressent une jouissance extatique lors de ce contact. Elle ressent le besoin impérieux de le renouveler pendant les 24 heures suivantes à moins de réussir un test de SAG palier difficile. Si la victime résiste, elle est immunisée à cet effet pour les prochaines 24 heures. En plus des autres effets, si la dominatrice le souhaite, à chaque fois qu'elle absorbe l'énergie, elle peut infliger 1d6 DM et guérir d'autant (les points de vie acquis au-delà de son score maximum de PV sont perdus après dix minutes)."
      },
      {
        "name": "Vitalité surnaturelle",
        "description": "la dominatrice guérit à un rythme fantastique : elle récupère 5 PV à la fin de chaque tour. Les DM provenant d'armes magiques ou de sorts ne peuvent guérir de cette façon."
      }
    ],
    "description": "Bien qu'asexuée, la dominatrice apprécie de prendre la voix et le corps de belles humanoïdes pour dominer et corrompre les individus mâles. Elle préfère avoir recours à la ruse et la domination psychologique plutôt qu'au combat pour tuer et assouvir ses instincts de destruction."
  },
  {
    "name": "Dragon commun",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 8,
      "agi": 3,
      "end": 8,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 15,
    "armor": 4,
    "armorKind": "lourde",
    "defense": 10,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 10,
        "damage": 7
      },
      {
        "name": "Souffle (L)",
        "pool": 10,
        "damage": 11,
        "range": 6
      }
    ],
    "abilities": [
      {
        "name": "Souffle enflammé (L)",
        "description": "au prix d'une action limitée, le dragon commun peut cracher un souffle ardent jusqu'à une distance de 6 et sur 4 m de large. Toutes les cibles prises dans la zone doivent réaliser un test de AGI palier moyenne. En cas d'échec, elles subissent 6d6 DM de feu. Une réussite permet de diviser les DM par deux. Le dragon doit attendre 1d4 tours avant de pouvoir de nouveau utiliser son souffle."
      },
      {
        "name": "Vol rapide",
        "description": "le dragon commun obtient une action de mouvement supplémentaire par tour lorsqu’il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s’il est en vol et attaque une créature au sol."
      },
      {
        "name": "Vision dans le noir",
        "description": "le dragon voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Également appelé dragon d’Akrähyng ou « volant », en référence à la ville orientale qui renferme les secrets de leur domestication et du commerce juteux qui en découle, cette créature est la monture ailée la plus courante des Terres d’Arran. Longue de presque 10 m en comptant leur queue, elles arborent des couleurs variées dont les dominantes sont le rouge, le vert ou le bleu turquoise. Une fois adultes, les dragons sont capables de cracher du feu."
  },
  {
    "name": "Dragon originel",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 90,
    "armor": 8,
    "armorKind": "lourde",
    "defense": 8,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 8,
        "damage": 15
      },
      {
        "name": "Attaque magique",
        "pool": 8,
        "damage": 1
      },
      {
        "name": "Souffle (L)",
        "pool": 8,
        "damage": 26,
        "range": 30
      }
    ],
    "abilities": [
      {
        "name": "Agripper",
        "description": "sur un critique en attaque, le dragon originel agrippe sa proie et ne la lâche plus. Il obtient un bonus de +2d6 en attaque et +2 aux dégâts contre la cible qu'il agrippe et celle-ci est immobilisée si elle est de taille inférieure. La victime peut essayer de se libérer au prix d'une action de mouvement en réussissant un test de FOR opposé."
      },
      {
        "name": "Coup de queue",
        "description": "à chaque fois qu'un adversaire attaque le dragon originel dans le dos, il subit une attaque de queue gratuite équivalente à une attaque avec un malus de -5 et des DM divisés par deux."
      },
      {
        "name": "Effroi",
        "description": "lorsque le dragon originel attaque pour la première fois, toutes les créatures à moins de 50 mètres doivent réussir un test de SAG palier difficile ou être submergées par la peur et ralenties pendant 1d4 tours."
      },
      {
        "name": "Emporter dans les airs",
        "description": "le dragon originel peut emporter dans les airs une victime agrippée de taille inférieure à la sienne au prix d'une action de mouvement. Au premier tour, si la victime se libère (test de FOR opposé), elle subit, 5d6 DM de chute. Au tour suivant, si la créature décide de prendre de l'altitude, les DM passent à 10d6."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque et si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Souffle enflammé (L)",
        "description": "le souffle est une attaque de zone affectant toutes les créatures dans un cône de 30 mètres de long sur 15 de large. L'attaque inflige automatiquement (pas de test d'attaque) [6d6 + 30] DM. Les DM sont divisés par deux si la victime réussit un test de AGI palier moyenne. La créature doit attendre après chaque utilisation 1d4 tours avant d'utiliser à nouveau son souffle."
      },
      {
        "name": "Vision dans le noir",
        "description": "le dragon voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Vol rapide",
        "description": "le dragon originel obtient une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      },
      {
        "name": "Injonction",
        "description": "donne un ordre simple à une cible contre un test d'attaque magique opposé."
      },
      {
        "name": "Sommeil",
        "description": "1d6+4 créatures dans une zone de 10 mètres de diamètre (18 PV max.) sombrent dans l'inconscience pendant 9 minutes."
      },
      {
        "name": "Confusion",
        "description": "désoriente une cible pendant 7 tours contre un test d'attaque magique opposé. Lancez 1d6 : 1-3, la victime n'agit pas ; 4-6, elle"
      }
    ],
    "description": "Les dragons originels sont rares, grands, massifs et intelligents. Ils maîtrisent une magie subtile leur permettant de s'immiscer dans l'esprit des créatures pensantes pour communiquer avec elles ou influencer leur esprit.\nL'apparence des dragons originels peut varier grandement, certains étant liés à des éléments naturels tels que la glace, la roche ou le bois, tandis que d'autres sont simplement immenses et majestueux."
  },
  {
    "name": "Dragon originel vénérable",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 5,
      "agi": 1,
      "end": 5,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 130,
    "armor": 9,
    "armorKind": "lourde",
    "defense": 10,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 10,
        "damage": 18
      },
      {
        "name": "Attaque magique",
        "pool": 10,
        "damage": 1
      },
      {
        "name": "Souffle (L)",
        "pool": 10,
        "damage": 33,
        "range": 30
      }
    ],
    "abilities": [
      {
        "name": "Agripper",
        "description": "sur un critique en attaque, le dragon originel agrippe sa proie et ne la lâche plus. Il obtient un bonus de +2d6 en attaque et +2 aux dégâts contre la cible qu'il agrippe et celle-ci est immobilisée si elle est de taille inférieure. La victime peut essayer de se libérer au prix d'une action de mouvement en réussissant un test de FOR opposé."
      },
      {
        "name": "Balayage",
        "description": ": le dragon originel utilise sa grande taille pour affecter plusieurs créatures d'un seul coup de patte. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180°). Faire un seul test d'attaque et le comparer à la défense de chaque cible."
      },
      {
        "name": "Coup de queue",
        "description": ": à chaque fois qu'un adversaire attaque le dragon dans le dos, il subit une attaque de queue gratuite équivalente à une attaque avec un malus de -5 et des DM divisés par deux."
      },
      {
        "name": "Effroi",
        "description": ": lorsque le dragon originel attaque pour la première fois, toutes les créatures à moins de 50 mètres doivent réussir un test de SAG palier difficile ou être submergées par la peur et ralenties pendant 1d4 tours."
      },
      {
        "name": "Emporter dans les airs",
        "description": ": le dragon originel peut emporter dans les airs une victime agrippée de taille inférieure à la sienne au prix d'une action de mouvement. Au premier tour, si la victime se libère (test de FOR opposé), elle subit 5d6 DM de chute. Au tour suivant, si la créature décide"
      },
      {
        "name": "Fauchage",
        "description": ": sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Souffle enflammé (L)",
        "description": ": Le souffle est une attaque de zone affectant toutes les créatures dans un cône de 30 mètres de long sur 15 de large. L'attaque inflige automatiquement (pas de test d'attaque) 10d6 + 30 DM. Les DM sont divisés par deux si la victime réussit un test de AGI palier moyenne. La créature doit attendre 1d4 tours avant d'utiliser à nouveau son souffle après chaque utilisation."
      },
      {
        "name": "Vision dans le noir",
        "description": ": le dragon voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Vol rapide",
        "description": ": le dragon originel obtient une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      },
      {
        "name": "Voie de l'envoûtement rang 5",
        "description": "(Ldj, p. 134)"
      },
      {
        "name": "Injonction",
        "description": ": donne un ordre simple à une cible contre un test d'attaque magique opposé."
      },
      {
        "name": "Sommeil",
        "description": ": 1d6+6 créatures dans une zone de 10 mètres de diamètre (22 PV max.) sombrent dans l'inconscience pendant 11 minutes."
      },
      {
        "name": "Confusion",
        "description": ": désoriente une cible pendant 11 tours contre un test d'attaque magique opposé. Lancez 1d6 : 1-3, la victime n'agit pas ; 4-6, elle attaque la créature la plus proche."
      },
      {
        "name": "Amitié",
        "description": ": en réussissant un test d'attaque magique contre les PV max. d'une cible, cette dernière se comporte comme un ami de longue date. La cible peut résister une fois par jour avec un test de SAG palier difficile."
      },
      {
        "name": "Domination",
        "description": ": permet de prendre le contrôle d'un corps pendant [1d4+6] minutes en réussissant un test d'attaque magique opposé. La cible peut résister à chaque fois qu'elle prend des DM avec un test de SAG palier difficile."
      }
    ]
  },
  {
    "name": "Dryade vengeresse",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 6,
      "agi": 1,
      "end": 6,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 130,
    "armor": 1,
    "armorKind": "aucune",
    "defense": 11,
    "initiative": 7,
    "attacks": [
      {
        "name": "Branches",
        "pool": 11,
        "damage": 16
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+5 d'armure, sauf contre : feu et haches."
      },
      {
        "name": "Créature non vivante",
        "description": "les dryades ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Balayage",
        "description": "la dryade vengeresse utilise sa grande taille pour affecter plusieurs créatures d’un seul coup de branche. Si plusieurs cibles sont présentes face à elle, son attaque affecte deux créatures (dans un arc de 180°). Faire un seul test d’attaque et le comparer à la défense de chaque cible."
      },
      {
        "name": "Résistance aux DM",
        "description": "la dryade possède retranche 10 points à tous les DM sauf s’il s’agit de DM de feu ou d’armes tranchantes très lourdes, comme les haches."
      }
    ]
  },
  {
    "name": "Dryades",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 1,
      "end": 4,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 55,
    "armor": 1,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 5,
    "attacks": [
      {
        "name": "Branches",
        "pool": 7,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+5 d'armure, sauf contre : feu et haches."
      },
      {
        "name": "Créature non vivante",
        "description": "les dryades ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Résistance aux DM",
        "description": "la dryade possède retranche 10 points à tous les DM sauf s’il s’agit de DM de feu ou d’armes tranchantes très lourdes, comme les haches."
      }
    ],
    "description": "Une dryade – également appelé esprit de la forêt – est une sorte d’arbre vivant ou un amalgame de végétaux ayant pris une forme grossièrement humanoïde. C’est la reine sylvaine Eliseii qui a réveillé ces créatures avant que la reine Ora ne renouvelle l’exploit quelques décennies plus tard. Aujourd’hui, les dryades sont retournées à leur hibernation séculaire mais leur essence est toujours présente dans les forêts de Duhann et de Daëdenn. Il n’est pas exclu qu’un druide ou un sage suffisamment puissant soit capable d’en éveiller de nouvelles, quels que soit ses desseins."
  },
  {
    "name": "Élémentaire colossal",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 10,
      "agi": 2,
      "end": 10,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "hp": 110,
    "armor": 5,
    "armorKind": "aucune",
    "defense": 15,
    "initiative": 9,
    "attacks": [
      {
        "name": "Coup",
        "pool": 15,
        "damage": 16
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Créature non-vivante",
        "description": "les élémentaires ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Cyclone (L)",
        "description": "une fois par combat, un élémentaire peut se transformer en tourbillon de matière élémentaire. Pendant [1d4+1] tours, il peut se déplacer à travers les créatures et les objets à la vitesse de 30 mètres par tour. Toute créature sur son passage doit faire au choix un test de AGI ou de FOR palier difficile de l'élémentaire. En cas d'échec, la cible subit automatiqument les DM de base de l'élémentaire (selon la taille) et elle est renversée au sol (si sa taille ne dépasse pas celle de l'élémentaire). En cas de succès, elle ne subit que la moitié des DM et peut rester debout. Lorsqu'il est sous forme de cyclone, l'élémentaire gagne un bonus de +2d6 en défense."
      },
      {
        "name": "Vision dans le noir",
        "description": "les élémentaires voient dans le noir jusqu'à 30 mètres et peuvent déterminer la localisation de toute créature en contact avec leur élément à moins de 30 mètres, même si celle-ci est invisible."
      },
      {
        "name": "Balayage",
        "description": "l'élémentaire utilise sa grande taille pour affecter plusieurs créatures d'un seul coup. Si plusieurs cibles sont présentes face à elle, son attaque affecte deux créatures (dans un arc de 180°)."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      }
    ]
  },
  {
    "name": "Élémentaire énorme",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 8,
      "agi": 2,
      "end": 8,
      "int": 1,
      "wis": 2,
      "cha": 2
    },
    "hp": 55,
    "armor": 3,
    "armorKind": "aucune",
    "defense": 11,
    "initiative": 7,
    "attacks": [
      {
        "name": "Coup",
        "pool": 11,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Créature non-vivante",
        "description": "les élémentaires ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Cyclone (L)",
        "description": "une fois par combat, un élémentaire peut se transformer en tourbillon de matière élémentaire. Pendant [1d4+1] tours, il peut se déplacer à travers les créatures et les objets à la vitesse de 30 mètres par tour. Toute créature sur son passage doit faire au choix un test de AGI ou de FOR palier difficile de l'élémentaire. En cas d'échec, la cible subit automatiqument les DM de base de l'élémentaire (selon la taille) et elle est renversée au sol (si sa taille ne dépasse pas celle de l'élémentaire). En cas de succès, elle ne subit que la moitié des DM et peut rester debout. Lorsqu'il est sous forme de cyclone, l'élémentaire gagne un bonus de +2d6 en défense."
      },
      {
        "name": "Vision dans le noir",
        "description": "les élémentaires voient dans le noir jusqu'à 30 mètres et peuvent déterminer la localisation de toute créature en contact avec leur élément à moins de 30 mètres, même si celle-ci est invisible."
      },
      {
        "name": "Balayage",
        "description": "l'élémentaire utilise sa grande taille pour affecter plusieurs créatures d'un seul coup. Si plusieurs cibles sont présentes face à elle, son attaque affecte deux créatures (dans un arc de 180°)."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      }
    ]
  },
  {
    "name": "Élémentaire grand",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 25,
    "armor": 2,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Coup",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Créature non-vivante",
        "description": "les élémentaires ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Cyclone (L)",
        "description": "une fois par combat, un élémentaire peut se transformer en tourbillon de matière élémentaire. Pendant [1d4+1] tours, il peut se déplacer à travers les créatures et les objets à la vitesse de 30 mètres par tour. Toute créature sur son passage doit faire au choix un test de AGI ou de FOR palier difficile de l'élémentaire. En cas d'échec, la cible subit automatiqument les DM de base de l'élémentaire (selon la taille) et elle est renversée au sol (si sa taille ne dépasse pas celle de l'élémentaire). En cas de succès, elle ne subit que la moitié des DM et peut rester debout. Lorsqu'il est sous forme de cyclone, l'élémentaire gagne un bonus de +2d6 en défense."
      },
      {
        "name": "Vision dans le noir",
        "description": "les élémentaires voient dans le noir jusqu'à 30 mètres et peuvent déterminer la localisation de toute créature en contact avec leur élément à moins de 30 mètres, même si celle-ci est invisible."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      }
    ]
  },
  {
    "name": "Élémentaire moyen",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 3,
      "end": 3,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 15,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 6,
    "attacks": [
      {
        "name": "Coup",
        "pool": 4,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Créature non-vivante",
        "description": "les élémentaires ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Cyclone (L)",
        "description": "une fois par combat, un élémentaire peut se transformer en tourbillon de matière élémentaire. Pendant [1d4+1] tours, il peut se déplacer à travers les créatures et les objets à la vitesse de 30 mètres par tour. Toute créature sur son passage doit faire au choix un test de AGI ou de FOR palier difficile de l'élémentaire. En cas d'échec, la cible subit automatiqument les DM de base de l'élémentaire (selon la taille) et elle est renversée au sol (si sa taille ne dépasse pas celle de l'élémentaire). En cas de succès, elle ne subit que la moitié des DM et peut rester debout. Lorsqu'il est sous forme de cyclone, l'élémentaire gagne un bonus de +2d6 en défense."
      },
      {
        "name": "Vision dans le noir",
        "description": "les élémentaires voient dans le noir jusqu'à 30 mètres et peuvent déterminer la localisation de toute créature en contact avec leur élément à moins de 30 mètres, même si celle-ci est invisible."
      }
    ]
  },
  {
    "name": "Élémentaire petit",
    "size": "petite",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 3,
      "end": 2,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 7,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 6,
    "attacks": [
      {
        "name": "Coup",
        "pool": 4,
        "damage": 1
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : magie."
      },
      {
        "name": "Créature non-vivante",
        "description": "les élémentaires ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Cyclone (L)",
        "description": "une fois par combat, un élémentaire peut se transformer en tourbillon de matière élémentaire. Pendant [1d4+1] tours, il peut se déplacer à travers les créatures et les objets à la vitesse de 30 mètres par tour. Toute créature sur son passage doit faire au choix un test de AGI ou de FOR palier difficile de l'élémentaire. En cas d'échec, la cible subit automatiqument les DM de base de l'élémentaire (selon la taille) et elle est renversée au sol (si sa taille ne dépasse pas celle de l'élémentaire). En cas de succès, elle ne subit que la moitié des DM et peut rester debout. Lorsqu'il est sous forme de cyclone, l'élémentaire gagne un bonus de +2d6 en défense."
      },
      {
        "name": "Vision dans le noir",
        "description": "les élémentaires voient dans le noir jusqu'à 30 mètres et peuvent déterminer la localisation de toute créature en contact avec leur élément à moins de 30 mètres, même si celle-ci est invisible."
      }
    ]
  },
  {
    "name": "Fantôme majeur",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 3,
      "agi": 3,
      "end": 3,
      "int": 2,
      "wis": 3,
      "cha": 1
    },
    "hp": 20,
    "armor": 1,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Contact corrupteur",
        "pool": 5,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+5 d'armure, sauf contre : eau et armes bénies."
      },
      {
        "name": "Vision dans le noir",
        "description": "le fantôme voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Vol",
        "description": "le fantôme peut se déplacer en vol de 20 mètres par action de mouvement."
      },
      {
        "name": "Affaiblissement",
        "description": "à chaque fois qu'une créature subit les DM du contact corrupteur du fantôme, elle doit réussir un test de END palier moyenne ou être affaiblie pendant 1d6 minutes."
      },
      {
        "name": "Aspect terrifiant",
        "description": "le fantôme peut prendre instantanément un aspect terrifiant. Toutes les créatures témoins de cette transformation pour la première fois doivent réussir un test de SAG palier moyenne ou être affaiblie au prochain tour."
      },
      {
        "name": "Créature non vivante",
        "description": "les fantômes ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Hurlement (L)",
        "description": "le fantôme pousse un terrible hurlement, toutes les créatures présentes dans un rayon de 10 mètres doivent réussir un test de SAG palier moyenne ou fuir pendant 1d6 tours. Une créature qui a réussi son test de SAG est immunisée au hurlement pour les prochaines 24 heures."
      },
      {
        "name": "Intangible",
        "description": "un fantôme peut passer à travers les murs et les objets comme s'ils n'existaient pas. Il ne peut traverser ni les objets magiques ou organiques ni les créatures."
      }
    ],
    "description": "Un fantôme est la manifestation physique de l'âme d'une créature qui n'a pas trouvé le repos. Il s'agit généralement d'une race pensante humanoïde. Les fantômes peuvent être plus ou moins dangereux en fonction de la volonté et de la puissance de l'être qui se manifeste ou de sa haine pour les vivants. Certains fantômes mineurs sont peu dangereux tandis que les fantômes les plus haineux sont beaucoup plus difficiles à vaincre. Dans tous les cas, il est rare que vaincre la manifestation du fantôme soit suffisant pour s'en débarrasser à long terme, et seul le recours à un exorciste ou une action qui permet à l'âme tourmentée de trouver le repos mettra fin à sa réapparition systématique au bout de 24 heures. En contrepartie, les fantômes sont généralement liés à un lieu, un objet ou une personne et s'éloigner est souvent une action suffisante pour lui échapper."
  },
  {
    "name": "Fantôme mineur",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 3,
      "end": 3,
      "int": 2,
      "wis": 3,
      "cha": 1
    },
    "hp": 5,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Contact corrupteur",
        "pool": 4,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : eau et armes bénies."
      },
      {
        "name": "Vision dans le noir",
        "description": "le fantôme voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Vol",
        "description": "le fantôme peut se déplacer en vol de 20 mètres par action de mouvement."
      },
      {
        "name": "Affaiblissement",
        "description": "à chaque fois qu'une créature subit les DM du contact corrupteur du fantôme, elle doit réussir un test de END palier moyenne ou être affaiblie pendant 1d6 minutes."
      },
      {
        "name": "Créature non vivante",
        "description": "les fantômes ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Intangible",
        "description": "un fantôme peut passer à travers les murs et les objets comme s'ils n'existaient pas. Il ne peut traverser ni les objets magiques ou organiques ni les créatures."
      }
    ],
    "description": "Un fantôme est la manifestation physique de l'âme d'une créature qui n'a pas trouvé le repos. Il s'agit généralement d'une race pensante humanoïde. Les fantômes peuvent être plus ou moins dangereux en fonction de la volonté et de la puissance de l'être qui se manifeste ou de sa haine pour les vivants. Certains fantômes mineurs sont peu dangereux tandis que les fantômes les plus haineux sont beaucoup plus difficiles à vaincre. Dans tous les cas, il est rare que vaincre la manifestation du fantôme soit suffisant pour s'en débarrasser à long terme, et seul le recours à un exorciste ou une action qui permet à l'âme tourmentée de trouver le repos mettra fin à sa réapparition systématique au bout de 24 heures. En contrepartie, les fantômes sont généralement liés à un lieu, un objet ou une personne et s'éloigner est souvent une action suffisante pour lui échapper."
  },
  {
    "name": "Fée",
    "size": "tres petite",
    "threat": 1,
    "stats": {
      "str": 1,
      "agi": 4,
      "end": 1,
      "int": 3,
      "wis": 3,
      "cha": 3
    },
    "hp": 1,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Attaque magique",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Vol",
        "description": "la créature est capable de voler de 20 mètres par action de mouvement."
      }
    ],
    "description": "Les fées sont de petites créatures féminines ailées à l'apparence variable en fonction de leur nature. Magiques et artificielles, elles sont le fruit des énergies telluriques des Terres d'Arran et évoluent dans des lieux isolés et chargés de magie. Certaines créatures primordiales, telles que les Fléaux, sont également capables de leur donner naissance. La fée originelle est charmante, envoûtante et possède des ailes de libellule."
  },
  {
    "name": "Fée noire",
    "size": "tres petite",
    "threat": 2,
    "stats": {
      "str": 1,
      "agi": 4,
      "end": 1,
      "int": 3,
      "wis": 3,
      "cha": 3
    },
    "hp": 11,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Flèches",
        "pool": 6,
        "damage": 1
      },
      {
        "name": "Vampirisation (L)",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [],
    "description": "Le monde a changé. Les entités primordiales ont lentement été corrompues et les fées qui les servent ne sont plus les mêmes. La fée noire est une créature hybride dont le buste est celui d'une femme minuscule tandis que le bas du corps est celui d'une créature insectoïde. Ce sont les charmants bambins de celle que l'on nomme la mère des Fléaux. Apparemment inoffensifs, le cœur de ces créatures vibre d'une magie ancestrale qui leur donne le pouvoir de pénétrer dans le sommeil des gens. Elles se nourrissent des rêves, ce qui leur permettrait, d'après la légende, de muter et de devenir des araignées aux proportions démesurées. Mais sans rêves pour se nourrir, elles meurent."
  },
  {
    "name": "Fléau",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 6,
      "agi": 1,
      "end": 6,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 160,
    "armor": 11,
    "armorKind": "lourde",
    "defense": 11,
    "initiative": 7,
    "attacks": [
      {
        "name": "Poings et morsure",
        "pool": 11,
        "damage": 19
      },
      {
        "name": "Attaque magique élémentaire (par ex. feu)",
        "pool": 11,
        "damage": 33,
        "range": 30
      }
    ],
    "abilities": [
      {
        "name": "Armure magique (L)",
        "description": "la créature possède un pouvoir magique qui lui permet de diviser tous les DM physiques subis par deux pour le reste du combat. Ce pouvoir n'affecte pas les DM des attaques magiques élémentaires (feu, froid, acide, électricité)."
      },
      {
        "name": "Attaque magique élémentaire (L)",
        "description": "le fléau possède un pouvoir magique qui inflige [10d6 + 30] DM sur un test d'attaque magique réussi (portée 30 mètres) sur une cible unique. Ce pouvoir est lié à un élément propre au Fléau, que ce soit le feu, la glace, la roche, la foudre, etc."
      },
      {
        "name": "Balayage",
        "description": "le fléau utilise sa grande taille pour affecter plusieurs créatures d'un seul coup de poing. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180 °). Faire un seul test d'attaque et le comparer à la défense de chaque cible."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Projection",
        "description": "sur un critique au test d'attaque, la victime est projetée à [1d6+1]"
      }
    ],
    "description": "Également appelés géants ou titans, les Fléaux sont d'immenses créatures animées par l'énergie primordiale du monde. Ils dominaient les Terres d'Arran avant même l'arrivée des premiers Elfes et ont ravagé le monde par leurs guerres de territoires avant de s'apaiser et de s'endormir.\n\nLes légendes racontent qu'ils se sont éveillés une fois et que leur colère à la découverte des civilisations émergentes avait manqué d'éradiquer toute forme de vie pensante. Nul ne sait comment ils ont été de nouveau plongés dans leur sommeil sans fin.\n\nLe monde a depuis oublié leur existence. Mais s'il est vrai que les eaux, les roches et la végétation ont recouvert leur corps, ils ne sont pas morts. Ils dorment, simplement.\n\nLes Fléaux sont des créatures immenses, mesurant jusqu'à près de 20 mètres de haut – voire bien plus, les légendes traitant de certains Fléaux comme de véritables montagnes –, à la forme humanoïde mais aux traits bestiaux. Ils sont habités d'une rage ancestrale et dotés d'une force encore plus considérable que ce que laisse envisager leur stature. Certains disposent de pouvoirs magiques dépassant l'entendement.\n\nPersonnalisation : vous pouvez ajouter des voies de profil ou de prestige pour un bonus de +1 au NC par voie. Il n'y a virtuellement aucune limite au NC d'un Fléau mais ajoutez un rang"
  },
  {
    "name": "Géant",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 60,
    "armor": 5,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Masse en pierre",
        "pool": 6,
        "damage": 11
      },
      {
        "name": "Lancer de rocher",
        "pool": 6,
        "damage": 6,
        "range": 20
      }
    ],
    "abilities": [
      {
        "name": "Balayage",
        "description": "le géant utilise sa grande taille pour affecter plusieurs créatures d’un seul coup. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180 °)."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      },
      {
        "name": "Tremblement de terre (L)",
        "description": "une fois par combat, le géant peut taper du pied et provoquer une onde de choc. Toutes les créatures dans un rayon de 10 mètres, de taille grande ou inférieure, doivent réussir un test de AGI palier moyenne ou être renversées."
      }
    ],
    "description": "Les géants sont des humanoïdes immenses (ils mesurent de 5 à 6 m), stupides et issus des contrées les plus éloignées des terres d’Arran. La menace qu’ils représentent est diminuée par le fait qu’il s’agit de créatures solitaires."
  },
  {
    "name": "Golem de chair",
    "size": "grande",
    "threat": 3,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 35,
    "armor": 5,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Poings (deux attaques)",
        "pool": 8,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Absorber l’électricité",
        "description": "non seulement le golem de chair est immunisé à l’électricité mais, de plus, les DM de ce type lui permettent de guérir de ses blessures. Il régénère 1 PV pour 3 points de DM d’électricité qui lui sont infligés."
      },
      {
        "name": "Créature non vivante",
        "description": "les golems ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Charge (L)",
        "description": "le golem de chair parcourt une distance maximale de 30 mètres et réalise une attaque : avec avantage (+1d6). Si l’attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature, doit faire un test opposé de FOR ou être renversée. Dans ce cas, la créature piétine (ou embroche) sa victime et les DM sont doublés."
      },
      {
        "name": "Enrager",
        "description": "lorsqu’il reçoit un coup critique ou si ses PV ont diminué de moitié ou plus, le golem de chair devient enragé. Il ignore les pénalités de douleur ou la peur, augmente de +5 son score d’attaque au contact et ses DM de +1d6. Il peut encore agir un tour complet après avoir atteint 0 PV."
      },
      {
        "name": "Résistance",
        "description": "le golem de chair divise par deux tous les DM élémentaires (feu, froid, électricité, acide)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le golem voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Monstre à la fois pitoyable et effrayant, le golem de chair est une créature imposante mesurant presque 2,50 mètres constituée de l’assemblage grossier de divers cadavres."
  },
  {
    "name": "Golem de fer",
    "size": "enorme",
    "threat": 4,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 75,
    "armor": 8,
    "armorKind": "lourde",
    "defense": 7,
    "initiative": 6,
    "attacks": [
      {
        "name": "Arme",
        "pool": 7,
        "damage": 14
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : armes ogres."
      },
      {
        "name": "Balayage",
        "description": "le golem de fer utilise sa grande taille pour affecter plusieurs créatures d’un seul coup. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180 °)."
      },
      {
        "name": "Créature non vivante",
        "description": "les golems ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      },
      {
        "name": "Lenteur",
        "description": "toutes les créatures dans un rayon de 3 mètres autour du golem de fer doivent réussir un test de SAG palier moyenne chaque tour ou être ralentie pendant un tour."
      },
      {
        "name": "Résistance",
        "description": "le golem de divise par deux tous les DM élémentaires (feu, froid, électricité, acide)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le golem voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Un golem de fer est une sorte d’immense armure animée. Son poids est si important qu’il fait trembler le sol à chacun de ses pas. C’est un adversaire terrifiant dont il est difficile de trouver le point faible."
  },
  {
    "name": "Golem de pierre",
    "size": "grande",
    "threat": 4,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 55,
    "armor": 7,
    "armorKind": "lourde",
    "defense": 10,
    "initiative": 8,
    "attacks": [
      {
        "name": "Poings",
        "pool": 10,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : armes naines."
      },
      {
        "name": "Créature non vivante",
        "description": "les golems ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      },
      {
        "name": "Nuage empoisonné",
        "description": "toutes les créatures dans un rayon de 3 mètres autour du golem de pierre doivent réussir un test de END palier moyenne chaque tour ou être affaiblie et ralentie pendant un tour."
      },
      {
        "name": "Résistance",
        "description": "le golem divise par deux tous les DM élémentaires (feu, froid, électricité, acide)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le golem voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Un golem de pierre ressemble à une statue massive de forme humanoïde d'environ 2,50 mètres. Son apparence exacte peut énormément varier selon les goûts artistiques de son créateur."
  },
  {
    "name": "Goule guerrière",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": []
  },
  {
    "name": "Goule inférieure",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 2,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 5,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 3,
        "damage": 4
      }
    ],
    "abilities": []
  },
  {
    "name": "Goule troll de glace",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 45,
    "armor": 4,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Griffes",
        "pool": 6,
        "damage": 13
      },
      {
        "name": "Lancer de rochers",
        "pool": 6,
        "damage": 13,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier difficile ou être renversée."
      }
    ]
  },
  {
    "name": "Goule wampür",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 15,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 9,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 5,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Poison anesthésiant",
        "description": "la morsure du wampür inocule un poison : la victime doit réussis sir un test de END palier moyenne ou être affaiblie pendant 1d6 tours. Si elle est affectée une seconde fois par le poison alors qu’elle est déjà sous son effet, elle sombre à la place dans l’inconscience pour 1d6 tours."
      }
    ]
  },
  {
    "name": "Grand crocodile",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 10,
      "agi": 2,
      "end": 10,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 8,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 12,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 12,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au grand crocodile de se dissimuler, la cible doit faire un test de SAG palier moyenne ou être surprise. S'il attaque avec succès une cible surprise, le crocodile inflige +2 aux dégâts supplémentaires et toute créature dont la FOR est inférieure à la sienne est renversée. Il obtient un bonus de +5 à tous les tests de discrétion."
      },
      {
        "name": "Dévorer",
        "description": "lorsque le grand crocodile réussit une attaque avec un critique, il saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus renversée et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      }
    ]
  },
  {
    "name": "Griffon",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 4,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 2
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 9,
    "attacks": [
      {
        "name": "Morsures et griffes",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Vol rapide",
        "description": "le griffon obtient une action de mouvement supplémentaire par tour lorsqu'il est en vol. Au premier tour de combat, il obtient un bonus de +2d6 en attaque et +2 aux dégâts s'il est en vol et attaque une créature au sol."
      }
    ],
    "description": "Le griffon est une puissante créature au corps de lion pourvue de la tête et des ailes d'un aigle. Ce mélange ne manque pas de majesté et cet animal fantastique est parfois utilisé comme monture par les chevaliers. La créature pèse environ 300 kg pour une envergure de 7 mètres. Un griffon est plus intelligent qu'un simple animal et, même s'il ne parle pas, il peut apprendre à comprendre une langue s'il y est habitué très tôt."
  },
  {
    "name": "Guivre",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 15,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 6,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Insensible à l'aveuglement",
        "description": "grâce à ses facultés auditives exceptionnelles, la guivre ne souffre d'aucun malus lorsqu'elle est aveuglée ou qu'elle combat dans le noir complet. Cependant, elle pourrait éventuellement être surprise par des dangers immatériels."
      },
      {
        "name": "Vol rapide",
        "description": "la guivre obtient une action de mouvement supplémentaire par tour lorsqu'elle est en vol. Au premier tour de combat, elle obtient un bonus de +2d6 en attaque et +2 aux dégâts si elle est en vol et attaque une créature au sol."
      }
    ],
    "description": "Une guivre est une grande créature ailée rappelant une immense chauve-souris. Très agressif, ce prédateur essentiellement nocturne piste ses proies à l'ouïe grâce à ses grandes oreilles. Tout comme la chauve-souris, il peut pousser des cris stridents dont la réverbération des sons dans l'environnement lui permet de se repérer en absence de lumière. Cependant, contrairement au petit mammifère il n'est pas aveugle.\nCertaines guivres ont été dressées pour servir de monture. L'exercice est périlleux, mais s'il est vrai qu'elles ne peuvent égaler en vitesse ou endurance les dragons d'Akrähyng, elles sont plus robustes et rustiques."
  },
  {
    "name": "Guivre vénérable",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 1,
      "end": 4,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 55,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 5,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 7,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Insensible à l'aveuglement",
        "description": "grâce à ses facultés auditives exceptionnelles, la guivre ne souffre d'aucun malus lorsqu'elle est aveuglée ou qu'elle combat dans le noir complet. Cependant, elle pourrait éventuellement être surprise par des dangers immatériels."
      },
      {
        "name": "Vol rapide",
        "description": "la guivre obtient une action de mouvement supplémentaire partout lorsqu'elle est en vol. Au premier tour de combat, elle obtient un bonus de +2d6 en attaque et +2 aux dégâts si elle est en vol et attaque une créature au sol."
      }
    ]
  },
  {
    "name": "Harpie",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 3,
      "agi": 4,
      "end": 3,
      "int": 2,
      "wis": 2,
      "cha": 4
    },
    "hp": 15,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 8,
    "attacks": [
      {
        "name": "Serres",
        "pool": 6,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Chant captivant (L)",
        "description": "en chantant, une harpie peut fasciner une créature. Toutes les créatures humanoïdes dans un rayon de 30 mètres (sauf les harpies) doivent réussir un test de SAG palier facile ou succomber à la magie. Le chant affecte l'esprit, aussi se boucher les oreilles apporte-t-il un bonus de +2d6 au test de SAG mais n'immunise pas contre le pouvoir (se boucher les oreilles avec les mains remplace une action d'attaque à chaque tour). Une créature fascinée s'approche de la harpie et reste sans défense tant que la harpie chante et pendant encore un tour complet après la fin du chant. Une créature qui résiste au chant des harpies y est immunisée pour une durée de 1 heure."
      },
      {
        "name": "Chant choral (L)",
        "description": "lorsqu'elles sont en nombre, les harpies peuvent s'associer pour produire un chant plus puissant. Plutôt que de faire plusieurs tests de résistance, les cibles potentielles font un seul test de SAG, la difficulté du test est égale à [10 + nb de harpies/2]. Une créature fascinée s'approche de la harpie la plus proche d'elle. Les créatures restent fascinées tant qu'au moins une harpie chante, à l'exception de celle qui commence à se faire dévorer et qui bénéficie à chaque tour d'un nouveau test de SAG palier facile pour se libérer de l'emprise."
      },
      {
        "name": "Vol rapide",
        "description": "la harpie obtient une action de mouvement supplémentaire partout lorsqu'elle est en vol. Au premier tour de combat, elle obtient un bonus de +2d6 en attaque et +2 aux dégâts si elle est en vol et attaque une créature au sol."
      }
    ],
    "description": "La harpie est une créature de légende au corps de femme pourvue des ailes et des serres puissantes d'un oiseau. Elle est connue pour son chant maléfique qui laisse ses victimes sans défense et lui permet de les tourmenter et de les dévorer. Cruelle et carnassière, elle ne quitte que rarement son nid et ses sœurs.\nCela fait des siècles qu'aucun nid n'a été répertorié sur les Terres d'Arran et la race est réputée éteinte."
  },
  {
    "name": "Hydre à cinq têtes",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 25,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 6,
    "attacks": [
      {
        "name": "Morsure (cinq attaques)",
        "pool": 8,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Guérison accélérée",
        "description": "l'hydre guérit de 5 PV par tour sauf contre les DM de feu."
      },
      {
        "name": "Vision dans le noir",
        "description": "l'hydre voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ]
  },
  {
    "name": "Hydre à dix têtes",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 50,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 10,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure (dix attaques)",
        "pool": 10,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Guérison accélérée",
        "description": "l'hydre guérit de 5 PV par tour sauf contre les DM de feu."
      },
      {
        "name": "Vision dans le noir",
        "description": "l'hydre voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ]
  },
  {
    "name": "Insecte de taille colossale",
    "size": "colossale",
    "threat": 3,
    "stats": {
      "str": 5,
      "agi": 1,
      "end": 5,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 75,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 5,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 8,
        "damage": 15
      }
    ],
    "abilities": []
  },
  {
    "name": "Insecte de taille énorme",
    "size": "enorme",
    "threat": 2,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 40,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 4,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 5,
        "damage": 11
      }
    ],
    "abilities": []
  },
  {
    "name": "Insecte de taille grande",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 6,
      "agi": 4,
      "end": 6,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 20,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 8,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": []
  },
  {
    "name": "Insecte de taille moyenne",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 4,
      "end": 4,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 13,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 5,
        "damage": 4
      }
    ],
    "abilities": []
  },
  {
    "name": "Insecte de taille petite",
    "size": "petite",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 4,
      "end": 3,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 6,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": []
  },
  {
    "name": "Lion",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 4,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 15,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 9,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Dévorer",
        "description": "lorsque le lion réussit une attaque avec un critique, il saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus *renversée* et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      },
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au lion de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec succès une cible surprise, la créature inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est *renversée*. Le lion obtient un bonus de +5 à tous les tests de discrétion et en Init."
      }
    ],
    "description": "Ce profil correspond à un jeune lion ou à une lionne d'environ 150 kg."
  },
  {
    "name": "Lion, grand mâle",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 4,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 9,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Dévorer",
        "description": "lorsque le lion réussit une attaque avec un critique, il saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus *renversée* et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      },
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au lion de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec succès une cible surprise, la créature inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est *renversée*. Le lion obtient un bonus de +5 à tous les tests de discrétion et en Init."
      }
    ]
  },
  {
    "name": "Loup",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 3,
      "end": 3,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 5,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 4,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Interchangeables",
        "description": "tant que le loup et ses alliées sont plus nombreux que la cible, ils se relaient pour esquiver ses attaques et obtiennent un bonus de +2d6 en défense. Si plusieurs loups semblables sont au contact du PJ, le MJ a toute latitude pour infliger les DM d'une attaque sur le loup de son choix, le personnage ne sachant jamais lequel il blesse."
      },
      {
        "name": "Odorat",
        "description": "l'odorat supérieur des loups leur permet d'obtenir la SAG en Carac. supérieure."
      }
    ],
    "description": "Seul, le loup n'a pas usage de la capacité Interchangeables et son NC passe à ½. Ce profil correspond à un loup d'une cinquantaine de kilos."
  },
  {
    "name": "Loup arctique",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 7,
        "damage": 8
      },
      {
        "name": "Souffle glacial",
        "pool": 7,
        "damage": 14,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au loup arctique de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le loup arctique obtient un bonus de +5 à tous les tests de discrétion et en Init."
      },
      {
        "name": "Interchangeables",
        "description": "tant que le loup arctique et ses alliées sont plus nombreux que la cible, ils se relaient pour esquiver ses attaques et obtiennent un bonus de +2d6 en défense. Si plusieurs loups arctiques semblables sont au contact du PJ, le MJ a toute latitude pour infliger les DM d'une attaque sur le loup arctique de son choix, le personnage ne sachant jamais lequel il blesse."
      },
      {
        "name": "Souffle glacial (L)",
        "description": "le souffle est une attaque de zone affectant toutes les créatures dans un cône de 10 mètres de long de 5 mètres de large. L'attaque inflige automatiquement [6d6 + 6] DM. Les DM sont divisés par deux si la victime réussit un test de AGI palier moyenne. Le loup arctique doit attendre 1d4 tours après chaque utilisation avant de pouvoir utiliser à nouveau son souffle."
      }
    ],
    "description": "Le loup arctique est un formidable prédateur des étendues gelées du nord de la Borduria. Ce loup géant (environ 230 kg), capable de souffler une mort glacée sur ses proies, chasse généralement en meute et n'hésite pas à s'attaquer à des proies puissantes comme les ours polaires."
  },
  {
    "name": "Loup géant",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 15,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l’environnement permet au loup de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S’il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le loup obtient un bonus de +5 à tous les tests de discrétion et en Init."
      },
      {
        "name": "Dévorer",
        "description": "lorsque le loup réussit une attaque avec un critique, il saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus renversée et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      }
    ],
    "description": "Le loup géant est un loup mythique et rare. Il est exceptionnel de le retrouver au sein d'une meute."
  },
  {
    "name": "Loup-garou",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 3,
      "end": 4,
      "int": 2,
      "wis": 3,
      "cha": 1
    },
    "hp": 18,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes (Loup)",
        "pool": 5,
        "damage": 4
      },
      {
        "name": "Arme (Humanoïde)",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l’environnement permet au loup-garou de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S’il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le loup obtient un bonus de +5 à tous les les tests de discrétion et en Init."
      },
      {
        "name": "Empathie avec les loups",
        "description": "un loup-garou possède un don naturel pour apaiser les loups et parfois même les commander."
      },
      {
        "name": "Forme hybride (L)",
        "description": "le personnage adopte une forme qui reflète totalement sa nature duale, mi-loup mi-humanoïde. Il peut à la fois porter des attaques de morsure et utiliser une arme. En termes de jeu, cela lui accorde une attaque de chaque type (loup + humanoïde) par tour en utilisant une action limitée."
      },
      {
        "name": "Transformation en loup (L)",
        "description": "la créature peut se transformer à volonté en loup."
      },
      {
        "name": "Vision dans le noir",
        "description": "le loup-garou voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Un loup-garou peut changer de forme à volonté et possède deux formes: la forme classique de loup et une forme hybride mi-homme, mi-loup (ou de loup redressé sur ses pattes arrière), plus dangereuse. Le loup-garou décrit ici est un profil de base mais vous pouvez le rendre plus puissant en lui ajoutant des voies de profil ou, plus simplement, des niveaux de boss."
  },
  {
    "name": "Loup, mâle alpha",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 6,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au mâle alpha de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec"
      }
    ],
    "description": "Chaque meute de loup possède un mâle dominant plus gros que ses congénères, le mâle alpha (jusqu'à 80 kg). Si les personnages rencontrent un loup solitaire, il relèvera souvent de ce profil."
  },
  {
    "name": "Murth'n thun",
    "size": "grande",
    "threat": 3,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 5,
      "wis": 3,
      "cha": 2
    },
    "hp": 45,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 8,
    "initiative": 9,
    "attacks": [
      {
        "name": "Griffes et morsure",
        "pool": 8,
        "damage": 10
      },
      {
        "name": "Vampirisation",
        "pool": 8,
        "damage": 7,
        "range": 30,
        "note": "(régénération)"
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : froid."
      },
      {
        "name": "Vampirisation (L)",
        "description": "le murth’n thun doit réussir une attaque magique sur une cible vivante à une distance maximale de 30 mètres. En cas de réussite, la cible subit 4d6 DM et le murth’n thun régénère d’autant de PV que de DM infligés. De plus, à chaque fois qu’une créature meurt à moins de 20 mètres d’elle, la créature siphonné son énergie et gagne 1d6+8 PV."
      },
      {
        "name": "Vision dans le noir",
        "description": "le murth’n thun voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Les Elfes noirs sont maudits et voués à dégénérer au fil des années en créature sanguinaire, dénuée d’émotions et de raison, à l’apparence vaguement draconique : les murth’n thun. Parfois ces créatures disposent encore d’instants de lucidité et représentent alors une source de savoir inestimable, ce qui explique que les Elfes noirs les conservent en vie dans les sous-sols de Slurce."
  },
  {
    "name": "Myst",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 7,
      "agi": 4,
      "end": 7,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 65,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 10,
    "initiative": 10,
    "attacks": [
      {
        "name": "Tentacules (x 4)",
        "pool": 10,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Agripper",
        "description": "sur un critique en attaque, le Myst agrippe sa proie et ne la lâche plus. Il obtient un bonus de +2d6 en attaque et +2 aux dégâts contre la cible ainsi agrippée et celle-ci est immobilisée si elle est de taille inférieure. La victime peut essayer de se libérer au prix d'une action de mouvement en réussissant un test de FOR opposé."
      },
      {
        "name": "Télépathe",
        "description": "le Myst peut communiquer avec toute forme de vie pensante et peut déceler dans l'esprit de ses interlocuteurs la nature exacte de leurs intentions, qu'elles soient conscientes ou non."
      },
      {
        "name": "Vision dans le noir",
        "description": "le Myst voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Créature séculaire aquatique, les Myst sont les protecteurs de la cité elfique d'Elsemur et anciens gardiens du crystal bleu. Immenses, ils ressemblent à de très grandes pieuvres munies de puissants tentacules et d'une paire d'yeux. à l'intelligence ancestrale. Ils sont capables de sonder les âmes des créatures pensantes."
  },
  {
    "name": "Namjhoob",
    "size": "tres petite",
    "threat": 1,
    "stats": {
      "str": 1,
      "agi": 4,
      "end": 2,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 1,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 5,
        "damage": 1,
        "note": "Poison"
      }
    ],
    "abilities": [
      {
        "name": "Venin",
        "description": "la victime d'une morsure de serpent venimeux doit faire un test de END palier moyenne lors de chaque morsure. En cas d'échec la victime subit 1 point de DM supplémentaire par tour pendant 1d6 tours et, de plus, la victime est affaiblie pour une durée similaire exprimée en heures. Une nouvelle morsure n'augmente pas les DM à chaque tour mais cumule la durée d'effet (trois morsures venimeuses par serpent au maximum)."
      },
      {
        "name": "Crachat (L)",
        "description": "certains serpents crachent leur venin dans les yeux de leur adversaire pour l'aveugler. La victime doit réussir un test de AGI palier moyenne ou être aveuglée pour 1d6 tours."
      }
    ],
    "description": "Ce serpent de petite taille et aux couleurs vives – orange et rouge sang – est extrêmement venimeux. Sa morsure est capable de terrasser n'importe quelle créature de taille moyenne en quelques minutes seulement. Certains spécimens présentent le long de leur corps des excroissances kératiques très dures permettant une meilleure accroche sur le sol."
  },
  {
    "name": "Nécromant",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 3,
      "end": 4,
      "int": 4,
      "wis": 3,
      "cha": 2
    },
    "hp": 75,
    "armor": 1,
    "armorKind": "aucune",
    "defense": 9,
    "initiative": 11,
    "attacks": [],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+8 d'armure, sauf contre : armes traditionnelles."
      }
    ],
    "description": "Le nécromant est le résultat de la perversion d'un Mage par un démon suffisamment puissant pour prendre le contrôle d'un tel corps — en général un prince-démon. Cependant, l'effroyable puissance de la créature ne peut pleinement s'exprimer dans cette prison de chair. Les stigmates laissés par la possession sont évidents et impressionnants, c'est pourquoi la plupart des nécromants portent des voiles et des vêtements amples s'ils souhaitent les cacher. Le royaume des nécromants est un furoncle à la surface des Terres d'Arran, la triste preuve de la faiblesse de certains Mages face aux chants hypnotiques des démons."
  },
  {
    "name": "Nuée de rats",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 3,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 7,
    "attacks": [
      {
        "name": "Attaque de nuée",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Recouvrir (L)",
        "description": "la nuée peut recouvrir sa proie après avoir réussi une attaque de contact. Dès lors, la cible est distraite, déséquilibrée et victime d’innombrables morsures. La nuée lui inflige automatiquement 1d6 DM par tour et la victime est affaiblie tant que la nuée n’est pas vaincue."
      },
      {
        "name": "Cibles multiples",
        "description": "la nuée est constituée de très nombreuses cibles et les attaques conventionnelles lui infligent peu de DM. Les attaques de zone lui infligent des DM normaux mais tous les DM provoqués par des armes de contact ou à distance ne lui infligent qu’un seul point de DM par attaque réussie."
      },
      {
        "name": "Lent",
        "description": "la nuée est un adversaire redoutable mais heureusement elle ne se déplace que de 15 mètres par action de mouvement, ce qui permet à la plupart des créatures de lui échapper simplement en courant vite !"
      }
    ],
    "description": "Les rats ne sont généralement ni agressifs ni dangereux mais poussés par la faim, la peur ou un quelconque maléfice, ils peuvent attaquer en grand nombre. Vous pouvez vous servir de ce profil pour créer des nuées d’autres créatures comme, par exemple, des insectes géants. Les caractéristiques données ici ne correspondent pas à un individu mais à un groupe de plusieurs dizaines de créatures (davantage si elles sont plus petites) recouvrant une surface de deux mètres de côté et équivalant à une créature de taille moyenne."
  },
  {
    "name": "Ombre",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 13,
    "armor": 1,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Contact intangible",
        "pool": 5,
        "damage": 2,
        "note": "Affaiblissement"
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+5 d'armure, sauf contre : armes traditionnelles et magie."
      },
      {
        "name": "Vitalité surnaturelle",
        "description": "l'ombre guérit à un rythme fantastique : elle récupère 5 PV à la fin de chaque tour."
      },
      {
        "name": "Vision dans le noir",
        "description": "l'ombre voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      },
      {
        "name": "Affaiblissement",
        "description": "à chaque fois qu'une ombre inflige des DM, la victime doit réussir un test de END palier moyenne ou être affaiblie pour 1d6 minutes."
      },
      {
        "name": "Création de rejeton",
        "description": "une créature tuée par une ombre devient elle-même une ombre 1d4 tours après son décès."
      },
      {
        "name": "Créature non vivante",
        "description": "les ombres ne respirent pas et sont immunisées aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Fumeux",
        "description": "les ombres peuvent déformer leur corps à volonté pour passer dans le moindre interstice, comme sous une porte ou par le trou d'une serrure."
      },
      {
        "name": "Talon d'Achille",
        "description": "une ombre retranche 10 points (RD 10) aux DM qui lui sont infligés par des armes ordinaires. Contre un groupe de personnage équipés d'armes traditionnelles, les ombres ont seulement un rang de menace de 2."
      }
    ],
    "description": "Une ombre est un mort-vivant étrange, les restes maudits des âmes de morts très anciens qui hantent les ruines antiques. Une ombre est intangible et seulement vaguement humanoïde, rampant au sol telle une forme fuligineuse pour se dresser soudainement. Elle prend alors la forme d'une silhouette fantomatique plus ou moins translucide mue par le seul désir impie d'aspirer la vitalité de sa victime."
  },
  {
    "name": "Orhu'nomathan",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 6,
      "agi": 1,
      "end": 6,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 160,
    "armor": 11,
    "armorKind": "lourde",
    "defense": 11,
    "initiative": 7,
    "attacks": [
      {
        "name": "Poings et morsure",
        "pool": 11,
        "damage": 19
      },
      {
        "name": "Attaque magique élémentaire (Poison/Acide)",
        "pool": 11,
        "damage": 33,
        "range": 30
      }
    ],
    "abilities": [
      {
        "name": "Armure magique",
        "description": "la créature possède un pouvoir magique qui lui permet de diviser tous les DM physiques subis par deux pour le reste du combat. Ce pouvoir n’affecte pas les DM des attaques magiques élémentaires (feu, froid, acide, électricité)."
      },
      {
        "name": "Balayage",
        "description": "le fléau utilise sa grande taille pour affecter plusieurs créatures d'un seul coup de poing. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180 °). Faire un seul test d'attaque et le comparer à la défense de chaque cible."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Projection",
        "description": "sur un critique au test d’attaque, la victime est projetée à [1d6+1] mètres de là (plus ou moins selon la taille des protagonistes) et subit +5 aux dégâts supplémentaires. Elle doit réussir un test de END de palier moyenne ou être étourdie. À chaque tour elle peut tenter un nouveau test de END pour retrouver ses esprits."
      },
      {
        "name": "Vision dans le noir",
        "description": "le Fléau voit dans le noir comme en plein jour jusqu’à une distance de 30 mètres."
      }
    ],
    "description": "Littéralement « géant de ronce » en ancien dialecte sylvain, Orhu’nomathan est une créature inextricablement lié aux énergies telluriques dont l’essence est entrée en résonance avec les forêts des Terres d’Arran. On pourrait grossièrement le décrire comme une sorte de dryade géante, mais ce serait oublier trop facilement ses yeux rouges animés d’une intelligence réelle mais pervertie par une rage abyssale."
  },
  {
    "name": "Ours brun",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "l'ours parcourt une distance maximale de 30 mètres et porte une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature, doit faire un test opposé de FOR ou être renversée. Dans ce cas, l'ours piétine sa victime et les DM sont doublés."
      }
    ],
    "description": "L'ours brun mesure environ 1,50 m au garrot et jusqu'à 2,50 m lorsqu'il se dresse sur ses pattes postérieures pour un poids d'environ 300 kg. On peut aussi trouver des spécimens d'ours noir particulièrement massifs (jusqu'à 400 kg) qui correspondent à ce profil."
  },
  {
    "name": "Ours géant",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 35,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "L’ours parcourt une distance maximale de 30 mètres et porte une attaque. avec avantage (+1d6). Si l’attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature, doit faire un test opposé de FOR ou être renversée. Dans ce cas, l’ours piétine sa victime et les DM sont doublés."
      },
      {
        "name": "Enrager",
        "description": "lorsqu’il reçoit un coup critique ou si ses PV sont réduits de moitié ou plus, l’ours devient enragé. Il ignore les pénalités de douleur ou la peur, augmente de +5 son score d’attaque au contact et ses DM de +1d6. Il peut encore agir un tour complet après avoir atteint 0 PV."
      }
    ],
    "description": "Ces ours sont de véritables légendes que rêvent d’affronter les chasseurs les plus chevronnés. Énormes, puissants et démesurés, ils sont rares et vivent dans les grottes les plus isolées et reculées. On suspecte la magie des nécromants d’être à l’origine de leurs proportions monstrueuses."
  },
  {
    "name": "Ours noir",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 3,
      "end": 4,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 18,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 5,
        "damage": 4
      }
    ],
    "abilities": [],
    "description": "Ce profil correspond aux espèces d'ours de petite taille ne dépassant pas 150 kg. Plus agile et plus rapide que son cousin l'ours brun, il est tout à fait capable de grimper aux arbres."
  },
  {
    "name": "Ours polaire colossal",
    "size": "colossale",
    "threat": 5,
    "stats": {
      "str": 6,
      "agi": 1,
      "end": 6,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 130,
    "armor": 4,
    "armorKind": "cuir",
    "defense": 11,
    "initiative": 7,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 11,
        "damage": 16
      }
    ],
    "abilities": []
  },
  {
    "name": "Ours polaire géant",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 55,
    "armor": 4,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 6,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "L’ours parcourt une distance maximale de 30 mètres et porte une attaque. avec avantage (+1d6). Si l’attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature, doit faire un test opposé de FOR ou être renversée. Dans ce cas, l’ours piétine sa victime et les DM sont doublés."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d’attaque, si l’attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      }
    ],
    "description": "Capable d’atteindre plus de 15 mètres de long et 10 mètres de haut, cet ours énorme ne se retrouve qu’au-delà des frontières de la Borduria, sur la banquise."
  },
  {
    "name": "Panthère",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 4,
      "end": 3,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et Griffes",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Emboscade",
        "description": "au premier tour de combat, si l’environnement permet à la panthère de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. Si elle attaque avec succès une cible surprise, elle inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. La panthère obtient un bonus de +5 à tous les tests de discrétion."
      }
    ],
    "description": "Ce profil convient à tous les félins de taille moyenne comme le léopard, le jaguar, le jargal ou le jewghar."
  },
  {
    "name": "Pégase",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 4,
      "end": 3,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et Griffes",
        "pool": 5,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Emboscade",
        "description": "au premier tour de combat, si l’environnement permet au jargal de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S’il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le jargal obtient un bonus de +5 à tous les tests de discrétion."
      }
    ],
    "description": "Légendaire cheval ailé à la couleur immaculée, il ne reste que peu de représentants de cette race issue d'âges oubliés et préservée par les Elfes blancs. On ne les retrouve guère qu'autour et par-delà les îles Blanches."
  },
  {
    "name": "Prince-démon",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 7,
      "agi": 4,
      "end": 7,
      "int": 5,
      "wis": 5,
      "cha": 5
    },
    "hp": 85,
    "armor": 3,
    "armorKind": "cuir",
    "defense": 12,
    "initiative": 14,
    "attacks": [
      {
        "name": "Épée enflammée",
        "pool": 12,
        "damage": 14,
        "note": "feu"
      },
      {
        "name": "Liane démoniaque",
        "pool": 12,
        "damage": 7,
        "range": 10,
        "note": "de feu + enchevêtrement"
      },
      {
        "name": "Souffle (L)",
        "pool": 12,
        "damage": 33,
        "range": 20
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+8 d'armure, sauf contre : armes légendaires."
      },
      {
        "name": "Corps enflammé",
        "description": "le prince-dé­mon est nimbé d'une aura de feu noire démoniaque ou peut la faire surgir à volonté. Elle inflige +4 aux dégâts de feu par attaque de contact réussie. Une créature qui l'attaque au contact subit 2d6 DM pour chaque attaque réussie. Si une victime est saisie ou agrippée par le prince-démon, elle subit à chaque tour +4 aux dégâts de feu supplémentaires."
      },
      {
        "name": "Domination (L)",
        "description": "le prince-dé­mon doit gagner un test opposé de SAG contre sa cible pour la dominer (portée : 20 mètres) pendant [1d6 + 7 tours]. En cas de succès, le démon peut contrôler les faits et gestes de sa cible comme s'il s'agissait d'un simple pantin ou lui donner des ordres qu'elle est obligée d'exécuter. Les créatures de niveau 10 et plus sont immunisées à ce pouvoir, de même que les créatures dépourvues d'esprit comme les créatures mécaniques ou certains morts-vivants."
      },
      {
        "name": "Enchevêtrement",
        "description": "lorsqu'un prince-dé­mon réussit une attaque avec une liane démoniaque, la victime doit faire un test de FOR ou de AGI au"
      }
    ],
    "description": "De mémoire d'érudits, les princes-démons ne sont jamais manifestés sous leur forme réelle dans le plan matériel – ils n'ont pu au mieux que pervertir et investir les corps mortels (utilisez les Caracs. du nécromant pour simuler leur puissance restreinte) – si bien que toutes les connaissances qui les entourent ne sont que des mythes. Ce sont les plus puissants des démons."
  },
  {
    "name": "Raykenn de base",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 2,
      "end": 5,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 8,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Massue et morsure",
        "pool": 6,
        "damage": 3
      },
      {
        "name": "Javelot",
        "pool": 6,
        "damage": 2,
        "range": 20
      }
    ],
    "abilities": [
      {
        "name": "Natation",
        "description": "Les raykenns sont parfaitement adaptés au milieu aquatique. En cas de combat dans l'eau, ils ne souffrent d'aucune pénalité tandis que les personnages subissent un malus de -2 (marais) à -5 (sous l'eau). Voir page 114 pour les règles sur les conditions difficiles et le NR."
      }
    ],
    "description": "Les raykenns sont des créatures reptiliennes humanoïdes robustes mesurant environ deux mètres de haut, douées de langage, insolites, barbares, violentes, dangereuses, au goût prononcé pour la chair de tout être vivant. Ils vivent dans les terres de Styx, enfermés au sein de l'enceinte de Renkaar sur une île à l'ouest du Royaume d'Yrlanie."
  },
  {
    "name": "Sanglier",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 2,
      "end": 5,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 8,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 7,
    "attacks": [
      {
        "name": "Défenses",
        "pool": 6,
        "damage": 3
      }
    ],
    "abilities": [],
    "description": "Les sangliers mâles pèsent généralement autour de 150 kg, mais on peut en rencontrer de 200 à 300 kg (ajouter un niveau de boss). Les Nains se servent des spécimens les plus robustes comme monture."
  },
  {
    "name": "Sanglier sanguinaire",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 8,
    "attacks": [
      {
        "name": "Mêlée",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Le sanglier parcourt une distance maximale de 30 mètres et porte une attaque. avec avantage (+1d6). Si l'attaque est réussie, en plus des DM normaux, une victime de taille inférieure ou égale à la créature, doit faire un test opposé de FOR ou être renversée. Dans ce cas, le sanglier embroche sa victime et les DM sont doublés. Sur une charge réussie, si la victime est d'une taille inférieure au sanglier, elle est également projetée à [1d6+1] mètres de là et doit réussir un test de END de palier moyenne ou être étourdie. À chaque tour, elle peut tenter un nouveau test de END pour retrouver ses esprits."
      },
      {
        "name": "Enrager",
        "description": "lorsqu'il reçoit un coup critique ou si ses PV sont réduits de moitié ou plus, le sanglier devient enragé. Il ignore les pénalités de douleur ou la peur, augmente de +5 son score d'attaque au contact et ses DM de +1d6. Il peut encore agir un tour complet après avoir atteint 0 PV."
      }
    ],
    "description": "Il s'agit d'une imposante créature pourvue d'une crête osseuse et de défenses énormes. On rencontre des meutes dans l'Ourann ou plus au sud, à la limite de la Terre des Ogres."
  },
  {
    "name": "Serpent constricteur",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 8,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 6,
    "attacks": [
      {
        "name": "Morsure et constriction",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au serpent de se dissimuler, la cible doit faire un test de SAG palier moyenne ou être surprise. S'il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le serpent obtient un bonus de +5 à tous les tests de discrétion."
      }
    ],
    "description": "Ce profil correspond au boa ou au python, toutefois cette famille de serpents comprend de grandes disparités de tailles et de poids, les serpents pouvant faire deux mètres pour une quinzaine de kilos à plus de 6 mètres pour 150 kg et au-delà. Les caractéristiques présentées ici correspondent à un spécimen d'environ 4 m pour 80 kg."
  },
  {
    "name": "Serpent géant",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 6,
      "agi": 2,
      "end": 6,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 35,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 6,
    "attacks": [
      {
        "name": "Morsure et constriction",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Étreinte",
        "description": "à chaque fois que le serpent réussit une attaque il peut faire un test de FOR opposé contre sa victime (toutefois celle-ci peut choisir de résister par un test de AGI). En cas de succès, il s'enroule autour d'elle et commence à l'étouffer, infligeant automatiquement 1d6 DM supplémentaires par tour. La victime est immobilisée. Elle peut tenter de se libérer au prix d'une action de mouvement à chaque tour, en réussissant un test de FOR palier difficile."
      },
      {
        "name": "Gober",
        "description": "lorsqu'il réussit une étreinte, le serpent peut avaler entièrement une cible d'au moins une taille inférieure la sienne. La victime doit faire un test de FOR opposé; en cas d'échec elle passe directement dans l'estomac du monstre. Un personnage avalé subit 3d6 DM d'asphyxie et d'acide chaque tour. Il peut attaquer avec une arme pas plus grande qu'une dague en réussissant un test de FOR palier moyenne à chaque tour. L'attaque se fait avec une pénalité de -2d6 en attaque et les DM sont divisés par deux."
      },
      {
        "name": "Note",
        "description": "si vous souhaitez créer un serpent géant venimeux, utilisez les règles de poison développées pour les insectes géants (+1 rang de menace)."
      }
    ],
    "description": "La légende de ce serpent est entretenue par les récits orques, et chaque chasseur craint de – ou espère – croiser sa route un jour. Nul ne peut dire s'il existe vraiment, mais on raconte qu'il mesure plusieurs mètres de long et dispose d'une gueule suffisamment large pour gober en un instant n'importe quel humanoïde."
  },
  {
    "name": "Shargren",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 10,
      "agi": 2,
      "end": 10,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 25,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 12,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 12,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "DÉVORER",
        "description": "lorsque le shargren réussit une attaque avec un critique, il saisit sa proie entre ses crocs et lui inflige immédiatement une attaque gratuite supplémentaire dont les DM sont majorés de +1d6. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour amorcer une fuite ou se remettre en position de combat si elle a réussi)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le shargren voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Le shargren est un mammifère aquatique vorace et dangereux évoluant en banc dans les océans. Son corps est puissant, long de 4 à 6 mètres tandis que sa bouche est bardée de dents acérées. De part et d'autre de son crâne émergent de multiples yeux de tailles variables, lui conférant une acuité visuelle sans égale dans les eaux."
  },
  {
    "name": "Squelette de base",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 3,
      "agi": 3,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 5,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 5,
    "attacks": [
      {
        "name": "Attaque",
        "pool": 4,
        "damage": 3,
        "note": "ou selon arme"
      }
    ],
    "abilities": [
      {
        "name": "Résistance",
        "description": "+3 d'armure, sauf contre : armes contondantes."
      },
      {
        "name": "Créature non vivante",
        "description": "les squelettes ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Sans esprit",
        "description": "aucune âme n'habite la carcasse morte et le squelette est immunisé à tous les sorts qui affectent l'esprit (INT, SAG et CHA)."
      },
      {
        "name": "Réduction des DM",
        "description": "tous les DM infligés à un squelette sont réduits de 5 points à moins que l'attaquant n'utilise une arme contondante. Une arme contondante est une arme qui utilise la force de l'impact pour blesser comme une masse ou un marteau, à l'inverse d'une épée (tranchante) ou d'une flèche (perforante)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le squelette voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Le squelette est une créature aberrante, animée à l'aide des sortilèges les plus honnis de la nécromancie. Ce non-vivant est une créature sans cervelle, immunisée à toute forme d'attaque mentale, incapable de parler et de communiquer. Il ne reçoit ses ordres que de son créateur et attaque toute créature vivante à vue, comme pour se venger de la condition de misère dans laquelle il est maintenu."
  },
  {
    "name": "Squelette de géant",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 8,
      "agi": 3,
      "end": 8,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 30,
    "armor": 8,
    "armorKind": "carapace",
    "defense": 10,
    "initiative": 6,
    "attacks": [
      {
        "name": "Massue à deux mains",
        "pool": 10,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Créature non vivante",
        "description": "les squelettes ne respirent pas et sont immunisés aux maladies, aux poisons, à toutes les attaques qui demandent un test de END et sont infatigables."
      },
      {
        "name": "Sans esprit",
        "description": "aucune âme n'habite la carcasse morte et le squelette est immunisé à tous les sorts qui affectent l'esprit (INT, SAG et CHA)."
      },
      {
        "name": "Réduction des DM",
        "description": "tous les DM infligés à un squelette sont réduits de 5 points à moins que l'attaquant n'utilise une arme contondante. Une arme contondante est une arme qui utilise la force de l'impact pour blesser comme une masse ou un marteau à l'inverse d'une épée (tranchante) ou d'une flèche (perforante)."
      },
      {
        "name": "Vision dans le noir",
        "description": "le squelette voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Un squelette d'Ogre ou de troll de presque trois mètres de haut..."
  },
  {
    "name": "Tigre à dents de sabre",
    "size": "grande",
    "threat": 3,
    "stats": {
      "str": 10,
      "agi": 6,
      "end": 10,
      "int": 1,
      "wis": 3,
      "cha": 1
    },
    "hp": 45,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 13,
    "initiative": 12,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 13,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Dévorer",
        "description": "lorsque le tigre réussit une attaque avec un critique, il saisit sa proie entre ses crocs ou ses griffes et lui inflige immédiatement une attaque gratuite supplémentaire. Si la FOR de la cible est inférieure ou égale au prédateur, elle est de plus renversée et immobilisée. Pour se libérer, la victime doit réussir un test de FOR opposé lors de son tour et cela lui demande une action de mouvement (et une autre pour se relever si elle a réussi)."
      },
      {
        "name": "Embuscade",
        "description": "au premier tour de combat, si l'environnement permet au tigre de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le tigre obtient un bonus de +5 à tous les tests de discrétion et en Init."
      }
    ],
    "description": "Le tigre à dents de sabre est un énorme félin aux canines acérées qui vivait jadis dans les steppes reculées de la Borduria. L'expansion humaine et la malédiction des goules sont responsables de l'extinction de la race aujourd'hui. Il persiste cependant quelques meutes disséminées un peu partout dans l'Ourann."
  },
  {
    "name": "Troll",
    "size": "grande",
    "threat": 2,
    "stats": {
      "str": 8,
      "agi": 3,
      "end": 8,
      "int": 1,
      "wis": 2,
      "cha": 1
    },
    "hp": 30,
    "armor": 3,
    "armorKind": "cuir",
    "defense": 10,
    "initiative": 7,
    "attacks": [
      {
        "name": "Griffes",
        "pool": 10,
        "damage": 7
      },
      {
        "name": "Lancer de rocher",
        "pool": 10,
        "damage": 7,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Vitalité surnaturelle",
        "description": "un troll récupère 5 PV par tour, sauf si les DM subis sont de feu ou d'acide. Même à 0 PV, il continue à régénérer les tissus morts à moins qu'on ne brûle son corps."
      }
    ],
    "description": "Les trolls sont de grands humanoïdes de 2,70 m à la peau caoutchouteuse verdâtre ou violacée, couverte d'excroissances et de plaques suppurantes. Non seulement les armes rebondissent sur cette épaisse peau élastique mais, de plus, les blessures infligées cicatrisent de façon accélérée grâce à un métabolisme exceptionnel. Aussi, le troll est un monstre dénué de peur, confiant en sa capacité à échapper à la mort et qui se montre particulièrement féroce au combat."
  },
  {
    "name": "Troll des glaces",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 45,
    "armor": 4,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Griffes",
        "pool": 6,
        "damage": 11
      },
      {
        "name": "Lancer de rochers",
        "pool": 6,
        "damage": 11,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Faucharge",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Fauchage",
        "description": "sur un critique au test d'attaque, si l'attaque est réussie, la victime doit réussir au choix un test de FOR ou de AGI palier exploit ou être renversée."
      },
      {
        "name": "Vision dans le noir",
        "description": "le troll des glaces voit dans le noir comme en plein jour jusqu'à une distance de 30 mètres."
      }
    ],
    "description": "Ce troll des glaces est le plus grand et le plus terrifiant des trolls. Sa taille et ses attributs exceptionnels en font une créature à éviter à tout prix. Avant que la Borduria ne soit touchée par la malédiction des goules, le troll des glaces représentait le plus grand danger de ces contrées hostiles."
  },
  {
    "name": "Troll des glaces supérieur",
    "size": "enorme",
    "threat": 3,
    "stats": {
      "str": 3,
      "agi": 1,
      "end": 3,
      "int": 1,
      "wis": 1,
      "cha": 1
    },
    "hp": 55,
    "armor": 5,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 5,
    "attacks": [
      {
        "name": "Griffes",
        "pool": 6,
        "damage": 12
      },
      {
        "name": "Lancer de rochers",
        "pool": 6,
        "damage": 12,
        "range": 10
      }
    ],
    "abilities": [
      {
        "name": "Balayage",
        "description": "le troll utilise sa grande taille pour affecter plusieurs créatures d'un seul coup de griffes. Si plusieurs cibles sont présentes face à lui, son attaque affecte deux créatures (dans un arc de 180 °). Faire un seul test d'attaque et le comparer à la défense de chaque cible."
      }
    ]
  },
  {
    "name": "Wampür",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 15,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 9,
    "attacks": [
      {
        "name": "Morsure",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Poison anesthésiant",
        "description": "la morsure du wampür inocule un poison. La victime doit réussir un test de END palier moyenne ou être affaiblie pendant 1d6 tours. Si elle affectée une seconde fois par le poison alors qu'elle est déjà sous son effet, elle sombre à la place dans l'inconscience pour 1d6 tours."
      }
    ],
    "description": "Cette chauve-souris géante, au corps plus grand que celui d'un humain, possède une envergure de plus de cinq mètres une fois ses ailes déployées. Sa morsure possède des vertus anesthésiantes, ce qui en fait un adversaire redoutable. Elle est réputée sucer le sang de ses victimes sans les éveiller, les laissant mortes au petit matin."
  },
  {
    "name": "Worg",
    "size": "grande",
    "threat": 1,
    "stats": {
      "str": 5,
      "agi": 3,
      "end": 5,
      "int": 1,
      "wis": 4,
      "cha": 1
    },
    "hp": 18,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 8,
    "attacks": [
      {
        "name": "Morsure et griffes",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Embuscade",
        "description": "Au premier tour de combat, si l'environnement permet au worg de se dissimuler, la cible doit faire un test de SAG palier difficile ou être surprise. S'il attaque avec succès une cible surprise, il inflige +2 aux dégâts et toute créature dont la FOR est inférieure à la sienne est renversée. Le worg obtient un bonus de +5 à tous les tests de discrétion et en Init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "Si le worg attaque en même temps qu'un allié (il peut volontairement retarder son initiative), de dos ou par surprise, il réalise une attaque sournoise avec un bonus de +2d6 en attaque et +4 aux dégâts."
      },
      {
        "name": "Interchangeables",
        "description": "Tant que le worg et ses alliées sont plus nombreux que la cible, ils se relaient pour esquiver ses attaques et obtiennent un bonus de +2d6 en défense. Si plusieurs worg semblables sont au contact du PJ, le MJ a toute latitude pour infliger les DM d'une attaque sur le worg de son choix, le personnage ne sachant jamais lequel il blesse."
      },
      {
        "name": "L'hallali",
        "description": "Les worgs profitent d'une erreur de leur adversaire pour lui porter des attaques fatales. À chaque fois que la victime de la meute rate une attaque ou obtient sur un test d'attaque un résultat au d20 allant de 1 à 5 (inclus), elle déclenche la curée ! Chaque worg doté de cette capacité bénéficie immédiatement et gratuitement d'une attaque en traître contre la victime (+5 au jet d'attaque/+4 aux dégâts).",
        "review": true
      }
    ],
    "description": "Les worgs sont des cousins des loups, plus puissants (jusqu'à 150 kg) et plus dangereux. Ils ont été domestiqués par certaines tribus orques pour participer aux chasses."
  },
  {
    "name": "Combattant NC0.5",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 5,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [],
    "description": "Guerrier humanoïde de bas rang."
  },
  {
    "name": "Combattant NC1",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 8,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 4
      }
    ],
    "abilities": [],
    "description": "Guerrier humanoïde aguerri."
  },
  {
    "name": "Combattant NC2",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 18,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": [],
    "description": "Guerrier humanoïde confirmé."
  },
  {
    "name": "Combattant Brute NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 18,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      }
    ],
    "description": "Guerrier brut spécialisé dans les charges dévastatrices."
  },
  {
    "name": "Combattant Champion NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 18,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche automatiquement, +2 aux dégâts."
      }
    ],
    "description": "Guerrier technique capable de parer et de contre-attaquer."
  },
  {
    "name": "Combattant Conquérant NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 18,
    "armor": 2,
    "armorKind": "carapace",
    "defense": 5,
    "initiative": 5,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 5,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Une fois par combat ignore un coup mortel."
      }
    ],
    "description": "Guerrier meneur d'hommes qui inspire ses alliés au combat."
  },
  {
    "name": "Combattant Brute NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts. Agit 1 tour après 0 PV."
      }
    ],
    "description": "Guerrier brut de haut rang, redoutable dans les charges."
  },
  {
    "name": "Combattant Champion NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur (sauf cible choisie)."
      }
    ],
    "description": "Guerrier technique avec riposte automatique."
  },
  {
    "name": "Combattant Conquérant NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire avec action limitée."
      }
    ],
    "description": "Chef de guerre inspirant."
  },
  {
    "name": "Combattant Brute NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts. Agit 1 tour après 0 PV."
      },
      {
        "name": "Percuter",
        "description": "Après une Charge réussie, END 15 ou étourdi."
      }
    ],
    "description": "Brute imparable et enragée."
  },
  {
    "name": "Combattant Champion NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      }
    ],
    "description": "Champion endurci qui regagne de la puissance sous la pression."
  },
  {
    "name": "Combattant Conquérant NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 28,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      }
    ],
    "description": "Commandant de terrain avec bonus de commandement croissants."
  },
  {
    "name": "Combattant Brute NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      }
    ],
    "description": "Brute implacable."
  },
  {
    "name": "Combattant Champion NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      }
    ],
    "description": "Champion de haut rang, virtuose du combat."
  },
  {
    "name": "Combattant Conquérant NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 6,
    "initiative": 6,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 6,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 15."
      }
    ],
    "description": "Conquérant redoutable avec instinct de survie."
  },
  {
    "name": "Combattant Brute NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      }
    ],
    "description": "Brute expérimentée qui fauche ses ennemis."
  },
  {
    "name": "Combattant Champion NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      }
    ],
    "description": "Champion capable de charger et contre-attaquer."
  },
  {
    "name": "Combattant Conquérant NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 38,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 18."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      }
    ],
    "description": "Conquérant qui sacrifie ses subordonnés pour se protéger."
  },
  {
    "name": "Combattant Brute NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      }
    ],
    "description": "Brute puissante avec portée de frappe étendue."
  },
  {
    "name": "Combattant Champion NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      }
    ],
    "description": "Champion maîtrisant charge et enragement."
  },
  {
    "name": "Combattant Conquérant NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 20."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      }
    ],
    "description": "Conquérant capable de piéger les ennemis."
  },
  {
    "name": "Combattant Brute NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute balayant ses adversaires dans un arc dévastateur."
  },
  {
    "name": "Combattant Champion NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion percutant, maître du contrôle de foule."
  },
  {
    "name": "Combattant Conquérant NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 48,
    "armor": 3,
    "armorKind": "carapace",
    "defense": 7,
    "initiative": 7,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 7,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 23."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant maîtrisant l'attaque mortelle dissimulée."
  },
  {
    "name": "Combattant Brute NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 6,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute de haut rang avec RD 3."
  },
  {
    "name": "Combattant Champion NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion légendaire."
  },
  {
    "name": "Combattant Conquérant NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 25."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant suprême, commandant de légion."
  },
  {
    "name": "Combattant Brute NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 6,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute quasi-invincible avec RD 3."
  },
  {
    "name": "Combattant Champion NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion de légende avec riposte totale."
  },
  {
    "name": "Combattant Conquérant NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 58,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant légendaire."
  },
  {
    "name": "Combattant Brute NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 6,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute de haut rang avec RD 3."
  },
  {
    "name": "Combattant Champion NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion au sommet."
  },
  {
    "name": "Combattant Conquérant NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 8,
    "initiative": 8,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 8,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant au sommet de l'art militaire."
  },
  {
    "name": "Combattant Brute NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 7,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute épique avec RD 6."
  },
  {
    "name": "Combattant Champion NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion épique."
  },
  {
    "name": "Combattant Conquérant NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 68,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant épique."
  },
  {
    "name": "Combattant Brute NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 73,
    "armor": 7,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute légendaire avec RD 6."
  },
  {
    "name": "Combattant Champion NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 73,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion légendaire."
  },
  {
    "name": "Combattant Conquérant NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 73,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant légendaire."
  },
  {
    "name": "Combattant Brute NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 83,
    "armor": 7,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Fauchage",
        "description": "Sur un critique, cible renversée si rate AGI [10+BU]."
      },
      {
        "name": "Balayage",
        "description": "Attaque jusqu'à 3 cibles dans un arc de 180°."
      }
    ],
    "description": "Brute suprême avec RD 6."
  },
  {
    "name": "Combattant Champion NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 83,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Charge (L)",
        "description": "Attaque avec avantage (+1d6). Succès = FOR opposé ou renversé, DM×2."
      },
      {
        "name": "Enrager",
        "description": "Sur critique ou ≤50% PV : +5 attaque, +2 aux dégâts."
      },
      {
        "name": "Percuter",
        "description": "Après Charge, END 15 ou étourdi."
      }
    ],
    "description": "Champion suprême."
  },
  {
    "name": "Combattant Conquérant NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 4,
      "agi": 2,
      "end": 4,
      "int": 2,
      "wis": 2,
      "cha": 2
    },
    "hp": 83,
    "armor": 4,
    "armorKind": "carapace",
    "defense": 9,
    "initiative": 9,
    "attacks": [
      {
        "name": "Épée longue",
        "pool": 9,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Sergent",
        "description": "+1 action à un allié en vue par tour. Ignore un coup mortel une fois par combat."
      },
      {
        "name": "Capitaine",
        "description": "Alliés en vue : +2 init/attaque/DM. Attaque supplémentaire."
      },
      {
        "name": "Commandant",
        "description": "Bonus à +3. Si ≥4 alliés à 10 m, prend moitié des DM."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Chair à canon",
        "description": "Redirige attaques sur un subordonné dans 3 m. +2d6 en défense avec subordonnés proches."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 en discrétion."
      }
    ],
    "description": "Conquérant suprême, seigneur de guerre légendaire."
  },
  {
    "name": "Aventurier NC0.5",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 2,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [],
    "description": "Aventurier humanoïde de bas rang, agile et rapide."
  },
  {
    "name": "Aventurier NC1",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 3,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 2
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 3."
      }
    ],
    "description": "Aventurier aguerri avec instinct de survie."
  },
  {
    "name": "Aventurier NC2",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 13,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 5."
      }
    ],
    "description": "Aventurier confirmé avec instinct de survie."
  },
  {
    "name": "Aventurier Assassin NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 13,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 8."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      }
    ],
    "description": "Assassin spécialisé dans les attaques mortelles."
  },
  {
    "name": "Aventurier Maître d'armes NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 13,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 8."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      }
    ],
    "description": "Duelliste capable de déjouer et contre-attaquer."
  },
  {
    "name": "Aventurier Tireur NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 13,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 5,
        "damage": 3
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 8."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      }
    ],
    "description": "Tireur d'élite adepte des embuscades."
  },
  {
    "name": "Aventurier Assassin NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 10."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Devient invisible, déplacement 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Assassin redoutable qui disparaît après ses coups."
  },
  {
    "name": "Aventurier Maître d'armes NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 10."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      }
    ],
    "description": "Maître d'armes qui riposte automatiquement."
  },
  {
    "name": "Aventurier Tireur NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 10."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      }
    ],
    "description": "Tireur mobile et difficile à cibler."
  },
  {
    "name": "Aventurier Assassin NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 13."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur cible surprise : END 15 ou 0 PV."
      }
    ],
    "description": "Assassin capable d'exécuter ses cibles."
  },
  {
    "name": "Aventurier Maître d'armes NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 13."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      }
    ],
    "description": "Maître d'armes qui reprend de la vigueur sous pression."
  },
  {
    "name": "Aventurier Tireur NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 23,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 4
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 13."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      }
    ],
    "description": "Tireur d'élite avec double tir."
  },
  {
    "name": "Aventurier Assassin NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 15."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique. Redistribution des DM possible."
      }
    ],
    "description": "Assassin interchangeable, imprévisible en groupe."
  },
  {
    "name": "Aventurier Maître d'armes NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 15."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique. Redistribution des DM possible."
      }
    ],
    "description": "Maître d'armes interchangeable en groupe."
  },
  {
    "name": "Aventurier Tireur NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 1,
    "armorKind": "cuir",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 6,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 15."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      }
    ],
    "description": "Tireur d'élite avec disparition tactique."
  },
  {
    "name": "Aventurier Assassin NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 18."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin de haut rang."
  },
  {
    "name": "Aventurier Maître d'armes NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 18."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes expert."
  },
  {
    "name": "Aventurier Tireur NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 33,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 18."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur d'élite avec disparition et double tir."
  },
  {
    "name": "Aventurier Assassin NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 20."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin de haut rang."
  },
  {
    "name": "Aventurier Maître d'armes NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 20."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes de haut rang."
  },
  {
    "name": "Aventurier Tireur NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 20."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur de haut rang avec arsenal complet."
  },
  {
    "name": "Aventurier Assassin NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 23."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin de haut rang avec embuscade permanente."
  },
  {
    "name": "Aventurier Maître d'armes NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 23."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes avec embuscade."
  },
  {
    "name": "Aventurier Tireur NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 43,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 7,
        "damage": 6
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 23."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur de haut rang."
  },
  {
    "name": "Aventurier Assassin NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 25."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin de haut rang."
  },
  {
    "name": "Aventurier Maître d'armes NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 25."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes légendaire."
  },
  {
    "name": "Aventurier Tireur NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 25."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur d'élite légendaire."
  },
  {
    "name": "Aventurier Assassin NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin de haute maîtrise."
  },
  {
    "name": "Aventurier Maître d'armes NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes légendaire."
  },
  {
    "name": "Aventurier Tireur NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 48,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 8
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur avec arsenal complet."
  },
  {
    "name": "Aventurier Assassin NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin redoutable."
  },
  {
    "name": "Aventurier Maître d'armes NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes légendaire."
  },
  {
    "name": "Aventurier Tireur NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 8,
    "initiative": 11,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 8,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur de haut rang."
  },
  {
    "name": "Aventurier Assassin NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts quand il cible le même ennemi qu'un allié."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin épique avec attaque en traître."
  },
  {
    "name": "Aventurier Maître d'armes NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts quand il cible le même ennemi qu'un allié."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes épique avec attaque en traître."
  },
  {
    "name": "Aventurier Tireur NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 58,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts quand il cible le même ennemi qu'un allié."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur épique avec attaque en traître."
  },
  {
    "name": "Aventurier Assassin NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin légendaire."
  },
  {
    "name": "Aventurier Maître d'armes NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes légendaire."
  },
  {
    "name": "Aventurier Tireur NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur légendaire."
  },
  {
    "name": "Aventurier Assassin NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "L'hallali",
        "description": "Attaque en traître gratuite quand l'ennemi obtient 1-5 sur son dé d'attaque."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      },
      {
        "name": "Assassinat",
        "description": "Attaque mortelle sur surpris : END 15 ou 0 PV."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Assassin suprême."
  },
  {
    "name": "Aventurier Maître d'armes NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "L'hallali",
        "description": "Attaque en traître gratuite quand l'ennemi obtient 1-5 sur son dé d'attaque."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Riposte",
        "description": "Attaque gratuite contre chaque agresseur."
      },
      {
        "name": "Hausser le ton",
        "description": "À ≤50% PV : +5 attaque, +2 aux dégâts, RD 5."
      },
      {
        "name": "Interchangeables",
        "description": "+2d6 en défense en supériorité numérique."
      }
    ],
    "description": "Maître d'armes suprême."
  },
  {
    "name": "Aventurier Tireur NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 4,
      "end": 2,
      "int": 2,
      "wis": 3,
      "cha": 3
    },
    "hp": 63,
    "armor": 2,
    "armorKind": "cuir",
    "defense": 9,
    "initiative": 12,
    "attacks": [
      {
        "name": "Rapière ou arc court",
        "pool": 9,
        "damage": 10
      }
    ],
    "abilities": [
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Embuscade",
        "description": "Premier tour : SAG 19 ou surpris. +2 aux dégâts vs surpris. +5 discrétion/init."
      },
      {
        "name": "Attaque en traître (L)",
        "description": "+5 attaque, +4 aux dégâts sur même cible qu'un allié."
      },
      {
        "name": "L'hallali",
        "description": "Attaque en traître gratuite quand l'ennemi obtient 1-5 sur son dé d'attaque."
      },
      {
        "name": "Attaque mortelle (L)",
        "description": "Depuis derrière ou surprise : +5 attaque, +5 aux dégâts. +5 discrétion."
      },
      {
        "name": "Imparable (L)",
        "description": "Attaque avec avantage (+1d6). Sur un critique touche auto, +2 aux dégâts."
      },
      {
        "name": "Tireur d'élite (L)",
        "description": "2 attaques à distance par action. Ignore couverture. Option d12 : +4 aux dégâts."
      },
      {
        "name": "Disparition (L)",
        "description": "Invisible, 20 m. Tour suivant : Attaque mortelle si AGI > SAG."
      }
    ],
    "description": "Tireur suprême avec l'hallali."
  },
  {
    "name": "Mystique NC0.5",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 2,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Dague",
        "pool": 3,
        "damage": 1
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 1
      }
    ],
    "abilities": [],
    "description": "Mystique humanoïde de bas rang, magie rudimentaire."
  },
  {
    "name": "Mystique NC1",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 2,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Dague",
        "pool": 3,
        "damage": 1
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 2
      }
    ],
    "abilities": [],
    "description": "Mystique initié, projection magique basique."
  },
  {
    "name": "Mystique NC2",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 3,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 4
      }
    ],
    "abilities": [],
    "description": "Mystique confirmé, bâton et magie de zone."
  },
  {
    "name": "Mystique Arcaniste NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 3,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m diamètre. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      }
    ],
    "description": "Arcaniste maîtrisant les attaques magiques de zone."
  },
  {
    "name": "Mystique Guérisseur NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 3,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max d'une cible. Une fois par jour."
      }
    ],
    "description": "Guérisseur capable de soigner massivement ses alliés."
  },
  {
    "name": "Mystique Nécromancien NC3",
    "size": "moyenne",
    "threat": 1,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 3,
    "initiative": 6,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 3,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 3,
        "damage": 5
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "AM jusqu'à 30 m. 3 DM, soigne autant. 3 PV à chaque mort dans 20 m."
      }
    ],
    "description": "Nécromancien qui draine la vie de ses victimes."
  },
  {
    "name": "Mystique Arcaniste NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques pour le reste du combat."
      }
    ],
    "description": "Arcaniste avec armure magique."
  },
  {
    "name": "Mystique Guérisseur NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      }
    ],
    "description": "Guérisseur avec armure magique."
  },
  {
    "name": "Mystique Nécromancien NC4",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 10,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 2
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 7
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "4 DM, soigne autant. 4 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      }
    ],
    "description": "Nécromancien vampirique avec armure magique."
  },
  {
    "name": "Mystique Arcaniste NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      }
    ],
    "description": "Arcaniste de rang moyen."
  },
  {
    "name": "Mystique Guérisseur NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs (poison, paralysie, maladie)."
      }
    ],
    "description": "Guérisseur capable de purifier et soigner."
  },
  {
    "name": "Mystique Nécromancien NC5",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 9
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "4 DM, soigne autant. 4 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort avec ses stats -2 attaque/-2 init. Impossible si rang de menace mort > rang de menace nécromancien."
      }
    ],
    "description": "Nécromancien capable d'animer les morts."
  },
  {
    "name": "Mystique Arcaniste NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle la cible 1d4 tours. SAG [15+BU] pour se libérer."
      }
    ],
    "description": "Arcaniste contrôlant les esprits adverses."
  },
  {
    "name": "Mystique Guérisseur NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique 10 m portée, 4 m diamètre. END [12+BU] ou 5 DM + affaibli 1d4 tours."
      }
    ],
    "description": "Guérisseur avec gaz alchimique offensif."
  },
  {
    "name": "Mystique Nécromancien NC6",
    "size": "moyenne",
    "threat": 2,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 17,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 4,
    "initiative": 7,
    "attacks": [
      {
        "name": "Bâton",
        "pool": 4,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 4,
        "damage": 11
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "5 DM, soigne autant. 5 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort avec ses stats -2 attaque/-2 init."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "Cible dans 30 m : END 15 ou PV=0. En cas de réussite 7 DM. Une fois par cible par combat."
      }
    ],
    "description": "Nécromancien avec injonction mortelle dévastatrice."
  },
  {
    "name": "Mystique Arcaniste NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours. SAG [15+BU] pour se libérer."
      }
    ],
    "description": "Arcaniste puissant avec bâton runique."
  },
  {
    "name": "Mystique Guérisseur NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      }
    ],
    "description": "Guérisseur de haut rang."
  },
  {
    "name": "Mystique Nécromancien NC7",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 12
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "6 DM, soigne autant. 5 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort avec ses stats -2 attaque/-2 init."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 7 DM."
      }
    ],
    "description": "Nécromancien de haut rang."
  },
  {
    "name": "Mystique Arcaniste NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 14
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours. SAG [15+BU] pour se libérer."
      }
    ],
    "description": "Arcaniste de haut rang."
  },
  {
    "name": "Mystique Guérisseur NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 14
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      }
    ],
    "description": "Guérisseur de haut rang."
  },
  {
    "name": "Mystique Nécromancien NC8",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 14
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "7 DM, soigne autant. 6 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort avec ses stats -2 attaque/-2 init."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 8 DM."
      }
    ],
    "description": "Nécromancien implacable."
  },
  {
    "name": "Mystique Arcaniste NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 16
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m vers un emplacement en ligne de vue ou connu."
      }
    ],
    "description": "Arcaniste avec téléportation magique."
  },
  {
    "name": "Mystique Guérisseur NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 16
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      }
    ],
    "description": "Guérisseur avec téléportation."
  },
  {
    "name": "Mystique Nécromancien NC9",
    "size": "moyenne",
    "threat": 3,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 25,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 5,
    "initiative": 8,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 5,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 5,
        "damage": 16
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "8 DM, soigne autant. 6 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 8 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      }
    ],
    "description": "Nécromancien se téléportant parmi les morts."
  },
  {
    "name": "Mystique Arcaniste NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 18
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      }
    ],
    "description": "Arcaniste légendaire."
  },
  {
    "name": "Mystique Guérisseur NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 18
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      }
    ],
    "description": "Guérisseur légendaire."
  },
  {
    "name": "Mystique Nécromancien NC10",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 3
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 18
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "9 DM, soigne autant. 7 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 9 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      }
    ],
    "description": "Nécromancien légendaire."
  },
  {
    "name": "Mystique Arcaniste NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 19
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      }
    ],
    "description": "Arcaniste épique avec instinct de survie."
  },
  {
    "name": "Mystique Guérisseur NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 19
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      }
    ],
    "description": "Guérisseur épique."
  },
  {
    "name": "Mystique Nécromancien NC11",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 32,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 19
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "10 DM, soigne autant. 7 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 9 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 28."
      }
    ],
    "description": "Nécromancien épique."
  },
  {
    "name": "Mystique Arcaniste NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 21
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      }
    ],
    "description": "Arcaniste de haut rang."
  },
  {
    "name": "Mystique Guérisseur NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 21
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      }
    ],
    "description": "Guérisseur de haut rang."
  },
  {
    "name": "Mystique Nécromancien NC12",
    "size": "moyenne",
    "threat": 4,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 6,
    "initiative": 9,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 6,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 6,
        "damage": 21
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "11 DM, soigne autant. 8 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 10 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 30."
      }
    ],
    "description": "Nécromancien de haut rang."
  },
  {
    "name": "Mystique Arcaniste NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 22
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Arcaniste épique résistant à la magie."
  },
  {
    "name": "Mystique Guérisseur NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 22
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Guérisseur épique résistant à la magie."
  },
  {
    "name": "Mystique Nécromancien NC13",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 40,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 4
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 22
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "11 DM, soigne autant. 8 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 10 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 33."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Nécromancien épique résistant à la magie."
  },
  {
    "name": "Mystique Arcaniste NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 24
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Arcaniste légendaire."
  },
  {
    "name": "Mystique Guérisseur NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 24
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Guérisseur légendaire."
  },
  {
    "name": "Mystique Nécromancien NC14",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 24
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "12 DM, soigne autant. 9 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 11 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 35."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      }
    ],
    "description": "Nécromancien légendaire quasi-indestructible."
  },
  {
    "name": "Mystique Arcaniste NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 25
      }
    ],
    "abilities": [
      {
        "name": "Maîtrise élémentaire",
        "description": "AM touche zone 10 m. AGI [10+BU] ou DM entiers. RD élémentaire = BU."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Contrôle mental (L)",
        "description": "Attaque magique opposée. Contrôle 1d4 tours."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      },
      {
        "name": "Régénération magique",
        "description": "Régénère 5 PV par tour. Seuls le feu et l'acide peuvent détruire définitivement l'arcaniste."
      }
    ],
    "description": "Arcaniste suprême avec régénération magique."
  },
  {
    "name": "Mystique Guérisseur NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 25
      }
    ],
    "abilities": [
      {
        "name": "Soigner (L)",
        "description": "Restaure 50% des PV max. Une fois par jour."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Guérir (L)",
        "description": "Supprime tous les états négatifs."
      },
      {
        "name": "Gaz alchimique (L)",
        "description": "Nuage toxique ; END [12+BU] ou 5 DM + affaibli."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      },
      {
        "name": "Régénération magique",
        "description": "Régénère 5 PV par tour. Seuls le feu et l'acide peuvent détruire définitivement le guérisseur."
      }
    ],
    "description": "Guérisseur suprême avec régénération."
  },
  {
    "name": "Mystique Nécromancien NC15",
    "size": "moyenne",
    "threat": 5,
    "stats": {
      "str": 2,
      "agi": 2,
      "end": 2,
      "int": 4,
      "wis": 3,
      "cha": 3
    },
    "hp": 47,
    "armor": 0,
    "armorKind": "aucune",
    "defense": 7,
    "initiative": 10,
    "attacks": [
      {
        "name": "Bâton runique",
        "pool": 7,
        "damage": 5
      },
      {
        "name": "Attaque magique (L)",
        "pool": 7,
        "damage": 25
      }
    ],
    "abilities": [
      {
        "name": "Vampirisation (L)",
        "description": "13 DM, soigne autant. 9 PV à chaque mort dans 20 m."
      },
      {
        "name": "Armure magique (L)",
        "description": "Réduit de moitié tous les DM non magiques."
      },
      {
        "name": "Animer un cadavre (L)",
        "description": "Réanime un mort."
      },
      {
        "name": "Injonction mortelle (L)",
        "description": "END 15 ou PV=0. Sinon 11 DM."
      },
      {
        "name": "Déplacement magique (L)",
        "description": "Téléportation jusqu'à 30 m."
      },
      {
        "name": "Instinct de survie",
        "description": "+1 mouvement/tour, résiste paralysie, +2d6 en défense si PV < 38."
      },
      {
        "name": "Résistance à la magie",
        "description": "RD 5 contre tous les dégâts magiques."
      },
      {
        "name": "Régénération magique",
        "description": "Régénère 5 PV par tour. Seuls le feu et l'acide peuvent détruire définitivement le nécromancien."
      }
    ],
    "description": "Nécromancien suprême avec armée de morts."
  }
]
