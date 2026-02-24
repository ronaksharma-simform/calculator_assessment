// Import Statements
import Calculator from "./utils/calculator.js";
import { InfixtoPostfix } from "./utils/infixToPostfix.js";
import { operators, functions } from "./utils/operations.js";
import PostfixEvaluator from "./utils/postfixEvaluation.js";
import TokenParser from "./utils/tokenizer.js";
const tokenParser = new TokenParser(operators, functions);
const postfixEvaluater = new PostfixEvaluator(operators, functions);
const infixToPostfix = new InfixtoPostfix(operators, functions);
let overWrite = false;
let prev_calculations = [];
// Calculator class instance
const calc = new Calculator(tokenParser, infixToPostfix, postfixEvaluater);
prev_calculations = calc.getHistory();

// element selectors
let themeBtn = document.getElementById("themeBtn");
let themeIcon = document.getElementsByClassName("theme-icon")[0];
let body = document.getElementsByTagName("body")[0];
let currentDisplay = document.getElementById("currentDisplay");
let historyDisplay = document.getElementById("historyDisplay");
let numberBtn = document.getElementsByClassName("calculator-wrapper")[0];
let clearHistoryBtn = document.getElementById("clearHistoryBtn");
let historyList = document.getElementById("historyList");
let emptyHistoryMessage = document.getElementsByClassName("empty")[0];

// Dark theme toggle Event Listener
themeBtn.addEventListener("click", (event) => {
	console.log("Dark Theme Event Listener");
	body.classList.toggle("dark-mode");
	themeIcon.innerHTML == "☀️"
		? (themeIcon.innerHTML = "🌙")
		: (themeIcon.innerHTML = "☀️");
});
// clear history event listener
clearHistoryBtn.addEventListener("click", () => {
	calc.clearHistory();
	prev_calculations = [];
	historyList.innerHTML = "";
	emptyHistoryMessage.style.display = "block";
	historyList.append(emptyHistoryMessage);
});
if (!prev_calculations.length === 0) {
	// addHistoryItem(historyDisplay.textContent);
}
// adding keyboard listener for taking input for keyboard
body.addEventListener(("keydown"),(event)=>{
	let currentKeyboardKey=event.key
	if(currentKeyboardKey.match(/[0-9+\/*-]/) ){	
		currentDisplay.innerHTML+=event.key
		console.log(event.key) 
	}
	else if(currentKeyboardKey.toLowerCase()==="c"){
		currentDisplay.textContent = handleActionInput(
				"clear",
				currentDisplay.textContent
			);	
	}
	else if(currentKeyboardKey==="Enter"){
		currentDisplay.textContent = handleActionInput(
				"calculate",
				currentDisplay.textContent
			);	
	}
	else{
		currentDisplay.textContent = handleActionInput(
				"delete",
				currentDisplay.textContent
			);	
	}
	event.stopPropagation();
})
intialRender();
// Event listener for taking user input expression
numberBtn.addEventListener("click", (event) => {
	if (overWrite == false) {
		currentDisplay.textContent = "";
		overWrite = true;
	}
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
				currentTargetElement.dataset.action,
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
function handleActionInput(currentAction, currentExpression) {
	if (currentAction === "clear") {
		currentExpression = "";
	} else if (currentAction === "delete") {
		currentExpression = currentExpression.slice(
			0,
			currentExpression.length - 1
		);
	} else if (currentAction == "calculate") {
		currentExpression = calculateExpression(currentExpression);
		calc.setHistory(historyDisplay.textContent);
		addHistoryItem(historyDisplay.textContent);
	} else if (currentAction == "reciprocal") {
		currentExpression = calculateReciprocal(currentExpression);
		calc.setHistory(historyDisplay.textContent);
		addHistoryItem(historyDisplay.textContent);
	} else {
	}
	return currentExpression;
}
function calculateExpression(expression) {
	try {
		let result = calc.evaluate(expression);
		historyDisplay.innerHTML = expression + " = " + result;
		return result;
	} catch (error) {
		historyDisplay.innerHTML = "";
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
		historyDisplay.textContent= " 1 / " + historyDisplay.textContent;
		return result;
	} catch (error) {
		historyDisplay.innerHTML = "";
		return error.message;
	}
}
function addHistoryItem(expression) {
	if (historyList.firstElementChild === emptyHistoryMessage) {
		emptyHistoryMessage.style.display = "none";
	}
	let historyItem = document.createElement("p");
	historyItem.textContent = expression;
	historyItem.setAttribute("class", "history-item");
	historyList.appendChild(historyItem);
}
function intialRender() {
	if (prev_calculations.length === 0) {
		emptyHistoryMessage.style.display = "block";
	} else {
		emptyHistoryMessage.style.display = "none";
		prev_calculations.forEach((expression) => {
			addHistoryItem(expression);
		});
	}
}

