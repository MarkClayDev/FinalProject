const gameContainer = document.querySelector(".container"),
userResult = document.querySelector(".user_result img"),
compResult = document.querySelector(".computer_result img"),
result = document.querySelector(".result"),
optionImages = document.querySelectorAll(".option_image");


//loop
optionImages.forEach((image, index) =>{
    image.addEventListener("click", (e) => {
        image.classList.add("active");

        optionImages.forEach((image2,index2) => {

            index !== index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

        let time = setTimeout(() => {
            gameContainer.classList.remove("start");
            let imageSrc = e.target.querySelector("img").src;
        userResult.src = imageSrc 


        let randomNumber = Math.floor(Math.random() * 3);
        // for checking if working yung  random number console.log(randomNumber);
        let compImages = ["rock.png", "paper.png", "scissor.png"];
        compResult.src = compImages [randomNumber];

        let compValue = ["R", "P", "S"] [randomNumber];
        let userValue = ["R", "P", "S"] [index];


        let outcomes = {
            RR: "DRAW",
            PP: "DRAW",
            SS: "DRAW",
            PR: "USER",
            RS: "USER",
            SP: "USER",
            RP: "COMPUTER",
            SR: "COMPUTER",
            PS: "COMPUTER",
        };
        let outComeValue = outcomes[userValue + compValue];
 
        result.textContent = userValue === compValue ? "Match Draw": `${outComeValue} Won!!`
        console.log(outComeValue);
    },
2500);


    });
});




