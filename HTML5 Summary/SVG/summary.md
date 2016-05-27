# Study SVG
## svg简介
### **什么是SVG？**
svg是"Scalable Vector Graphics"的简称。中文可以理解为 **可缩放矢量图形**。svg是基于可扩展标记语言，用于描述二维矢量图形的一种图形格式。

其实记住几个关键词，svg是可缩放矢量图，1999年由万维网联盟发布，于2013年成为w3c推荐标准。
- SVG是指可伸缩矢量图形
- SVG用来定义用于网络的基于矢量的图形
- SVG使用XML格式定义图形
- SVG图像在放大或缩小（改变尺寸）的情况下，其图形质量不会受受损失
- SVG是W3C的一个标准

### **SVG的优势**
与其他图像格式相比，使用SVG的优势在于：
- SVG可被非常多的工具读取和修改（比如记事本）
- SVG与JPEG和GIF图像比起来，尺寸更小，且可压缩性更强。
- SVG是可伸缩的
- SVG图像可在任何的分辨率下被高质量地打印
- SVG可在图像质量不下降的情况下被放大
- SVG图像中的文本是可选的，同时也是可搜索的（很适合制作地图）
- SVG可以与Java技术一起运行
- SVG是开放的标准
- SVG文件是纯粹的XML

### **在web浏览器中显示svg**
svg可以通过几种方法来实现：
- 指向svg文件地址
- 将svg直接嵌套在html中

而将SVG图像嵌入到HTML文件有多种方法：
- 使用`<iframe>`元素来嵌入svg图像
- 使用`<img>`元素来嵌入svg图像
- 将SVG图像作为背景图像嵌入
- 直接使用`<svg>`元素
- 使用`<embed>`元素来嵌入SVG图像
- 使用`<object>`元素来嵌入SVG图像

#### iframe
自从浏览器支持SVG，你可以通过url来加载SVG图像。其中使用<iframe>嵌入SVG就是其中一种方式。如下面的示例

```html
<iframe src="http://www.w3cplus.com/sites/default/files/blogs/2014/1411/girls.svg" width="200" height="200" ></iframe>
```

#### img
嵌入SVG图像还可以使用<img>元素加载图像一样。只需要将src的属性值更换成SVG图像对应的url，如：

```html
<img src="http://www.w3cplus.com/sites/default/files/blogs/2014/1411/girls.svg"  width="300" />
```

#### background-image
自从浏览器支持SVG图像时，SVG图像就像位图一样，你可以通过background-image属性将SVG图像当做背景图片一样嵌入到HTML页面中。如下面的例子所示：

```css
div {
    background: url('http://www.w3cplus.com/sites/default/files/blogs/2014/1411/girls.svg') no-repeat center;
    background-size : 200px 200px;
}
```

可以需要通过background-size设置背景图像大小，告诉浏览器SVG图像以多大的尺寸显示

#### svg
嵌入SVG图像到HTML页中，还可以直接使用<svg>元素，通过代码将SVG图像嵌入到HTML代码中。如：

```html
<div>
    <svg enable-background="new 0 0 145 145" id="Layer_1" version="1.1" viewBox="0 0 145 145" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <g>
            <path d="M95.727,56.11c-2.29-3.814-4.565-6.092-4.617-6.146c-0.48-0.48-2.289,1.668-2.791,2.309   c-0.762,0.981-2.563,2.625-6.367,4.876c-3.802,2.255-9.599,5.132-18.35,8.687c-3.747,1.524-6.766,3.085-9.192,4.666   c3.136-0.364,6.856-0.784,7.613-0.815c2.007-0.082-0.404,4.203-9.474,2.116c-1.186,0.895-2.195,1.796-3.047,2.699   c-1.388,1.474-2.355,2.959-2.971,4.422c-0.617,1.463-0.877,2.9-0.876,4.246c0.005,3.039,1.285,3.753,2.512,5.495   c1.234,1.746,3.872,2.962,3.872,2.962s-0.704-1.33-1.719-2.789c-1.022-1.463-1.976-3.455-1.971-5.668   c0.001-1.004,0.188-2.065,0.665-3.201c0.275-0.653,0.652-1.335,1.149-2.038c0.466,2.206,1.478,6.081,3.454,10.021   c1.499,2.98,3.555,4.208,6.406,6.524c2.844,2.317,6.521,5.686,11.017,5.679c0.11,0,0.221-0.001,0.332-0.003   c3.876-0.057,7.15-3.391,9.724-5.757c3.87-3.555,6.308-7.082,7.847-12.521c1.531-5.446,2.713-11.542,3.009-15.689   c0.522-7.306,0.163-10.061-0.246-11.266c0.572,0.787,1.188,1.696,1.808,2.743c2.096,3.534,4.127,8.399,4.123,13.856   c-0.002,3.122-0.653,6.447-2.35,9.907c-1.698,3.459-4.452,7.06-8.7,10.68c0,0,9.238-5.66,11.119-9.493   c1.882-3.831,2.628-7.595,2.626-11.095C100.33,65.29,98.012,59.922,95.727,56.11z M77.582,69h11.677C89.259,69,89.259,75,77.582,69   z"/>
            <path d="M53.943,97.604c-0.348-0.031-0.705-0.008-1.062-0.028c-0.212-0.012-0.425-0.001-0.633-0.02   c-3.854-0.352-6.887-1.923-8.909-4.354c-2.018-2.434-3.053-5.744-2.744-9.682l0.018-0.214c0.262-2.885,1.129-5.415,2.495-7.631   c1.367-2.215,3.437-3.863,5.531-5.702c7.384-6.483,14.57-10.075,21.95-13.905c4.245-2.203,8.488-4.594,12.651-7.22   c0.93-0.589,1.652-1.372,2.303-2.16c0.65-0.79,1.234-1.593,1.838-2.262c0,0-8.906,4.272-12.152,5.812   c-9.81,4.656-19.593,9.548-28.099,16.587c-3.033,2.512-5.808,5.679-7.739,9.131c-1.279,2.286-2.037,4.649-2.252,7.027   c-0.347,3.803,0.713,7.618,3.108,11.164c1.28,1.9,2.797,3.31,4.487,4.276c1.689,0.967,3.541,1.487,5.471,1.66   c1.797,0.162,3.675-0.072,5.585-0.411l7.056-1.355l-7.128-0.644C55.143,97.622,54.545,97.659,53.943,97.604z"/>
            <path d="M49.823,71.043c0.97,0.317,1.875,0.565,2.726,0.76c0.576-0.435,1.197-0.869,1.86-1.301   C51.934,70.79,49.823,71.043,49.823,71.043z" fill="#FFFFFF"/>
        </g>
    </svg>
</div>
```

#### embed
早期将SVG图像嵌入到HTML页面中都是通过<embed>元素。当时并不是所有的浏览器都支持原生SVG。来看看怎么使用：

```html
<embed src="http://www.w3cplus.com/sites/default/files/blogs/2014/1411/girls.svg" width="300" height="220" type="image/svg+xml" pluginspage="http://www.adobe.com/svg/viewer/install/" />
```

#### object
<object>元素是HTML4的标准标签元素，被所有较新的流星器支持。它只不过是不允许使用脚本。这个刚好与<embed>标签元素相反:

```html
<object data="http://www.w3cplus.com/sites/default/files/blogs/2014/1411/girls.svg" width="300" height="200" type="image/svg+xml" codebase="http://www.adobe.com/svg/viewer/install/" />
```

虽然将SVG图像嵌入到HTML页面中，让浏览器能显示。方法有很多种，但我更建议大使用平时使用的时候使用<img>和<svg>这两种方式。当然，如果你的SVG图像是给元素做背景图时，可以使用background-image方式引入。

## svg文件结构
**回顾** SVG图形其实就是一段XML代码，在HTML页面引用是通过引用.svg文件格式，或者直接在.html文件中放置<svg>元素。而两者最大的区别就是，独立的SVG必须添加一个XML声明。

一个独立的svg文件，也就是平时看到的可扩展名`.svg`结尾的文件，它主要包括:
- xml声明
- `<svg>`根元素包括一个用来描述svg的xml声明空间

SVG文件使用的是XML声明方式：

```html
<?xml version="1.0"?>
```

第二部分是SVG的XML声明空间，这一部分类似于HTML中的`xmlns="http://www.w3.org/1999/xhtml"`：

```html
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
```

而svg文件中`<svg>`的声明空间是`xmlns="http://www.w3.org/2000/svg`:

```html
<svg xmlns="http://www.w3.org/2000/svg">
```

其实在实际使用中，他也分为几种不同的方式。

### 最小的SVG结构
其实最小的SVG结构就是一种简写的结构:

```html
<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg">
  <!-- SVG 代码 -->
</svg>
```

### 典型的svg结构
除了简写的SVG结构，还有一种典型的SVG结构。通常情况之下，一个SVG文件包含内部链接，在这种情况下，必须定义`xlink`声明空间`http://www.w3.org/1999/xlink` :

```html
<?xml version="1.0"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="600" height="300">
    <!-- SVG代码 -->
</svg>
```

在这个示例中，还声明了SVG画布的大小。定义SVG画布大小是可选的，但强烈推荐，使用SVG时定义其画布大小

在使用代码编写SVG时，最好加上DTD，这是非常有用的。在一些示例中，你可能会看到这样的代码：

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.0//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
<svg xmlns="http://www.w3.org/2000/svg">
    <!-- SVG代码 -->
</svg>
```

来看一个SVG文件中的代码示例：

```html
<?xml version="1.0" ?>
<!DOCTYPE svg  PUBLIC '-//W3C//DTD SVG 1.1//EN'  'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'>
<svg enable-background="new 0 0 145 145" id="Layer_1" version="1.1" viewBox="0 0 145 145" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <g>
        <path d="M95.727,56.11c-2.29-3.814-4.565-6.092-4.617-6.146c-0.48-0.48-2.289,1.668-2.791,2.309   c-0.762,0.981-2.563,2.625-6.367,4.876c-3.802,2.255-9.599,5.132-18.35,8.687c-3.747,1.524-6.766,3.085-9.192,4.666   c3.136-0.364,6.856-0.784,7.613-0.815c2.007-0.082-0.404,4.203-9.474,2.116c-1.186,0.895-2.195,1.796-3.047,2.699   c-1.388,1.474-2.355,2.959-2.971,4.422c-0.617,1.463-0.877,2.9-0.876,4.246c0.005,3.039,1.285,3.753,2.512,5.495   c1.234,1.746,3.872,2.962,3.872,2.962s-0.704-1.33-1.719-2.789c-1.022-1.463-1.976-3.455-1.971-5.668   c0.001-1.004,0.188-2.065,0.665-3.201c0.275-0.653,0.652-1.335,1.149-2.038c0.466,2.206,1.478,6.081,3.454,10.021   c1.499,2.98,3.555,4.208,6.406,6.524c2.844,2.317,6.521,5.686,11.017,5.679c0.11,0,0.221-0.001,0.332-0.003   c3.876-0.057,7.15-3.391,9.724-5.757c3.87-3.555,6.308-7.082,7.847-12.521c1.531-5.446,2.713-11.542,3.009-15.689   c0.522-7.306,0.163-10.061-0.246-11.266c0.572,0.787,1.188,1.696,1.808,2.743c2.096,3.534,4.127,8.399,4.123,13.856   c-0.002,3.122-0.653,6.447-2.35,9.907c-1.698,3.459-4.452,7.06-8.7,10.68c0,0,9.238-5.66,11.119-9.493   c1.882-3.831,2.628-7.595,2.626-11.095C100.33,65.29,98.012,59.922,95.727,56.11z M77.582,69h11.677C89.259,69,89.259,75,77.582,69   z"/>
        <path d="M53.943,97.604c-0.348-0.031-0.705-0.008-1.062-0.028c-0.212-0.012-0.425-0.001-0.633-0.02   c-3.854-0.352-6.887-1.923-8.909-4.354c-2.018-2.434-3.053-5.744-2.744-9.682l0.018-0.214c0.262-2.885,1.129-5.415,2.495-7.631   c1.367-2.215,3.437-3.863,5.531-5.702c7.384-6.483,14.57-10.075,21.95-13.905c4.245-2.203,8.488-4.594,12.651-7.22   c0.93-0.589,1.652-1.372,2.303-2.16c0.65-0.79,1.234-1.593,1.838-2.262c0,0-8.906,4.272-12.152,5.812   c-9.81,4.656-19.593,9.548-28.099,16.587c-3.033,2.512-5.808,5.679-7.739,9.131c-1.279,2.286-2.037,4.649-2.252,7.027   c-0.347,3.803,0.713,7.618,3.108,11.164c1.28,1.9,2.797,3.31,4.487,4.276c1.689,0.967,3.541,1.487,5.471,1.66   c1.797,0.162,3.675-0.072,5.585-0.411l7.056-1.355l-7.128-0.644C55.143,97.622,54.545,97.659,53.943,97.604z"/>
        <path d="M49.823,71.043c0.97,0.317,1.875,0.565,2.726,0.76c0.576-0.435,1.197-0.869,1.86-1.301   C51.934,70.79,49.823,71.043,49.823,71.043z" fill="#FFFFFF"/>
    </g>
</svg>
```

### HTML5中的SVG
假设我们有一个.svg文件，使用编辑器打开这个文件，可以看到上面代码区域所示的代码。接下来看看如何将这部分代码用到.html文件当中。

最简单的方法，你只需要将.svg中所有代码复制，然后粘贴到.html文件中，但有两点需要注意：
- 在`.html`文件中，粘贴了`.svg`代码之后，要将svg的xml声明删除
- html文件应该使用HTML5的DTD

最终代码如下：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>SVG绘制的MM头像</title>
</head>
<body>
    <svg enable-background="new 0 0 145 145" id="Layer_1" version="1.1" viewBox="0 0 145 145" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="300">
        <g>
            <path d="M95.727,56.11c-2.29-3.814-4.565-6.092-4.617-6.146c-0.48-0.48-2.289,1.668-2.791,2.309   c-0.762,0.981-2.563,2.625-6.367,4.876c-3.802,2.255-9.599,5.132-18.35,8.687c-3.747,1.524-6.766,3.085-9.192,4.666   c3.136-0.364,6.856-0.784,7.613-0.815c2.007-0.082-0.404,4.203-9.474,2.116c-1.186,0.895-2.195,1.796-3.047,2.699   c-1.388,1.474-2.355,2.959-2.971,4.422c-0.617,1.463-0.877,2.9-0.876,4.246c0.005,3.039,1.285,3.753,2.512,5.495   c1.234,1.746,3.872,2.962,3.872,2.962s-0.704-1.33-1.719-2.789c-1.022-1.463-1.976-3.455-1.971-5.668   c0.001-1.004,0.188-2.065,0.665-3.201c0.275-0.653,0.652-1.335,1.149-2.038c0.466,2.206,1.478,6.081,3.454,10.021   c1.499,2.98,3.555,4.208,6.406,6.524c2.844,2.317,6.521,5.686,11.017,5.679c0.11,0,0.221-0.001,0.332-0.003   c3.876-0.057,7.15-3.391,9.724-5.757c3.87-3.555,6.308-7.082,7.847-12.521c1.531-5.446,2.713-11.542,3.009-15.689   c0.522-7.306,0.163-10.061-0.246-11.266c0.572,0.787,1.188,1.696,1.808,2.743c2.096,3.534,4.127,8.399,4.123,13.856   c-0.002,3.122-0.653,6.447-2.35,9.907c-1.698,3.459-4.452,7.06-8.7,10.68c0,0,9.238-5.66,11.119-9.493   c1.882-3.831,2.628-7.595,2.626-11.095C100.33,65.29,98.012,59.922,95.727,56.11z M77.582,69h11.677C89.259,69,89.259,75,77.582,69   z"/>
            <path d="M53.943,97.604c-0.348-0.031-0.705-0.008-1.062-0.028c-0.212-0.012-0.425-0.001-0.633-0.02   c-3.854-0.352-6.887-1.923-8.909-4.354c-2.018-2.434-3.053-5.744-2.744-9.682l0.018-0.214c0.262-2.885,1.129-5.415,2.495-7.631   c1.367-2.215,3.437-3.863,5.531-5.702c7.384-6.483,14.57-10.075,21.95-13.905c4.245-2.203,8.488-4.594,12.651-7.22   c0.93-0.589,1.652-1.372,2.303-2.16c0.65-0.79,1.234-1.593,1.838-2.262c0,0-8.906,4.272-12.152,5.812   c-9.81,4.656-19.593,9.548-28.099,16.587c-3.033,2.512-5.808,5.679-7.739,9.131c-1.279,2.286-2.037,4.649-2.252,7.027   c-0.347,3.803,0.713,7.618,3.108,11.164c1.28,1.9,2.797,3.31,4.487,4.276c1.689,0.967,3.541,1.487,5.471,1.66   c1.797,0.162,3.675-0.072,5.585-0.411l7.056-1.355l-7.128-0.644C55.143,97.622,54.545,97.659,53.943,97.604z"/>
            <path d="M49.823,71.043c0.97,0.317,1.875,0.565,2.726,0.76c0.576-0.435,1.197-0.869,1.86-1.301   C51.934,70.79,49.823,71.043,49.823,71.043z" fill="#FFFFFF"/>
        </g>
    </svg>
</body>
</html>
```

### 总结
.svg文件居然和.html文件一样，也有文档声明。文章中介绍了SVG文件的结构，主要包括哪些内容。其实对于Web人员来说，或许你还在担心自己不懂XML写不了SVG相关的东西。其实不用这么纠结，因为简单的图形可以直接使用<svg>相关元素与属性一起完成，对于复杂的图形还是需要借助一定的手段来完成。而这篇文章主要关注的是如何将做好的SVG图像与现在火爆的HTML5结合在一起使用。

## SVG的坐标系统
简单点理解SVG坐标就是屏幕坐标点(从技术上讲，最初的viewport坐标系统)与任何SVG元素相关联的坐标点系统(当前用户坐标系统)。 例如，一个`<svg>`中使用`<circle>`绘制的一个圆，它就使用了一个标准的笛卡尔坐标系统。

![Cartesian Coordinate System](img/svg-17.png)

### viewport
在web页面开发中，viewport严格来讲就是浏览器的窗口。他不是一个html的概念，也就无法通过css修改viewport。对于桌面浏览器，viewport其实就是浏览器的宽度高度，而在移动端设备浏览器中，viewport就稍加复杂。

在svg中也有一个viewport，而这个viewport被视为svg的可见区域大小，将其想象成画布或者画板大小。在`<svg>`元素中通过设置其 **width** 和 **height** 属性来控制svg的viewport大小。_其中 **width **和 **height **的属性可以是一个简单的数字，也可以指定具体的单位_ 如果没有指定单位，那么就会认其为 "像素px" 为单位。

### (扩展)关于svg的viewBox，preserveAspectRatio
#### viewBox
**viewBox** 值有四个数字:

```
viewBox="x, y, width, height"  // x:左上角横坐标，y:左上角纵坐标，width:宽度，height:高度
```

viewBox顾名思意是"视区盒子"的意思，好比在说："SVG啊，要不你就让我铺满你吧~"

更形象的解释就是：SVG就像是我们的显示器屏幕，viewBox就是截屏工具选中的那个框框，最终的呈现就是把框框中的截屏内容再次在显示器中全屏显示！

更直观的解释：
- 如果没有viewBox, 应该是长这样的：

![viewBox](./img/svg-4.png)

<rect>大小只有整个SVG舞台的1/20。
- viewBox="0,0,40,30"相当于在SVG上圈了下图左上角所示的一个框框：

![viewBox](./img/svg-5.png)
- 然后把这个框框，连同框框里的小矩形一起放大到整个SVG大小（如下gif）:

![viewBox](./img/svg-6.gif)

#### preserveAspectRatio
上面的例子，SVG的宽高比正好和viewBox的宽高比是一样的，都是4:3。

显然，实际应用viewBox不可能一直跟viewport穿同一条开裆裤。此时，就需要preserveAspectRatio出马了，此属性也是应用在<svg>元素上，且作用的对象都是viewBox。

先看下猪是怎么跑的：

```
preserveAspectRatio="xMidYMid meet"
```

preserveAspectRatio属性的值为空格分隔的两个值组合而成。例如，上面的xMidYMid和meet.

第1个值表示，viewBox如何与SVG viewport对齐；第2个值表示，如何维持高宽比（如果有）。

其中，第1个值又是由两部分组成的。前半部分表示x方向对齐，后半部分表示y方向对齐。家族成员如下:

值    | 含义
---- | --------------------------------
xMin | viewport 和 viewBox左边对齐
xMid | viewport和viewBox x轴中心对齐
xMax | viewport和viewBox右边对齐
YMin | viewport和viewBox上边缘对齐。注意Y是大写
YMid | viewport和viewBox y轴中心点对齐。注意Y是大写。
YMax | viewport和viewBox下边缘对齐。注意Y是大写。

x, y自由合体就可以了，如：

```
xMaxYMax

xMidYMid
```

preserveAspectRatio属性第2部分的值支持下面3个： |值 | 含义| |--|----| |meet|保持纵横比(viewBox的)缩放viewBox适应viewport| |slice|保持纵横比同时比例小的方向放大填满viewport| |none|扭曲纵横比以充分适应viewport|

**关于slice** slice也是要保持viewBox的纵横比的，不过，其作用是尽量填满viewport。 同样，这里viewBox宽度200，SVG的width是400. 显然，要想最大化充满，viewBox的宽度就需要扩大为原来的两倍。于是，就有了上图viewBox放大两倍后的效果截图。由于viewBox部分区域超出了viewport, 视区之外内容是不可见的，于是就出现了slice所表意的"剪切"效果。

**关于none** 如果是none, 则表示不关心比例，viewBox直接拉伸到最大填满viewport

无论是meet还是slice，你是不可能在一种状态下同时看到x, y方向上的位移的。因为总会有一个方向是充满viewport的。

### SVG坐标系统
理解了一SVG的viewport之后，我们来深入了解SVG的从标系统。SVG的坐标系统分为三种类型：
- 最初坐标系统
- 嵌套坐标系统
- 转换坐标系统

#### 最初坐标系统
SVG的最初坐标签系统和viewport的坐标系统是相同的，都是在左上角原点处，沿y轴向下和x轴向右延伸。也就是说，SVG的坐标系统类似于Viewport的坐标系统，原点(0,0)在左上角处，不管使用单位还是不使用单位，其都是沿y轴向下垂直延伸，沿x轴向右延伸。如下图所示：

![svg](./img/svg-21.jpg)

假设你有一个SVG:

```html
<svg width="300" height="300">
</svg>
```

那么这个SVG的大小是300*300，其是由坐标(0,0)、(300，0)、(300,300)和(0,300)组成的一个矩形画布

另外，`<svg>`设置了Viewport的具体单位，并不会影响坐标没有单位的子元素。比如下面的示例，`<svg>`的Viewport设置了单位为mm，但矩形`<rect>`绘制还是按像素的坐标在绘制。

即使SVG的Viewport没有设置具体的单位，`<svg>`中的图形元素(比如`<rect>`、`<line>`等)也可以设置具体的单位值,比如:

```html
<svg width="300" height="300">
  <rect x="20" y="20" width="50mm" height="50mm" style="stroke: #f36; fill: rgba(123,123,23,.5);"/>
</svg>
```

#### 嵌套坐标系统
在`<svg>`元素中可以嵌套`<svg>`元素。外面的`<svg>`创建一个Viewport和坐标系统，而且嵌套在里面的`<svg>`也可以创建一个Viewport和坐标系统。这种方式就是在大的画布中绘制一个小的画布.

而不是先绘制矩形，然后绘制圆形，再调整圆形到指定的位置，我们只需采取以下步骤：
- 首先创建一个`<svg>`，用于绘制外面的大画布
- 在外面的`<svg>`里使用`<rect>`绘制一个蓝色矩形
- 在`<svg>`中嵌套一个`<svg>`，并且给里面的`<svg>`设置适当的`preserveAspectRatio`属性
- 在里面的`<svg>`中使用`<circle>`绘制一个圆

这个简单的示例典型向大家阐述了SVG中嵌套的坐标系统。接下来，花点时间来阐述这个过程：

首先使用<svg>创建了一个主画布，并且使用<circle>在这个画布中绘制了一个圆：

```html
<svg width="600px" height="300px" viewBox="0 0 250 250">
  <circle cx="35" cy="35" r="35" style="stroke: black; fill: none;"/>
</svg>
```

接下来使用`<rect>`在主画布`<svg>`中绘制了一个蓝色矩形：

```html
<svg width="600px" height="300px" viewBox="0 0 250 250">
  <circle cx="35" cy="35" r="35" style="stroke: black; fill: none;"/>
  <rect x="150" y="50" width="200" height="100" style="stroke: blue; fill: none;"/>
</svg>
```

现在添加一个`<svg>`元素，并且交这个`<svg>`元素嵌套在前一个`<svg>`元素中，同时给其指定viewBox、width、height和preserveAspectRatio属性值。你还可以为其指定x和y属性值（如果不显式的声明x和y属性值，将默认其值为0）。从而生成一个新的Viewport。

```html
<svg width="600px" height="300px" viewBox="0 0 250 250">
  <circle cx="35" cy="35" r="35" style="stroke: black; fill: none;"/>
  <rect x="150" y="50" width="200" height="100" style="stroke: blue;
        fill: none;"/>
  <svg x="150px" y="50px" width="200px" height="100px" viewBox="0 0 125 125" preserveAspectRatio="xMaxYMax meet">
  </svg>
</svg>
```

效果如下： ![svg-in](./img/svg-in.jpg)

从效果中看不到任何的变化，其实在上面的代码中，将内嵌的<svg>与<rect>重叠在一起。

建立这种嵌套的`<svg>`元素的新坐标，仅从视觉上并看不出任何的不一样，但它允许你添加新的元素，比如这个示例中，在里面添加一个`<circle>`，就能立马体会到其不一样的好处了：

```html
<svg width="600px" height="300px" viewBox="0 0 250 250">
  <circle cx="35" cy="35" r="35" style="stroke: black; fill: none;"/>
  <rect x="150" y="50" width="200" height="100" style="stroke: blue;
        fill: none;"/>
  <svg x="150px" y="50px" width="200px" height="100px" viewBox="0 0 125 125" preserveAspectRatio="xMaxYMax meet">
    <circle cx="35" cy="35" r="35" style="stroke: black; fill: rgba(0,0,0,.5);"/>
  </svg>
</svg>
```

最终效果如下：

![svg-in](./img/svg-in1.jpg)

#### 转换坐标系统
转换坐标系统比前面介绍的最初坐标系统，嵌套坐标系统要复杂的多，里面还涉及到数学矩阵相关知识，暂时不讲。

#### 总结
文章主要介绍了SVG的坐标系统相关知识，详细介绍了SVG中的最初坐标系统和嵌套坐标系统。其实除了这两个坐标系统之外还有一个转换坐标系统，而这个坐标系统在制作SVG相关动画效果起着相当关键作用。所以也是学习SVG知识必可不可缺的一部分。但在这篇文章并没有以过多的篇幅来阐述相关知识，因为后面将专门用一篇文章来阐述SVG中的变换坐标系统。

## SVG之W3c教程
### <rect>
`<rect>` 标签可用来创建矩形，以及矩形的变种。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect width="300" height="100"
style="fill:rgb(0,0,255);stroke-width:1;
stroke:rgb(0,0,0)"/>

</svg>
```

- rect 元素的 width 和 height 属性可定义矩形的高度和宽度
- style 属性用来定义 CSS 属性
- CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
- CSS 的 stroke-width 属性定义矩形边框的宽度
- CSS 的 stroke 属性定义矩形边框的颜色

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect x="20" y="20" width="250" height="250"
style="fill:blue;stroke:pink;stroke-width:5;
fill-opacity:0.1;stroke-opacity:0.9"/>

</svg>
```

- x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
- y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
- CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
- CSS 的 stroke-opacity 属性定义笔触颜色的透明度（合法的范围是：0 - 1）

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect x="20" y="20" width="250" height="250"
style="fill:blue;stroke:pink;stroke-width:5;
opacity:0.9"/>

</svg>
```

- CSS 的 opacity 属性定义整个元素的透明值（合法的范围是：0 - 1）

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<rect x="20" y="20" rx="20" ry="20" width="250"
height="100" style="fill:red;stroke:black;
stroke-width:5;opacity:0.5"/>

</svg>
```

- rx 和 ry 属性可使矩形产生圆角。

### <circle>
`<circle>` 标签可用来创建一个圆。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<circle cx="100" cy="50" r="40" stroke="black"
stroke-width="2" fill="red"/>

</svg>
```

- cx 和 cy 属性定义圆点的 x 和 y 坐标。如果省略 cx 和 cy，圆的中心会被设置为 (0, 0)
- r 属性定义圆的半径。

### <ellipse>
`<ellipse>` 标签可用来创建椭圆。椭圆与圆很相似。不同之处在于椭圆有不同的 x 和 y 半径，而圆的 x 和 y 半径是相同的。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<ellipse cx="300" cy="150" rx="200" ry="80"
style="fill:rgb(200,100,50);
stroke:rgb(0,0,100);stroke-width:2"/>

</svg>
```

- cx 属性定义圆点的 x 坐标
- cy 属性定义圆点的 y 坐标
- rx 属性定义水平半径
- ry 属性定义垂直半径

### <line>
`<line>` 标签用来创建线条。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<line x1="0" y1="0" x2="300" y2="300"
style="stroke:rgb(99,99,99);stroke-width:2"/>

</svg>
```

- x1 属性在 x 轴定义线条的开始
- y1 属性在 y 轴定义线条的开始
- x2 属性在 x 轴定义线条的结束
- y2 属性在 y 轴定义线条的结束

### <polygon>
`<polygon>` 标签用来创建含有不少于三个边的图形。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polygon points="220,100 300,210 170,250"
style="fill:#cccccc;
stroke:#000000;stroke-width:1"/>

</svg>
```

- points 属性定义多边形每个角的 x 和 y 坐标

### <polyline>
`<polyline>` 标签用来创建仅包含直线的形状。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<polyline points="0,0 0,20 20,20 20,40 40,40 40,60"
style="fill:white;stroke:red;stroke-width:2"/>

</svg>
```

### <path>
`<path>` 标签用来定义路径。

下面的命令可用于路径数据：
- M = moveto移至
- L = lineto线
- H = horizontal lineto水平线
- V = vertical lineto垂直线
- C = curveto曲线
- S = smooth curveto光滑的曲线
- Q = quadratic Belzier curve二次曲线belzier
- T = smooth quadratic Belzier curveto二次belzier光滑曲线
- A = elliptical Arc椭圆弧
- Z = closepath关闭路径

**注释：** 以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<path d="M250 150 L150 350 L350 350 Z" />

</svg>
```

上面的例子定义了一条路径，它开始于位置 250 150，到达位置 150 350，然后从那里开始到 350 350，最后在 250 150 关闭路径

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<path d="M153 334
C153 334 151 334 151 334
C151 339 153 344 156 344
C164 344 171 339 171 334
C171 322 164 314 156 314
C142 314 131 322 131 334
C131 350 142 364 156 364
C175 364 191 350 191 334
C191 311 175 294 156 294
C131 294 111 311 111 334
C111 361 131 384 156 384
C186 384 211 361 211 334
C211 300 186 274 156 274"
style="fill:white;stroke:red;stroke-width:2"/>

</svg>
```

很复杂吧？是的！！！由于绘制路径的复杂性，因此强烈建议您使用 SVG 编辑器来创建复杂的图形。

### 滤镜
必须在 `<defs>` 标签中定义 SVG 滤镜。

#### 高斯模糊（Gaussian Blur）
`<filter>` 标签用来定义 SVG 滤镜。`<filter>` 标签使用必需的 id 属性来定义向图形应用哪个滤镜？

`<filter>` 标签必须嵌套在 <defs> 标签内。<defs> 标签是 definitions 的缩写，它允许对诸如滤镜等特殊元素进行定义。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<filter id="Gaussian_Blur">
<feGaussianBlur in="SourceGraphic" stdDeviation="3" />
</filter>
</defs>

<ellipse cx="200" cy="150" rx="70" ry="40"
style="fill:#ff0000;stroke:#000000;
stroke-width:2;filter:url(#Gaussian_Blur)"/>

</svg>
```

- <filter> 标签的 id 属性可为滤镜定义一个唯一的名称（同一滤镜可被文档中的多个元素使用）
- filter:url 属性用来把元素链接到滤镜。当链接滤镜 id 时，必须使用 # 字符
- 滤镜效果是通过 <feGaussianBlur> 标签进行定义的。fe 后缀可用于所有的滤镜
- <feGaussianBlur> 标签的 stdDeviation 属性可定义模糊的程度
- in="SourceGraphic" 这个部分定义了由整个图像创建效果

### 渐变
SVG 渐变必须在 <defs> 标签中进行定义。

渐变是一种从一种颜色到另一种颜色的平滑过渡。另外，可以把多个颜色的过渡应用到同一个元素上。

在 SVG 中，有两种主要的渐变类型：
- 线性渐变
- 放射性渐变

#### 线性渐变
`<linearGradient>` 可用来定义 SVG 的线性渐变。

`<linearGradient>` 标签必须嵌套在 `<defs>` 的内部。`<defs>` 标签是 definitions 的缩写，它可对诸如渐变之类的特殊元素进行定义。

线性渐变可被定义为水平、垂直或角形的渐变：
- 当 y1 和 y2 相等，而 x1 和 x2 不同时，可创建水平渐变
- 当 x1 和 x2 相等，而 y1 和 y2 不同时，可创建垂直渐变
- 当 x1 和 x2 不同，且 y1 和 y2 不同时，可创建角形渐变

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<linearGradient id="orange_red" x1="0%" y1="0%" x2="100%" y2="0%">
<stop offset="0%" style="stop-color:rgb(255,255,0);
stop-opacity:1"/>
<stop offset="100%" style="stop-color:rgb(255,0,0);
stop-opacity:1"/>
</linearGradient>
</defs>

<ellipse cx="200" cy="190" rx="85" ry="55"
style="fill:url(#orange_red)"/>

</svg>
```

- `<linearGradient>` 标签的 id 属性可为渐变定义一个唯一的名称
- fill:url(#orange_red) 属性把 ellipse 元素链接到此渐变
- `<linearGradient>` 标签的 x1、x2、y1、y2 属性可定义渐变的开始和结束位置
- 渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 `<stop>` 标签来规定。offset 属性用来定义渐变的开始和结束位置。

### 放射性渐变
`<radialGradient>` 用来定义放射性渐变。

`<radialGradient>` 标签必须嵌套在 `<defs>` 中。`<defs>` 标签是 definitions 的缩写，它允许对诸如渐变等特殊元素进行定义。

```html
<?xml version="1.0" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN"
"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">

<svg width="100%" height="100%" version="1.1"
xmlns="http://www.w3.org/2000/svg">

<defs>
<radialGradient id="grey_blue" cx="50%" cy="50%" r="50%"
fx="50%" fy="50%">
<stop offset="0%" style="stop-color:rgb(200,200,200);
stop-opacity:0"/>
<stop offset="100%" style="stop-color:rgb(0,0,255);
stop-opacity:1"/>
</radialGradient>
</defs>

<ellipse cx="230" cy="200" rx="110" ry="100"
style="fill:url(#grey_blue)"/>

</svg>
```

`<radialGradient>` 标签的 id 属性可为渐变定义一个唯一的名称，fill:url(#grey_blue) 属性把 ellipse 元素链接到此渐变，cx、cy 和 r 属性定义外圈，而 fx 和 fy 定义内圈 渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个 `<stop>` 标签来规定。offset 属性用来定义渐变的开始和结束位置。

## 在线编辑器
[http://www.zhangxinxu.com/sp/svg/](http://www.zhangxinxu.com/sp/svg/)

## 延伸学习
[http://www.zhangxinxu.com/wordpress/page/2/?s=svg](http://www.zhangxinxu.com/wordpress/page/2/?s=svg)
