document.addEventListener("DOMContentLoaded", () => {
    const typingTextElement = document.querySelector(".typing-text p");
    const inputField = document.querySelector(".input-field");
    const timeLeftElement = document.querySelector(".time span b");
    const mistakeElement = document.querySelector(".mistake span");
    const wpmElement = document.querySelector(".wpm span");
    const cpmElement = document.querySelector(".cpm span");
    const tryAgainButton = document.querySelector("button");

    let timer;
    let maxTime = 60;
    let timeLeft = maxTime;
    let charIndex = 0;
    let mistakes = 0;
    let isTyping = false;

    function randomParagraph() {
        const randomIndex = Math.floor(Math.random() * paragraphs.length);
        typingTextElement.innerHTML = "";
        paragraphs[randomIndex].split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            typingTextElement.appendChild(span);
        });
        typingTextElement.querySelectorAll("span")[0].classList.add("active");
    }

    function initTyping() {
        const characters = typingTextElement.querySelectorAll("span");
        const typedChar = inputField.value.split("")[charIndex];

        if (charIndex < characters.length - 1 && timeLeft > 0) {
            if (!isTyping) {
                timer = setInterval(startTimer, 1000);
                isTyping = true;
            }
            if (typedChar == null) {
                if (charIndex > 0) {
                    charIndex--;
                    if (characters[charIndex].classList.contains("incorrect")) {
                        mistakes--;
                    }
                    characters[charIndex].classList.remove("correct", "incorrect");
                }
            } else {
                if (characters[charIndex].innerText === typedChar) {
                    characters[charIndex].classList.add("correct");
                } else {
                    mistakes++;
                    characters[charIndex].classList.add("incorrect");
                }
                charIndex++;
            }
            characters.forEach(span => span.classList.remove("active"));
            characters[charIndex].classList.add("active");

            mistakeElement.innerText = mistakes;
            cpmElement.innerText = charIndex - mistakes;
            wpmElement.innerText = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        } else {
            inputField.value = "";
            clearInterval(timer);
        }
    }

    function startTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            timeLeftElement.innerText = timeLeft;
            wpmElement.innerText = Math.round(((charIndex - mistakes) / 5) / ((maxTime - timeLeft) / 60));
        } else {
            clearInterval(timer);
        }
    }

    function resetGame() {
        randomParagraph();
        inputField.value = "";
        clearInterval(timer);
        timeLeft = maxTime;
        charIndex = 0;
        mistakes = 0;
        isTyping = false;
        timeLeftElement.innerText = timeLeft;
        mistakeElement.innerText = mistakes;
        wpmElement.innerText = 0;
        cpmElement.innerText = 0;
    }

    randomParagraph();
    inputField.addEventListener("input", initTyping);
    tryAgainButton.addEventListener("click", resetGame);
    typingTextElement.addEventListener("click", () => inputField.focus());
});
