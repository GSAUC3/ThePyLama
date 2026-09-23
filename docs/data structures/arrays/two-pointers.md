
# 15. Pattern: Two Pointers

Use two indices:

```python
l = 0
r = len(nums) - 1
```

and move them according to some property.

Common form:

```python
while l < r:
    ...
```

Two pointers are especially useful when:

* the array is sorted,
* the problem involves pairs,
* the answer depends on both ends,
* a pointer movement eliminates possibilities.

---

# 16. Two Sum on a Sorted Array

Suppose:

```text
[1,2,4,6,8,9]
```

and target:

$$
10
$$

Start:

```text
l →              ← r
```

If:

$$
A[l]+A[r] > target
$$

decrease \(r\).

If:

$$
A[l]+A[r] < target
$$

increase \(l\).

Why is this valid?

Because the array is sorted.

If:

$$
A[l]+A[r]>T
$$

then for the current \(r\):

$$
A[l+1]+A[r]\ge A[l]+A[r]>T
$$

so \(r\) cannot pair with any index to the right of \(l\).

This is the kind of reasoning you should look for:

> **Can a pointer movement eliminate an entire set of candidates?**

---
