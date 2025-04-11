let quizData = [];
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

fetch('quiz-data.json')
    .then(response => response.json())
    .then(data => {
        quizData = data;
    })
    .catch(error => {
        console.error("Error loading quiz data:", error);
        quizData = [
            {
                question: "What is the capital of France?",
                options: ["London", "Berlin", "Paris", "Madrid"],
                answer: "Paris"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Venus", "Mars", "Jupiter", "Saturn"],
                answer: "Mars"
            },
            {
                question: "What is the largest mammal on Earth?",
                options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
                answer: "Blue Whale"
            },
            {
                question: "Which element has the chemical symbol 'O'?",
                options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
                answer: "Oxygen"
            },
            {
                question: "In which year did World War II end?",
                options: ["1943", "1945", "1947", "1950"],
                answer: "1945"
            }
        ];
    });

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("next-btn").addEventListener("click", nextQuestion);
document.getElementById("reset-btn").addEventListener("click", resetQuiz);
document.getElementById("prev-btn").addEventListener("click", previousQuestion);


function startQuiz() {
    document.getElementById("start-screen").style.display = 'none';
    document.getElementById("quiz-container").style.display = 'block';
    document.getElementById("results-container").style.display = 'none';
    userAnswers = [];
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
            if (userAnswers[currentQuestionIndex] === option) {
                li.classList.add('selected');
                document.getElementById("next-btn").style.display = 'block';
            }
            li.addEventListener("click", selectAnswer);
            optionsList.appendChild(li);
        });
        document.getElementById("next-btn").style.display = 'none';
        document.getElementById("prev-btn").style.display = currentQuestionIndex > 0 ? 'block' : 'none';
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
    const selectedAnswer = selectedOption ? selectedOption.textContent : null;
    //userAnswers.push(selectedAnswer);
    userAnswers[currentQuestionIndex] = selectedAnswer;
    
    const correctAnswer = quizData[currentQuestionIndex].answer;
    if (selectedAnswer === correctAnswer) {
        score++;
    }

    currentQuestionIndex++;
    loadQuestion();
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function showResult() {
    document.getElementById("quiz-container").style.display = 'none';
    document.getElementById("results-container").style.display = 'block';
    

    document.getElementById("score-display").textContent = `Your score: ${score}/${quizData.length}`;
    

    const reviewContainer = document.getElementById("answers-review");
    reviewContainer.innerHTML = '';
    
    quizData.forEach((question, index) => {
        const userAnswer = userAnswers[index];
        const correctAnswer = question.answer;
        const isCorrect = userAnswer === correctAnswer;
        
        const reviewItem = document.createElement("div");
        reviewItem.className = "review-item";
        

        const questionElement = document.createElement("div");
        questionElement.className = "review-question";
        questionElement.textContent = `Question ${index + 1}: ${question.question}`;
        reviewItem.appendChild(questionElement);
        

        question.options.forEach(option => {
            const optionElement = document.createElement("div");
            optionElement.className = "review-option";
            
            if (option === correctAnswer) {
                optionElement.className += " correct-answer";
            } else if (option === userAnswer && option !== correctAnswer) {
                optionElement.className += " wrong-answer";
            } else {
                optionElement.className += " neutral-answer";
            }
            
            optionElement.textContent = option;
            reviewItem.appendChild(optionElement);
        });
        
        reviewContainer.appendChild(reviewItem);
    });
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("quiz-container").style.display = 'none';
    document.getElementById("results-container").style.display = 'none';
    document.getElementById("start-screen").style.display = 'block';
}