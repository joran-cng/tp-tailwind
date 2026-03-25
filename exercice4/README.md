# Exercice 4 - Plugin Tailwind : Table triable réutilisable

Ce projet répond à l'exercice 4 qui demande de créer une solution `vanilla JS` couplée avec un **Plugin Tailwind personnalisé** (`tailwind-sortable-table`) pour transformer n'importe quel tableau HTML en tableau interactif.

## Architecture

* **`plugins/sortableTable.js`** : Fichier principal du plugin Tailwind. Il encapsule la logique d'UI pure CSS pour le tri (curseur cliquable, espaces, et flèches haut/bas via `::after`).
* **`main.js`** : Fichier contenant la logique métier. En une seule passe, ce script s'accroche dynamiquement à tous les tableaux du DOM ayant la classe `.tw-table-sortable`, permettant de garder des comportements isolés (tri indépendant). Il gère :
  * Le clic sur les headers
  * L'inversion de l'ordre (asc / desc)
  * L'intelligence de la donnée (tri selon `Number` ou `String`)
  * Le chaînage avec le design system (changement des background des colonnes actives `bg-indigo-50 text-indigo-600`).
* **`data.js`** : Permet de moquer l'ajout de lignes dans les deux tableaux d'exemple pour séparer l'affichage et la data de notre `index.html`.
* **`index.html`** : Démonstration visuelle avec deux tableaux responsives.

## Critères Validés (Livrables attendus)

* [x] Plugin fonctionnel qui injecte réellement du CSS pour `.tw-table-sortable`.
* [x] Code modulaire (fichiers distincts pour `plugin`, `js`, `html`, `données`).
* [x] UI propre, utilisation de hover sur les lignes, colonnes actives identifiées visuellement, et container en `overflow-x-auto` pour rendre le tableau gérable sur mobile (Responsive).
* [x] Tri géré indépendamment pour chaque type de table (string / number).

## Usage

Pour rendre n'importe quel tableau triable dans votre projet, assurez-vous de satisfaire le schéma HTML suivant en ajoutant la classe `.tw-table-sortable` à votre table et les attributs `data-key` sur les `<th>` :

```html
<table class="tw-table-sortable min-w-full">
  <thead>
    <tr>
      <th data-key="ref">Référence</th>
      ...
```

Une fois le DOM chargé, le script JS prend automatiquement le relai pour injecter l'interactivité. Seuls les `<th>` pourvus d'un `data-key` recevront la fonctionnalité de tri pour autoriser une flexibilité totale.
