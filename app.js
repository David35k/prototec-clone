//Correct answers
let correctAnswers = [];

//The variable that will store the score and the element that holds it and the text
let score = 0;
let scoreSubmit = document.getElementById("score");
const scoreText = document.getElementById("scoreText");

//Get check, submit and generate buttons
const checkButton = document.getElementById("checkButton");
const submitButton = document.getElementById("submitButton");
const generateButton = document.getElementById("generateButton");

//Get all of the correct/wrong messages and store them in two separate arrays
const correctMessages = document.getElementsByClassName("message-correct");
const wrongMessages = document.getElementsByClassName("message-wrong");

//Get all of the elements that contain information submitted by user about generating the quiz
const numOfQuestionsSubmitted = document.getElementById("numOfQuestions");
const mathOperationSubmitted = document.getElementById("operation");

//Get the div element in which the questions will be
const element = document.getElementById("questions");

//Get the comment section
const commentSection = document.getElementById("commentSection");

//Number of questions per group
const groupNum = 5;

let generateRandom = false;
let questionNumber = 0;
let remainingQuestions = 0;

//Variables and elements for the stopwatch
let seconds = 00;
let tens = 00;
let Interval;

let appendTens = document.getElementById("tens");
let appendSeconds = document.getElementById("seconds");
let timeText = document.getElementById("timeText");

let timeSubmit = document.getElementById("time");

generateButton.addEventListener("click", function () {

    //First remove any questions that might be there from last time
    while (element.lastElementChild) {
        element.removeChild(element.lastChild);
    }

    //Then remove the correct answers if there are any and more room for new ones
    while (correctAnswers.length > 0) {
        correctAnswers.pop();
    }

    generateRandom = false;

    remainingQuestions = 0;
    remainingQuestions += numOfQuestionsSubmitted.value;

    if (numOfQuestionsSubmitted.value > 100) {
        numOfQuestionsSubmitted.value = 100;

    } else if (numOfQuestionsSubmitted.value < 1) {
        numOfQuestionsSubmitted.value = 01;
    }

    generateQuestions(numOfQuestionsSubmitted.value, mathOperationSubmitted.value);

    //Make the check button appear
    checkButton.classList.add("appear");

    questionNumber = 0;

    //Start the stopwatch and make the time show up
    clearInterval(Interval);
    tens = "00";
    seconds = "00";
    appendTens.innerHTML = tens;
    appendSeconds.innerHTML = seconds;
    Interval = setInterval(startTimer, 10);
    timeText.classList.add("appear");

});

function startTimer() {
    tens++;

    if (tens <= 9) {
        appendTens.innerHTML = "0" + tens;
    }

    if (tens > 9) {
        appendTens.innerHTML = tens;

    }

    if (tens > 99) {
        seconds++;
        appendSeconds.innerHTML = "0" + seconds;
        tens = 0;
        appendTens.innerHTML = "0" + 0;
    }

    if (seconds > 9) {
        appendSeconds.innerHTML = seconds;
    }
}

//This will loop and create the number of questions that the user wanted
function generateQuestions(num, operation) {
    for (let i = 0; i < num / groupNum; i++) {
        //Create the card
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = "card";

        if (remainingQuestions > groupNum) {

            for (let a = 0; a < groupNum; a++) {
                remainingQuestions--;
                makeQuestion(operation, card);

            }
        } else {
            for (let a = 0; a < remainingQuestions; a++) {
                makeQuestion(operation, card);

            }
        }
    }
}

//When the check button is clicked, compare it to the actual answer log the correct word
checkButton.addEventListener("click", function () {
    //Start off with 0 score
    score = 0;

    //Get all of the answers submitted by user and store them in an array
    const answer = document.getElementsByClassName("answer");

    //When the check button is clicked, make the submit button available
    submitButton.classList.add("appear");

    //Make the comment section appear
    commentSection.classList.add("appear");

    //Loop through all of the answers submitted and compare them to the array of correct answers
    for (let i = 0; i < correctAnswers.length; i++) {
        if (answer[i].value == correctAnswers[i] && answer[i].value != "") {
            //If the answer submitted is correct make the according message appear
            correctMessages[i].classList.add("appear");
            wrongMessages[i].classList.remove("appear");
            //Also add to the score
            score++;
            scoreSubmit.setAttribute("value", score + "/" + numOfQuestionsSubmitted.value);
        } else {
            //If the answer submitted is wrong make the according message appear
            wrongMessages[i].classList.add("appear");
            correctMessages[i].classList.remove("appear");
        }
    }

    //Make the score test show the correct score and appear
    scoreText.innerHTML = "Score: " + score + "/" + numOfQuestionsSubmitted.value;
    scoreText.classList.add("appear");

    checkButton.classList.remove("appear");

    //Stop the stopwatch
    clearInterval(Interval);

    //timeSubmit.setAttribute("value", seconds + ":" + tens);
    timeSubmit.value = seconds + ":" + tens;
});

//Checks if check button is not found
if (checkButton == null) {
    console.log("check button is null");
}

//Checks if submit button is not found
if (submitButton == null) {
    console.log("submit button is null");
}

//The function for getting a random number
//It uses Math.Random() but since that only makes numbers 
//that are from 0 to 1 it multiplies the number by maximum and rounds to get the number
//Zero is a very easy number to solve with every operation so this will only generate numbers above 0
//Also 0/0 can't be solved
function getRandomInt(max) {
    return max - Math.floor(Math.random() * max);
}

//If the user wants a mixed quiz then it should randomly select operations
function getRandomOperation() {

    generateRandom = true;

    let random = getRandomInt(5);

    if (random <= 1) {
        return "+";
    } else if (random == 2) {
        return "-";
    } else if (random == 3) {
        return "*";
    } else if (random == 4) {
        return "/";
    }
}

//Make it so you can't submit with enter key
const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

});

submitButton.addEventListener('click', function () {
    form.submit();

});

function makeQuestion(operation, card) {



    let num1;
    let num2;
    let divisonNumber;
    let solution;

    questionNumber += 1;

    if (operation == "mixed") {

        operation = getRandomOperation();

        while (operation == undefined) {
            operation = getRandomOperation();
        }

        generateRandom = true;

    }

    //Create the random numbers for the question and the answer
    //Question will have to be different for multiplication and division
    if (operation == "+" || operation == "-") {
        num1 = getRandomInt(21);
        num2 = getRandomInt(21);

    } else if (operation == "*") {
        num1 = getRandomInt(11);
        num2 = getRandomInt(11);

    } else if (operation == "/") {
        num2 = getRandomInt(11);
        divisonNumber = getRandomInt(11);
        num1 = num2 * divisonNumber;

    }

    solution = eval(num1 + operation + num2);

    correctAnswers.push(solution);

    //Create the question
    const para = document.createElement("h3");
    const node = document.createTextNode(questionNumber + ") " + num1 + " " + operation + " " + num2);
    para.appendChild(node);

    //Create the number input for question
    const questionInput = document.createElement("input");
    questionInput.setAttribute("type", "number");
    questionInput.classList.add("answer");

    //Add a line gap
    const gap = document.createElement("br");

    //Add the correct and wrong text
    const correctText = document.createElement("p");
    const correctTextNode = document.createTextNode("Correct!");
    correctText.classList.add("message-correct");
    correctText.appendChild(correctTextNode);

    const wrongText = document.createElement("p");
    const wrongTextNode = document.createTextNode("Wrong");
    wrongText.classList.add("message-wrong");
    wrongText.appendChild(wrongTextNode);

    //Add all of the above into the card
    card.appendChild(para);
    card.appendChild(questionInput);
    card.appendChild(correctText);
    card.appendChild(wrongText);
    card.appendChild(gap);

    element.appendChild(card);

    //Make it appear
    element.classList.add("appear");

    if (generateRandom) {
        operation = "mixed";
    }

    generateRandom = false;
}