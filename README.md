# MEMORIA

<p align="center">
  <strong>Apprendre. Mémoriser. Progresser.</strong><br>
  Une application interactive pour tester et améliorer sa mémoire grâce à des quiz de vocabulaire.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3-42b883?logo=vuedotjs&logoColor=white" alt="Vue.js 3">
  <img src="https://img.shields.io/badge/Vite-Propulsé-646CFF?logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## Présentation

**Memoria** est une application de quiz conçue pour aider les utilisateurs à apprendre et à mémoriser du vocabulaire grâce à des questions à choix multiples.

## Technologies utilisées

- [Vue.js 3](https://vuejs.org/) — interface utilisateur
- [Vite](https://vite.dev/) — serveur de développement et compilation
- [Vue Router](https://router.vuejs.org/) — navigation entre les pages
- JavaScript — logique de l'application
- CSS — mise en forme de l'interface

---

## Installation

Suis les étapes ci-dessous pour installer et lancer Memoria sur ton ordinateur.

### 1. Prérequis

Installe **Node.js (version LTS)** depuis le site officiel :

 https://nodejs.org/

npm est inclus avec Node.js.

Vérifie que l'installation fonctionne en ouvrant un terminal et en exécutant :

```bash
node --version
npm --version
```

### 2. Télécharger le projet

Ouvre un terminal et exécute la commande suivante: 

```bash
git clone https://github.com/0xHaxxy/Memoria.git
```
### 3. Accéder au dossier du projet

```bash
cd Memoria
```

### 4. Installer les dépendances

```bash
npm install
```

Cette commande télécharge et installe les bibliothèques nécessaires au fonctionnement du projet.

### 5. Lancer l'application

```bash
npm run dev
```

Le terminal affichera une adresse locale, généralement :

```text
http://localhost:5173/
```

Ouvre cette adresse dans ton navigateur pour utiliser Memoria.

---

## Générer la version de production

Pour créer une version optimisée de l'application, exécute :

```bash
npm run build
```

Les fichiers prêts à être déployés seront générés dans le dossier `dist/`.

Pour prévisualiser cette version sur ton ordinateur :

```bash
npm run preview
```

---

## 💻 Compatibilité

Le projet peut être installé et développé sur les systèmes suivants :

-  <b>Windows</b>
-  <b>Linux</b>
-  <b>macOS</b>

Node.js est nécessaire pour installer les dépendances et lancer le serveur de développement.

---

## Structure du projet

```text
Memoria/
├── public/           # Ressources statiques et images
├── src/
│   ├── assets/       # Styles CSS et autres ressources
│   ├── components/   # Composants Vue réutilisables
│   ├── composables/  # Logique du quiz et fonctions réutilisables
│   ├── views/        # Pages de l'application
│   ├── App.vue       # Composant principal
│   └── main.js       # Point d'entrée de l'application
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── .gitignore
```

