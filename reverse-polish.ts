const operators: string[] = ["/", "*", "+", "-"]

function isOperator (s: string) {
  return operators.includes(s) 
}

function calculate (a: number, b: number, c: string): number {
  if(c === "/") return (a / b) > 0 ? Math.floor(a / b) : Math.ceil(a / b)
  if(c === "*") return a * b
  if(c === "+") return a + b
  if(c === "-") return a - b
  throw new Error("Invalid operator")
}

function reversePolish (tokens: string[]): number {
  function helper () {
    if(tokens.length === 1) return
    let i = 0
    while(!isOperator(tokens[i])) {
      i++
    }

    const result = calculate(Number(tokens[i - 2]), Number(tokens[i - 1]), tokens[i])
    // console.log(Number(tokens[i - 2]), Number(tokens[i - 1]), tokens[i]);
    // console.log("Result is: ", result);
    tokens.splice(i - 2, 3, String(result))
    helper()
  }

  helper()

  return Number(tokens[0])
}

const reversePolishTestCases = [
  {
    input: ["4", "13", "5", "/", "+"],
    output: 6,
  },
  {
    input: ["2", "1", "+", "3", "*"],
    output: 9,
  },
  {
    input: ["10","6","9","3","+","-11","*","/","*","17","+","5","+"],
    output: 22,
  },
  {
    input: ["8"],
    output: 8,
  },
  {
    input: ["0","3","/"],
    output: 0,
  }
]

for (const [i, testCase] of reversePolishTestCases.entries()) {
  const result = reversePolish(testCase.input)
  const want = testCase.output
  if (result !== want) {
    throw new Error(`Test case ${i} failed: Got ${result} but wanted ${want}`)
  }
}
