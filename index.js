/* using the universal window object to select the entire page. since the JS link was placed in the head, 
this ensures the html is proccessed by the browser*/

window.addEventListener('DOMContentLoaded', () => {
    const cells = Array.from(document.querySelectorAll('.cell'));
    const showGamer = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const declare = document.querySelector('.declare');

    let board = ['', '', '', '', '', '', '', '', ''];
    let gamer = 'X';
    let gameStatus = true;

    const XWINS = 'XWINS';
    const OWINS = 'OWINS';
    const TIE = 'TIE';


    const Winner = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]
    ];

    function resultAction() {
        let winningTurn = false;
        for (let i = 0; i <= 7; i++) { /** for loop to go thro winner sinarios array from above */
            const aWin = Winner[i];
            const a = board[aWin[0]];
            const b = board[aWin[1]];
            const c = board[aWin[2]];
            if (a === '' || b === '' || c === '') { // if the theres empty boxes skip the iteration w continue keyord
            }
            if (a === b && b === c) { // if there is a winner set the gameStatus to true boolean
                winningTurn = true;
                break; // and exit loop with the break
            }
        }

    if (winningTurn) {
            announce(gamer === 'X' ? XWINS : OWINS); //call the announce function with xwins or owins announces winner
            gameStatus = false;
            return;
        }

    if (!board.includes('')) // if board DOESNOT include empty cells announce a tie
        announce(TIE);
    }
// function to announce the winner using a switch 
    const announce = (type) => {
        switch(type){
            case OWINS:
                declare.innerHTML = 'Player <span class="playerO">O</span> Wins'; 
                // and can later be referenced in cells to clear later
                break;
            case XWINS:
                declare.innerHTML = 'Player <span class="playerX">X</span> Wins';
                break;
            case TIE:
                declare.innerText = 'Tie';
        }
        declare.classList.remove('hide'); // romves the hide class to display the winner or type 
    };
// prevents input in cells with that are not empty
    const isValidAction = (cell) => {
        if (cell.innerText === 'X' || cell.innerText === 'O'){
            return false;
        }

        return true;
    };

    const updateBoard =  (index) => {
        board[index] = gamer;
    }

    const switchGamer = () => {
        showGamer.classList.remove(`player${gamer}`); //removes currneplayer using class list to reference the <span class in the html
        gamer = gamer === 'X' ? 'O' : 'X'; /* CHANGE THE CURRENT PLAYER TO X IF ITS O back to X */
        showGamer.innerText = gamer;/* change what is shown to the correct gamer*/
        showGamer.classList.add(`player${gamer}`);
    }

    // function to check that cell is empty
    const userAction = (cell, index) => {
        if(isValidAction(cell) && gameStatus) { // if the cell is empty the game status is active,
            cell.innerText = gamer; // sets the current player
            cell.classList.add(`player${gamer}`); // using a template string to display the gamer whos turn it is
            updateBoard(index); //calling the updateBoard function to update the board array
            resultAction(); //check for winner
            switchGamer(); 
        }
    }
    
    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', '']; //sets the cells to empty
        gameStatus = true;
        declare.classList.add('hide');

        if (gamer === 'O') {
            switchGamer();
        }

        cells.forEach(cell => {
            cell.innerText = '';/**for each cell clear it */
            cell.classList.remove('playerX');
            cell.classList.remove('playerO');
        });
    }

    cells.forEach( (cell, index) => {
        cell.addEventListener('click', () => userAction(cell, index)); // attached event listener to every cell to call the userAction function
    }); //usinbg index to update the board

    resetButton.addEventListener('click', resetBoard);
});