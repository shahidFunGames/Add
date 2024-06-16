document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const historyList = document.getElementById('history-list');
    const numberButtons = document.querySelectorAll('.number');
    const clearButton = document.getElementById('clear');
    const restartButton = document.getElementById('restart');
    const popup = document.getElementById('popup');
    const finalScoreElement = document.getElementById('final-score');
    const closePopupButton = document.getElementById('close-popup');

    let score = 0;
    let time = 60;
    let interval;
    let currentQuestion = {};

    function generateQuestion() {
        let num1 = Math.floor(Math.random() * 10);
        let num2 = Math.floor(Math.random() * 10);

        // Ensure neither num1 nor num2 is 0
        while (num1 === 0 || num2 === 0) {
            num1 = Math.floor(Math.random() * 10);
            num2 = Math.floor(Math.random() * 10);
        }

        currentQuestion = {
            num1,
            num2,
            answer: num1 + num2
        };
        questionElement.textContent = `Question: ${num1} + ${num2} = ?`;
        answerElement.value = '';
    }

    function startTimer() {
        interval = setInterval(() => {
            time--;
            timerElement.textContent = `Time: ${time}s`;
            if (time === 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        questionElement.textContent = 'Game Over!';
        submitButton.disabled = true;
        numberButtons.forEach(button => button.disabled = true);
        clearButton.disabled = true;
        finalScoreElement.textContent = `Your final score is ${score}`;
        popup.classList.remove('hidden');
        restartButton.classList.remove('hidden');
    }

    function restartGame() {
        score = 0;
        time = 60;
        scoreElement.textContent = `Score: ${score}`;
        timerElement.textContent = `Time: ${time}s`;
        historyList.innerHTML = '';
        submitButton.disabled = false;
        numberButtons.forEach(button => button.disabled = false);
        clearButton.disabled = false;
        popup.classList.add('hidden');
        restartButton.classList.add('hidden');
        generateQuestion();
        startTimer();
    }

    function updateHistory(question, userAnswer, correctAnswer) {
        const result = userAnswer == correctAnswer ? 'Correct' : `Wrong (Correct answer: ${correctAnswer})`;
        const listItem = document.createElement('li');
        listItem.textContent = `${question.num1} + ${question.num2} = ${userAnswer} (${result})`;
        historyList.appendChild(listItem);
    }

    // submitButton.addEventListener('click', () => {
    //     const userAnswer = parseInt(answerElement.value);
    //     updateHistory(currentQuestion, userAnswer, currentQuestion.answer);
    //     if (userAnswer === currentQuestion.answer) {
    //         score++;
    //         scoreElement.textContent = `Score: ${score}`;
    //     }
    //     generateQuestion();
    //     answerElement.value = '';
    // });

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            answerElement.value += button.getAttribute('data-value');
        });
    });

    clearButton.addEventListener('click', () => {
        answerElement.value = '';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            submitButton.click();
        }
    });

    restartButton.addEventListener('click', restartGame);

    closePopupButton.addEventListener('click', () => {
        popup.classList.add('hidden');
    });

    generateQuestion();
    startTimer();

    submitButton.addEventListener('click', () => {
        const userAnswer = parseInt(answerElement.value);
        
        // Check if answer is blank
        if (isNaN(userAnswer)) {
            return; // Do nothing if answer is blank
        }

        updateHistory(currentQuestion, userAnswer, currentQuestion.answer);
        if (userAnswer === currentQuestion.answer) {
            score++;
            scoreElement.textContent = `Score: ${score}`;
        }
        generateQuestion();
        answerElement.value = '';
    });
});
