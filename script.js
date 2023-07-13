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
  }
  return false;
};
