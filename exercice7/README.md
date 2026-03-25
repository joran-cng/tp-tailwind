# Exercice 7 - TP Final : Section Vitrine Innovatech Solutions

Ce dossier contient la **Partie 1** de l'exercice final, à savoir l'intégration complète d'une Landing Page pour la startup "Innovatech Solutions".

L'approche retenue est : **Tailwind CSS pur avec configuration avancée de Design Tokens**.

## Livrables Réalisés

### Composants Intégrés
1. **Header/Navigation** (`Accueil`, `Nos Solutions`, `Médias`, `À propos`) avec `position: fixed` et fond translucide (`backdrop-blur`).
2. **Section Accueil (Hero)** : Grand titre avec texte transparent (gradient Tailwind), sous-titre clair et 2 CTA (Call-to-Action) bien distincts (Primaire et Secondaire). Intégration de l'animation personnalisée `fade-up`.
3. **Section Services / Fonctionnalités** :
   * Une architecture grid gérant nativement 1, 2, puis 3 colonnes (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
   * 3 cartes de services ("Vitesse Fulgurante", "Sécurité", "Extensibilité") avec icônes SVG custom.
   * **Bonus : Animations au survol** (Légère élévation en `-translate-y-2`, shadow hover, scale sur le logo, déplacement de la flèche de redirection).
4. **Section Médias** : Bandes de texte se comportant comme logos partenaires, avec effet grayscale (gris de base, colore au survol).
5. **Section À Propos** : Utilisation des couleurs de la marque en négatif (`bg-brand-900`) et résumé chiffré.

### Fonctionnalités Bonus Implémentées
* [x] **Dark Mode Basculable** : Un bouton soleil/lune ajouté dans le header utilise un petit script JS embarqué et `document.documentElement` pour passer le site en sombre via la classe `dark`. La configuration `darkMode: 'class'` de Tailwind s'assure du bon fonctionnement.
* [x] **Design Tokens (Thèmes Personnalisés)** : Dans `tailwind.config.js`, l'extension du thème a été utilisée pour créer une famille de couleurs `brand-xxx` et embarquer la police `Inter` nativement.
* [x] **Animations Fluides** : Le défilement est en `scroll-smooth`, toutes les cartes utilisent `transition-all duration-300` et une animation CSS inédite animant l'entrée de la page (`animate-fade-up`) a été déclarée depuis la configuration Tailwind.

> **Note :** La Partie 2 de cet exercice n'a pas été générée ni réalisée, l'assistance logicielle et IA étant explicitement interdite par vos consignes pour la rédaction du rapport. Vous devez rédiger le comparatif textuel par vous-même.
