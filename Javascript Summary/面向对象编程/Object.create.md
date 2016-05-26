# Object.create
老式浏览器不支持Object.create方法，可以用下面代码自己部署。

```javascript
if(typeof Object.create !== "function") {
  Object.create = function(o) {
    function F() {}
    F.prototype = o;
    return new F();
  };
}
```

如果想要生成一个不继承任何属性（比如toString和valueOf方法）的对象，可以将Object.create的参数设为null

除了对象的原型，Object.create方法还可以接受第二个参数，表示描述属性的attributes对象，跟用在Object.defineProperties方法的格式是一样的。它所描述的对象属性，会添加到新对象。

```javascript
var o = Object.create(Object.prototype, {
  p1: { value: 123, enumerable: true },
  p2: { value: "abc", enumerable: true }
});

o.p1 // 123
o.p2 // "abc"
```

# isPrototypeOf方法
isPrototypeOf方法用来判断一个对象是否是另一个对象的原型
