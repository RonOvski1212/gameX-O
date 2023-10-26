const board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameEnded = false;
let winsX = 0;
let winsO = 0;
let gameMode = "playerVsPlayer";
let botPlayer = "O";

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
      resultElement.innerText = `Игрок ${currentPlayer} победил!`;
      disableCells();
      gameEnded = true;

      if (currentPlayer === "X") {
        winsX++;
        document.getElementById("winsX").innerText = `Побед X: ${winsX}`;
      } else {
        winsO++;
        document.getElementById("winsO").innerText = `Побед O: ${winsO}`;
      }
    } else if (checkDraw()) {
      resultElement.innerText = "Ничья!";
      gameEnded = true;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById(
        "player"
      ).innerText = `Ход игрока: ${currentPlayer}`;

      if (gameMode === "playerVsBot" && currentPlayer === botPlayer) {
        setTimeout(botPlay, 1000);
      }
    }
  } else {
    resultElement.innerText = "Эта ячейка уже занята. Выберите другую.";
  }
}

function botPlay() {
  if (currentPlayer === botPlayer) {
    let bestMove = findBestMove();
    if (bestMove !== undefined) {
      play(bestMove);
    }
  }
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

function minimax(board, depth, isMaximizing) {
  let scores = {
    X: -1,
    O: 1,
    draw: 0,
  };

  if (checkWin()) {
    return scores[currentPlayer] - depth;
  } else if (checkDraw()) {
    return scores["draw"];
  }

  let bestScore, bestMove;

  if (isMaximizing) {
    bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = botPlayer;
        let score = minimax(board, depth + 1, false);
        board[i] = "";

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  } else {
    bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === "") {
        board[i] = currentPlayer;
        let score = minimax(board, depth + 1, true);
        board[i] = "";
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
  }

  if (depth === 0) {
    return bestMove;
  }

  return bestScore;
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
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

  document.getElementById("player").innerText = "Ход игрока: X";
  document.getElementById("result").innerText = "";
  gameEnded = false;

  if (gameMode === "playerVsBot" && currentPlayer === botPlayer) {
    setTimeout(botPlay, 1000);
  }
}

document.getElementById("restartButton").addEventListener("click", restartGame);

const cells = document.getElementsByClassName("cell");
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener("click", () => play(i));
}
