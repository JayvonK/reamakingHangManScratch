let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let userInput = document.getElementById("userInput");
let hangMan = document.getElementById("hangMan");

let guesses = 0;
let maxGusses = 5;
let randomWord = "";
let wrongGuess = "";
let displayedWord = [];

startBtn.addEventListener('click', function(e){
    ApiCall();
})

restartBtn.addEventListener('click', function(e){
    RestartGame();
})

async function ApiCall() {
    const promise = await fetch('')
}