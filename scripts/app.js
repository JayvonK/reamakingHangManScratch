let startBtn = document.getElementById("startBtn");
let restartBtn = document.getElementById("restartBtn");
let hangMan = document.getElementById("hangMan");
let secretWord = document.getElementById("secretWord");
let wrongGuesses = document.getElementById("wrongGuesses");
let userInput = document.getElementById("userInput");

let guesses = 0;
let maxGuesses = 5;
let displayedWord = [];
let wrongGuess = "";
let randomWord = "";
let length = randomWord.length;

startBtn.addEventListener('click', function (e) {
    ApiCall();
})

restartBtn.addEventListener('click', function (e) {
    RestartGame();
})

async function ApiCall() {
    const promise = await fetch("https://random-word-api.herokuapp.com/word");

    const data = await promise.json();

    StartGame(data[0]);
}

function RestartGame() {
    hangMan.textContent = "Hangman/Guesses Left";
    secretWord.textContent = "[Secret Word]";
    guesses = 0;
    userInput.readOnly = true;
    wrongGuesses.textContent = "Wrong Guesses";
    userInput.value = "";
    userInput.placeHolder = "Enter a letter";
}

function StartGame(word) {
    randomWord = word;
    for (let i = 0; i < randomWord.length; i++) {
        displayedWord[i] = "_";
    }

    UpdateGame();
    userInput.readOnly = false;

}

function UpdateGame() {
    hangMan.textContent = `Guesses: ${guesses} / ${maxGuesses}`;
    secretWord.textContent = displayedWord.join(" ");
    userInput.value = "";
}

userInput.addEventListener('keydown', function (e) {
    if (e.key === "Enter") {
        let guess = userInput.value;

        if (randomWord.includes(guess)) {
            for (let i = 0; i < randomWord.length; i++) {
                if (randomWord[i] === guess) {
                    displayedWord[i] = guess;
                }
            }
        } else {
            wrongGuess += guess;
            guesses++;
            wrongGuesses.textContent = wrongGuess;
        }
        UpdateGame();
        EndGame();
    }
})

function EndGame() {
    if (guesses === maxGuesses) {
        alert("You Lost!!");
        RestartGame();
    } else if (randomWord === displayedWord.join("")) {
        alert("You Have Won, You Guessed " + randomWord + "correctly");
        RestartGame();
    }
}

