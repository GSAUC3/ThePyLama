


```python
from matplotlib.animation import FuncAnimation as animate
import torch 
from matplotlib import pyplot as plt 


fig, ax = plt.subplots()
f = lambda x : (x-5)**2 
x1 = torch.linspace(-10,20,100)
y1 = f(x1)
w = -5.0
fdashx = lambda x: 2*(x-5)

tangent = lambda x,w : fdashx(w) * (x-w) + f(w)
a = -8.5

lr = 0.01
def sgd(i):
    global w,a
    ydash = fdashx(w)
    w = w - lr*ydash
    a = a - lr*ydash
    y = f(w)
    xs = torch.tensor([a,a+5])
    ax.clear()
    ax.plot(x1,y1)
    ax.plot(xs.numpy(),tangent(xs,w).numpy())
    ax.scatter(w,y,c='y')

plots = animate(fig, sgd, frames=500, interval=10, repeat=False)
plt.show()
```

??? success "output" 
    ![Alt text](../gifs/grad.gif) 

```python

fig, ax = plt.subplots()
x1 = torch.linspace(-10,20,100)
y1 = (x1-5)**2

learning_rate = 0.01

x = torch.tensor([-5.0], requires_grad=True)
a=-8.5
optimizer =  torch.optim.SGD([x],lr=learning_rate)
def gradsgd(_):
    optimizer.zero_grad()
    global x,a
    y = lambda x: (x - 5) ** 2
    y(x).backward()
    optimizer.step()
    # grad = x.grad
    tangent_y = lambda a:x.grad*(a-x)+ y(x)

    # with torch.no_grad():
    #     x = x - learning_rate * x.grad
    #     a-= learning_rate*grad.item()
    # x.requires_grad = True
    
    xx = torch.tensor([-10,20])
    ax.clear()
    ax.plot(x1,y1)
    ax.plot(xx,tangent_y(xx).detach().numpy()) 
    ax.scatter(x.detach().numpy(),((x-5)**2).detach().numpy(),c='r')


plots1 = animate(fig, gradsgd, frames=500, interval=10, repeat=False)
plt.show()

```

```python
fig, ax = plt.subplots()
x1 = torch.linspace(-10,20,100)
y1 = (x1-5)**2

learning_rate = 0.01

x = torch.tensor([-5.0], requires_grad=True)

def gradsgd(_):
    global x
    y = (x - 4) ** 2
    y.backward()
    with torch.no_grad():
        x = x - learning_rate * x.grad
        
    x.requires_grad = True
    ax.clear()
    ax.plot(x1,y1)
    ax.scatter(x.detach().numpy(),((x-5)**2).detach().numpy(),c='r')


plots1 = animate(fig, gradsgd, frames=500, interval=10, repeat=False)
plt.show()
```

## Problem with gradient descent 

1. It diverges if $lr > 1 $.

2. It may stuck to a local minimum, instead of global minimum. 
    
3. It is difficult to interpret whether it is increasing or decreasing near a saddle point. It does overcome it but it might take a long time.

4. For small gradient the learning becomes slow.

5. The hyper parameter in this case, the learning rate has to be determined beforehand, which is often difficult to choose if dimension increases. 


##  How to improve GD ? 

1. Add a momentum term, in other words, Nesterov's Accelerated Gradient descent.

2. AdaGrad

3. Higher order derivate, like hessian : Newton's method, Quasi Newton's methods like BFGS

4. Stochastic Gradient Descent. 
