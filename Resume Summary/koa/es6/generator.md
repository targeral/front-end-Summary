# Generator函数
## 基本概念
从语法上，首先可以把它理解为成一个状态机，封装了多个内部状态。

执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成器。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内使用 _yield_ 语句,定义不同的内部状态(yield语句在英语里的意思就是"产出")。

```javascript
function* helloWorldGenerator() {
  yield "hello";
  yield "world";
  return 'ending';
}

var hw = helloWorldGenerator();
```

上面代码定义了一个Generator函数 _helloWorldGenerator_ ，它内部有两个yield语句"hello"和"world"，即该函数有三个状态:hello, world and return语句。

调用Generator函数后，该函数并不执行，返回的是一个指向内部状态的指针对象。也就是遍历器对象(Iterator Object).

然后，必须调用遍历器对象的next()方法，使得指针移向下一个状态。也就是说，每次调用next()方法，内部指针就会从函数头部或上次停下来的地方开始执行，直到遇到下一个yield语句(或 return 语句)为止。换言之，Generator函数是分段执行的，yield语句是暂停执行的标记，而next方法可以恢复执行。

```javascript
hw.next()
// { value: 'hello', done: false }

hw.next()
// { value: 'world', done: false }

hw.next()
// { value: 'ending', done: true }

hw.next()
// { value: undefined, done: true }
```

总结:调用Generator函数，返回一个遍历器对象，代表Generator函数的内部指针。以后，每次调用遍历器对象的next方法，就会返回一个有着value和done两个属性值的对象。value属性表示当前的内部状态的值，是yield语句后面那个表达式的值；done属性是一个布尔值，表示是否遍历结束。

## yield语句
由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。

遍历器对象的next方法的运行逻辑如下。
1. 遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。
2. 下一次调用next方法时，再继续往下执行，知道遇到下一个yield语句。
3. 如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。
4. 如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的"惰性求值"（Lazy Evaluation）的语法功能。

### yield语句与return语句的相似之处
1. 都返回紧跟着语句后面的那个表达式的值。

### yield语句与return语句的区别
1. 位置记忆的功能。每次遇到yield，函数会暂停执行，下次再从这个位置继续执行，而return没有位置记忆功能。
2. 一个函数只能执行一次return语句，但是可以执行多次yield语句。
3. 正常函数只能返回一个值，因为只能执行一次return；Generator函数可以返回一系列的值，因为可以有任意多个yield。

从另一个角度看，也可以说Generator生成了一系列的值，这也就是它的名称的来历（在英语中，generator这个词是"生成器"的意思）。

Generator函数可以不用yield语句，这时就变成了一个单纯的暂缓执行函数。

```javascript
function* f() {
  console.log('执行了！')
}

var generator = f();

setTimeout(function () {
  generator.next()
}, 2000);
```

上面代码中，函数f如果是普通函数，在为变量generator赋值时就会执行。但是，函数f是一个Generator函数，就变成只有调用next方法时，函数f才会执行。

**另外需要注意，yield语句不能用在普通函数中，否则会报错**

**另外，yield语句如果用在一个表达式之中，必须放在圆括号里面**

```javascript
onsole.log('Hello' + yield); // SyntaxError
console.log('Hello' + yield 123); // SyntaxError

console.log('Hello' + (yield)); // OK
console.log('Hello' + (yield 123)); // OK
```

**yield语句用作函数参数或赋值表达式的右边，可以不加括号。**

```javascript
foo(yield 'a', yield 'b'); // OK
let input = yield; // OK
```

## next方法的参数
yield句本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield语句的返回值。

```javascript
function* () {
  for( var i = 0; true; i++ ) {
    var reset = yield i;
    if( reset  ) {
      i = -1;
    }
  }
}

var g = f();

g.next();// { value: 0, done: false }
g.next();// { value: 1, done: false }
g.next(true);// { value: 0, done: false }
```

上面代码先定义了一个可以无限运行的Generator函数f，如果next方法没有参数，每次运行到yield语句，变量reset的值总是undefined。当next方法带一个参数true时，当前的变量reset就被重置为这个参数（即true），因此i会等于-1，下一轮循环就会从-1开始递增。

这个功能有很重要的语法意义。Generator函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过next方法的参数，就有办法在Generator函数开始运行之后，继续向函数体内部注入值。也就是说，可以在Generator函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

**注意，由于next方法的参数表示上一个yield语句的返回值，所以第一次使用next方法时，不能带有参数。V8引擎直接忽略第一次使用next方法时的参数，只有从第二次使用next方法开始，参数才是有效的。从语义上讲，第一个next方法用来启动遍历器对象，所以不用带有参数。**

如果想要第一次调用next方法时，就能够输入值，可以在Generator函数外面再包一层。

```javascript
function wrapper(generatorFunction) {
  return function (...args) {
    let generatorObject = generatorFunction(...args);
    generatorObject.next();
    return generatorObject;
  };
}

const wrapped = wrapper(function* () {
  console.log(`First input: ${yield}`);
  return 'DONE';
});

wrapped().next('hello!')
// First input: hello!
```
