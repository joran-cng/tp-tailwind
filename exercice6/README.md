# Exercice 6 - Dashboard Modulaire avec Plugins Tailwind

Un système de dashboard dynamique basé sur une architecture plugin Tailwind, avec un registry de widgets, un moteur de rendu et une gestion complète du Drag & Drop.

## Architecture du projet

```
exercice6/
├── index.html              → Interface principale
├── css/
│   ├── input.css           → Point d'entrée Tailwind
│   └── output.css          → CSS compilé (généré)
├── js/
│   ├── core/
│   │   ├── registry.js     → Système d'enregistrement des widgets
│   │   ├── eventBus.js     → Bus d'événements inter-widgets
│   │   └── dashboard.js    → Moteur de rendu du dashboard
│   ├── widgets/
│   │   ├── stats.js        → Widget statistiques
│   │   ├── table.js        → Widget tableau triable
│   │   ├── chutier.js      → Widget Drag & Drop
│   │   └── notifications.js → Widget notifications (Bonus)
│   └── data.js             → Configuration des widgets
├── plugins/
│   └── dashboardPlugin.js  → Plugin Tailwind (.tw-dashboard, .tw-widget...)
├── tailwind.config.js
└── package.json
```

## Comment utiliser le Dashboard

### 1. Compiler le CSS

```bash
npm run build
```

### 2. Ouvrir `index.html` dans un navigateur

Tous les widgets apparaissent dans une grille responsive. Vous pouvez réorganiser les widgets par **glisser-déposer** depuis leur en-tête (zone grisée).

---

## Comment ajouter un widget

### Étape 1 — Créer votre widget dans `js/widgets/monWidget.js`

```js
WidgetRegistry.registerWidget('monWidget', (data) => {
  const wrapper = document.createElement('div');
  // Construire votre UI ici avec data...
  return wrapper;
});
```

### Étape 2 — Inclure le script dans `index.html`

```html
<script src="./js/widgets/monWidget.js"></script>
```

### Étape 3 — Ajouter la config dans `js/data.js`

```js
const dashboardConfig = [
  ...
  { type: 'monWidget', title: 'Mon Widget', data: [...vos données...] }
];
```

---

## Fonctionnalités implémentées

| Fonctionnalité                       | Statut |
|--------------------------------------|--------|
| Plugin Tailwind `.tw-dashboard`       | ✅     |
| Registry `registerWidget/getWidget`   | ✅     |
| Widget Stats (cartes dynamiques)      | ✅     |
| Widget Table (tri asc/desc ▲▼)       | ✅     |
| Widget Chutier (DnD gauche↔droite)   | ✅     |
| Drag & Drop des widgets dans la grille| ✅     |
| Persistance du layout (localStorage)  | ✅ Bonus|
| Communication inter-widgets (EventBus)| ✅ Bonus|
| Ajout dynamique de widgets            | ✅ Bonus|
| Widget Notifications supplémentaire   | ✅ Bonus|
