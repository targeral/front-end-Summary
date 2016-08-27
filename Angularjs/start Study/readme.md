# Angularjs (v1.3.2)
## function
### ``angular.bind(self, fn, args)``
* *返回动态绑定的函数*
* self ,Object ,fn的上下文对象，使用this调用
* fn ,function() ,被绑定的function
* args ,* ,传入fn中的参数(可选的)
* 返回值：返回动态绑定之后的函数

http://www.tuicool.com/articles/Fjq6niv
### ``angular.bootstrap(element, [modules], [config])``
* *手动加载模块*
* element ,DOMElement ,为angular应用指定root节点
* modules ,array<string | array | function> ,加载相应的应用
* config ,Object ,配置选项

http://www.tuicool.com/articles/aiayI3

### ``angular.copy(source, [destination])``
* *创建一个深度克隆*
* source ,* ,克隆的副本
* destination ,Object | Array ,克隆的目标
* 返回一个复制或者更新的克隆目标

https://code.angularjs.org/1.3.2/docs/api/ng/function/angular.copy

## directive
### ``ngApp``
* **在页面中可以写做个，但只会启动第一个。若想要启动多个，需手动启动。**

### ``ngBind``
* 可以用来替换使用angular表达式来显示html的内容的方式

```html
<input type="text" name="name" value="" ng-model="name">
<span ng-bind="name"></span>
```

### ``ngBindHtml``

### ``ngCloak``

http://www.cnblogs.com/whitewolf/p/3495822.html

### ``ngCsp``

http://www.cnblogs.com/ys-ys/p/4951390.html
