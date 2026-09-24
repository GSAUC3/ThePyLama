# Stack Data Structure: 

A stack is one of the most important data structures for coding interviews. It is particularly useful for problems involving **nested structures, expression evaluation, monotonic relationships, sequential dependencies, and maintaining state while traversing data**.

---

## 1. Mathematical Foundations of a Stack

### 1.1 What is a Stack?

A stack is a linear abstract data type that follows the **Last-In, First-Out (LIFO)** principle.

The element inserted most recently is the first one removed.

For a sequence of elements

$$
S = [a_1,a_2,\ldots,a_n]
$$

where \(a_n\) is the top element, the stack supports insertion and removal at one end.

The top of the stack is:

$$
\operatorname{top}(S)=a_n
$$

The fundamental operations are:

| Operation   | Mathematical description       | Typical complexity |
| ----------- | ------------------------------ | ------------------ |
| `push(x)`   | \(S \gets S \mathbin{\|} [x]\) | \(O(1)\) amortized |
| `pop()`     | Remove the last element        | \(O(1)\)           |
| `top()`     | Return the last element        | \(O(1)\)           |
| `isEmpty()` | Check whether \(S=[]\)         | \(O(1)\)           |
| `size()`    | Return the number of elements  | \(O(1)\)           |

Here, \(\mathbin{\|}\) denotes sequence concatenation.

A stack is an **abstract data type (ADT)**, meaning it defines how elements behave rather than how they are physically stored.

It can be implemented using:

* Dynamic arrays
* Linked lists
* Fixed-size arrays
* Other data structures

---

### 1.2 The Stack Invariant

An invariant is a property that remains true throughout an algorithm.

For a conventional stack, the key invariant is:

> The most recently pushed element that has not yet been removed is always at the top.

Suppose we execute:

```python
stack = []

stack.append(10)
stack.append(20)
stack.append(30)
```

The stack becomes:

```text
Bottom → [10, 20, 30] ← Top
```

After:

```python
stack.pop()
```

The stack becomes:

```text
Bottom → [10, 20] ← Top
```

The element `30` is removed because it was inserted last.

#### Why this matters in interviews

Many stack problems are based on maintaining a carefully chosen invariant.

Examples:

* **Parentheses validation:** The stack contains unmatched opening brackets.
* **Monotonic stack:** The stack contains elements in a particular sorted order.
* **Expression evaluation:** The stack contains intermediate operands or operators.
* **Backtracking:** The stack contains the current path or pending operations.

Understanding the invariant is more important than memorizing the implementation.

---

## 2. Stack Implementation in Python

Python's `list` is the standard choice for stack problems.

```python
stack = []

# Push
stack.append(10)
stack.append(20)

# Peek
top = stack[-1]

# Pop
removed = stack.pop()

# Check empty
if not stack:
    print("Stack is empty")
```

#### Complexity

| Operation            | Complexity         |
| -------------------- | ------------------ |
| `append()`           | \(O(1)\) amortized |
| `pop()` from the end | \(O(1)\)           |
| `stack[-1]`          | \(O(1)\)           |
| `len(stack)`         | \(O(1)\)           |
| `stack.pop(0)`       | \(O(n)\)           |
| `stack.insert(0, x)` | \(O(n)\)           |

**Interview tip:** Use `append()` and `pop()` at the end of a list. Avoid inserting or removing elements from the beginning.

For a queue, use `collections.deque` instead.

---

## 3. Stack Complexity: What You Must Know

### 3.1 Worst-case versus Amortized Complexity

A Python list is a dynamic array.

When its allocated capacity is exhausted, it may need to allocate a larger array and copy existing elements.

Therefore:

* A single `append()` can take \(O(n)\) in the worst case.
* The amortized cost of `append()` is \(O(1)\).
* A `pop()` from the end is \(O(1)\).

Amortized analysis considers the total cost of a sequence of operations.

If \(n\) elements are pushed, the total cost is \(O(n)\), giving an amortized cost of:

$$
\frac{O(n)}{n}=O(1)
$$

per push.

---

### 3.2 Stack Space Complexity

If a stack stores \(k\) elements:

$$
S(k)=O(k)
$$

For an algorithm that processes an array of length \(n\), the stack may contain at most \(n\) elements.

Therefore, its auxiliary space complexity is often:

$$
O(n)
$$

However, some stack problems use only a constant number of elements, resulting in \(O(1)\) auxiliary space.

**Important:** Recursive function calls also use a call stack. Recursive algorithms may consume \(O(n)\) stack space even if no explicit stack is declared.

---

## 4. The Core Stack Problem Patterns

Most stack-based interview problems can be organized into the following patterns.

| Pattern                           | Main purpose                               | Typical problem                  |
| --------------------------------- | ------------------------------------------ | -------------------------------- |
| 1. Matching and validation        | Match nested structures                    | Valid Parentheses                |
| 2. Monotonic increasing stack     | Find next smaller elements                 | Next Smaller Element             |
| 3. Monotonic decreasing stack     | Find next greater elements                 | Daily Temperatures               |
| 4. Previous/next boundary         | Find nearest smaller or greater boundaries | Largest Rectangle in Histogram   |
| 5. Expression evaluation          | Evaluate mathematical expressions          | Evaluate Reverse Polish Notation |
| 6. Parsing and decoding           | Process nested or encoded strings          | Decode String                    |
| 7. Simulation                     | Maintain a sequence of unresolved states   | Asteroid Collision               |
| 8. Design problems                | Implement data structures using stacks     | Min Stack                        |
| 9. Stack + greedy                 | Remove or retain elements optimally        | Remove K Digits                  |
| 10. Stack + traversal             | Process trees and graphs iteratively       | Binary Tree Inorder Traversal    |
| 11. Stack + dynamic programming   | Track unresolved states or subproblems     | Maximal Rectangle                |
| 12. Advanced monotonic techniques | Aggregate contributions over intervals     | Sum of Subarray Minimums         |

Let's explore these patterns in detail.

---

## 5. Pattern 1: Matching and Validation

### 5.1 When should you use this pattern?

Use a stack when a problem involves:

* Parentheses or brackets
* Nested structures
* Opening and closing delimiters
* Matching symbols in a specific order
* Validating whether an expression is properly nested

The key property is that **the most recently opened structure must be closed first**.

This is precisely the LIFO property.

### 5.2 Example: Valid Parentheses

LeetCode 20 — Valid Parentheses

Given:

```text
s = "({[]})"
```

Determine whether the string contains correctly matched and nested brackets.

#### Approach

1. Push every opening bracket.
2. When a closing bracket appears, check whether it matches the top.
3. If it does, pop the opening bracket.
4. If it doesn't, return `False`.
5. At the end, the stack must be empty.

#### Python implementation

```python
def isValid(s: str) -> bool:
    stack = []

    pairs = {
        ')': '(',
        ']': '[',
        '}': '{'
    }

    for ch in s:
        if ch in "([{":
            stack.append(ch)

        else:
            if not stack:
                return False

            if stack[-1] != pairs[ch]:
                return False

            stack.pop()

    return not stack
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

Each character is processed once and each opening bracket is pushed and popped at most once.

#### Interview insight

A common mistake is checking only whether the total number of opening and closing brackets matches.

For example:

```text
([)]
```

The counts are balanced, but the nesting is invalid.

The stack preserves the order needed to detect this.

#### Related problems

| Problem                                  | LeetCode |
| ---------------------------------------- | -------- |
| Valid Parentheses                        | 20       |
| Minimum Add to Make Parentheses Valid    | 921      |
| Minimum Remove to Make Valid Parentheses | 1249     |
| Generate Parentheses                     | 22       |
| Longest Valid Parentheses                | 32       |
| Score of Parentheses                     | 856      |

**Pattern recognition:** If a problem asks whether a sequence is properly nested, consider a stack first.

---

## 6. Pattern 2: Monotonic Stack

This is one of the most important stack patterns for coding interviews.

A monotonic stack maintains elements in either non-decreasing or non-increasing order.

It is commonly used to find:

* Next greater element
* Next smaller element
* Previous greater element
* Previous smaller element
* Nearest element satisfying an inequality
* Boundaries of contiguous intervals

### 6.1 What is a Monotonic Stack?

A monotonic stack maintains a specific ordering among its elements.

#### Monotonically increasing stack

From bottom to top:

$$
S_1 \leq S_2 \leq \cdots \leq S_k
$$

Example:

```text
Bottom → [2, 4, 7, 9] ← Top
```

#### Monotonically decreasing stack

From bottom to top:

$$
S_1 \geq S_2 \geq \cdots \geq S_k
$$

Example:

```text
Bottom → [9, 7, 4, 2] ← Top
```

In practice, you often store indices rather than values.

Why?

Because indices allow you to:

* Retrieve the corresponding values.
* Calculate distances.
* Determine interval widths.
* Handle duplicate values consistently.

---

## 7. Pattern 3: Next Greater Element

### 7.1 Problem definition

Given an array:

```python
nums = [2, 1, 2, 4, 3]
```

For every element, find the first greater element to its right.

Output:

```text
[4, 2, 4, -1, -1]
```

For example:

* The next greater element for `2` at index 0 is `4`.
* The next greater element for `1` is `2`.
* The next greater element for `4` does not exist.

### 7.2 Why brute force is inefficient

For each element, scan the remaining array until you find a greater element.

```python
def nextGreater(nums):
    n = len(nums)
    ans = [-1] * n

    for i in range(n):
        for j in range(i + 1, n):
            if nums[j] > nums[i]:
                ans[i] = nums[j]
                break

    return ans
```

Complexity:

$$
T(n)=O(n^2)
$$

The nested loops repeatedly inspect elements that have already been examined.

A monotonic stack can reduce the time complexity to \(O(n)\).

---

### 7.3 The Monotonic Stack Insight

Imagine scanning the array from left to right.

Some elements are waiting for a greater element to appear.

For example:

```text
[2, 1, 4]
```

Before processing `4`:

```text
Stack = [2, 1]
```

When `4` arrives, it is greater than both `1` and `2`.

Therefore, `4` is the next greater element for both.

We can resolve both elements by popping them.

#### Key invariant

The stack contains indices of elements whose next greater element has not yet been found.

The values at these indices are maintained in decreasing order from bottom to top.

---

### 7.4 Python implementation

```python
def nextGreater(nums):
    n = len(nums)
    ans = [-1] * n
    stack = []

    for i, x in enumerate(nums):

        while stack and nums[stack[-1]] < x:
            j = stack.pop()
            ans[j] = x

        stack.append(i)

    return ans
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

Although there is a `while` loop inside a `for` loop, the total number of stack pops is at most \(n\).

Every index is:

* Pushed once.
* Popped at most once.

Therefore, the total work is linear.

---

## 8. Pattern 4: Previous Greater and Previous Smaller Elements

The same technique can be adapted to find elements on the left.

### 8.1 Previous Greater Element

For each element, find the nearest greater element to its left.

Example:

```text
nums = [3, 1, 4, 2, 5]
```

Output:

```text
[-1, 3, -1, 4, -1]
```

#### Python implementation

```python
def previousGreater(nums):
    stack = []
    ans = []

    for i, x in enumerate(nums):

        while stack and nums[stack[-1]] <= x:
            stack.pop()

        ans.append(nums[stack[-1]] if stack else -1)

        stack.append(i)

    return ans
```

The stack removes elements that cannot be the previous greater element for the current value.

### 8.2 Previous Smaller Element

For each element, find the nearest smaller element to its left.

```python
def previousSmaller(nums):
    stack = []
    ans = []

    for i, x in enumerate(nums):

        while stack and nums[stack[-1]] >= x:
            stack.pop()

        ans.append(nums[stack[-1]] if stack else -1)

        stack.append(i)

    return ans
```

#### Pattern table

| Problem                         | Stack order | Pop condition    |
| ------------------------------- | ----------- | ---------------- |
| Next greater, left to right     | Decreasing  | `top < current`  |
| Next smaller, left to right     | Increasing  | `top > current`  |
| Previous greater, left to right | Decreasing  | `top <= current` |
| Previous smaller, left to right | Increasing  | `top >= current` |

**Important:** The exact comparison operator depends on whether equal values are allowed to remain on the stack.

This becomes especially important in histogram and subarray contribution problems.

---

## 9. Pattern 5: Daily Temperatures

LeetCode 739 — Daily Temperatures

Given daily temperatures, return the number of days until a warmer temperature occurs.

Example:

```python
temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
```

Output:

```text
[1, 1, 4, 2, 1, 1, 0, 0]
```

### Approach

Maintain a stack of indices whose next warmer day has not yet been found.

When a warmer temperature appears, resolve all earlier temperatures that are smaller.

```python
def dailyTemperatures(temperatures):
    n = len(temperatures)
    ans = [0] * n
    stack = []

    for i, temp in enumerate(temperatures):

        while stack and temperatures[stack[-1]] < temp:
            j = stack.pop()
            ans[j] = i - j

        stack.append(i)

    return ans
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### Interview takeaway

Whenever a problem asks:

* How many positions until a greater value?
* How far away is the next qualifying element?
* When will a condition first become true?

A monotonic stack is a strong candidate.

---

## 10. Pattern 6: Largest Rectangle in Histogram

This is a classic advanced monotonic stack problem.

LeetCode 84 — Largest Rectangle in Histogram

Given bar heights:

```text
heights = [2, 1, 5, 6, 2, 3]
```

Find the largest rectangle that can be formed within the histogram.

The answer is:

$$
10
$$

The rectangle uses the bars of heights `5` and `6`, with width \(2\):

$$
A=5\times2=10
$$

### 10.1 Mathematical Foundation

For a bar at index \(i\), suppose:

* \(L_i\) is the nearest index to the left with height strictly smaller than \(h_i\).
* \(R_i\) is the nearest index to the right with height strictly smaller than \(h_i\).

Then the maximum width for a rectangle of height \(h_i\) is:

$$
W_i=R_i-L_i-1
$$

The corresponding area is:

$$
A_i=h_i(R_i-L_i-1)
$$

Therefore:

$$
\boxed{
A_{\max}=\max_i h_i(R_i-L_i-1)
}
$$

The challenge is finding these boundaries efficiently.

---

### 10.2 Monotonic Stack Solution

Maintain indices of bars in increasing order of height.

When a shorter bar appears, taller bars can no longer extend beyond the current index.

Their maximum rectangle areas can be calculated immediately.

```python
def largestRectangleArea(heights):
    stack = []
    max_area = 0

    for i, h in enumerate(heights):

        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]

            left = stack[-1] if stack else -1
            width = i - left - 1

            max_area = max(max_area, height * width)

        stack.append(i)

    n = len(heights)

    while stack:
        height = heights[stack.pop()]
        left = stack[-1] if stack else -1

        width = n - left - 1
        max_area = max(max_area, height * width)

    return max_area
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### Why this pattern matters

This problem introduces a general technique:

> When an element's contribution is determined by the first smaller or greater element on either side, use a monotonic stack to find its boundaries.

This idea appears in:

* Maximal Rectangle
* Trapping Rain Water
* Sum of Subarray Minimums
* Sum of Subarray Ranges

---

## 11. Pattern 7: Trapping Rain Water

LeetCode 42 — Trapping Rain Water

Given an elevation map, calculate how much water can be trapped.

Example:

```python
height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
```

Output:

```text
6
```

### 11.1 Mathematical Foundation

For each index \(i\), define:

$$
L_i=\max(h_0,h_1,\ldots,h_i)
$$

$$
R_i=\max(h_i,h_{i+1},\ldots,h_{n-1})
$$

The water trapped at position \(i\) is:

$$
w_i=\max(0,\min(L_i,R_i)-h_i)
$$

Total trapped water:

$$
W=\sum_{i=0}^{n-1}w_i
$$

A monotonic stack provides another way to calculate the trapped water by identifying bounded regions.

### 11.2 Stack-Based Solution

```python
def trap(height):
    stack = []
    water = 0

    for i, h in enumerate(height):

        while stack and h > height[stack[-1]]:

            bottom = stack.pop()

            if not stack:
                break

            left = stack[-1]

            width = i - left - 1
            bounded_height = min(height[left], h) - height[bottom]

            water += width * bounded_height

        stack.append(i)

    return water
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### Key insight

The stack identifies a depression bounded by a left wall and a newly encountered right wall.

The trapped water is calculated as:

$$
\text{width}\times\text{bounded height}
$$

**Interview note:** This problem can also be solved using two pointers in \(O(n)\) time and \(O(1)\) auxiliary space.

---

## 12. Pattern 8: Expression Evaluation

Stacks are naturally suited to mathematical expressions because operators and operands often need to be processed in a particular order.

Common problem types:

* Reverse Polish Notation
* Infix-to-postfix conversion
* Infix expression evaluation
* Operator precedence
* Parenthesized expressions

### 12.1 Reverse Polish Notation

LeetCode 150 — Evaluate Reverse Polish Notation

Example:

```text
["2", "1", "+", "3", "*"]
```

This represents:

$$
(2+1)\times3=9
$$

#### Algorithm

1. Push operands.
2. When an operator appears, pop the required operands.
3. Apply the operator.
4. Push the result.

```python
def evalRPN(tokens):
    stack = []

    for token in tokens:

        if token in {"+", "-", "*", "/"}:

            b = stack.pop()
            a = stack.pop()

            if token == "+":
                result = a + b

            elif token == "-":
                result = a - b

            elif token == "*":
                result = a * b

            else:
                result = int(a / b)

            stack.append(result)

        else:
            stack.append(int(token))

    return stack[-1]
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### Important detail

For subtraction and division, operand order matters:

$$
a-b
$$

not:

$$
b-a
$$

For LeetCode's Reverse Polish Notation problem, integer division truncates toward zero.

---

## 13. Pattern 9: Parsing and Decoding Nested Strings

Stacks are useful for nested structures that must be processed from the innermost level outward.

### 13.1 Decode String

LeetCode 394 — Decode String

Example:

```text
s = "3[a2[c]]"
```

Output:

```text
"accaccacc"
```

The expression means:

$$
3\times(a+(2\times c))
$$

#### Approach

Maintain:

* A stack of previous strings.
* A stack of repetition counts.
* A current string.
* A current number.

```python
def decodeString(s):
    stack = []
    current = ""
    num = 0

    for ch in s:

        if ch.isdigit():
            num = num * 10 + int(ch)

        elif ch == "[":
            stack.append((current, num))
            current = ""
            num = 0

        elif ch == "]":
            previous, count = stack.pop()
            current = previous + current * count

        else:
            current += ch

    return current
```

#### Complexity

Let \(L\) be the length of the decoded output.

* Time: \(O(L)\) in terms of output construction, with additional costs possible from repeated string concatenation.
* Space: \(O(L+n)\) including the output and auxiliary state, where \(n\) is the encoded input length.

In Python, repeated string concatenation can create additional copying costs. A list-based string builder may be preferable for larger parsing tasks.

#### Related problems

* Decode String — 394
* Basic Calculator — 224
* Basic Calculator II — 227
* Basic Calculator III — 772
* Mini Parser — 385

---

## 14. Pattern 10: Stack-Based Simulation

A stack can model systems in which an incoming element interacts with the most recent unresolved element.

This is particularly useful for collision, cancellation, and elimination problems.

### 14.1 Asteroid Collision

LeetCode 735 — Asteroid Collision

Positive numbers represent asteroids moving right.

Negative numbers represent asteroids moving left.

When two asteroids collide, the smaller one explodes. If they have equal size, both explode.

Example:

```python
asteroids = [5, 10, -5]
```

Output:

```text
[5, 10]
```

#### Key observation

A collision can occur only when:

* The stack's top asteroid is moving right.
* The current asteroid is moving left.

```python
def asteroidCollision(asteroids):
    stack = []

    for asteroid in asteroids:
        alive = True

        while (
            alive
            and stack
            and stack[-1] > 0
            and asteroid < 0
        ):

            if stack[-1] < -asteroid:
                stack.pop()

            elif stack[-1] == -asteroid:
                stack.pop()
                alive = False

            else:
                alive = False

        if alive:
            stack.append(asteroid)

    return stack
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### Interview insight

Look for problems where:

* New elements interact with the latest unresolved element.
* An interaction can trigger further interactions.
* Removing one element may expose another interaction.

These are strong candidates for stack-based simulation.

---

## 15. Pattern 11: Stack + Greedy

In certain problems, the stack maintains a partially constructed answer.

When a new element arrives, the algorithm may remove earlier elements if doing so leads to a better solution.

This combines a stack with a greedy decision rule.

### 15.1 Remove K Digits

LeetCode 402 — Remove K Digits

Given a number represented as a string, remove exactly \(k\) digits to obtain the smallest possible number.

Example:

```text
num = "1432219"
k = 3
```

Output:

```text
"1219"
```

#### Greedy insight

If a digit is larger than the next digit, removing it can make the number smaller.

For example:

```text
143
```

Removing `4` gives:

```text
13
```

This is smaller than removing `1` or `3`.

#### Implementation

```python
def removeKdigits(num, k):
    stack = []

    for digit in num:

        while (
            stack
            and k > 0
            and stack[-1] > digit
        ):
            stack.pop()
            k -= 1

        stack.append(digit)

    while k > 0:
        stack.pop()
        k -= 1

    result = "".join(stack).lstrip("0")

    return result if result else "0"
```

#### Complexity

* Time: \(O(n)\)
* Space: \(O(n)\)

#### General pattern

Use a monotonic stack when the goal is to construct an optimal sequence by removing earlier elements that violate a greedy ordering condition.

Related problems:

* Remove K Digits — 402
* Create Maximum Number — 321
* Smallest Subsequence of Distinct Characters — 1081
* Remove Duplicate Letters — 316

---

## 16. Pattern 12: Designing Data Structures with Stacks

Interviewers may ask you to implement a data structure using one or more stacks.

These questions test whether you can maintain additional information efficiently.

### 16.1 Min Stack

LeetCode 155 — Min Stack

Design a stack supporting:

* `push(x)`
* `pop()`
* `top()`
* `getMin()`

All operations should run in \(O(1)\) time.

#### Approach

Maintain:

1. A regular stack.
2. A second stack storing the minimum value at each level.

```python
class MinStack:

    def __init__(self):
        self.stack = []
        self.min_stack = []

    def push(self, val):
        self.stack.append(val)

        if not self.min_stack:
            self.min_stack.append(val)
        else:
            self.min_stack.append(
                min(val, self.min_stack[-1])
            )

    def pop(self):
        self.stack.pop()
        self.min_stack.pop()

    def top(self):
        return self.stack[-1]

    def getMin(self):
        return self.min_stack[-1]
```

#### Complexity

| Operation   | Time     |
| ----------- | -------- |
| Push        | \(O(1)\) |
| Pop         | \(O(1)\) |
| Top         | \(O(1)\) |
| Get minimum | \(O(1)\) |

Auxiliary space:

$$
O(n)
$$

#### Alternative

Store pairs:

```python
(value, minimum_so_far)
```

This combines the two stacks into one.

---

## 17. Pattern 13: Stack + Binary Tree Traversal

Stacks are used to simulate recursive traversal iteratively.

This is particularly useful when:

* Recursion depth may become large.
* The problem explicitly asks for iterative traversal.
* You need to control traversal state manually.

### 17.1 Binary Tree Inorder Traversal

LeetCode 94 — Binary Tree Inorder Traversal

Inorder traversal visits:

$$
\text{Left}\rightarrow\text{Root}\rightarrow\text{Right}
$$

#### Iterative implementation

```python
def inorderTraversal(root):
    stack = []
    result = []
    current = root

    while current or stack:

        while current:
            stack.append(current)
            current = current.left

        current = stack.pop()
        result.append(current.val)

        current = current.right

    return result
```

#### Complexity

* Time: \(O(n)\)
* Auxiliary space: \(O(h)\), where \(h\) is the tree height.

In the worst case:

$$
O(n)
$$

For a balanced tree:

$$
O(\log n)
$$

#### Related problems

* Binary Tree Inorder Traversal — 94
* Binary Tree Preorder Traversal — 144
* Binary Tree Postorder Traversal — 145
* Flatten Binary Tree to Linked List — 114
* Binary Search Tree Iterator — 173

---

## 18. Pattern 14: Stack + Dynamic Programming

Stacks and dynamic programming can work together when a problem involves:

* Finding valid substrings.
* Maintaining boundaries.
* Tracking unresolved positions.
* Combining interval information.

### 18.1 Maximal Rectangle

LeetCode 85 — Maximal Rectangle

Given a binary matrix, find the largest rectangle containing only `1`s.

The central insight is to transform each row into a histogram.

For every row:

1. Update the height of consecutive `1`s in each column.
2. Treat the resulting heights as a histogram.
3. Solve the Largest Rectangle in Histogram problem.

If the matrix is:

```text
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0
```

The height array evolves as rows are processed.

For each row:

$$
h_j=
\begin{cases}
h_j+1, & \text{if matrix}[i][j]=1\\
0, & \text{otherwise}
\end{cases}
$$

The histogram solution can then be applied.

#### Complexity

For an \(m\times n\) matrix:

* Time: \(O(mn)\)
* Auxiliary space: \(O(n)\), excluding the input matrix.

This problem combines dynamic programming-style state updates with a monotonic stack.

---

## 19. Pattern 15: Sum of Subarray Minimums

LeetCode 907 — Sum of Subarray Minimums

Given an array, calculate the sum of the minimum element of every contiguous subarray.

Example:

```python
arr = [3, 1, 2, 4]
```

The subarrays are:

```text
[3]       → 3
[1]       → 1
[2]       → 2
[4]       → 4
[3,1]     → 1
[1,2]     → 1
[2,4]     → 2
[3,1,2]   → 1
[1,2,4]   → 1
[3,1,2,4] → 1
```

The sum is:

$$
17
$$

### 19.1 Contribution Technique

Instead of enumerating every subarray, calculate how many subarrays use each element as their minimum.

For each element \(a_i\), determine:

* \(L_i\): distance to the previous strictly smaller element.
* \(R_i\): distance to the next smaller-or-equal element.

Then the number of subarrays in which \(a_i\) is the selected minimum is:

$$
C_i=L_iR_i
$$

Its contribution is:

$$
a_iL_iR_i
$$

Therefore:

$$
\boxed{
\text{Answer}=\sum_i a_iL_iR_i
}
$$

A consistent tie-breaking rule is necessary when duplicate values exist.

For example, one valid convention is:

* Previous strictly smaller.
* Next smaller or equal.

Another valid convention reverses the strictness.

#### Why this matters

This pattern transforms a problem that appears to require examining \(O(n^2)\) subarrays into a linear-time contribution calculation.

Related problems:

* Sum of Subarray Minimums — 907
* Sum of Subarray Ranges — 2104
* Number of Visible People in a Queue — 1944

---

## 20. Advanced Pattern: Cartesian Trees

A monotonic stack can construct a Cartesian tree.

A Cartesian tree is a binary tree that satisfies:

1. The inorder traversal reproduces the original array order.
2. The tree satisfies a heap-ordering property.

For a min-Cartesian tree, the parent has a value no greater than its children.

This structure is closely connected to range minimum queries and histogram problems.

#### Why it matters

A Cartesian tree provides a structural interpretation of monotonic stack algorithms.

The stack is effectively maintaining the rightmost path of a partially constructed tree.

You do not need to master Cartesian trees before solving ordinary monotonic stack problems, but the connection is useful for advanced algorithm study.

---

## 21. Stack Pattern Recognition Cheat Sheet

Use this table when deciding whether a stack is appropriate.

| Problem clue                            | Potential pattern                       |
| --------------------------------------- | --------------------------------------- |
| Nested parentheses or brackets          | Matching stack                          |
| Nearest greater element                 | Monotonic stack                         |
| Nearest smaller element                 | Monotonic stack                         |
| First warmer day                        | Next greater element                    |
| Largest rectangle in a histogram        | Monotonic boundaries                    |
| Water trapped between bars              | Monotonic stack or two pointers         |
| Evaluate postfix expression             | Operand stack                           |
| Nested encoded strings                  | Parsing stack                           |
| Elements collide or cancel              | Simulation stack                        |
| Remove elements to optimize an ordering | Greedy monotonic stack                  |
| Retrieve minimum in \(O(1)\)            | Auxiliary stack                         |
| Iterative tree traversal                | Explicit stack                          |
| Largest rectangle in a binary matrix    | Histogram + monotonic stack             |
| Sum of subarray minima                  | Contribution counting + monotonic stack |
| Process undo operations                 | Stack                                   |
| Reverse a sequence                      | Stack                                   |

---

## 22. LeetCode Stack Problem Roadmap

The following roadmap is organized by difficulty and pattern.

It is intended to help you build skills progressively rather than solve problems randomly.

### Level 1: Fundamentals

| #    | Problem                                  | Pattern               |
| ---- | ---------------------------------------- | --------------------- |
| 20   | Valid Parentheses                        | Matching              |
| 155  | Min Stack                                | Stack design          |
| 150  | Evaluate Reverse Polish Notation         | Expression evaluation |
| 1047 | Remove All Adjacent Duplicates In String | Simulation            |
| 1544 | Make The String Great                    | Simulation            |
| 682  | Baseball Game                            | Simulation            |

### Level 2: Monotonic Stack Fundamentals

| #    | Problem                                        | Pattern                   |
| ---- | ---------------------------------------------- | ------------------------- |
| 496  | Next Greater Element I                         | Next greater              |
| 739  | Daily Temperatures                             | Next greater              |
| 901  | Online Stock Span                              | Previous greater          |
| 1475 | Final Prices With a Special Discount in a Shop | Next smaller or equal     |
| 496  | Next Greater Element I                         | Mapping + monotonic stack |
| 503  | Next Greater Element II                        | Circular next greater     |

### Level 3: Intermediate Stack Problems

| #   | Problem              | Pattern                 |
| --- | -------------------- | ----------------------- |
| 71  | Simplify Path        | Stack simulation        |
| 394 | Decode String        | Nested parsing          |
| 735 | Asteroid Collision   | Simulation              |
| 402 | Remove K Digits      | Greedy monotonic stack  |
| 853 | Car Fleet            | Sorting + stack         |
| 856 | Score of Parentheses | Matching and evaluation |
| 901 | Online Stock Span    | Monotonic stack         |

### Level 4: Advanced Monotonic Stack

| #    | Problem                             | Pattern                 |
| ---- | ----------------------------------- | ----------------------- |
| 84   | Largest Rectangle in Histogram      | Boundary detection      |
| 42   | Trapping Rain Water                 | Bounded regions         |
| 85   | Maximal Rectangle                   | Histogram + stack       |
| 907  | Sum of Subarray Minimums            | Contribution counting   |
| 2104 | Sum of Subarray Ranges              | Contribution counting   |
| 1944 | Number of Visible People in a Queue | Visibility              |
| 456  | 132 Pattern                         | Reverse monotonic stack |

### Level 5: Advanced Expression and Tree Problems

| #   | Problem                         | Pattern                   |
| --- | ------------------------------- | ------------------------- |
| 224 | Basic Calculator                | Expression parsing        |
| 227 | Basic Calculator II             | Operator precedence       |
| 772 | Basic Calculator III            | Nested expression parsing |
| 94  | Binary Tree Inorder Traversal   | Iterative traversal       |
| 144 | Binary Tree Preorder Traversal  | Iterative traversal       |
| 145 | Binary Tree Postorder Traversal | Iterative traversal       |
| 173 | Binary Search Tree Iterator     | Controlled traversal      |
| 341 | Flatten Nested List Iterator    | Nested traversal          |

**Study recommendation:** Start with Level 1 and Level 2, then focus on the monotonic stack problems in Levels 3 and 4. Those patterns cover a substantial portion of stack-based interview questions.

---

## 23. Advanced Interview Techniques and Tricks

### Trick 1: Store Indices Instead of Values

For many monotonic stack problems, storing indices is more useful than storing values.

Instead of:

```python
stack.append(nums[i])
```

Use:

```python
stack.append(i)
```

Then access the value using:

```python
nums[stack[-1]]
```

This allows you to calculate:

* Distance between elements.
* Width of intervals.
* Position of the next greater element.
* Position of the previous smaller element.

---

### Trick 2: Use a Sentinel to Simplify Boundary Handling

A sentinel is an artificial element added to simplify edge cases.

For example, in a histogram problem, a final height of `0` can force all remaining bars to be processed.

```python
def largestRectangleArea(heights):
    stack = []
    max_area = 0

    for i in range(len(heights) + 1):

        h = heights[i] if i < len(heights) else 0

        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            left = stack[-1] if stack else -1
            width = i - left - 1

            max_area = max(max_area, height * width)

        stack.append(i)

    return max_area
```

The sentinel removes the need for a separate cleanup loop.

**Caution:** This particular implementation assumes non-negative histogram heights and uses a strict comparison. Equal heights remain on the stack until a smaller height appears.

---

### Trick 3: Understand Strict and Non-Strict Comparisons

Consider:

```python
nums = [2, 2, 2]
```

For a next greater element problem, the comparison:

```python
nums[stack[-1]] < nums[i]
```

does not treat equal values as greater.

For a next greater-or-equal problem, use:

```python
nums[stack[-1]] <= nums[i]
```

The comparison operator determines how duplicates are handled.

In contribution-counting problems, inconsistent treatment of duplicates can cause double-counting.

---

### Trick 4: Prove Linear Time with Aggregate Analysis

A nested loop does not automatically imply quadratic complexity.

Consider:

```python
for x in nums:
    while stack and stack[-1] < x:
        stack.pop()
```

Each element is pushed once and popped at most once.

Therefore:

$$
\text{Total pushes}\leq n
$$

$$
\text{Total pops}\leq n
$$

Hence:

$$
T(n)=O(n)
$$

This is an example of amortized analysis.

---

### Trick 5: Distinguish a Stack from a Queue

A stack uses LIFO:

$$
\text{Last In}\rightarrow\text{First Out}
$$

A queue uses FIFO:

$$
\text{First In}\rightarrow\text{First Out}
$$

Use a stack when the most recent unresolved element matters.

Use a queue when the earliest pending element matters.

Examples:

* Stack: parentheses matching.
* Queue: breadth-first search.
* Monotonic stack: nearest greater element.
* Monotonic deque: sliding-window maximum.

---

## 24. Common Mistakes in Stack Problems

#### 1. Forgetting to check whether the stack is empty

Incorrect:

```python
if stack[-1] == x:
    stack.pop()
```

Correct:

```python
if stack and stack[-1] == x:
    stack.pop()
```

#### 2. Using values when indices are required

If the problem asks for distance or interval width, indices are generally more useful.

#### 3. Using the wrong comparison operator

`<`, `<=`, `>` and `>=` have different meanings.

Always define whether equal values should remain on the stack.

#### 4. Forgetting to process remaining elements

Some next-greater problems leave elements unresolved at the end.

These elements typically retain a default answer such as `-1` or `0`.

Histogram problems may require a final cleanup or a sentinel.

#### 5. Confusing the top of the stack with the bottom

In Python:

```python
stack.append(x)
```

adds to the end.

```python
stack.pop()
```

removes from the end.

Therefore:

```python
stack[-1]
```

is the top.

#### 6. Assuming every nested loop is quadratic

When elements are pushed and popped at most once, the total complexity can still be linear.

#### 7. Ignoring duplicate values

This is especially dangerous in:

* Sum of Subarray Minimums
* Sum of Subarray Ranges
* Largest Rectangle in Histogram
* Previous/next greater-or-equal problems


