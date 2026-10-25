# Python — Core Concepts & Quick Revision

## 1. Python Fundamentals

Python is a **high-level, general-purpose, dynamically typed programming language** known for its readability and extensive standard library.

### How Python Executes Code

In the standard CPython implementation:

```text
Python Source Code (.py)
        ↓
Compilation to Bytecode
        ↓
Python Virtual Machine
        ↓
Execution
```

- Python source code is compiled into **bytecode**.
- The Python Virtual Machine executes the bytecode.
- Python is commonly called interpreted, although CPython uses both compilation and interpretation.

---

## 2. Variables & Dynamic Typing

In Python, variables are **names bound to objects**, rather than fixed containers holding values.

```python
x = 10
x = "Python"
```

- `x` initially refers to an integer object.
- It is subsequently rebound to a string object.
- **Objects have types; variable names do not have permanently declared types.**

### Common Built-in Types

| Category | Types |
|---|---|
| Numeric | `int`, `float`, `complex` |
| Boolean | `bool` |
| Text | `str` |
| Sequence | `list`, `tuple`, `range` |
| Set | `set`, `frozenset` |
| Mapping | `dict` |
| Null value | `None` (`NoneType`) |

!!! note "Python-Specific Detail"
    `bool` is a subclass of `int`.

    ```python
    isinstance(True, int)  # True
    ```

---

## 3. Mutable vs Immutable Objects

**Mutability** determines whether an object's contents can change after creation.

| Mutable | Immutable |
|---|---|
| `list` | `int` |
| `dict` | `float` |
| `set` | `bool` |
| | `str` |
| | `tuple` |
| | `frozenset` |

```python
# Mutable
nums = [1, 2, 3]
nums.append(4)

# Immutable
name = "Python"
# name[0] = "J"  # TypeError
```

!!! important "Key Concept"
    Mutability affects **aliasing, copying, function arguments, and hashing**.

    Multiple variables may reference the same mutable object, so mutations through one reference can be visible through another.

---

## 4. Python Collections

| Collection | Ordered | Mutable | Duplicates | Primary use |
|---|---|---|---|---|
| `list` | Yes | Yes | Allowed | Dynamic sequences |
| `tuple` | Yes | No | Allowed | Fixed sequences |
| `set` | No positional order | Yes | Not allowed | Unique elements |
| `dict` | Insertion order | Yes | Keys unique | Key-value mappings |

```python
numbers = [1, 2, 3]           # List
point = (10, 20)              # Tuple
unique = {1, 2, 3}            # Set
person = {"name": "Alex"}     # Dictionary
```

### Dictionary Lookup

Python dictionaries use **hash tables**.

- Average lookup: `O(1)`
- Average insertion: `O(1)`
- Average deletion: `O(1)`
- Worst-case lookup can be `O(n)`.

---

## 5. Indexing & Slicing

Python supports positive and negative indexing.

```python
nums = [10, 20, 30, 40, 50]

nums[0]     # 10
nums[-1]    # 50
nums[-2]    # 40
```

### Slicing Syntax

```python
sequence[start:stop:step]
```

- `start` — inclusive
- `stop` — exclusive
- `step` — interval between elements

```python
nums[1:4]    # [20, 30, 40]
nums[:3]     # [10, 20, 30]
nums[::2]    # [10, 30, 50]
nums[::-1]   # Reverse sequence
```

!!! tip
    `[::-1]` is a concise way to create a reversed copy of a list or string.

---

## 6. Conditional Statements & Operators

### Conditional Execution

```python
if condition:
    ...
elif another_condition:
    ...
else:
    ...
```

### Logical Operators

| Operator | Meaning |
|---|---|
| `and` | Logical AND |
| `or` | Logical OR |
| `not` | Logical NOT |

### Identity vs Equality

- `==` compares **values for equality**.
- `is` compares **object identity**.

```python
a = [1, 2]
b = [1, 2]

a == b    # True
a is b    # False
```

**Preferred None check:**

```python
if value is None:
    ...
```

---

## 7. Loops & Iteration

### For Loop

Used to iterate over an iterable.

```python
for i in range(5):
    print(i)
```

### While Loop

Repeats while a condition remains true.

```python
while condition:
    ...
```

### Loop Control

- `break` — exits the nearest enclosing loop.
- `continue` — skips to the next iteration.

### The `range()` Function

```python
range(5)             # range object
list(range(5))       # [0, 1, 2, 3, 4]
list(range(1, 6, 2)) # [1, 3, 5]
```

`range()` creates a lightweight range object rather than immediately constructing a list.

---

## 8. Functions & Arguments

Functions encapsulate reusable behavior.

```python
def add(a, b):
    return a + b

add(10, 20)
```

- **Parameters:** Names declared in a function definition (`a`, `b`).
- **Arguments:** Values supplied during a function call (`10`, `20`).
- **`return`:** Exits the function and returns a value to the caller.
- A function without an explicit return value returns `None`.

### `*args` and `**kwargs`

```python
def example(*args, **kwargs):
    print(args)
    print(kwargs)

example(1, 2, name="Alex")
```

- `*args` collects additional positional arguments into a tuple.
- `**kwargs` collects additional keyword arguments into a dictionary.

### Lambda Functions

Small anonymous functions defined using `lambda`.

```python
square = lambda x: x ** 2

square(5)  # 25
```

---

## 9. Comprehensions & Generator Expressions

Compact syntax for constructing collections.

### List Comprehension

```python
squares = [x ** 2 for x in range(5)]
# [0, 1, 4, 9, 16]
```

### Set Comprehension

```python
squares = {x ** 2 for x in range(5)}
```

### Dictionary Comprehension

```python
squares = {x: x ** 2 for x in range(5)}
```

### Generator Expression

```python
squares = (x ** 2 for x in range(5))
```

!!! note "Important Difference"
    List comprehensions create lists immediately.

    Generator expressions produce values lazily as they are requested.

---

## 10. Iterables, Iterators & Generators

| Concept | Description |
|---|---|
| Iterable | Object capable of providing an iterator |
| Iterator | Object that produces values sequentially using `next()` |
| Generator | Iterator commonly created using a function containing `yield` |

### Iterator Example

```python
iterator = iter([1, 2, 3])

next(iterator)  # 1
next(iterator)  # 2
```

### Generator Example

```python
def numbers():
    yield 1
    yield 2
    yield 3
```

**`return` vs `yield`:**

- `return` terminates the function invocation.
- `yield` suspends execution and preserves the generator's state for later resumption.

---

## 11. Exception Handling

Exceptions represent errors encountered during execution.

```python
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero")
else:
    print("No exception occurred")
finally:
    print("Cleanup")
```

| Keyword | Purpose |
|---|---|
| `try` | Contains code that may raise exceptions |
| `except` | Handles matching exceptions |
| `else` | Executes when no exception occurs in `try` |
| `finally` | Executes cleanup code regardless of whether an exception occurs |

**Error categories:**

- **Syntax errors:** Invalid Python syntax.
- **Runtime exceptions:** Errors raised during program execution.

---

## 12. Modules & Packages

A **module** is a Python file containing reusable definitions and statements.

```python
# math_utils.py
def add(a, b):
    return a + b
```

### Importing Modules

```python
import math_utils

math_utils.add(2, 3)
```

Or:

```python
from math_utils import add

add(2, 3)
```

- **Module:** Reusable Python code unit.
- **Package:** Organizes related modules and subpackages.
- **Library:** Collection of reusable functionality.

---

## 13. Classes & Objects

Python supports object-oriented programming.

- **Class:** Blueprint defining attributes and methods.
- **Object:** Instance of a class.
- **Attribute:** Data associated with an object.
- **Method:** Function associated with a class.

```python
class Dog:
    def __init__(self, name):
        self.name = name

    def bark(self):
        return f"{self.name} says woof!"

dog = Dog("Bruno")
print(dog.bark())
```

### Important Terms

- `__init__()` — initializes an instance.
- `self` — conventional reference to the current instance.
- Instance attributes — store object-specific state.
- Instance methods — define object behavior.

---

## 14. Four Pillars of OOP

| Principle | Meaning |
|---|---|
| **Encapsulation** | Bundling data and behavior, with control over implementation details |
| **Abstraction** | Exposing essential behavior while hiding unnecessary details |
| **Inheritance** | Deriving classes from existing classes |
| **Polymorphism** | Different objects supporting the same interface with different behavior |

### Inheritance & Polymorphism

```python
class Animal:
    def speak(self):
        return "Some sound"

class Dog(Animal):
    def speak(self):
        return "Woof"
```

`Dog` inherits from `Animal` and overrides its `speak()` method.

---

## 15. Duck Typing

**Duck typing:** An object's suitability is determined by the operations it supports rather than solely by its explicit type.

```python
def make_it_speak(animal):
    return animal.speak()
```

Any object with a compatible `speak()` method can be passed to this function.

!!! tip
    Focus on **what an object can do**, not just which class it belongs to.

---

## 16. Decorators

Decorators wrap or modify the behavior of functions or classes.

```python
@timer
def expensive_function():
    ...
```

Conceptually:

```python
expensive_function = timer(expensive_function)
```

Common uses include:

- Logging
- Timing
- Authentication
- Caching

---

## 17. Context Managers

Context managers handle resource setup and cleanup.

```python
with open("file.txt") as f:
    data = f.read()
```

**Execution flow:**

```text
Acquire resource
       ↓
Use resource
       ↓
Release / Cleanup
```

Common use cases:

- File handling
- Database connections
- Locks
- Managed resources

---

## 18. Quick Revision — Key Takeaways

| Concept | Remember |
|---|---|
| Variables | Names reference objects |
| Dynamic typing | Names can be rebound to objects of different types |
| Mutability | Mutable objects can change in place |
| Lists | Ordered, mutable sequences |
| Tuples | Ordered, immutable sequences |
| Sets | Collections of unique elements |
| Dictionaries | Hash-based key-value mappings |
| Slicing | `start:stop:step`, stop exclusive |
| `is` vs `==` | Identity vs equality |
| `range()` | Lazy range representation |
| `*args` | Additional positional arguments |
| `**kwargs` | Additional keyword arguments |
| Comprehensions | Concise collection construction |
| Generators | Lazy iteration using `yield` |
| Exceptions | Runtime error handling |
| Classes | Define attributes and methods |
| Duck typing | Behavior over explicit type |
| Decorators | Wrap or modify behavior |
| Context managers | Resource setup and cleanup |

!!! important "Core Python Mental Model"
    - **Everything in Python is an object.**
    - Variables are references to objects, not fixed typed containers.
    - Mutability determines whether objects can change in place.
    - Iteration is built around the iterable and iterator protocols.
    - Functions, classes, and modules organize reusable behavior.