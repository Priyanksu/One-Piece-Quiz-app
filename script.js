// dom elements

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answerContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionSpan = document.getElementById("total-question");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");

const quizQuestions = [
  {
    question: "What is the name of Luffy's first signature ship?",
    answers: [
      { text: "Thousand Sunny", correct: false },
      { text: "Going Merry", correct: true },
      { text: "Oro Jackson", correct: false },
      { text: "Moby Dick", correct: false },
    ],
  },
  {
    question:
      "Which Devil Fruit did Portgas D. Ace eat before Sabo inherited its power?",
    answers: [
      { text: "Goro Goro no Mi", correct: false },
      { text: "Mochi Mochi no Mi", correct: false },
      { text: "Mera Mera no Mi", correct: true },
      { text: "Magu Magu no Mi", correct: false },
    ],
  },
  {
    question:
      "Who was the first crew member to officially join Luffy on his journey?",
    answers: [
      { text: "Nami", correct: false },
      { text: "Usopp", correct: false },
      { text: "Roronoa Zoro", correct: true },
      { text: "Sanji", correct: false },
    ],
  },
  {
    question:
      "What is the name of the legendary sword Zoro inherits from Shimotsuki Kozaburo that drains his Haki?",
    answers: [
      { text: "Shusui", correct: false },
      { text: "Enma", correct: true },
      { text: "Wado Ichimonji", correct: false },
      { text: "Sandai Kitetsu", correct: false },
    ],
  },
  {
    question:
      "Which ancient weapon is revealed to be a living Mermaid princess?",
    answers: [
      { text: "Pluton", correct: false },
      { text: "Uranus", correct: false },
      { text: "Poseidon", correct: true },
      { text: "Noah", correct: false },
    ],
  },
];

// quiz state vars

let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;

totalQuestionSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent = quizQuestions.length;

// event listeners

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreSpan.textContent = 0;
  startScreen.classList.remove("active");
  quizScreen.classList.add("active");

  showQuestion();
}
function showQuestion() {
  answersDisabled = false;
  const currentQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPercent + "%";
  questionText.textContent = currentQuestion.question;

  answerContainer.innerHTML = "";
  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("answer-btn");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);

    answerContainer.appendChild(button);
  });
}

function selectAnswer(event) {
  // optimization check
  if (answersDisabled) return;
  answersDisabled = true;

  const selectedButton = event.target;

  const isCorrect = selectedButton.dataset.correct === "true";

  Array.from(answerContainer.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else if (button === selectedButton) {
      button.classList.add("incorrect");
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active");

  finalScoreSpan.textContent = score;

  const percentage = (score / quizQuestions.length) * 100;
  if (percentage === 100) {
    resultMessage.textContent = "Perfect Nakama ! ";
  } else if (percentage >= 70) {
    resultMessage.textContent = "Nice Job Nakama ! ";
  } else {
    resultMessage.textContent = "Try harder nakama ! ";
  }
}
function restartQuiz() {
  resultScreen.classList.remove("active");
  startQuiz();
}
