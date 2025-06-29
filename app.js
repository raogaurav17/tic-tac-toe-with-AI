let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newbtn = document.querySelector('#new-game');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let Oscore =document.querySelector('.scoreO');
let Xscore = document.querySelector('.scoreX');

let turnO = true;

let O = 0;

let X = 0;

let noOfGame = 0;

let click = 0;

let gameMode = "single";


const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8]
];

const disableboxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const enableboxes = () => {
    for (let box of boxes) {
        if (box.innerText === "") {
            box.disabled = false;
        }
    }
}


const showDraw = () => {
    msg.innerText = "It's A Draw!!!";
    msgContainer.classList.remove("hide");
    disableboxes();
    noOfGame ++;
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableboxes();
    noOfGame ++;
    if(winner == 'X'){
        X += 1;
        Xscore.innerText = X;
    }
    else{
        O += 1;
        Oscore.innerText = O;
    }
}

const clearBoard = () => {
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
    msgContainer.classList.add("hide");
}

const resetGame = () => {
    clearBoard();
    click = 0;
    turnO = true;
    if (gameMode === 'multiplayer' && noOfGame % 2 === 1) {
        turnO = false;
    }
    if (gameMode === 'single' && noOfGame % 2 === 1) {
       turnO = false;
       setTimeout(handleAIMove, 500);
    }
}

const newGame = () => {
    clearBoard();
    turnO = true;
    noOfGame = 0;
    click = 0;
    click = 0;
    O = 0;
    X = 0;
    Oscore.innerText = O;
    Xscore.innerText = X;
}

document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    gameMode = e.target.value;
    newGame();
  });
});


const calculateWinner = (board) => {
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    if (board.every(cell => cell !== "")) {
        return "Draw";
    }
    return null;
};


function minimax(board, depth, isMaximizing) {
    const winner = calculateWinner(board);
    if (winner) {
        if (winner === "X") return 10 - depth;
        if (winner === "O") return depth - 10;
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "X";
                let score = minimax(board, depth + 1, false);
                board[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === "") {
                board[i] = "O";
                let score = minimax(board, depth + 1, true);
                board[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}



function aiMove() {
    const board = Array.from(boxes).map(box => box.innerText);
    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "X";
            let score = minimax(board, 0, false); 
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== -1) {
        boxes[move].innerText = "X";
        boxes[move].style.color = "#ff007f";
        boxes[move].disabled = true;
        click++;
        turnO = true;
    }
}


const CheckWinner = () => {
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos1 === pos2 && pos2 === pos3){
            showWinner(pos1);
            return true;
        }
    }
    if(click === 9){
        showDraw();
        return true;
    }

    return false;
}

const handleAIMove = () => {
    disableboxes();
    aiMove(); 
    CheckWinner();
    enableboxes();
    checkGameStatus();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "" || !turnO && gameMode === 'single') return;
        if (turnO) {
            box.innerText = "O";
            box.style.color = '#00ffee';
            turnO = false;
        } else if (gameMode === 'multiplayer') {
            box.innerText = "X";
            box.style.color = '#ff007f';
            turnO = true;
        }

        box.disabled = true;
        click++;
        const isGameOver = CheckWinner();
        if (!isGameOver && gameMode === "single" && !turnO) {
            setTimeout(handleAIMove, 500);
        }
    });
});

resetbtn.addEventListener("click", resetGame);

newbtn.addEventListener("click", newGame);

