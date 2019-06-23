//Step 1: Get all the elements from the DOM - as we need to update the inner HTML
var start = $('#start');
var quiz = $('#quiz');
var question = $('#question');
var counter = $('#counter');
var timeGuage = $('#timeGauge');
var choiceA = $('#A');
var choiceB = $('#B');
var choiceC = $('#C');
var progress = $('#progress');
var scoreDiv = $('#scoreContainer');
var endGameDiv = $('#endGame');

//variable for storing question time- 15sec
var questionTime = 10;
//size of the time Gauge - 150px
var gaugeWidth = 150;
//Initialize the count to zero sec
var count = 0;
// This causes the time Guage to increment by 15 px at a time
var gaugeProgress = gaugeWidth / questionTime;

//Step:2 Create questions, choices and correct inside an array
const questions = [
  {
    question: 'Where would you go if you wanted to see a whale? ',
    choiceA: 'Alberta',
    choiceB: 'British Columbia',
    choiceC: 'Saskatchewan',
    correct: 'B'
  },
  {
    question: 'What is the Name Canada’s highest mountain',
    choiceA: 'Mount Logan, Yukon',
    choiceB: 'Mont Tremblant, Quebec',
    choiceC: 'Whistler Mountain, BC',
    correct: 'B'
  },
  {
    question: 'If you wanted to see a loon, where would you go?',
    choiceA: 'a farm',
    choiceB: 'a lake',
    choiceC: 'a forest',
    correct: 'B'
  }
];

//#Step 3 : Render question on the screen

//1. last question is the length of the question-1 in the array
let lastQuestionIndex = questions.length - 1;
//2. current question that the user is viewing; setting to zero
let currentQuestionIndex = 0;
console.log(currentQuestionIndex);

function renderQuestion() {
  //select the  question at index 0 -display first question

  let q = questions[currentQuestionIndex];
  question.html('<p>' + q.question + '</p>');
  choiceA.text(q.choiceA);
  choiceB.text(q.choiceB);
  choiceC.text(q.choiceC);
}

//Render progressBar
function renderProgressBar() {
  progress.empty();
  for (var qIndex = 0; qIndex <= lastQuestionIndex; qIndex++) {
    progress.append("<div class='prog' id=" + qIndex + '>' + qIndex + '</div>');
  }
}

//render correct answer on the progressBar
function answerIsCorrect() {
  document.getElementById(currentQuestionIndex).style.backgroundColor = 'green';
}

//render answerIsWrong
function answerIsWrong() {
  document.getElementById(currentQuestionIndex).style.backgroundColor = 'red';
}

//
let TIMER;

//Step 4: render Counter
function renderCounter() {
  //if the count is less than equal to 10sec
  if (count <= questionTime) {
    //update the count(time) and progressbar
    counter.html(count);
    timeGuage.css('width', gaugeProgress * count + 'px');
    count++;
  } else {
    //if the question time is exceeded, we have to set the count to zero
    count = 0;
    //if the question time is exceeded and no answer, then the answer is wrong
    answerIsWrong();
    //if current question index is less than last question index, then there are still questions left
    if (currentQuestionIndex < lastQuestionIndex) {
      currentQuestionIndex++;
      renderQuestion();
    } else {
      //clear the interval and show the score
      clearInterval(TIMER);
      renderScore();
    }
  }
}

//Step 5 checkAnswer funtion
let scoreValue = 0;

//function takes in the choices as arguement
function checkAnswer(answer) {
  if (answer === questions[currentQuestionIndex].correct) {
    scoreValue++;

    answerIsCorrect();
  } else {
    answerIsWrong();
  }
  //move to next questions
  count = 0;
  if (currentQuestionIndex < lastQuestionIndex) {
    currentQuestionIndex++;
    console.log(currentQuestionIndex);
    renderQuestion();
  } else {
    //clear the interval and show the score
    clearInterval(TIMER);
    renderScore();
  }
}

//Step 6 function to start the quiz
start.on('click', startQuiz());

function startQuiz() {
  endGameDiv.css('display', 'none');
  scoreDiv.css('display', 'none');
  start.css('display', 'none');
  renderCounter();
  TIMER = setInterval(renderCounter, 1000);
  renderProgressBar();
  renderQuestion();
  quiz.css('display', 'block');
}

//Step 7 function showeScore()
function renderScore() {
  scoreDiv.css('display', 'block');
  scoreDiv.html(
    '<p> Correct Answer: ' +
      scoreValue +
      '/' +
      questions.length +
      '</p>' +
      '<br> <h4 class="restartGame">Do you want to restart the game?</h4><br/>' +
      '<br><div class="restartGame"><span id="yes">Yes ' +
      '</span><span id ="no">No</span></div>'
  );
  // (NOTE: Pay attention to the unusual syntax here for the click event.
  // Because we are creating click events on "dynamic" content, we can't just use the usual "on" "click" syntax.)

  $('#yes').on('click', startQuiz);
  currentQuestionIndex = 0;
  renderProgressBar();

  $('#no').on('click', renderEndGame);
}

function renderEndGame() {
  endGameDiv.css('display', 'block');
  endGameDiv.html('<h4> Thank you for playing</h4>');
}
