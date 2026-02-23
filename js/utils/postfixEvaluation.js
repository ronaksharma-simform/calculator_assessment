import Stack from "./stack.js";
import { operators, functions } from "./operations.js";
export default class PostfixEvaluator {
	constructor() {
		this.operators = operators;
		this.functions = functions;
	}
	evaluate(tokens) {
		if (!Array.isArray(tokens) || tokens.length === 0) {
			throw new Error("Invalid postfix expression");
		}
		const st = new Stack();
		for (let token of tokens) {
			if (this.operators.has(token) || this.functions.has(token)) {
				const currentOperands = [];
				// get current operator or function details
				let currentOperator = this.operators.has(token)
					? this.operators.get(token)
					: this.functions.get(token);

				if (st.size() < currentOperator.arity) {
					throw new Error("Invalid Expression: Insufficient operands");
				}

				for (let i = 0; i < currentOperator.arity; i++) {
					currentOperands.unshift(parseFloat(st.pop()));
				}
				// executing operator on operands
				let result = currentOperator.execute(...currentOperands);

				st.push(result);
			} else {
				st.push(token);
			}
		}
		console.log(st.peek());
		if (st.size() !== 1) {
			throw new Error("Invalid Expression: Too many operands");
		}
		return st.peek();
	}
}
