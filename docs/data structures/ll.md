# Linked List 

```python

class EmptyList(Exception):
    pass 
```


```python
from typing import Optional,Any
class Node:
    def __init__(self,data:Optional[Any]=None,
                nextNode:Optional[Any]=None) -> None:
        self.data = data 
        self.next = nextNode
    
    def __repr__(self) -> str:
        return f'Node(data = {self.data})'
        
    def __str__(self) -> str:
        return f'Node(data = {self.data})'
```

```python
class LinkedList(object):
    def __init__(self,*e) -> None:
        self.head = None
        self.tail = None 
        self.__size = 0

        if type(e[0]) is range or list or tuple :
            for i in e[0]:
                self.append(i)
        else: 
            for i in e:
                self.append(i)

    @property    
    def size(self)->int:
        return self.__size
    
    def __len__(self):
        return self.__size

    def __iter__(self):
        i = self.head 
        while i:
            yield i 
            i = i.next

    def __str__(self) -> str:
        return 'LinkedList(['+', '.join(str(i.data) for i in self)+'])'
    
    def __repr__(self) -> str:
        return ' -> '.join(i.__str__() for i in self)
    
    def append(self,data:Any):
        self.__size+=1
        if self.head is None:
            self.head = Node(data)
            self.tail = self.head 
        else:
            self.tail.next = Node(data)
            self.tail = self.tail.next

    def pop(self):
        if self.head is not None:
            if self.head.next is None:
                self.head=None
                self.tail=None
            else:
                i = self.head 
                while i.next.next:
                    i = i.next
                i.next = None 
                self.tail = i
            self.__size-=1
        else:
            raise EmptyList


```