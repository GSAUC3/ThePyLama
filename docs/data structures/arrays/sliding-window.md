These 


# 17. Pattern: Sliding Window

A sliding window maintains an interval:

$$
[l,r]
$$

```text
       l           r
       ↓           ↓
A = [ x ][ x ][ x ][ x ][ x ][ x ]
       └───────────┘
          window
```

Typical structure:

```python
l = 0

for r in range(n):

    # add nums[r]

    while condition_is_invalid:
        # remove nums[l]
        l += 1

    # process window
```

If both \(l\) and \(r\) move only forward:

$$
l\le n
$$

and

$$
r\le n.
$$

Therefore total pointer movement is at most:

$$
2n
$$

giving:

$$
\boxed{O(n)}
$$

---

# 18. Fixed-Size Sliding Window

If the window has fixed size \(k\):

$$
A[i-k+1:i+1]
$$

Maintain its sum:

```python
window_sum = sum(nums[:k])

for r in range(k, n):
    window_sum += nums[r]
    window_sum -= nums[r-k]
```

Each step performs constant work.

Therefore:

$$
O(n)
$$

instead of:

$$
O(nk).
$$

---

# 19. Variable-Size Sliding Window

Typical problem:

> Find the longest/shortest subarray satisfying some condition.

Structure:

```python
l = 0

for r in range(n):

    add(nums[r])

    while invalid():
        remove(nums[l])
        l += 1

    update_answer()
```

The crucial requirement is that the validity condition should allow the left pointer to move monotonically.

---

# 20. Sliding Window Warning

Do **not** automatically use sliding window just because the problem says "subarray".

Sliding window works when the condition has the right monotonic behavior.

For example, with positive numbers:

$$
sum([l,r])
$$

increases when \(r\) increases and decreases when \(l\) increases.

This property often makes sliding window possible.

With arbitrary negative numbers, that monotonicity can disappear.
