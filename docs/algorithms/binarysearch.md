## Classic Binary Search Algorithm

Binary search only works on `sorted` Arrays:

$A_L, A_{L+1}, \dots, A_R$

```python
def classic_B_search(nums: list[int], x: int)-> int:
    """
    NOTE
    - This is CLOSED search interval [l,r]
    - This approach does NOT guarantee the first occurrence of x.
    It returns whichever occurrence it happens to encounter first.
    """
    # search space is [L,R] inclusive
    # these are the first and last possible positions/indices where
    # x could be found 
    l = 0 
    r = len(nums)-1 # so search space = [0,n-1]

    # x, if it exists, is in [l, r]
    
    while (l<=r): # since it is closed interval, 
        # l==r represents one valid candidate.
        # loop must stops at l>r
        
        mid = l + (r-l)//2 # this approach is better than (r+l)//2 
        # because of integer overflow in other languages

        # print(f"l({l})  <= mid({mid}) <= r({r})" )

        if  nums[mid]==x:
            return mid
        elif x<nums[mid]: 
            #  nums[l] <= x < nums[mid] <= nums[r]
            r = mid-1  
        else:
            #  nums[l] <= nums[mid] < x <= nums[r]
            l = mid+1

    # print(f"After while loop\nl({l})  <= mid({mid}) <= r({r})" )
    return -1 # if not found
```
EXAMPLE

```
nums  = [-14, -5, 0, 1, 2, 4, 4, 4, 4, 4, 7, 9, 10, 15]
indices 0   1   2  3  4  5  6  7  8  9 10  11  12  13
target = 40
```
classic_B_search(nums, target) 
`# Answer:  6`



Absolutely. Forget the interval notation for a moment.

Take:

```text
a = [1, 2, 4, 4, 4, 7, 9]
     0  1  2  3  4  5  6
```

and let:

```text
target = 4
```

# Lower bound

**Lower bound = first position where the value is `>= 4`.**

Look from left to right:

```text
1   2   4   4   4   7   9
        ↑
      first >= 4
```

So:

```text
lower_bound(4) = 2
```

# Upper bound

**Upper bound = first position where the value is `> 4`.**

Look from left to right:

```text
1   2   4   4   4   7   9
                    ↑
                  first > 4
```

So:

```text
upper_bound(4) = 5
```

That's the main idea.

---

### Now where does `[l, r)` come in?

It simply means:

> **Look between `l` and `r`, including `l` but NOT including `r`.**

For example:

```text
[l, r) = [2, 5)
```

means:

```text
indices:  2   3   4
values:   4   4   4
```

Index `5` is **not included**.

And importantly, **both lower bound and upper bound can use this same `[l,r)` style**.

```text
lower bound → first >= 4 → index 2

upper bound → first >  4 → index 5
```


**`[l,r)` is just one way of representing the search range. Lower vs upper bound is determined by what you're looking for (`>=` vs `>`).**




Direct ComparisonThe key difference is how they handle the exact target value.

|Feature     |Lower Bound| Upper Bound|
|:------:|:----:|:-----:|
|Condition  |Greater than or equal to (>= target)|   Strictly greater than (> target)|
|If target exists|Points to the first instance of the target|Points to the element after the last instance|
|If target is missing|Points to the next larger element|Points to the next larger element|





---

# 21. Pattern: Binary Search

Binary search requires some form of monotonicity.

Classic sorted array:

$$
A_0\le A_1\le\cdots\le A_{n-1}
$$

Define:

$$
P(i)=[A[i]\ge x]
$$

Then:

```text
false false false false true true true
                       ↑
                  first true
```

Binary search finds the boundary.

Each iteration halves the search space:

$$
n\rightarrow\frac n2
\rightarrow\frac n4
\rightarrow\cdots
$$

After \(k\) iterations:

$$
\frac{n}{2^k}\le1
$$

so:

$$
2^k\ge n
$$

and therefore:

$$
\boxed{k\ge\log_2n}
$$

Hence:

$$
\boxed{O(\log n)}
$$

---

# 22. Binary Search on the Answer

Binary search does not require the array itself to be sorted.

Instead, search a numerical answer \(x\).

Suppose we have a predicate:

$$
P(x)
$$

with structure:

```text
false false false false true true true
                       ↑
                     answer
```

If \(P(x)\) is monotonic, binary search can find the boundary.

This pattern appears in:

* Koko Eating Bananas,
* Capacity to Ship Packages,
* minimum feasible speed,
* minimum capacity,
* maximum achievable value.

The important question is:

> **Can I define a yes/no feasibility function that is monotonic?**

---

# 23. Lower Bound

The lower bound is the first position satisfying:

$$
A[i]\ge x
$$

For a sorted array:

```text
A = [1,2,4,4,4,7,9]
             ↑
```

for \(x=4\):

$$
lower\_bound(4)=2
$$

Conceptually:

```text
false false true true true true
             ↑
        first true
```

---

# 24. Upper Bound

The upper bound is the first position satisfying:

$$
A[i]>x
$$

For:

```text
[1,2,4,4,4,7,9]
```

and \(x=4\):

$$
upper\_bound(4)=5
$$

Conceptually:

```text
false false false false false true
                              ↑
                         first > x
```

In Python:

```python
from bisect import bisect_left, bisect_right

bisect_left(nums, x)   # lower bound
bisect_right(nums, x)  # upper bound
```
