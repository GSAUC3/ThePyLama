# Arrays in python

## Static Array implementation
```python
class LengthExceeded(Exception):
    '''
    Building custom exception class
    '''
    pass 

class arrays:
    def __init__(self,*args,length:int) -> None:
        assert (type(length)==int) and length>0, "length must be a positive interger!!!"
        if length < len(list(args)):
            raise LengthExceeded

        self.__data = list(args) + [None]*(length-len(args)) 
        self.__size = length      

    @property
    def data(self):
        return self.__data

    def __len__(self):
        count = 0 
        for i in self.__data:
            if i is not None:
                count +=1
        return count    

    def __str__(self) -> str:
        return f"{[i for i in self.__data if i]}"
    
    def __repr__(self) -> str:
        return f"StaticArray({self.__data})\nMax Size {self.__size}\nCurrent Size {len(self)} "

    
    def __getitem__(self,index:int):
        return self.__data[index]

    def __setitem__(self,index,data):
        self.__data[index]=data 

    def __iter__(self):
        for i in self.__data:
            yield i
    
    @property
    def isfull(self):
        return True if len(self)>=self.__size else False 
    
    @property
    def isempty(self):
        return True  if len(self)==0 else False 


    def append(self,x):
        if not self.isfull:
            self.__data[len(self)]=x
        else:
            raise LengthExceeded

    def pop(self,index:int):
        c = self.__data[index]
        if index == len(self):
            self.__data[index]=None
            return c
        while index<len(self)-1:
            self.__data[index]=self.__data[index+1]
            index+=1 
        self.__data[index]=None
        return c

    def insert(self,index,x):
        if not self.isfull:
            if len(self)-1<index<self.__size:
                self[index]=x
                return  
            i = len(self)-1
            while i!=index:
                self.__data[i+1]=self.__data[i]
                i-=1
            self.__data[i+1]=self.__data[i]
            self.__data[index]=x 
        else:
            print('Array is already full')

```


```python
a = arrays(1,2,4,6,'str',56,length=10)
a
```





!!! output

    StaticArray([1, 2, 4, 6, 'str', 56, None, None, None, None])

    Max Size 10

    Current Size 6 




```python
a[1],a[3]
```



!!! output

    (2, 6)




```python
a[4]=90
a
```


!!! output

    StaticArray([1, 2, 4, 6, 90, 56, None, None, None, None])

    Max Size 10

    Current Size 6 




```python
a.insert(0,'first')
a
```

!!! output


    StaticArray(['first', 1, 2, 4, 6, 90, 56, None, None, None])

    Max Size 10

    Current Size 7 




```python
a.pop(6)
a
```

!!! output


    StaticArray(['first', 1, 2, 4, 6, 90, None, None, None, None])

    Max Size 10

    Current Size 6 




```python
for i in a:
    print(i,end=' | ')
```
!!! output
    first | 1 | 2 | 4 | 6 | 90 | None | None | None | None | 


```python
print(a)
```
!!! output
    ['first', 1, 2, 4, 6, 90]
    


```python
b = arrays(1,23,4,5,6,7,length=4)
```
!!! output

        ```    ---------------------------------------------------------------------------

        LengthExceeded                            Traceback (most recent call last)

        Cell In[9], line 1
        ----> 1 b = arrays(1,23,4,5,6,7,length=4)
        

        Cell In[1], line 8, in arrays.__init__(self, length, *args)
            6 assert (type(length)==int) and length>0, "length must be a positive interger!!!"
            7 if length < len(list(args)):
        ----> 8     raise LengthExceeded
            10 self.__data = list(args) + [None]*(length-len(args)) 
            11 self.__size = length
        

        LengthExceeded: 
        ```


```python
b = arrays(1,23,4,5,6,7,length=-1)
```
!!! output

    ```    ---------------------------------------------------------------------------

    AssertionError                            Traceback (most recent call last)

    Cell In[16], line 1
    ----> 1 b = arrays(1,23,4,5,6,7,length=-1)
    

    Cell In[2], line 6, in arrays.__init__(self, length, *args)
          5 def __init__(self,*args,length:int) -> None:
    ----> 6     assert (type(length)==int) and length>=0, "length must be a positive interger!!!"
          7     if length < len(list(args)):
          8         raise LengthExceeded
    

    AssertionError: length must be a positive interger!!!
    ``` 


```python

```
