const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.restart');
let gameActive = true;
let currentPlayer = 'O';

let stepMessage = () => `A${currentPlayer === 'X' ? 'z' : ''} ${currentPlayer} játékos következik!`;
let drawMessage = `A játszma döntetlennel zárult!`;
let theWinnerMessage = () => `A győztes pedig nem más, mint a${currentPlayer === 'X' ? 'z' : ''} ${currentPlayer} játékos!!!`;

let theGame = ['', '', '', '', '', '', '', '', ''];

const winningIndex = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


cells.forEach(cell => cell.addEventListener('click', handleCellClicked));
restartBtn.addEventListener('click', handleRestart);

function handleCellClicked(event) {
    const cellClicked = event.target;
    const cellClickedIndex = parseInt(cellClicked.getAttribute('value'));
    if (theGame[cellClickedIndex] !== '' || !gameActive) {
        return;
    }
    theGame[cellClickedIndex] = currentPlayer;
    cellClicked.textContent = currentPlayer;

    handleResult();
}

function handleResult() {
    let roundWon = false;

    for (let i = 0; i < 8; i++) {
        let a = theGame[winningIndex[i][0]];
        let b = theGame[winningIndex[i][1]];
        let c = theGame[winningIndex[i][2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            for (let j = 0; j < 3; j++) {
                cells[winningIndex[i][j]].classList.add('winner-sign');
            }
            break;
        }
    }
    if (roundWon) {
        gameActive = false;
        return;
    }

    let roundDraw = !theGame.includes('');
    if (roundDraw) {
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'O' ? 'X' : 'O';
    
}

function handleRestart() {
    gameActive = true;
    currentPlayer = 'O';
    theGame = ['', '', '', '', '', '', '', '', ''];
    
    for (let j = 0; j < 9; j++) {
        cells[j].classList.remove('winner-sign');
    }
    
    cells.forEach(cell => cell.textContent = '');
}