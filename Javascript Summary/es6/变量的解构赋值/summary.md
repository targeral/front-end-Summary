# 解构赋值总结

## 1. 解构赋值

解构赋值是一种模式匹配，等号两侧的值为对象，如果等号右侧的值为非对象，则要转换为对象。一般两侧对象中键为模式，值为变量或者是值。若键相同，即为匹配，则右侧的值做赋值操作。如下示意式:
```
VarObj==> {VarModel1 : var} = {valueModel2 : value} <==ValueObj;
```

## 2. 等号的左侧

等号左侧一般来说是一个对象。详细来讲，则可能是一个数组，或者一个普通对象。

### 数组

如果左侧是一个数组，那么它的模式就是长这样的: 

```js
[1:value1, 2:value2,3:value3,....]
```

也就是说数组的模式为数组的下标。一般来说数组的解构赋值，等号右侧为数组。等号右侧不为数组的，将会报错。

```js
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

因为他们没有像数组的“下标”模式。

**所以说数组的模式是固定的，就是他们的下标。如果等号右边的值转换为对象以后具有`Iterator`接口，或者本身具备`Iterator`接口，则可以进行赋值，否则会报错**

### 对象

如果左侧是一个普通对象，那么它的模式就有很多种。对象的属性名有多少种，模式就有多少种。

```js
var {key1: var1, key2: var2} = {key1: value1, key2: value2};
var {bar: bar, baz : baz} = {bar: 1, baz: 2};
```

如果等号左侧对象的属性和变量同名，则可以简写为：

```js
var {var1, var2} = {var2: value2, var1: value1}
var {bar, baz} = {bar: 1, baz: 2};
```

如果变量名与属性名不一致，必须写成这样：

```js
var {foo: baz} = {foo: "aaa", bar: "bbb"};
/*baz === 'aaa'*/
```

如果左侧对象中的属性在右侧对象中找不到，即模式不匹配，这个值最后等于`undefined`.

```js
var {baz} = {foo: 'aaa', bar: "bbb"}

/*相当于*/

var {baz} = {foo: 'aaa', bar: 'bbb', baz: undefined};
```

也就是说:

**对象的解构赋值的内部机制是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者(冒号右侧)，而不是前者。**

*对于嵌套结构的对象,只要记住每一层的左侧(前者）为模式，只有最内层的右侧为变量。*

## 3. 等号的右侧
等号的右侧的值如果是对象，就进入模式匹配；如果不是对象，则要进行转换对象的操作。所以右侧的值除了对象(数组，普通对象)以外，还有字符串，数值，布尔值。

### 字符串
字符串的解构赋值，*此时将字符串转换为了一个类似数组的对象*。所以,

```js
const {a, b, c, d, e} = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```


类似数组的对象还有一个`length`属性，因此可以用它来作为模式进行解构赋值。

```js
let {length: len} = 'hello';
len // 5
```

### 数值和布尔值

数值和布尔值解构赋值的时候，会将数值和布尔值转为对象(包装对象`Number`和`Boolean`)。所以包装对象的一些属性是可以用来进行模式匹配的。

```js
let {toString: s} = 123;
s === Number.prototype.toString //true
let {toString: p} = true;
s === Boolean.prototype.toString //true
```

**由于`undefined`和`null`无法装换为对象，所以对他们进行解构赋值都会报错。**



## 4. 默认值

解构赋值允许指定默认值。

### 数组的默认值

```javascript
var [foo = true] = [];
foo //true

[x, y = 'b'] = ['a'] // x = 'a', y = 'b'
[x, y = 'b'] = ['a', undefined] // x = 'a', y = 'b'
```

所以默认值的生效条件是:  **一个数组成员严格等于`undefined`。**

因为是严格等于`undefined`，所以如果一个数组成员是`null`，默认值是不会生效的。

```javascript
var [x = 1] = [null];
x //null
```

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有用到的时候才会求值。

```javascript
function f() {
  console.log('aaa');
}
let [x = f()] = [1];
```

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

### 对象的默认值

```javascript
var {x = 3} = {};
var {message : msg = "Something went wrong"} = {};
msg// "Something went wrong"
```

默认值生效的条件是，对象的属性值严格等于`undefined`

```javascript
var {x = 3} = {x : undefined} 
x //3
var {x = 3} = {x : null}
x //null
```

## 5. 一些要注意的

1. 如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。

   ```javascript
   var {foo: {bar}} = {baz: 'baz'}	
   ```

2. 如果将一个已经声明的变量用于解构赋值，必须非常小心。如果如下代码一样，会报错:

   ```javascript
   var x;
   {x} = {x:1};
   ```

   上面代码报错的原因是*JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。* **只有不将大括号写在首行，避免JavaScript将其解释为代码块，才能解决这个问题**

   ```javascript
   var x;
   ({x} = {x:1});
   ```

## 6. 函数参数的解构赋值

函数参数的解构赋值，其实就是通过函数的形式将参数当做 *右侧* 部分，内部传进的值为 *左侧* 部分。

```javascript
function add([x, y]) {
  return x + y;
}
add([1, 2]) //3
function move([x = 0, y = 0] = {}) {
  return [x, y];
}
```

## 7. 圆括号问题

### 不能使用圆括号的情况

1. *变量声明语句中*(注意前提)，模式不能带有圆括号。

   ```javascript
   var [(a)] = [1];
   var {x : (c)} = {};
   var {o: ({p:p})} = {o: {p:2}}
   ```

2. 函数参数中，模式不能带有圆括号。

   ```javascript
   function f([(z)]) {return z;}
   ```

3. 不能将整个模式或嵌套模式中的一层放在圆括号中。

   ```javascript
   ({p:a}) = {p:42};
   ([a]) = [5];
   ```

   ​

### 可以使用圆括号的情况

可以使用的情况只有一种:**赋值语句(注意前提)的非模式部分可以使用圆括号**。

```javascript
[(b)] = [3];
({p:(d)} = {})
[(parseInt.prop)] = [3]
```



## 8. 用途

### 交换变量的值

```javascript
[x, y] = [y, x]
```

### 从函数返回多个值

```javascript
function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();
function ex() {
  return {
    foo: 1,
    bar: 2,
  };
}
var {foo, bar} = ex();
```

### 函数参数的定义

```javascript
//参数是一组有序的值
function f([x, y, z]) {...}
f([1, 2, 3]);
//参数是一组无序的值
function f({x, y, z}) {...}
f({z: 3, y: 2, x: 1})
```

### 提取JSON数据

```javascript
var jsonData = {
  id: 42,
  status: "OK",
  data: [868, 5309]
}
let {id, status, data: number} = jsonData;
console.log(id, status, number);
```

### 函数参数的默认值

```javascript
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function() {},
  cache = true,
  complete = function() {},
  crossDomain = false,
  global = true,
}) {
  ...
}
```

### 遍历Map结构

```javascript
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for(let [key, value] of map) {
  console.log(key + " is " + value);
}
for(let [key] of map) {}//单独获取key
for(let [,value] of map) {} //单独获取value
```

### 输入模块的指定方法

加载模块时，往往需要指定输入哪些方法。解构赋值使得输入语句非常清晰。

```javascript
const { SourceMapConsumer, SourceNode } = require('source-map');
```

