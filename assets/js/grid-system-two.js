const IMAGES = [
  "assets/img/grid-system-two/IMG_3192.jpg",
  "assets/img/grid-system-two/IMG_3193.jpg",
  "assets/img/grid-system-two/IMG_3194.jpg",
  "assets/img/grid-system-two/IMG_GREEN.jpg",
  "assets/img/grid-system-two/IMG_3203.jpg",
  "assets/img/grid-system-two/IMG_3195.jpg",
  "assets/img/grid-system-two/IMG_3202.jpg",
  "assets/img/grid-system-two/IMG_3201.jpg",
  "assets/img/grid-system-two/IMG_RED.jpg",
];

// DEf de la grille
const size = 4;
const cellSize = 200;
const grid = document.getElementById("grid");
const cursor = document.createElement("div");
cursor.className = "cursor";
grid.appendChild(cursor);

const cells = [];

// grille (4x4)
for (let row = 0; row < size; row++) {
  for (let col = 0; col < size; col++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.imageIndex = "0";
    cell.style.backgroundImage = `url(${IMAGES[0]})`;
    cell.style.backgroundPosition = `-${col * cellSize}px -${row * cellSize}px`;
    grid.appendChild(cell);
    cells.push(cell);
  }
}

// retourne la cellule > changement d'état 
function getCell(row, col) {
  return cells[row * size + col];
}

//3 parcours différents

// 1 : Horizontal (gauche-droite /snake)
const pathHorizontal = [];
for (let row = 0; row < size; row++) {
  if (row % 2 === 0) {
    for (let col = 0; col < size; col++) {
      pathHorizontal.push({row, col});
    }
  } else {
    for (let col = size - 1; col >= 0; col--) {
      pathHorizontal.push({row, col});
    }
  }
}

//2 : Vertical (haut bas en serpent)
const pathVertical = [];
for (let col = 0; col < size; col++) {
  if (col % 2 === 0) {
    for (let row = 0; row < size; row++) {
      pathVertical.push({row, col});
    }
  } else {
    for (let row = size - 1; row >= 0; row--) {
      pathVertical.push({row, col});
    }
  }
}

// 3 : Spirale tour complet
const pathSpiral = [];
// Ligne du haut : gauche → droite
for (let col = 0; col < size; col++) {
  pathSpiral.push({row: 0, col: col});
}
// Colonne de droite : haut → bas (sans le premier)
for (let row = 1; row < size; row++) {
  pathSpiral.push({row: row, col: 3});
}
// Ligne du bas : droite → gauche (sans le dernier)
for (let col = size - 2; col >= 0; col--) {
  pathSpiral.push({row: 3, col: col});
}
// Colonne de gauche : bas → haut (sans le premier et dernier)
for (let row = size - 2; row > 0; row--) {
  pathSpiral.push({row: row, col: 0});
}
// Intérieur
pathSpiral.push({row: 1, col: 1});
pathSpiral.push({row: 1, col: 2});
pathSpiral.push({row: 2, col: 2});
pathSpiral.push({row: 2, col: 1});

const paths = [pathHorizontal, pathVertical, pathSpiral];
let currentPathIndex = 0;
let pathIndex = 0;

function moveCursor() {
  const currentPath = paths[currentPathIndex];
  const pos = currentPath[pathIndex];
  const cell = getCell(pos.row, pos.col);
  
  cursor.style.left = `${cell.offsetLeft}px`;
  cursor.style.top = `${cell.offsetTop}px`;

  // Changer uniquement cette cellule
  let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
  cell.dataset.imageIndex = nextImageIndex;
  cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
  cell.style.backgroundPosition = `-${cell.dataset.col * cellSize}px -${cell.dataset.row * cellSize}px`;

  // Passer à la prochaine position
  pathIndex++;
  
  // Si on a fini le parcours actuel, passer au suivant
  if (pathIndex >= currentPath.length) {
    pathIndex = 0;
    currentPathIndex = (currentPathIndex + 1) % paths.length;
  }
}

setInterval(moveCursor, 50);