let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-game");
let newbtn = document.querySelector('#new-game');
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;

let noOfGame = 0;

let click = 0;

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
    if(noOfGame % 2 === 1){
        turnO = false;
    } else {
        turnO = true;
    }
}

const newGame = () => {
    clearBoard();
    turnO = true;
    noOfGame = 0;
}

const CheckWinner = () => {
    if(click === 9){
        showDraw();
        return;
    }
    for(let pattern of winPatterns) {
        let pos1 = boxes[pattern[0]].innerText;
        let pos2 = boxes[pattern[1]].innerText;
        let pos3 = boxes[pattern[2]].innerText;


        if(pos1 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                showWinner(pos1);
            }
    
        }
    }
}

boxes.forEach((box) => {
    box.addEventListener("click",() => {
        click++;
        if(turnO){
            box.innerText = "O";
            turnO = false;
            box.style.color = '#00ffee';
        }else{
            box.innerText = "X";
            turnO = true;
            box.style.color = '#ff007f';
        }
        box.disabled = true;

        CheckWinner();
    });
});

resetbtn.addEventListener("click", resetGame);

newbtn.addEventListener("click", newGame);

