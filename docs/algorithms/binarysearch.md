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