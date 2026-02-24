import Calculator from "./utils/calculator.js";
import { InfixtoPostfix } from "./utils/infixToPostfix.js";
import { operators, functions } from "./utils/operations.js";
import PostfixEvaluator from "./utils/postfixEvaluation.js";
import TokenParser from "./utils/tokenizer.js";
const tokenParser = new TokenParser(operators, functions);
const postfixEvaluater = new PostfixEvaluator(operators, functions);
const infixToPostfix = new InfixtoPostfix(operators, functions);
const calc=new Calculator(tokenParser,infixToPostfix,postfixEvaluater);
let themeBtn = document.getElementById("themeBtn");
let themeIcon = document.getElementsByClassName("theme-icon")[0];
let body = document.getElementsByTagName("body")[0];
let currentDisplay = document.getElementById("currentDisplay");
let numberBtn = document.getElementsByClassName("calculator-wrapper")[0];
themeBtn.addEventListener("click", (event) => {
	console.log("Dark Theme Event Listener");
	body.classList.toggle("dark-mode");
	themeIcon.innerHTML == "☀️"
		? (themeIcon.innerHTML = "🌙")
		: (themeIcon.innerHTML = "☀️");
});
function toggleSign(expression) {
	if (!expression) return expression;

	// Match last number (integer or decimal, positive or negative)
	const match = expression.match(/(-?\d*\.?\d+)(?!.*\d)/);

	if (!match) return expression;

	const number = match[0];
	const index = match.index;

	const toggled =
		number.startsWith("-") ? number.slice(1) : "-" + number;

	return (
		expression.slice(0, index) +
		toggled +
		expression.slice(index + number.length)
	);
}
console.log(calc.evaluate("-(e^0 + log(100))^2 + e^2 - log(1000) + (3 * -2)^2 / 3 + 2^3^2 / 64  "))
numberBtn.addEventListener("click", (event) => {
	let currentTargetElement = event.target;
	let characterToAdd = "";
	if (currentTargetElement.nodeName == "BUTTON") {
		if (currentTargetElement.dataset.operator) {
			characterToAdd = currentTargetElement.dataset.operator;
		} else if (currentTargetElement.dataset.number) {
			characterToAdd = currentTargetElement.dataset.number;
		} else if (currentTargetElement.dataset.function) {
			characterToAdd = currentTargetElement.dataset.function;
			if (currentTargetElement.dataset.parenthesis) {
				characterToAdd += "(";
			}
		} else if (currentTargetElement.dataset.action == "calculate") {
			try {
				const result=calc.evaluate(currentDisplay.textContent)
				currentDisplay.textContent = result;
			} catch (error) {
				currentDisplay.textContent = error.message;
			}
		} else if (currentTargetElement.dataset.action == "clear") {
			currentDisplay.textContent = "";
		}
        else if(currentTargetElement.dataset.action=="reciprocal"){
            try {
				let result=calc.evaluate(currentDisplay.textContent)
                let str="1/"+result;
                result=eval(str);
				currentDisplay.textContent = result;
			} catch (error) {
				currentDisplay.textContent = error.message;
			}
        }
        else if(currentTargetElement.dataset.action=="toggleSign"){
            currentDisplay.textContent = toggleSign(currentDisplay.textContent);

        }
	}
	currentDisplay.innerHTML += characterToAdd;
	event.stopPropagation();
});
