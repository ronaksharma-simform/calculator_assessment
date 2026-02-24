export default class Calculator {
	#tokenizer;
	#parser;
	#evaluator;
	#history;

	constructor(tokenizer, parser, evaluator) {
		this.#tokenizer = tokenizer;
		this.#parser = parser;
		this.#evaluator = evaluator;
		this.#history = [];
	}
	evaluate(expression) {
		const tokens = this.#tokenizer.tokenParser(expression);
		const postfix = this.#parser.convert(tokens);
		const result = this.#evaluator.evaluate(postfix);
		return result;
	}
	setHistory(expression) {
		this.#history.push(expression);
		localStorage.setItem("prev_calculations", this.#history);
	}
	clearHistory(expression) {
		localStorage.clear();
	}
	getHistory(expression) {
		const prev_calculations = localStorage.getItem("prev_calculations");
		if (prev_calculations) this.#history = prev_calculations.split(",");
		return this.#history;
	}
}
