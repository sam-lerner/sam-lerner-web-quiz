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
            // Call the message
            displayMessage()
            // Clear the timer text from the screen
            timerEl.textContent = "";
        }
    }, 500);
}

// Function for running out of time
function displayMessage() {
    questionArea.innerHTML = "Time's up!";
    questionBody.innerHTML = "";
    scoreL.innerHTML = "Final score: " + userScore;
}

// we want to use "delegation" when dealing with eventlisteners and dynamic elemnts on the dom.
//how delegation works is we attach the event listener directly to the dom and then filter thru it to make sure its acutally clicking on the desired target.

startButton.addEventListener('click', function () {
    console.log("Quiz started");
    scoreL.innerHTML = "Current score: " + userScore;
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
            // Points scored based on remaining time
            userScore += timeLeft;
            // Add 10 seconds to the counter
            timeLeft += 10;
            scoreL.innerHTML = "Current score: " + userScore;
            console.log(userScore);

            //Wrong answer
        } else {
            console.log("wrong answer");
            resultText.innerHTML = "Wrong!"
            if (timeLeft >= 5) {
                timeLeft -= 5;
            }
        }

        currentQuestion++;
        renderCurrentQuestion();
    }
}