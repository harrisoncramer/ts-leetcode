/*
Heaps are basically trees where the parent of every node is either smaller (minHeap) or larger (maxHeap) than the children. They can be implemented with an array.

To implement a minimum viable heap, we need to create the following methods: 

1. _heapify
2. _buildHeap
3. insert
4. getMin/getMax
5. remove


The _heapify method is a recursive function that finds whether the left or right child of a given index is smaller/larger than the value at the index, and if so, swaps the smaller of the two with the given index, and reursively calls itself with the index of the swapped child. The only difference between the minHeap and maxHeap is in the comparison in the _heapify() function.

The _buildHeap method iterates through half the values in the data set -- the first half -- starting at the mid-point and moving toward zero. For each node it calls the _heapify() function with the index. Since heapify checks the node and it's two children, we'll automatically swap all relevant nodes since all children nodes come after their parents. The _buildHeap method is and called whenever the heap is initialized, when something is added, and when something is removed. They run in O(LogN) time, compared to O(NLogN) time for a fully sorted array.

In order to work in Log(n) time, the insert and remove methods take advantage of the _buildHeap method. To insert a value, we push it onto the array and then call _buildHeap. To remove from the heap (take the root value) we have to swap the root and the last child, then pop off the last child, which takes O(1) time, then call _buildHeap() to reorder the heap, which takes O(LogN) time.

*/

export class MaxHeap<T> {
  data: T[]
  constructor (data: T[] = []) {
    this.data = [...data];
    this._buildHeap();
  }

  _swap (a: number, b: number) {
    let temp = this.data[a] 
    this.data[a] = this.data[b]
    this.data[b] = temp
  }

  _heapify (i: number) {
    let leftChildIndex =  2*i + 1 // Left child of current index
    let rightChildIndex = 2*i + 2 // Right child of current index

    // Get the index of the largest elemment: this.data[i], this.data[leftIndex], this.data[rightIndex]
    // If it's larger than this.data[i], then swap the two values larger than i's value, get the index of the largest one...
    let largestChildIndex = i
    if(leftChildIndex < this.data.length && this.data[leftChildIndex] > this.data[i]) {
      largestChildIndex = leftChildIndex
    }

    if(rightChildIndex < this.data.length && this.data[rightChildIndex] > this.data[largestChildIndex]) {
      largestChildIndex = rightChildIndex;
    }


    if (largestChildIndex !== i) {
      this._swap(i, largestChildIndex)
      this._heapify(largestChildIndex)
    }
  }
  
  _buildHeap (): void {
    for (let i = Math.floor(this.data.length / 2) - 1; i >= 0; i--) {
      this._heapify(i);
    }
  }

  // OLog(N) compared to O(nLogn) if we have to insert an element into a fully sorted array
  insert(val: T): void {
    this.data.push(val);
    this._buildHeap()
  }

  // OLog(N) compared to O(nLogn) if we have to remove an element from a fully sorted array
  remove (): T|null {
    this._swap(0, this.data.length - 1)
    const result = this.data.pop() || null
    this._buildHeap()
    return result
  }

  // O(1) This is the advantage to the heap, we can get the min/max in constant time
  getMax () {
    return this.data[0] || null
  }

  /* Utility functions */
  getData () {
    return this.data
  }

  getSize () {
    return this.data.length || 0
  }

  isEmpty () {
    return this.data.length === 0
  }
}

export class MinHeap<T> {
  data: T[]
  constructor (data: T[] = []) {
    this.data = [...data];
    this._buildHeap();
  }

  _swap (i:number, j:number): void {
    const temp = this.data[i]
    this.data[i] = this.data[j]
    this.data[j] = temp
  }

  _buildHeap(): void { 
    for(let i = Math.floor(this.data.length / 2); i >= 0; i--) {
      this._heapify(i)
    }
  }

  _heapify(i: number) : void {
    let smallestIndex = i
    let leftNode = i * 2 + 1
    let rightNode = i * 2 + 2
    if (leftNode < this.data.length && this.data[leftNode] < this.data[smallestIndex]) {  // Check if the left node is in bounds
      smallestIndex = leftNode
    }
    if (rightNode < this.data.length && this.data[rightNode] < this.data[smallestIndex]) { // Check if the right node is smaller
      smallestIndex = rightNode
    }

    if(smallestIndex !== i) {
      this._swap(smallestIndex, i);
      this._heapify(smallestIndex);
    }
  }

  // O(1) This is the advantage to the heap, we can get the min/max in constant time
  getMin (): T|null {
    return this.data[0]
  }

  // OLog(N) compared to O(nLogn) if we have to remove an element from a fully sorted array
  remove (): T|null {
    this._swap(0, this.data.length - 1);
    const result = this.data.pop() || null
    this._buildHeap()
    return result
  }

  // OLog(N) compared to O(nLogn) if we have to insert an element into a fully sorted array
  insert (n: T): void {
    this.data.push(n)
    this._buildHeap()
  }

  getData () {
    return this.data
  }

  getSize () {
    return this.data.length || 0
  }

  isEmpty () {
    return this.data.length === 0
  }
}

