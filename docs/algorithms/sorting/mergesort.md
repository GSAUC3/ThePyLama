# Merge Sort — Mathematical Explanation

**Merge Sort is a divide-and-conquer sorting algorithm.** It divides an array into smaller subarrays, sorts them recursively, and merges the sorted subarrays to produce the final sorted array.

It achieves **\(O(n\log n)\) time complexity**, making it significantly more efficient than Bubble Sort for large arrays.

---

## 1. Core Idea: Divide and Conquer

Merge Sort follows three steps:

1. **Divide:** Split the array into two halves.
2. **Conquer:** Recursively sort each half.
3. **Merge:** Combine the two sorted halves into one sorted array.

Consider:

$$
A=[8,3,5,4,7,6,1,2]
$$

The array is repeatedly divided until each subarray contains a single element.

A single-element array is already sorted.

Then, the sorted subarrays are merged:

```text
[8, 3, 5, 4, 7, 6, 1, 2]

Divide:

[8, 3, 5, 4]       [7, 6, 1, 2]

[8, 3] [5, 4]      [7, 6] [1, 2]

[8] [3] [5] [4]    [7] [6] [1] [2]

Merge:

[3, 8] [4, 5]      [6, 7] [1, 2]

[3, 4, 5, 8]       [1, 2, 6, 7]

[1, 2, 3, 4, 5, 6, 7, 8]
```

---

## 2. Python Implementation

```python
def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2

    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return merge(left, right)


def merge(left, right):
    result = []
    i = j = 0

    # Compare elements from both sorted halves
    while i < len(left) and j < len(right):

        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    # Append remaining elements
    result.extend(left[i:])
    result.extend(right[j:])

    return result


arr = [8, 3, 5, 4, 7, 6, 1, 2]
print(merge_sort(arr))
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8]
```

### Important detail

The `merge()` function assumes that both input arrays are already sorted.

It compares their first remaining elements and repeatedly takes the smaller one.

Each element is added to the result exactly once.

---

## 3. Mathematical Analysis of Time Complexity

Let \(T(n)\) represent the time required to sort an array of size \(n\).

### Step 1: Divide

The array is divided into two halves:

$$
\frac{n}{2},\frac{n}{2}
$$

Therefore, the recursive work is:

$$
2T\left(\frac{n}{2}\right)
$$

### Step 2: Merge

Merging two sorted arrays of combined size \(n\) requires at most \(n-1\) comparisons and \(O(n)\) total work.

Thus:

$$
T(n)=2T\left(\frac{n}{2}\right)+O(n)
$$

### Step 3: Solve the recurrence

At each level, the total merging work is proportional to \(n\).

The number of levels is:

$$
\log_2 n
$$

Therefore:

$$
T(n)=O(n)\times O(\log n)
$$

$$
\boxed{T(n)=O(n\log n)}
$$

This holds for the best, average, and worst cases of standard Merge Sort.

---

## 4. Space Complexity

The implementation creates temporary arrays during merging.

The total auxiliary space required is:

$$
\boxed{O(n)}
$$

The recursive call stack requires:

$$
O(\log n)
$$

for a balanced recursion tree.

However, the temporary arrays dominate the space usage.

---

## 5. Merge Sort vs. Bubble Sort

| Property          | Merge Sort         | Bubble Sort          |
| ----------------- | ------------------ | -------------------- |
| Best-case time    | \(O(n\log n)\)     | \(O(n)\) optimized   |
| Average-case time | \(O(n\log n)\)     | \(O(n^2)\)           |
| Worst-case time   | \(O(n\log n)\)     | \(O(n^2)\)           |
| Auxiliary space   | \(O(n)\)           | \(O(1)\)             |
| Stable            | Yes                | Yes                  |
| Approach          | Divide and conquer | Adjacent comparisons |

---

## 6. Key Takeaways

1. Merge Sort uses **divide and conquer**.

2. It recursively divides the array until each subarray has one element.

3. The merge operation combines sorted subarrays in linear time.

4. Its recurrence is:

   $$
   T(n)=2T(n/2)+O(n)
   $$

5. Its time complexity is \(O(n\log n)\), and its auxiliary space complexity is \(O(n)\).

**The most important concept to understand is that each level of the recursion tree performs \(O(n)\) total merging work, and there are \(O(\log n)\) levels.**


## In-Place Merge Sort

Traditional Merge Sort requires **\(O(n)\) auxiliary space** for merging.

An in-place version aims to sort the array without allocating a separate array of size \(n\).

However, **achieving efficient in-place merging is more complicated** than standard Merge Sort. A simple approach is to use insertion-like shifting during merging, but this can increase the time complexity to \(O(n^2)\).

### 1. In-Place Merge Sort Using Shifting

This implementation sorts the original array without creating separate left and right arrays.

```python
def merge_sort(arr, left, right):
    if left >= right:
        return

    mid = (left + right) // 2

    merge_sort(arr, left, mid)
    merge_sort(arr, mid + 1, right)

    merge(arr, left, mid, right)


def merge(arr, left, mid, right):
    i = left
    j = mid + 1

    while i <= mid and j <= right:

        if arr[i] <= arr[j]:
            i += 1

        else:
            value = arr[j]

            # Shift elements to the right
            k = j

            while k > i:
                arr[k] = arr[k - 1]
                k -= 1

            arr[i] = value

            i += 1
            mid += 1
            j += 1


arr = [8, 3, 5, 4, 7, 6, 1, 2]

merge_sort(arr, 0, len(arr) - 1)

print(arr)
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8]
```

### 2. Complexity

| Property          | Complexity                  |
| ----------------- | --------------------------- |
| Best-case time    | \(O(n\log n)\)              |
| Average-case time | \(O(n^2)\)                  |
| Worst-case time   | \(O(n^2)\)                  |
| Auxiliary space   | \(O(\log n)\) for recursion |

The shifting operation can take \(O(n)\) for a merge, so the overall worst-case time can become quadratic.

### 3. Important distinction

There are two different ideas:

* **In-place sorting:** Modifies the original array without creating a separate full-sized array.
* **In-place merging:** Merges two sorted portions of an array using very little additional memory.

Efficient in-place Merge Sort algorithms exist, but they are considerably more complex than the standard version.

