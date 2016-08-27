# 关于Flex布局
## 历史
Flexbox布局（Flexible Box）模块旨在提供一个更佳有效的布局方式，更好的控制 **项目的对齐和自由分配容器空间，即使它们的大小是未知的或动态的**。因此得其名"flex"。

## 思想
Flex布局背后的主要思想是给容器控制项目（Flex项目）的宽度、高度的能力，使用Flex项目可以自动填满容器的可用空间（主要是适应所有类型的显示设备和屏幕大小）。Flex容器使用Flex项目可以自动放大与收缩，用来填补可用的空闲空间。

## 适用类型
_Flexbox布局比较适合Web应用程序的一些小组件和小规模的布局_

## 关于flex容器的属性(父元素)
因为Flexbox是一个模块，而不是一个单一属性，因此他涉及很多东西。**其中一些事容器上的属性(父元素，也被称为"flex容器")，而有一些是容器子元素的属性(常称为"flex项目")。**

### 预备知道的
如果常规布局是基于块和内联文本流方向，**那么Flex布局就是基于"Flex-flow"方向**。下面这个图反映了flex布局的主要思想:

![flex](./img/flexbox.png)

**基本上，Flex项目是沿着main axis(从main-start向main-end)或者cross axis(从cross-start向cross-end)排列。**
- `main axis` : Flex容器的主轴主要用来配置Flex项目。注意，它不一定是水平，这主要取决于`flex-direction`属性。
- `main-start` | `main-end` : Flex项目的配置从容器的主轴起点边开始，往主轴终点边结束。
- `main size` : Flex项目的在主轴方向的宽度或高度就是项目的主轴长度，_Flex项目的主轴长度属性是width或height属性，由哪一个对着主轴方向决定_。
- `cross axis` : 与主轴垂直的轴称作侧轴，是侧轴方向的延伸。
- `cross-start` | `cross-end` : 伸缩行的配置从容器的侧轴起点边开始，往侧轴终点边结束
- `cross size` : Flex项目的在侧轴方向的宽度或高度就是项目的侧轴长度，Flex项目的侧轴长度属性是width或height属性，由哪一个对着侧轴方向决定。

进入正题。

### display
**定义一个Flex容器，根据其取的值来决定是内联还是块。Flex容器会为其内容建立新的伸缩格式化上下文**.

```css
.container{
  display:flex;/*or inline-flex*/
}
```

--------------------------------------------------------------------------------

注意:
1. Flex容器不是块容器，因此有些设计用来控制块布局的属片在Flexbox布局中不适用。**特别是：多列组中所有column-*属性、float、clear属性和vertical-align属性在Flex容器上没有作用。**
2. 如果元素display的值指定为inline-flex，而且元素是一个浮动元素或绝对定位元素，则display的计算值是flex。

--------------------------------------------------------------------------------

不同版本的 `display`

规范版本 | 属性名称    | 块伸缩容器   | 内联伸缩容器
---- | ------- | ------- | --------------
标准版本 | display | flex    | inline-flex
混合版本 | display | flexbox | inline-flexbox
最老版本 | display | box     | inline-box

### flex-direction(控制主轴)
**这是用来创建主轴，从而定义Flex项目在Flex容器中放置的方向**。_Flexbox是一种单方向的布局概念。认为Flex项目主要排列方式要么是水平排列，要么是垂直列排列_。

```css
.container{
  display:flex | inline-flex;
  flex-direction:row | row-reverse | column | column-reverse;
}
```

- `row`(默认值) : 如果书写方式是`ltr`，那么Flex项目从左向右排列；如果书写方式是`rtl`，那么Flex项目从右向左排列
- `row-reverse` : 如果书写方式是`ltr`，那么Flex项目从右向左排列；如果书写方式是`rtl`，那么Flex项目从左向右排列
- `column` : 和`row`类似，只不过方向是从上到下排列
- `column-reverse` : 和`row-reverse`类似，只不过方向是从下向上排列

不同版本的`flex-direction`

规范版本 | 属性名称                     | 水平方向              | 反向水平               | 垂直方向            | 反向垂直
---- | ------------------------ | ----------------- | ------------------ | --------------- | ----------------
标准版本 | flex-direction           | row               | row-reverse        | column          | column-reverse
混合版本 | flex-direction           | row               | row-reverse        | column          | column-reverse
最老版本 | box-orient box-direction | horizontal normal | horizontal reverse | vertical normal | vertical reverse

### flex-wrap(控制侧轴)
_默认情况之下，Flex项目都尽可能在一行显示_。**你可以根据flex-wrap的属性值来改变，让Flex项目多行显示。方向在这也扮演了一个重要角度，决定新的一行堆放方向**。

```css
.container {
  display: flex | inline-flex;
  flex-direction:row | row-reverse | column | column-reverse;
  flex-wrap:nowrap | wrap | wrap-reverse;
}
```

- `nowrap`(默认值) : 单行显示，如果书写方式是ltr，Flex项目从左向右排列，反之rtl，从右向左排列
- `wrap` : 多行显示，如果书写方式是ltr，Flex项目从左向右排列，反之rtl，从右向左排列
- `wrap-reverse`  :多行显示，如果书写方式是ltr，Flex项目从右向左排列，反之rtl，从左向右排列

不同版本的`flex-wrap`

规范版本 | 属性名称      | 不换行    | 换行       | 反转换行
---- | --------- | ------ | -------- | ------------
标准版本 | flex-wrap | nowrap | wrap     | wrap-reverse
混合版本 | flex-wrap | nowrap | wrap     | wrap-reverse
最老版本 | box-lines | single | multiple | N/A

### flex-flow
**这是flex-direction和flex-wrap两个属性的缩写。两个属性决定了伸缩容器的主轴与侧轴。默认值是row nowrap（中间用空格隔开）**。

语法:`flex-flow: <'flex-direction'> || <'flex-wrap'>`

### justify-content(控制主轴)
用于在主轴上对齐伸缩项目。**这一行为会在所有可伸缩长度及所有自动边距均被解释后进行**。当一行上的所有伸缩项目都不能伸缩或可伸缩但是已经达到其最大长度时，这一属性才会对多余的空间进行分配。_当项目溢出某一行时，这一属性也会在项目的对齐上施加一些控制。_

```css
.container{
  justify-content:flex-start | flex-end | center | space-between | space-around;
}
```

![justify-content](./img/justifyContent.png)
- `flex-start`(默认值) : 伸缩项目向一行的起始位置靠齐。该行的第一个伸缩项目在主轴起点边的外边距与该行在主轴起点的边对齐，同时所有后续的伸缩项目与其前一个项目对齐。
- `flex-end` : 伸缩项目向一行的结束位置靠齐。该行的最后一个伸缩项目在主轴终点边的外边距与该行在主轴终点的边对齐，同时所有前面的伸缩项目与其后一个项目对齐。
- `center`:伸缩项目向一行的中间位置靠齐。该行的伸缩项目将相互对齐并在行中居中对齐，**同时第一个项目与该行在主轴起点的边的距离等同与最后一个项目与该行在主轴终点的边的距离（如果剩余空间是负数，则保持两端溢出的长度相等）**。
- `space-between` : 伸缩项目会平均地分布在行里。**如果剩余空间是负数，或该行只有一个伸缩项目，则此值等效于flex-start**。在其它情况下，第一个项目在主轴起点边的外边距会与该行在主轴起点的边对齐，同时最后一个项目在主轴终点边的外边距与该行在主轴终点的边对齐，而剩下的伸缩项目在确保两两之间的空白空间相等下平均分布
- `space-around` : 伸缩项目会平均地分布在行里，两端保留一半的空间。如果剩余空间是负数，或该行只有一个伸缩项目，则该值等效于center。在其它情况下，**伸缩项目在确保两两之间的空白空间相等，同时第一个元素前的空间以及最后一个元素后的空间为其他空白空间的一半下平均分布**。

--------------------------------------------------------------------------------

center,space-around,space-between区别:
1. center时，两端距容器的外边距相同，但是尽可能不为0。
2. space-between时，两端紧贴在容器，外边距为0，剩余空间平分。
3. space-around时，剩余空间都平分，两端距容器的外边距为平分距离的一半。

--------------------------------------------------------------------------------

不同版本的`justify-content`

规范版本 | 属性名称            | start      | center   | end    | justify       | distribute
---- | --------------- | ---------- | -------- | ------ | ------------- | ------------
标准版本 | justify-content | flex-start | flex-end | center | space-between | space-around
混合版本 | flex-pack       | start      | center   | end    | justify       | distribute
最老版本 | box-pack        | start      | center   | end    | justify       | N/A

### align-items
定义项目在侧轴上如何对齐。`align-items`可以用来设置伸缩容器中包括匿名伸缩项目的所有项目的对齐方式。

```css
.container {
  display:flex | inline-flex;
  flex-direction:row | row-reverse | column | column-reverse;
  flex-wrap:nowrap | wrap | wrap-reverse;
  justify-content:flex-start | flex-end | center | space-around | space-between;
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

![align-items](./img/align-items.png)
- `flex-start` : 伸缩项目在侧轴起点边的外边距紧靠住该行在侧轴起始的边。
- `flex-end` : 伸缩项目在侧轴终点边的外边距靠住该行在侧轴终点的边 。
- `center` : 伸缩项目的外边距盒在该行的侧轴上居中放置。（如果伸缩行的尺寸小于伸缩项目，则伸缩项目会向两个方向溢出相同的量）。
- `baseline` : 如果伸缩项目的行内轴与侧轴为同一条，则该值和flex-start等效。其它情况下，该值将参与基线对齐。所有参与该对齐方式的伸缩项目将按下列方式排列：_首先将这些伸缩项目的基线进行对齐，随后其中基线至侧轴起点边的外边距距离最长的那个项目将紧靠住该行在侧轴起点的边_。
- `stretch` : **如果侧轴长度属性的值为auto，则此值会使项目的外边距盒的尺寸在遵照min/max-width/height属性的限制下尽可能接近所在行的尺寸**。

规范版本 | 属性名称        | start      | center | end      | baseline | stretch
---- | ----------- | ---------- | ------ | -------- | -------- | -------
标准版本 | align-items | flex-start | center | flex-end | baseline | stretch
混合版本 | flex-align  | start      | center | end      | baseline | stretch
最老版本 | box-align   | start      | center | end      | baseline | stretch

### align-content
当伸缩容器的侧轴还有多余空间时，align-content属性可以用来调准伸缩行在伸缩容器里的对齐方式，这与调准伸缩项目在主轴上对齐方式的justify-content属性类似。**请注意本属性在只有一行的伸缩容器上没有效果**

```css
.container{
  align-content:flex-start | flex-end | center | space-between | space-around | stretch;
}
```

![align-content](./img/align-content)
- `flex-start` : 各行向伸缩容器的起点位置堆叠。伸缩容器中第一行在侧轴起点的边会紧靠住伸缩容器在侧轴起点的边，之后的每一行都紧靠住前面一行。
- `flex-end` : 各行向伸缩容器的结束位置堆叠。伸缩容器中最后一行在侧轴终点的边会紧靠住该伸缩容器在侧轴终点的边，之前的每一行都紧靠住后面一行。
- `center` : 各行向伸缩容器的中间位置堆叠。各行两两紧靠住同时在伸缩容器中居中对齐，保持伸缩容器在侧轴起点边的内容边和第一行之间的距离与该容器在侧轴终点边的内容边与第最后一行之间的距离相等。（如果剩下的空间是负数，则行的堆叠会向两个方向溢出的相等距离。）
- `space-between` :各行在伸缩容器中平均分布。如果剩余的空间是负数或伸缩容器中只有一行，该值等效于flex-start。在其它情况下，第一行在侧轴起点的边会紧靠住伸缩容器在侧轴起点边的内容边，最后一行在侧轴终点的边会紧靠住伸缩容器在侧轴终点的内容边，剩余的行在保持两两之间的空间相等的状况下排列。
- `space-around` : 各行在伸缩容器中平均分布，在两边各有一半的空间。如果剩余的空间是负数或伸缩容器中只有一行，该值等效于center。在其它情况下，各行会在保持两两之间的空间相等，同时第一行前面及最后一行后面的空间是其他空间的一半的状况下排列。
- `stretch` : 各行将会伸展以占用剩余的空间。如果剩余的空间是负数，该值等效于flex-start。在其它情况下，剩余空间被所有行平分，扩大各行的侧轴尺寸。

## Flex项目属性
### order
order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

_默认情况，Flex项目是按文档源的流顺序排列_。然而，**在Flex容器中可以通过order属性来控制Flex项目的顺序源**。

```css
.item{
  order:<integer>;
}
```

--------------------------------------------------------------------------------

## 注意:根据order重新排序伸缩项目。有最小（负值最大）order的伸缩项目排在第一个。若有多个项目有相同的order值，这些项目照文件顺序排。这个步骤影响了伸缩项目生盒树成的盒子的顺序，也影响了后面的演算法如何处理各项目。
![order](./img/order-2.svg)

### flex-grow
**flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。**

```css
.item{
  flex-grow:<number>; /*default 0*/
}
```

**注意：flex-grow取负值将失效。**

### flex-shrink
flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```css
.item{
  flex-shrink:<number>; /*default 1*/
}
```

**注意：flex-shrink取负值将失效。**

### flex-basis
**flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的。本来大小**。

```css
.item{
  flex-basis: <length> | auto; /* default auto */
}
```

它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

如果设置为0，内容不在考虑周围额外空间。如果设置为auto，额外空间会基于flex-grow值做分布。如下图所示：(未懂QAQ)

![rel-vs-abs-flex.svg](./img/rel-vs-abs-flex.svg)

### flex
flex是`flex-grow`，`flex-shrink`和`flex-basis`三个属性的缩写。第二个和第三个参数(flex-shrink和flex-basis)是可选值。**其默认值是0 1 auto**。

```css
.item{
  flex:none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

**建议您 使用此简写属性，而不是设置单独属性。注意，如果flex取值为none时，其相当于取值为0 0 auto**

**该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。**

--------------------------------------------------------------------------------

## 请注意flex-grow与flex-basis的初始值与他们在flex缩写被省略时的 默认值不同。这里的设计是为了让flex缩写在最常见的情景下比较好用。
### align-self
`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
