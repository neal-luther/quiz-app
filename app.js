const store = {
  questions: [
  { //#1
    question: 'What is Mobile Attribution?',
    answers: [
      'Coding an app for a specific platform',
      'Connecting mobile data points, commonly an advertisement, with an installation',
      'Assigning credit to an app developer on the developer notes page',
      'Explaining causes for behaviors and events, specifically physical actions'
    ],
    correctAnswer: 'Connecting mobile data points, commonly an advertisement, with an installation'
  },
  { //#2
    question: 'What is the device identifier for iOS?',
    answers: [
      'ADID',
      'RIDA',
      'Email Address',
      'IDFA'
    ],
    correctAnswer: 'IDFA'
  },
  { //#3
    question: "What does LAT stand for?",
    answers: [
      'Limit Ad Tracking',
      'Loss of Attribution Table',
      'Limited Attribution Time',
      'Linking Apple Table'
    ],
    correctAnswer: 'Limit Ad Tracking'
  },
  { //#4
    question: 'Which of the following is NOT a Mobile Attribution provider?',
    answers: [
      'AppsFlyer',
      'AdColony',
      'Kochava',
      'Branch'
    ],
    correctAnswer: 'AdColony'
  },
  { //#5
    question: 'What is the most downloaded app in 2020?',
    answers: [
      'WhatsApp',
      'Audible',
      'TikTok',
      'Disney+'
    ],
    correctAnswer: 'TikTok'
  }
  ],
  quizStarted: false,
  questionNumber: 0,
  submittingAnswer: false,
  score: 0,
  
  currentQuestionState: {
    answerArray: []
  }
  };

// Opening String  
  function generateBeginningString() {
    return `
    <div class="begin">
      <form>
        <p>
          Hello! Let's test your knowledge of Mobile Attribution.  Please press the button below to begin.  Good luck!
        </p>
        
        <button type="submit" id="beginQuiz" autofocus>Start</button>
      </form>
    </div>
      `;
  }

// Quiz Text  
  function generateQuizStructureString(questionObject) {
    return `
      <div class='quiz-interface'>
        <p>Question ${questionObject.index} out of ${store.questions.length}</p>
        <p>
         ${questionObject.question.question}
        </p>
        <form>
        <ol type="A">
          ${generateQuizAnswers(questionObject.question.answers)}
        </ol>
        <button type="submit" class="submit-answer">Submit Answer</button>
        </form> 
        <p>Score: ${store.score}</p>
      </div>
      `;
  }
  
// Generate Results  
  function generateAnswerResults(){
    let answerArray = store.currentQuestionState.answerArray;
  
    const buttons = {
      next: ' <button type="submit" class="next-question" autofocus>Next Question</button>',
      results: '<button type="submit" class="see-results" autofocus>See Results</button>'
    };
  
    let correctResponse = `"${answerArray[1]}" is correct!`;
    let incorrectResponse = `${answerArray[2]} is wrong. The correct answer is<br><br>
    "${answerArray[1]}"`;
  
    let isLastQuestion = (store.questionNumber + 1) === (store.questions.length);
    
    return `
      <div class="answer-response">
      <form>
      <p>${answerArray[0] === true ? correctResponse : incorrectResponse}</p>
      <p> Score: ${store.score}</p>
     ${isLastQuestion ? buttons.results : buttons.next}
      </form>
      </div>
    `;
  }
  
// Generate Answers  
  function generateQuizAnswers(answers){
    let answerArray = [];
    let indexArray = [];
    answers.forEach(answer => {
      answerArray.push(answer);
      indexArray.push(answers.indexOf(answer));
    });
    console.log(indexArray);
    return answerArray.map(answer => stringifyAnswerArray(answer)).join('');
  }
  
  function stringifyAnswerArray(answer){
    let questionNumber = store.questionNumber;
    let name = store.questions[questionNumber].answers.indexOf(answer);
    console.log(name);
  
    return `
      <li>
        <div class="answer-container">
        <form>
        <input type="radio" name="answer" id="answer-${name}" data-answer="${answer}">
        <label for="answer-${name}"> ${answer}</label>
        </form>
        </div>
      </li>
    `;
  }

// Generate Results  
  function generateQuizResultsString(){
    return `
      <div class='quiz-results'>
        <p>
         You have finished the quiz!
           </p>
            <p>You scored ${store.score} out of ${store.questions.length * 100}</p>            
          <button class="restart-quiz">Restart Quiz</button>      
      </div>    
  `;
          }
  
  function generateResult(quizResults) {
     return;  
   }
  
 // Rendering
  
  function renderQuiz () {
  
    if(store.quizStarted === false) {
      if(store.questionNumber === store.questions.length){
        const quizResultsString = generateQuizResultsString();
        const finalImage = generateResult();
        $('main').html(quizResultsString); 
      } else {
        const quizBeginInterfaceString = generateBeginningString();
        $('main').html(quizBeginInterfaceString);
      }
    } else if (store.quizStarted === true) {
      if(store.submittingAnswer === false) {
        const quizInterfaceString = generateQuizStructureString(currentQuestion());
        $('main').html(quizInterfaceString);
      } else if (store.submittingAnswer === true) {
        const quizAnswerResponseString = generateAnswerResults();
        $('main').html(quizAnswerResponseString);
      }
    } 
  }
  
  
// Starts Quiz
  function startQuiz() {
    store.quizStarted = true;
  }
  
// Current Question
  function currentQuestion(){
    let index = store.questionNumber;
    let questionObject = store.questions[index];
    return {
      index: index +1,
      question: questionObject
    };
  }
  
// Next Question
  function nextQuestion(){
    if (store.questionNumber < store.questions.length){
      store.questionNumber++;
      store.submittingAnswer =false;
      console.log(store.questionNumber);
    } else if(store.questionNumber === store.questions.length) {
      store.quizStarted = false;
    }
  }
  
// Verify Correct Answer  
  function verifyCorrectAnswer() {
    let radios = $('input:radio[name=answer]');
    let selectedAnswer = $('input[name="answer"]:checked').data('answer');
    let questionNumber = store.questionNumber;
    let correctAnswer = store.questions[questionNumber].correctAnswer;
  
    if (radios.filter(':checked').length === 0) {
      alert('You must select an answer..duh.');
      return;
    } else {
      store.submittingAnswer = true;
      if(selectedAnswer === correctAnswer){
        store.score += 100;
        store.currentQuestionState.answerArray = [true, correctAnswer, selectedAnswer];
      } else {
        store.currentQuestionState.answerArray = [false, correctAnswer, selectedAnswer];
      }
    }
  }

// See Results  
  function seeResults() {
    store.quizStarted = false;
    store.questionNumber ++;
  }

// Restarts Quiz  
  function restartQuiz() {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.submittingAnswer = false;
    store.currentQuestionState.answerArray = [];
    store.score = 0;
  }
  
// Event Handlers
  function handleBeginQuizButton(){
    
    $('main').on('click', '#beginQuiz', (event) =>{
      event.preventDefault();
      startQuiz();
      renderQuiz();
    });
  }
  
  function handleSubmitAnswer() {
    $('main').on('click' , '.submit-answer', (event)=>{
      event.preventDefault();
      console.log('submitting answer');
      verifyCorrectAnswer();
      renderQuiz();
    });
  }
  
  function handleNextQuestionButton(){
    $('main').on('click', '.next-question', (event) => {
      event.preventDefault();
      nextQuestion();
      renderQuiz();
    });
  }
  
  function handleSeeResultsButton(){
    $('main').on('click', '.see-results', (event) => {
      event.preventDefault();
      seeResults();
      renderQuiz();
    });
  }
  
  function handleRestartQuizButton(){
    $('main').on('click', '.restart-quiz', (event) => {
      event.preventDefault();
      restartQuiz();
      renderQuiz();
    });
  }
  
// Handler Function
  function handleQuiz (){
    renderQuiz();
    handleBeginQuizButton();
    handleSubmitAnswer();
    handleNextQuestionButton();
    handleRestartQuizButton();
    handleSeeResultsButton();
  
  }

 // DOOOO ITTTTTTTT 
  $(handleQuiz);
