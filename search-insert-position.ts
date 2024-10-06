// Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

// [1,2,3,4,5,6,7]
// You must write an algorithm with O(log n) runtime complexity.

const searchInsert = (nums: number[], target: number): number => {
    let left = 0;
    let right = nums.length - 1;
    while (left <= right) {
      const middle = Math.floor((left + right) / 2);
      if (nums[middle] === target) return middle; 
      if (nums[middle] < target) {
        left = middle + 1; // Adjust the left boundary.
      } else {
        right = middle - 1; // Adjust the right boundary.
      }
    }

    return left;
};
