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

const RestartGame = () => {
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
}

async function ApiCall() {
    const promise = await fetch('https://random-word-api.herokuapp.com/word')
    const data = await promise.json();

    StartGame(data[0]);
}

const StartGame = word => {
    randomWord = word;

    for(let i = 0; i < randomWord.length; i++){
        displayedWord.push("_");
    }

    UpdateGame();
    userInput.readOnly = false;
}

const UpdateGame = () => {
    secretWord.innerText = displayedWord.join(" ");
    hangMan.innerText = `You have ${guesses} / ${maxGusses} guesses left`;
}

userInput.addEventListener('keydown', function(e){

    let guess = userInput.value.toLowerCase()
    if(e.key === 'Enter'){
        if(randomWord.includes(guess)){
            for(let i = 0; i < randomWord.length; i++){
                if(randomWord[i] === userInput.value){
                    displayedWord[i] = guess;
                }
            }
        } else {
            guesses++;
            wrongGuess += guess;
            wrongGuesses.innerText = wrongGuess;
        }

        UpdateGame();
        EndGame();
        userInput.value = "";
    }
})

const EndGame = () => {
    if(randomWord === displayedWord.join("")){
        alert("YOU have won because you guessed the word " + randomWord + " correctly");
        RestartGame();
    }else if (maxGusses === guesses){
        alert("YOU lose because you failed to guess the word " + randomWord);
        RestartGame();
    }
}



