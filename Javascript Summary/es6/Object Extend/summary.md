# 对象的扩展
- 属性的简洁表达法
- 属性名表达式
- 方法的name属性
- Object.is()
- Object.assign()
- 属性的可枚举性
- 属性的遍历
- `__proto__`属性,Object.setPrototypeOf(),Object.getPrototypeOf()
- Object.values(), Object.entries()
- 对象的扩展运算符
- Object.getOwnPropertyDescriptions()

## 属性的简洁表达法
ES6允许直接写入变量和函数，作为对象的属性和方法。这样的书写更加简洁。

```js
var foo = 'bar';
var baz = {foo};
baz //{foo:"bar"}

// 等同于
var baz = {foo: foo};
```

上面代码表明，ES6允许在对象之中，只写属性名，不写属性值。这时，属性值等于属性名所代表的变量。下面是另一个例子。

```js
function f(x, y) {
  return {x, y};
}

function f(x, y) {
  return {x: x, y: y};
}

f(1, 2) // Object {x: 1, y: 2}
```

除了属性简写,方法也可以简写。

```js
var o = {
  method() {
    return "Hello";
  }
};

var o = {
  method: function() {
    return "Hello!";
  }
};
```

下面是一个实际的例子。

```js
var birth = '2000/01/01';
var Person = {
  name : '张三',

  //等同于birth: birth
  birth,

   // 等同于hello: function ()...
   hello() {
     console.log('我的名字是', this.name);
   }
}
```

这种写法用于函数的返回值，将会非常方便。

```js
function getPoint() {
  var x = 1;
  var y = 10;
  return {x, y};
}

getPoint()
// {x:1, y:10}
```

CommonJS模块输出变量，就非常合适使用简洁写法。

```js
var ms = {};

function getItem(key) {
  return key in ms ? ms[key] : null;
}

function setItem(key, value) {
  ms[key] = value;
}

function clear() {
  ms = {};
}

module.exports = {getItem, setItem, clear};

// 等同于
module.exports = {
  getItem: getItem,
  setItem: setItem,
  clear: clear
};
```

属性的赋值器（setter）和取值器（getter），事实上也是采用这种写法。

```js
var cart = {
  _wheels : 4,

  get wheels() {
    return this._wheels;
  },

  set wheels(value) {
    if(value < this._wheels) {
      throw new Error('数值太小了！');
    }
    this._wheels = value;
  }
}
```

**注意，简洁写法的属性名总是字符串，这会导致一些看上去比较奇怪的结果**

```js
var obj = {
  class() {}
}

// 等同于

var obj = {
  'class': function() {}
};
```

上面代码中，class是字符串，所以不会因为它属于关键字，而导致语法解析报错.

如果某个方法的值是一个Generator函数，前面需要加上星号。

```js
var obj = {
  * m(){
    yield 'hello world';
  }
};
```

## 属性名表达式
JavaScript语言定义对象的属性，有两种方法。

```js
// 方法一
obj.foo = true;

// 方法二
obj['a' + 'bc'] = 123;
```

上面代码的方法一是直接用标识符作为属性名，方法二是用表达式作为属性名，这时要将表达式放在方括号之内。

但是，如果使用字面量方式定义对象（使用大括号），在ES5中只能使用方法一（标识符）定义属性。

```js
var obj = {
  foo: true,
  abc: 123
};
```

**ES6允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内。**

```js
let propKey = 'foo'

let obj = {
  [propKey] : true,
  ['a' + 'bc'] : 123
}
```

下面是另一个例子。

```js
var lastWord = 'last word';

var a = {
  'first word' : 'hello',
  [lastWord] : 'world'
}

a['first word'] // "hello"
a[lastWord] // "world"
a['last word'] // "world"
```

表达式还可以用于定义方法名。

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi';
  }
};

obj.hello()// hi
```

注意，属性名表达式与简洁表示法，不能同时使用，会报错。

```js
// 报错
var foo = 'bar';
var bar = 'abc';
var baz = {[foo]};

//正确
var foo = 'bar';
var baz = {[foo] : 'abc'};
```

## 方法的name属性
函数的name属性，返回函数名。对象方法也是函数，因此也有name属性。

```js
var person = {
  sayName() {
    console.log(this.name);
  },

  get firstName() {
    return 'Nicholas';
  }
}

person.sayName.name   // "sayName"
person.firstName.name // "get firstName"
```

上面代码中，方法的name属性返回函数名（即方法名）。如果使用了取值函数，则会在方法名前加上get。如果是存值函数，方法名的前面会加上set。

有两种特殊情况：_bind方法创造的函数，name属性返回"bound"加上原函数的名字；Function构造函数创造的函数，name属性返回"anonymous"。_

```js
(new Function()).name // "anonymous"

var doSomething = function() {
  //...
}
doSomething.bind().name // "bound doSomething"
```

如果对象的方法是一个Symbol值，那么name属性返回的是这个Symbol值的描述。

```js
const key1 = Symbol('description');
const key2 = Symbol();

let obj = {
  [key1](){},
  [key2](){},
};

obj[key1].name // "[description]"
obj[key2].name  // ""
```

上面代码中，key1对应的Symbol值有描述，key2没有。

## Object.is()
ES5比较两个值是否相等，只有两个运算符：相等运算符（==）和严格相等运算符（===）。它们都有缺点，前者会自动转换数据类型，**后者的NaN不等于自身，以及+0等于-0**。JavaScript缺乏一种运算，在所有环境中，只要两个值是一样的，它们就应该相等。

ES6提出"Same-value equality"（同值相等）算法，用来解决这个问题。Object.is就是部署这个算法的新方法。它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。

```js
Object.is('foo', 'foo');
// true
Object.is({}, {})
// false
```

**不同之处只有两个：一是+0不等于-0，二是NaN等于自身。**

```js
+0 === -0 //true
NaN === NaN // false

Object.is(+0, -0) // false
Object.is(NaN, NaN) // true
```

ES5可以通过下面的代码，部署Object.is。

```js
Object.defineProperty(Object, 'is', {
  value : function(x, y) {
    if(x === y) {
      // 针对+0 不等于 -0的情况
      return x !== 0 || 1 / x === 1 / y;
    }

    return x !== x && y !== y;
  },

  configurable: true,
  enumerable: false,
  writable: true
})
```

## Object.assign()
Object.assign方法用于对象的合并，将源对象（source）的所有 _可枚举属性_，复制到目标对象（target）。

```js
var target = {a : 1};

var source1 = {b : 2};
var source2 = {c : 3};

Object.assign(target, source1, source2);

target // {a:1, b:2, c:3}
```

`Object.assign`方法的第一个参数是对象，后面的参数都是源对象。

**注意，如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性。**

```js
var target = {a : 1, b : 1};

var source1 = {b : 2, c : 2};
var source2 = {c : 3};

Object.assign(target, source1, source2);
target // {a:1, b:2, c:3}
```

_如果只有一个参数，Object.assign会直接返回该参数。_

```js
var obj = {a : 1};
Object.assign(obj) === obj; //true
```

_如果该参数不是对象，则会先转成对象，然后返回。_

```js
typeof Object.assign(2) // "object"
```

**由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。**

```js
Object.assign(undefined) //报错
Object.assign(null) //报错
```

如果非对象参数出现在源对象的位置（即非首参数），那么处理规则有所不同。_首先，这些参数都会转成对象，如果无法转成对象，就会跳过。_ **这意味着，如果undefined和null不在首参数，就不会报错。**

```js
let obj = {a : 1};
Object.assign(obj, undefined) === obj; //true
Object.assign(obj, null) === obj;//true
```

其他类型的值（即数值、字符串和布尔值）不在首参数，也不会报错。_但是，除了字符串会以数组形式，拷贝入目标对象，其他值都不会产生效果。_

```js
var v1 = 'abc';
var v2 = true;
var v3 = 10;

var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }
```

面代码中，v1、v2、v3分别是字符串、布尔值和数值，结果只有字符串合入目标对象（以字符数组的形式），数值和布尔值都会被忽略。**这是因为只有字符串的包装对象，会产生可枚举属性。**

```js
Object(true) // {[[PrimitiveValue]]: true}
Object(10)  //  {[[PrimitiveValue]]: 10}
Object('abc') // {0: "a", 1: "b", 2: "c", length: 3, [[PrimitiveValue]]: "abc"}
```

上面代码中，布尔值、数值、字符串分别转成对应的包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性是不会被Object.assign拷贝的。只有字符串的包装对象，会产生可枚举的实义属性，那些属性则会被拷贝。

Object.assign拷贝的属性也是有限的，只拷贝源对象的自身属性(不拷贝继承属性)，也不拷贝不可枚举的属性，即`enumerable : false`。

```js
Object.assign({b : 'c'},
  Object.defineProperty({}, 'invisible', {
    enumerable : false,
    value : 'hello'
  })
)
// { b: 'c' }
```

属性名为Symbol值的属性，也会被Object.assign拷贝。

```js
Object.assign({a : 'b'}, {[Symbol('c')] : 'd'})
// { a: 'b', Symbol(c): 'd' }
```

### 注意点
Object.assign是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是一个对象，那么目标对象拷贝得到的是这个对象的 _引用_。

对于这种嵌套的对象，一旦遇到同名属性，Object.assign的处理方法是替换，而不是添加。

```js
var target = { a : { b : 'c', d : 'e'}}
var source = { a : { b : 'hello' }}
Object.assign(target, source);

// { a: { b: 'hello' } }
```

**注意，Object.assign可以用来处理数组，但是会把数组视为对象。**

```js
Object.assign([1, 2, 3], [4, 5]);
//[4, 5, 3]
```

上面代码中，Object.assign把数组视为属性为0,1,2的对象，因此目标数组的0属性1被源数组的0号属性值4覆盖了。

### 常见用途
1. 为对象添加属性

```js
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}
```

上面方法通过Object.assign方法，将x属性和y属性添加到Point类的对象实例。
1. 为对象添加方法

```js
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {
    ...
  },
  anotherMethod() {
    ...
  }
});

// 等同于下面的写法
SomeClass.prototype.someMethod = function (arg1, arg2) {
  ···
};
SomeClass.prototype.anotherMethod = function () {
  ···
};
```

上面代码使用了对象属性的简洁表示法，直接将两个函数放在大括号中，再使用assign方法添加到SomeClass.prototype之中。
1. 克隆对象
2. function clone(origin) {
return Object.assign({}, origin);
}

上面代码将原始对象拷贝到一个空对象，就得到了原始对象的克隆。不过，采用这种方法克隆，只能克隆原始对象自身的值，不能克隆它继承的值。如果想要保持继承链，可以采用下面的代码。

```js
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assigin(Object.create(originProto), origin);
}
```

1. 合并多个对象
2. 将多个对象合并到某个对象。

```js
const merge = (target, ...sources) => Object.assign(target, ...sources);
```

如果希望合并后返回一个新对象，可以改写上面函数，对一个空对象合并。

```js
const merget = (...sources) => Object.assign({}, ...sources);
```

1. 为属性指定默认值

```js
const DEFAULTS = {
  logLevel : 0,
  outputFormat : 'html'
};

function processContent(options) {
  let options = Object.assign({}, DEFAULTS, options);
}
```

上面代码中，DEFAULTS对象是默认值，options对象是用户提供的参数。Object.assign方法将DEFAULTS和options合并成一个新对象，如果两者有同名属性，则option的属性值会覆盖DEFAULTS的属性值。

**注意，由于存在深拷贝的问题，DEFAULTS对象和options对象的所有属性的值，都只能是简单类型，而不能指向另一个对象。否则，将导致DEFAULTS对象的该属性不起作用。**

## 属性的可枚举性
对象的每个属性都有一个描述对象（Descriptor），用来控制该属性的行为。**Object.getOwnPropertyDescriptor** 方法可以获取该属性的描述对象。

```js
let obj = { foo : 123};
Object.getOwnPropertyDescriptor(obj, 'foo');
//   { value: 123,
 //     writable: true,
 //     enumerable: true,
 //     configurable: true }
```

描述对象的enumerable属性，称为"可枚举性"，如果该属性为false，就表示某些操作会忽略当前属性。
- for...in循环:只遍历对象自身的和继承的可枚举属性
- Object.keys() : 返回对象自身的所有可枚举的属性的键名
- JSON.stringify() : 只串行化对象自身的可枚举的属性

ES6新增了两个操作，会忽略enumerable为false的属性。
- Object.assign() : 只拷贝对象自身的可枚举的属性
- Reflect.enumerate() : 返回所有for...in循环会遍历的属性。

这五个操作之中，只有for...in和Reflect.enumerate()会返回继承的属性。实际上，引入enumerable的最初目的，就是让某些属性可以规避掉for...in操作。比如，对象原型的toString方法，以及数组的length属性，就通过这种手段，不会被for...in遍历到。

```js
Object.getOwnPropertyDescriptor(Object.prototype, 'toString').enumerable //false

Object.getOwnPropertyDescriptor([], 'length').enumerable //false
```
