# Quick Sort

**Quick Sort** is a divide-and-conquer sorting algorithm that works by partitioning an array around a pivot.

Unlike Merge Sort, it partitions the array first and then recursively sorts the two resulting portions.

## 1. Mathematical Idea

Given an array \(A\):

1. Choose a pivot \(p\).
2. Rearrange elements so that:

   * Elements on the left are \(\leq p\).
   * Elements on the right are \(\geq p\).
3. Recursively sort both partitions.

After partitioning, the pivot is in its final sorted position.

### Example

Array:

$$
[7, 2, 1, 6, 8, 5, 3, 4]
$$

Choose pivot \(4\).

After partitioning:

$$
[2,1,3,\boxed{4},8,5,7,6]
$$

Now recursively sort the left and right partitions.

Final result:

$$
[1,2,3,4,5,6,7,8]
$$

---

## 2. Python Implementation (Lomuto Partition)

```python
def quick_sort(arr, low, high):
    if low < high:
        p = partition(arr, low, high)

        quick_sort(arr, low, p - 1)
        quick_sort(arr, p + 1, high)


def partition(arr, low, high):
    pivot = arr[high]
    i = low

    for j in range(low, high):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1

    arr[i], arr[high] = arr[high], arr[i]

    return i


arr = [7, 2, 1, 6, 8, 5, 3, 4]

quick_sort(arr, 0, len(arr) - 1)

print(arr)
```

Output:

```text
[1, 2, 3, 4, 5, 6, 7, 8]
```

---

## 3. Time Complexity

Let \(n\) be the number of elements.

### Best case

The pivot divides the array into two approximately equal halves.

$$
T(n)=2T(n/2)+O(n)
$$

Therefore:

$$
\boxed{T(n)=O(n\log n)}
$$

### Worst case

The pivot repeatedly produces one empty partition and one partition of size \(n-1\).

$$
T(n)=T(n-1)+O(n)
$$

Therefore:

$$
\boxed{T(n)=O(n^2)}
$$

### Complexity Summary

| Case                     | Time           |
| ------------------------ | -------------- |
| Best                     | \(O(n\log n)\) |
| Average                  | \(O(n\log n)\) |
| Worst                    | \(O(n^2)\)     |
| Auxiliary space, average | \(O(\log n)\)  |
| Auxiliary space, worst   | \(O(n)\)       |

The space complexity comes from the recursive call stack. The partitioning itself is in-place.

---

## 4. Quick Sort vs. Merge Sort

| Property        | Quick Sort            | Merge Sort               |
| --------------- | --------------------- | ------------------------ |
| Average time    | \(O(n\log n)\)        | \(O(n\log n)\)           |
| Worst-case time | \(O(n^2)\)            | \(O(n\log n)\)           |
| Auxiliary space | \(O(\log n)\) average | \(O(n)\) for arrays      |
| Stable          | No, typically         | Yes, with stable merging |
| In-place        | Typically yes         | Standard version: no     |

**Key takeaway:** Quick Sort partitions around a pivot, while Merge Sort divides the array into halves and merges the sorted halves.
