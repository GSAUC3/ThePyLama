
# 25. Interview Preparation: How to Approach Stack Problems

For interview preparation, the most useful skill is not recognizing a familiar problem title. It is deriving the algorithm from the problem's structure.

Use the following process.

## Step 1: Identify the relationship

Ask:

* Am I matching nested elements?
* Am I searching for the nearest greater or smaller element?
* Am I maintaining a partially constructed answer?
* Am I resolving elements when a condition becomes true?
* Am I evaluating an expression?

## Step 2: Identify the invariant

Examples:

**Parentheses:**

The stack contains unmatched opening brackets.

**Next greater element:**

The stack contains indices of elements waiting for a greater element.

**Histogram:**

The stack maintains indices of bars in monotonic height order.

**Expression evaluation:**

The stack contains intermediate operands or partial results.

## Step 3: Define the pop condition

The pop condition is often the most important part of the algorithm.

For example:

```python
while stack and nums[stack[-1]] < nums[i]:
```

This condition says that the current element resolves the next-greater-element query for the stack's top.

## Step 4: Determine what happens when an element is popped

Ask:

* Does the current element become its answer?
* Can I calculate an interval width?
* Do I need to update a running total?
* Does popping expose another element that can now be resolved?

## Step 5: Prove correctness

Explain why:

1. The stack invariant holds after every iteration.
2. Every popped element has been resolved correctly.
3. Every unresolved element remains in the stack.
4. Every element is processed at most a constant number of times.

## Step 6: Analyze complexity

State:

* Time complexity.
* Auxiliary space complexity.
* Whether the complexity is worst-case or amortized.

---

# 26. A 14-Day Stack Study Plan

This schedule is designed to build understanding progressively.

| Day | Topic                    | Practice                                      |
| --- | ------------------------ | --------------------------------------------- |
| 1   | Stack fundamentals       | Valid Parentheses                             |
| 2   | Stack simulation         | Baseball Game, Remove All Adjacent Duplicates |
| 3   | Stack design             | Min Stack                                     |
| 4   | Expression evaluation    | Evaluate Reverse Polish Notation              |
| 5   | Next greater element     | Next Greater Element I                        |
| 6   | Monotonic stack          | Daily Temperatures                            |
| 7   | Previous greater element | Online Stock Span                             |
| 8   | Circular arrays          | Next Greater Element II                       |
| 9   | Nested parsing           | Decode String                                 |
| 10  | Stack simulation         | Asteroid Collision                            |
| 11  | Greedy monotonic stack   | Remove K Digits                               |
| 12  | Histogram boundaries     | Largest Rectangle in Histogram                |
| 13  | Water trapping           | Trapping Rain Water                           |
| 14  | Contribution technique   | Sum of Subarray Minimums                      |

After completing this schedule, move to Maximal Rectangle, Sum of Subarray Ranges, and advanced calculator problems.

---

# 27. Final Revision Sheet

Before an interview, remember these core principles:

**Stack fundamentals**

* LIFO ordering.
* `append()` and `pop()` in Python.
* \(O(1)\) amortized push.
* \(O(n)\) worst-case auxiliary space.

**Monotonic stack**

* Increasing stack → useful for smaller-element relationships.
* Decreasing stack → useful for greater-element relationships.
* Store indices when distances or boundaries matter.
* Define the pop condition precisely.
* Handle duplicate values consistently.

**Advanced applications**

* Histogram boundaries.
* Trapping Rain Water.
* Subarray contribution counting.
* Greedy sequence construction.
* Nested expression evaluation.
* Iterative tree traversal.

**Most important interview skill:**

> When an element is waiting for a future element to resolve a condition, consider storing it in a stack. When the condition becomes true, pop the element and process it.

That idea is the foundation of many linear-time stack algorithms.

---

# 28. Essential Problems to Master First

If you have limited time, focus on understanding these **10 problems deeply**:

1. Valid Parentheses — 20
2. Min Stack — 155
3. Evaluate Reverse Polish Notation — 150
4. Daily Temperatures — 739
5. Next Greater Element II — 503
6. Decode String — 394
7. Asteroid Collision — 735
8. Remove K Digits — 402
9. Largest Rectangle in Histogram — 84
10. Sum of Subarray Minimums — 907

For each problem, be able to explain:

* Why a stack is appropriate.
* What the stack stores.
* The invariant.
* The push and pop conditions.
* Why the algorithm is correct.
* Why the time complexity is \(O(n)\), when applicable.
* How the algorithm handles duplicates and edge cases.

**Mastering these patterns will give you a strong foundation for stack-based coding interviews, including the more challenging problems encountered in Google-style algorithmic interviews.**
