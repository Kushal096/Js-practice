document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("btn").addEventListener("click", (event) => {
        startGame(event);
    });
});

document.getElementById("leaderboard").addEventListener("click", leaderboard);


function startGame(e) {
    e.preventDefault();
    const name = document.getElementById("name").value
    const level = document.getElementById("difficulty").value
    let check = true
    if (name == ""  || level == 0){
        snackBar("Login Error !")
    }
    else{
        for (let key of Object.keys(localStorage) ){

        
            const gameData = localStorage.getItem(key);
            try {
                const newGameData = JSON.parse(gameData);
                if (newGameData.playerName == name) {
                    newGameData.playerLevel = level;
                    localStorage.setItem(key, JSON.stringify(newGameData));
                    localStorage.setItem("LastSign", JSON.stringify(newGameData.playerName))
                    check = false;
                    window.location.replace("index.html")
                    break
                }
                
            } catch (e) {
                console.log("An error occured :", e)
            }
        }
    
        if (check){
            let gameData = {
            playerName : name,
            playerLevel :level
            }
        localStorage.setItem(localStorage.length+1,JSON.stringify(gameData))
        localStorage.setItem("LastSign", JSON.stringify(gameData.playerName))
        window.location.replace("index.html")
            
        
        }

        
    }

}

function leaderboard(){
    const newDiv = document.createElement("div")
    newDiv.classList.add("dashboard")
    const h2 = document.createElement("h2")
    h2.innerText = "Top 10 Players:- "
    const img = document.createElement("p");
    img.id = "backButton"
    img.innerHTML = '<i class="fa-solid fa-square-xmark"></i>'
    h2.appendChild(img);
    
    h2.appendChild(img);
    newDiv.appendChild(h2)
    document.body.appendChild(newDiv)
    document.getElementById("backButton").addEventListener("click",() => {
        document.body.removeChild(newDiv)
    })
    let leaders = top10()
    leaders.sort().reverse();
    const ol = document.createElement("ol");
    for (const score of leaders) {
        const li = document.createElement("li");
        li.innerText = score;
        ol.appendChild(li);
    }
    newDiv.appendChild(ol);
    if (leaders.length === 0) {
        const p = document.createElement("p");
        p.innerText = "No players in the leaderboard yet.";
        newDiv.appendChild(p);
    }
}


function top10(){
    arr = []
    for (key of Object.keys(localStorage)){
        const gameData = localStorage.getItem(key)
        const newGameData = JSON.parse(gameData)
        try {
            if ("score" in newGameData){
                arr.push(`${newGameData.playerName} : ${newGameData.score}`)
            }
        }
        catch(e){
            console.log(`Error occured : ${e}`)
        }
    return arr
    }
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


