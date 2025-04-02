let quizData = [];
let currentQuestionIndex = 0;
let score = 0;

fetch('quiz-data.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
    })
    .catch(error => console.error("Error loading quiz data:", error));

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("reset-btn").addEventListener("click", resetQuiz);

function startQuiz() {
    document.getElementById("start-screen").style.display = 'none';
    document.getElementById("quiz-container").style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex < quizData.length) {
        const currentQuestion = quizData[currentQuestionIndex];
        document.getElementById("question").textContent = currentQuestion.question;
        const optionsList = document.getElementById("options");
        optionsList.innerHTML = '';
        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.textContent = option;
            li.addEventListener("click", selectAnswer);
            optionsList.appendChild(li);
        });
        document.getElementById("next-btn").style.display = 'none';
    } else {
        showResult();
    }
}

function selectAnswer(event) {
    const options = document.querySelectorAll("li");
    options.forEach(option => option.classList.remove('selected'));

    const selectedOption = event.target;
    selectedOption.classList.add('selected');

    document.getElementById("next-btn").style.display = 'block';
}

function nextQuestion() {
    const selectedOption = document.querySelector('.selected');
    if (selectedOption) {
        const correctAnswer = quizData[currentQuestionIndex].answer;
        if (selectedOption.textContent === correctAnswer) {
            score++;
        }
    }
    currentQuestionIndex++;
    loadQuestion();
}

function showResult() {
    document.getElementById("quiz-container").innerHTML = `
        <h2>Your score is: ${score}/${quizData.length}</h2>
        <button id="reset-btn">Reset Quiz</button>
    `;
    document.getElementById("reset-btn").style.display = 'block';
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("quiz-container").style.display = 'none';
    document.getElementById("start-screen").style.display = 'block';
}
