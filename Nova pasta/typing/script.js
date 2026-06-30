// ================================
// POLIGLOTA TYPING ENGINE
// ================================

// ---------- DOM ----------

const textDisplay = document.getElementById("text-display");
const typingInput = document.getElementById("typing-input");

const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const timerElement = document.getElementById("timer");
const xpElement = document.getElementById("xp");

const progressFill = document.getElementById("progress-fill");

const correctCountElement =
    document.getElementById("correct-count");

const errorCountElement =
    document.getElementById("error-count");

const charCountElement =
    document.getElementById("char-count");

const lessonSelect =
    document.getElementById("lesson-select");

const restartBtn =
    document.getElementById("restart-btn");

const themeBtn =
    document.getElementById("theme-btn");

const popup =
    document.getElementById("achievement-popup");

// ---------- LESSONS ----------

const lessons = {

    "home-row":
        "asdf jkl; asdf jkl; asdf jkl; asdf jkl; asdf jkl;",

    "top-row":
        "qwer uiop qwer uiop qwer uiop qwer uiop",

    "bottom-row":
        "zxcv nm,. zxcv nm,. zxcv nm,. zxcv nm,.",

    "words":
        "fast jump house school table green phone water keyboard computer",

    "sentences":
        "The quick brown fox jumps over the lazy dog. Practice every day to improve your typing speed."

};

// ---------- STATE ----------

let currentText = "";
let timer = 60;
let timerStarted = false;
let interval = null;

let totalTyped = 0;
let correctTyped = 0;
let errors = 0;

let xp = Number(localStorage.getItem("xp")) || 0;

// ---------- INIT ----------

xpElement.textContent = xp;

loadLesson("home-row");

// ================================
// LESSON LOADER
// ================================

function loadLesson(type){

    currentText = lessons[type];

    textDisplay.innerHTML = "";

    currentText.split("").forEach((char,index)=>{

        const span = document.createElement("span");

        span.innerText = char;

        span.classList.add("char");

        if(index === 0){

            span.classList.add("current");
        }

        textDisplay.appendChild(span);

    });

    resetStats();
}

// ================================
// RESET
// ================================

function resetStats(){

    typingInput.value = "";

    timer = 60;

    timerElement.textContent = timer;

    timerStarted = false;

    clearInterval(interval);

    totalTyped = 0;
    correctTyped = 0;
    errors = 0;

    updateStats();

    progressFill.style.width = "0%";
}

// ================================
// TIMER
// ================================

function startTimer(){

    interval = setInterval(()=>{

        timer--;

        timerElement.textContent = timer;

        if(timer <= 0){

            clearInterval(interval);

            typingInput.disabled = true;

            saveSession();

            unlockAchievements();
        }

    },1000);
}

// ================================
// INPUT LISTENER
// ================================

typingInput.addEventListener("input",()=>{

    if(!timerStarted){

        timerStarted = true;

        startTimer();
    }

    const typed =
        typingInput.value.split("");

    const chars =
        textDisplay.querySelectorAll("span");

    correctTyped = 0;
    errors = 0;

    chars.forEach((char,index)=>{

        const currentCharacter =
            typed[index];

        char.classList.remove(
            "correct",
            "incorrect",
            "current"
        );

        if(currentCharacter == null){

            if(index === typed.length){

                char.classList.add("current");
            }

            return;
        }

        if(currentCharacter === char.innerText){

            char.classList.add("correct");

            correctTyped++;

        }else{

            char.classList.add("incorrect");

            errors++;
        }

        if(index === typed.length){

            char.classList.add("current");
        }

    });

    totalTyped = typed.length;

    updateStats();

    updateProgress();

    highlightKey();
});

// ================================
// STATS
// ================================

function updateStats(){

    const minutes =
        (60 - timer) / 60 || 1/60;

    const wpm =
        Math.round(
            (correctTyped / 5) / minutes
        );

    const accuracy =
        totalTyped === 0
        ? 100
        : Math.round(
            (correctTyped / totalTyped) * 100
        );

    wpmElement.textContent =
        isFinite(wpm) ? wpm : 0;

    accuracyElement.textContent =
        accuracy + "%";

    correctCountElement.textContent =
        correctTyped;

    errorCountElement.textContent =
        errors;

    charCountElement.textContent =
        totalTyped;
}

// ================================
// PROGRESS
// ================================

function updateProgress(){

    const progress =
        (typingInput.value.length /
        currentText.length) * 100;

    progressFill.style.width =
        progress + "%";

    if(progress >= 100){

        typingInput.disabled = true;

        clearInterval(interval);

        gainXP(25);

        saveSession();

        unlockAchievements();
    }
}

// ================================
// XP
// ================================

function gainXP(amount){

    xp += amount;

    localStorage.setItem("xp",xp);

    xpElement.textContent = xp;
}

// ================================
// THEME
// ================================

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("light");

    if(document.body.classList.contains("light")){

        themeBtn.textContent = "☀️";

    }else{

        themeBtn.textContent = "🌙";
    }
});

// ================================
// RESTART
// ================================

restartBtn.addEventListener("click",()=>{

    typingInput.disabled = false;

    loadLesson(
        lessonSelect.value
    );
});

lessonSelect.addEventListener("change",()=>{

    typingInput.disabled = false;

    loadLesson(
        lessonSelect.value
    );
});

// ================================
// KEYBOARD HIGHLIGHT
// ================================

function highlightKey(){

    document
        .querySelectorAll(".key")
        .forEach(key=>{

            key.classList.remove("active");
        });

    const last =
        typingInput.value.slice(-1).toUpperCase();

    document
        .querySelectorAll(".key")
        .forEach(key=>{

            if(key.textContent === last){

                key.classList.add("active");
            }

        });
}