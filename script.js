const grid = document.getElementById('grid');
const scoreDisplay = document.getElementById('score');
const gridSize = 4;
let score = 0;
let activeTile = null;
let gameSpeed = 1000;
let gameInterval;

// Initialize the grid
function generateGrid() {
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.x = i;
      cell.dataset.y = j;
      cell.addEventListener('click', handleTileClick);
      grid.appendChild(cell);
    }
  }
}

// Handle tile click
function handleTileClick(e) {
  const clickedTile = e.target;

  if (clickedTile === activeTile) {
    // Correct tile clicked
    score++;
    scoreDisplay.textContent = `Score: ${score}`;
    activeTile.classList.remove('active');
    activeTile = null;
    clearInterval(gameInterval);
    increaseDifficulty();
    startGame();
  } else {
    // Wrong tile clicked
    endGame('You clicked the wrong tile!');
  }
}

// Highlight a random tile
function highlightRandomTile() {
  if (activeTile) {
    // Missed the previous tile
    endGame('You missed the tile!');
    return;
  }

  const cells = document.querySelectorAll('.cell');
  const randomIndex = Math.floor(Math.random() * cells.length);
  activeTile = cells[randomIndex];
  activeTile.classList.add('active');
}

// Start the game
function startGame() {
  gameInterval = setInterval(highlightRandomTile, gameSpeed);
}

// Increase difficulty
function increaseDifficulty() {
  if (gameSpeed > 300) {
    gameSpeed -= 50;
  }
}

// End the game
function endGame(message) {
  clearInterval(gameInterval);
  alert(`${message}\nYour Score: ${score}`);
  resetGame();
}

// Reset the game
function resetGame() {
  score = 0;
  gameSpeed = 1000;
  activeTile = null;
  scoreDisplay.textContent = `Score: ${score}`;
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => cell.classList.remove('active'));
  startGame();
}

// Initialize
generateGrid();
startGame();
