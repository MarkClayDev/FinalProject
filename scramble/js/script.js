const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");


const sentences = [
    "Word Scramble Game!",
    "Test your skills!",
    "Have fun playing!"
];

let currentSentenceIndex = 0;
const typingSpeed = 100;
const typingText = document.getElementById('wordScramble');

function typeSentence(sentence, callback) {
    let index = 0;
    typingText.innerHTML = '';

    function typeCharacter() {
        if (index < sentence.length) {
            typingText.innerHTML += sentence.charAt(index);
            index++;
            setTimeout(typeCharacter, typingSpeed);
        } else {
            if (callback) callback();
        }
    }

    typeCharacter();
}

function startTypingLoop() {
    typeSentence(sentences[currentSentenceIndex], () => {
        currentSentenceIndex = (currentSentenceIndex + 1) % sentences.length;
        setTimeout(startTypingLoop, 1000);  // Wait for 1 second before typing the next sentence
    });
}

document.addEventListener("DOMContentLoaded", function() {
    startTypingLoop();
});



let correctWord, timer;

const initTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if (maxTime > 0 ){
            maxTime--;
               return timeText.innerText = maxTime;
        }
        clearInterval(timer);
        alert(`Times up! ${correctWord.toUpperCase()} Was the correct word!`);
        initGame();
    },1000);
}
const initGame = () => {
    initTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--){
        let j = Math.floor(Math.random() * (i + 1)); 

        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
    console.log(wordArray, randomObj.word);

}

initGame();
const checkWord = () => {
    let userWord = inputField.value.toLocaleLowerCase();
    if (!userWord) return alert ("Please enter a word!");
    if (userWord !== correctWord) return alert(`Ooops! ${userWord} is not the correct word`);
    alert(`Congratulations! ${userWord.toUpperCase()} is the correct word!`);
    initGame();
}
refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);