//Step 1: Get all the elements from the DOM - as we need to update the inner HTML
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

//variable for storing question time- 15sec
var questionTime = 10;
//size of the time Gauge - 150px
var gaugeWidth = 150
//Initialize the count to zero sec
var count = 0;
// This causes the time Guage to increment by 15 px at a time 
var gaugeProgress = gaugeWidth / questionTime


//Step:2 Create questions, choices and correct inside an array 
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

//#Step 3 : Render question on the screen

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
  $(this).css('background-color', 'green')
  // document.getElementById(currectQuestionIndex).style.backgroundColor = "green"
}

//render answerIsWrong
function answerIsWrong() {
  $(this).css('background-color', 'red')
  //document.getElementById(currectQuestionIndex).style.backgroundColor = "red"
}

//
let TIMER = setInterval(renderCounter, 1000)

//Step 4: render Counter
function renderCounter() {
  //if the count is less than equal to 10sec
  if (count <= questionTime) {
    //update the count(time) and progressbar
    counter.html(count);
    timeGuage.css("width", gaugeProgress * count + "px")
    count++
  } else {
    //if the question time is exceeded, we have to set the count to zero
    count = 0;
    //if the question time is exceeded and no answer, then the answer is wrong
    answerIsWrong();
    //if current question index is less than last question index, then there are still questions left
    if (currectQuestionIndex < lastQuestionIndex) {
      currectQuestionIndex++;
      renderQuestion();
    } else {
      //clear the interval and show the score
      clearInterval(TIMER)
      renderScore()
    }
  }

}

//Step 5 checkAnswer funtion
let score = 0;

//function takes in the choices as arguement
function checkAnswer(answer) {
  if (questions[currectQuestionIndex].correct === answer) {
    score++
    answerIsCorrect();
  } else {
    answerIsWrong();
    //move to next questions
    if (currectQuestionIndex < lastQuestionIndex) {
      count = 0;
      currectQuestionIndex++;
      renderQuestion();

    } else {
      //clear the interval and show the score
      clearInterval(TIMER);
      showScore();
    }

  }
}