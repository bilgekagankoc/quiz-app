//DOM Objects
const TFLine = document.querySelector(".true-false-line");
const questionTitle = document.querySelector(".question-title");
const questionNumber = document.querySelector(".question-number");
const choices = document.querySelector(".choices");
const choice = document.querySelectorAll(".choice");
const container = document.querySelector(".container");
const quizForm = document.querySelector("#quiz-form");
const game = document.querySelector(".game");


var inputName;
//Questions
const questions = [
    {
        title: "When did Atatürk become president?",
        choice: [
            "October 29, 1920",
            "October 29, 1923",
            "December 17, 1923",
            "March 9, 1921"
        ],
        trueChoice: "October 29, 1923"
    }
    ,
    {
        title: "Who gave Atatürk the name Kemal?",
        choice: [
            "Ali Rıza Efendi",
            "Atatürk's math teacher Mustafa",
            "Zübeyde Hanım",
            "Makbule Atadan"
        ],
        trueChoice: "Atatürk's math teacher Mustafa"
    },
    {
        title: "How many siblings did Atatürk have?",
        choice: [
            "4",
            "6",
            "3",
            "5"
        ],
        trueChoice: "5"
    }, {
        title: "How old was Atatürk the commander in chief?",
        choice: [
            "40",
            "42",
            "47",
            "36"
        ],
        trueChoice: "40"
    },
    {
        title: "What is Atatürk's favorite dance?",
        choice: [
            "Tango",
            "Zeybek",
            "Samba",
            "Flamenko"
        ],
        trueChoice: "Zeybek"
    },
    {
        title: "Ataturk Armies! Your first goal is the Mediterranean, Forward! On what date did he give the order?",
        choice: [
            "March 15, 1924",
            "January 3, 1924",
            "September 1, 1922",
            "October 5, 1920"
        ],
        trueChoice: "September 1, 1922"
    }



]
//Quiz Object
function Quiz(question, score, index) {
    this.question = question;
    this.score = 0;
    this.index = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.question[this.index];
}
Quiz.prototype.checkAnswer = function (answer) {
    if (answer == this.question[this.index].trueChoice) {
        this.score++;
        this.index++;
        return true;
    }
    else {
        this.index++;
        return false;
    }
}
Quiz.prototype.isFinish = function () {
    return this.index >= this.question.length;
}
//UI Object
function UI(params) {

}
UI.prototype.addLine = function (numberOfLine) {
    for (var i = 0; i < numberOfLine; i++) {
        TFLine.innerHTML += `<span><i class="ion-ios-circle-outline small"></i></span>`
    }
}
UI.prototype.addTFLine = function (choice, index) {
    if (choice == true) {
        TFLine.children[index - 1].children[0].className = "ion-checkmark";
    }
    else {
        TFLine.children[index - 1].children[0].className = "ion-close";
    }
}
UI.prototype.TFNotice = function (boolen, choice) {
    if (boolen == true) {
        choice.classList.add("true");
    }
    else {
        choice.classList.add("false");
    }
    setTimeout(() => {

        choice.classList.remove("true");
        choice.classList.remove("false");
    }, 500);
}

//Local Storage
function localStorageProgress() {
}
localStorageProgress.prototype.getLocalStorage = function (name) {

}
localStorageProgress.prototype.setLocalStorage = function (name, score) {
    localStorage.setItem(name, score);
}
localStorageProgress.prototype.resetLocalStorage = function (params) {
    localStorage.clear();
}
//Define Objects
const getQuiz = new Quiz(questions);
const getUI = new UI();
const getLocalSotrage = new localStorageProgress();


//Load Question UI
function loadQuestion() {
    if (getQuiz.isFinish()) {
        getLocalSotrage.setLocalStorage(inputName, getQuiz.score);
        showScore();
    }
    else {
        const question = getQuiz.getQuestion();
        const getNumber = getQuiz.index;
        questionTitle.firstElementChild.textContent = question.title;
        questionNumber.firstElementChild.textContent = getNumber + 1;
        choice.forEach(function (choice, x) {
            choice.textContent = question.choice[x];

        })
        if (!TFLine.hasChildNodes()) {
            getUI.addLine(getQuiz.question.length);
        }


    }

}
//Start Quiz
quizForm.addEventListener("submit", function (e) {
    inputName = document.querySelector(".quiz-input").value;
    container.style.display = "block";
    game.style.display = "none";
    loadQuestion();
    e.preventDefault();
})

//Answer click event
choices.addEventListener("click", function (e) {
    if (e.target.className == "choice") {

        var checkAnswer = getQuiz.checkAnswer(e.target.textContent);
        getUI.addTFLine(checkAnswer, getQuiz.index);
        getUI.TFNotice(checkAnswer, e.target);
        setTimeout(() => {
            loadQuestion();
        }, 500);


    }
})
//Show Score UI , reset Local Storage
function showScore() {
    container.textContent = "";
    container.innerHTML += `<p><b>${getQuiz.index} soruda ${getQuiz.score} puan aldınız </b><br><br>    </p>`;
    for (var i = 0, len = localStorage.length; i < len; i++) {
        var key = localStorage.key(i);
        var value = localStorage[key];
        container.innerHTML += `<p>${key} kullanıcısı ${value} puan aldı <br><br></p>`
    }
    container.innerHTML += `<div class="reset-localstorage">Reset History</div>`;
    container.innerHTML += `<div class="go-start">Return to quiz start</div>`;
    document.querySelector(".reset-localstorage").addEventListener("click", function () {
        getLocalSotrage.resetLocalStorage();
        alert("Successful reset history");
    })
    document.querySelector(".go-start").addEventListener("click", function () {
        location.reload();

    })


}
