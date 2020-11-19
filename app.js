/**
 * Example store structure
 */
const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What is a router?',
      answers: [
        'A router makes your internet faste',
        'A router finds the path for data to pass from the source to its destination',
        'A router transmits a wifi signal',
        'A router allows you to stream videos'
      ],
      correctAnswer: 'A router finds the path for data to pass from the source to its destination'
    },
    {
      question: 'What is defined as Network Vulnerabilities?',
      answers: [
        'Correctly used hardware or software',
        'Good or a complete physical security',
        'Secure passwords',
        'Design flaws in a device’s operating system or in the network'
      ],
      correctAnswer: 'Design flaws in a device’s operating system or in the network'
    },
    {
      question: 'Which one best describes Unicast?',
      answers: [
        'An exchange of messages between one sender to all possible multiple receivers. And only works on a local server',
        'An exchange of messages between a single source and a single destination',
        'An exchange of messages between one sender and multiple receivers',
        'An exchange of messages between one host to another host'
      ],
      correctAnswer: 'An exchange of messages between a single source and a single destination'
    },
    {
      question: 'What is the use of ‘ping’ command',
      answers: [
        'Is used to test whether a particular host is reachable across an IP network',
        'Ping command says ‘Hi’ to your co-worker',
        'Tests if all hosts are reachable everywhere on the internet',
        'Checks to make sure your router is on.'
      ],
      correctAnswer: 'Is used to test whether a particular host is reachable across an IP network.'
    },
    {
      question: 'Which is not a layer of the OSI model?',
      answers: [
        'The Physical Layer',
        'The Network Layer',
        'The Internet Layer',
        'The Session Layer'
      ],
      correctAnswer: 'The Internet Layer'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0,
  wrongAnswer: 0
};

/********** PAGES GENERATION FUNCTIONS **********/

// These functions generate pages
function generateMainPage() {
  return `<div class="startPage">
  <h2>Hi! Are you ready for a quiz?</h2>
  <p>Go ahead and have fun!</p>
  <button type="button" id="startQuiz">Start Quiz</button>
</div>`
}

function generateQuestionPage() {
  let question = store.questions[store.questionNumber];

  let eachAnswer = question.answers.map((answer, index) => {
    if (index === 0) {
      return `<input type="radio" id="answer${index}" name="answer" value="${answer}" required />
    <label for="answer${index}"><span class="answerContent">${answer}</span></label><br>`
    }
    return `<input type="radio" id="answer${index}" name="answer" value="${answer}" />
    <label for="answer${index}"><span class="answerContent">${answer}</span></label><br>`
  })
  
  //console.log(questionNumber)
  return `<div class="questionPage">
  <div class="showScore">
      <span>${store.score} correct, ${store.wrongAnswer} incorrect</span>
    </div>
  <form id="question">
  <h3>Question ${store.questionNumber + 1} of ${store.questions.length}: ${question.question}</h3>
  ${eachAnswer.join("")}
  <input type="submit" value="Submit" id="submit"/>
  
  </form>
</div>`
}

function generateFinalPage() {
  //console.log('last page')
  return `
  <div class="finalPage">
  <h2>Congrats! You have completed my quiz.</h2>
  <h3>Your total score: ${store.score}</h3>
  <form id="goBack">
  <button type="button" value="button" id="startOver">Try it again!</button>
  </form>
</div>`
}
/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store
function render(input) {
  let html = ""
  if (store.quizStarted) {
    if (store.questionNumber === store.questions.length)
      html = generateFinalPage();
    else
      html = generateQuestionPage();
  }
  else 
    html = generateMainPage();
  $('main').html(html)
  //console.log(store.quizStarted)
  
}
/********** EVENT HANDLER FUNCTIONS **********/

// This function handles start quiz events
function handleStartQuiz() {
  $('main').on('click', '#startQuiz', function (event) {
    store.quizStarted = true;
    render();
  })
}
//This function handle go to next question events
function handleAnswerSubmit() {
  $('main').on('submit', '#question', function (event) {
    event.preventDefault();
    console.log("answer submit working")
    let input = "";
    let userAnswer =  $("input[name='answer']:checked").val();
    //checkAnswer(userAnswer);

    if (checkAnswer(userAnswer))
      input = showCorrectAnswer();
    else
      input = showIncorrectAnswer();
    $('main').html(input);
  })
}
function handleNextQuestion() {
  $('main').on('click', '#nextQuestion', function (event) {
    event.preventDefault();
    store.questionNumber++;
    render();
  })
}
//This function check if the answer if right
function checkAnswer(userAnswer) {
  let question = store.questions[store.questionNumber];
  let rightAnswer = question.correctAnswer
  
  if (userAnswer == rightAnswer) {
    store.score++;
    return true;
  }
  else {
    store.wrongAnswer++;
    //console.log(store.wrongAnswer)
    return false;
  }
}

function showCorrectAnswer() {
  return `<div class="showCorrect">
  <h3>Good job! You're killing it.</h3>
  <div><img src="../image/happyShiba.png" alt="correct" width="300"></div>
  <button type="button" id="nextQuestion">Next Question</button>
</div>`
}

function showIncorrectAnswer() {
  return `<div class="showIncorrect">
  <h3>Sorry, that's a wrong answer, the right answer is:<br><br> <span class="rightAnswer">"${store.questions[store.questionNumber].correctAnswer}."</span></h3>
  <div><img src="../image/sadShiba.png" alt="incorrect" width="200"></div>
  <button type="button" id="nextQuestion">Next Question</button>
</div>`
}

//This function go back to the start page
function handleStartOver() {
  $('main').on('click', '#startOver', function (event) {
    //event.preventDefault();
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    store.wrongAnswer = 0;
    //console.log(quizStarted, questionNumber)
    render();
  });
}

/********** MAIN FUNCTION **********/

// This function is the main function that call the handlers
function main() {
  render();
  handleStartQuiz();
  handleAnswerSubmit();
  handleStartOver();
  handleNextQuestion();
}

$(main)


