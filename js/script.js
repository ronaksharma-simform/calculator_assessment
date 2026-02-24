// Import Statements
import Calculator from "./utils/calculator.js";
import { InfixtoPostfix } from "./utils/infixToPostfix.js";
import { operators, functions } from "./utils/operations.js";
import PostfixEvaluator from "./utils/postfixEvaluation.js";
import TokenParser from "./utils/tokenizer.js";
const tokenParser = new TokenParser(operators, functions);
const postfixEvaluater = new PostfixEvaluator(operators, functions);
const infixToPostfix = new InfixtoPostfix(operators, functions);
// Calculator class instance
const calc = new Calculator(tokenParser, infixToPostfix, postfixEvaluater);

// element selectors
let themeBtn = document.getElementById("themeBtn");
let themeIcon = document.getElementsByClassName("theme-icon")[0];
let body = document.getElementsByTagName("body")[0];
let currentDisplay = document.getElementById("currentDisplay");
let historyDisplay = document.getElementById("historyDisplay");
let numberBtn = document.getElementsByClassName("calculator-wrapper")[0];

// Dark theme toggle Event Listener
themeBtn.addEventListener("click", (event) => {
	console.log("Dark Theme Event Listener");
	body.classList.toggle("dark-mode");
	themeIcon.innerHTML == "☀️"
		? (themeIcon.innerHTML = "🌙")
		: (themeIcon.innerHTML = "☀️");
});
// Event listener for taking user input expression
numberBtn.addEventListener("click", (event) => {
	// accessing current target element
	let currentTargetElement = event.target;
	let characterToAdd = "";
	if (currentTargetElement.nodeName == "BUTTON") {
		if (currentTargetElement.dataset.operator) {
			characterToAdd = handleOperatorInput(currentTargetElement);
		} else if (currentTargetElement.dataset.number) {
			characterToAdd = handleNumberInput(currentTargetElement);
		} else if (currentTargetElement.dataset.function) {
			characterToAdd = handleFunctionInput(currentTargetElement);
		} else if (currentTargetElement.dataset.action) {
			currentDisplay.textContent = handleActionInput(
				currentTargetElement,
				currentDisplay.textContent
			);
		}
	}
	currentDisplay.innerHTML += characterToAdd;
	event.stopPropagation();
});
function handleOperatorInput(currentTargetElement) {
	return currentTargetElement.dataset.operator;
}
function handleNumberInput(currentTargetElement) {
	return currentTargetElement.dataset.number;
}
function handleFunctionInput(currentTargetElement) {
	let funcToAdd = currentTargetElement.dataset.function;
	if (currentTargetElement.dataset.parenthesis) {
		funcToAdd += "(";
	}
	return funcToAdd;
}
function handleActionInput(currentTargetElement, currentExpression) {
	let currentAction = currentTargetElement.dataset.action;
	if (currentAction === "clear") {
		currentExpression = "";
	} else if (currentAction === "delete") {
		currentExpression=currentExpression.slice(0,currentExpression.length-1)
	} else if (currentAction == "calculate") {
		currentExpression = calculateExpression(currentExpression);
	} else if (currentAction == "reciprocal") {
		currentExpression = calculateReciprocal(currentExpression);
	} else {
	}
	return currentExpression;
}
function calculateExpression(expression) {
	try {
		let result = calc.evaluate(expression);
		return result;
	} catch (error) {
		return error.message;
	}
}
function calculateReciprocal(expression) {
	try {
		let result = calculateExpression(expression);
		if (result === 0)
			throw new Error("Invalid Expression : Cant divide by Zero");
		let str = "1/" + result;
		result = eval(str);
		return result;
	} catch (error) {
		return error.message;
	}
}
