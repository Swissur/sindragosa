# Knowledge — Sindragosa

Règles et lore de Sindragosa en Markdown. Rien ne lit ces fichiers à l'exécution : ils servent de référence aux humains et aux agents qui travaillent sur le dépôt, et ils décrivent les règles **telles que l'app les applique**.

## Sources

- **L'app fait foi** : ses catalogues (`client/src/data/sindragosa/`), son moteur de règles (`client/src/utils/sindragosa/`), sa base de données et les décisions de `plans/`. Les fiches restent toujours alignées sur elle ; en cas d'écart, c'est la fiche qu'on corrige.
- Les PDF de `docs/regles/` (`Sindragosa.pdf`, `Compétences & Domaines (Sindragosa).pdf`, `Artisanat (Sindragosa).pdf`) ont servi au travail de base. Ils ne servent plus que pour ce que l'app ne couvre pas encore.
- Les premières décisions prises quand les PDF se contredisaient ou se taisaient sont dans `plans/31-refonte-regles-sindragosa.md` § 6 et 7.
- Ce qui reste à définir est dans la TODO de `ROADMAP.md`.

## Contenu

Voir `topics/00-index.md`.

## Ajouter du contenu

Utiliser `/add-knowledge` avec un fichier `.txt`. Ne rien inventer : un point absent des règles se signale comme tel et va dans la TODO de la roadmap.
