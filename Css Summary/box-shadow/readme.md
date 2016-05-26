# Box shadow
## 语法

```
E {box-shadow: <length> <length> <length>?<length>?||<color>}
也就是：
E {box-shadow:inset x-offset y-offset blur-radius spread-radius color}
换句说：
对象选择器 {box-shadow:投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色}
```

box-shadow和text-shadow一样可以使用一个或多个投影，如果使用多个投影时必须需要用逗号"，"分开。

## 取值
box-shadow属性至多有6个参数设置，他们分别取值：
- **阴影类型：** 此参数是一个可选值，如果不设值，其默认的投影方式是外阴影；如果取其唯一值"inset",就是将外阴影变成内阴影，也就是说设置阴影类型为"inset"时，其投影就是内阴影；
- **X-offset:** 是指阴影水平偏移量其值可以是正负值可以取正负值，如果值为正值，则阴影在对象的右边，反之其值为负值时，阴影在对象的左边；
- **Y-offset:** 是指阴影的垂直偏移量，其值也可以是正负值，如果为正值，阴影在对象的底部，反之其值为负值时，阴影在对象的顶部；
- **阴影模糊半径：** 此参数是可选，，但其值只能是为正值，如果其值为0时，表示阴影不具有模糊效果，其值越大阴影的边缘就越模糊；
- **阴影扩展半径：** 此参数可选，其值可以是正负值，如果值为正，则整个阴影都延展扩大，反之值为负值是，则缩小
- **阴影颜色：此参** 数可选，如果不设定任何颜色时，浏览器会取默认色，但各浏览器默认色不一样，特别是在webkit内核下的safari和chrome浏览器将无色，也就是透明，建议不要省略此参数。

## 兼容(不考虑IE)

```
//Firefox4.0-
-moz-box-shadow: 投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色;
//Safari and Google chrome10.0-
-webkit-box-shadow: 投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色;
//Firefox4.0+ 、 Google chrome 10.0+ 、 Oprea10.5+ and IE9
box-shadow:  投影方式 X轴偏移量 Y轴偏移量 阴影模糊半径 阴影扩展半径 阴影颜色;
```

## 工作原理
非零值的border-radius将会以相同的作用影响阴影的外形，但border-image不会影响对象阴影的任何外形；对象阴影同box模型的层次一样，外阴影会在对象背景之下，内阴影会在边框之下背景之上。所以整个层级就是：边框>内阴影>背景图片>背景颜色>外阴影。因为大家都知道，我们的背景图片是在背景颜色之上的。

## IE滤镜方法
IE9以下是不支持CSS3的box-shadow的，但为了处理这个兼容问题，我们可以在IE下使用IE的shadow阴影滤镜来实现

```
 filter: progid:DXImageTransform.Microsoft.Shadow(color=’颜色值’, Direction=阴影角度（数值）, Strength=阴影半径（数值）);
```

```css
div {
          filter:
              progid:DXImageTransform.Microsoft.Shadow(color=#eeeeee,direction=0,strength=7)
              progid:DXImageTransform.Microsoft.Shadow(color=#dddddd,direction=90,strength=10)
              progid:DXImageTransform.Microsoft.Shadow(color=#dddddd,direction=180,strength=10)
              progid:DXImageTransform.Microsoft.Shadow(color=#eeeeee,direction=270,strength=7);
      }
```

使用滤镜来实现IE下的效果，基中"color"为阴影色，"direction"是阴影方向，"strength"是阴影强度。_特别注意，颜色"#eeeeee"在此处不能写成"#eee"，不然会无效果_。

**注意：该滤镜必须配合background属性一起使用，否则该滤镜失效。**

## 效果
基本样式

```css
.demo{
  width:100px;
  height: 50px;
  background: #f69;
}
```

### 效果一:单边效果

```css
.dome2 {
  box-shadow: -2px 0 0 green, //左边阴影
  0 -2px 0 blue, //顶部阴影
  0 2px 0 red, //底部阴影
  2px 0 0 yellow; //右边阴影
}
```

### 效果二：四边具有相同的阴影效果（只设置阴影模糊半径和阴影颜色）

```css
.demo7 {
  box-shadow: 0 0 5px rgb(250,0,0);
}
```

### 效果三：四边具有相同的阴影（只设置阴影扩展半径和阴影颜色）

```css
.demo9 {
  box-shadow: 0 0 0 1px red;
 }
```

### 给body顶部增加一个阴影

```css
body:before {
  content:"";
  position:fixed;
  top: -10px;
  left: 0;
  width: 100%;
  height: 10px;
  z-index: 999;
  box-shadow: 0 0 10px rgba(125,255,125,0.8);
}
```

### Drop-shadow效果
#### 原理
通过box-shadow实现drop shadow效果是仅用一个div标签元素，然后配合其两个伪元素":before"和":after"；然后我们分别给其伪元素定位到div的后面，并把box-shadow应用到这两个伪元素上

#### html

```html
<div class="drop-shadow">drop shadow effect</div>
```

#### 基本样式

```css
.drop-shadow {
    width: 300px;
    height: 150px;
    position: relative;
    background: #ccc;        
 }
```

#### 给drop-shadow的“:before”和":after"定位到drop-shadow下面

```css
.drop-shadow:before,
.drop-shadow:after{
  content:'';
  position: absolute;
  z-index: -1;
  bottom: 15px;
  left:10px;
  width:50%;
  height: 20%;
}
```

#### 给drop-shadow的":before"和":after"加上阴影效果

```css
.drop-shadow:before,
 .drop-shadow:after {
     content: "";
     position: absolute;
     z-index: -1;
     bottom: 15px;
     left: 10px;
     width: 50%;
     height: 20%;
     /*add box-shadow*/
     -webkit-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
     -moz-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
     box-shadow: 0 15px 10px rgba(125,125,125,0.8);
  }
```

#### 通过应用css3 transforms来实现另一边的效果

```css
.drop-shadow:before,
.drop-shadow:after {
   content: "";
   position: absolute;
   z-index: -1;
   bottom: 15px;
   left: 10px;
   width: 50%;
   height: 20%;
   /*add box-shadow*/
   -webkit-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
   -moz-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
   box-shadow: 0 15px 10px rgba(125,125,125,0.8);
   /*add css3 transform*/
   -webkit-transform: rotate(-3deg);
   -moz-transform: rotate(-3deg);
   -o-transform: rotate(-3deg);
   transform: rotate(-3deg);
}
```

#### 改变":after"伪元素定位方向

```css
.drop-shadow:after {
    right:10px;
    left: auto;
    -webkit-transform:rotate(3deg);
    -moz-transform:rotate(3deg);
    -o-transform:rotate(3deg);
    transform:rotate(3deg);
  }
```

#### Drop shadow最终核心代码如下所示

```css
.drop-shadow {
    width: 300px;
    height: 150px;
    position: relative;
    background: #ccc;
    margin-left: 100px;       
  }

  .drop-shadow:before,
  .drop-shadow:after {
    content: "";
    position: absolute;
    z-index: -1;
    bottom: 15px;
    left: 10px;
    width: 50%;
    max-width: 150px;
    height: 20%;
    /*add box-shadow*/
    -webkit-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
    -moz-box-shadow: 0 15px 10px rgba(125,125,125,0.8);
    box-shadow: 0 15px 10px rgba(125,125,125,0.8);
    /*add css3 transform*/
    -webkit-transform: rotate(-3deg);
    -moz-transform: rotate(-3deg);
    -o-transform: rotate(-3deg);
    transform: rotate(-3deg);
  }
  .drop-shadow:after {
    right:10px;
    left: auto;
    -webkit-transform:rotate(3deg);
    -moz-transform:rotate(3deg);
    -o-transform:rotate(3deg);
    transform:rotate(3deg);
 }
```
