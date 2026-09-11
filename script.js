const quest = [
    {
        quest: "Hva står PSU for?",
        answer: [
            { text: "Power System Unit", correct: false },
            { text: "Power Supply Unit", correct: true },
            { text: "Personal Supply Unit", correct: false },
            { text: "Power Super Unit", correct: false }
        ]
    },
    {
        quest: "Hva står CPU for?",
        answer: [
            { text: "Central Processing Unit", correct: true },
            { text: "Computer Power Unit", correct: false },
            { text: "Central Program Utility", correct: false },
            { text: "Computer Processing Utility", correct: false }
        ]
    },
    {
        quest: "Hva brukes RAM til?",
        answer: [
            { text: "Å lagre filer permanent", correct: false },
            { text: "Midlertidig lagring av data som PC-en bruker", correct: true },
            { text: "Å koble PC-en til internett", correct: false },
            { text: "Å vise bilder på skjermen", correct: false }
        ]
    },
    {
        quest: "Hva brukes batteriet på hovedkortet til?",
        answer: [
            { text: "Å gi strøm til hele PC-en", correct: false },
            { text: "Å holde dato, klokkeslett og BIOS-innstillinger lagret", correct: true },
            { text: "Å gjøre PC-en raskere", correct: false },
            { text: "Å kjøle ned prosessoren", correct: false }
        ]
    },
    {
        quest: "Hva er HTML?",
        answer: [
            { text: "Et programmeringsspråk", correct: false },
            { text: "Et markup language", correct: true },
            { text: "Et operativsystem", correct: false },
            { text: "Oslo Skolen GPT", correct: false }
        ]
    }
];

const questionElement = document.getElementById("quest");
const answerElement = document.getElementById("answer");
const next = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    next.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();

    let currentQuestion = quest[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML =
        questionNo + ". " + currentQuestion.quest;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");

        button.innerHTML = answer.text;
        button.classList.add("btn");

        answerElement.appendChild(button);

        if (answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    next.style.display = "none";

    while (answerElement.firstChild) {
        answerElement.removeChild(answerElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    next.style.display = "block";
}

function showScore() {
    resetState();

    questionElement.innerHTML =
        `Du fikk ${score} av ${quest.length} riktige!`;

    next.innerHTML = "Spill igjen";
    next.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quest.length) {
        showQuestion();
    } else {
        showScore();
    }
}

next.addEventListener("click", () => {
    if (currentQuestionIndex < quest.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();