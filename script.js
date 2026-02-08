const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restartBtn");

let currentPlayer = "X";
let gameActive = true;

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach(cell => {
    cell.addEventListener("click", handleClick);
});

restartBtn.addEventListener("click", restartGame);

function handleClick(e) {
    const cell = e.target;

    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        statusText.textContent = `🎉 Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (isDraw()) {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
    return winPatterns.some(pattern =>
        pattern.every(index => cells[index].textContent === currentPlayer)
    );
}

function isDraw() {
    return [...cells].every(cell => cell.textContent !== "");
}

function restartGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's turn";

    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x", "o");
    });
}
