var ApiUrl = 'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple';

let index = 0;
let data;
let dataSize = 0;
let wrongAnswersCount = 0;

let answers = [];
let correctAnswerIndex;

let score = 0;
let finished = false;

async function getApi(ApiUrl) {
    const response = await fetch(ApiUrl);
    data = await response.json();
    dataSize = Object.keys(data["results"]).length;
    wrongAnswersCount = Object.keys(data["results"][index]["incorrect_answers"]).length;

    document.getElementById("hide1").style.display = "block";
    document.getElementById("hide2").style.display = "none";
    update();
}

function decode(encodedString) {
    var tmpElement = document.createElement('span');
    tmpElement.innerHTML = encodedString;

    return tmpElement.innerHTML;
}

function update() {
    if (index + 1 <= dataSize) {
        document.querySelector("#question").innerText = decode(data["results"][index]["question"]);
        document.querySelector("#count").innerText = index + 1 + "/" + dataSize;

        correctAnswerIndex = Math.floor(Math.random() * (wrongAnswersCount + 1))

        for (let i = 0; i < wrongAnswersCount; i++) {
            answers[i] = data["results"][index]["incorrect_answers"][i];
        }
        answers.splice(correctAnswerIndex, 0, data["results"][index]["correct_answer"]);

        index++;
    }
    else {
        document.getElementById("hide1").style.display = "none";
        document.getElementById("hide2").style.display = "block";

        document.querySelector("#title").innerText = "Congradulations, you answered " + score + "/" + dataSize + " questions correctly.";
        document.querySelector("#startButton").innerText = "Play 1 more time";

        finished = true;
    }

    document.querySelector("#button1").innerText = decode(answers[0]);
    document.querySelector("#button2").innerText = decode(answers[1]);
    document.querySelector("#button3").innerText = decode(answers[2]);
    document.querySelector("#button4").innerText = decode(answers[3]);
}


function correctAnswer(index) {
    if (index == correctAnswerIndex) {
        score++;
    }
}

document.querySelector("#button1").onclick = function () {
    correctAnswer(0);
    update();
}
document.querySelector("#button2").onclick = function () {
    correctAnswer(1);
    update();
}
document.querySelector("#button3").onclick = function () {
    correctAnswer(2);
    update();
}
document.querySelector("#button4").onclick = function () {
    correctAnswer(3);
    update();
}

document.querySelector("#startButton").onclick = function () {

    if (finished) {
        score = 0;
        index = 0;
        finished = false;
    }
    getApi(ApiUrl);
}


