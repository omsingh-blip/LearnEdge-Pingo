# Data Structures & Algorithms 🚀

Master the foundations of problem solving and technical interviews.

---

# Binary Search

Binary Search works on **sorted arrays**.

It repeatedly divides the search space into half.

---

## Time Complexity

| Case | Complexity |
|---|---|
| Best | O(1) |
| Average | O(log n) |
| Worst | O(log n) |

---

## JavaScript Example

```javascript
function binarySearch(arr, target) {

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {

    const mid =
      Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid;
    }

    if (arr[mid] < target) {
      left = mid + 1;
    }

    else {
      right = mid - 1;
    }
  }

  return -1;
}

const nums =
  [1, 2, 3, 4, 5, 6, 7];

console.log(
  binarySearch(nums, 5)
);
```

---

# Stack

A Stack follows:

> LIFO → Last In First Out

---

## Operations

- Push
- Pop
- Peek
- isEmpty

---

## Stack Example

```javascript
class Stack {

  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[
      this.items.length - 1
    ];
  }
}

const stack = new Stack();

stack.push(10);
stack.push(20);

console.log(stack.pop());
```

---

# Queue

Queue follows:

> FIFO → First In First Out

---

## Queue Example

```javascript
class Queue {

  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    return this.items.shift();
  }
}

const queue = new Queue();

queue.enqueue(1);
queue.enqueue(2);

console.log(
  queue.dequeue()
);
```

---

# Linked List

Linked List stores data in nodes.

Each node points to the next node.

---

## Advantages

- Dynamic size
- Efficient insertion
- Efficient deletion

---

## Node Example

```javascript
class Node {

  constructor(value) {

    this.value = value;

    this.next = null;
  }
}

const first =
  new Node(10);

const second =
  new Node(20);

first.next = second;

console.log(first);
```

---

# Time Complexity Cheat Sheet

| Operation | Array | Linked List |
|---|---|---|
| Access | O(1) | O(n) |
| Insert | O(n) | O(1) |
| Delete | O(n) | O(1) |

---

# Recursion

Recursion means:

> a function calling itself

---

## Recursive Factorial

```javascript
function factorial(n) {

  if (n === 1) {
    return 1;
  }

  return n *
    factorial(n - 1);
}

console.log(
  factorial(5)
);
```

---

# Trees 🌳

Trees are hierarchical data structures.

---

## Binary Tree

Each node has:

- Left child
- Right child

---

## Tree Node Example

```javascript
class TreeNode {

  constructor(value) {

    this.value = value;

    this.left = null;

    this.right = null;
  }
}

const root =
  new TreeNode(10);

root.left =
  new TreeNode(5);

root.right =
  new TreeNode(15);

console.log(root);
```

---

# Graphs 📈

Graphs contain:

- Vertices
- Edges

Used in:
- Maps
- Social networks
- Recommendation systems

---

# BFS vs DFS

| BFS | DFS |
|---|---|
| Queue | Stack |
| Level-wise | Depth-wise |
| Shortest Path | Backtracking |

---

# Dynamic Programming

Dynamic Programming is:

> solving overlapping subproblems efficiently

---

## Fibonacci DP

```javascript
function fib(n) {

  const dp =
    [0, 1];

  for (
    let i = 2;
    i <= n;
    i++
  ) {

    dp[i] =
      dp[i - 1] +
      dp[i - 2];
  }

  return dp[n];
}

console.log(
  fib(10)
);
```

---

# Tips for Interviews 💡

- Learn patterns
- Practice daily
- Understand time complexity
- Write dry runs
- Focus on problem solving

---

# Recommended Practice Platforms

- LeetCode
- HackerRank
- Codeforces
- GeeksForGeeks

---

# LearnEdge Progress Path 🚀

1. Arrays
2. Strings
3. Linked Lists
4. Stack & Queue
5. Trees
6. Graphs
7. Dynamic Programming

---

# Keep Grinding ⚡

Consistency beats intensity.
Practice a little every day.