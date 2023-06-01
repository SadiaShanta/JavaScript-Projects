const startGameBtn = document.getElementById('start-game-btn');
const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT = PAPER;
const DRAW = 'DRAW';
const PLAYER_WIN = 'PLAYER WIN';
const PLAYER_LOST = 'PLAYER LOST';


let gameIsRunning = false;

//get user input
function getPlayerChoice(){
    const choice = prompt(`Choose ${ROCK}, ${PAPER} or ${SCISSORS}`, '').toUpperCase();
    if(choice !== ROCK && choice !== PAPER && choice !== SCISSORS){
        alert(`User choice is invalid! We choose ${DEFAULT} for you`);
        return DEFAULT;
    }
    return choice;
}
// In js you can write functions both ways, but if you use const then function
// should be in the upper side before you use it. It's called "function expression".
//get computer input 
const getComputerChoice = function(){
    const computerChoice = Math.random();
    if(computerChoice < 0.34){
        return ROCK;
    }else if(computerChoice < 0.67){
        return PAPER;
    }else {
        return SCISSORS;
    }
}

function getWinner(pChoice, cChoice){
    if(pChoice === cChoice){
        return DRAW;
    }
    else if((pChoice === ROCK && cChoice === SCISSORS) ||
        (pChoice === SCISSORS && cChoice === PAPER) ||
        (pChoice === PAPER && cChoice === ROCK)){
        return PLAYER_WIN;
    }
    else{
        return PLAYER_LOST;
    }
}
//Arrow function
// const getWinner = (cChoice, pChoice) =>
//     cChoice === pChoice
//         ? RESULT_DRAW
//         : (cChoice === ROCK && pChoice === PAPER) ||
//         (cChoice === PAPER && pChoice === SCISSORS) ||
//         (cChoice === SCISSORS && pChoice === ROCK)
//             ? RESULT_PLAYER_WINS
//             : RESULT_COMPUTER_WINS;

startGameBtn.addEventListener('click', function (){
    if (gameIsRunning){
        return;
    }
    gameIsRunning = true;
    console.log('Game is Starting...');
    const playerChoice =  getPlayerChoice();
    console.log("Player Choice: " , playerChoice);
    const computerChoice = getComputerChoice();
    console.log("Computer Choice: " ,computerChoice);
    const winner = getWinner(playerChoice, computerChoice);
    console.log("Winner: ",winner);

    //Outputting message to the user.
    let message = `You picked ${playerChoice} and Computer picked ${computerChoice}, therefore you `;
    if(winner === DRAW){
        message = message + 'had a Draw!';
    }else if(winner === PLAYER_WIN){
        message = message + 'Win!!!';
    } else{
        message = message + 'Lost!';
    }

    alert(message);
    gameIsRunning = false;  //we can now click the button again to start a new game.
});