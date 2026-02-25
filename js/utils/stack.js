class Stack {
	stack;
	constructor() {
		this.stack = []; // Initalizing Empty Stack
	}

	push(value) {
		this.stack.push(value);
	}

	pop() {
		if (this.isEmpty()) {
			throw new Error("Stack underflow: cannot pop from empty stack.");
		}
		return this.stack.pop();
	}

	peek() {
		if (this.isEmpty()) {
			throw new Error("Stack Empty : cannot access from empty stack.");
		}
		return this.stack[this.stack.length - 1];
	}

	isEmpty() {
		return this.stack.length === 0;
	}

	size() {
		return this.stack.length;
	}

	clear() {
		this.stack.length = 0;
	}
}

export default Stack;
