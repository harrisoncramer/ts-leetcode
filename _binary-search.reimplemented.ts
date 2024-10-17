// For the smallest:
// 1. Use <
// 2. True: right to mid 
// 3. False: left to mid + 1
// 4. Return left

function binarySearchSmallest<T> (input: T[], comparator: comparator<T>): number {
  let left = 0
  let right = input.length - 1;
  while(left < right) {
    const mid = Math.floor((left + right) / 2)
    if(comparator(input[mid], left, right)) right = mid
    else left = mid + 1
  }

  return left
}

// 1. Use <=
// 2. True: Right to mid - 1
// 3. False: Left to mid + 1
// 4. Return right

type comparator<T> = (mid: T, left: number, right: number) => boolean
function binarySearchLargest<T> (input: T[], comparator: comparator<T>): number {
  let left = 0
  let right = input.length - 1;
  while(left <= right) {
    const mid = Math.floor((left + right) / 2)
    if (comparator(input[mid], left, right)) left = mid + 1
    else right = mid - 1
  }

  return right
}


/* Find the first bad version */
const isGoodList = [ 
  true, 
  true,
  true,
  true,
  true,
  false,
  false,
]

function firstBad () { 
  const result = binarySearchSmallest(isGoodList, (mid) => !mid)
  console.log("First bad is:", result)
}

function lastGood () { 
  const result = binarySearchLargest(isGoodList, (mid) => mid)
  console.log("Last good is:", result)
}


firstBad()
lastGood()
