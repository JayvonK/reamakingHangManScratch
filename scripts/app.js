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

restartBtn.addEventListener('click', function(e){
    guesses = 0;
    maxGusses = 5;
    randomWord = "";
    wrongGuess = "";
    displayedWord = [];
    hangMan.innerText = "Guesses Left / Max Guesses";
    userInput.value = "";
    userInput.readOnly = true;
    wrongGuesses.innerText = "Wrong Guesses";
    secretWord.innerText = "[Secret Word]";
})

async function ApiCall() {
    const promise = await fetch('https://random-word-api.herokuapp.com/word')
    const data = await promise.json();

    StartGame(data[0]);
}



