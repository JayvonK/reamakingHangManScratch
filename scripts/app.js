// 'https://random-word-api.herokuapp.com/word'
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

let display = [];
let word = "";
let guesses = 0;
let guessesLeft = 5;
let start = true;

const GetWord = async () => {
    const promise = await fetch('https://random-word-api.herokuapp.com/word');
    const data = await promise.json();
    word = data[0];
}

startBtn.addEventListener('click', () => {
    StartGame();

})

resetBtn.addEventListener('click', () => {
    ResetGame();
})

userInput.addEventListener('keydown', () => {
    UpdateGame();
})

const StartGame = async () => {
    if (start) {
        await GetWord();
        word.split("").forEach(el => display.push('_'));
        secretWord.textContent = display.join(" ");
        hangMan.textContent = `Guesses: ${guesses} / ${guessesLeft}`;
        userInput.readOnly = false;
    }
    start = false;
}

const ResetGame = () => {

}

const UpdateGame = () => {
    for(let i = 0; i < word.length; i++){
        if(i)
    }
}
