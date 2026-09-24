# Bubble Sort: Complete Explanation with Python Code

**Bubble Sort** is a simple sorting algorithm that repeatedly compares adjacent elements and swaps them if they are in the wrong order.

It is called *Bubble Sort* because larger elements gradually move toward the end of the array, just as bubbles rise to the surface.

Let's understand it from the ground up: the intuition, mathematical foundation, algorithm, Python implementation, dry run, correctness, and time complexity.

---

## 1. What Is Bubble Sort?

Suppose we have an unsorted array:

```python
arr = [5, 3, 8, 4, 2]
```

Our goal is to sort it in ascending order:

```text
[2, 3, 4, 5, 8]
```

Bubble Sort works by comparing **adjacent elements**.

For every pair of adjacent elements:

* If the left element is smaller than or equal to the right element, do nothing.
* If the left element is greater than the right element, swap them.

The comparison is:

$$
\text{if } arr[i] > arr[i+1]
$$

Then swap:

$$
arr[i] \leftrightarrow arr[i+1]
$$

After one complete pass through the array, the largest element reaches the last position.

---

## 2. Understanding Bubble Sort Through an Example

Consider:

```python
arr = [5, 3, 8, 4, 2]
```

We will sort this array in ascending order.

### Pass 1

We compare adjacent elements from left to right.

#### Comparison 1: 5 and 3

Since:

$$
5 > 3
$$

Swap them.

```text
[3, 5, 8, 4, 2]
```

#### Comparison 2: 5 and 8

Since:

$$
5 < 8
$$

No swap is required.

```text
[3, 5, 8, 4, 2]
```

#### Comparison 3: 8 and 4

Since:

$$
8 > 4
$$

Swap them.

```text
[3, 5, 4, 8, 2]
```

#### Comparison 4: 8 and 2

Since:

$$
8 > 2
$$

Swap them.

```text
[3, 5, 4, 2, 8]
```

**After Pass 1:**

```text
[3, 5, 4, 2, 8]
                  ↑
          Largest element is fixed
```

The largest element, `8`, is now in its correct position.

---

### Pass 2

We do not need to compare the last element again because `8` is already in its final position.

Start with:

```text
[3, 5, 4, 2, 8]
```

#### Comparison 1: 3 and 5

No swap.

```text
[3, 5, 4, 2, 8]
```

#### Comparison 2: 5 and 4

Swap.

```text
[3, 4, 5, 2, 8]
```

#### Comparison 3: 5 and 2

Swap.

```text
[3, 4, 2, 5, 8]
```

**After Pass 2:**

```text
[3, 4, 2, 5, 8]
               ↑
        5 and 8 are fixed
```

---

### Pass 3

Start with:

```text
[3, 4, 2, 5, 8]
```

#### Comparison 1: 3 and 4

No swap.

#### Comparison 2: 4 and 2

Swap.

```text
[3, 2, 4, 5, 8]
```

**After Pass 3:**

```text
[3, 2, 4, 5, 8]
            ↑
     Sorted suffix: [4, 5, 8]
```

---

### Pass 4

Start with:

```text
[3, 2, 4, 5, 8]
```

Compare `3` and `2`.

Swap:

```text
[2, 3, 4, 5, 8]
```

The array is now sorted.

---

## 3. Python Implementation

Let's implement the standard Bubble Sort algorithm.

### 3.1 Basic Implementation

```python
def bubble_sort(arr):
    n = len(arr)

    for i in range(n - 1):

        for j in range(n - 1 - i):

            if arr[j] > arr[j + 1]:

                arr[j], arr[j + 1] = arr[j + 1], arr[j]

    return arr
```

#### Example

```python
arr = [5, 3, 8, 4, 2]

print(bubble_sort(arr))
```

Output:

```text
[2, 3, 4, 5, 8]
```

This implementation sorts the array **in place**, meaning it modifies the original list instead of creating a separate sorted list.

---

## 4. Understanding the Code Line by Line

Let's examine the implementation carefully.

```python
def bubble_sort(arr):
```

Defines a function that accepts an array.

```python
n = len(arr)
```

Stores the number of elements in the array.

For example:

```python
arr = [5, 3, 8, 4, 2]
n = 5
```

---

### Outer Loop

```python
for i in range(n - 1):
```

The outer loop controls the number of passes.

For an array of length \(n\), at most \(n-1\) passes are needed.

Why?

After every pass, the largest remaining unsorted element reaches its correct position.

After \(n-1\) passes, all elements must be sorted.

---

### Inner Loop

```python
for j in range(n - 1 - i):
```

The inner loop performs adjacent comparisons.

The expression:

$$
n-1-i
$$

determines how far the current pass needs to go.

Why subtract \(i\)?

Because after each pass, one additional element is fixed at the end.

For example, if:

$$
n=5
$$

Then:

| Pass | `i` | Inner-loop comparisons |
| ---- | --: | ---------------------: |
| 1    |   0 |                      4 |
| 2    |   1 |                      3 |
| 3    |   2 |                      2 |
| 4    |   3 |                      1 |

The number of comparisons decreases after every pass.

---

### Comparison

```python
if arr[j] > arr[j + 1]:
```

This checks whether two adjacent elements are in the wrong order.

For ascending order:

$$
arr[j] \leq arr[j+1]
$$

is the desired relationship.

If the relationship is violated, we swap the elements.

---

### Swap

```python
arr[j], arr[j + 1] = arr[j + 1], arr[j]
```

Python allows simultaneous assignment.

This swaps the two elements without requiring a temporary variable.

For example:

```python
arr = [5, 3]
```

After the swap:

```python
arr = [3, 5]
```

---

## 5. Mathematical Foundation of Bubble Sort

Now let's understand why the algorithm works.

### 5.1 Key Property

**After the \(i\)-th complete pass, the last \(i\) elements are in their final sorted positions.**

For example:

```text
Initial:
[5, 3, 8, 4, 2]

After Pass 1:
[3, 5, 4, 2, 8]

After Pass 2:
[3, 4, 2, 5, 8]

After Pass 3:
[3, 2, 4, 5, 8]
```

After three passes, the last three elements are sorted:

```text
[3, 2 | 4, 5, 8]
```

The remaining unsorted portion is:

```text
[3, 2]
```

Only one more pass is required.

---

### 5.2 Loop Invariant

A loop invariant is a property that remains true at a particular point in an algorithm.

For Bubble Sort, we can state:

> At the beginning of pass \(i\), the last \(i\) elements contain the \(i\) largest elements in sorted order.

#### Initialization

Before the first pass:

$$
i=0
$$

There are no elements in the sorted suffix.

The invariant holds trivially.

#### Maintenance

During each pass, the largest element in the unsorted prefix moves toward the right.

After the pass, that element occupies its correct final position.

Therefore, the sorted suffix grows by one element.

#### Termination

After \(n-1\) passes, the sorted suffix contains \(n-1\) elements.

The remaining element must also be in its correct position.

Hence, the array is sorted.

---

## 6. Time Complexity: Detailed Mathematical Analysis

This is one of the most important parts of understanding Bubble Sort.

The standard implementation contains two nested loops.

Let's derive its complexity mathematically.

### 6.1 Number of Comparisons

For an array of length \(n\):

* First pass: \(n-1\) comparisons.
* Second pass: \(n-2\) comparisons.
* Third pass: \(n-3\) comparisons.
* Final pass: \(1\) comparison.

Therefore, the total number of comparisons is:

$$
C(n)=(n-1)+(n-2)+\cdots+1
$$

Using the arithmetic series formula:

$$
1+2+\cdots+k=\frac{k(k+1)}{2}
$$

we get:

$$
C(n)=\frac{n(n-1)}{2}
$$

Expanding:

$$
C(n)=\frac{n^2-n}{2}
$$

The dominant term is:

$$
\frac{n^2}{2}
$$

Therefore:

$$
\boxed{T(n)=O(n^2)}
$$

The standard implementation has:

* Best-case time: \(O(n^2)\)
* Average-case time: \(O(n^2)\)
* Worst-case time: \(O(n^2)\)

Even if the array is already sorted, the standard implementation still performs all the comparisons.

---

## 7. Optimized Bubble Sort

We can improve the best-case performance by detecting whether any swaps occurred during a pass.

If no swaps occur, the array is already sorted.

There is no need to continue.

### Python Code

```python
def bubble_sort(arr):
    n = len(arr)

    for i in range(n - 1):

        swapped = False

        for j in range(n - 1 - i):

            if arr[j] > arr[j + 1]:

                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True

        if not swapped:
            break

    return arr
```

#### What changed?

We introduced:

```python
swapped = False
```

At the beginning of each pass.

Whenever a swap occurs:

```python
swapped = True
```

At the end of the pass:

```python
if not swapped:
    break
```

If no swaps occurred, the array is sorted.

---

## 8. Complexity of Optimized Bubble Sort

The optimized version has different best-case and worst-case complexities.

| Case            | Time complexity | Explanation                |
| --------------- | --------------- | -------------------------- |
| Best case       | \(O(n)\)        | Already sorted; one pass   |
| Average case    | \(O(n^2)\)      | Many comparisons and swaps |
| Worst case      | \(O(n^2)\)      | Reverse-sorted array       |
| Auxiliary space | \(O(1)\)        | In-place sorting           |

#### Best-case derivation

For an already sorted array:

```python
arr = [1, 2, 3, 4, 5]
```

The algorithm performs:

$$
n-1
$$

comparisons in the first pass.

No swaps occur.

The algorithm stops.

Therefore:

$$
T(n)=n-1
$$

Hence:

$$
\boxed{T(n)=O(n)}
$$

#### Worst-case derivation

For a reverse-sorted array:

```python
arr = [5, 4, 3, 2, 1]
```

The algorithm performs:

$$
\frac{n(n-1)}{2}
$$

comparisons.

Therefore:

$$
\boxed{T(n)=O(n^2)}
$$

---

## 9. Stability and In-Place Sorting

Bubble Sort has two important properties.

### Stability

A sorting algorithm is stable if equal elements retain their original relative order.

Bubble Sort is stable when it swaps elements only when:

```python
arr[j] > arr[j + 1]
```

It does not swap equal elements.

For example, suppose we have:

```text
[(5, A), (3, B), (5, C)]
```

After sorting by the first value:

```text
[(3, B), (5, A), (5, C)]
```

The two elements with value `5` retain their original relative order.

### In-Place Sorting

Bubble Sort modifies the original array.

It uses only a constant number of additional variables.

Therefore:

$$
\boxed{S(n)=O(1)}
$$

This is its auxiliary space complexity.

---

## 10. Bubble Sort vs. Other Sorting Algorithms

| Algorithm               | Best case      | Average case   | Worst case     |
| ----------------------- | -------------- | -------------- | -------------- |
| Bubble Sort (optimized) | \(O(n)\)       | \(O(n^2)\)     | \(O(n^2)\)     |
| Selection Sort          | \(O(n^2)\)     | \(O(n^2)\)     | \(O(n^2)\)     |
| Insertion Sort          | \(O(n)\)       | \(O(n^2)\)     | \(O(n^2)\)     |
| Merge Sort              | \(O(n\log n)\) | \(O(n\log n)\) | \(O(n\log n)\) |
| Heap Sort               | \(O(n\log n)\) | \(O(n\log n)\) | \(O(n\log n)\) |
| Quick Sort              | \(O(n\log n)\) | \(O(n\log n)\) | \(O(n^2)\)     |

Bubble Sort is primarily useful for learning sorting fundamentals.

For large arrays, algorithms such as Merge Sort, Heap Sort, and Quick Sort generally offer better asymptotic performance.

---


It is generally not suitable for large datasets because of its quadratic time complexity.

For practical Python sorting, use:

```python
arr.sort()
```

or:

```python
sorted_arr = sorted(arr)
```

Python's built-in sorting uses **Timsort**, which is designed to perform efficiently on real-world data.

---