# Grid System - Image Toggle Animation

**Une animation interactive de grille d'images avec plusieurs effets visuels (snake, damier, bordure, centre, glitch).**

![Grid System - Image Toggle Demo](grid-system-example.gif)

---

## 📌 Description

Ce projet est une animation HTML/CSS/JS qui affiche une grille 4x4 d'images et applique successivement différents effets visuels :
- **Snake** : parcours en serpent
- **Corner** : focus sur le coin supérieur droit
- **Border** : parcours du bord de la grille
- **Center** : focus sur les cases centrales
- **Checkerboard** : effet damier (une case sur deux)
- **Glitch** : animation aléatoire de type "glitch"

L'animation boucle automatiquement entre ces modes.

---

## 🛠 Installation

### 1. **Cloner le dépôt** (ou télécharger les fichiers) :
   ```bash
   git clone https://github.com/Jeffrey-pons/grid-system
   ```
### 2. **Placer tes images** :

- Crée un dossier img/ à la racine du projet.
- Ajoute tes images
- Modifie le tableau IMAGES dans le fichier index.html.

### 3. **Ouvrir le projet** :

- Ouvre le fichier index.html dans ton navigateur (Chrome, Firefox, etc.) ou utiliser l'extension Go live depuis VS Code.

## Personnalisation
### 1. Changer les images

### 2. Changer la taille de la grille
- Modifie les variables size et cellSize pour ajuster la taille de la grille et des cellules :
```bash
const size = 4; // Nombre de cases par ligne/colonne
const cellSize = 200; // Taille d'une case en pixels
```
### 3. Ajuster les durées et transitions

- Modifie la durée de l'intervalle dans setInterval(moveCursor, 100); (en millisecondes).
- Ajuste les valeurs de borderLoops, centerLoops, checkerboardLoops pour changer le nombre de répétitions de chaque effet.

### 4. Changer les couleurs et styles
- Modifie le CSS dans la section <style> pour adapter les couleurs de fond, la taille du curseur, etc.

## Fonctionnement technique

#### HTML : Structure de la grille et du curseur.
#### CSS : Style de la grille, des cellules et du curseur.
#### JavaScript (Vanilla): Logique d'animation, gestion des modes et des changements d'états.


# Licence
- Ce projet est sous licence MIT. Tu es libre de l'utiliser, le modifier et le partager !

# Crédits

- Développé par Jeffrey Pons.
- Inspiré par le module grid system par Tim Rodenbroeker.