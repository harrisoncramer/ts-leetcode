/*
You are given the heads of two sorted linked lists list1 and list2.
Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists.
Return the head of the merged linked list.

Solution: 
Create dummy head node
Make tail variable equal to it...
While there are values in both lists, compare the values in each list, and point the tail at the smaller one
Increment the tail by moving it up to the recently added node
At the end, if any nodes remain in either list, tack them onto the end of the tail node
Return the headNode.next value that you started tacking things onto at the start
*/
import { ListNode, makeSortedList } from "./_list"
import { test } from "./_test"

function mergeTwoLists (node1: ListNode<number> | null, node2: ListNode<number> | null) {
  let headNode = new ListNode<number>(0)
  let tail = headNode

  while(node2 && node1) {
    if(node1.val < node2.val) {
      tail.next = node1
      node1 = node1.next
    } else {
      tail.next = node2
      node2 = node2.next
    }

    tail = tail.next
  }

  tail.next = node1 ? node1 : node2

  return headNode.next
}

const testCases = [
  {
    input: [makeSortedList(), makeSortedList()],
    want: [1,1,2,2,3,3,4,4],
    compare: (got: ListNode<number>, want: number[]) => {
      return JSON.stringify(got.values()) === JSON.stringify(want)
    }
  }
]

test(testCases, mergeTwoLists)
