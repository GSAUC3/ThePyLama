
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
    


***
??? hidden
    ```python
    import torch 
    from torch import optim 
    from matplotlib import pyplot as plt 

    def derivative_viz(plot:bool=False):
        def middle(fun):
            def inner(*a,**k):
                start = k.get('start',-13)
                end = k.get('end',17)
                spacing = k.get('steps',100)
                if plot:
                    x = torch.linspace(start,end,spacing,requires_grad=True)
                    print(f'Graph of ({fun.__name__})')
                    y = fun(x)
                    plt.plot(x.detach().numpy(),y.detach().numpy())
                    plt.show()
                    print(f'Graph of d/dx({fun.__name__})')
                    y = y.sum()
                    y.backward()
                    plt.plot(x.detach().numpy(),x.grad.detach().numpy())
                return fun(*a)
            return inner 
        return middle

    @derivative_viz()
    def sin(x):
        return torch.sin(x)

    xa = torch.tensor([45])
    print(sin(xa,start=0,stop=20))
    ```
