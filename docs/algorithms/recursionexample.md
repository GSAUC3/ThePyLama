# Merge Two Sorted Linked Lists — Recursive Thinking

**Topic:** Recursion  
**Difficulty:** Easy  
**Pattern:** Linear Recursion  
**Problem:** [LeetCode 21 — Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/)

---

## 1. Problem Statement

Given the heads of two sorted linked lists, `list1` and `list2`, merge them into one sorted linked list.

Return the **head of the merged sorted list**.

**Example:**

```text
Input:
list1 = 1 → 2 → 4 → None
list2 = 1 → 3 → 4 → None

Output:
1 → 1 → 2 → 3 → 4 → 4 → None
```

## 2. The Core Recursive Intuition

!!! important "The Most Important Mental Shift"
    Do not think: "How do I merge all the nodes myself?"

    Instead, think:

    **"If recursion gives me the correctly merged remainder, how do I connect it to the node I've chosen?"**

Recursion allows us to solve a problem by:

1. Solving a small part of the current problem.
2. Delegating the remaining problem to a recursive call.
3. Trusting the recursive call to return the correct result.
4. Combining that result with our current decision.

---

## 3. Questions to Ask Before Writing Code

### Q1. What is my function supposed to do?

**Function contract:**

```python
mergeTwoLists(list1, list2)
```

Given two sorted linked lists, return the **head of one fully merged, sorted linked list** containing all their nodes.

!!! note "Why the Function Contract Matters"
    Every recursive call must satisfy the same contract.

    Whether the input lists contain 100 nodes or just one node, the function always promises the same thing: **return the head of the correctly merged list.**

### Q2. What is the smallest problem I can solve directly?

If either list is empty, there is nothing left to merge.

```python
if list1 is None:
    return list2

if list2 is None:
    return list1
```

**Reasoning:**

- If `list1` is empty, `list2` is already sorted.
- If `list2` is empty, `list1` is already sorted.
- If both are empty, returning `None` is correct.

These are our **base cases**.

### Q3. What can I decide at the current level?

Compare the two head nodes.

Because both lists are sorted, the smaller head must be the first node of the merged list.

```python
if list1.val > list2.val:
    # list2 must come first
else:
    # list1 must come first
```

!!! tip "Think Locally"
    We do not need to determine the complete sorted order.

    We only need to determine **which node comes first**.

    Recursion will take care of the remaining nodes.

### Q4. What smaller problem remains?

Suppose:

```text
list1 = 2 → 4 → None
list2 = 1 → 3 → None
```

We compare `2` and `1`.

Since `1` is smaller, we select it as the head.

```text
Selected node:
1

Remaining problem:
list1 = 2 → 4 → None
list2 = 3 → None
```

The smaller problem is now:

```python
self.mergeTwoLists(list1, list2.next)
```

Notice that we have removed **one node from the remaining problem**.

We are not manually merging the remaining nodes.

We are delegating that work to recursion.

### Q5. What should I assume about the recursive call?

This is the most important question.

**Recursive assumption:**

> Assume `mergeTwoLists(list1, list2.next)` correctly merges the remaining two sorted lists and returns the head of the merged result.

We do not need to trace every recursive call to construct the solution.

We trust the function's contract for the smaller input.

!!! important "The Recursive Leap of Faith"
    Assume the recursive call works correctly on a smaller valid input.

    Your responsibility is to prove that:

    - The smaller input is valid.
    - The problem gets smaller.
    - You correctly use the returned result.
    - A base case eventually stops recursion.

### Q6. How do I use the returned result?

We have already selected `list2` as the first node.

The recursive call returns the head of the correctly merged remainder.

We attach that result to `list2.next`.

```python
list2.next = self.mergeTwoLists(list1, list2.next)
```

Conceptually:

```text
Current selected node:
1

Recursive call returns:
2 → 3 → 4 → None

Connect:
1 → 2 → 3 → 4 → None
```

### Q7. What should my function return?

Return the node we selected as the head.

```python
return list2
```

Why?

Because:

- `list2` is the smallest available node.
- `list2.next` points to the correctly merged remainder.
- Therefore, `list2` is the head of the complete merged list.

### Q8. Why will recursion terminate?

Every recursive call advances one of the two head pointers.

This reduces the total number of unprocessed nodes by one.

Eventually, at least one list becomes empty.

At that point, the base case returns the remaining list.

---

## 4. Complete Recursive Solution With Thought Process

```python
class Solution:
    def mergeTwoLists(
        self,
        list1: Optional[ListNode],
        list2: Optional[ListNode]
    ) -> Optional[ListNode]:

        # ==============================================
        # Q1. WHAT DOES MY FUNCTION PROMISE?
        # ==============================================
        #
        # Given two sorted linked lists, return the
        # head of their correctly merged sorted list.
        #
        # ASSUMPTIONS:
        # - Both input lists are already sorted.
        # - We can reuse existing nodes.
        # - A recursive call on smaller valid inputs
        #   returns the correctly merged list's head.

        # ==============================================
        # Q2. WHAT IS MY BASE CASE?
        # ==============================================
        #
        # If either list is empty, the other list
        # is already sorted and can be returned.

        if list1 is None:
            return list2

        if list2 is None:
            return list1

        # ==============================================
        # Q3. WHICH NODE SHOULD COME FIRST?
        # ==============================================
        #
        # Compare the current heads.
        # Select the smaller node.

        if list1.val > list2.val:

            # list2 is the smaller node.
            # It must be the head of our merged list.

            # ==========================================
            # Q4. WHAT SMALLER PROBLEM REMAINS?
            # ==========================================
            #
            # Merge:
            # - Entire list1
            # - Remaining nodes after list2
            #
            # Q5. WHAT DO I ASSUME?
            #
            # Recursion returns the head of the
            # correctly merged remaining nodes.
            #
            # Q6. HOW DO I CONNECT THE RESULT?
            #
            # Attach the recursive result to list2.next.

            list2.next = self.mergeTwoLists(
                list1,
                list2.next
            )

            # ==========================================
            # Q7. WHAT DO I RETURN?
            # ==========================================
            #
            # list2 is the smallest node.
            # Its next points to the merged remainder.
            # Return list2 as the merged list's head.

            return list2

        else:

            # list1 is smaller or equal.
            # It must be the head of our merged list.

            # SMALLER PROBLEM:
            # - Remaining nodes after list1
            # - Entire list2
            #
            # RECURSIVE ASSUMPTION:
            # The call correctly merges these lists.
            #
            # CONNECTION:
            # Attach its returned head to list1.next.

            list1.next = self.mergeTwoLists(
                list1.next,
                list2
            )

            # Return our selected head.
            return list1
```

---

## 5. Dry Run — Understanding the Recursive Calls

Consider:

```text
list1 = 1 → 3 → None
list2 = 2 → 4 → None
```

### Going Down — Delegating Smaller Problems

| Call | Current heads | Selected node | Smaller problem |
|---|---|---|---|
| 1 | 1, 2 | 1 | Merge (3, 2) |
| 2 | 3, 2 | 2 | Merge (3, 4) |
| 3 | 3, 4 | 3 | Merge (None, 4) |
| 4 | None, 4 | Base case | Return 4 |

### Coming Back — Connecting Returned Results

```text
Base case:
    return 4

Call 3:
    3.next = 4
    return 3 → 4

Call 2:
    2.next = 3 → 4
    return 2 → 3 → 4

Call 1:
    1.next = 2 → 3 → 4
    return 1 → 2 → 3 → 4
```

**Final result:**

```text
1 → 2 → 3 → 4 → None
```

!!! note "Important Observation"
    On the way down, each call selects the smallest available node and delegates the rest.

    On the way back, each call receives the head of the merged remainder, connects it, and returns its own selected node.

    This is why recursion works without manually tracking every node.

---

## 6. Mistakes I Made While Developing the Intuition

### Mistake 1: Incorrect Base Case

**Initial thought:**

> Stop when both lists have only one node.

**Why this was incorrect:**

The lists may have different lengths. One list can become empty while the other still contains multiple nodes.

**Correct intuition:**

> If either list is empty, return the other list because it is already sorted.

### Mistake 2: Trying to Connect Nodes Before Solving the Smaller Problem

**Initial approach:**

```python
list2.next = list2
```

**Why this was incorrect:**

This makes a node point to itself, creating a cycle.

I was trying to manually establish connections without thinking about what recursion should return.

**Correct intuition:**

```python
list2.next = self.mergeTwoLists(list1, list2.next)
```

The recursive call returns the merged remainder, which I attach to my selected node.

### Mistake 3: Not Returning the Selected Head

**Incorrect mental model:**

> The recursive call should return the answer for my entire current problem.

**Correct mental model:**

> The recursive call returns the answer for the smaller problem. I use that answer to complete my current problem, then return my current problem's head.

---

## 7. Complexity Analysis

Let:

- `m` = number of nodes in `list1`
- `n` = number of nodes in `list2`

**Time Complexity: O(m + n)**

Each recursive call processes one node. In the worst case, we examine all nodes across both lists.

**Auxiliary Space Complexity: O(m + n)**

We reuse the existing linked-list nodes, but recursive calls consume stack space.

The maximum recursion depth is proportional to the combined number of nodes.

---

## 8. Reusable Recursion Checklist

Before solving any recursive problem, answer these questions:

- [ ] **Function contract:** What exactly must my function return or accomplish?
- [ ] **Base case:** What is the smallest problem I can solve directly?
- [ ] **Current decision:** What part can I solve at the current level?
- [ ] **Smaller problem:** What remains after my current decision?
- [ ] **Recursive assumption:** What do I trust the recursive call to return or accomplish?
- [ ] **Combination:** How do I use the recursive result?
- [ ] **Return:** What should I return to my caller?
- [ ] **Termination:** Why does every recursive call move toward the base case?

---

## 9. Final Mental Model

For merging two sorted linked lists:

```text
1. Compare the current heads.

2. Select the smaller node.

3. Ask recursion to merge the remaining nodes.

4. Assume recursion returns the correctly merged remainder.

5. Attach that result to the selected node.

6. Return the selected node.
```

!!! quote "The Key Insight"
    **I am responsible for choosing the first node. Recursion is responsible for merging the rest.**

    Once recursion returns the merged remainder, I connect it to my chosen node and return that node as the head.

**What to remember:** Recursion is not about mentally executing every function call. It is about defining a reliable function contract, reducing the problem, and correctly using the answer to the smaller problem.