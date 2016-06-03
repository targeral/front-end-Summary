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
**2D:**

`rotate(<angle>)` ：通过指定的角度参数对原元素指定一个2D rotation（2D 旋转），_需先有transform-origin属性的定义。_

`transform-origin`定义的是旋转的基点，其中angle是指旋转角度，如果设置的值为正数表示顺时针旋转，如果设置的值为负数，则表示逆时针旋转。如：transform:rotate(30deg)

**3D:**
- `rotate3d(x,y,z,angle)`
- `rotateX()` [rotateX](./img/transform_rotatex.gif) 横向为x轴
- `rotateY()` [rotateY](./img/transform_rotatey.gif) 纵向为y轴
- `rotateZ()` 垂直x轴与y轴形成的平面指向这个轴

### 移动translate
**2D:**

移动分为三种情况:
- translate(x, y)
- translateX(x)
- translateY(y)

**注意:其基点默认为元素 中心点，也可以根据transform-origin进行改变基点**

**3D:**
- `translate3d(x, y, z)`
- `translateX(x)`
- `translateY(y)`
- `translateZ(z)`

### 缩放scale
**2D:**

缩放分为三种情况：
- scale(x, y)
- scaleX(x)
- scaleY(y)

它们具有相同的缩放中心点和基数，其中心点就是元素的中心位置，缩放基数为1，如果其值大于1元素就放大，反之其值小于1，元素缩小。

**3D:**
- `scale3d(x, y, z)`
- `scaleX(x)`
- `scaleY(y)`
- `scaleZ(z)` (目测没什么效果)

### 扭曲skew
同上:
- skew(angle, angle)
- skewX(angle) 按给定的角度沿X轴指定一个skew transformation（斜切变换）。也就是说x轴不变，y轴改变。逆时针为正值。
- skewY(angle) 按给定的角度沿Y轴指定一个skew transformation（斜切变换）。也就是说y轴不变，x轴改变。顺时针为正值。

同样是以元素中心为基点，我们也可以通过transform-origin来改变元素的基点位置。

### 矩阵matrix
matrix(<number>, <number>, <number>, <number>, <number>, <number>) ： 以一个含六值的(a,b,c,d,e,f)变换矩阵的形式指定一个2D变换，相当于直接应用一个[a b c d e f]变换矩阵。就是基于水平方向（X轴）和垂直方向（Y轴）重新定位元素,此属性值使用涉及到数学中的矩阵

## transform-* 属性
### transform-origin
作用就是让我们在进行transform动作之前可以改变元素的基点位置，因为我们元素默认基点就是其中心位置，换句话说我们没有使用transform-origin改变元素基点位置的情况下，transform进行的rotate,translate,scale,skew,matrix等操作都是以元素自己中心位置进行变化的。但有时候我们需要在不同的位置对元素进行这些操作，那么我们就可以使用transform-origin来对元素进行基点位置改变，使元素基点不在是中心位置，以达到你需要的基点位置。

#### 取值
transform-origin(X,Y):用来设置元素的运动的基点（参照点）。默认点是元素的中心点。其中X和Y的值可以是百分值,em,px，其中X也可以是字符参数值left,center,right；Y和X一样除了百分值外还可以设置字符值top,center,bottom，这个看上去有点像我们background-position设置一样:
1. top left | left top 等价于 0 0 | 0% 0%
2. top | top center | center top 等价于 50% 0
3. right top | top right 等价于 100% 0
4. left | left center | center left 等价于 0 50%
5. center | center center 等价于 50% 50%（默认值）
6. right | right center | center right 等价于 100% 50%
7. bottom left | left bottom 等价于 0 100% | 0% 100%
8. bottom | bottom center | center bottom 等价于 50% 100%
9. bottom right | right bottom 等价于 100% 100%

### transform-style
`transform-style`属性是3D空间一个重要属性，_指定嵌套元素如何在3D空间呈现_。它主要有两个属性:`flat`和`preserve-3d`。

语法:`transform-style:flat | preserve-3d`,其中flat值为默认值，_表示所有子元素在2D平面呈现_。preserve-3d _表示所有子元素在3D空间中呈现_。

也就是说，如果对一个元素设置了transform-style的值为flat，则该元素的所有子元素都将被平展到该元素的2D平面中进行呈现。**沿着X轴或Y轴方向旋转该元素将导致位于正或负Z轴位置的子元素显示在该元素的平面上，而不是它的前面或者后面**。如果对一个元素设置了transform-style的值为preserve-3d，它表示不执行平展操作，他的所有子元素位于3D空间中。

transform-style属性需要设置在父元素中，并且 **高于任何嵌套的变形元素**。

```html
<div class="wrap">
    <div class="spin">
        <div class="rotate">
            <img src="1.png" alt="" width="142" height="200" />
        </div>
    </div>
</div>
<div class="wrap">
    <div class="spin">
        <div class="rotate three-d">
            <img src="1.png" alt="" width="142" height="200" />
        </div>
    </div>
</div>
```

```css
.wrap {
    width: 500px;
    height: 300px;
    margin: 30px auto;
    position: relative;
    background: url(images/bg-grid.jpg) no-repeat center center;
    background-size: 100% 100%;
}
/*设置动画*/
@keyframes spin{
    0%{
        transform:rotateY(0deg)
    }
    100%{
        transform:rotateY(360deg)
    }
}
.spin {
    width: 142px;
    height: 200px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -72px;
    margin-top: -101px;
    border: 1px dashed orange;
    cursor: pointer;
    transform-style: preserve-3d;
}
/*调用动画*/
.spin:hover{
    animation:spin 5s linear infinite;
}
.rotate {
    background: url(1.png) no-repeat center;
    background-size: 100% 100%;
    border: 5px solid hsla(50,50%,50%,.9);
    transform: perspective(200px) rotateY(45deg);
}
.rotate img{
    border: 1px solid green;
    transform: rotateX(15deg) translateZ(10px);
    transform-origin: 0 0 40px;
}
/*改变transform-style的默认值*/
.three-d {
    transform-style: preserve-3d;
}
```

效果如下:

[transform-style](1.jpg)

正如看到的，当元素.rotate设置了`flat`值时，其子元素img不会根据`translateZ()`值摊开，而在同一个平面旋转，如上图上部分；当元素.rotate设置了`preserve-3d`值时，其子元素img会根据`translateZ()`值摊开，不再会堆叠在一起，如上图下部分所示。

有一点需要特别提醒大家，**如果你的元素设置了transform-style值为preserve-3d，就不能为了防止子元素溢出容器而设置overflow值为hidden**, 如果设置了overflow:hidden同样可以迫死子元素出现在同一平面（和元素设置了transform-style为flat一样的效果）

### perspective属性
它的概念:_该属性会设置查看者的位置，并将可视内容映射到一个视锥上，继而投到一个2D视平面上。如果不指定透视，则Z轴空间中的所有点将平铺到同一个2D视平面中，并且变换结果中将不存在景深概念。_

理解:视距，用来设置用户和元素3D空间Z平面之间的距离。没有设置和设置`perspective`的区别是，_Z轴空间的所有点将平铺到同一个2D视平面上，很难看出是3D效果_;设置属性时，_其效应由他的值来决定，值越小，用户与3D空间Z平面距离越近，视觉效果更令人印象深刻；反之，值越大，用户与3D空间Z平面距离越远，视觉效果就很小。_

通过例子来更好理解:

```html
<div>
  <img src="images/cardKingClub.png" alt="" width="142" height="200" />
   <img src="images/cardKingClub.png" alt="" width="142" height="200" />
</div>
<div>
  <img src="images/cardKingClub.png" alt="" width="142" height="200" />
    <img src="images/cardKingClub.png" alt="" width="142" height="200" />
</div>
```

```css
div {
    width: 500px;
    height: 300px;
    margin: 30px auto;
    position: relative;
    background: url(images/bg-grid.jpg) no-repeat center center;
    background-size: 100% 100%;
}
div img {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -71px;
    margin-top: -100px;
    transform-origin: bottom;
}
div img:nth-child(1){
    opacity: .5;
    z-index: 1;
}
div img:nth-child(2){
    z-index: 2;
    transform: rotateX(45deg);
}
div:nth-of-type(2){
    perspective: 500px;
}
```

效果图:

[perspective](./img/transform-19.jpg)

上图的效果完全说明了一切。父节点没有设置perspective的情况下，梅花King的3D旋转效果不明显，而在父节点设置perspective后，梅花King才像个3D旋转。

#### 语法
`perpective:none | <length>`

`perspective`属性包括两个属性：`none`和具有单位的长度值。其中`perspective`属性的默认值为none，_表示无限的角度来看3D物体，但看上去是平的_。另一个值<length>接受一个长度单位大于0的值。**而且其单位不能为百分比值**。_<length>值越大，角度出现的越远，从而创建一个相当低的强度和非常小的3D空间变化。反之，此值越小，角度出现的越近，从而创建一个高强度的角度和一个大型3D变化_。

#### 总结
- perspective取值为none或不设置，就没有真3D空间。
- perspective取值越小，3D效果就越明显，也就是你的眼睛越靠近真3D。
- perspective的值无穷大，或值为0时与取值为none效果一样。

### perspective()函数
在3D变形中，除了`perspective`属性可以激活一个3D空间之外，在3D变形的函数中的`perspective()`也可以激活3D空间。他们不同的地方是：**perspective用在舞台元素上（变形元素们的共同父元素）；perspective()就是用在当前变形元素上，并且可以与其他的transform函数一起使用**。例如，我们可以把：

```css
.stage{
  perspective:600px;
}
/*等价于*/
.stage .box{
  transform:perspective(600px);
}
```

虽然`perspective`属性和`perspective()`函数所起的功能是一样的，但其取值以及以运用的对像有所不同：
- `perspective`属性可以取值为`none`或长度值；而`perspective()`函数取值只能大于0，如果取值为0或比0小的值，将无法激活3D空间；
- `perspective`属性用于变形对像父元素；而`perspective()`函数用于变形对像自身，并和`transform`其他函数一起使用。

### perspective-origin属性
`perspective-origin`属性是3D变形中另一个重要属性，主要用来决定`perspective`属性的源点角度。它实际上设置了X轴和Y轴位置，在该位置观看者好像在观看该元素的子元素。

语法:`perspective-origin:[<percentage> | <length> | left | center | right | top | bottom] | [[<percentage> | <length> | left | center | right] && [<percentage> | <length> | top | center | bottom]]`

该属性的默认值为"50% 50%"(也就是center)，其也可以设置为一个值，也可以设置为两个长度值：
- 第一个长度值指定相对于元素的包含框的X轴上的位置。它可以是长度值（以受支持的长度单位表示）、百分比或以下三个关键词之一：left（表示在包含框的X轴方向长度的0%），center（表示中间点）,或right（表示长度的100%）。
- 第二个长度值指定相对于元素的包含框的Y轴上的位置。它可以是长度值、百分比或以下三个关键词之一：top（表示在包含框的Y轴方向长度的0%），center（表示中间点），或bottom（表示长度的100%）。

注意，为了指转换子元素变形的深度，perspective-origin属性必须定义父元素上。通常perspective-origin属性本身不做任何事情，它必须被定义在设置了perspective属性的元素上。换句话说，perspective-origin属性需要与perspective属性结合起来使用，以便将视点移至元素的中心以外位置。

阅读以下这个,有助于理解:[https://css-tricks.com/almanac/properties/p/perspective-origin/](https://css-tricks.com/almanac/properties/p/perspective-origin/)

### backface-visibility属性
`backface-visibility`属性决定元素旋转背面是否可见。对于未旋转的元素，该元素的正面面向观看者。当其Y轴旋转约180度时会导致元素的背面面对观众。

语法:`backface-visibility:visible | hidden`, visible：为backface-visibility的默认值，表示反面可见;hidden：表示反面不可见

一个元素的可见性与"backface-visibility:hidden"决定如下：
- 元素在3D环境下渲染上下文，将根据3D变形矩阵来计算，反之元素不在3D环境下渲染上下文，将根据2D变形矩阵来计算。
- 如果组件的矩阵在第3行、3列是负值，那么元素反面是隐藏，反之是可见的。

简单点来说，`backface-visibility`属性可用于隐藏内容的背面。_默认情况下，背面可见，这意味着即使在翻转后，旋转的内容仍然可见。_ 但当backface-visibility设置为hidden时，旋转后内容将隐藏，因为旋转后正面将不再可见。该功能可帮助您模拟多面的对象.

一些例子，可参考:[http://www.w3cplus.com/css3/transform-basic-property.html](http://www.w3cplus.com/css3/transform-basic-property.html)

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
