let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtn");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let hangMan = document.getElementById("hangMan");
let userInput = document.getElementById("userInput");

let wrongGuess = [];
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

userInput.addEventListener('keydown', (e) => {
    if (e.key === "Enter") {
        UpdateGame(e.target.value);
        userInput.value = "";
    }
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
    secretWord.textContent = "[Secret Word]";
    hangMan.textContent = "Guesses / Guesses Left";
    wrongGuess = [];
    display = [];
    word = "";
    guesses = 0;
    start = true;
    userInput.readOnly = true;
    wrongGuesses.textContent = "Wrong Guesses";
}

const UpdateGame = (letter) => {
    if (word.includes(letter)) {
        for (let i = 0; i < word.length; i++) {
            if (word[i] === letter) {
                display[i] = letter;
            }
        }
        secretWord.textContent = display.join(" ");
    } else {
        guesses++;
        hangMan.textContent = `Guesses: ${guesses} / ${guessesLeft}`;
        if (!wrongGuess.includes(letter)) {
            wrongGuess.push(letter);
            wrongGuesses.textContent = wrongGuess.join(",");
        }
    }
    EndGame();
}

const EndGame = () => {
    if(guesses === guessesLeft){
        alert(`YOU HAVE LOST, correct word: ${word}`);
        ResetGame();
    } else if (display.join("") === word){
        alert("YOU WIN!!!!");
        ResetGame();
    }
}
