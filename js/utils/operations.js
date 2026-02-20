const operators = new Map([
    [
        "+",
        {
            precedence: 1,
            associativity: "left",
            arity: 2,
            execute: (a, b) => a + b,
        },
    ],
    [
        "-",
        {
            precedence: 1,
            associativity: "left",
            arity: 2,
            execute: (a, b) => a - b,
        },
    ],
    [
        "*",
        {
            precedence: 2,
            associativity: "left",
            arity: 2,
            execute: (a, b) => a * b,
        },
    ],
    [
        "/",
        {
            precedence: 2,
            associativity: "left",
            arity: 2,
            execute: (a, b) => {
                if (b === 0) {
                    throw new Error("Operator / : Divide by Zero not allowed");
                }
                return a / b;
            },
        },
    ],
    [
        "^",
        {
            precedence: 3,
            associativity: "right",
            arity: 2,
            execute: (a, b) => Math.pow(a, b),
        },
    ],
    [
        "NEG",
        {
            precedence: 4,
            associativity: "right",
            arity: 1,
            execute: (a) => -a,
        },
    ],
    [
        "!",
        {
            precedence: 5,
            associativity: "left",
            arity: 1,
            execute: (a) => factorial(a),
        },
    ],
]);

const functions = new Map([
    ["sin", { arity: 1, execute: (x) => Math.sin(x) }],
    ["cos", { arity: 1, execute: (x) => Math.cos(x) }],
    ["tan", { arity: 1, execute: (x) => Math.tan(x) }],
    [
        "log",
        {
            arity: 1,
            execute: (x) => {
                if (x <= 0) {
                    throw new Error(
                        "Invalid Expression : Log of negative number doesnt exist",
                    );
                }
                return Math.log10(x);
            },
        },
    ],
    [
        "ln",
        {
            arity: 1,
            execute: (x) => {
                if (x <= 0) {
                    throw new Error(
                        "Invalid Expression : Log of negative number doesnt exist",
                    );
                }
                return Math.log(x);
            },
        },
    ],
    ["sqr-root", { arity: 1, execute: (x) => Math.sqrt(x) }],
]);

function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * factorial(num - 1);
    }
}