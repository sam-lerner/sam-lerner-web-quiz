// These are the questions:
var qaBank = [
    {
        question: "Arrays in JavaScript can be used to store __________.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correct: "all of the above"
    },
    {
        question: "String values must be enclosed within __________ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parentheses"],
        correct: "quotes"
    },
    {
        question: "A block of code designed to perform a task can be referred to as a __________.",
        answers: ["function", "variable", "parameter", "construction"],
        correct: "function"
    },
    {
        question: "____ is the first stored value in an arra.",
        answers: ["[i]", "[0]", "[a]", "[1]"],
        correct: "[0]"
    },
    {
        question: "When we open a webpage, the browser creates an object tree of the page referred to as the ______.",
        answers: ["API", "camelCase", "DOM", "GUI"],
        correct: "DOM"
    },
]
// Starting variables:
var userScore = 0;
var currentQuestion = 0;
var timeLeft = 30;
var startButton = document.querySelector('#start-button');
var questionArea = document.querySelector('#question-title');
var questionBody = document.querySelector('#question-body');
var resultText = document.querySelector('#result');
var scoreL = document.querySelector("#score");
var timerEl = document.getElementById("countdown");
var quizCont = document.getElementById('quiz-container');
var bodyCont = document.querySelector("body");
var headCont = document.querySelector('header');
var heroCont = document.querySelector("#hero");
var userInitial = document.getElementById("user-initial");
var highScore = document.getElementById("high-score");
var winnerSheet = document.getElementById("winners");

// Formatting page elements
bodyCont.setAttribute("style", "color: white; background:black;")
headCont.setAttribute("style", "display: flex; justify-content: center; padding: 2% 10% 0;")
heroCont.setAttribute("style", "display: flex; justify-content: space-between; margin: 0 2px; border: 3px solid blue; padding: 0 5%;")
quizCont.setAttribute("style", "text-align: center; color: white; background: dark gray; margin: 10% 30%;border: 2px solid blue; padding: 0 5%;");
questionBody.setAttribute("style", "text-align: left; padding: 1% 15%; cursor: crosshair;");
timerEl.setAttribute("style", "float: right;");
scoreL.setAttribute("style", "font-weight: bolder;");

// On load, show starting time and score of 0
timerEl.textContent = timeLeft + " seconds remaining";
// scoreL.innerHTML = "Current score: " + userScore;

// This is how questions display:
function renderCurrentQuestion() {
    questionArea.textContent = qaBank[currentQuestion].question;
    questionBody.innerHTML = `<li>${qaBank[currentQuestion].answers[0]}</li>
    <li>${qaBank[currentQuestion].answers[1]}</li>
    <li>${qaBank[currentQuestion].answers[2]}</li>
    <li>${qaBank[currentQuestion].answers[3]}</li>`;

}
// Timer
function countdown() {

    var timeInterval = setInterval(function () {

        // This line counts down the variable timeLeft
        timeLeft--;
        // This diplays the remaining time with the message
        timerEl.textContent = timeLeft + " seconds remaining";
        // This starts the displayMessage functon when time runs out.
        if (timeLeft === 0) {
            //  Clear out the timer to prevent memory leaks
            clearInterval(timeInterval);
            // Clear the timer text from the screen
            timerEl.textContent = "";
            endGame();
        }
    }, 1000);
}


// This is the actual start of the quiz
startButton.addEventListener('click', function () {
    console.log("Quiz started");
    // userInitial.textContent = "";
    startButton.style.display = "none";
    renderCurrentQuestion();
    countdown();
});

document.addEventListener("click", checkForAnswer);

function checkForAnswer(event) {
    if (event.target.matches("li")) {
        console.log(event.target);
        if (event.target.textContent === qaBank[currentQuestion].correct) {
            console.log('thats the right answer')
            resultText.innerHTML = "Correct!"
            currentQuestion++;
            // What happens if we run out of questions?
            if (currentQuestion < qaBank.length) {
                renderCurrentQuestion();
                // Add 10 seconds to the counter
                timeLeft += 10;
            }
            else {
                endGame();
            }

            //Wrong answer
        } else {
            console.log("wrong answer");
            resultText.innerHTML = "Wrong!"
            if (timeLeft >= 5) {
                timeLeft -= 5;
            }
        }

    }
}
// End of game housekeeping
function endGame() {
    userScore = +timeLeft;
    console.log("Final score: " + userScore);
    scoreL.innerHTML = "Final score: " + userScore;
    questionBody.innerHTML = "";
    resultText.innerHTML = "";
    clearInterval(timeLeft);
    timerEl.textContent = "";
    quizCont.style.display = "none";
    timerEl.style.display = "none";
    highScore.setAttribute("style", "text-align: center; color: white; background: dark gray; margin: 10% 30%;border: 2px solid blue; padding: 0 5%;");
}
// Entry for high score form
function storeScore(event) {
    event.preventDefault();
    console.log("Starting storeScore")
    if (userInitial.value === "") {
        alert("Please enter initials!");
        return;
    }


    // Store score in local storage
    var savedScore = localStorage.getItem("High Score");
    var scoresArray;

    if (savedScore === null) {
        scoresArray = [];
    } else {
        scoresArray = JSON.parse(savedScore);
    }

    var currentScore = {
        initials: userInitial.value,
        score: userScore.textContent
    };
    scoresArray.push(savedScore);
    console.log(savedScore);

    // Local set
    var scoreString = JSON.stringify(scoresArray);
    window.localStorage.setItem("High Score");
    window.open("./score-entry.html");
}
