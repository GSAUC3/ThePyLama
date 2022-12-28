
## <span style="color:yellow">Autograd</span>

```python

import torch 

x = torch.tensor([1,5,2],dtype=torch.float32,requires_grad=True)
print(x)
# tensor([1., 5., 2.], requires_grad=True)
```
Consider the following function :
$ y = x^{2} + 2x +1 $

```python
a =  x**2 
b = a+ 2*x 
y = (b +1).sum() 
print(y)
y.backward()
print(x.grad)
```

??? success "output"
    tensor(49., grad_fn=<SumBackward0>)
    
    tensor([ 4., 12.,  6.])
    


