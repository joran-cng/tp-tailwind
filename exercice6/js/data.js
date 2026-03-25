// --- Données du Dashboard ---

const dashboardConfig = [
  {
    type: 'stats',
    title: '📊 Statistiques',
    span: 2,
    data: [
      { label: 'Utilisateurs', value: '1 284' },
      { label: 'Commandes', value: '348' },
      { label: 'Éléments classés', value: '0', id: 'dynamic-chutier-count' }
    ]
  },
  {
    type: 'table',
    title: '📋 Tableau des Employés',
    data: [
      { name: 'Alice Martin', role: 'Dev Frontend', age: 28, ville: 'Paris' },
      { name: 'Bob Dupont', role: 'Dev Backend', age: 34, ville: 'Lyon' },
      { name: 'Clara Morin', role: 'Designer', age: 26, ville: 'Bordeaux' },
      { name: 'David Leroy', role: 'DevOps', age: 31, ville: 'Toulouse' },
      { name: 'Emma Petit', role: 'Product', age: 29, ville: 'Nantes' }
    ]
  },
  {
    type: 'chutier',
    title: '🗂️ Chutier Drag & Drop',
    data: [
      { id: 1, name: 'Produit Alpha' },
      { id: 2, name: 'Produit Beta' },
      { id: 3, name: 'Produit Gamma' },
      { id: 4, name: 'Produit Delta' },
      { id: 5, name: 'Produit Epsilon' }
    ]
  },
  {
    type: 'notifications',
    title: '🔔 Notifications',
    data: [
      { type: 'success', title: 'Déploiement réussi', message: 'La v2.4.1 est en production.' },
      { type: 'warning', title: 'Quota atteint à 80%', message: 'Bande passante mensuelle presque épuisée.' },
      { type: 'info', title: 'Maintenance planifiée', message: 'Le 28 mars de 02h00 à 04h00.' },
      { type: 'error', title: 'Échec backup BDD', message: 'Vérifiez les logs du serveur de stockage.' }
    ]
  }
];
