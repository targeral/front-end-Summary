# CSS3 Meida Queries
## Media Type(媒体类型) and Media Query(媒体特性)
*Media Type*

可以通过媒体类型对不同的设备应用不同的样式，常见的类型有:all(全部),screen(屏幕),print(页面打印或打邱预览模式)

w3c共有10种媒体类型:

* all
* braille(用于盲人触觉反馈装置。)
* embossed(Intended for paged braille printers.)
* handheld(手持设备)
* print
* projection(投影仪)
* screen
* speech(用于语音合声器)
* tty(固定间距字符网格媒体)
* tv

引入方式:

1. link方式

```html
<link rel="stylesheet" type="text/css" href="../css/print.css" media="print">
```

2. xml方式

```xml
<?xml-stylesheet rel="stylesheet" media="screen" href="css/style.css" ?>
```

3. @import方式
@import引入有两种方式:

* 一种是在样式文件中通过@import调用别一个样式文件；
* 另一种方法是在<head></head>中的<style>...</style>中引入，单这种使用方法在ie6-7都不被支持 如:

```css
@import url("css/reset.css") screen;
@import url("css/print.css") print;
```

```html
<head>
    <style>
        @import url("css/style.css") all;
    </style>
</head>
```

4. @media方式引入

```css
@media screen {
    selector{
        attr : value
    }
}
```

```html
<head>
    <style>
        @media screen{
            attr : value
        }
    </style>
</head>
```

**小总结:使用第一种和第四种方式引入，是项目中常用的方式**

*Media Query*

Media Query是CSS3 对Media Type的增强版，其实可以将Media Query看成Media Type(判断条件)+CSS(符合条件的样式规则)，常用的特性w3c共列出来13种：

* color value:=整数 min/max:=yes 每种色彩的字节数
* color-index value:=整数 min/max:=yes 色彩表中的色彩数
* device-aspect-ratio value:=整数/整数 min/max:=yes 宽高比例
* device-height value:=length min/max:=yes 设备屏幕的输出高度
* device-width value:=length min/max:=yes 设备屏幕的输出宽度
* grid value:=整数 min/max:=no 是否是基于格栅的设备
* height value:=length min/max:=yes 渲染界面的高度
* monochrome value:=整数 min/max:=yes 单色帧缓冲器中每像素字节
* resolution value:=分辨率("dpi/dpcm") min/max:=yes 分辨率
* scan value:=Progressive interlaced min/max:=no tv媒体类型的扫描方式
* width value:=length min/max:=yes 渲染界面的宽度
* orientation value:=Portrait/landspace min/max:=no 横屏或竖屏

使用:
1. 最大宽度Max Width(小于等于)

```html
<link rel="stylesheet" href="small.css" type="text/css" media="screen and (max-width:600px)" />
```

2. 最小宽度Min Width(大于等于)

```html
<link rel="stylesheet" href="big.css" media="screen and (min-width:900px)">
```

3. 多个Media Queries使用

```html
<link rel="stylesheet" href="style.css" media="screen and (max-width:600px) and (min-width:900px)">
```

4. 设备屏幕的输出宽度Device Width

```html
<link rel="stylesheet" href="iphone.css" media="screen and (max-device-width: 480px)">
```

应用:

* iPhone和Smartphones上的运用

```css
/* iPhone and Smartphones (portrait and landscape) */
        @media screen and (min-device-width : 320px) and (max-device-width: 480px) {
            /*style*/
        }
```

* iPads上的运用

```css
/* iPads (landscape) */
@media screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
    /*你的样式放在这里...*/
}
/* iPads (portrait) */
@media screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
    /*你的样式放在这里...*/
}
```

5. iPhone4

```html
<link rel="stylesheet" href="iphone4.css" media="only screen and (-webkit-min-device-pixel-ratio: 2)">
```

上面的样式是专门针对iPhone4的移动设备写的。

6. iPad

```html
<link rel="stylesheet" href="portrait.css" media="all and (orientation:portrait)" />
<link rel="stylesheet" href="landscape.css" media="all and (orientation:landscape)" />
```

在大数情况下，移动设备iPad上的Safari和在iPhone上的是相同的，只是他们不同之处是iPad声明了不同的方向，比如说上面的例子，在纵向(portrait)时采用portrait.css来渲染页面；在横向（landscape）时采用landscape
.css来渲染页面。

7. android

```html
/*240px的宽度*/
<link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />
/*360px的宽度*/
<link rel="stylesheet" media="only screen and (min-device-width:241px) and (max-device-width:360px)" href="android360.css" type="text/css" />
/*480px的宽度*/
<link rel="stylesheet" media="only screen and (min-device-width:361px) and (max-device-width:480px)" href="android480.css" type="text/css" />
```

8. not关键字

```html
<link rel="stylesheet" href="print.css" media="not print and (max-width: 1200px)">
```

not关键字是用来排除某种制定的媒体类型，换句话来说就是用于排除符合表达式的 *设备*。

9. only关键字

```html
<link rel="stylesheet" media="only screen and (max-device-width:240px)" href="android240.css" type="text/css" />
```

only用来定某种特定的媒体类型，*可以用来排除不支持媒体查询的浏览器*。其实only很多时候是用来对那些不支持Media Query但却支持Media Type的设备隐藏样式表的。

其主要有：支持媒体特性（Media Queries）的设备，正常调用样式，此时就当only不存在；对于不支持媒体特性(Media Queries)但又支持媒体类型(Media Type)的设备，这样就会不读了样式，因为其先读only而不是screen；另外不支持Media Qqueries的浏览器，不论是否支持only，样式都不会被采用。

10. 其他

在Media Query中如果没有明确指定Media Type，那么其默认为all，如：

```html
<link rel="stylesheet" media="(min-width: 701px) and (max-width: 900px)" href="medium.css" type="text/css" />
```

另外还有使用逗号（，）被用来表示并列或者表示或，如下

```html
<link rel="stylesheet" type="text/css" href="style.css" media="handheld and (max-width:480px), screen and (min-width:960px)" />
```

上面代码中style.css样式被用在宽度小于或等于480px的手持设备上，或者被用于屏幕宽度大于或等于960px的设备上。

## 实例
### CSS3 Media Queries案例——Hicksdesign

原文地址:http://www.w3cplus.com/css3/media-queries-hicksdesign

总结:
1. 首先应用固定布局转换成流体布局，以适应不同分辨率下的比例，更好的适应不同分辨率用户使用；
然后结合CSS Media Query在不同的媒体类型和媒体特性下构造不同的样式，
从而达到在不同分辨率下显示不同风格的页面效果。

2. 图片随比例变化而变化的方式,其主要实现的代码是宽度使用了100％而高度是auto:

```css
/*小屏幕*/
.icon img{
    height:auto;
    width:100%;
}

/*大屏幕*/
.icon img{
    width:auto;
    height:auto
}
```

### CSS Media Queries案例——A List Apart

原文地址:http://www.w3cplus.com/css3/media-queries-alistpart

### CSS3 Media Queries案例——Tee Gallery

原文地址:http://www.w3cplus.com/css3/media-queries-tee-gallery

### Responsive设计和CSS3 Media Queries的结合

原文地址:http://www.w3cplus.com/css3/responsive-design-with-css3-media-queries

*知识点1*
屏幕分辨率范围：*320px至2560px* 不等。

*知识点2*
通常的做法:

对于显屏大于1024px宽度来说，我们常常是将页面的容器设置为980px。其实我们可以使用CSS3的Media Queries来检查浏览器可视窗口的大小。**当显屏的可视窗口小于980px时，我们布局不在采用固定宽度而将采用流体宽度布局来替代；如果显屏可视窗口的宽度小于650px时，我们主内容宽度和边栏宽度都将变成全屏，并一列显示出来**

*知识点3*

**html5.js**,html5很多标签在IE6-8中是无法识别的，为兼容这些新的元素，需要在ＩＥ6-8加载一个html5.js。
虽然ie6，ie7微软已经不维护，但是ie8还是要去关注一下的:

```html
<!--[if lt IE 9]>
        <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
```

同理，Media Queries是CSS3的一个属性，所以也要像上面一样，导入一个 **css3-mediaqueries.js** 的JavaScript的脚步文件。

```html
<!--[if lt IE 9]>
        <script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
    <![endif]-->
```

*知识点4*

对于显屏可视化窗口小于480px（智能手机布局），例如要适合iPhone的样式布局。要注意:

* HTML:禁用文字大小调整。默认情况之下，iPhone的文字大小是可以缩放的，我们可以在html加上一个“-webkit-text-size-adjust: none;”来禁止其缩放。

* 灵活的缩放图片：这里涉及到一个图片缩放的问题，也就是说图片也要能跟随你的显屏大小，成比例的缩放。
实现方式是在img标签中加入:

```css
img{
    max-width:100%;
    height:auto;
}
```

由于max-width在IE的某些版本中无法识别，为了兼容这些浏览器，可以考虑这样使用：

```css
img{
    max-width:100%:
    width:100%;
    height:auto;
}
```

* 灵活的嵌入式视频：为了使嵌入式的视频灵活，我们也可以根据上面的方法来使用，但对于embed元素在safari下的不支持max-width属性，那么我们可以改用下面的方法来替代：

```css
.video embed,
.video object,
.video iframe{
    width:100%;
    height:auto;
}
```

* iPhone的meta标签：为了让iPhone的safari浏览器缩小页面能适应其屏幕大小，我们可以在head中使用这个meta标签：

```html
<meta name="viewport" content="width=device-width;initial-scale=1.0">
```

## CSS3 Media Queries模板

1. 1024px显屏

```css
@media screen and (max-width : 1024px) {
    /* CSS Styles */
}
```

2. 800px显屏

```css
@media screen and (max-width : 800px) {
    /* CSS Styles */
}
```

3. 640px显屏

```css
@media screen and (max-width : 640px) {
    /* CSS Styles */
}
```

4. Smartphones (portrait and landscape)

```css
@media only screen and (min-device-width : 320px) and (max-device-width : 480px) {
    /* Styles */
}
```

5. Smartphones (landscape)

```css
@media only screen and (min-width : 321px) {
    /* Styles */
}
```

6. Smartphones (portrait)

```css
@media only screen and (max-width : 320px) {
    /* Styles */
}
```

7. iPads (portrait and landscape)

```css
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) {
    /* Styles */
}
```

8. iPads (landscape)

```css
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : landscape) {
    /* Styles */
}
```

9. iPads (portrait)

```css
@media only screen and (min-device-width : 768px) and (max-device-width : 1024px) and (orientation : portrait) {
    /* Styles */
}
```

10. iPhone 4

```css
@media only screen and (-webkit-min-device-pixel-ratio : 1.5),only screen and (min-device-pixel-ratio : 1.5) {
    /* Styles */
}
```

11. Desktops and laptops

```css
@media only screen and (min-width : 1224px) {
    /* Styles */
}
```

12. Large screens

```css
@media only screen and (min-width : 1824px) {
    /* Styles */
}
```

13. 更新 

```css
@media only screen and (min-width: 320px) {

  /* Small screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 320px),
only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 320px),
only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 320px),
only screen and (        min-device-pixel-ratio: 2)      and (min-width: 320px),
only screen and (                min-resolution: 192dpi) and (min-width: 320px),
only screen and (                min-resolution: 2dppx)  and (min-width: 320px) { 

  /* Small screen, retina, stuff to override above media query */

}

@media only screen and (min-width: 700px) {

  /* Medium screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 700px),
only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 700px),
only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 700px),
only screen and (        min-device-pixel-ratio: 2)      and (min-width: 700px),
only screen and (                min-resolution: 192dpi) and (min-width: 700px),
only screen and (                min-resolution: 2dppx)  and (min-width: 700px) { 

  /* Medium screen, retina, stuff to override above media query */

}

@media only screen and (min-width: 1300px) {

  /* Large screen, non-retina */

}

@media
only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 1300px),
only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 1300px),
only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 1300px),
only screen and (        min-device-pixel-ratio: 2)      and (min-width: 1300px),
only screen and (                min-resolution: 192dpi) and (min-width: 1300px),
only screen and (                min-resolution: 2dppx)  and (min-width: 1300px) { 

  /* Large screen, retina, stuff to override above media query */

}
```

更多:http://www.w3cplus.com/css3/css3-media-queries-for-iPhone-and-iPads
    http://www.w3cplus.com/css3/css-media-queries-for-iPads-and-iPhones.html
    http://www.w3cplus.com/css3/media-query-snippets.html