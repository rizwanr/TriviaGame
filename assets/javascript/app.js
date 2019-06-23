//Get all the elements from the DOM - as we need to update the inner HTML
var start = $('#start')
var quiz = $('#quiz');
var question = $('#question')
var counter = $('#counter')
var timeGuage = $('#timeGauge')
var choiceA = $('#A')
var choiceB = $('#B')
var choiceC = $('#C')
var progress = $('#progress')
var score = $('#scorecontainer')

//Create questions, choices and correct inside an array 
const questions = [{
    question: "Where would you go if you wanted to see a whale? ",
    choiceA: "Alberta",
    choiceB: "British Columbia",
    choiceC: "Saskatchewan",
    correct: "B"

  },
  {
    question: "Where would you go if you wanted to see a whale? ",
    choiceA: "Alberta",
    choiceB: "British Columbia",
    choiceC: "Saskatchewan",
    correct: "B"

  },
  {
    question: "If you wanted to see a loon, where would you go?",
    choiceA: "a farm",
    choiceB: "a lake",
    choiceC: "a forest",
    correct: "B"

  },
]

//#Render question on the screen

//1. last question is the length of the question-1 in the array 
let lastQuestionIndex = questions.length - 1;
//2. current question that the user is viewing; setting to zero
let currectQuestionIndex = 0;

function renderQuestion() {
  //select the  question at index 0 -display first question
  while (currectQuestionIndex <= lastQuestionIndex) {
    let q = questions[currectQuestionIndex];
    $('#question').text = q.question
    question.html("<p>" + q.question + "</p>")
    choiceA.text(q.choiceA);
    choiceB.text(q.choiceB);
    choiceC.text(q.choiceC)
    currectQuestionIndex++
  }


}

//Render progressBar 
function renderProgressBar() {
  for (var qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
    progress.html("<div>" + qIndex + "</div>")
  }
}

//render correct answer on the progressBar
function answerIsCorrect() {
  document.getElementById(currectQuestionIndex).style.backgroundColor = "green"
}

//render answerIsWrong
function answerIsCorrect() {
  document.getElementById(currectQuestionIndex).style.backgroundColor = "red"
}