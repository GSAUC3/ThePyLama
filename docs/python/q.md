# Decorators

In python everything is an object. Even functions, and they can be passed as parameters.

## Decorators without *args, **kwargs

```python
def outfun(somefun):
    def infun():
        print('inside infun')
        return somefun()
    return infun

def arbitraryFun():
    print('this is an arbitrary function')

func = outfun(arbitraryFun)
func()
```
??? Success "output"
    inside infun

    this is an arbitrary function

!!! Note
    The above and the below codes does the same job, the only different is in syntax. In the code below there is an `@` symbol along with the function name. That is a decorator. 

```python
def outfun(somefun):
    def infun():
        print('inside infun')
        return somefun()
    return infun

@outfun
def arbitraryFun():
    print('this is an arbitrary function')

# func = outfun(arbitraryFun)
# func()
arbitraryFun()
'''
So basically the commented lines and the last line are equivalent. 
'''
```
??? Success "output"
    inside infun

    this is an arbitrary function


```python

def call_as_variable(fun):
    return fun()

@call_as_variable
def function():
    s = 'you make me un poco loco'
    return s 

print(function)
```
??? success "output"
    'you make me un poco loco'

## Decorators with arguments

```python
def outermost(arg):
    def middle(func):
        def inner():
            func()
            print(arg)
            return  
        return inner 
    return middle

@outermost('thing')
def function():
    print('some')

function()

```
??? success "output"
    some
    thing


## Class decorators 

```python
class deco:
    def __init__(self,func) -> None:
        self.func = func 
    
    def __call__(self,*a,**kw):
        return self.func(*a,**kw) + ' with other string'

@deco
def function():
    return 'some string' 

function()
```
??? success "output"
    'some string with other string'

