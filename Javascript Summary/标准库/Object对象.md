# 1.Object对象的方法
# 1.1 Object()
判断一个变量是否为对象的函数

```javascript
function isObject(value) {
  return value === Object(value);
}
```

# 1.2 Object.keys(), Object.getOwnPropertyNames()
他们都返回对象自身的所有属性名组成的数组

区别在于，前者返回的是可枚举的属性，后者还可以返回不可枚举的属性名

一般情况下，几乎总是使用Object.keys方法，遍历数组的属性。

# 1.3Object.observe()
Object.observe方法用于观察对象属性的变化。

```javascript
var o = {};

Object.observe(o, function(changes) {
  changes.forEach(function(change) {
    console.log(change.type, change.name, change.oldValue);
  });
});

o.foo = 1; // add, 'foo', undefined
o.foo = 2; // update, 'foo', 1
delete o.foo; // delete, 'foo', 2
```

上面代码表示，通过Object.observe函数，对o对象指定回调函数。一旦o对象的属性出现任何变化，就会调用回调函数，回调函数通过一个参数对象读取o的属性变化的信息。

该方法非常新，只有Chrome浏览器的最新版本才部署。

## 1.4其他方法
## 1.4.1对象属性模型的相关方法
- Object.getOwnPropertyDesciptor():获取某个属性的attributes对象。
- Object.defineProperty()：通过attributes对象，定义某个属性。
- Object.defineProperties()：通过attributes对象，定义多个属性。
- Object.getOwnPropertyNames()：返回直接定义在某个对象上面的全部属性的名称。

## 1.4.2控制对象状态的方法
- Object.preventExtensions()：防止对象扩展。
- Object.isExtensible()：判断对象是否可扩展。
- Object.seal()：禁止对象配置。
- Object.isSealed()：判断一个对象是否可配置。
- Object.freeze()：冻结一个对象。
- Object.isFrozen()：判断一个对象是否被冻结。

## 1.4.3原型链相关方法
- **Object.create()：生成一个新对象，使生成的新对象的原型为传入参数。**
- **Object.getPrototypeOf()：获取对象的Prototype对象。**

# 2.Object实例对象的方法
## 2.1Object.prototype.valueOf()
valueOf方法的作用是返回一个对象的值，默认情况下返回对象本身

## 2.2Object.prototype.toString()
toString方法的作用是返回一个对象的字符串形式。

## 2.3toString()的应用：判断数据类型
- 不同数据类型的toString方法返回值如下:
- 数值：返回[object Number]。
- 字符串：返回[object String]。
- 布尔值：返回[object Boolean]。
- undefined：返回[object Undefined]。
- null：返回[object Null]。
- 数组：返回[object Array]。
- arguments对象：返回[object Arguments]。
- 函数：返回[object Function]。
- Error对象：返回[object Error]。
- Date对象：返回[object Date]。
- RegExp对象：返回[object RegExp]。
- 其他对象：返回[object " + 构造函数的名称 + "]。

```javascript
Object.prototype.toString.call(2) // "[object Number]"
Object.prototype.toString.call('') // "[object String]"
Object.prototype.toString.call(true) // "[object Boolean]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(Math) // "[object Math]"
Object.prototype.toString.call({}) // "[object Object]"
Object.prototype.toString.call([]) // "[object Array]"
```

# 3.extend对象的拷贝
简单的方法:

```javascript
var extend = function (to, from) {
  for (var property in from) {
    to[property] = from[property];
  }

  return to;
}

extend({}, {a: 1})
// {a: 1}
```

上面这个方法的问题在于，如果遇到存取器定义的属性，会只拷贝值。

**存取器:除了直接定义以外，属性还可以用存取器（accessor）定义。其中，存值函数称为setter，使用set命令；取值函数称为getter，使用get命令。**

```javascript
var o = {
  get p() {
    return "getter";
  },
  set p(value) {
    console.log("setter: "+value);
  }
}

o.p // "getter"
o.p = 123 // "setter: 123"
```

为了解决这个问题，我们可以通过Object.defineProperty方法来拷贝属性。

```javascript
var extend = function (to, from) {
  for (var property in from) {
    Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(from, property));
  }

  return to;
}

extend({}, { get a(){ return 1 } })
// { get a(){ return 1 } })
```

这段代码还是有问题，拷贝某些属性时会失效。

```javascript
extend(document.body.style, {
  backgroundColor: "red"
});
```

上面代码的目的是，设置document.body.style.backgroundColor属性为red，但是实际上网页的背景色并不会变红。但是，如果用第一种简单拷贝的方法，反而能够达到目的。这提示我们，可以把两种方法结合起来，对于简单属性，就直接拷贝，对于那些通过描述对象设置的属性，则使用Object.defineProperty方法拷贝。

```javascript
var extend = function (to, from) {
  var descriptor = Object.getOwnPropertyDescriptor(from, property);

  if (descriptor && ( !descriptor.writable
    || !descriptor.configurable
    || !descriptor.enumerable
    || descriptor.get
    || descriptor.set)) {
    Object.defineProperty(to, property, descriptor);
  } else {
    to[property] = from[property];
  }
}
```
