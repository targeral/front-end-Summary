# es6 Study
## 变量的解构赋值
### 首先知道什么是解构?
es6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这叫做解构。

具体来说，会是什么样呢？

### 数组的解构赋值
看个栗子:

```js
var a = 1;
var b = 2;
var c = 3;
```

下面和上面的等价，这是es6允许的写法:

```js
var [a, b, c] = [1, 2, 3];
```

上面的代码表示，可以从数组中提取值，按照对应位置，对变量赋值。

从上面可以看出，这类似与"模式匹配"，只要两边的模式相同，左边的变量就会被赋于相应的值。

下面有更多的栗子:

```js
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo //1
bar //2
baz //3

let [ , , third] = ["foo", "bar", "baz"];
third //"baz"

let [x, , y] = [1, 2, 3];
x //1
y //3

let [head, ...tail] = [1, 2, 3, 4];
head //1
tail //[2, 3, 4]

let [x, y, ...z] = ['a'];
x //'a'
y //undefined
z //[]
```

如果解析不成功，变量的赋值为undefined。举几个栗子:

```js
var [foo] = [];
var [bar, foo] = [1];
```

以上两种情况foo的值都为undefined。

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。

```js
let [x, y] = [1, 2, 3];
x //1
y //2

let[a, [b], d] = [1, [2, 3], 4];
a //1
b //2
d //4
```

**报错情况** 如果等号的右边不是数组(或者严格地说，不是可遍历的结构,详细看Iterator),那么就会报错

```js
let [foo] = 1;
let [foo] = false;
let [foo] = NaN;
let [foo] = undefined;
let [foo] = null;
let [foo] = {};
```

报错的原因:因为等号右边的值，要么转为对象以后不具备Iterator接口（前五个表达式），要么本身就不具备Iterator接口（最后一个表达式）。

_解构赋值不仅适用于var命令，也适用于let和const命令。_

_对于Set结构，也可以使用数组的解构赋值。_

```js
let [x, y, z] = new Set(["a", "b", "c"])
x //"a"
```

**事实上，只要某种数据结构具有Iterator接口，都可以采用数组形式的解构赋值。**,例如:

```js
function* fibs() {
    var a = 0;
    var b = 1;
    while(true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

var [first, second, third, fourth, fifth, sixth] = fibs();
sixth //5
```

上面代码中，fibs是一个Generator函数，原生具有Iterator接口。解构赋值会依次从这个接口获取值。

#### 总结
**数组的解构赋值分为完全解构赋值，不完全解构赋值，解构赋值失败，解构赋值报错。只要某种数据结构具有Iterator接口(例如generator函数)，都可以采用数组的解构赋值，否则会报错。只要模式匹配且右边有相应的值，则赋值成功，否则会赋值为undefined。只要左右完全匹配(完全解构赋值)或者部分匹配(不完全解构赋值),就能解构成功.解构赋值不止适用于var命令还适用于let和const命令**

### 数组的默认值
解构赋值允许指定默认值，写法如下:

```js
var [foo = true] = [];
foo //true

[x, y = 'b'] = ['a'] // x = 'a', y = 'b'
[x, y = 'b'] = ['a', undefined] // x = 'a', y = 'b'
```

上面的第二个例子`y = 'b'`是因为es6内部使用严格等于"==="来判断一个位置是否有值。所以第二个例子y等于默认值。如果一个不 严格等于`undefined`的值作为数组的成员，那么赋值的时候，不会采用默认值的。 (_简单的来说，就是必须用undefined或者没有这个值，才能使用默认值_).

_如果默认值为表达式，那么这个表达式必须是惰性求值的，即用到的时候，才会求值。_

```
function f() {
    console.log('aaa');
}
let [x = f()] = [1];
```

_默认值可以引用解构赋值的其他变量，但变量必须已经声明了_，举个栗子:

```js
let [x = 1, y = x] = []; // x =1, y =1
let [x = 1, y = x] = [2]; // x =2, y =2
let [x = 1, y = x] = [1, 2]; // x = 1, y =2
let [x = y, y = 1] = []; //ReferenceError
```

上面最后一个表达式之所以会报错，是因为x用到默认值y时，y还没有声明。

#### 总结
**数组解构赋值可以使用默认值。如果想使用默认值，可以采取的方法是使用undefined或者不赋值。如果默认值是表达式，那么表达式应该是惰性求值。如果默认值引用解构赋值的其他变量，那么这个变量必须已经声明了。**

### 对象的解构赋值
#### 与数组解构赋值的区别
对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。(_重点是数组是有序的集合，对象是无序的集合_)

```js
var {bar, foo} = {foo : "aaa", bar : "bbb"};
foo // "aaa"
bar // "bbb"

var { baz } = { foo : "aaa", bar : "bbb" };
bar // undefined
```

#### 对象解构赋值的原理
如果变量名与属性名不一致，必须写成下面这样。

```js
var { foo : baz } = { foo : "aaa", bar : "bbb" };
baz // "aaa"

let obj = { first : 'hello', last : 'world' };
let { first : f, last : l } = obj;
f //'hello'
l //'world'
```

**这实际上说明，对象的解构赋值是下面形式的简写。**

```js
var { foo : foo, bar : bar } = { foo : "aaa", bar : "bbb"};
```

**也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。也就是像这样`{ 属性 : 变量 }`，可以理解属性是一种模式，用于模式匹配**

_注意，采用这种写法时，变量的声明和赋值是一体的。对于let和const来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。_，举个栗子:

```js
let foo; //已经声明
let {foo} = {foo : 1};//又声明一次，所以会SyntaxError: Duplicate declaration "foo"

let baz;
let {bar: baz} = {bar: 1}; // 在{bar:baz}中，bar是属性，baz是变量，所以SyntaxError: Duplicate declaration "baz"
```

如果没有第二个let命令，上面的代码就不会报错。

```js
let foo;
({foo} = {foo : 1}); //成功

let baz;
({bar : baz} = {bar : 1}); //成功
```

_和数组一样，对象解构也可以用于嵌套结构的对象。_

```js
var obj = {
    p : [
        "Hello",
        {y : "world"}
    ]
};

var { p : [x, { y }] } = ob;
x //"Hello"
y //"world"
```

**注意，这时p是模式，不是变量，因此不会被赋值。**

```js
var node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};

var { loc: { start: { line }} } = node;
line // 1
loc  // error: loc is undefined
start // error: start is undefined
```

上面代码中，只有line是变量，loc和start都是模式，不会被赋值。

#### 总结
**相对于数组匹配模式是次序对象解构赋值匹配模式是属性。记住对象解构赋值的完整写法:`{ model_attribute : paramter } = { model_attribute : value }`,原理为先找同名属性,即模式;然后赋值给变量。真正赋值的是后者。注意,不要重复声明.采用这种写法的时候,赋值和声明是一体的(let和const).数组一样,对象解构也可以用于嵌套结构的对象,但是变量往往是嵌套最后一层的那个值,其他的都是模式。**

### 对象的默认值

```js
var {x = 3} = {};
x //3

var { x, y = 5 } = { x : 1 };
x //1
y //5

var { message : msg = "something went wrong" } = {};
msg //"something went wrong"
```

- **默认值生效的条件是，对象的属性值严格等于undefined。**
- **如果解构失败，变量的值等于undefined。**
- **如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。**

```js
var {foo : {bar}} = {baz : 'baz'}//报错
```

上面代码中，等号左边对象的foo属性，对应一个子对象。该子对象的bar属性，解构时会报错。原因很简单，因为foo这时等于undefined，再取子属性就会报错，请看下面的代码。

```js
var _tmp = {baz: 'baz'};
_tmp.foo.bar // 报错
```

这样就好理解了。
- 如果要将一个已经声明的变量用于解构赋值，必须非常小心。

```js
// 错误的写法

var x;
{x} = {x: 1};
// SyntaxError: syntax error
```

上面代码的写法会报错，因为JavaScript引擎会将{x}理解成一个代码块，从而发生语法错误。只有不将大括号写在行首，避免JavaScript将其解释为代码块，才能解决这个问题。

```js
// 正确的写法
({x} = {x: 1});
```

- 解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。

```js
({} = [true, false]);
({} = 'abc');
({} = []);
```

上面的表达式虽然毫无意义，但是语法是合法的，可以执行。
- 对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。

```js
let { log, sin, cos } = Math;
```

上面代码将Math对象的对数、正弦、余弦三个方法，赋值到对应的变量上，使用起来就会方便很多。

#### 总结
**默认值生效的条件是，对象的属性值严格等于undefined。如果解构失败，变量的值等于undefined。如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错。如果要将一个已经声明的变量用于解构赋值，必须非常小心。解构赋值允许，等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。对象的解构赋值，可以很方便地将现有对象的方法，赋值到某个变量。**

### 通过转换方式的解构赋值
#### 字符串的解构赋值
_字符串也可以解构赋值。这是因为此时，字符串被转换成了一个类似数组的对象。_

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

_类似数组的对象都有一个length属性，因此还可以对这个属性解构赋值。_

```js
let {length : len} = 'hello';
len //5
```

#### 数值和布尔值的解构赋值
_解构赋值时，如果等号右边是数值和布尔值，则会先转为对象_

```js
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true
```

上面代码中，数值和布尔值的包装对象都有toString属性，因此变量s都能取到值。

**解构赋值的规则是，只要等号右边的值不是对象，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。**

#### 函数参数的解构赋值

```js
function add([x, y]) {
    return x + y;
}
add([1, 2]) //3

[[1, 2], [3, 4]].map(([a, b]) => a + b)
// [ 3, 7 ]
```

上面代码中，函数add的参数表面上是一个数组，但在传入参数的那一刻，数组参数就被解构成变量x和y。对于函数内部的代码来说，它们能感受到的参数就是x和y。

_函数参数的解构也可以使用默认值。_

```js
function move({x = 0, y = 0} = {}) {
    return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}); // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]
```

其实这里可以去掉"{}",变为`{x=0, y=0}`

### 括号问题
解构赋值虽然很方便，但是解析起来并不容易。对于编译器来说，一个式子到底是模式，还是表达式，没有办法从一开始就知道，必须解析到（或解析不到）等号才能知道。

由此带来的问题是，如果模式中出现圆括号怎么处理。**ES6的规则是，只要有可能导致解构的歧义，就不得使用圆括号。**

但是，这条规则实际上不那么容易辨别，处理起来相当麻烦。**因此，建议只要有可能，就不要在模式中放置圆括号。**

#### 不能使用括号的情况
- 变量声明语句中，不能带有圆括号

```js
// 全部报错
var [(a)] = [1];

var {x: (c)} = {};
var ({x: c}) = {};
var {(x: c)} = {};
var {(x): c} = {};}

var { o: ({ p: p }) } = { o: { p: 2 } };
```

- 函数参数中，模式不能带有圆括号。

```js
// 报错
function f([(z)]) { return z; }
```

- 赋值语句中，不能将整个模式，或嵌套模式中的一层，放在圆括号之中。

```js
// 全部报错
({ p: a }) = { p: 42 };
([a]) = [5];
```

#### 可使用圆括号的情况
可以使用圆括号的情况只有一种：赋值语句的非模式部分，可以使用圆括号。

```js
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确
```

### 用途
#### 交换变量的值

```js
[x, y] = [y, x];
```

#### 从函数返回多个值

```js
// 返回一个数组

function example() {
  return [1, 2, 3];
}
var [a, b, c] = example();

// 返回一个对象

function example() {
  return {
    foo: 1,
    bar: 2
  };
}
var { foo, bar } = example();
```

#### 函数参数的定义

```js
// 参数是一组有次序的值
function f([x, y, z]) { ... }
f([1, 2, 3])

// 参数是一组无次序的值
function f({x, y, z}) { ... }
f({z: 3, y: 2, x: 1})
```

#### 提取JSON数据

```js
var jsonData = {
    id : 42,
    status : "ok",
    data : [867, 5309]
}
let { id, status, data : number } = jsonData;
console.log(id, status, number)
// 42, "OK", [867, 5309]
```

#### 函数参数的默认值

```js
jQuery.ajax = function (url, {
  async = true,
  beforeSend = function () {},
  cache = true,
  complete = function () {},
  crossDomain = false,
  global = true,
  // ... more config
}) {
  // ... do stuff
};
```

指定参数的默认值，就避免了在函数体内部再写var foo = config.foo || 'default foo';这样的语句。

#### 遍历Map结构
任何部署了Iterator接口的对象，都可以用for...of循环遍历。Map结构原生支持Iterator接口，配合变量的解构赋值，获取键名和键值就非常方便。

```js
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');
for(let [key, value] of map) {
    console.log(key + " is " + value);
}
// first is hello
// second is world
```

如果只想获取键名，或者只想获取键值，可以写成下面这样。

```js
// 获取键名
for (let [key] of map) {
  // ...
}

// 获取键值
for (let [,value] of map) {
  // ...
}
```

#### 输入模块的指定方法
加载模块时，往往需要指定输入那些方法。解构赋值使得输入语句非常清晰。

```js
const { SourceMapConsumer, SourceNode } = require("source-map");
```
