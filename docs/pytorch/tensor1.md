
## <span style="color:yellow">.vstack() & .hstack()</span>

```python
a = torch.randn((30,2))
b = torch.randn((30,2))
c = torch.randn((30,2))
print(a.shape,b.shape,c.shape)
X = torch.vstack((a, b, c))
y = torch.hstack((a,b,c))
print('Shape after vstack()',X.shape)#  ( for this the
# number of column of the two tensors must be same)
print('Shape after hstack() ',y.shape)# for this the number of rows must be same
```

!!! success "output" 
    `torch.Size([30, 2]) torch.Size([30, 2]) torch.Size([30, 2])`

    `Shape after vstack() torch.Size([90, 2])`
    
    `Shape after hstack()  torch.Size([30, 6])`