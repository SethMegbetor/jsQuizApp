const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
  },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");
const question_status = document.getElementById("question_number");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deselectAnswers();

  const currentQuizData = quizData[currentQuiz];

  questionEl.innerText = currentQuizData.question;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;

  question_status.innerText = `Question ${currentQuiz}/${quizData.length} `;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;

  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });

  return answer;
}

// submitBtn.addEventListener("click", () => {
//   const answer = getSelected();

//   if (answer) {
//     if (answer === quizData[currentQuiz].correct) {
//       score++;
//     }

//     currentQuiz++;

//     if (currentQuiz < quizData.length) {
//       loadQuiz();
//     } else {
//       quiz.innerHTML = `
//                 <h2>You answered ${score}/${quizData.length} questions correctly</h2>

//                 <button onclick="location.reload()">Reload</button>
//             `;
//     }
//   } else {
//     alert("Please select an answer");
//   }
// });

// display all selected answers and questions and display if they are correct or not

// Add an array to store user-selected answers
let userAnswers = [];

submitBtn.addEventListener("click", () => {
  const answer = getSelected();

  if (answer) {
    // store select answer for each question
    userAnswers.push({
      question: quizData[currentQuiz].question,
      selection_answer: answer,
      isCorrect: answer === quizData[currentQuiz].correct,
    });

    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      displayResults();
    }
  }
});

function displayResults() {
  let result_HTML = `<h2>Quiz Results</h2>`;
  userAnswers.forEach((userAnswer, index) => {
    const question_number = index + 1;

    let userIndexValue = userAnswer.selection_answer;

    result_HTML += `<p><strong>${question_number}.</strong> ${userAnswer.question} </p>`;
    result_HTML += `<p><strong>Your Answer:</strong> ${
      quizData[index][userAnswer.selection_answer]
    }</p>`;
    // result_HTML += `<p><strong>Your Answer:</strong> ${quizData[index]}</p>`;
    result_HTML += `<p><strong>Result: ${
      userAnswer.isCorrect ? "Correct" : "Incorrect"
    }</strong></p>`;

    if (!userAnswer.isCorrect) {
      result_HTML += `<p><strong>Correct Answer is: </strong> ${
        quizData[index][
          userAnswer.isCorrect
            ? userAnswer.selection_answer
            : quizData[index].correct
        ]
      }</p>`;
    }

    // result_HTML += `<p><strong>Correct Answer: ${quizData[index].correct}</strong></p>`;
  });

  result_HTML += `<p>Total Score: ${score}/${quizData.length}</p>`;

  quiz.innerHTML = result_HTML;
}
