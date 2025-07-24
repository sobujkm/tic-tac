const board = document.getElementById('board');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let cells = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function renderBoard() {
  board.innerHTML = '';
  cells.forEach((cell, index) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    div.textContent = cell;
    div.dataset.index = index;
    div.addEventListener('click', handleClick);
    board.appendChild(div);
  });
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== '' || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWinner()) {
    message.textContent = `${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell !== '')) {
    message.textContent = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // rows
    [0,3,6], [1,4,7], [2,5,8], // columns
    [0,4,8], [2,4,6]           // diagonals
  ];

  return winPatterns.some(pattern => {
    const [a, b, c] = pattern;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

restartBtn.addEventListener('click', () => {
  currentPlayer = 'X';
  cells = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  message.textContent = '';
  renderBoard();
});

renderBoard();
