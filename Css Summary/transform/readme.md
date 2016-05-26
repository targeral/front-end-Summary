# Transform
Transform字面上就是变形，改变的意思。在CSS3中transform主要包括以下几种：旋转rotate、扭曲skew、缩放scale和移动translate以及矩阵变形matrix。

## 语法

```
transform ： none | <transform-function> [ <transform-function> ]*
   也就是：
   transform: rotate | scale | skew | translate |matrix;
```

none:表示不进么变换；<transform-function>表示一个或多个变换函数，以空格分开；换句话说就是我们同时对一个元素进行transform的多种属性操作，例如rotate、scale、translate三种，但这里需要提醒大家的，以往我们叠加效果都是用逗号（"，"）隔开，但transform中使用多个属性时却需要有空格隔开。_大家记住了是空格隔开。_

## 取值
transform属性实现了一些可用SVG实现的同样的功能。它可用于内联(inline)元素和块级(block)元素。它允许我们旋转、缩放和移动元素 ，他有几个属性值参数：rotate;translate;scale;skew;matrix。下面我们分别来介绍这几个属性值参数的具体使用方法：

### 旋转rotate
rotate(<angle>) ：通过指定的角度参数对原元素指定一个2D rotation（2D 旋转），_需先有transform-origin属性的定义。_

transform-origin定义的是旋转的基点，其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。如：transform:rotate(30deg):

### 移动translate
移动分为三种情况:
- translate(x, y)
- translateX(x)
- translateY(y)

**注意:其基点默认为元素 中心点，也可以根据transform-origin进行改变基点**

### 缩放scale
缩放分为三种情况：
- scale(x, y)
- scaleX(x)
- scaleY(y)

它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，缩放基数为1，如果其值大于1元素就放大，反之其值小于1，元素缩小。

### 扭曲skew
同上:
- skew(angle, angle)
- skewX(angle)
- skewY(angle)

同样是以元素中心为基点，我们也可以通过transform-origin来改变元素的基点位置。

### 矩阵matrix
matrix(<number>, <number>, <number>, <number>, <number>, <number>) ： 以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素,此属性值使用涉及到数学中的矩阵

## 改变元素基点transform-origin
作用就是让我们在进行transform动作之前可以改变元素的基点位置，因为我们元素默认基点就是其中心位置，换句话说我们没有使用transform-origin改变元素基点位置的情况下，transform进行的rotate,translate,scale,skew,matrix等操作都是以元素自己中心位置进行变化的。但有时候我们需要在不同的位置对元素进行这些操作，那么我们就可以使用transform-origin来对元素进行基点位置改变，使元素基点不在是中心位置，以达到你需要的基点位置。

### 取值
ransform-origin(X,Y):用来设置元素的运动的基点（参照点）。默认点是元素的中心点。其中X和Y的值可以是百分值,em,px，其中X也可以是字符参数值left,center,right；Y和X一样除了百分值外还可以设置字符值top,center,bottom，这个看上去有点像我们background-position设置一样；
1. top left | left top 等价于 0 0 | 0% 0%
2. top | top center | center top 等价于 50% 0
3. right top | top right 等价于 100% 0
4. left | left center | center left 等价于 0 50%
5. center | center center 等价于 50% 50%（默认值）
6. right | right center | center right 等价于 100% 50%
7. bottom left | left bottom 等价于 0 100% | 0% 100%
8. bottom | bottom center | center bottom 等价于 50% 100%
9. bottom right | right bottom 等价于 100% 100%

## 兼容
### transform-origin

```
//Mozilla内核浏览器：firefox3.5+
-moz-transform-origin: x y;
//Webkit内核浏览器：Safari and Chrome
-webkit-transform-origin: x y;
//Opera
-o-transform-origin: x y ;
//IE9
-ms-transform-origin: x y;
//W3C标准
transform-origin: x y ;
```

### transform

```
/Mozilla内核浏览器：firefox3.5+
  -moz-transform: rotate | scale | skew | translate ;
 //Webkit内核浏览器：Safari and Chrome
  -webkit-transform: rotate | scale | skew | translate ;
 //Opera
  -o-transform: rotate | scale | skew | translate ;
 //IE9
  -ms-transform: rotate | scale | skew | translate ;
 //W3C标准
  transform: rotate | scale | skew | translate ;
```
