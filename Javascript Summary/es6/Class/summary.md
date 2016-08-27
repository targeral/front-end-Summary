# Class
## Class基本语法
1. ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。

2. 基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

```js
class Point {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }

  toString () {
    return '(' + this.x + ', ' + this.y + ')';
  }
}
```

*ES6的类，完全可以看作构造函数的另一种写法*

3. 构造函数的prototype属性，在ES6的“类”上面继续存在。事实上，类的所有方法都定义在类的prototype属性上面。在类的实例上面调用方法，其实就是调用原型上的方法。

4. 由于类的方法都定义在prototype对象上面，所以类的新方法可以添加在prototype对象上面。Object.assign方法可以很方便地一次向类添加多个方法。

```js
class Point {
  constructor () {

  }
}

Object.assign(Point.prototype, {
  toString() {},
  toValue() {}
})
```

5. 另外，类的内部所有定义的方法，都是不可枚举的（non-enumerable）。

```js
class Point {
  constructor (x, y) {

  }
  toString () {

  }
}

Object.keys(Point.prototype) //[]
Object.getOwnPropertyNames(Point.prototype) //["constructor","toString"]
```

6. 类的属性名，可以采用表达式。

```js
let methodName = "getArea";
class Square {
  constructor (length) {

  }
  [methodName] () {

  }
}
```

### constructor
1. constructor方法是类的默认方法，通过new命令生成对象实例时，自动调用该方法。一个类必须有constructor方法，如果没有显式定义，一个空的constructor方法会被默认添加。
2. constructor方法默认返回实例对象（即this），完全可以指定返回另外一个对象。

```js
class Foo {
  constructor () {
    return Object.create(null)
  }
}

new Foo() instanceof Foo // false
```

### 类的实例对象
1. 生成类的实例对象的写法，与ES5完全一样，也是使用new命令。如果忘记加上new，像函数那样调用Class，将会报错。

```js
var point = Point(2, 3);//Error
var point = new Point(2, 3)//true
```

2. 与ES5一样，实例的属性除非显式定义在其本身（即定义在this对象上），否则都是定义在原型上（即定义在class上）。

3. 与ES5一样，类的所有实例共享一个原型对象。

### name属性
由于本质上，ES6的Class只是ES5的构造函数的一层包装，所以函数的许多特性都被Class继承，包括name属性。

```js
class Point {}
Point.name // 'point'
```

### Class 表达式
1. 与函数一样，Class也可以使用表达式的形式定义。

```js
const MyClass = class Me {
  getClassName () {
    return Me.name;
  }
}
```

上面代码使用表达式定义了一个类。需要注意的是，**这个类的名字是MyClass而不是Me，Me只在Class的内部代码可用，指代当前类。**

```js
let inst = new MyClass();
inst.getClassName(); // Me
Me.name // ReferenceError: Me is not defined
```

上面代码表示，Me只在Class内部有定义。

2. 如果Class内部没用到的话，可以省略Me，也就是可以写成下面的形式。

```js
const MyClass = class { /* ... */ };
```

3. 采用Class表达式，可以写出立即执行的Class。

```js
let person = new class {
  constructor (name) {
    this.name = name;
  }

  sayName () {
    console.log(this.name);
  }
}('张三');

person.sayName();//"张三"
```

### 不存在变量提升
1. *Class不存在变量提升（hoist），这一点与ES5完全不同。*

```js
new Foo()// ReferenceError
class Foo{}
```

### 严格模式
类和模块的内部，默认就是严格模式，所以不需要使用use strict指定运行模式。只要你的代码写在类或模块之中，就只有严格模式可用。

考虑到未来所有的代码，其实都是运行在模块之中，所以ES6实际上把整个语言升级到了严格模式。

## Class继承
1. Class之间可以通过extends关键字实现继承，这比ES5的通过修改原型链实现继承，要清晰和方便很多。

```js
class ColorPoint extends Point {
  constructor (x, y, color) {
    super(x, y);// 调用父类的constructor(x, y)
    this.color = color;
  }

  toString () {
    return this.color + ' ' + super.toString();// 调用父类的toString()
  }
}
```

2. 上面代码中，``constructor``方法和``toString``方法之中，都出现了``super``关键字，*它在这里表示父类的构造函数，用来新建父类的this对象*。

3. 子类必须在``constructor``方法中调用``super``方法，否则新建实例时会报错。**这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用``super``方法，子类就得不到``this``对象。**

4. ES5的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。

### 类的prototype属性和__proto__属性
大多数浏览器的ES5实现之中，每一个对象都有__proto__属性，指向对应的构造函数的prototype属性。Class作为构造函数的语法糖，同时有prototype属性和__proto__属性，因此同时存在两条继承链
1. 子类的__proto__属性，表示构造函数的继承，总是指向父类
2. 子类prototype属性的__proto__属性，表示方法的继承，总是指向父类的prototype属性。

```js
class A{

}
class B extends A {

}

B.__proto__ === A // true
B.prototype.__proto__ === A.prototype // true
```

这两条继承链，可以这样理解：作为一个对象，子类（B）的原型（ ``__proto__``属性）是父类（A）；作为一个构造函数，子类（B）的原型（prototype属性）是父类的实例。

```js
B.prototype = new A();
// 等同于
B.prototype.__proto__ = A.prototype;
```

### Extends的继承目标
extends关键字后面可以跟多种类型的值

### Object.getPrototypeOf()
Object.getPrototypeOf方法可以用来从子类上获取父类

```js
Object.getPropertypeOf(ColorPoint) === Point
```

### super关键字
super这个关键字，有两种用法，含义不同。
1. 作为函数调用时（即super(...args)），super代表父类的构造函数
2. 作为对象调用时（即super.prop或super.method()），super代表父类。注意，此时super即可以引用父类实例的属性和方法，也可以引用父类的静态方法。
