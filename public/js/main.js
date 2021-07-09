
let currentQuestion = 0;
let score = [];
let selectedAnswersData = [];
const totalQuestions =questions.length;

const container = document.querySelector('.quiz-container');
const questionEl = document.querySelector('.question');
const option1 = document.querySelector('.option1');
const option2 = document.querySelector('.option2');
const option3 = document.querySelector('.option3');
const nextButton = document.querySelector('.next');
const previousButton = document.querySelector('.previous');
const restartButton = document.querySelector('.restart');
const result = document.querySelector('.result');


function generateQuestions (index) {
    
    const question = questions[index];
    const option1Total = questions[index].answer1Total;
    const option2Total = questions[index].answer2Total;
    const option3Total = questions[index].answer3Total;
   
    questionEl.innerHTML = `${index + 1}. ${question.question}`
    option1.setAttribute('data-total', `${option1Total}`);
    option2.setAttribute('data-total', `${option2Total}`);
    option3.setAttribute('data-total', `${option3Total}`);
    option1.innerHTML = `${question.answer1}`
    option2.innerHTML = `${question.answer2}`
    option3.innerHTML = `${question.answer3}`
}


function loadNextQuestion () {
    const selectedOption = document.querySelector('input[type="radio"]:checked');
    
    if(!selectedOption) {
        alert('Please select your answer!');
        return;
    }

    const answerScore = Number(selectedOption.nextElementSibling.getAttribute('data-total'));

   
    score.push(answerScore);

    selectedAnswersData.push()
    

    const totalScore = score.reduce((total, currentNum) => total + currentNum);


    currentQuestion++;

    
        selectedOption.checked = false;

    if(currentQuestion == totalQuestions - 1) {
        nextButton.textContent = 'Finish';
    }

    if(currentQuestion == totalQuestions) {
        container.style.display = 'none';
        result.innerHTML =
         `<h1 class="final-score">Your health status is ${totalScore} %</h1>
         <button class="restart">Check Again</button>
         `;
        return;
    }
    generateQuestions(currentQuestion);
}


function loadPreviousQuestion() {

    currentQuestion--;

    score.pop();

    generateQuestions(currentQuestion);
}


function restartQuiz(e) {
    if(e.target.matches('button')) {
   
    currentQuestion = 0;
    score = [];
    
    location.reload();
    }

}


generateQuestions(currentQuestion);
nextButton.addEventListener('click', loadNextQuestion);
previousButton.addEventListener('click',loadPreviousQuestion);
result.addEventListener('click',restartQuiz);


