import Stack from "./stack.js";
import { operators, functions } from "./operations.js";

function getPrecedence(operator) {
    return operators.has(operator) ?
        operators.get(operator).precedence :
        functions.get(operator).precedence;
}
export default function infixToPostfix(token) {
    let output = [];
    let st = new Stack();
    for (let key of token) {
        if (key == "") continue;
        if (operators.has(key) || functions.has(key)) {
            while (!st.isEmpty() &&
                st.peek() !== "(" &&
                ((operators.has(key) &&
                        operators.has(st.peek()) &&
                        ((operators.get(key).associativity === "left" &&
                                getPrecedence(key) <= getPrecedence(st.peek())) ||
                            (operators.get(key).associativity === "right" &&
                                getPrecedence(key) < getPrecedence(st.peek())))) ||
                    functions.has(st.peek()))
            ) {
                output.push(st.pop());
            }

            st.push(key);
        } else if (key == "(") {
            st.push(key);
        } else if (key == ")") {
            while (st.peek() != "(") {
                output.push(st.pop());
            }
            st.pop();
        } else {
            output.push(key);
        }
    }
    while (!st.isEmpty() && st.peek() !== "(") {
        output.push(st.pop());
    }
    if (!st.isEmpty()) {
        throw new Error("Invalid Expression")
    }
    // console.log(output);
    return output;
}