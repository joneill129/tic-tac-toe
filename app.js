/*-------------------------------- Constants --------------------------------*/

const whosWhat ={
    '1': 'x',
    '-1': 'o',
    'null': '',
};

const winCombos = [
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6],
];


/*---------------------------- Variables (state) ----------------------------*/

// Variables might include (board/turn/winner)

let board, currentPlayer, winner

/*------------------------ Cached Element References ------------------------*/

const squares = document.querySelectorAll('td div');
const msgDisplay = document.querySelector('h2');

// You might choose to put your game status here

/*----------------------------- Event Listeners -----------------------------*/

// This is where you should put the event listener
// for a mouse-click
document.getElementById('resetButton').addEventListener('click', init);
document.querySelector('table').addEventListener('click', cellClick); //Makes cells clickable!
 //Makes restart button clickable



/*-------------------------------- Functions --------------------------------*/


// Some functions you might choose to use:

// Initialization function:
// Where you set your initial state, setting up 
// what the board will look like upon loading
init();

function init(){
    board = [null, null, null, null, null, null, null, null, null];//Setting the cells to 'empty'. This will allow us to track and access game cells
    currentPlayer = 1;
    winner = null; 
    render();
}

// On-Click function:
// Set up what happens when one of the elements
// is clicked

function cellClick(e) {
    const index = (e.target.id.replace('sq', ''));  
    if (board[index] || winner){
        return;
    }
      board[index] = currentPlayer;
      currentPlayer *= -1;
      winner = isWinner();
      render();
  }
  



// Check winner function:
// Checks the current state of the board for
// a winner and changes the state of the winner
// variable if so
function isWinner() {
    //I did the less elegant way from the solution because writing it out as such helped me understand the logic a bit more clearly
 for (let i = 0; i < winCombos.length; index++) {
  if (Math.abs(board[0] + board[1] + board[2]) === 3) return board[0];
  if (Math.abs(board[3] + board[4] + board[5]) === 3) return board[3];
  if (Math.abs(board[6] + board[7] + board[8]) === 3) return board[6];
  if (Math.abs(board[0] + board[3] + board[6]) === 3) return board[0];
  if (Math.abs(board[1] + board[4] + board[7]) === 3) return board[1];
  if (Math.abs(board[2] + board[5] + board[8]) === 3) return board[2];
  if (Math.abs(board[0] + board[4] + board[8]) === 3) return board[0];
  if (Math.abs(board[2] + board[4] + board[6]) === 3) return board[2];
  if (board.includes(null)) return null;
  return 'tie';
 }

}


// Render function:
// Displays the current state of the board
// on the page, updating the elements to reflect
// either X or O depending on whose turn it is

function render() {
    board.forEach(function(sq, idx) {
        squares[idx].textContent = whosWhat[sq];
       
    });
   
        if (winner === 'tie') {
          msgDisplay.innerText = "We have a tie!"  
        } else if (winner) {
            msgDisplay.innerText = `Looks like Player ${winner} won this round!`
        } else {
            msgDisplay.innerText = `It's Player ${currentPlayer}'s turn!`;
        }
    }

