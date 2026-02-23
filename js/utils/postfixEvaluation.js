import Stack from "./stack.js";
import { operators, functions } from "./operations.js";
export default function postfixEvaluation(tokens) {
    let st = new Stack();
    for (let key of tokens) {
        if (operators.has(key) || functions.has(key)) {
            const currentOperands = [];
            let currentOperator = operators.has(key) ? operators.get(key) : functions.get(key);
            for (let i = 0; i < currentOperator.arity; i++) {
                currentOperands.push(parseFloat(st.pop()));
            }
            let result = currentOperator.execute(...currentOperands);

            st.push(result);
        } else {
            st.push(key);
        }
    }
    console.log(st.peek());
    return st.peek();
}