 //traitement img
const IMAGES = [
  "assets/img/grid-system-one/32.jpg",
  "assets/img/grid-system-one/33.jpg",
  "assets/img/grid-system-one/34.jpg",
  "assets/img/grid-system-one/IMG_4755.jpeg",
  "assets/img/grid-system-one/IMG_8892.jpeg",
];

const SHAPES = [
  "assets/img/grid-system-one/triangle_blue.png",
  "assets/img/grid-system-one/circle_purple.png"
];

// définition de la grille 4x4
const size = 4;
const cellSize = 200;
const grid = document.getElementById("grid");
const cursor = document.createElement("div");
cursor.className = "cursor";
grid.appendChild(cursor);
const cells = [];

// définition de la grille 4x4
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

// ordre de direction de l'animation de la grille
// snake > corner haut & droite > border > center > checkboard > corner-bottom-left > glitch > snake (et ca repart)

// retourne la cellule > changement d'état l'mg sur la grille
function getCell(row, col) {
  return cells[row * size + col];
}

// Parcour du bord (tour exterieur)
const borderPath = [
  {row: 0, col: 0}, {row: 0, col: 1}, {row: 0, col: 2}, {row: 0, col: 3},
  {row: 1, col: 3}, {row: 2, col: 3}, {row: 3, col: 3},
  {row: 3, col: 2}, {row: 3, col: 1}, {row: 3, col: 0},
  {row: 2, col: 0}, {row: 1, col: 0}
];
// parcour du centre (carré 2x2)
const centerPath = [
  {row: 1, col: 1}, {row: 1, col: 2},
  {row: 2, col: 2}, {row: 2, col: 1}
];
let row = 0;
let col = 0;
let dirDown = true;
let dirRight = true;
let mode = 'snake'; // Modes: 'snake', 'checkerboard', 'corner', 'border', 'center', 'glitch'
let glitchCount = 0;
let cornerCount = 0;
let borderLoops = 0;
let centerLoops = 0;
let checkerboardLoops = 0;
let pathIndex = 0;

// Fonction pour effet glitch
function glitchEffect() {
  const numCellsToChange = Math.floor(Math.random() * 5) + 4;
  for (let i = 0; i < numCellsToChange; i++) {
    const randomCell = cells[Math.floor(Math.random() * cells.length)];
    const randomImageIndex = Math.floor(Math.random() * IMAGES.length);
    randomCell.dataset.imageIndex = randomImageIndex;
    randomCell.style.backgroundImage = `url(${IMAGES[randomImageIndex]})`;
    randomCell.style.backgroundPosition = `-${randomCell.dataset.col * cellSize}px -${randomCell.dataset.row * cellSize}px`;
  }
  glitchCount++;
  if (glitchCount >= 30) {
    mode = 'snake';
    glitchCount = 0;
    row = 0; col = 0;
    dirDown = true; dirRight = true;
    cursor.classList.remove('hidden');
  }
}

function moveCursor() {
  if (mode === 'glitch') {
    glitchEffect();
    return;
  }

  // Mode damier (une case sur deux, plusieurs fois)
  if (mode === 'checkerboard') {
    for (let i = 0; i < cells.length; i++) {
      const cell = cells[i];
      const row = parseInt(cell.dataset.row);
      const col = parseInt(cell.dataset.col);
      if ((row + col) % 2 === 0) {
        let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
        cell.dataset.imageIndex = nextImageIndex;
        cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
        cell.style.backgroundPosition = `-${col * cellSize}px -${row * cellSize}px`;
      }
    }
    checkerboardLoops++;
      if (checkerboardLoops >= 3) { // 3 itérations en mode damier
          mode = 'glitch';
          cursor.classList.add('hidden');
      checkerboardLoops = 0;
    }
    return;
  }

  let cell;

  // Mode coin haut-droite (plusieurs fois)
  if (mode === 'corner') {
    cell = getCell(0, 3);
    cursor.style.left = `${cell.offsetLeft}px`;
    cursor.style.top = `${cell.offsetTop}px`;

    let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
    cell.dataset.imageIndex = nextImageIndex;
    cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
    cell.style.backgroundPosition = `-${cell.dataset.col * cellSize}px -${cell.dataset.row * cellSize}px`;

    cornerCount++;
    if (cornerCount >= 10) { // 10 passages sur le coin
      mode = 'border';
      cornerCount = 0;
      pathIndex = 0;
      borderLoops = 0;
    }
    return;
  }

  // Bord
  if (mode === 'border') {
    const pos = borderPath[pathIndex];
    cell = getCell(pos.row, pos.col);
    cursor.style.left = `${cell.offsetLeft}px`;
    cursor.style.top = `${cell.offsetTop}px`;

    let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
    cell.dataset.imageIndex = nextImageIndex;
    cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
    cell.style.backgroundPosition = `-${cell.dataset.col * cellSize}px -${cell.dataset.row * cellSize}px`;

    pathIndex++;
    if (pathIndex >= borderPath.length) {
      pathIndex = 0;
      borderLoops++;
      if (borderLoops >= 3) { // 3 tours du bord
        mode = 'center';
        pathIndex = 0;
        centerLoops = 0;
      }
    }
    return;
  }

  // Mode centre (4 cases centrales plusieurs fois)
  if (mode === 'center') {
    const pos = centerPath[pathIndex];
    cell = getCell(pos.row, pos.col);
    cursor.style.left = `${cell.offsetLeft}px`;
    cursor.style.top = `${cell.offsetTop}px`;

    let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
    cell.dataset.imageIndex = nextImageIndex;
    cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
    cell.style.backgroundPosition = `-${cell.dataset.col * cellSize}px -${cell.dataset.row * cellSize}px`;

    pathIndex++;
    if (pathIndex >= centerPath.length) {
      pathIndex = 0;
      centerLoops++;
      if (centerLoops >= 5) { // 5 tours du centre
        mode = 'checkerboard';
        pathIndex = 0;
        checkerboardLoops = 0;
      }
    }
    return;
  }
  //mode snake normal
  cell = getCell(row, col);
  cursor.style.left = `${cell.offsetLeft}px`;
  cursor.style.top = `${cell.offsetTop}px`;
  let shouldUpdate = true;

  if (mode === 'checkerboard') {
    shouldUpdate = (row + col) % 2 === 0;
  }
  if (shouldUpdate) {
    let nextImageIndex = (parseInt(cell.dataset.imageIndex) + 1) % IMAGES.length;
    cell.dataset.imageIndex = nextImageIndex;
    cell.style.backgroundImage = `url(${IMAGES[nextImageIndex]})`;
    cell.style.backgroundPosition = `-${cell.dataset.col * cellSize}px -${cell.dataset.row * cellSize}px`;
  }

  // Mouvement snake vertical
  if (dirDown) {
    if (row < size - 1) {
      row++;
    } else {
      dirDown = false;
      col += dirRight ? 1 : -1;
    }
  } else {
    if (row > 0) {
      row--;
    } else {
      dirDown = true;
      col += dirRight ? 1 : -1;
    }
  }
  if (col >= size) {
    col = size - 1;
    dirRight = false;
  }
  if (col < 0) {
    col = 0;
    dirRight = true;

    if (mode === 'snake') {
      mode = 'corner';
    }
  }
}

setInterval(moveCursor, 50);