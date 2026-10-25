# Recursion — Intuition & Problem-Solving Framework

> **Core intuition:** Solve what you can at the current level, delegate the smaller problem to recursion, and trust the result.

## 1. How to Think Recursively

Don't think:

- How will every recursive call execute?
- How do I solve the entire problem at once?
- How do I manually track all the calls?

Instead, think:

1. **What can I solve right now?**
2. **What smaller problem can I delegate?**
3. **What can I assume recursion will return?**
4. **How do I use that result to complete my answer?**

!!! important "The Recursive Leap of Faith"
    Assume your recursive function **correctly solves a smaller valid instance of the same problem**.

    Your job is to make sure:
    
    - The smaller problem is valid.
    - Each call moves toward a base case.
    - The base case is correct.
    - You correctly use the recursive result.

---

## 2. The Right Questions to Ask

Ask these questions **before writing code**, in this order.

| # | Question | Purpose |
|---|---|---|
| 1 | **What does my function promise to do or return?** | Define the function contract |
| 2 | **What is the smallest problem I can solve directly?** | Identify the base case |
| 3 | **What can I decide or solve at the current level?** | Identify the current work |
| 4 | **What smaller problem remains?** | Identify the recursive call |
| 5 | **What do I assume recursion returns or accomplishes?** | Establish the recursive assumption |
| 6 | **How do I use the recursive result?** | Combine or connect results |
| 7 | **What should I return?** | Fulfil the function contract |
| 8 | **Why will recursion terminate?** | Verify progress toward the base case |

!!! tip "The Most Powerful Question"
    **If someone handed me the correct answer to a smaller version of this problem, how would I use it to solve the current problem?**

    This question often reveals the recursive relationship.

---

## 3. The Three Parts of Recursion

### 1. Base Case — When to Stop?

Identify the smallest input that can be handled directly.

```python
if smallest_problem:
    return direct_answer
```

### 2. Recursive Case — What to Delegate?

Reduce the original problem into one or more smaller instances of the same problem.

```python
smaller_answer = solve(smaller_problem)
```

### 3. Combine — How to Complete My Answer?

Use the smaller problem's answer to solve the current problem.

```python
return combine(current_work, smaller_answer)
```

!!! note
    Not every recursive function needs an explicit combination step. Some perform work before the recursive call, while others pass accumulated results through parameters.

---

## 4. The Recursive Assumption

Suppose:

```python
def solve(n):
    ...
```

The recursive assumption is:

> `solve(n - 1)` correctly solves the problem for input `n - 1`.

**Important distinctions:**

- Assume the smaller call works correctly.
- Do not assume the current problem is already solved.
- Do not assume the base case or termination automatically works.
- Prove that your current logic transforms the smaller answer into the required answer.

This is the foundation of recursive correctness.

---

## 5. Recognising Recursive Patterns

| Pattern | Question to ask |
|---|---|
| **Linear recursion** | Can I solve this using one smaller problem? |
| **Tree recursion** | What do I need from the left and right subtrees? |
| **Divide and conquer** | Can I solve independent parts and combine their answers? |
| **Backtracking** | What choice can I make, explore, and undo? |
| **Recursive DP** | Are the same smaller problems being solved repeatedly? |

### Two Common Ways to Think

**Top-down: Delegate work**

```text
Solve current problem
    ↓
Delegate smaller problem
    ↓
Reach base case
```

**Bottom-up: Construct answers**

```text
Base case returns
    ↓
Smaller answer becomes available
    ↓
Build the current answer
```

These are two ways to reason about the same recursive execution.

---

## 6. Tips & Tricks

### Tip 1: Define the Function Contract First

Before coding, complete this sentence:

> My function takes ______ and returns / guarantees ______.

A clear contract makes it easier to decide what recursive calls should accomplish.

### Tip 2: Think About One Call, Not the Entire Call Stack

Focus on what the current call does, assuming smaller calls work.

Trace the full call stack later to debug or verify your understanding.

### Tip 3: Find What Gets Smaller

Ask:

> What strictly decreases or progresses toward termination?

Examples:

- Array: remaining elements decrease.
- Linked list: advance to `head.next`.
- Tree: move to smaller subtrees.
- Backtracking: advance through decisions or reduce remaining choices.

### Tip 4: Separate the Current Work From Recursive Work

Ask:

> What is **my responsibility**, and what is **recursion's responsibility**?

For example, when merging sorted linked lists:

- My responsibility: choose the smaller head.
- Recursion's responsibility: merge the remaining nodes.
- My final responsibility: connect the result and return the head.

### Tip 5: Be Precise About Return Values

Ask:

> Does the recursive call return a value, modify something, or both?

Not every recursive function returns the final answer directly. Some modify shared state or build answers through parameters.

### Tip 6: Trace Small Examples

If stuck, try inputs of size `0`, `1`, `2`, and `3`.

Observe:

- When does recursion stop?
- What parameters change?
- What does each call return?
- What happens before and after the recursive call?

### Tip 7: Check for Repeated Work

If multiple recursive branches repeatedly solve the same subproblem, consider **memoization**.

Recursion defines the solution; memoization can avoid redundant computation.

---

## 7. Common Mistakes

| Mistake | Better thinking |
|---|---|
| Trying to visualise every call before writing code | Focus on one call and its contract |
| Writing the recursive call without defining its purpose | Identify the exact smaller problem |
| Incorrect base case | Identify inputs solvable without recursion |
| Not reducing the problem | Verify progress toward termination |
| Ignoring the recursive return value | Ask how the smaller answer contributes |
| Modifying pointers or state too early | Decide what must be preserved or returned |
| Assuming recursion automatically works | Verify the base case, reduction, and combination |

---

## 8. Recursion Problem-Solving Template

```python
def solve(problem):

    # 1. CONTRACT:
    # What does solve(problem) promise?

    # 2. BASE CASE:
    # What can be solved directly?
    if base_case:
        return base_answer

    # 3. CURRENT WORK:
    # What can I decide or process now?

    # 4. SMALLER PROBLEM:
    # What valid smaller problem remains?

    # 5. RECURSIVE ASSUMPTION:
    # Trust solve(smaller_problem) to fulfil
    # the same function contract.

    result = solve(smaller_problem)

    # 6. COMBINE:
    # How do I use the recursive result?

    # 7. RETURN:
    # Fulfil the current function's contract.
    return combine(result)
```

*This is a conceptual template, not a structure every recursive algorithm must follow.*

---

## 9. Final Mental Checklist

Before writing code:

- [ ] I know exactly what my function promises.
- [ ] I have identified the base case.
- [ ] I know what work belongs to the current call.
- [ ] I can express the remaining work as a smaller problem.
- [ ] I know what the recursive call guarantees.
- [ ] I know how to use its result.
- [ ] I know what my current call must return.
- [ ] I can explain why recursion eventually stops.

!!! quote "Golden Rule of Recursion"
    **Don't solve the entire problem. Solve one level correctly, trust recursion to solve the smaller problem, and use its result to complete your answer.**

    Think in terms of **contracts, smaller problems, assumptions, and connections** — not individual function calls.