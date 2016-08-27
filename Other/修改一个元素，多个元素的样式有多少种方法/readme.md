# 修改一个，多个元素的样式有多少种方法？
对于前端，修改样式是经常要做的一个工作。那么修改元素的样式到底有多少种方法呢？

一般来说，修改样式经常是用js来修改样式。

## 修改一个元素
### 元素的Style属性

操作元素的CSS样式，最简单的方法之一就是使用节点对象的操作属性的方法: `getAttribute()`、`setAttribute()` 、`removeAttribute()`，读写或删除元素的Style属性。

```js
div.setAttribute('style', 
   'background-color: red;' + 'border: 1px solid black;');
```

其实元素本身就提供了 `style` 属性，用来操作CSS样式。`style` 属性本身就是一个对象，用来读写页面元素
的 *行内CSS样式*。

```js
var divStyle = document.querySelector('div').style;
divStyle.backgroundColor = 'red';
divStyle.border = '1px solid black';
divStyle.width = '100px';
divStyle.height = '100px';
divStyle.fontSize = '10em';
```

一般来说style对象的属性和css规则名是一一对应的，但是有些需要改写。

具体规则是：

* 将横杠从CSS属性名中去除，然后将横杠后的第一个字母大写，比如上面的 `background-color`写成了`backgroundColor`。
* 如果CSS属性名是JavaScript保留字，则规则名之前需要加上字符串 **css**，比如 `float` 写成 `cssFloat`
* 注意，style对象的属性值都是字符串，而且包括单位。所以，divStyle.width不能设置为100，而要设置为
  100px

### 元素的style对象的cssText属性
如果修改的CSS样式不是很多，可以使用上面的方法。但是如果是大量的CSS的样式，这个时候我们可以使用 `cssText` 属性。

style对象的cssText可以用来读写或删除整个style属性。

```js
var divStyle = document.querySelector('div').style;
divStyle.cssText = 'background-color: red;'
                 + 'border: 1px solid black;'
                 + 'height: 100px;'
                 + 'width: 100px;';
```

**注意，cssText的属性值不用改写CSS属性名。**

### 元素的style对象的setProperty()，getPropertyValue()，removeProperty()方法

style对象的一下三个方法，用来读写行内CSS规则：

* `setProperty(propertyName, value)`: 设置某个css属性
* `getPropertyValue(propertyName)`: 读取某个css属性
* `removeProperty(propertyName)`: 删除某个css属性

注意: **这三个方法的第一个参数，都是CSS属性名，且不用改写连词线。**

```js
var divStyle = document.querySelector('div').style;
divStyle.setProperty('background-color', 'red');
divStyle.getPropertyValue('background-color');
divStyle.removeProperty('background-color');
```

### 关于Style对象一些扩展
#### CSS模块的侦测

##### 定义

*CSS的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对CSS模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做“CSS模块的侦测”。*

##### 使用

一个比较普遍适用的方法是，判断某个DOM元素的style对象的某个属性值是否为字符串。如果该CSS属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。**如果该属性不存在，则会返回undefined。**

所有浏览器都能用这个方法，但是使用的时候，需要把不同浏览器的CSS规则前缀也考虑进去。

```
typeof element.style.animationName === 'string';
typeof element.style.transform === 'string';

document.body.style['maxWidth'] // ""
document.body.style['maximumWidth'] // undefined
```

注意: **不管CSS属性名带不带连词线，style对象都会显示该属性存在。**

##### 函数

这种侦测方法可以写成一个函数。

```js
function isPropertySupported(property) {
    if( property in document.body.style ) return true;
    var prefixes = ['Moz', 'Webkit', 'O', 'ms', 'Khtml'];
    var prefProperty = property.charAt(0).toUpperCase() + property.substr(1);

    for(var i = 0; i < prefixes.length; i ++) {
        if( (prefixes[i] + prefProperty) in document.body.style ) return true;
    }

    return false;
}

isPropertySupported('background-clip')
```

##### supports API
部分浏览器（Firefox 22+, Chrome 28+, Opera 12.1+）目前部署了supports API，可以返回一个布尔值，
表示是否支持某条CSS规则。但是，这个API还没有成为标准。

```js
CSS.supports('transform-origin', '5px');
CSS.supports('(display: table-cell) and (display: list-item)');
```


我们还可以通过 `StyleSheet` 对象来修改元素的CSS样式。下面介绍一下 `StyleSheet` 。

###  StyleSheet对象——获取样式表 

`StyleSheet` 对象代表网页的一张样式表，它包括link节点加载的样式表和style节点内嵌的样式表。

**document对象的StyleSheet属性可以返回当前页面的所有StyleSheet对象（即所有样式表）**。

它是一个类似数组的对象。



```js
var sheets = document.styleSheets;
var sheet  = document.styleSheets[0];
```

此外，link节点和style节点的sheet属性，也可以获取StyleSheet对象。

```js
// HTML代码为
// <link id="linkElement" href="http://path/to/stylesheet">
// <style id="styleElement">
//   body{font-size: 1.2 rem;}
// </style>

// 等同于document.styleSheets[0]
document.querySelector('#linkElement').sheet
// 等同于document.styleSheets[1]
document.querySelector('#styleElement').sheet
```
### StyleSheet对象——属性
