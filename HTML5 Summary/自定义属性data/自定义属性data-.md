# 自定义属性data-*
data-*是html5的新特性，可以自定义属性。在JavaScript中通过``dataset``属性用于操作HTML标签元素的``data-*``属性。

```html
<div id="myDiv" data-id="myId"></div>
```

## 读取
要读取data-id属性，可以从当前节点的dataset.id属性读取。

```js
var id = document.getElementById("myDiv").dataset.id;
```

## 设置
要设置data-id属性，可以直接对dataset.id赋值。如果该属性不存在，将会被新建。

```js
document.getElementById("myDiv").dataset.id = "hello";
```

## 删除
删除一个data-*属性，可以直接使用delete命令。

```js
delete document.getElementById('myDiv').dataset.id;
```

## 其他
除了dataset属性，也可以用``getAttribute('data-foo')``、``removeAttribute('data-foo')``、``setAttribute('data-foo')``、``hasAttribute('data-foo')``等方法操作data-*属性。

## 注意
**需要注意的是，dataset属性使用骆驼拼写法表示属性名，这意味着data-hello-world会用dataset.helloWorld表示。而如果此时存在一个data-helloWorld属性，该属性将无法读取，也就是说，data-*属性本身只能使用连词号，不能使用骆驼拼写法。**