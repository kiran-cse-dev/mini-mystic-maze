
 
   
const levels = [
    [
        "#########",
        "#P..#...#",
        "#.#.#.#.#",
        "#.#...#.#",
        "#.###.#.#",
        "#...#...#",
        "###.#.###",
        "#K......E",
        "#########"
    ],
    [
        "#########",
        "#P#.....#",
        "#.#.###.#",
        "#...#...#",
        "###...###",
        "#...#...#",
        "#.###.#.#",
        "#K....#E#",
        "#########"
    ],
    [
        "#########",
        "#P......#",
        "###.###.#",
        "#...#...#",
        "#.###.###",
        "#.....#.#",
        "#.###.#.#",
        "#K......E",
        "#########"
    ] ,
    [
        "#########",
        "#P#.....#",
        "#.#.###.#",
        "#.#.....#",
        "#.###.#.#",
        "#.....#.#",
        "#.#.#.#.#",
        "#K..#..E#",
        "#########"
    ]

];
 
const maze = document.getElementById("maze");
const keyCount = document.getElementById("key-count");
const message = document.getElementById("message");
const restartBtn = document.getElementById("restart-btn");
const levelNumber = document.getElementById("level-number");

let currentLevel = 0;
let mazeLayout;
let player;
let hasKey = false;
let gameWon = false;

function loadLevel() {
    mazeLayout = levels[currentLevel];

    hasKey = false;
    gameWon = false;
    keyCount.textContent = "0";
    levelNumber.textContent = currentLevel + 1;

    // Find the starting position marked P
    for (let row = 0; row < mazeLayout.length; row++) {
        for (let col = 0; col < mazeLayout[row].length; col++) {
            if (mazeLayout[row][col] === "P") {
                player = { row, col };
            }
        }
    }

    message.textContent = "Find the key and reach the exit!";
    drawMaze();
}

function drawMaze() {
    maze.innerHTML = "";

    for (let row = 0; row < mazeLayout.length; row++) {
        for (let col = 0; col < mazeLayout[row].length; col++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const tile = mazeLayout[row][col];

            if (tile === "#") {
                cell.classList.add("wall");
            } else {
                cell.classList.add("path");
            }

            if (row === player.row && col === player.col) {
                cell.classList.add("player");
                cell.textContent = "🧙";
            } else if (tile === "K" && !hasKey) {
                cell.classList.add("key");
                cell.textContent = "🔑";
            } else if (tile === "E") {
                cell.classList.add("exit");
                cell.textContent = "🚪";
            }

            maze.appendChild(cell);
        }
    }
}

       function movePlayer(rowChange, colChange) {
    if (gameWon) return;


    const newRow = player.row + rowChange;
    const newCol = player.col + colChange;

    if (
        newRow < 0 ||
        newRow >= mazeLayout.length ||
        newCol < 0 ||
        newCol >= mazeLayout[0].length
    ) {
        return;
    }

    const nextTile = mazeLayout[newRow][newCol];

    if (nextTile === "#") {
        message.textContent = "That path is blocked!";
        return;
    }

    // Don't enter the exit without the key
    if (nextTile === "E" && !hasKey) {
        message.textContent = "You need the key to open the exit!";
        return;
    }

    player.row = newRow;
    player.col = newCol;

    if (nextTile === "K") {
        hasKey = true;
        keyCount.textContent = "1";
        message.textContent = "You found the magical key!";
    }

    if (nextTile === "E" && hasKey) {
        if (currentLevel < levels.length - 1) {
            currentLevel++;
            message.textContent = "Level completed! Loading next level...";
            loadLevel();
            message.textContent = "Welcome to Level " + (currentLevel + 1) + "! Find the key!";
            return;
               } else {
            gameWon = true;
            gameScreen.style.display = "none";
            victoryScreen.style.display = "block";
        }
    }

    drawMaze();
}

document.addEventListener("keydown", function(event) {
    if (
        ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)
    ) {
        event.preventDefault();
    }

    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        movePlayer(-1, 0);
    } else if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        movePlayer(1, 0);
    } else if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        movePlayer(0, -1);
    } else if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        movePlayer(0, 1);
    }
});

function restartGame() {
    currentLevel = 0;
    loadLevel();
}

restartBtn.addEventListener("click", restartGame);

loadLevel();

const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");
const playBtn = document.getElementById("play-btn");

playBtn.addEventListener("click", function() {
    startScreen.style.display = "none";
    gameScreen.style.display = "block";

    restartGame();
});

const victoryScreen = document.getElementById("victory-screen");
const playAgainBtn = document.getElementById("play-again-btn");
const mainMenuBtn = document.getElementById("main-menu-btn");

playAgainBtn.addEventListener("click", function() {
    victoryScreen.style.display = "none";
    gameScreen.style.display = "block";
    restartGame();
});

mainMenuBtn.addEventListener("click", function() {
    victoryScreen.style.display = "none";
    gameScreen.style.display = "none";
    startScreen.style.display = "block";
});
