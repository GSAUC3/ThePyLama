# Queue Data Structure

A **Queue** is a linear data structure that follows the **FIFO (First In, First Out)** principle.

The first element inserted is the first element removed.

Think of a line at a ticket counter: the person who arrives first is served first.

---

## 1. Mathematical Model

A queue can be represented as an ordered sequence:

$$
Q = (a_1, a_2, \ldots, a_n)
$$

where:

* \(a_1\) is the **front** element.
* \(a_n\) is the **rear** element.

The fundamental operations are:

| Operation    | Meaning                          | Complexity* |
| ------------ | -------------------------------- | ----------- |
| `enqueue(x)` | Insert \(x\) at the rear         | \(O(1)\)    |
| `dequeue()`  | Remove the front element         | \(O(1)\)    |
| `front()`    | Return the front element         | \(O(1)\)    |
| `is_empty()` | Check whether the queue is empty | \(O(1)\)    |

*These complexities assume a suitable queue implementation.*

---

## 2. How a Queue Works

Consider the following sequence:

**Step 1: Enqueue 10, 20, 30**

```text
Front → [10] [20] [30] ← Rear
```

**Step 2: Dequeue**

The element `10` is removed.

```text
Front → [20] [30] ← Rear
```

**Step 3: Enqueue 40**

```text
Front → [20] [30] [40] ← Rear
```

The element `20` will be removed next.

---

## 3. Python Implementation

Python provides `collections.deque`, which supports efficient insertion and removal at both ends.

```python
from collections import deque

q = deque()

# Enqueue
q.append(10)
q.append(20)
q.append(30)

print(q)
# deque([10, 20, 30])

# Front element
print(q[0])  # 10

# Dequeue
print(q.popleft())  # 10

print(q)
# deque([20, 30])
```

### Why not use a list?

Using `list.pop(0)` takes \(O(n)\) time because the remaining elements must shift.

Using `deque.popleft()` takes \(O(1)\) time.

---

## 4. Queue Implementation Using a Circular Array

A queue can be implemented using a fixed-size array of capacity \(C\).

Two indices are maintained:

* `front`: index of the first element.
* `rear`: index where the next element will be inserted.

To wrap around the array:

$$
\text{next index} = (i+1)\bmod C
$$

This allows the queue to reuse empty positions without shifting elements.

---

## 5. Queue Variants

| Type           | Description                                             |
| -------------- | ------------------------------------------------------- |
| Simple Queue   | Standard FIFO behavior                                  |
| Circular Queue | Reuses array positions through wraparound               |
| Deque          | Insertion and deletion at both ends                     |
| Priority Queue | Removes elements according to priority rather than FIFO |

A **priority queue** is commonly implemented using a heap.

---

## 6. Important Queue Patterns for LeetCode

### 1. Breadth-First Search (BFS)

Used to explore nodes level by level.

Examples:

* Binary Tree Level Order Traversal
* Rotting Oranges
* Shortest Path in an Unweighted Graph

### 2. Multi-source BFS

Initialize the queue with multiple starting nodes.

Example: **01 Matrix** — calculate the distance of each cell to its nearest zero.

### 3. Monotonic Queue

Maintain elements in increasing or decreasing order to efficiently find sliding-window minima or maxima.

Example: **Sliding Window Maximum** — LeetCode 239.

### 4. Topological Processing

Queues are used in Kahn's algorithm for topological sorting of directed acyclic graphs.

Example: **Course Schedule II**.

---

## 7. Queue vs. Stack

| Property           | Queue | Stack |
| ------------------ | ----- | ----- |
| Principle          | FIFO  | LIFO  |
| Insertion          | Rear  | Top   |
| Removal            | Front | Top   |
| Common application | BFS   | DFS   |

### Key takeaway

A queue is a FIFO data structure. Its most important algorithmic application is **BFS**, where it ensures that nodes are processed in the order they are discovered.
