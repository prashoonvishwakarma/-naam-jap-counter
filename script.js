// ===============================
// NAAM JAP COUNTER
// ===============================

// Saved Jap count
let count = Number(localStorage.getItem("japCount")) || 0;

// Saved target
let target = Number(localStorage.getItem("japTarget")) || 10000;


// ===============================
// GET HTML ELEMENTS
// ===============================

const counter = document.getElementById("counter");
const japButton = document.getElementById("japButton");

const progressCircle = document.getElementById("progressCircle");

const todayCount = document.getElementById("todayCount");
const malaCount = document.getElementById("malaCount");
const completedMalas = document.getElementById("completedMalas");

const malaProgressBar = document.getElementById("malaProgressBar");

const undoButton = document.getElementById("undoButton");
const resetButton = document.getElementById("resetButton");

const targetSelect = document.getElementById("targetSelect");
const customTarget = document.getElementById("customTarget");
const applyTarget = document.getElementById("applyTarget");


// ===============================
// TARGET SYSTEM
// ===============================

targetSelect.value = String(target);

targetSelect.addEventListener("change", function () {

    if (targetSelect.value === "custom") {

        customTarget.style.display = "block";
        customTarget.focus();

    } else {

        customTarget.style.display = "none";

    }

});


applyTarget.addEventListener("click", function () {

    let newTarget;

    if (targetSelect.value === "custom") {

        newTarget = Number(customTarget.value);

    } else {

        newTarget = Number(targetSelect.value);

    }


    if (!Number.isInteger(newTarget) || newTarget < 1) {

        alert("Please enter a valid target.");

        return;
    }


    target = newTarget;

    localStorage.setItem("japTarget", target);

    updateDisplay();

});


// ===============================
// UPDATE DISPLAY
// ===============================

function updateDisplay() {

    // Main counter
    counter.textContent = count + " / " + target;

    // Today's Jap
    todayCount.textContent = count;


    // ===============================
    // MALA CALCULATION
    // ===============================

    let malaProgress = count % 108;

    let malasCompleted = Math.floor(count / 108);


    if (malaProgress === 0 && count > 0) {

        malaProgress = 108;

    }


    malaCount.textContent = malaProgress + " / 108";

    completedMalas.textContent = malasCompleted;


    // ===============================
    // MALA PROGRESS BAR
    // ===============================

    let malaPercentage = (malaProgress / 108) * 100;

    malaProgressBar.style.width = malaPercentage + "%";


    // ===============================
    // MAIN PROGRESS CIRCLE
    // ===============================

    let percentage = Math.min((count / target) * 100, 100);

    let degrees = percentage * 3.6;


    progressCircle.style.background =
        `conic-gradient(#ff7a00 ${degrees}deg, #242424 ${degrees}deg)`;

}


// ===============================
// JAP BUTTON
// ===============================

japButton.addEventListener("click", function () {

    if (count < target) {

        count++;

        localStorage.setItem("japCount", count);

        updateDisplay();

    }

});


// ===============================
// UNDO BUTTON
// ===============================

undoButton.addEventListener("click", function () {

    if (count > 0) {

        count--;

        localStorage.setItem("japCount", count);

        updateDisplay();

    }

});


// ===============================
// RESET BUTTON
// ===============================

resetButton.addEventListener("click", function () {

    const confirmReset = confirm(
        "Are you sure you want to reset your Jap count?"
    );


    if (confirmReset) {

        count = 0;

        localStorage.setItem("japCount", count);

        updateDisplay();

    }

});


// ===============================
// INITIAL DISPLAY
// ===============================

updateDisplay();


// ===============================
// SERVICE WORKER
// ===============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./sw.js")
            .then(() => {
                console.log("Service Worker registered");
            })
            .catch(error => {
                console.log("Service Worker registration failed:", error);
            });

    });

        }
