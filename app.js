// Get The URL
const site = window.location.hostname

// alert(" The JavaScript has been injected to: " + site + " 🤖")

let count = 0;
let temp = 0;

document.querySelector('#ContentPlaceHolder1_gv_lblfeedback').innerHTML = "Days needed to reach 75% Attendance"



function replaceInputWithP(inputId, newText) {
    // Find the input element by its ID
    const inputElement = document.getElementById(inputId);

    if (inputElement) {
        // Create a new <p> element
        const pElement = document.createElement("p");
        pElement.textContent = newText || inputElement.value; // Use input value or provided text

        // Replace the input with the new <p> element
        inputElement.parentNode.replaceChild(pElement, inputElement);
    } else {
        console.log(`No element found with id "${inputId}"`);
    }
}








function styleAllParagraphs() {
    const paragraphs = document.getElementsByTagName('p'); // Get all <p> tags
    for (let i = 0; i < paragraphs.length; i++) {
        paragraphs[i].style.color = "red";
        paragraphs[i].style.fontWeight = "bold";
    }
}




while (1) {

    let a = (document.querySelector(`#ContentPlaceHolder1_gv_lbltotalclass_${count}`).innerHTML);

    let [numerator, denominator] = a.split("/").map(Number);

    function calculateAdditionalDays(totalDays, presentDays) {
        // Calculate the required attendance to meet 75% target
        let requiredAttendance = 0.75 * totalDays;

        // Calculate how many more days are needed
        let additionalDays = (requiredAttendance - presentDays) / 0.25;

        // If additional days are less than or equal to zero, return 0 (no more days needed)
        if (additionalDays <= 0) {
            return 0;
        }

        return Math.ceil(additionalDays);  // Round up to the nearest whole number
    }

    let totalDays = denominator;
    let presentDays = numerator;
    let daysNeeded = calculateAdditionalDays(totalDays, presentDays);

    //   console.log("Days needed to reach 75% attendance:", daysNeeded);

    if (document.querySelector(`#ContentPlaceHolder1_gv_lbltotalclass_${count}`).innerHTML == "")
        break;
    else {
        if (daysNeeded > 40)
            replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, "-");
        else if (daysNeeded) {
            replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, daysNeeded);
            styleAllParagraphs();
        }
        else {
            replaceInputWithP(`ContentPlaceHolder1_gv_imgbtnfeedback_${count}`, "Already Crossed✅");
        }
    }
    count++;
}




// Create Custom Element - Function
function Create_Custom_Element(tag, attr_tag, attr_name, value) {
    const custom_element = document.createElement(tag)
    custom_element.setAttribute(attr_tag, attr_name)
    custom_element.innerHTML = value
    document.body.append(custom_element)
}


//  https://online.nitjsr.ac.in/endsem/StudentAttendance/ClassAttendance.aspx
