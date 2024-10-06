export class ListNode<T> {
  val: T;
  next: ListNode<T> | null;
  prev: ListNode<T> | null;

  constructor(val: T, next?: ListNode<T>|null, prev?: ListNode<T>|null) {
    this.val = val;
    this.next = next || null;
    this.prev = prev || null;
  }

  values (): T[] {
    let current: ListNode<T>|null = this
    const result: T[] = []
    while(current) {
      result.push(current.val) 
      current = current.next
    }
    return result
  }
}

export function makeList(): ListNode<number> {
  const vals = [20, 33, 12, 14, 2, 190, 113];
  let head = new ListNode(10);
  let start = head;
  for (const v of vals) {
    const n = new ListNode(v);
    head.next = n;
    head = n;
  }
  return start;
}

export function makeCycle(): ListNode<number> {
  const head = new ListNode(30)
  const list = makeList()
  head.next = list
  list.next = head
  return head
}

export function makeSortedList(): ListNode<number> {
  const head = new ListNode(1)
  head.next = new ListNode(2)
  head.next.next = new ListNode(3)
  head.next.next.next = new ListNode(4)
  return head
}

export function makeCustomList<T>(...vals: T[]): ListNode<T> {
  if(vals.length === 0) throw new Error('Must provide values')
  let current = new ListNode(vals[0])
  let head = current
  for (let i = 1; i < vals.length; i++) {
    let newNode = new ListNode(vals[i])
    current.next = newNode
    current = newNode
  }
  return head
}

export function traverse (list: ListNode<number>|null, target: number) {
  let next = list
  while(next) {
    if(next.val === target) return true
    next = next.next
  }
  return false
}

export function traverseRecursive (list: ListNode<number>|null, target: number) {
  if(!list) return false
  if(list.val === target) return true
  return traverseRecursive(list.next, target)
}
