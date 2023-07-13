let currentPlayer = "x";
let gameBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const chekwin = () => {
  for (let row = 0; row < 3; row++) {
    if (
      gameBoard[row][0] === currentPlayer &&
      gameBoard[row][1] === currentPlayer &&
      gameBoard[row][2] === currentPlayer
    ) {
      return true;
    }
  }
  for (let col = 0; col < 3; col++) {
    if (
      gameBoard[0][col] === currentPlayer &&
      gameBoard[1][col] === currentPlayer &&
      gameBoard[2][col] === currentPlayer
    ) {
      return true;
    }
  }
  if (
    gameBoard[0][0] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][2] === currentPlayer
  ) {
    return true;
  }
  if (
    gameBoard[0][2] === currentPlayer &&
    gameBoard[1][1] === currentPlayer &&
    gameBoard[2][0] === currentPlayer
  ) {
    return true;
  }
  return false;
};
const checkDraw = () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      if (gameBoard[row][col] === "") {
        return false;
      }
    }
  }
  return true;
};
const makeMove = (row, col) => {
  const info = document.querySelector(".info");
  if (gameBoard[row][col] === "") {
    gameBoard[row][col] = currentPlayer;

    if (checkWin()) {
      info.innerText = `Player ${currentPlayer} win!`;
      resetGame();
    } else if (checkDraw()) {
      info.innerText = "Draw!";
      resetGame();
    } else {
      currentPlayer = currentPlayer === "x" ? "o" : "x";
    }
  }
};

const resetGame = () => {
  currentPlayer = "x";
  gameBoard = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  renderBoard();
};
const renderBoard = () => {
  const board = doqument.querySelector(".board");
  board.innerHTML = "";

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.innerText = gameBoard[row][col];

      cell.addEventListener("click", () => {
        makeMove(row, col);
        renderBoard();
      });
      board.appendChild(cell);
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  renderBoard();
});
