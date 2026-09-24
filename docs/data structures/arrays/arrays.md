# Arrays

Arrays are one of the most fundamental data structures in computer science.

They are simple enough to describe mathematically, but powerful enough to support a large fraction of competitive-programming and algorithmic techniques.

This page develops arrays from:

1. their mathematical model,
2. their memory representation,
3. their fundamental operations,
4. their complexity,
5. and the major patterns used in LeetCode and competitive programming.

---

## 1. What Is an Array?

An array is an ordered collection of elements stored under consecutive indices.
Starting from [0,n-1]. N is the number of elements in an array.

For example:

```python
A = [10, 20, 30, 40, 50]
```

The indices are:

```text
index:   0    1    2    3    4
         ↓    ↓    ↓    ↓    ↓
array:  [10] [20] [30] [40] [50]
```

The important property is:

> The position of an element is determined directly by its index.

---

## 2. The Mathematical Model

An array can be modeled as a function.

For an array of length \(n\):

$$
A : \{0,1,\ldots,n-1\} \rightarrow S
$$

where \(S\) is the set of values that the array can contain.

For example:

$$
A = [7,4,9,2]
$$

can be represented as:

$$
A(0)=7
$$

$$
A(1)=4
$$

$$
A(2)=9
$$

$$
A(3)=2
$$

Thus:

$$
A(i)
$$

means:

> Give me the value associated with index \(i\).

This mathematical model is useful because it separates two concepts:

- **index** — where the element is
- **value** — what is stored there

---

## 3. Array as a Sequence

An array is also a finite sequence:

$$
(a_0,a_1,\ldots,a_{n-1})
$$

The order matters.

Therefore:

$$
[1,2,3] \neq [3,2,1]
$$

even though they contain the same set of values.

This distinction becomes important in problems involving:

- subsequences,
- permutations,
- sorting,
- two pointers,
- dynamic programming,
- monotonic structures.

---

## 4. Why Is Array Access \(O(1)\)?

The key property of an array is **contiguous memory**.

Suppose:

- the first element is stored at address \(B\),
- each element occupies \(w\) bytes.

Then the address of \(A[i]\) is:

$$
\boxed{
\operatorname{address}(A[i]) = B + iw
}
$$

For example, suppose:

$$
B=1000
$$

and every element occupies:

$$
w=4\text{ bytes}
$$

Then:

$$
A[0]\rightarrow1000
$$

$$
A[1]\rightarrow1004
$$

$$
A[2]\rightarrow1008
$$

$$
A[3]\rightarrow1012
$$

Therefore, to access \(A[i]\), the machine can calculate:

$$
B+iw
$$

directly.

It does **not** need to visit:

$$
A[0],A[1],\ldots,A[i-1]
$$

first.

Hence:

$$
\boxed{T_{\text{access}}(n)=\Theta(1)}
$$

---

## 5. What Does \(O(1)\) Actually Mean?

\(O(1)\) does **not** necessarily mean:

> exactly one CPU instruction.

It means that the number of operations does not grow with \(n\).

For example:

```python
x = A[i]
```

may involve:

1. calculating an address,
2. checking bounds,
3. accessing cache,
4. potentially accessing RAM.

But the number of these operations does not depend on whether the array contains:

$$
100
$$

or

$$
10^9
$$

elements.

Therefore the asymptotic complexity is:

$$
O(1)
$$

---

## 6. Array Memory Layout

Conceptually:

```text
Memory

       B
       ↓
┌──────┬──────┬──────┬──────┬──────┐
│ A[0] │ A[1] │ A[2] │ A[3] │ A[4] │
└──────┴──────┴──────┴──────┴──────┘
```

The elements are adjacent.

If each element has size \(w\):

$$
A[i] = B + iw
$$

This is the fundamental reason random access is possible.

---

## 7. Array Operations

Let:

$$
n = |A|
$$

be the number of elements.

### 7.1 Access

```python
x = A[i]
```

Complexity:

$$
\boxed{O(1)}
$$

---

### 7.2 Update

```python
A[i] = x
```

Complexity:

$$
\boxed{O(1)}
$$

---

### 7.3 Traverse

```python
for x in A:
    process(x)
```

Every element is visited once.

$$
\boxed{O(n)}
$$

---

### 7.4 Linear Search

Find whether \(x\) exists:

```python
for i, value in enumerate(A):
    if value == x:
        return i
```

Worst case:

$$
\boxed{O(n)}
$$

because we may need to inspect every element.

---

### 7.5 Insert at the End

If there is free capacity:

$$
\boxed{O(1)}
$$

For a dynamic array, this is:

$$
\boxed{O(1)\text{ amortized}}
$$

but a resize can cost:

$$
O(n)
$$

---

### 7.6 Insert at the Beginning

Suppose:

```text
[1,2,3,4]
```

and we insert \(0\):

```text
[0,1,2,3,4]
```

Every existing element must move.

Therefore:

$$
\boxed{O(n)}
$$

---

### 7.7 Insert in the Middle

For insertion at index \(i\), approximately:

$$
n-i
$$

elements must be shifted.

Therefore:

$$
\boxed{O(n)}
$$

worst case.

---

### 7.8 Delete from the End

If the array supports removing the final element:

$$
\boxed{O(1)}
$$

---

### 7.9 Delete from the Beginning

Removing the first element requires shifting the remaining elements.

$$
\boxed{O(n)}
$$

---

### 7.10 Delete from the Middle

Deleting \(A[i]\) requires shifting:

$$
A[i+1],A[i+2],\ldots,A[n-1]
$$

left.

Therefore:

$$
\boxed{O(n)}
$$

---

## 8. Complete Array Complexity Table

| Operation           |                             Complexity |
| ------------------- | -------------------------------------: |
| Access              |                               \(O(1)\) |
| Update              |                               \(O(1)\) |
| Traverse            |                               \(O(n)\) |
| Linear search       |                               \(O(n)\) |
| Binary search       |                          \(O(\log n)\) |
| Append              |                     \(O(1)\) amortized |
| Insert at beginning |                               \(O(n)\) |
| Insert at middle    |                               \(O(n)\) |
| Delete at beginning |                               \(O(n)\) |
| Delete at middle    |                               \(O(n)\) |
| Delete at end       |                               \(O(1)\) |
| Reverse             |                               \(O(n)\) |
| Sort                | \(O(n\log n)\) typical comparison sort |

---

## 9. Important Array Patterns

Most LeetCode and competitive-programming array problems are not solved by knowing more syntax.

They are solved by recognizing **structure**.

The major patterns are:

```text
Arrays
├── Basic traversal
├── Frequency counting
├── Prefix/Suffix
├── Two pointers
├── Sliding window
├── Binary search
├── Sorting + scanning
├── Hashing
├── Kadane's algorithm
├── Difference arrays
├── Intervals
├── Monotonic stack
├── Monotonic deque
├── Greedy
├── Dynamic programming
├── Divide and conquer
├── Bit manipulation
├── Cyclic placement
├── Coordinate compression
├── Sweep line
└── Matrix techniques
```

---

## 10. Pattern: Basic Traversal

The simplest array pattern.

```python
for x in nums:
    ...
```

Use when:

- every element must be inspected,
- the answer can be maintained incrementally,
- no special ordering is required.

Typical examples:

- maximum element,
- minimum element,
- sum,
- count,
- frequency,
- validation.

---

### Running State

Instead of storing everything, maintain only what is necessary.

```python
maximum = float("-inf")

for x in nums:
    maximum = max(maximum, x)
```

Complexity:

$$
O(n)
$$

Time:

$$
O(n)
$$

Space:

$$
O(1)
$$

---

## 11. Pattern: Frequency Counting

When values belong to a manageable domain, count occurrences.

```python
freq = {}

for x in nums:
    freq[x] = freq.get(x, 0) + 1
```

Useful for:

- duplicates,
- anagrams,
- frequency comparisons,
- majority elements,
- counting pairs.

Complexity:

$$
O(n)
$$

average time with hashing.

---

### Frequency Array

If:

$$
0\le x < k
$$

and \(k\) is reasonably small:

```python
freq = [0] * k

for x in nums:
    freq[x] += 1
```

This can be preferable to hashing.

Complexity:

$$
O(n+k)
$$

---

## 12. Pattern: Prefix Sum

Define:

$$
P[i]=\sum_{j=0}^{i}A[j]
$$

Example:

```text
A = [3, 1, 4, 2]

P = [3, 4, 8, 10]
```

Range sum:

$$
\sum_{i=l}^{r}A[i]
=
P[r]-P[l-1]
$$

for \(l>0\).

With a leading zero:

```python
prefix = [0]

for x in nums:
    prefix.append(prefix[-1] + x)
```

Then:

$$
\boxed{
\operatorname{sum}(l,r)
=
P[r+1]-P[l]
}
$$

This version avoids special-casing \(l=0\).

---

## 13. Prefix/Suffix Maximum

For:

```text
nums = [3, 1, 5, 2, 4]
```

prefix maximum:

```text
[3, 3, 5, 5, 5]
```

suffix maximum:

```text
[5, 5, 5, 4, 4]
```

Useful for:

- trapping rain water,
- left/right maximum problems,
- dominance relationships,
- range maximum reasoning.

---

## 14. Pattern: Difference Array

For range updates:

$$
[l,r]
$$

add \(x\).

Instead of modifying every element:

```python
diff[l] += x

if r + 1 < n:
    diff[r + 1] -= x
```

Then reconstruct using a prefix sum.

This transforms:

$$
O(n)
$$

per update into:

$$
O(1)
$$

per update.

If there are \(q\) updates:

$$
O(q+n)
$$

instead of potentially:

$$
O(qn).
$$

---

## 15. Pattern: Two Pointers

---

## 16. Two Sum on a Sorted Array

---

## 17. Pattern: Sliding Window

---

## 18. Fixed-Size Sliding Window

---

## 19. Variable-Size Sliding Window

---

## 20. Sliding Window Warning

---

## 21. Pattern: Binary Search

---

## 22. Binary search on the answer

---

## 23. Lower Bound

---

## 24. Upper Bound

---

## 25. Pattern: Sorting + Scanning

Sometimes the original order does not matter.

Sorting costs:

$$
O(n\log n)
$$

but can expose structure that allows a simple linear scan.

Common problems:

- 3Sum,
- merging intervals,
- grouping values,
- duplicate detection,
- closest pairs,
- greedy scheduling.

General strategy:

```text
unsorted array
      ↓
    sort
      ↓
exploit ordering
      ↓
   linear scan
```

---

## 26. 3Sum Pattern

Sort:

```python
nums.sort()
```

Fix one element:

```python
for i in range(n):
```

Then solve the remaining two-sum problem with two pointers.

Complexity:

$$
O(n\log n)+O(n^2)
$$

therefore:

$$
\boxed{O(n^2)}
$$

A crucial optimization is skipping duplicates:

```python
if i > 0 and nums[i] == nums[i - 1]:
    continue
```

and similarly for the two pointers.

---

## 27. Pattern: Hashing

If we need fast membership:

```python
seen = set()
```

Average complexity:

$$
O(1)
$$

per lookup.

Typical pattern:

```python
for x in nums:
    if x in seen:
        ...
    seen.add(x)
```

Useful for:

- duplicates,
- Two Sum,
- longest consecutive sequence,
- complement lookup,
- frequency problems.

Trade-off:

$$
\text{Time} \downarrow
$$

at the cost of:

$$
\text{Space} \uparrow
$$

---

## 28. Pattern: Complement Lookup

For Two Sum:

$$
a+b=T
$$

Rearrange:

$$
b=T-a
$$

Therefore, while processing \(a\), search for:

$$
T-a.
$$

```python
seen = {}

for i, x in enumerate(nums):
    complement = target - x

    if complement in seen:
        return [seen[complement], i]

    seen[x] = i
```

Average:

$$
O(n)
$$

time.

Space:

$$
O(n)
$$

---

## 29. Pattern: Kadane's Algorithm

Maximum subarray sum.

Define:

$$
bestEndingHere(i)
$$

as the maximum sum of a subarray ending at \(i\).

Then:

$$
dp[i]
=
\max
\left(
A[i],
dp[i-1]+A[i]
\right)
$$

The answer is:

$$
\max_i dp[i].
$$

We only need the previous state:

```python
current = nums[0]
best = nums[0]

for x in nums[1:]:
    current = max(x, current + x)
    best = max(best, current)
```

Time:

$$
O(n)
$$

Space:

$$
O(1)
$$

---

## 30. Pattern: Monotonic Stack

Use when the problem asks for relationships with the:

- next greater element,
- next smaller element,
- previous greater element,
- previous smaller element.

Example:

```text
A = [2,1,5,3]
```

For each element, we may want the first larger element to its right.

A monotonic stack maintains elements in sorted order.

Typical complexity:

$$
O(n)
$$

Why?

Every element is:

- pushed at most once,
- popped at most once.

Therefore total stack operations are:

$$
O(n).
$$

---

## 31. Pattern: Monotonic Deque

Useful when we need:

> maximum/minimum over a moving window.

Example:

```text
[1,3,-1,-3,5,3,6,7]
```

with window size \(k\).

A deque can maintain candidates in decreasing order.

The front always contains the maximum candidate.

Each element enters and leaves the deque at most once.

Therefore:

$$
\boxed{O(n)}
$$

---

## 32. Pattern: Intervals

An interval is:

$$
[l,r]
$$

Typical problems:

- merge intervals,
- insert interval,
- overlapping intervals,
- meeting rooms,
- interval scheduling.

Usually:

```python
intervals.sort()
```

Then scan from left to right.

Sorting provides:

$$
l_1\le l_2\le\cdots
$$

which makes overlap relationships easier to reason about.

---

## 33. Interval Overlap

Two intervals:

$$
[a,b]
$$

and:

$$
[c,d]
$$

overlap if:

$$
a\le d
$$

and:

$$
c\le b.
$$

Equivalently:

$$
\max(a,c)\le\min(b,d).
$$

This identity is worth remembering.

---

## 34. Pattern: Cyclic Sort / Index Placement

Useful when:

- numbers are in a restricted range,
- values correspond to indices,
- we need \(O(1)\) auxiliary space.

For example:

$$
1\le A[i]\le n.
$$

The desired position of value \(x\) is often:

$$
x-1.
$$

So:

```python
while nums[i] != i + 1:
    ...
```

This pattern appears in:

- Missing Number,
- Find All Numbers Disappeared in an Array,
- First Missing Positive,
- Find the Duplicate Number.

---

## 35. Pattern: In-Place Marking

If values are restricted to indices, use the array itself as memory.

For example, if:

$$
1\le x\le n
$$

we can mark index \(x-1\).

A common trick:

```python
nums[abs(x) - 1] *= -1
```

The sign stores additional information.

This can reduce:

$$
O(n)\text{ auxiliary space}
$$

to:

$$
O(1).
$$

Be careful when modifying the array because the original values may be needed later.

---

## 36. Pattern: Dutch National Flag

For arrays containing three categories, for example:

```text
0, 1, 2
```

maintain three regions:

```text
[0 ... low-1]
[low ... mid-1]
[mid ... high]
[high+1 ... n-1]
```

Maintain invariant:

```text
0-region | 1-region | unknown | 2-region
```

The algorithm runs in:

$$
O(n)
$$

time and:

$$
O(1)
$$

space.

---

## 37. Pattern: Majority Element

If an element appears more than:

$$
\frac n2
$$

times, use Boyer-Moore Voting.

Maintain:

```python
candidate
count
```

When:

$$
count=0
$$

choose a new candidate.

Otherwise:

```text
same candidate → count + 1
different       → count - 1
```

The intuition is cancellation.

Pairs of different elements cancel each other.

A true majority cannot be completely cancelled.

Complexity:

$$
O(n)
$$

time.

$$
O(1)
$$

space.

---

## 38. Pattern: Prefix + Hash Map

A powerful combination.

Suppose:

$$
prefix[i]=\sum_{j=0}^{i}A[j].
$$

For a subarray sum equal to \(k\):

$$
prefix[r]-prefix[l]=k
$$

which means:

$$
prefix[l]=prefix[r]-k.
$$

Therefore, while scanning the array, store frequencies of previous prefix sums.

```python
count = {0: 1}
prefix = 0
answer = 0

for x in nums:
    prefix += x

    answer += count.get(prefix - k, 0)

    count[prefix] = count.get(prefix, 0) + 1
```

Average complexity:

$$
O(n)
$$

This technique is extremely important for subarray-sum problems, especially when negative numbers are present.

---

## 39. Pattern: Greedy Scanning

Sometimes a locally optimal decision can be proven to lead to a globally optimal result.

Examples include:

- Jump Game,
- Gas Station,
- interval scheduling,
- maximum subarray variants.

Do not use greedy merely because it "looks right".

Ask:

> Why can the discarded alternatives never produce a better solution?

A greedy solution should have a correctness argument.

---

## 40. Pattern: Dynamic Programming on Arrays

Many DP problems define a state based on an index.

Typical form:

$$
dp[i]
=
f(dp[i-1],dp[i-2],\ldots,A[i])
$$

Examples:

- House Robber,
- Maximum Subarray,
- Climbing Stairs,
- Decode Ways.

The important questions are:

1. What does \(dp[i]\) mean?
2. What previous states can produce \(dp[i]\)?
3. What is the recurrence?
4. What are the base cases?
5. Can the state be compressed?

---

## 41. Pattern: Divide and Conquer

Split:

$$
A
$$

into smaller portions.

Typical structure:

```text
          A
        /   \
       L     R
      / \   / \
     ...   ...
```

Solve each part and combine.

Examples:

- Merge Sort,
- inversion counting,
- maximum subarray,
- divide-and-conquer selection.

The classic recurrence:

$$
T(n)=2T(n/2)+O(n)
$$

gives:

$$
\boxed{T(n)=O(n\log n)}
$$

---

## 42. Pattern: Coordinate Compression

Suppose values are huge:

```text
[10^9, 500, 10^7, 500]
```

but only their relative ordering matters.

Sort unique values:

```text
[500, 10^7, 10^9]
```

Map:

```text
500   → 0
10^7  → 1
10^9  → 2
```

Now large values become compact indices.

Useful for:

- Fenwick trees,
- segment trees,
- frequency arrays,
- interval problems,
- sweep line algorithms.

---

## 43. Pattern: Sweep Line

Convert an interval problem into events.

For interval:

$$
[l,r]
$$

create:

```text
(l, +1)
(r, -1)
```

Sort events.

Then scan from left to right while maintaining the active count.

Useful for:

- maximum overlapping intervals,
- meeting rooms,
- range coverage,
- geometric problems.

---

## 44. Pattern: Matrix / 2D Array

A matrix is simply a multidimensional array.

For:

$$
A\in\mathbb{R}^{m\times n}
$$

each element is:

$$
A[i][j].
$$

Common patterns:

- row traversal,
- column traversal,
- diagonal traversal,
- spiral traversal,
- matrix rotation,
- transpose,
- flood fill,
- prefix sums,
- binary search.

---

## 45. 2D Prefix Sum

Define:

$$
P[i][j]
=
\sum_{x\le i}\sum_{y\le j}A[x][y].
$$

Then a rectangle sum can be calculated using inclusion-exclusion.

For rectangle:

$$
(r_1,c_1)\rightarrow(r_2,c_2)
$$

the sum is:

$$
P[r_2][c_2]
-P[r_1-1][c_2]
-P[r_2][c_1-1]
+P[r_1-1][c_1-1].
$$

The final addition is necessary because the top-left region was subtracted twice.

---

## 46. Common Array Tricks

### Reverse in-place

```python
l, r = 0, len(nums) - 1

while l < r:
    nums[l], nums[r] = nums[r], nums[l]
    l += 1
    r -= 1
```

Time:

$$
O(n)
$$

Space:

$$
O(1)
$$

---

### Swap Without Extra Array

Python:

```python
a, b = b, a
```

---

### Rotate Array

A rotation can be performed using reversals.

For right rotation by \(k\):

```text
reverse entire array
reverse first k
reverse remaining n-k
```

Always normalize:

```python
k %= n
```

because:

$$
k\equiv k\bmod n
$$

for rotations.

---

## 47. Avoiding Off-by-One Errors

Always explicitly define whether your interval is:

$$
[l,r]
$$

or:

$$
[l,r)
$$

For Python slicing:

```python
nums[l:r]
```

means:

$$
[l,r)
$$

because \(r\) is excluded.

A large number of binary-search and sliding-window bugs are boundary-definition bugs rather than algorithmic bugs.

---

## 48. Useful Index Identities

For an array of length \(n\):

#### Last index

$$
n-1
$$

#### Number of elements in inclusive interval

$$
[l,r]:
$$

$$
r-l+1
$$

#### Number of elements in half-open interval

$$
[l,r):
$$

$$
r-l
$$

#### Middle

$$
mid=l+\left\lfloor\frac{r-l}{2}\right\rfloor
$$

This form avoids overflow in languages where integer overflow is possible.

---

## 49. Common Complexity Traps

### Nested loops do not automatically mean \(O(n^2)\)

Consider:

```python
l = 0

for r in range(n):
    while l < r:
        l += 1
```

Although there is a `for` and a `while`, \(l\) increases at most \(n\) times.

Therefore:

$$
O(n+n)=O(n).
$$

Always count **total pointer movement**, not merely nesting depth.

---

## 50. Another Important Trap

This:

```python
for i in range(n):
    for j in range(i, n):
        ...
```

does have:

$$
n+(n-1)+(n-2)+\cdots+1
$$

iterations.

Therefore:

$$
\frac{n(n+1)}2
$$

and hence:

$$
\boxed{O(n^2)}.
$$

---

## 51. In-Place vs Auxiliary Space

If an algorithm modifies the input array:

```python
nums[i] = ...
```

that does not necessarily count as auxiliary space.

For example:

```python
reverse(nums)
```

can use:

$$
O(1)
$$

auxiliary space.

But creating:

```python
result = []
```

of size \(n\) requires:

$$
O(n)
$$

space.

Always distinguish:

- input space,
- output space,
- auxiliary space.

---

## 52. When You See These Words...

| Problem wording          | Consider                             |
| ------------------------ | ------------------------------------ |
| "sorted"                 | Binary search / two pointers         |
| "pair"                   | Hashing / two pointers               |
| "subarray"               | Prefix sum / sliding window / Kadane |
| "range sum"              | Prefix sum                           |
| "range update"           | Difference array                     |
| "next greater"           | Monotonic stack                      |
| "window maximum"         | Monotonic deque                      |
| "frequency"              | Hash map / frequency array           |
| "values from 1 to n"     | Index marking / cyclic sort          |
| "minimum possible"       | Binary search on answer              |
| "maximum possible"       | Binary search / greedy / DP          |
| "intervals"              | Sort + scan / sweep line             |
| "three values"           | Dutch National Flag                  |
| "majority"               | Boyer-Moore                          |
| "contiguous"             | Sliding window / prefix / DP         |
| "in-place"               | Two pointers / index marking         |
| "closest pair"           | Sorting + two pointers               |
| "all combinations"       | Backtracking                         |
| "overlapping ranges"     | Sweep line                           |
| "repeated range queries" | Prefix/suffix preprocessing          |

These are **hints**, not rules.

---

## 53. The Most Important Question

When solving an array problem, do not immediately ask:

> "Which LeetCode pattern is this?"

Instead ask:

#### 1. What information does the problem require?

Is it asking about:

- individual elements?
- pairs?
- subarrays?
- prefixes?
- frequencies?
- ranges?
- ordering?

#### 2. What structure does the input provide?

Is it:

- sorted?
- bounded?
- positive?
- distinct?
- duplicated?
- circular?
- partially ordered?

#### 3. What information can be maintained?

Can I maintain:

$$
sum
$$

$$
min
$$

$$
max
$$

$$
frequency
$$

$$
prefix
$$

$$
window
$$

$$
candidate
$$

$$
stack
$$

#### 4. What can be eliminated?

A good algorithm usually wins by eliminating possibilities.

Binary search eliminates half.

Two pointers eliminate regions.

Hashing eliminates repeated searches.

Prefix sums eliminate repeated summation.

Monotonic stacks eliminate dominated candidates.

Dynamic programming eliminates repeated subproblems.

---

## 54. Array Problem-Solving Checklist

Before coding:

- [ ] What exactly is the input?
- [ ] Is it sorted?
- [ ] Are values bounded?
- [ ] Are duplicates allowed?
- [ ] Can values be negative?
- [ ] Is the answer about a contiguous range?
- [ ] Do I need pairs?
- [ ] Can I preprocess?
- [ ] Can I use a hash map?
- [ ] Can I use two pointers?
- [ ] Is there a monotonic predicate?
- [ ] Can I binary-search the answer?
- [ ] Can I maintain a running state?
- [ ] Can I solve it in-place?
- [ ] What invariant does my loop maintain?
- [ ] What is the time complexity?
- [ ] What is the auxiliary-space complexity?
- [ ] What happens at \(n=0\)?
- [ ] What happens at \(n=1\)?
- [ ] What happens with duplicates?
- [ ] What happens with negative values?
- [ ] What happens at the boundaries?

---

## 55. Core Formulas

#### Array access

$$
\boxed{\operatorname{addr}(A[i])=B+iw}
$$

#### Inclusive interval size

$$
\boxed{r-l+1}
$$

#### Half-open interval size

$$
\boxed{r-l}
$$

#### Number of subarrays

$$
\boxed{\frac{n(n+1)}2}
$$

#### Number of subsets

$$
\boxed{2^n}
$$

#### Prefix sum

$$
\boxed{P[i]=\sum_{j=0}^{i}A[j]}
$$

#### Range sum

$$
\boxed{
\sum_{j=l}^{r}A[j]
=
P[r]-P[l-1]
}
$$

#### Binary-search iterations

$$
\boxed{k=\Theta(\log_2 n)}
$$

#### Arithmetic series

$$
\boxed{
1+2+\cdots+n=\frac{n(n+1)}2
}
$$

#### Geometric series

$$
\boxed{
1+r+r^2+\cdots+r^k
=
\frac{r^{k+1}-1}{r-1}
}
$$

---

## 56. Final Mental Model

Think of an array at four different levels.

### Level 1 — Mathematical

$$
A:\{0,\ldots,n-1\}\rightarrow S
$$

It is a finite sequence/function.

### Level 2 — Memory

$$
\operatorname{address}(A[i])=B+iw
$$

It is contiguous memory plus address arithmetic.

### Level 3 — Algorithmic

Exploit properties such as:

$$
\text{ordering}
$$

$$
\text{contiguity}
$$

$$
\text{monotonicity}
$$

$$
\text{frequency}
$$

$$
\text{prefix structure}
$$

$$
\text{locality}
$$

### Level 4 — Problem Solving

Transform the problem:

```text
Raw Array
    ↓
Identify structure
    ↓
Choose representation
    ↓
Maintain an invariant/state
    ↓
Eliminate unnecessary work
    ↓
Prove correctness
    ↓
Analyze complexity
```

The goal is not to memorize that:

> "This is a two-pointer problem."

The goal is to understand **why** two pointers are valid.

Likewise, do not memorize:

> "Prefix sum = O(1)."

Understand that preprocessing changes:

$$
\text{repeated computation}
$$

into:

$$
\text{one-time computation}+\text{constant-time queries}.
$$

That way, when you encounter a problem you have never seen before, you can derive the technique instead of trying to recognize a memorized solution.

```

```
