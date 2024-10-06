/* Given an integer array nums and an integer val, remove all occurrences of val in nums in-place.
The order of the elements may be changed. Then return the number of elements in nums
which are not equal to val. */

/* Input: nums = [2,3,3,2], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores). */

function removeElement(nums: number[], val: number): number {
  if (nums.length === 0) return 0;
  let next = 0;
  for(let current = 0; current < nums.length; current++) {
    if (nums[current] !== val) {
      nums[next] = nums[current];
      next++
    }
  }
  return next;
};

const arr = [3,2,2,3]
console.log(removeElement(arr, 3));
console.log(arr);
