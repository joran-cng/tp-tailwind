# Exercice 3 - Mixin de Bouton Responsif avec Sass et Tailwind

Ce dossier contient l'intégralité du TP 3.

## Structure du projet

* `src/_variables.scss` : Contient toutes les variables Sass (couleurs, padding, font-size, breakpoints) nécessaires.
* `src/_mixins.scss` : Contient le mixin `button-responsive` qui accepte les paramètres requis et gère la responsivité avec des breakpoints internes (`@media (min-width: ...)`).
* `src/_base.scss` : Styles optionnels très globaux.
* `src/main.scss` : Fichier maître qui importe Tailwind (les directives `@tailwind`), et nos fichiers Sass. C'est ici que le mixin est appelé pour créer `.btn-primary` et `.btn-secondary`.
* `public/index.html` : Fichier de test qui affiche les deux boutons. Redimensionner la fenêtre montrera l'effet du mixin (largeur 100% sur mobile, ajustement des paddings sur desktop).

## Compilation

Un double script a été mis en place dans le `package.json` pour compiler intelligemment le Sass puis le faire traiter par Tailwind JIT.

Pour lancer une compilation manuelle :
```bash
npm run build
```

Cela exécute `build:sass` (qui génère un fichier temporaire) puis `build:tailwind` (qui purge et compile la couche utilitaire).

## Critères de Validation respectés

- [x] Le mixin `button-responsive` est défini avec paramètres de personnalisation.
- [x] L'intégration de Media Queries depuis les variables est opérationnelle pour changer la largeur de `width: 100%` à `width: auto` et modifier les paddings.
- [x] Les classes `.btn-primary` et `.btn-secondary` exploitent le mixin.
- [x] Le code est organisé de façon modulaire (partials 7-1 architecture simplifiée).
- [x] Testé et fonctionnel : ouvrez simplement `public/index.html` !
