const messageEl = document.querySelector("#message");
const resetButtonEl = document.querySelector("button");

let board =["","","","","","","","","",];
let currentPlayer = "X";
let gameActive = true;

const winningMessage = () => `player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a Draw";
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn!`;

messageEl.innerText = currentPlayerTurn();

const winningCombos = [
    [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [1, 4, 7],
   [2, 5, 8],
   [0, 4, 8],
   [2, 4, 6],
];

const handleCellPlayed = (clickedSquare, clickedSquareIndex) =>{
    board[clickedSquareIndex] = currentPlayer;
    clickedSquare.innerText = currentPlayer;

    };

  const handlePlayerChange = () => {
    currentPlayer=currentPlayer === "X" ? "O" : "X";
    messageEl.innerText = currentPlayerTurn();
  };

  const handleResultValidation = () => {
    let roundwon = false;

    for(let i=0; i< winningCombos.length; i++) {
        const winCombo = winningCombos[i];

        let a = board[winCombo[0]];
        let b = board[winCombo[1]];
        let c = board[winCombo[2]];
        
        if(a === "" || b === "" || c ==="") {
            continue;
        }
    
    if (a === b && b ===c) {
        roundwon = true;
        break;
    }
    
    }

    if(roundwon) {
        messageEl.innerText =winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !board.includes("");
    if (roundDraw) {
        messageEl.innerText = drawMessage();
        gameActive = false;
        return;
    }

        handlePlayerChange();

  };

  const handleSquareClick = (e) => {
    const clickedSquare = e.target;
    const clickedSquareIndex = parseInt(clickedSquare.id);

    if (board[clickedSquareIndex] !== "" || !gameActive){
        return;
    }

    handleCellPlayed(clickedSquare, clickedSquareIndex);
    handleResultValidation();
  };

  const squareEls = document.querySelectorAll(".sqr");

  squareEls.forEach((squareEl) => {
    squareEl.addEventListener("click", handleSquareClick);
  }
);

resetButtonEl.addEventListener("click", () => {
    gameActive = true;
    currentPlayer = "X";
    board = ["","","","","","","","",""];
    messageEl.innerText = currentPlayerTurn();
    document.querySelectorAll(".sqr").forEach((sqr) =>(sqr.innerText =""));


});





