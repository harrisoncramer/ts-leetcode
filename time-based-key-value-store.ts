
/*
Design a time-based key-value data structure that can store multiple values for the same key at different time stamps and retrieve the key's value at a certain timestamp.

Implement the TimeMap class:

    TimeMap() Initializes the object of the data structure.
    void set(String key, String value, int timestamp) Stores the key key with the value value at the given time timestamp.
    String get(String key, int timestamp) Returns a value such that set was called previously, with timestamp_prev <= timestamp. If there are multiple such values, it returns the value associated with the largest timestamp_prev. If there are no values, it returns "".

    - Multiple values for the same key at different timestamps
    - Retrieve the key's value at a certain timestamp

  TimeMap timeMap = new TimeMap();
  timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
  timeMap.get("foo", 1);         // return "bar"
  timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
  timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
  timeMap.get("foo", 4);         // return "bar2"
  timeMap.get("foo", 5);         // return "bar2"

Solution:

We know the data should be structured with a key of the key, and a value as a series (array) of values. The values are coming in in-order, since they're timestamped values, so we can just insert them as-is into that array with a .push() operation, and we know the values will be sorted.

Since we know the values are sorted, we can do a binary search to find the value when doing the .get() operation.

The binary search is looking for the _greatest_ value that's still smaller than our target, in other words:

valueAtMid <= target

This won't work with our binary search template, which is looking for the least (e.g. furthest left) value that meets our condition. Here we want the greatest value (e.g. furthest right) value that meets our precondition. As such, our binary search should be a slightly modified version from our standard template.

*/

import { test } from "./_test"
import { binarySearchMost } from "./_binary-search";

type ValueTimestamp = {
  value: string
  timestamp: number
}

class TimeMap {
    private data: { [key: string]: ValueTimestamp[] };
    constructor() {
        this.data = {};
    }

    set(key: string, value: string, timestamp: number): void {
        if (!this.data[key]) this.data[key] = [];
        this.data[key].push({ value, timestamp });
    }

    get(key: string, timestamp: number): string {
        const entriesByKey = this.data[key];
        if (!entriesByKey) return '';
        const i = this.binarySearchForValue(entriesByKey, timestamp);
        if (i === -1) return '';
        return this.data[key][i].value;
    }

    /* 
      In order to get the value, we can use our binarySearchMost algorithm to get the largest element that is still
      less than or equal to our target. It could return -1 if there is no value less than or equal to our target.
    */
    private binarySearchForValue(entries: ValueTimestamp[], targetTimestamp: number): number {
      return binarySearchMost(entries, (entry) => {
        return entry.timestamp <= targetTimestamp
      })
    }
}

const m = new TimeMap()
m.set("k", "val1", 1)
m.set("k", "val2", 2)
m.set("k", "val3", 4)
m.set("k", "val6", 6)
m.set("k", "val8", 8)
m.set("k", "val9", 9)

type TestCase = {
  input: ValueTimestamp[],
  want: string,
}

const testCases: TestCase[] = [
  {
    input: [{ value: "k", timestamp: 0}],
    want: "",
  },
  {
    input: [{ value: "k", timestamp: 1}],
    want: "val1",
  },
  {
    input: [{ value: "k", timestamp: 2}],
    want: "val2",
  },
  {
    input: [{ value: "k", timestamp: 3}],
    want: "val2",
  },
  {
    input: [{ value: "k", timestamp: 5}],
    want: "val3",
  },
  {
    input: [{ value: "k", timestamp: 9}],
    want: "val9",
  },
  {
    input: [{ value: "k", timestamp: 9}],
    want: "val9",
  },
  {
    input: [{ value: "k", timestamp: 10}],
    want: "val9",
  },
  {
    input: [{ value: "k", timestamp: 0}],
    want: "",
  }
]

test(testCases, (testCase: ValueTimestamp) => {
  return m.get(testCase.value, testCase.timestamp)
})
