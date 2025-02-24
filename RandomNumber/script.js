document.addEventListener("DOMContentLoaded", function() {
    const guessButton = document.getElementById("btn");
    guessButton.addEventListener("click", (event) => { guessBtn(event) });

    const rulesButton = document.getElementById("rulesBtn");
    rulesButton.addEventListener("click", () => { rules() });

    const saveDataButton = document.getElementById("saveBtn");
    saveDataButton.addEventListener("click", saveGameData);

    const newGameButton = document.getElementById("newGameBtn");
    newGameButton.addEventListener("click", (event) =>newGame(event));
});


const api_key = "AIzaSyD3vmPyz6FJg3pxLMgr9v9AyeSaEV4MoNg";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`;
let randomNumber = null

async function hint(guess) {
    const input = document.getElementById("input");
    const maxValue = Number(input.getAttribute("max"));
    let prompt;

    switch (maxValue) {
        case 50:
            prompt = `I'm playing a number guessing game between 0 and 100.  
            My guess: ${guess}, Actual number: ${randomNumber}.  
            Give me a hint in 10-15 words.  
            Provide a clear, easy clue—something straightforward from basic math, science, or everyday knowledge. Avoid number or prime references.`;
            break;
        case 100:
            prompt = `I'm playing a number guessing game between 0 and 100.  
            My guess: ${guess}, Actual number: ${randomNumber}.  
            Give me a hint in 10-15 words.  
            Provide an abstract clue, referring to concepts like geometry, physics, or nature. Avoid direct number references but use metaphors or comparisons.`;
            break;
        case 200:
            prompt = `I'm playing a number guessing game between 0 and 100.  
            My guess: ${guess}, Actual number: ${randomNumber}.  
            Give me a cryptic hint in 10-15 words.  
            Incorporate abstract or advanced ideas like chaos theory, quantum mechanics, or paradoxes. The hint should be difficult and thought-provoking.`;

            break;
        default:
            prompt = `I'm guessing a number in a game. My guess is ${guess}, and the number is ${randomNumber}.  
            Give me an unexpected hint in no more than 10 words.  
            Make it intriguing, using a riddle, fun fact, or concept from any field, but no obvious number or prime clues.`;
            
    }
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();
        
        if (data.candidates && data.candidates.length > 0) {
            document.getElementsByClassName("hints")[0].innerHTML= data.candidates[0].content.parts[0].text.trim();
            input.disabled = false
        } else {
            console.log("No hint received from API.");
        }
    } catch (error) {
        console.error("Error fetching hint:", error);
    }
}

function randomNum(){
    if (randomNumber === null){
        let maxValue = Number(document.getElementById("input").getAttribute("max"));
        randomNumber = Math.floor(Math.random() * (maxValue+1));
        console.log(randomNumber)
    }

}

let totalGames;
(function automatic(){
    const name = localStorage.getItem("LastSign");
    const newName = JSON.parse(name);
    const heading = document.getElementById("heading")
    const input = document.getElementById("input");
    input.setAttribute("min", 0);
    if (name) {
        for (let i of Object.keys(localStorage)){
            const gameData = localStorage.getItem(i);
            if (gameData) {
                const newGameData = JSON.parse(gameData);
                if (newName == newGameData.playerName ){
                    const level = newGameData.playerLevel;
                    switch(level){
                        case "1" : {
                            input.setAttribute("max", 50);
                            heading.innerText = "Guess the number between 0 and 50"
                            break;
                        }
                        case "2" : {
                            input.setAttribute("max", 100);
                            heading.innerText = "Guess the number between 0 and 100"
                            break;
                        }
                        case "3" : {
                            input.setAttribute("max", 200);
                            heading.innerText = "Guess the number between 0 and 200"
                            break;
                        }
                    }
                    randomNum();

                    if (newGameData.score){
                        const newP = document.createElement("p");
                        newP.id = "scoreId"
                        document.getElementsByClassName("yourScore")[0].appendChild(newP);
                        newP.innerText = `${newGameData.score}`;
                    }
                    else{
                        const newP = document.createElement("p");
                        newP.id = "scoreId"
                        newP.innerText = 0;
                        document.getElementsByClassName("yourScore")[0].appendChild(newP);
                    }
                    if(newGameData.winRate){
                        const newP = document.createElement("p");
                        newP.id = "winRateId"
                        const newP2 = document.createElement("p");
                        newP2.id = "winRateId2"
                        newP2.innerText = "%";
                        document.getElementsByClassName("winRate")[0].appendChild(newP);
                        document.getElementsByClassName("winRate")[0].appendChild(newP2);
                        newP.innerText = `${newGameData.winRate}`;
                        
                    }
                    else{
                        const newP = document.createElement("p");
                        newP.id = "winRateId"
                        const newP2 = document.createElement("p");
                        newP2.id = "winRateId2"
                        newP2.innerText = "%";
                        newP.innerText = 0;
                        document.getElementsByClassName("winRate")[0].appendChild(newP);
                        document.getElementsByClassName("winRate")[0].appendChild(newP2);
                    }

                    if(newGameData.totalGames){
                        totalGames = Number(newGameData.totalGames)
                    }
                    else{
                        totalGames = 0
                    }
                    if (newGameData.gameWin){
                        const newP = document.createElement("p");
                        newP.id = "gameWonId"
                        document.getElementsByClassName("gameWon")[0].appendChild(newP);
                        newP.innerText = `${newGameData.gameWin}`;
                    }
                    else{
                        const newP = document.createElement("p");
                        newP.id = "gameWonId"
                        newP.innerText = 0;
                        document.getElementsByClassName("gameWon")[0].appendChild(newP);
                        
                    }
                }
            }
        }
    }
    else {
        console.error("LastSign is not found in localStorage");
    }
})();


function valideInput(input) {
    
    let minValue = input.getAttribute("min");
    let maxValue = input.getAttribute("max")
    if(Number(input.value) < Number(minValue)){
            input.value = minValue;
    }
    else if(Number(input.value) > Number(maxValue)){
        input.value = maxValue;
    }
}




function checkWin(guess){
    if (guess == randomNumber){
        gameWin()
        const input = document.getElementById("input");
        input.disabled= true

    }
    else{
        
        checkAttempts();
    }

}


function score(isWin) {
    const scoreBox = document.getElementById("scoreId");
    let currentScore = parseInt(scoreBox.innerText);

    const input = document.getElementById("input");
    const maxValue = Number(input.getAttribute("max"));

    if (isWin) {
        switch (maxValue) {
            case 50:
                currentScore += 10;
                break;
            case 100:
                currentScore += 30;
                break;
            case 200:
                currentScore += 50;
                break;
        }
    } else {
        switch (maxValue) {
            case 50:
                currentScore -= 5;
                break;
            case 100:
                currentScore -= 10;
                break;
            case 200:
                currentScore -= 20;
                break;
        }
    }

    scoreBox.innerText = currentScore;
}

function winRate(){
    totalGames += 1;
    let wonGames = Number(document.getElementById("gameWonId").innerText); 
    let winRateBox = document.getElementById("winRateId");
    winRateBox.innerText = (Number(wonGames) / Number(totalGames)) * 100;
    console.log(wonGames)
    console.log(totalGames)
}




function guessBtn(event){
    event.preventDefault();
    let inputElement = document.getElementById("input");
    let input = inputElement.value;
    if (input == ''){
        snackBar("Guessed number is empty")
        return
        
    }
    prevValue(input);
    checkWin(input);
    inputElement.disabled = true
    hint(input);
    
    
    

    inputElement.value = '';
}

let i = 1
function prevValue(guessedNumber){
    let newP = document.createElement("p")
    newP.id = "prevId"
    document.getElementsByClassName("prevGuess")[0].appendChild(newP)
    newP.innerText = ` Guess ${i} = ${guessedNumber}`
    i++;
}

function checkAttempts() {
    const input = document.getElementById("input");
    const maxValue = Number(input.getAttribute("max"));
    let maxAttempts;

    switch (maxValue) {
        case 50:
            maxAttempts = 5;
            break;
        case 100:
            maxAttempts = 7;
            break;
        case 200:
            maxAttempts = 10;
            break;
        default:
            maxAttempts = 5;
    }

    if (i > maxAttempts) {
        snackBar("Limit reached, Correct number is " + randomNumber);
        score(false);
        input.disabled = true;
        winRate()
    }
}

function gameWin(){
    let gameBox = document.getElementById("gameWonId");
    gameBox.innerText = `${parseInt(gameBox.innerText) + 1}`;
    score(true);
    winRate()
    

}


function saveGameData(){
    const name = localStorage.getItem("LastSign")
    const newName = JSON.parse(name);
    const gameBox = document.getElementById("gameWonId").innerText
    const scoreBox = document.getElementById("scoreId").innerText
    const winRateBox = document.getElementById("winRateId").innerText
    if (name) {
        for (let i of Object.keys(localStorage)){
            const gameData = localStorage.getItem(i);
            if (gameData) {
                const newGameData = JSON.parse(gameData);
                if (newGameData.playerName == newName){
                    newGameData.gameWin = gameBox;
                    newGameData.score = scoreBox;
                    newGameData.winRate = winRateBox;
                    newGameData.totalGames = totalGames;
                    localStorage.setItem(i,JSON.stringify(newGameData))
                    
                }
            }
        
        }
    }
}



let rulesChange = true;
function rules() {
    const input = document.getElementById("input");
    const maxValue = Number(input.getAttribute("max"));
    let rulesText;
    

    switch (maxValue) {
        case 50:
            rulesText = "Level 1: Guess the number between 0 and 50. You have 5 attempts.: Win +10 points, Lose -5 points. Win by guessing the correct number within 5 attempts.";
            break;
        case 100:
            rulesText = "Level 2: Guess the number between 0 and 100. You have 7 attempts. Scoring: Win +30 points, Lose -10 points. Win by guessing the correct number within 7 attempts.";
            break;
        case 200:
            rulesText = "Level 3: Guess the number between 0 and 200. You have 10 attempts.Scoring: Win +50 points, Lose -20 points. Win by guessing the correct number within 10 attempts.";
            break;
        default:
            rulesText = "Invalid level.";
            
    }


    let rulesContainer = document.getElementById("rulesContainer");
    if (!rulesContainer) {
        rulesContainer = document.createElement("div");
        rulesContainer.id = "rulesContainer";
    }
    if (rulesChange) {
        document.body.appendChild(rulesContainer);
        rulesContainer.innerText = rulesText;
        rulesChange = false;
    } else {
        document.body.removeChild(rulesContainer);
        rulesChange = true;
    }
    
}

function newGame(event) {
    event.preventDefault();
    window.location.replace("login.html");
}



const snackBar = (message) => {
    const snackBarContainer = document.createElement("div");
    snackBarContainer.className = "snackbar";
    snackBarContainer.innerText = message;

    document.body.appendChild(snackBarContainer);
    snackBarContainer.classList.add("show");
    setTimeout(() => {
        snackBarContainer.classList.remove("show");
        document.body.removeChild(snackBarContainer);
    }, 3000);
}