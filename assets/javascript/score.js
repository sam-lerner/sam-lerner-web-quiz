// High scores page info
var bodyCont = document.querySelector("body");
var headCont = document.querySelector('header');
var heroCont = document.querySelector("#hero");
var topTen = document.getElementById("top-ten");
var winnerSheet = document.getElementById("winners");

// Formatting the page elements
bodyCont.setAttribute("style", "color: white; background:black;");
headCont.setAttribute("style", "display: flex; justify-content: center; padding: 2% 10% 0;");
heroCont.setAttribute("style", "display: flex; justify-content: space-between; margin: 20px; border: 3px solid blue; padding: 0 5%;");
winnerSheet.setAttribute("style", "text-align: center; color: white; margin: 5% 30% 0%; border: 2px solid blue; padding: 0 5%;");
topTen.setAttribute("style", "text-align: center; font-size: 22px;");

// Generate the top ten list:
function renderTopTen() {
    var savedScore = JSON.parse(localStorage.getItem("High Score") || []);
    for (var i = 0; i < savedScore.length; i++) {
        var winners = document.createElement("li");
        winners.innerHTML = savedScore[i].initials + " - " + savedScore[i].score;
        topTen.appendChild(winners);
        console.log(savedScore)
    }
}

renderTopTen();