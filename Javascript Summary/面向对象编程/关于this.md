# 固定this
JavaScript提供了call、apply、bind这三个方法，来切换/固定this的指向。

## call方法
函数的call方法，可以指定该函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数。

用法:

```JavaScript
func.call(thisValue, arg1, arg2, ...)
```

**call方法是改变this指向,并调用，执行**

## apply方法
apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下。

```JavaScript
func.apply(thisValue, [arg1, arg2, ...])
```

## bind方法
bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数.

```javascript
func.bind(thisValue, arg1, arg2,...)
```

bind比call方法和apply方法更进一步的是，除了绑定this以外，还可以绑定原函数的参数

如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向全局对象（在浏览器中为window）。

### bind方法注意
1. 每一次返回一个新函数

bind方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样。

```javascript
element.addEventListener('click', o.m.bind(o));
```

上面代码表示，click事件绑定bind方法生成的一个匿名函数。这样会导致无法取消绑定，所以，下面的代码是无效的

```javascript
element.removeEventListener('click', o.m.bind(o));
```

正确的方法是写成下面这样：

```javascript
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);
```

- 自定义bind

  ```javascript
  if( !( 'bind' in Function.prototype ) ) {
  Function.prototype.bind = function() {
   var fn = this;
   var context = arguments[0];
   var args = Array.protoype.slice.call(arguments, 1);

   return function() {
     return fn.apply(context, args);
   };
  }
  }
  ```
