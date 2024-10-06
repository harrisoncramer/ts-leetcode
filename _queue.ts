/*
  * The best way to implement a Queue in Javascript is by creating a singly-linked list with
  * ALSO a reference to the tail of the node.
  *
  * This lets you append to the tail in constant time when you want to add to the queue, and
  * use the head of the list when you want to dequeue from the linked list.
  */
class QueueNode<T> {
    value: T;
    next: QueueNode<T> | null;

    constructor(value: T) {
        this.value = value;
        this.next = null;
    }
}

export class Queue<T> {
    private head: QueueNode<T> | null;
    private tail: QueueNode<T> | null;
    size: number

    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0
    }

    enqueue(value: T): void {
        const newNode = new QueueNode(value);
        // If there is no head yet, then make it both the head and tail!
        if (!this.head) {
            this.head = newNode;
            this.tail = newNode;
        } else { // Otherwise, point the tail at it (and it back at the tail) and then set it to be the new tail
            this.tail!.next = newNode;
            this.tail = newNode;
        }
        this.size++
    }

    dequeue(): T | undefined {
        if (!this.head) return undefined;

        const value = this.head.value;
        this.head = this.head.next;

        if (!this.head) this.tail = null;
        this.size--

        return value;
    }
}
