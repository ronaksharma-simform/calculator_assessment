let themeBtn = document.getElementById("themeBtn");
let themeIcon = document.getElementsByClassName("theme-icon")[0];
let body = document.getElementsByTagName("body")[0];
let currentDisplay = document.getElementById("currentDisplay");
let numberBtn = document.getElementsByClassName("calculator-wrapper")[0];
themeBtn.addEventListener("click", (event) => {
    console.log("Dark Theme Event Listener");
    body.classList.toggle("dark-mode");
    themeIcon.innerHTML == "☀️" ?
        (themeIcon.innerHTML = "🌙") :
        (themeIcon.innerHTML = "☀️");
});
numberBtn.addEventListener("click", (event) => {
    let currentTargetElement = event.target;
    let characterToAdd = "";
    if (currentTargetElement.nodeName == "BUTTON") {
        if (currentTargetElement.dataset.operator) {
            characterToAdd = currentTargetElement.dataset.operator;
        } else if (currentTargetElement.dataset.number) {
            characterToAdd = currentTargetElement.dataset.number;
        } else if (currentTargetElement.dataset.action == "calculate") {
            try {
                let temp = eval(currentDisplay.textContent);
                currentDisplay.textContent = temp;
            } catch (error) {
                currentDisplay.textContent = error.message;
            }
        } else if (currentTargetElement.dataset.action == "clear") {
            currentDisplay.textContent = "";
        }
    }
    currentDisplay.innerHTML += characterToAdd;
    event.stopPropagation();
});