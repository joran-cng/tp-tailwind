# Exercice 5 - Plugin Tailwind : Chutier Drag & Drop HTML5

Ce TP démontre la puissance conjointe de Tailwind CSS (via le développement de plugins d'UI) et de l'API Drag & Drop native de HTML5.

## Architecture & Responsabilités

* **`plugins/dndChutier.js`** : Plugin Tailwind qui gère exclusivement l'apparence des différentes zones (`.tw-dnd-container`, `.tw-chutier`, `.tw-dropzones...`) et leurs états (`.tw-drag-over`, `.tw-dragging`). 
  > *Note : J'ai volontairement utilisé `tailwindcss/plugin` car c'est la bonne pratique pour les plugins Tailwind qui gèrent de multiples états CSS, notamment pour interagir de façon sécurisée avec l'écosystème PostCSS.*
* **`main.js`** : Script principal pur JS s'occupant de :
  1. La gestion du cycle du D&D natif (`dragstart`, `dragover`, `dragleave`, `dragend`, `drop`).
  2. La manipulation du DOM (création des objets virtuels, déplacement dans les containers existants).
  3. L'implémentation du **bonus de sauvegarde locale** (`localStorage`) qui permet de conserver parfaitement la position des éléments même après un rafraichissement de la page.
* **`data.js`** : Tableau exportant les données initiales pour le remplissage.
* **`index.html`** : Point d'accroche UI qui utilise les classes personnalisées définies dans le Plugin.

## Fonctionnalités Couvertes
- [x] UI propre, minimaliste via Tailwind Plugin (Aucun CSS personnalisé tiers ajouté).
- [x] Mouvement Libre: Drag de Gauche (Chutier) vers Droite (Zones).
- [x] Mouvement Libre: Drag de Droite vers la Gauche (Remettre un élément dans le chutier).
- [x] **Bonus Inter-zone** : Drag possible directement entre la Zone 1, la Zone 2, etc.
- [x] **Bonus LocalStorage** : Chaque mouvement est intercepté et sérialisé dans un dictionnaire `zones: { 1: [ids...], 2: [ids...], ... }` puis sauvegardé. La page recharge toujours son dernier état ! (Un bouton de reset a été ajouté dans l'UI pour tester facilement).

## Usage

Pour ajouter une interface Chutier D&D à votre projet :

1. Entourez vos zones par la top-class :
```html
<div class="tw-dnd-container">
```

2. Créez un div maître pour le chutier :
```html
<div class="tw-chutier" id="monChutier"></div>
```

3. Créez un enclos à zones et listez vos différentes destinations :
```html
<div class="tw-dropzones">
  <div class="tw-dropzone" data-zone="1"></div>
  <div class="tw-dropzone" data-zone="2"></div>
</div>
```

4. Initialisez le script avec ces sélecteurs :
```js
initDndChutier({
  chutierSelector: '#monChutier',
  dropzoneSelector: '.tw-dropzone',
  data: myDataJsonArray
});
```
