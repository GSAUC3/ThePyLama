# Hashing Patterns in LeetCode & Competitive Programming

Hashing is one of the most fundamental techniques in Data Structures and Algorithms (DSA). It is used to **reduce lookup time, detect duplicates, count frequencies, identify relationships, and transform problems into efficient set or map operations.**

In LeetCode and competitive programming, hashing is often combined with arrays, strings, prefix sums, sliding windows, and graph algorithms.

Below is a comprehensive catalog of the major hashing patterns, organized by problem-solving technique.

---

# 1. Fundamental Hashing Patterns

These are the foundational patterns you should master first.

| #  | Pattern                  | Core Idea                                      | Typical Complexity                       |
| -- | ------------------------ | ---------------------------------------------- | ---------------------------------------- |
| 1  | Membership Testing       | Check whether an element exists in a set       | O(1) average                             |
| 2  | Duplicate Detection      | Detect repeated elements using a set           | O(n)                                     |
| 3  | Frequency Counting       | Count occurrences using a hash map             | O(n)                                     |
| 4  | Frequency Comparison     | Compare frequency maps of two collections      | O(n)                                     |
| 5  | Index Mapping            | Store element → index                          | O(n)                                     |
| 6  | Value-to-Indices Mapping | Store element → list of indices                | O(n)                                     |
| 7  | Grouping by Key          | Group elements sharing a common property       | O(n) average, excluding key construction |
| 8  | Complement Lookup        | Find a value that completes a target           | O(n) average                             |
| 9  | Last-Seen Index          | Track the most recent occurrence of an element | O(n)                                     |
| 10 | First-Seen Index         | Track the earliest occurrence of an element    | O(n)                                     |

### Typical problems

* Contains Duplicate
* Two Sum
* Valid Anagram
* Group Anagrams
* First Unique Character in a String
* Intersection of Two Arrays

---

# 2. Frequency-Based Hashing Patterns

These patterns use a hash map to represent how frequently elements occur.

| #  | Pattern                            | Core Idea                                       | Example Problems              |
| -- | ---------------------------------- | ----------------------------------------------- | ----------------------------- |
| 11 | Element Frequency Counting         | Count each element                              | Top K Frequent Elements       |
| 12 | Character Frequency Counting       | Count characters in a string                    | Valid Anagram                 |
| 13 | Frequency Map Equality             | Compare two frequency distributions             | Permutation in String         |
| 14 | Frequency-Based Grouping           | Group elements by frequency signature           | Group Anagrams                |
| 15 | Frequency-Based Selection          | Select elements based on occurrence count       | Top K Frequent Elements       |
| 16 | Frequency-Based Majority Detection | Identify elements occurring frequently          | Majority Element              |
| 17 | Frequency Decrementing             | Track remaining required elements               | Minimum Window Substring      |
| 18 | Frequency Difference               | Track the difference between two frequency maps | Find All Anagrams in a String |
| 19 | Frequency of Frequencies           | Count how many elements have a given frequency  | Maximum Frequency Stack       |
| 20 | Frequency-Based Sorting            | Sort using frequency information                | Sort Characters By Frequency  |

**Key insight:** Frequency maps turn a collection into a compact representation of its distribution.

---

# 3. Hashing + Arrays

These patterns are especially common in array problems.

| #  | Pattern                      | Core Idea                                        | Example Problems             |
| -- | ---------------------------- | ------------------------------------------------ | ---------------------------- |
| 21 | Hash-Based Lookup            | Find elements without repeated linear searches   | Two Sum                      |
| 22 | Complement Hashing           | Find a pair that satisfies a target equation     | Two Sum                      |
| 23 | Duplicate Tracking           | Detect repeated values                           | Contains Duplicate           |
| 24 | Intersection Using Sets      | Find common elements                             | Intersection of Two Arrays   |
| 25 | Index Tracking               | Map values to their indices                      | Two Sum                      |
| 26 | Pair Sum Counting            | Count pairs satisfying a sum condition           | Count Pairs With Given Sum   |
| 27 | Triplet Lookup               | Use hashing to find a third element              | 3Sum                         |
| 28 | Difference-Based Lookup      | Find pairs with a given difference               | K-diff Pairs in an Array     |
| 29 | Set-Based Sequence Detection | Identify consecutive sequences                   | Longest Consecutive Sequence |
| 30 | In-Place Array + Hashing     | Combine a hash structure with array modification | First Missing Positive       |

---

# 4. Hashing + Prefix Sums

This is one of the **most important hashing combinations for competitive programming**.

The central idea is to store prefix sums and use them to identify subarrays satisfying a mathematical condition.

For an array \(a_1,a_2,\ldots,a_n\), define:

$$
P_i = \sum_{j=1}^{i} a_j
$$

Then the sum of a subarray from \(l\) to \(r\) is:

$$
S(l,r)=P_r-P_{l-1}
$$

This leads to several powerful patterns.

| #  | Pattern                                | Core Idea                                         | Example Problems                   |
| -- | -------------------------------------- | ------------------------------------------------- | ---------------------------------- |
| 31 | Prefix Sum Frequency Map               | Count prefix sums                                 | Subarray Sum Equals K              |
| 32 | Prefix Sum Existence                   | Check whether a desired prefix sum exists         | Continuous Subarray Sum            |
| 33 | Prefix Sum Index Map                   | Store the earliest index of each prefix sum       | Maximum Size Subarray Sum Equals K |
| 34 | Zero-Sum Subarray Detection            | Detect repeated prefix sums                       | Subarray with 0 Sum                |
| 35 | Prefix Sum Pair Counting               | Count pairs of prefix sums satisfying a condition | Subarray Sum Equals K              |
| 36 | Prefix Sum + Modulo                    | Track prefix sums modulo a number                 | Subarray Sums Divisible by K       |
| 37 | Prefix XOR Hashing                     | Track prefix XOR values                           | Count Subarrays With Given XOR     |
| 38 | Prefix Sum + Frequency Difference      | Count subarrays meeting balance conditions        | Binary Subarrays With Sum          |
| 39 | Prefix Sum + Earliest Occurrence       | Find the longest valid subarray                   | Contiguous Array                   |
| 40 | Prefix Sum + Coordinate Transformation | Transform values before prefix processing         | Count Nice Subarrays               |

### The fundamental equation

For a subarray sum equal to \(k\):

$$
P_r-P_l=k
$$

Rearranging:

$$
P_l=P_r-k
$$

At each position, look up the frequency of \(P_r-k\) in a hash map.

This gives an expected **O(n)** algorithm for counting subarrays with sum \(k\).

---

# 5. Hashing + Sliding Window

Hash maps and sets are frequently used to maintain information about a moving window.

| #  | Pattern                          | Core Idea                                          | Example Problems                                   |
| -- | -------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| 41 | Sliding Window + Set             | Maintain unique elements in a window               | Longest Substring Without Repeating Characters     |
| 42 | Sliding Window + Frequency Map   | Track element counts inside a window               | Permutation in String                              |
| 43 | Fixed-Size Window Frequency      | Maintain counts for a fixed-size window            | Find All Anagrams in a String                      |
| 44 | Variable-Size Window Frequency   | Expand and shrink based on a condition             | Minimum Window Substring                           |
| 45 | Window Frequency Matching        | Match the window distribution to a target          | Permutation in String                              |
| 46 | Window Distinct Count            | Track the number of distinct elements              | Subarrays with K Different Integers                |
| 47 | Last-Seen Index Window           | Move the left boundary using the latest occurrence | Longest Substring Without Repeating Characters     |
| 48 | Sliding Window + Deque + Hashing | Combine window tracking with a deque               | Sliding Window problems with frequency constraints |

**Important distinction:** Sliding window is the overall algorithmic technique; hashing is the data structure used to maintain information within the window.

---

# 6. Hashing + Strings

String problems frequently rely on hashing to represent characters, substrings, or patterns.

| #  | Pattern                      | Core Idea                                           | Example Problems                       |
| -- | ---------------------------- | --------------------------------------------------- | -------------------------------------- |
| 49 | Character Frequency Hashing  | Represent a string using character counts           | Valid Anagram                          |
| 50 | Anagram Signature            | Use a canonical frequency representation            | Group Anagrams                         |
| 51 | Character Mapping            | Maintain mappings between characters                | Isomorphic Strings                     |
| 52 | Bidirectional Mapping        | Maintain one-to-one character correspondence        | Word Pattern                           |
| 53 | First Unique Character       | Track frequency and preserve order                  | First Unique Character in a String     |
| 54 | String-to-Pattern Mapping    | Map words or characters to structural patterns      | Word Pattern                           |
| 55 | Substring Frequency Counting | Count occurrences of substrings                     | Repeated DNA Sequences                 |
| 56 | Rolling Hash                 | Compute hash values efficiently for substrings      | Repeated String Matching               |
| 57 | Rabin–Karp                   | Use rolling hashes for pattern matching             | Find All Anagrams in a String          |
| 58 | Prefix Hashing               | Compute hashes of prefixes                          | Longest Duplicate Substring            |
| 59 | Double Hashing               | Use two independent hashes to reduce collision risk | Longest Duplicate Substring            |
| 60 | Palindrome Hashing           | Compare forward and reverse hashes                  | Longest Palindromic Substring variants |

---

# 7. Advanced String Hashing

These patterns are particularly useful in competitive programming.

| #  | Pattern                               | Core Idea                                                            |
| -- | ------------------------------------- | -------------------------------------------------------------------- |
| 61 | Polynomial Rolling Hash               | Represent a string using polynomial arithmetic                       |
| 62 | Rolling Hash with Prefix Hashes       | Extract substring hashes efficiently                                 |
| 63 | Rabin–Karp Multi-Pattern Matching     | Search for multiple patterns using hash values                       |
| 64 | Longest Common Substring with Hashing | Combine binary search and hashing                                    |
| 65 | Duplicate Substring Detection         | Detect repeated substrings using hash sets                           |
| 66 | Hash-Based String Equality            | Compare strings through their hash representations                   |
| 67 | Hashing + Binary Search               | Search for the longest substring satisfying a condition              |
| 68 | Hashing + LCP                         | Use hashing to compare common prefixes                               |
| 69 | Substring Hash Counting               | Count distinct substrings using hashes                               |
| 70 | Hash-Based Palindrome Queries         | Answer substring palindrome queries using forward and reverse hashes |

### Polynomial rolling hash

A common polynomial hash is:

$$
H(s)=\sum_{i=0}^{n-1}s_i p^i \pmod m
$$

Where:

* \(s_i\) is the numerical representation of a character.
* \(p\) is a chosen base.
* \(m\) is a modulus.

Rolling hashes allow substring comparisons without rebuilding the entire hash from scratch.

**Caution:** Hash collisions are possible. Double hashing or direct verification can reduce the risk of incorrect results.

---

# 8. Hashing + Mathematics

Hashing is frequently used to store mathematical states and identify repeated values.

| #  | Pattern                         | Core Idea                                          | Example Problems                                               |
| -- | ------------------------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| 71 | Remainder Hashing               | Group numbers by their remainder                   | Subarray Sums Divisible by K                                   |
| 72 | Complementary Remainder Pairing | Match remainders that sum to a target modulo \(k\) | Check If Array Pairs Are Divisible by K                        |
| 73 | Difference Hashing              | Store values or differences to find matching pairs | K-diff Pairs in an Array                                       |
| 74 | GCD-Based Grouping              | Group numbers by a mathematical property           | Number-theoretic grouping problems                             |
| 75 | Prime Factorization Signature   | Represent numbers using prime factorization        | Product-equivalence problems                                   |
| 76 | Digit Signature Hashing         | Group numbers by digit properties                  | Find Numbers with Even Number of Digits                        |
| 77 | Bitmask Hashing                 | Represent sets of features using bitmasks          | Maximum Length of a Concatenated String with Unique Characters |
| 78 | XOR State Hashing               | Store XOR states to detect repeated patterns       | Count Subarrays With Given XOR                                 |
| 79 | State Frequency Counting        | Count occurrences of mathematical states           | Subarray Sum Equals K                                          |
| 80 | Pair Difference Frequency       | Count pairs based on their difference              | Count Number of Pairs With Absolute Difference K               |

---

# 9. Hashing + Bit Manipulation

Bitmasks can represent sets of elements or compact states.

| #  | Pattern                       | Core Idea                                | Example Problems                                               |
| -- | ----------------------------- | ---------------------------------------- | -------------------------------------------------------------- |
| 81 | Bitmask as Set Representation | Represent a set using bits               | Maximum Length of a Concatenated String with Unique Characters |
| 82 | Bitmask Frequency Map         | Count occurrences of bitmask states      | Wonderful Substrings                                           |
| 83 | Prefix XOR + Hash Map         | Count subarrays using XOR states         | Count Subarrays With Given XOR                                 |
| 84 | XOR State Tracking            | Detect repeated XOR values               | Subarray XOR problems                                          |
| 85 | Bitmask Complement Matching   | Find complementary bit patterns          | Maximum XOR of Two Numbers in an Array                         |
| 86 | Bitmask + Prefix Frequency    | Count substrings with parity constraints | Number of Wonderful Substrings                                 |
| 87 | Bitmask + Dynamic Programming | Combine bitmask states with memoization  | Shortest Path Visiting All Nodes                               |

---

# 10. Hashing + Graphs

Hash maps and sets are essential in graph representations and graph traversal.

| #  | Pattern                    | Core Idea                                       | Example Problems            |
| -- | -------------------------- | ----------------------------------------------- | --------------------------- |
| 88 | Adjacency Map              | Represent graph connections using a map         | Clone Graph                 |
| 89 | Visited Set                | Track visited vertices                          | Number of Islands           |
| 90 | Node Mapping               | Map original nodes to copied nodes              | Clone Graph                 |
| 91 | Edge Hashing               | Store edges for fast lookup                     | Graph connectivity problems |
| 92 | Pair-Based State Hashing   | Represent a graph state using a pair            | BFS state-space problems    |
| 93 | Coordinate Hashing         | Represent grid positions as hashable keys       | Number of Islands           |
| 94 | Cycle Detection Using Sets | Track previously visited states                 | Happy Number                |
| 95 | Memoization with Hash Maps | Cache results for graph or state-space problems | Word Ladder variants        |
| 96 | Union-Find + Hash Maps     | Map arbitrary labels to disjoint-set indices    | Accounts Merge              |

---

# 11. Hashing + Dynamic Programming

Hash maps can store previously computed states and optimize dynamic programming transitions.

| #   | Pattern                        | Core Idea                       | Example Problems                              |
| --- | ------------------------------ | ------------------------------- | --------------------------------------------- |
| 97  | Memoization Hash Map           | Cache computed states           | Word Break                                    |
| 98  | State Compression with Hashing | Store only reachable states     | State-space DP                                |
| 99  | DP + Frequency Map             | Track counts of states          | Distinct Subsequences variants                |
| 100 | DP + Index Map                 | Find previous matching elements | Longest Arithmetic Subsequence                |
| 101 | Difference-Based DP Hashing    | Store DP states by difference   | Longest Arithmetic Subsequence                |
| 102 | DP + Pair Hashing              | Store pair-specific states      | Arithmetic subsequence problems               |
| 103 | Hash Map of DP States          | Store sparse DP states          | Number of Ways to Form Target String variants |
| 104 | Subproblem Result Caching      | Avoid repeated computation      | Recursive search problems                     |

### Example: Longest Arithmetic Subsequence

For each index \(i\), maintain a map:

$$
dp[i][d]
$$

where \(d\) is the difference between consecutive elements.

The map stores the longest arithmetic subsequence ending at \(i\) with difference \(d\).

---

# 12. Hashing + Greedy Algorithms

Hashing is often used to track available resources, occurrences, and constraints in greedy algorithms.

| #   | Pattern                         | Core Idea                        | Example Problems                 |
| --- | ------------------------------- | -------------------------------- | -------------------------------- |
| 105 | Greedy + Frequency Map          | Track available elements         | Hand of Straights                |
| 106 | Greedy + Set                    | Track available or used values   | Array transformation problems    |
| 107 | Greedy + Last-Seen Index        | Track previous occurrences       | Partition Labels                 |
| 108 | Greedy + Index Mapping          | Locate matching elements quickly | Minimum Index Sum of Two Lists   |
| 109 | Greedy + Frequency Decrementing | Consume available counts         | Constructing arrays or strings   |
| 110 | Greedy + Hash-Based Grouping    | Group elements before processing | Grouping and scheduling problems |

---

# 13. Hashing + Sorting

Sorting and hashing are frequently combined to simplify comparisons and grouping.

| #   | Pattern                           | Core Idea                                     | Example Problems             |
| --- | --------------------------------- | --------------------------------------------- | ---------------------------- |
| 111 | Sort + Hash Map                   | Sort elements and track frequencies           | Sort Characters By Frequency |
| 112 | Sort + Set                        | Remove duplicates or check consecutive values | Longest Consecutive Sequence |
| 113 | Sort + Frequency Map              | Group equal values                            | Frequency-based problems     |
| 114 | Canonical Representation          | Normalize elements before hashing             | Group Anagrams               |
| 115 | Hash-Based Grouping After Sorting | Use sorted representations as keys            | Group Anagrams               |
| 116 | Sort + Index Mapping              | Preserve original positions while sorting     | Rank Transform of an Array   |

---

# 14. Hashing + Heaps

Hash maps and heaps are often used together for frequency-based selection.

| #   | Pattern                        | Core Idea                         | Example Problems        |
| --- | ------------------------------ | --------------------------------- | ----------------------- |
| 117 | Frequency Map + Max Heap       | Select the most frequent elements | Top K Frequent Elements |
| 118 | Frequency Map + Min Heap       | Maintain the top \(k\) elements   | Top K Frequent Elements |
| 119 | Hash Map + Lazy Heap Updates   | Track changing priorities         | Design Twitter          |
| 120 | Hash Map + Heap for Scheduling | Track tasks and their priorities  | Task Scheduler          |

---

# 15. Advanced Data Structure Design Using Hashing

These patterns appear frequently in LeetCode design problems and interviews.

| #   | Pattern                        | Core Idea                                | Example Problems             |
| --- | ------------------------------ | ---------------------------------------- | ---------------------------- |
| 121 | Hash Map + Doubly Linked List  | Maintain key-value pairs with recency    | LRU Cache                    |
| 122 | Hash Map + Frequency Lists     | Maintain items grouped by frequency      | LFU Cache                    |
| 123 | Hash Map + Linked List         | Support insertion and deletion           | Design HashMap               |
| 124 | Hash Set Design                | Implement membership testing             | Design HashSet               |
| 125 | Hash Map + Random Access Array | Support random selection                 | Insert Delete GetRandom O(1) |
| 126 | Hash Map + Indexed Heap        | Maintain key-value pairs with priorities | Priority queue design        |
| 127 | Hash Map + Ordered Structure   | Maintain key-value pairs in sorted order | Time-based key-value stores  |
| 128 | Hash Map + Multiple Indices    | Support multiple lookup criteria         | Design Underground System    |

---

# 16. Hashing + Coordinate and State Representation

This category is particularly useful in grid problems, simulations, and state-space search.

| #   | Pattern                        | Core Idea                              | Example Problems                 |
| --- | ------------------------------ | -------------------------------------- | -------------------------------- |
| 129 | Coordinate Hashing             | Store grid coordinates as keys         | Number of Islands                |
| 130 | Pair Hashing                   | Store pairs of values as keys          | Graph and geometry problems      |
| 131 | Tuple Hashing                  | Store multidimensional states          | BFS and DFS state-space problems |
| 132 | State Encoding                 | Encode a state as an integer or string | Sliding Puzzle                   |
| 133 | Visited-State Hashing          | Avoid revisiting states                | Open the Lock                    |
| 134 | State Frequency Counting       | Count how often a state appears        | Repeated-state problems          |
| 135 | Canonical State Representation | Normalize equivalent states            | Symmetry and grouping problems   |

---

# 17. Hashing + Computational Geometry

Hashing is used to efficiently identify geometric relationships between points.

| #   | Pattern                       | Core Idea                               | Example Problems               |
| --- | ----------------------------- | --------------------------------------- | ------------------------------ |
| 136 | Coordinate Set                | Store points for fast membership checks | Detect Squares                 |
| 137 | Slope Hashing                 | Group points by slope                   | Max Points on a Line           |
| 138 | Distance Hashing              | Group points by distance                | Geometry problems              |
| 139 | Pairwise Difference Hashing   | Store coordinate differences            | Max Points on a Line           |
| 140 | Canonical Line Representation | Normalize a line equation               | Collinearity problems          |
| 141 | Grid Occupancy Hashing        | Track occupied cells                    | Detect Squares                 |
| 142 | Point Frequency Map           | Count duplicate points                  | Geometry and counting problems |

---

# 18. Hashing + Counting Combinatorial Structures

These patterns count pairs, subarrays, combinations, and other structures by storing previously encountered states.

| #   | Pattern                        | Core Idea                                     | Example Problems           |
| --- | ------------------------------ | --------------------------------------------- | -------------------------- |
| 143 | Pair Counting                  | Count pairs satisfying a condition            | Count Pairs With Given Sum |
| 144 | Complement Counting            | Count complementary values                    | Two Sum variants           |
| 145 | Subarray Counting              | Count valid subarrays using prefix states     | Subarray Sum Equals K      |
| 146 | Subsequence State Counting     | Count subsequences using state maps           | Arithmetic subsequences    |
| 147 | Combination Frequency Counting | Count repeated combinations                   | Tuple With Same Product    |
| 148 | Pair Product Hashing           | Group pairs by their product                  | Tuple With Same Product    |
| 149 | Frequency-Based Combinatorics  | Calculate combinations from occurrence counts | Count Good Meals           |
| 150 | Pair-of-Pairs Hashing          | Group pairs by a shared property              | Tuple With Same Product    |

---

# 19. Hashing + Binary Search

Hashing can complement binary search by efficiently checking whether a candidate value or state exists.

| #   | Pattern                               | Core Idea                                            | Example Problems                 |
| --- | ------------------------------------- | ---------------------------------------------------- | -------------------------------- |
| 151 | Binary Search + Hash Set              | Search a sorted structure while checking membership  | Intersection problems            |
| 152 | Binary Search + Rolling Hash          | Search for a substring length satisfying a condition | Longest Duplicate Substring      |
| 153 | Binary Search + Frequency Map         | Check feasibility using frequency information        | Allocation and grouping problems |
| 154 | Binary Search + Hash-Based Validation | Test whether a candidate solution is valid           | String and sequence problems     |

---

# 20. Specialized Competitive Programming Hashing Patterns

These techniques are more common in advanced competitive programming than in standard interview problems.

| #   | Pattern                          | Core Idea                                           |
| --- | -------------------------------- | --------------------------------------------------- |
| 155 | Coordinate Compression + Hashing | Map large values to compact indices                 |
| 156 | Randomized Hashing               | Use random values to reduce collision attacks       |
| 157 | Zobrist Hashing                  | Represent complex states using XOR of random values |
| 158 | Hashing for Multisets            | Represent collections using element frequencies     |
| 159 | Hashing for Sets of Sets         | Represent nested collections using canonical forms  |
| 160 | Tree Hashing                     | Represent rooted tree structures using hashes       |
| 161 | Subtree Hashing                  | Identify structurally equivalent subtrees           |
| 162 | Graph Isomorphism Heuristics     | Compare graph structures using signatures           |
| 163 | Hashing + Segment Tree           | Store and compare range hashes                      |
| 164 | Hashing + Fenwick Tree           | Maintain dynamic hash-related aggregates            |
| 165 | Persistent Hashing               | Maintain versions of hash-based structures          |
| 166 | Hashing + Offline Queries        | Precompute hash information for multiple queries    |
| 167 | Hashing + Sweep Line             | Track active elements using maps and sets           |
| 168 | Hashing + Mo's Algorithm         | Maintain frequencies while processing range queries |

---

# 21. Hashing Patterns You Should Prioritize for LeetCode

If your goal is to master hashing for technical interviews, focus on these **15 core patterns first**.

| Priority | Pattern                              | Representative Problem                         |
| -------- | ------------------------------------ | ---------------------------------------------- |
| 1        | Membership Testing                   | Contains Duplicate                             |
| 2        | Frequency Counting                   | Valid Anagram                                  |
| 3        | Complement Lookup                    | Two Sum                                        |
| 4        | Grouping by Canonical Representation | Group Anagrams                                 |
| 5        | Index Mapping                        | Two Sum                                        |
| 6        | Last-Seen Index                      | Longest Substring Without Repeating Characters |
| 7        | Prefix Sum + Hash Map                | Subarray Sum Equals K                          |
| 8        | Prefix XOR + Hash Map                | Count Subarrays With Given XOR                 |
| 9        | Sliding Window + Frequency Map       | Minimum Window Substring                       |
| 10       | Set-Based Sequence Detection         | Longest Consecutive Sequence                   |
| 11       | Frequency-Based Selection            | Top K Frequent Elements                        |
| 12       | Hash Map + Doubly Linked List        | LRU Cache                                      |
| 13       | Bitmask + Hash Map                   | Number of Wonderful Substrings                 |
| 14       | Rolling Hash                         | Longest Duplicate Substring                    |
| 15       | Difference-Based DP Hashing          | Longest Arithmetic Subsequence                 |

---

# 22. The Most Important Mental Models

When you encounter a new problem, ask yourself:

### A. Do I need fast membership testing?

Use a **hash set**.

Examples: duplicate detection, existence checks, and consecutive sequences.

### B. Do I need to count occurrences?

Use a **frequency map**.

Examples: anagrams, frequency comparisons, and top-k problems.

### C. Do I need to find a complementary value?

Use a **complement lookup**.

Examples: Two Sum and pair-sum problems.

### D. Do I need to find a subarray satisfying a sum or XOR condition?

Use **prefix sums or prefix XOR + a hash map**.

Examples: Subarray Sum Equals K and XOR subarray problems.

### E. Do I need to maintain information about a moving window?

Use **sliding window + hashing**.

Examples: Minimum Window Substring and Longest Substring Without Repeating Characters.

### F. Do I need to group objects that share a property?

Use **canonical representations + a hash map**.

Examples: Group Anagrams and equivalent-state grouping.

### G. Do I need to detect repeated states?

Use **state hashing**.

Examples: cycle detection, graph traversal, and simulations.

### H. Do I need to compare substrings efficiently?

Use **rolling hash**.

Examples: duplicate substring detection and string matching.

---

## Final takeaway

Hashing is not a single algorithm. It is a **data-structuring technique that can be combined with other algorithms**.

For your DSA roadmap, organize hashing into these main categories:

1. **Basic hashing:** Sets, maps, membership, and frequency counting.
2. **Array hashing:** Complement lookup, index mapping, and pair counting.
3. **Prefix hashing:** Prefix sums, prefix XOR, and subarray counting.
4. **Window hashing:** Sliding windows with sets and frequency maps.
5. **String hashing:** Anagram signatures, rolling hash, and Rabin–Karp.
6. **Mathematical hashing:** Remainders, bitmasks, and state representations.
7. **Advanced hashing:** Dynamic programming, graphs, geometry, and data structure design.

**Master the first five categories before moving to rolling hash, tree hashing, and advanced competitive programming techniques.**
