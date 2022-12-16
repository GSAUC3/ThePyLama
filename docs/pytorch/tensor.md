# PyTorch tensors

```python
import torch 
import numpy as np 
```

## <span style="color:yellow">Convert a list to a tensor</span>


```python
x = torch.tensor([1,2,3,6])
print(x,x.dtype,type(x))
```
??? Success "Output"
    `tensor([1, 2, 3, 6]) torch.int64 <class 'torch.Tensor'>`
    

## <span style="color:yellow">torch.ones_like()</span>


```python
x1 = torch.ones_like(x) # returns a tensor of same 
# shape as the input tensor but filled with ones hence the name "ones like"
print(x1,x,f'shape {x1.shape}',sep='\n')
```
??? Success "Output"
    ```
    tensor([1, 1, 1, 1])
    tensor([1, 2, 3, 6])
    shape torch.Size([4])
    ```
    

## <span style="color:yellow">torch.rand_like()</span>


```python
x2 = torch.rand_like(x1,dtype= torch.float16) # silimar to ones_like but fills the 
# tensor with random numbers
x2_ = torch.rand_like(x,dtype=torch.float16)
print(x2,x2_,sep='\n')
```
??? Success "Output"
    ```
    tensor([0.2275, 0.6938, 0.1953, 0.4771], dtype=torch.float16)
    tensor([0.1182, 0.9717, 0.3511, 0.4023], dtype=torch.float16)
    ```
    

## <span style="color:yellow">torch.tensor.numpy() & torch.from_numpy()</span>

convert any tensor to numpy ndarray


```python
x1 = x1.numpy()
print(type(x1),x1)
print(torch.from_numpy(np.zeros(10)))
```
??? Success "Output"
    ```
    <class 'numpy.ndarray'> [1 1 1 1]
    tensor([0., 0., 0., 0., 0., 0., 0., 0., 0., 0.], dtype=torch.float64)
    ```
    

## <span style="color:yellow">torch.rand(), torch.ones(), torch.zeros()</span>


```python
print('rand(): ', torch.rand((1,2)))
print('ones(): ', torch.ones((2,3)))
print('zeros(): ', torch.zeros((3,3)))
# torch.these_functions(shape)
```
??? Success "Output"
    ```
    rand():  tensor([[0.4445, 0.0895]])
    ones():  tensor([[1., 1., 1.],
            [1., 1., 1.]])
    zeros():  tensor([[0., 0., 0.],
            [0., 0., 0.],
            [0., 0., 0.]])
    
    ```

## <span style="color:yellow">move tensors between platforms</span>


```python
platform = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
print(f'device is {platform}')
x = x.to(platform)
print(x.device,'\t' ,torch.cuda.get_device_name())
```
??? Success "Output"
    ```
    device is cuda
    cuda:0 	 NVIDIA GeForce GTX 1050
    ```
    

## <span style="color:yellow">Indexing</span>


```python
x = torch.rand((6,5))
# x[row,column]
print(x)
```
??? Success "Output"
    ```
    tensor([[0.7309, 0.8946, 0.5354, 0.9422, 0.6763],
            [0.2155, 0.2943, 0.6784, 0.7284, 0.5832],
            [0.0695, 0.9168, 0.0840, 0.4950, 0.1248],
            [0.1639, 0.6005, 0.7625, 0.8407, 0.8425],
            [0.6501, 0.3108, 0.4684, 0.4940, 0.3723],
            [0.2907, 0.1713, 0.9083, 0.2665, 0.2826]])
    
    ```


```python
x[2,4]
```


??? Success "Output"
    ```

    tensor(0.1248)


    ```


```python
x[2] # third row
```


??? Success "Output"

    
    `tensor([0.0695, 0.9168, 0.0840, 0.4950, 0.1248])`



```python
x[:,2] #third column
```

??? Success "Output"

    `tensor([0.5354, 0.6784, 0.0840, 0.7625, 0.4684, 0.9083])`


## <span style="color:yellow">Concatenation</span>


```python
print('Before concatenation')
print(x2_,x2)
print('After concatenation')
print(torch.cat((x2_,x2),dim=0))
```
??? Success "Output"
    ```    
    Before concatenation
    tensor([0.1182, 0.9717, 0.3511, 0.4023], dtype=torch.float16) tensor([0.2275, 0.6938, 0.1953, 0.4771], dtype=torch.float16)
    After concatenation
    tensor([0.1182, 0.9717, 0.3511, 0.4023, 0.2275, 0.6938, 0.1953, 0.4771],
        dtype=torch.float16)
    ```
    


```python
o = torch.ones(3,3)
z = torch.zeros(3,3)
display(o,z)
print('After concatenation')
print(torch.cat((o,z),dim=0)) #  ( for this the
# number of column of the two tensors must be same)
print(torch.cat((o,z),dim=1)) # for this the number of rows must be same
```
??? Success "Output"
    ```
    tensor([[1., 1., 1.],
            [1., 1., 1.],
            [1., 1., 1.]])



    tensor([[0., 0., 0.],
            [0., 0., 0.],
            [0., 0., 0.]])


    After concatenation
    tensor([[1., 1., 1.],
            [1., 1., 1.],
            [1., 1., 1.],
            [0., 0., 0.],
            [0., 0., 0.],
            [0., 0., 0.]])
    tensor([[1., 1., 1., 0., 0., 0.],
            [1., 1., 1., 0., 0., 0.],
            [1., 1., 1., 0., 0., 0.]])
    
    ```
## <span style="color:yellow">Multiply two tensors using matmul</span>


```python
print(torch.matmul(z,o))
```
??? Success "Output"
    ```
    tensor([[0., 0., 0.],
            [0., 0., 0.],
            [0., 0., 0.]])
    ```


```python
x=torch.ones(5,1,4,1)
y=torch.ones(  3,1,1)
print((x+y).size())
```
??? Success "Output"
    `torch.Size([5, 3, 4, 1])`
    

## <span style="color:yellow">Broadcasting in tensors</span>

Well broadcasting is basically a way to get around the problem of adding dissimilar shaped tensors. 
So if you are trying to add any two tensors of different shapes, then pytorch will `broadcast` the tensors in such a way that the addition of those two tensors would be possible. 

So there are a few rules which are to be followed.
- Each tensor must be of at least one dimensional
- lets say `[a,b,c,d]` and `[a,x,y]` are the the shapes of two tensors, then all the corresponding dimensions should be either equal or one of them has to be equal to 1 or none. 

Example :

consider the following shapes 
```python
(5,1,5,7)
# (dim0, dim1, dim2, dim3)
(1,1,7) 
```
These two can be added because it hold the 2nd condition. 

but `(5,1,5,7)` and `(1,1,7,9)` these two can't be added because either of the `dim2` is not `1`. 

and the shape of the resulting tensor is `(max(x.dim0,y.dim0),max(x.dim1,y.dim1), max(x.dim2,y.dim2), max(x.dim3,y.dim3)...)`


```python

x=torch.ones(5,1,5,7)
y=torch.ones(1,1,7)
print(x.shape,y.shape)
print((x+y).shape)
```
??? Success "Output"
    ```
    torch.Size([5, 1, 5, 7]) torch.Size([1, 1, 7])

    torch.Size([5, 1, 5, 7])
    ```
    


```python
x=torch.ones(5,1,4,1)
y=torch.ones(  3,5,1)
print((x+y).size())
```

!!! danger "Output"
    ```
    ---------------------------------------------------------------------------

    RuntimeError                              Traceback (most recent call last)

    Cell In[52], line 3
        1 x=torch.ones(5,1,4,1)
        2 y=torch.ones(  3,5,1)
    ----> 3 print((x+y).size())
    

    RuntimeError: The size of tensor a (4) must match the size of tensor b (5) at non-singleton dimension 2

    ```

```python
x=torch.ones(5,1,4,1)
y=torch.ones(  3,4,1)
print((x+y).size())
```
??? Success "Output"
    torch.Size([5, 3, 4, 1])
    

