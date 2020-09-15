![](crudelang.png)

## TODO NEXT:

* [] Fix parsing of scopes.
* [] Fix parsing of semicolon.
* [] Fix the last part of if-statement.

The return-statement of the failing test ends up in the
'consequent'-scope. Issues with body: you can't write,
```
x = 3;
if(x > 2) {
  return 1;
}
return 0;
```
