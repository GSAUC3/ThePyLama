# Complex Numbers in Python and intro to `class`

To define a complex number in python use `j`, equivalent to `i` in maths, which is nothing but our old friend `iota` square root of negative one. 

$j = \sqrt{-1}$
$z = a+bj$

```python
z = 5+2j
print(z,type(z))
print(z.real,z.imag)
print('conjugate: ',z.conjugate())
```
!!! output 
    ```
    (5+2j) <class 'complex'>`
    5.0 2.0
    conjugate:  (5-2j)
    ```
## Complex numbers arithmetic

```python
z = 5+2j
w = 5+5j
print('Addition: ',z+w)
print('Substraction: ',z-w)
print('Multiplication: ',z*w)
print('Division: ',z/w)
```
!!! output
    Addition:  (10+7j)

    Substraction:  -3j

    Multiplication:  (15+35j)

    Division:  (0.7-0.3j)

