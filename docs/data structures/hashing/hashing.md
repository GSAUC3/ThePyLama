# Hashing: The 7 Core Patterns in DSA

Hashing is a technique that allows us to **store information in a way that makes searching, counting, and retrieving data efficient**.

In Python, the two primary data structures used for hashing are:

* **`set`**: Stores unique elements and supports fast membership testing.
* **`dict`**: Stores key-value pairs and supports fast lookup by key.

Both typically provide **\(O(1)\) average-case lookup, insertion, and deletion**, although worst-case performance can be \(O(n)\).

Let's understand the seven patterns one by one, starting with the fundamentals and progressing toward advanced applications.

---

## 1. Basic Hashing

#### Sets, maps, membership, and frequency counting

Basic hashing is the foundation of almost every other hashing pattern.

The central idea is:

> Instead of repeatedly searching through an entire collection, store information in a hash-based data structure so that you can retrieve it efficiently.

### 1.1 Membership Testing

**Problem:** Determine whether an element exists in a collection.

Suppose we have:

```python
nums = [4, 7, 2, 9, 5]
target = 9
```

#### Approach 1: Linear Search

```python
found = False

for x in nums:
    if x == target:
        found = True
        break
```

In the worst case, we inspect every element.

Time complexity:

$$
O(n)
$$

#### Approach 2: Hash Set

```python
seen = set(nums)

found = target in seen
```

Building the set takes \(O(n)\) expected time, and the membership check takes \(O(1)\) average time.

If the set already exists, the lookup itself is expected \(O(1)\).

#### When to use it

Use a hash set when you need to answer questions like:

* Does this value exist?
* Have I seen this element before?
* Is this element a duplicate?
* Is a particular state already visited?

---

### 1.2 Duplicate Detection

**Problem:** Determine whether an array contains duplicate elements.

Example:

```python
nums = [1, 2, 3, 4, 2]
```

#### Hashing solution

```python
def contains_duplicate(nums):
    seen = set()

    for x in nums:
        if x in seen:
            return True

        seen.add(x)

    return False
```

#### How it works

| Element | Set before processing | Result          |
| ------- | --------------------- | --------------- |
| 1       | `{}`                  | Insert 1        |
| 2       | `{1}`                 | Insert 2        |
| 3       | `{1, 2}`              | Insert 3        |
| 4       | `{1, 2, 3}`           | Insert 4        |
| 2       | `{1, 2, 3, 4}`        | Duplicate found |

Expected time complexity:

$$
O(n)
$$

Auxiliary space complexity:

$$
O(n)
$$

**Key insight:** A set remembers which elements have already appeared.

---

### 1.3 Frequency Counting

**Problem:** Count how many times each element occurs.

Example:

```python
nums = [1, 2, 2, 3, 3, 3]
```

Expected output:

```python
{
    1: 1,
    2: 2,
    3: 3
}
```

#### Solution

```python
def frequency_count(nums):
    freq = {}

    for x in nums:
        freq[x] = freq.get(x, 0) + 1

    return freq
```

The expression:

```python
freq.get(x, 0)
```

returns the current count of `x`, or `0` if the key does not exist.

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(k)\), where \(k\) is the number of distinct elements.

#### When to use it

Frequency counting is useful for:

* Finding the most frequent element.
* Checking whether two strings are anagrams.
* Counting pairs with certain properties.
* Identifying elements that occur exactly once.

---

### 1.4 Frequency Map Equality

Suppose we want to determine whether two strings are anagrams.

```python
s = "listen"
t = "silent"
```

Two strings are anagrams if they contain exactly the same characters with the same frequencies.

```python
from collections import Counter

def is_anagram(s, t):
    return Counter(s) == Counter(t)
```

This is a direct application of frequency counting.

#### Summary of Basic Hashing

| Pattern              | Data structure | Main purpose           |
| -------------------- | -------------- | ---------------------- |
| Membership testing   | Set            | Check existence        |
| Duplicate detection  | Set            | Detect repeated values |
| Frequency counting   | Dictionary     | Count occurrences      |
| Frequency comparison | Dictionary     | Compare distributions  |

---

## 2. Array Hashing

#### Complement lookup, index mapping, and pair counting

Array hashing uses a hash map or set to solve problems involving relationships between array elements.

The most important idea is:

**Instead of searching the array repeatedly, store information about previously processed elements.**

---

### 2.1 Complement Lookup

This pattern is best illustrated by the classic Two Sum problem.

#### Problem

Given an array and a target, find two elements whose sum equals the target.

```python
nums = [2, 7, 11, 15]
target = 9
```

We need:

$$
a+b=target
$$

Rearranging:

$$
b=target-a
$$

This means that for every element \(a\), we can calculate the exact value of its required complement.

#### Brute-force approach

```python
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] + nums[j] == target:
            return [i, j]
```

Time complexity:

$$
O(n^2)
$$

#### Hashing approach

```python
def two_sum(nums, target):
    seen = {}

    for i, x in enumerate(nums):
        complement = target - x

        if complement in seen:
            return [seen[complement], i]

        seen[x] = i

    return []
```

#### Dry run

| Current element | Complement | Map before lookup | Result  |
| --------------- | ---------- | ----------------- | ------- |
| 2               | 7          | `{}`              | Store 2 |
| 7               | 2          | `{2: 0}`          | Found 2 |

The answer is:

```python
[0, 1]
```

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(n)\).

#### When to use it

Look for equations that can be rearranged into:

$$
\text{Required value} = \text{Target} - \text{Current value}
$$

This pattern also applies to difference-based and product-based pair problems, although the exact lookup strategy may differ.

---

### 2.2 Index Mapping

Sometimes we need to know not only whether an element exists, but also where it occurs.

For example:

```python
nums = [10, 20, 30, 20, 40]
```

We can map each value to its most recent index.

```python
index_map = {}

for i, x in enumerate(nums):
    index_map[x] = i
```

Result:

```python
{
    10: 0,
    20: 3,
    30: 2,
    40: 4
}
```

Notice that the index of `20` is `3`, because the most recent occurrence overwrites the earlier one.

#### Variations

**First occurrence:**

```python
if x not in index_map:
    index_map[x] = i
```

**Last occurrence:**

```python
index_map[x] = i
```

**All occurrences:**

```python
index_map.setdefault(x, []).append(i)
```

#### When to use it

Index mapping is useful for:

* Finding the distance between repeated elements.
* Locating previous occurrences.
* Finding the first or last occurrence.
* Solving problems involving pairs of indices.

---

### 2.3 Pair Counting

This pattern counts pairs satisfying a mathematical condition.

Suppose:

```python
nums = [1, 5, 7, -1, 5]
target = 6
```

We want to count pairs whose sum equals 6.

The key equation is:

$$
a+b=target
$$

For each current element \(b\), we look for:

$$
a=target-b
$$

Instead of storing just whether a value exists, we store how many times it has appeared.

```python
def count_pairs(nums, target):
    freq = {}
    count = 0

    for x in nums:
        complement = target - x

        count += freq.get(complement, 0)

        freq[x] = freq.get(x, 0) + 1

    return count
```

For this example, the answer is `3`.

The pairs are:

* `(1, 5)` using the first `5`.
* `(1, 5)` using the second `5`.
* `(7, -1)`.

Each pair is counted once because the map contains only previously processed elements.

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(k)\), where \(k\) is the number of distinct elements.

---

## 3. Prefix Hashing

#### Prefix sums, prefix XOR, and subarray counting

This is one of the most powerful hashing patterns in DSA.

It combines two ideas:

1. Prefix computations.
2. Hash maps that store previously encountered prefix states.

The result is an efficient way to solve many subarray problems.

---

### 3.1 Understanding Prefix Sums

Consider:

```python
nums = [2, 4, 1, 3]
```

Define the prefix sum:

$$
P_i=\sum_{j=0}^{i}a_j
$$

The prefix sums are:

| Index | Element | Prefix sum |
| ----- | ------- | ---------- |
| 0     | 2       | 2          |
| 1     | 4       | 6          |
| 2     | 1       | 7          |
| 3     | 3       | 10         |

The prefix array is:

```python
[2, 6, 7, 10]
```

The sum of a subarray from index \(l\) to \(r\) is:

$$
S(l,r)=P_r-P_{l-1}
$$

If we define \(P_{-1}=0\), the formula works uniformly:

$$
S(l,r)=P_r-P_{l-1}
$$

---

### 3.2 Prefix Sum + Hash Map

#### Problem: Subarray Sum Equals K

Given an array, count the number of contiguous subarrays whose sum equals \(k\).

Example:

```python
nums = [1, 2, 3]
k = 3
```

The valid subarrays are:

* `[1, 2]`
* `[3]`

Answer:

```python
2
```

#### Mathematical derivation

We want:

$$
P_r-P_l=k
$$

Rearrange:

$$
P_l=P_r-k
$$

At every position, we need to know how many earlier prefix sums equal:

$$
P_r-k
$$

This is exactly what a hash map can provide.

#### Solution

```python
def subarray_sum(nums, k):
    freq = {0: 1}
    prefix = 0
    count = 0

    for x in nums:
        prefix += x

        count += freq.get(prefix - k, 0)

        freq[prefix] = freq.get(prefix, 0) + 1

    return count
```

#### Why initialize `freq = {0: 1}`?

This represents the empty prefix before the array begins.

It allows us to count subarrays that start at index `0`.

For example, if the first element itself equals `k`, then:

$$
P_r-k=0
$$

The initial frequency of zero ensures that this subarray is counted.

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(n)\).

---

### 3.3 Longest Subarray with Sum K

The same mathematical relationship can solve a different problem.

Instead of counting subarrays, we want the **maximum length** of a subarray whose sum equals \(k\).

For each prefix sum \(P_r\), we need an earlier prefix:

$$
P_l=P_r-k
$$

The subarray length is:

$$
r-l
$$

To maximize this length, we store the **earliest index** at which each prefix sum occurs.

```python
def longest_subarray_sum_k(nums, k):
    first = {0: -1}
    prefix = 0
    best = 0

    for i, x in enumerate(nums):
        prefix += x

        target = prefix - k

        if target in first:
            best = max(best, i - first[target])

        if prefix not in first:
            first[prefix] = i

    return best
```

#### Important distinction

| Goal                         | What to store                                         |
| ---------------------------- | ----------------------------------------------------- |
| Count valid subarrays        | Frequency of each prefix                              |
| Find longest valid subarray  | Earliest index of each prefix                         |
| Find shortest valid subarray | Often latest suitable index, depending on constraints |

The underlying mathematical relationship remains the same.

---

### 3.4 Prefix XOR + Hash Map

Prefix hashing also works with XOR.

Define:

$$
X_i=a_0\oplus a_1\oplus\cdots\oplus a_i
$$

The XOR of a subarray is:

$$
X_r\oplus X_l
$$

For a target XOR \(k\):

$$
X_r\oplus X_l=k
$$

Rearranging:

$$
X_l=X_r\oplus k
$$

Therefore, we can count subarrays with XOR \(k\) using a frequency map.

```python
def count_subarrays_xor(nums, k):
    freq = {0: 1}
    prefix = 0
    count = 0

    for x in nums:
        prefix ^= x

        count += freq.get(prefix ^ k, 0)

        freq[prefix] = freq.get(prefix, 0) + 1

    return count
```

#### Summary

Prefix hashing is especially useful when a problem asks for:

* The number of subarrays with a given sum.
* The longest subarray satisfying a sum condition.
* Subarrays with zero sum.
* Subarrays with a given XOR.
* Subarrays whose sum is divisible by a number.

---

## 4. Window Hashing

#### Sliding windows with sets and frequency maps

Window hashing combines a sliding window with a hash-based data structure.

The sliding window determines which elements are currently relevant.

The hash map or set maintains information about those elements.

---

### 4.1 Sliding Window + Set

#### Problem: Longest Substring Without Repeating Characters

Given a string, find the length of the longest substring containing no repeated characters.

Example:

```python
s = "abcabcbb"
```

Answer:

```python
3
```

The longest valid substrings include `"abc"`, `"bca"`, and `"cab"`.

#### Core idea

Maintain a window:

$$
[l,r]
$$

such that every character inside the window is unique.

When a duplicate appears, move the left boundary until the window becomes valid again.

#### Solution

```python
def length_of_longest_substring(s):
    seen = set()
    left = 0
    best = 0

    for right, char in enumerate(s):

        while char in seen:
            seen.remove(s[left])
            left += 1

        seen.add(char)

        best = max(best, right - left + 1)

    return best
```

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(k)\), where \(k\) is the number of distinct characters in the active window.

Each character enters and leaves the window at most once.

---

### 4.2 Sliding Window + Frequency Map

#### Problem: Find All Anagrams in a String

Given two strings, find all starting indices where an anagram of the second string appears in the first.

```python
s = "cbaebabacd"
p = "abc"
```

Answer:

```python
[0, 6]
```

The substrings `"cba"` and `"bac"` are anagrams of `"abc"`.

#### Core idea

An anagram is determined by character frequencies.

We maintain:

* A frequency map for the target string.
* A frequency map for the current window.

If the two frequency distributions match, the window is an anagram.

#### Python solution

```python
from collections import Counter

def find_anagrams(s, p):
    if len(p) > len(s):
        return []

    target = Counter(p)
    window = Counter(s[:len(p)])

    ans = []

    if window == target:
        ans.append(0)

    for right in range(len(p), len(s)):
        entering = s[right]
        leaving = s[right - len(p)]

        window[entering] += 1
        window[leaving] -= 1

        if window[leaving] == 0:
            del window[leaving]

        if window == target:
            ans.append(right - len(p) + 1)

    return ans
```

This is a straightforward implementation. Comparing entire frequency maps at every step may cost more than constant time when the alphabet is large.

For a fixed, small alphabet, we can optimize by tracking how many character frequencies currently match.

#### When to use window hashing

Use this combination when:

* You need to track unique elements in a window.
* You need character frequencies in a substring.
* You need to find anagrams.
* You need to count distinct elements in a moving range.
* You need to maintain a frequency-based condition as the window changes.

---

## 5. String Hashing

#### Anagram signatures, rolling hash, and Rabin–Karp

String hashing has two major branches:

1. **Structural hashing:** Represent a string using a property such as its character frequencies.
2. **Rolling hashing:** Represent a string or substring using a numerical hash value.

These solve different types of problems.

---

### 5.1 Anagram Signatures

#### Problem: Group Anagrams

Given:

```python
strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
```

We need to group strings that are anagrams of one another.

#### Key observation

Anagrams contain the same characters with the same frequencies.

Therefore, we can create a canonical representation of each string.

For lowercase English letters, the signature can be a tuple of 26 character frequencies.

#### Solution

```python
from collections import defaultdict

def group_anagrams(strs):
    groups = defaultdict(list)

    for word in strs:
        freq = [0] * 26

        for char in word:
            freq[ord(char) - ord('a')] += 1

        key = tuple(freq)

        groups[key].append(word)

    return list(groups.values())
```

#### Why use a tuple?

A tuple is immutable and hashable, so it can be used as a dictionary key.

The frequency array itself is mutable and cannot be used directly as a dictionary key.

#### Complexity

For \(n\) strings with an average length of \(m\):

* Time: \(O(nm)\) for a fixed alphabet.
* Space: Depends on the number of distinct signatures and stored strings.

---

### 5.2 Rolling Hash

Rolling hash is used to compute hash values for substrings efficiently.

Suppose we have:

```python
s = "abcdef"
```

We want to compare many substrings without repeatedly processing every character.

A polynomial rolling hash can be defined as:

$$
H(s)=\sum_{i=0}^{n-1}s_i p^i \pmod m
$$

Where:

* \(s_i\) is a numerical representation of a character.
* \(p\) is a base.
* \(m\) is a modulus.

With suitable prefix-hash and power arrays, we can compute a substring hash in \(O(1)\) time after \(O(n)\) preprocessing.

#### Why is this useful?

Suppose we want to compare two substrings of length \(L\).

Without hashing, comparing them directly may take:

$$
O(L)
$$

With prefix hashes, comparing their hash values takes:

$$
O(1)
$$

However, hash collisions are possible, so equal hashes do not guarantee equal strings.

---

### 5.3 Rabin–Karp

Rabin–Karp is a string-searching algorithm that uses rolling hashes.

#### Problem

Find occurrences of a pattern inside a text.

For example:

```python
text = "ababcabc"
pattern = "abc"
```

We want to find the positions where `"abc"` occurs.

#### Core idea

1. Compute the hash of the pattern.
2. Compute the hash of the first text window of the same length.
3. Compare the hashes.
4. Slide the window and update its hash efficiently.
5. If hashes match, verify the actual characters to guard against collisions.

#### Complexity

With a well-behaved hash and appropriate implementation:

* Expected time: \(O(n+m)\) for a single pattern of length \(m\) in text of length \(n\).
* Worst-case time can be higher due to collisions and verification.

#### When to use string hashing

Use it for:

* Finding repeated substrings.
* Detecting duplicate strings.
* Comparing substrings efficiently.
* Pattern matching.
* Longest duplicate substring problems.

---

## 6. Mathematical Hashing

#### Remainders, bitmasks, and state representations

Mathematical hashing uses mathematical transformations to create compact keys that represent values, relationships, or states.

The key idea is:

**Transform a complicated property into a simpler representation that can be stored and retrieved using a hash map.**

---

### 6.1 Remainder Hashing

#### Problem

Count pairs whose sum is divisible by \(k\).

For two integers \(a\) and \(b\):

$$
(a+b)\bmod k=0
$$

This is equivalent to:

$$
(a\bmod k+b\bmod k)\bmod k=0
$$

Let:

$$
r=a\bmod k
$$

Then the complementary remainder is:

$$
(k-r)\bmod k
$$

#### Example

Suppose:

```python
nums = [1, 2, 3, 4, 5, 6]
k = 5
```

The remainders are:

```python
[1, 2, 3, 4, 0, 1]
```

A remainder of `1` pairs with a remainder of `4`.

A remainder of `2` pairs with a remainder of `3`.

A remainder of `0` pairs with another remainder of `0`.

#### Solution

```python
def count_pairs_divisible_by_k(nums, k):
    freq = {}
    count = 0

    for x in nums:
        r = x % k
        complement = (-r) % k

        count += freq.get(complement, 0)

        freq[r] = freq.get(r, 0) + 1

    return count
```

This counts unordered pairs of distinct indices.

#### Complexity

* Time: \(O(n)\) expected.
* Space: \(O(k)\) in the worst case, because there are at most \(k\) possible remainders.

---

### 6.2 Bitmask Hashing

A bitmask represents a collection of Boolean properties using bits.

For example, if we want to represent which of the first four letters appear in a string:

| Character | Bit  |
| --------- | ---- |
| a         | 0001 |
| b         | 0010 |
| c         | 0100 |
| d         | 1000 |

The string `"ac"` can be represented as:

$$
0001 \;|\; 0100=0101
$$

This compact representation is useful for tracking character sets.

#### Example: Unique Characters

```python
def has_unique_chars(s):
    mask = 0

    for char in s:
        bit = 1 << (ord(char) - ord('a'))

        if mask & bit:
            return False

        mask |= bit

    return True
```

This works for lowercase English letters.

#### Complexity

For a string of length \(n\):

* Time: \(O(n)\).
* Auxiliary space: \(O(1)\) when the alphabet size is fixed and the bitmask fits in a constant number of machine words.

---

### 6.3 Bitmask + Hash Map

Bitmasks can also represent the parity of character frequencies.

Consider a string where we want to count substrings that contain at most one character with an odd frequency.

For each character:

* Toggle its corresponding bit.
* Store the frequency of each previously encountered mask.

If the current mask is \(M\), a substring has all-even character frequencies when the earlier mask is also \(M\).

For at most one odd-frequency character, the earlier mask can be:

$$
M
$$

or:

$$
M\oplus 2^i
$$

for one bit position \(i\).

This is the central idea behind problems such as **Number of Wonderful Substrings**.

---

### 6.4 State Representation

Sometimes a problem involves a complex state that needs to be tracked.

For example, in a lock puzzle, a state might be:

```python
"1234"
```

A set can store visited states:

```python
visited = {"1234", "1235", "1236"}
```

Before exploring a new state, check whether it has already been visited.

This is common in:

* BFS.
* DFS.
* State-space search.
* Puzzles.
* Graph traversal.
* Simulations.

#### Summary

| Pattern           | Transformation                          | Typical use                    |
| ----------------- | --------------------------------------- | ------------------------------ |
| Remainder hashing | Number → remainder                      | Divisibility and pair counting |
| Bitmask hashing   | Set of properties → integer             | Character sets and parity      |
| State hashing     | Complex state → hashable representation | BFS, DFS, and simulations      |

---

## 7. Advanced Hashing

#### Dynamic programming, graphs, geometry, and data structure design

Advanced hashing combines hash maps and sets with other algorithms or data structures.

These patterns become especially useful when the problem requires storing more complex relationships.

---

### 7.1 Hashing + Dynamic Programming

Dynamic programming often involves repeatedly solving the same subproblem.

A hash map can store previously computed results.

#### Example: Longest Arithmetic Subsequence

Given:

```python
nums = [3, 6, 9, 12]
```

We want the longest subsequence in which the difference between consecutive elements is constant.

The answer is:

```python
4
```

The difference is:

$$
d=3
$$

#### DP state

Let:

$$
dp[i][d]
$$

represent the length of the longest arithmetic subsequence ending at index \(i\) with common difference \(d\).

For each pair of indices \(j<i\):

$$
d=nums[i]-nums[j]
$$

We extend the sequence ending at \(j\) with difference \(d\).

#### Python solution

```python
def longest_arith_seq_length(nums):
    n = len(nums)

    dp = [{} for _ in range(n)]
    best = 1

    for i in range(n):
        for j in range(i):
            d = nums[i] - nums[j]

            length = dp[j].get(d, 1) + 1

            dp[i][d] = max(dp[i].get(d, 0), length)

            best = max(best, dp[i][d])

    return best
```

#### Complexity

* Time: \(O(n^2)\) expected.
* Space: \(O(n^2)\) in the worst case.

**Key insight:** A hash map allows each DP state to be indexed by a difference value without allocating a large array for every possible difference.

---

### 7.2 Hashing + Graphs

Hash maps and sets are widely used to represent graphs and track visited nodes.

#### Example: Clone Graph

Suppose we have a graph where each node has a value and a list of neighbors.

We need to create a deep copy of the graph.

The challenge is that multiple edges may point to the same node, and cycles may exist.

#### Core idea

Use a map:

$$
original\ node \rightarrow cloned\ node
$$

When visiting a node:

1. Check whether its clone already exists.
2. If it does, return the existing clone.
3. Otherwise, create the clone.
4. Recursively clone its neighbors.

#### Python implementation

```python
def clone_graph(node):
    if node is None:
        return None

    clones = {}

    def dfs(curr):
        if curr in clones:
            return clones[curr]

        copy = Node(curr.val)
        clones[curr] = copy

        for neighbor in curr.neighbors:
            copy.neighbors.append(dfs(neighbor))

        return copy

    return dfs(node)
```

#### Complexity

* Time: \(O(V+E)\).
* Space: \(O(V)\) for the clone map, excluding the output graph and recursion stack.

**Key insight:** The hash map prevents duplicate cloning and handles cycles.

---

### 7.3 Hashing + Geometry

Hashing is useful when geometric relationships can be represented as keys.

#### Example: Detect Squares

Suppose we have a collection of points on a 2D plane.

We want to count how many axis-aligned squares can be formed using a given point as one of the corners.

#### Core idea

Store point frequencies:

$$
(x,y)\rightarrow \text{frequency}
$$

For a given point:

$$
(x_1,y_1)
$$

and another point:

$$
(x_2,y_2)
$$

that lies on the same horizontal line, we can determine the possible vertical coordinates of the other two corners.

The square's side length is:

$$
d=|x_2-x_1|
$$

The remaining corners must lie at:

$$
(x_1,y_1+d),\quad (x_2,y_2+d)
$$

or:

$$
(x_1,y_1-d),\quad (x_2,y_2-d)
$$

A hash map lets us check whether these points exist and retrieve their frequencies.

#### When to use it

Use geometric hashing when:

* Points have integer coordinates.
* You need fast coordinate membership checks.
* You need to count geometric configurations.
* You need to group points by slopes or differences.

---

### 7.4 Hash Map + Doubly Linked List

This combination is used in data structure design problems.

#### Example: LRU Cache

An LRU cache removes the least recently used item when its capacity is exceeded.

We need:

* Fast lookup by key.
* Fast removal of the least recently used item.
* Fast movement of an accessed item to the most-recently-used position.

A hash map alone cannot efficiently maintain recency order.

A doubly linked list alone cannot efficiently locate arbitrary keys.

Combining them solves both problems.

#### Data structure

```text
Hash Map:
key → linked-list node

Doubly Linked List:
Least Recently Used ↔ Most Recently Used
```

#### Operations

| Operation                  | Expected time |
| -------------------------- | ------------- |
| Get                        | O(1)          |
| Put                        | O(1)          |
| Remove least recently used | O(1)          |

#### Why it works

The hash map gives direct access to a node.

The doubly linked list allows that node to be removed and moved to the front in constant time.

This is a classic example of **combining data structures to satisfy multiple complexity requirements**.

---

## Final Summary: The 7 Hashing Patterns

| # | Pattern              | Main idea                                                 | Key application                        |
| - | -------------------- | --------------------------------------------------------- | -------------------------------------- |
| 1 | Basic Hashing        | Store elements and their frequencies                      | Membership and duplicate detection     |
| 2 | Array Hashing        | Store values, indices, and complements                    | Two Sum and pair counting              |
| 3 | Prefix Hashing       | Store prefix states                                       | Subarray sum and XOR problems          |
| 4 | Window Hashing       | Maintain information about a moving window                | Anagrams and unique substrings         |
| 5 | String Hashing       | Represent and compare strings efficiently                 | Group Anagrams and Rabin–Karp          |
| 6 | Mathematical Hashing | Transform values into compact mathematical states         | Remainders, bitmasks, and state search |
| 7 | Advanced Hashing     | Combine hashing with other algorithms and data structures | DP, graphs, geometry, and LRU Cache    |

---

### How to Recognize Which Pattern to Use

When solving a new problem, ask these questions in order:

1. **Do I need to check whether an element exists?** → Basic hashing.
2. **Do I need to find a pair or track indices?** → Array hashing.
3. **Am I dealing with contiguous subarrays and cumulative values?** → Prefix hashing.
4. **Am I maintaining a contiguous range that expands and shrinks?** → Window hashing.
5. **Am I comparing strings, substrings, or character distributions?** → String hashing.
6. **Can I transform the problem into remainders, bitmasks, or compact states?** → Mathematical hashing.
7. **Do I need to combine hashing with DP, graphs, geometry, or another data structure?** → Advanced hashing.

**The most important progression is: Basic Hashing → Array Hashing → Prefix Hashing → Window Hashing → String Hashing → Mathematical Hashing → Advanced Hashing.**
