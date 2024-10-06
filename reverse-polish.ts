import { test } from "./_test"

const operatorsReattempt: string[] = ["/", "*", "+", "-"]

function isOperator (s: string) {
  return operatorsReattempt.includes(s) 
}

function calculate (a: number, b: number, c: string): number {
  if(c === "/") return (a / b) > 0 ? Math.floor(a / b) : Math.ceil(a / b)
  if(c === "*") return a * b
  if(c === "+") return a + b
  if(c === "-") return a - b

  console.log("a, b, op", a, b, c);
  throw new Error("Invalid operator")
}

function reversePolish (tokens: string[]): number {
  const stack: string[] = []
  for(let i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    if(isOperator(token)) {
      const b = stack.pop()
      const a = stack.pop()
      const result = calculate(Number(a),Number(b),tokens[i])
      stack.push(String(result))
    } else stack.push(token)
  }

  return Number(stack.pop())
}

const testCases = [
  {
    input: [["4", "13", "5", "/", "+"]],
    want: 6,
  },
  {
    input: [["2", "1", "+", "3", "*"]],
    want: 9,
  },
  {
    input: [["10","6","9","3","+","-11","*","/","*","17","+","5","+"]],
    want: 22,
  },
  {
    input: [["8"]],
    want: 8,
  },
  {
    input: [["0","3","/"]],
    want: 0,
  }
]

test(testCases, reversePolish)
