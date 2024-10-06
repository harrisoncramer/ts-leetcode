/* Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:
    MinStack() initializes the stack object.
    void push(int val) pushes the element val onto the stack.
    void pop() removes the element on the top of the stack.
    int top() gets the top element of the stack.
    int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Solution: Implementing a basic stack that performs in constant time is easy since we get push() and pop() for free, and the top() method is also free since we can just peek the last element.

The getMin() function however, requires us to get the minimum value in the stack. This means we just have to create ANOTHER STACK that holds all of our minimum values. Whenever we add to our stack, we have to also check to see if that value is smaller than the current minStack's top value, if so, we push it onto that stack. Whenever we remove from our stack, we should pop off the last value in the minStack if it's the same size as our current value, to reveal the next smallest value.

*/

class MinStack {
    stack: number[] = []
    minStack: number[] = []
    constructor() {
      this.stack = []
      this.minStack = []
    }

    push(val: number): MinStack {
      this.stack.push(val) 
      if(this.minStack.length === 0 || val <= this.minStack[this.minStack.length - 1]) {
        this.minStack.push(val) // Smallest on top!
      }
      return this
    }

    pop(): number|undefined {
      const value = this.stack.pop()
      if(value === this.minStack[this.minStack.length - 1]) this.minStack.pop()
      return value
    }

    top(): number|undefined {
      return this.stack[this.stack.length - 1]
    }

    getMin(): number|undefined {
      return this.minStack[this.minStack.length - 1]
    }
}
