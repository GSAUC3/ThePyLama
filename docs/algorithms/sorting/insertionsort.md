# Insertion Sort

**Insertion Sort** builds a sorted portion of an array one element at a time by inserting each new element into its correct position.

Think of arranging playing cards in your hand: you pick up a card and insert it into the correct position among the cards you have already sorted.

## 1. Mathematical Idea

At iteration \(i\), assume the subarray

$$
A[0 \ldots i-1]
$$

is already sorted.

Take the element \(A[i]\), called the **key**, and insert it into its correct position within the sorted prefix.

After each iteration, the sorted prefix grows by one element.

## 2. Visualization

genui{"learning_viz":{"type_id":"INSERTION_SORT","initial_values":{"value1":7,"value2":3,"value3":8,"value4":2,"value5":6,"value6":4,"value7":5}}}

## 3. Python Implementation

```python
def insertion_sort(arr):
    n = len(arr)

    for i in range(1, n):
        key = arr[i]
        j = i - 1

        # Shift larger elements to the right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1

        # Insert key into its correct position
        arr[j + 1] = key

    return arr


arr = [7, 3, 8, 2, 6, 4, 5]
print(insertion_sort(arr))
```

Output:

```text
[2, 3, 4, 5, 6, 7, 8]
```

---

## 4. Time Complexity

Let \(n\) be the number of elements.

### Best case: Already sorted

Each element requires only one comparison.

$$
T(n)=\Theta(n)
$$

### Worst case: Reverse sorted

Each new element must move across the entire sorted prefix.

The total number of shifts is:

$$
1+2+3+\cdots +(n-1)
$$

Using the arithmetic series formula:

$$
\frac{n(n-1)}{2}
$$

Therefore:

$$
\boxed{T(n)=\Theta(n^2)}
$$

### Complexity Summary

| Property          | Complexity |
| ----------------- | ---------- |
| Best-case time    | \(O(n)\)   |
| Average-case time | \(O(n^2)\) |
| Worst-case time   | \(O(n^2)\) |
| Auxiliary space   | \(O(1)\)   |
| Stable            | Yes        |
| In-place          | Yes        |

---

## 5. Key Invariant

**At the beginning of iteration \(i\), the prefix \(A[0 \ldots i-1]\) is sorted.**

After inserting \(A[i]\) into its correct position, the prefix \(A[0 \ldots i]\) is sorted.

This invariant proves the correctness of Insertion Sort.

### When is it useful?

* Small arrays.
* Nearly sorted arrays.
* As a component of hybrid sorting algorithms.

**Key takeaway:** Insertion Sort maintains a sorted prefix and inserts each new element into its correct position.
