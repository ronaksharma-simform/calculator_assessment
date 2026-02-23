
import { InfixtoPostfix } from "./utils/infixToPostfix.js";
import { operators, functions } from "./utils/operations.js";
import PostfixEvaluator from "./utils/postfixEvaluation.js";
import TokenParser from "./utils/tokenizer.js";
const tokenParser=new TokenParser(operators,functions)
const postfixEvaluater=new PostfixEvaluator(operators,functions)
const infixToPostfix=new InfixtoPostfix(operators,functions)
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
        } else if (currentTargetElement.dataset.function) {
            characterToAdd = currentTargetElement.dataset.function
            if (currentTargetElement.dataset.parenthesis) {
                characterToAdd += "("
            }
        } else if (currentTargetElement.dataset.action == "calculate") {
            try {
                // let temp = eval(currentDisplay.textContent);
                let tokens = tokenParser.tokenParser(currentDisplay.textContent)
                let postfixExpression = infixToPostfix.convert(tokens)
                let result = postfixEvaluater.evaluate(postfixExpression)
                currentDisplay.textContent = result;
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