const site = window.location.hostname;
// alert(" The JavaScript has been injected to: " + site + " 🤖");

let count = 0;
let temp = 1;

// Check if element exists before modifying it
let feedbackElement = document.querySelector('#ContentPlaceHolder1_gv_lblfeedback');
if (feedbackElement) {
    feedbackElement.innerHTML = "Days needed to reach 75% Attendance";
}

// Function to replace input with paragraph
function replaceInputWithP(inputId, newText) {
    const inputElement = document.getElementById(inputId);
    if (!inputElement) {
        console.warn(`No element found with ID: ${inputId}`);
        return;
    }
    const pElement = document.createElement("p");
    pElement.textContent = newText || inputElement.value;
    inputElement.parentNode.replaceChild(pElement, inputElement);
}

// Function to style all paragraphs
function styleAllParagraphs() {
    const paragraphs = document.getElementsByTagName('p');
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "red";
        paragraphs[i].style.fontWeight = "bold";
    }
}

// Function to calculate additional days needed
function calculateAdditionalDays(totalDays, presentDays) {
    let requiredAttendance = 0.75 * totalDays;
    let additionalDays = (requiredAttendance - presentDays) / 0.25;
    return additionalDays > 0 ? Math.ceil(additionalDays) : 0;
}

// Loop to process attendance data
while (true) {
    let totalClassElement = document.querySelector(`#ContentPlaceHolder1_gv_lbltotalclass_${count}`);
    if (!totalClassElement || totalClassElement.innerHTML.trim() === "") break;

    let a = totalClassElement.innerHTML;
    let [numerator, denominator] = a.split("/").map(Number);
    if (isNaN(numerator) || isNaN(denominator)) break;

    let daysNeeded = calculateAdditionalDays(denominator, numerator);

    if (daysNeeded > 40) {
        replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, "-");
        temp = 0;
    } else if (daysNeeded > 0) {
        temp = 0;
        replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, daysNeeded);
        styleAllParagraphs();
    } else {
        replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, "Already Crossed✅");
    }
    count++;
}

// Fix styling function


// Handling select element changes
let flag = 0;
function trigger(selectTag) {
    if (selectTag) {
        selectTag.removeAttribute("disabled");
        console.log(`Select tag updated!`);
        flag = 1;
    }
}

let selectTag = document.querySelector("select.aspNetDisabled");
if (selectTag) {
    trigger(selectTag);
}

// Interval to check for updates
const intervalId = setInterval(() => {
    const selectTag = document.querySelector("select.aspNetDisabled");
    if (selectTag && selectTag.hasAttribute("disabled")) {
        trigger(selectTag);
    }

    let legend = document.querySelector("legend");
    if (flag === 1 && legend) {
        legend.innerHTML = "Class Attendance <span style='color: red;'>(Data fetched successfully!)</span>";
        if (typeof calculateSurplusClasses === "function") calculateSurplusClasses();
        flag = 0;
    }
}, 500);
