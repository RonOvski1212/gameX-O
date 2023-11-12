let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let botPlayer = "O";
let gameEnded = false;
let winsX = 0;
let winsO = 0;
let gameMode = "playerVsPlayer";

const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

function setGameMode(mode) {
  gameMode = mode;
  restartGame();
}

function play(index) {
  if (gameEnded) {
    return;
  }

  const resultElement = document.getElementById("result");

  if (board[index] === "") {
    board[index] = currentPlayer;

    const cell = document.getElementById(`cell${index}`);
    cell.innerText = currentPlayer;
    cell.style.pointerEvents = "none";

    if (currentPlayer === "X") {
      cell.style.background =
        "linear-gradient(to bottom right, #FF0000, #FFA500)";
    } else {
      cell.style.background =
        "linear-gradient(to bottom right, #0000FF, #00FF00)";
    }

    if (checkWin()) {
      resultElement.innerText = `Player ${currentPlayer} wins!`;
      disableCells();
      gameEnded = true;

      if (currentPlayer === "X") {
        winsX++;
        document.getElementById("winsX").innerText = `Wins X: ${winsX}`;
      } else {
        winsO++;
        document.getElementById("winsO").innerText = `Wins O: ${winsO}`;
      }
    } else if (checkDraw()) {
      resultElement.innerText = "It's a draw!";
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById(
        "player"
      ).innerText = `Player's turn: ${currentPlayer}`;

      if (gameMode === "playerVsBot" && currentPlayer === botPlayer) {
        setTimeout(botPlay, 1000);
      }
    }
  } else {
    resultElement.innerText = "This cell is already occupied. Choose another.";
  }
}

function findWinningMove(player) {
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = player;
      if (checkWin(player)) {
        board[i] = "";
        return i;
      }
      board[i] = "";
    }
  }
  return undefined;
}

function chooseBestMove(moves) {
  let bestMove;
  let corners = [0, 2, 6, 8];
  let availableCorners = corners.filter((corner) => moves.includes(corner));

  if (moves.includes(4)) {
    bestMove = 4;
  } else if (moves.length === 7) {
    bestMove = availableCorners[0];
  } else if (availableCorners.length > 0) {
    bestMove =
      availableCorners[Math.floor(Math.random() * availableCorners.length)];
  } else {
    const randomIndex = Math.floor(Math.random() * moves.length);
    bestMove = moves[randomIndex];
  }
  return bestMove;
}

function botPlay() {
  if (currentPlayer !== botPlayer || gameEnded) {
    return;
  }

  let bestMove;

  bestMove = findWinningMove(botPlayer);

  if (!bestMove) {
    bestMove = findWinningMove(currentPlayer);
  }

  if (!bestMove) {
    const availableMoves = getAvailableMoves();
    bestMove = chooseBestMove(availableMoves);
  }

  if (bestMove !== undefined) {
    play(bestMove);
  }
}

function getAvailableMoves() {
  const availableMoves = [];
  for (let i = 0; i < board.length; i++) {
    if (board[i] === "") {
      availableMoves.push(i);
    }
  }
  return availableMoves;
}
function findBestMove() {
  let bestMove;
  let bestScore = -Infinity;

  for (let i = 0; i < 9; i++) {
    if (board[i] === "") {
      board[i] = botPlayer;
      let score = minimax(board, 0, false);
      board[i] = "";

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function minimax(board, player, isMaximizing) {
  if (checkWin()) {
    return isMaximizing ? -1 : 1;
  } else if (checkDraw()) {
    return 0;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = botPlayer;
        let score = minimax(board, player, false);
        board[i] = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = currentPlayer;
        let score = minimax(board, player, true);
        board[i] = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

function checkWin() {
  for (const combo of winCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  return !board.includes("");
}

function disableCells() {
  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.style.pointerEvents = "none";
  }
}

function restartGame() {
  board.fill("");
  const cells = document.getElementsByClassName("cell");
  for (const cell of cells) {
    cell.innerText = "";
    cell.style.pointerEvents = "auto";
    cell.style.background = "";
  }

  document.getElementById("player").innerText = `Player's turn: X`;
  document.getElementById("result").innerText = "";
  gameEnded = false;

  if (gameMode === "playerVsBot" && currentPlayer === botPlayer) {
    setTimeout(botPlay, 1000);
  }
}
