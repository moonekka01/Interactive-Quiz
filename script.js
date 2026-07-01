// 1. Dataset
const quizData = [
    {
        question: "Which programming language is known as the 'backbone of web behavior'?",
        options: ["Python", "HTML", "JavaScript", "C++"],
        correct: 2
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 1
    },
    {
        question: "Which HTML element is used to link a JavaScript file?",
        options: ["<script>", "<javascript>", "<js>", "<link>"],
        correct: 0
    },
    {
        question: "What is the correct way to write a comment in CSS?",
        options: [
            "// this is a comment",
            "",
            "/* this is a comment */",
            "' this is a comment"
        ],
        correct: 2
    }
];

// 2. DOM Elements
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const questionEl = document.getElementById('question');
const questionNumEl = document.getElementById('question-num');
const progressBar = document.getElementById('progress');
const optionBtns = document.querySelectorAll('.option-btn');
const nextBtn = document.getElementById('next-btn');
const scoreEl = document.getElementById('score');
const totalScoreEl = document.getElementById('total-score');
const feedbackText = document.getElementById('feedback-text');
const restartBtn = document.getElementById('restart-btn');

// 3. App State
let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

// 4. Functions
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
}

function loadQuestion() {
    resetState();
    const currentQuiz = quizData[currentQuestionIndex];
    
    questionNumEl.innerText = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
    questionEl.innerText = currentQuiz.question;
    
    const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
    progressBar.style.width = `${progressPercentage}%`;

    optionBtns.forEach((btn, index) => {
        btn.innerText = currentQuiz.options[index];
        btn.onclick = () => selectAnswer(index);
    });
}

function resetState() {
    answerSelected = false;
    nextBtn.disabled = true;
    optionBtns.forEach(btn => {
        btn.className = 'option-btn';
        btn.disabled = false;
    });
}

function selectAnswer(selectedIndex) {
    if (answerSelected) return;
    answerSelected = true;
    
    const correctIndex = quizData[currentQuestionIndex].correct;
    
    optionBtns.forEach((btn, index) => {
        btn.disabled = true;
        if (index === correctIndex) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('wrong');
        }
    });

    if (selectedIndex === correctIndex) {
        score++;
    }

    nextBtn.disabled = false;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    progressBar.style.width = '100%';
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    scoreEl.innerText = score;
    totalScoreEl.innerText = quizData.length;

    const scorePercentage = (score / quizData.length) * 100;
    if (scorePercentage === 100) {
        feedbackText.innerText = "Perfect score! You're a pro web developer! 🎉";
    } else if (scorePercentage >= 75) {
        feedbackText.innerText = "Great job! You know your stuff! 👍";
    } else if (scorePercentage >= 50) {
        feedbackText.innerText = "Not bad! Keep practicing. 📚";
    } else {
        feedbackText.innerText = "Time to hit the books and try again! 💪";
    }
}

restartBtn.addEventListener('click', startQuiz);

// Run on load
startQuiz();