# Arrays in python

Python has dynamic arrays called `list`. 

Lists are basically arrays of points to an python object. 
Everything in python are objects. And every object contains a `reference counter` - it keep tracks of all the reference to the object, `pointer to the type`, and finally the data to be stored inside that object. 

Due to these things an object takes up additional space of 16 bytes. 


1D array: `byte address of element i = base address + (size of each element)*(i - first_index)`

!!! Example 
    a = [0,1,2,3,4,5,6] | base address = 1000 | size of element = 2 byte | find location of a[4]

    location of `a[4]` = 1000 + 2*(4-0) = 1008

    ![Alt text](../imgs/Screenshot%202022-12-23%20105432.png)

Insertion & Deletion

- Best case : at the end, <span style="color:yellow"> $\Omega(1)$</span>
- Worst case: at the beginning, <span style="color:yellow">O(n)</span>
- Average case: in the middle,<span style="color:yellow"> $\Theta(n)$ </span>