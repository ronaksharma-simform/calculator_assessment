import { operators } from "./operations.js";

export default function tokenParser(input) {
    const tokens = [];
    let currentOperand = "";
    let currentDecimal = false;

    for (let key of input) {

        if (key === " ") continue;
        if (/\d/.test(key)) {
            currentOperand += key;
        } else if (key === ".") {
            if (!currentDecimal) {
                if (currentOperand === "") {
                    currentOperand = "0";
                }
                currentOperand += ".";
                currentDecimal = true;
            } else {
                throw new Error("Invalid Expression : You cant have more than one decimal point in operand");
            }
        } else if (operators.has(key)) {
            if (currentOperand !== "") {
                tokens.push(currentOperand);
                currentOperand = "";
                currentDecimal = false;
            }
            tokens.push(key);
        }

        // PARENTHESIS
        else if (key === "(") {
            if (currentOperand !== "") {
                tokens.push(currentOperand);
                tokens.push("*");
                currentOperand = "";
            }
            tokens.push("(");
        } else if (key === ")") {
            if (currentOperand !== "") {
                tokens.push(currentOperand);
                currentOperand = "";
            }
            tokens.push(")");
        } else {
            if (currentOperand !== "" && /\d/.test(currentOperand)) {
                tokens.push(currentOperand);
                tokens.push("*");
                currentOperand = "";
            }
            currentOperand += key;
        }
    }

    if (currentOperand !== "") {
        tokens.push(currentOperand);
    }

    if (operators.has(tokens[tokens.length - 1])) {
        throw new Error("Invalid Expression : expression didnt ends with operator");
    }

    console.log(tokens);
    return tokens;
}