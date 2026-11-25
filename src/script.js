const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const scoreXElement = document.getElementById("scoreX");
const scoreOElement = document.getElementById("scoreO");

let gameBoard = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let scoreX = 0;
let scoreO = 0;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("button");
        cell.type = "button";
        cell.setAttribute("aria-label", `Cell ${i + 1}`);
        cell.className = [
            "aspect-square", "rounded-2xl", "bg-slate-800",
            "hover:bg-slate-700", "text-5xl", "font-bold",
            "transition", "focus:outline-none", "focus:ring-2",
            "focus:ring-purple-400"
        ].join(" ");
        cell.addEventListener("click", () => makeMove(i));
        board.appendChild(cell);
    }
}

function makeMove(index) {
    if (!gameActive || gameBoard[index] !== "") return;

    gameBoard[index] = currentPlayer;
    const cell = board.children[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "text-blue-400" : "text-pink-400");
    cell.disabled = true;

    checkWinner();
}

function checkWinner() {
    for (const [a, b, c] of winningConditions) {
        if (
            gameBoard[a] !== "" &&
            gameBoard[a] === gameBoard[b] &&
            gameBoard[a] === gameBoard[c]
        ) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            gameActive = false;

            if (currentPlayer === "X") {
                scoreXElement.textContent = ++scoreX;
            } else {
                scoreOElement.textContent = ++scoreO;
            }
            return;
        }
    }

    if (!gameBoard.includes("")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function restartGame() {
    gameBoard = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    createBoard();
}

restartButton.addEventListener("click", restartGame);
createBoard();
