# web app版相册学习总结
## 关于viewport设置

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />
```

这里注意 _width=device-width_、_initial-scale=1.0_、_maximum-scale=1.0_、_user-scalable_ 这些之间使用的是 **，** 分隔开来的。使用分号会出现这样的错误：

[viewport](./img/viewport.jpg)

content使用分号作为分隔，在老的浏览器是支持的，但不是规范写法。规范写法应该是使用逗号分隔，参考[http://am-team.github.io/amg/dev-exp-doc.html#html](http://am-team.github.io/amg/dev-exp-doc.html#html)

## animate.css
### 网址
[https://daneden.github.io/animate.css/](https://daneden.github.io/animate.css/)

### 引入
通过如下方式引入animate.css：

```html
<link rel="stylesheet" href="animate.css" >
```

### 使用
添加`class="animated 效果API"` ，如下:

```html
<div class="animated bounce">

</div>
```

## zepto.js
zepto是移动端的jQuery，封装了很多的方法。它的api和jQuery类似。

### 网址
[http://www.zeptojs.cn/](http://www.zeptojs.cn/)

### 引入

```html
<script src="zepto.js" charset="utf-8"></script>
```

### 使用
#### $() 选取元素，类似jQuery的选择器
- $(selector, [context]) => collection
- $(<Zepto collection>) => sname collection
- $(<DOM nodes>)   ⇒ collection
- $(htmlString)   ⇒ collection

#### $(selector).html(string);
- html()   ⇒ string
- html(content)   ⇒ self
- html(function(index, oldHtml){ ... })   ⇒ self

#### $(selector).css()
- css(property)   ⇒ value
- css(property, value)   ⇒ self
- css({ property: value, property2: value2, ... })   ⇒ self

#### $(selector).attr()
- attr(name)   ⇒ string
- attr(name, value)   ⇒ self
- attr(name, function(index, oldValue){ ... })   ⇒ self
- attr({ name: value, name2: value2, ... })   ⇒ self
- 如果读取dom属性例如checked或者selected，使用 _prop_ 方法

#### $(selector).delegate()
- delegate(selector, type, function(e){ ... })   ⇒ self
- delegate(selector, { type: handler, type2: handler2, ... })   ⇒ self

#### $(selector).hide()
- hide()   ⇒ self
- Hide elements in this collection by setting their display CSS property to none.

#### $(selector).tap(callback)
当元素触发了tap事件，执行callback函数

#### $(selector).swipeLeft(callback)
当元素触发了左滑动事件，执行callback

#### $(selector).swipeRight(callback)
当元素触发了右滑动事件，执行callback

## 动画事件
### webkitAnimationEnd
指动画结束时候触发的事件

```javascript
dom.addEventListener('webkitAnimationEnd', function() {
  ....
  dom.removeEventListener('webkitAnimationEnd');
}, false);
```

## 关于动画事件的扩展
在WebKit引擎的浏览器中，当CSS 3的animation动画执行结束时，触发webkitAnimationEnd事件,当CSS 3的transition动画执行结束时，触发webkitTransitionEnd事件。可以通过如下所示的代码捕捉这两个事件。

```javascript
element.addEventListener('webkitAnimationEnd', end, false);
element.addEventListener('webkitTransitionEnd', end, false);
```

当我们执行动画和过渡产生相同的效果的时候，可以从执行效果看到，webkitTransitionEnd事件的触发次数比webkitAnimationEnd事件的触发次数多一次,这是因为webkitAnimationEnd事件只在元素向右移动,然后向左返回之后触发一次,而webkitTransitionEnd事件将在元素向右移动之后触发一次,在元素向左返回之后再触发一次。

参考链接:[http://www.html5online.com.cn/articles/2013012201.html](http://www.html5online.com.cn/articles/2013012201.html)

如果再为元素添加一个属性，然后触发transition的动画事件，从执行结果中我们可以看出，如果多使用一个样式属性，在每个动画执行的过程中webkitTransitionEnd事件的触发次数将多增加两次。也就是说webkitTransitionEnd事件将在元素的每个样式属性值发生改变之后触发一次。
