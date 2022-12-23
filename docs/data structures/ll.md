# Linked lists

- No fixed storage, i.e., dynamic memory allocation
- `insertion`, `deletion` takes O(1)
- It is a linear data structure, which are not stored in a contiguous memory location.

## Implementation of Linked List in Python

Typical nodes in linked list looks like: 
```python

class Node:
    def __init__(self,data:Any,
                nextNode:Optional[Any]=None) -> None:
        self.data = data # to store the actual data
        self.next = nextNode # pointer to next node
```

```python
class LinkedList(object):
    def __init__(self,*args):
        self.head = None
        self.tail = None
        self.__size = 0 
    
    def append(self,data):...
    def pop(self):...
    def insert(self,at,data):...
    def remove(self,index):...
    def __len__(self):...
    def __add__(self):... # I have defined this in such a way that
    #  you can concatenate two list objects with a '+' operator 
    def reverse(self):...

```

click <a href="https://github.com/GSAUC3/Gsauce-pyds/blob/master/dstructure/linkedlist.py">here</a> to see the code. OR
use this to install the addtional data structures 
```
pip install Gsauce-pyds
```
!!! Example
    ```python
        from dstructure.linkedlist import LinkedList
        l = LinkedList(range(8))
        print(l)
        # LinkedList([0, 1, 2, 3, 4, 5, 6, 7])

        l.append('last')
        print(l)
        # LinkedList([0, 1, 2, 3, 4, 5, 6, 7, last])

        print(len(l))
        #9

        print(l[0],l[5],l[8])
        # Node(data = 0) Node(data = 5) Node(data = last)

        print(l.head,l.tail)
        # Node(data = 0) Node(data = last)

        l[8]=8
        print(l)
        # LinkedList([0, 1, 2, 3, 4, 5, 6, 7, 8])

        l.reverse()
        print(l,'head: ',l.head,'tail: ',l.tail,sep='\n')
        # LinkedList([8, 7, 6, 5, 4, 3, 2, 1, 0])
        # head: 
        # Node(data = 8)
        # tail: 
        # Node(data = 0)

        print(l[:3],l[3:])
        # LinkedList([8, 7, 6]) LinkedList([5, 4, 3, 2, 1, 0])

        l.insert(0,'zero')
        l.insert(3,'three')
        print(l,len(l),l.head,l.tail,sep='\n')
        # LinkedList([zero, 8, 7, three, 6, 5, 4, 3, 2, 1, 0])
        # 11
        # Node(data = zero)
        # Node(data = 0)

        l.remove(0)
        l.remove(3)
        print(l,l.head,l.tail,sep='\n')
        # LinkedList([8, 7, three, 5, 4, 3, 2, 1, 0])
        # Node(data = 8)
        # Node(data = 0)

        a = LinkedList('a b c'.split())
        print(a)
        a + l  # concatenation will overwrite the original list, in this case it's a
        print(a)
        # LinkedList([a, b, c])
        # LinkedList([a, b, c, 8, 7, three, 5, 4, 3, 2, 1, 0])


        print(len(a))
        a.pop()
        a.pop()
        print(len(a))
        # 12
        # 10
    ```
!!! Note
    - Binary search takes O(n)
    - Concatenation takes O(m+n)
***
## Doubly linked list

Linked list but each node contains a pointer to next and previous node. 

Doubly linked list node
```python
class node:
    def __init__(self,data,prev=None,next=None):
        self.data = data 
        self.prev = prev
        self.next = next
```

Doubly linked list class:
```python
class DoublyLinkedList(object):
    def __init__(self,*e):
        self.head = None # reference/pointer to the starting(head) node
        self.tail = None # pointer to the end node
        self.__size =0 # to track the length of the list
    
    def __len__(self):... # returns the length of the list
    def append(self,data):... # appends a node at the end of the list
    def pop(self):... # removes an element at the end of the list
    def reverse(self):... # reverses the list 
```


!!! example
    ```python
    from dstructure.linkedlist import DoublyLinkedList

    l = DoublyLinkedList(range(4))
    print(l)
    # DLList([0 1 2 3])

    l.append(4)
    print(l,len(l))
    # DLList([0 1 2 3 4]) 5

    l.pop()
    print(l)
    # DLList([0 1 2 3])

    print(l.head,l[0],l.tail,l[3],sep='\t')
    # Node(data = 0)	Node(data = 0)	Node(data = 3)	Node(data = 3)

    l.reverse()
    print(l.head,l[0],l.tail,l[3],sep='\t')
    # Node(data = 3)	Node(data = 3)	Node(data = 0)	Node(data = 0)

    print(l.head.next,l.tail.prev)
    # Node(data = 2) Node(data = 1)

    print(l)
    l[2]='two'
    print(l)
    # DLList([3 2 1 0])
    # DLList([3 2 two 0])

    print(l[:2],l[2:])
    # DLList([3 2]) DLList([two 0])
    ```