import { operators, functions } from "./operations.js";
export default class TokenParser {
	constructor() {
		this.operators = operators;
		this.functions = functions;
	}
	tokenParser(expression) {
		if (!expression || expression.trim() === "") {
			throw new Error("Expression cannot be empty");
		}

		const tokens = []; // array for storing output token
		let currentOperand = "";
		let currentDecimal = false;

		for (let key of expression) {
			if (key === " ") continue;
			// Handle numbers
			if (/\d/.test(key)) {
				currentOperand += key;
			}
			// Handle Decimals
			else if (key === ".") {
				if (!currentDecimal) {
					if (currentOperand === "") {
						currentOperand = "0"; // Adding 0 before .
					}
					currentOperand += ".";
					currentDecimal = true;
				} else {
					throw new Error(
						"Invalid Expression : You cant have more than one decimal point in operand"
					);
				}
			}
			// Handles Numbers
			else if (this.operators.has(key)) {
				({ currentOperand, currentDecimal } = this.#handleOperator(
					key,
					tokens,
					currentOperand,
					currentDecimal
				));
			}

			// Handles PARENTHESIS
			else if (key === "(") {
				if (currentOperand !== "") {
					tokens.push(currentOperand);
					if (!this.functions.has(currentOperand)) {
						tokens.push("*");
					}
					currentOperand = "";
				}
				tokens.push("(");
			} else if (key === ")") {
				if (currentOperand !== "") {
					tokens.push(currentOperand);
					currentOperand = "";
				}
				tokens.push(")");
			}
			// Handles functions like sin cos tan log ln , etc.
			else {
				if (currentOperand !== "" && /\d/.test(currentOperand)) {
					tokens.push(currentOperand);
					tokens.push("*");
					currentOperand = "";
				}
				if (key === "π" || key === "e") {
					key = key === "π" ? Math.PI : Math.E;
				}
				currentOperand += key;
			}
		}
		// Push last operand
		if (currentOperand !== "") {
			tokens.push(currentOperand);
		}

		this.#validateEnding(tokens);
		console.log(tokens);
		return tokens;
	}
	#validateEnding(tokens) {
		if (
			tokens.length === 0 ||
			(this.operators.has(tokens[tokens.length - 1]) &&
				tokens[tokens.length - 1] !== "!")
		) {
			throw new Error(
				"Invalid Expression: Expression cannot end with operator"
			);
		}
	}
	#handleOperator(key, tokens, currentOperand, currentDecimal) {
		if (currentOperand !== "") {
			tokens.push(currentOperand);
			currentOperand = "";
			currentDecimal = false;
		} else if (key === "-") {
			if (
				tokens.length === 0 ||
				(this.operators.has(tokens[tokens.length - 1]) &&
					tokens[tokens.length - 1] !== "!") ||
				tokens[tokens.length - 1] === "("
			) {
				tokens.push("NEG");
				return { currentOperand, currentDecimal };
			}
		}

		tokens.push(key);
		return { currentOperand, currentDecimal };
	}
}
