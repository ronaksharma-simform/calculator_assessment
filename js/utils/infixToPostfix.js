import Stack from "./stack.js";
import { operators, functions } from "./operations.js";

export class InfixtoPostfix {
	constructor() {
		this.operators = operators;
		this.functions = functions;
	}
	convert(tokens) {
		if (tokens.length === 0) {
			throw new Error("Invalid Expression: Empty token list");
		}
		const output = [];
		const st = new Stack();

		for (let token of tokens) {
			if (token == "") continue;
			// Handling operator and function
			if (this.operators.has(token) || this.functions.has(token)) {
				this.#handleOperator(token, st, output);
			}
			// Handling opening parenthesis
			else if (token == "(") {
				st.push(token);
			}
			// Handling closing parenthesis
			else if (token == ")") {
                if(st.isEmpty()){
                    throw new Error("Invalid Expression : Mismatched parentheses");
                }
				while (st.peek() != "(") {
					output.push(st.pop());
				}
				st.pop();
			}
			// Handling operands
			else {
				output.push(token);
			}
		}
        // pushing remaining operators into expressions
		while (!st.isEmpty() && st.peek() !== "(") {
			output.push(st.pop());
		}
		if (!st.isEmpty()) {
			throw new Error("Invalid Expression ");
		}
		console.log(output);
		return output;
	}
	#getPrecedence(operator) {
		return this.operators.has(operator)
			? this.operators.get(operator).precedence
			: this.functions.get(operator).precedence;
	}
	#handleOperator(token, stack, output) {
		while (
			!stack.isEmpty() &&
			stack.peek() !== "(" &&
			this.#shouldPop(token, stack.peek())
		) {
			output.push(stack.pop());
		}

		stack.push(token);
	}
	#shouldPop(current, top) {
		if (this.functions.has(top)) return true;

		if (!this.operators.has(current) || !this.operators.has(top)) return false;

		const currentOp = this.operators.get(current);
		const topOp = this.operators.get(top);

		if (currentOp.associativity === "left") {
			return currentOp.precedence <= topOp.precedence;
		}

		if (currentOp.associativity === "right") {
			return currentOp.precedence < topOp.precedence;
		}

		return false;
	}
}
