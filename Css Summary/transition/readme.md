# Transition(过渡)
## 语法

```
 transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
```

transition主要包含四个属性值：
- transition-property执行变换的属性
- transition-duration变换延续的时间
- transition-timing-function在延续时间段，变换的速率变化
- transition-delay变换延迟时间

## transition-property
### 语法

```
 transition-property ： none | all | [ <IDENT> ] [ ',' <IDENT> ]*
```

transition-property是用来指定当元素其中一个属性改变时执行transition效果，其主要有以下几个值：none(没有属性改变)；all（所有属性改变）这个也是其默认值；indent（元素属性名）。

indent的类型:
1. color: 通过红、绿、蓝和透明度组件变换（每个数值处理）如：background-color,border-color,color,outline-color等css属性；
2. length: 真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,padding,outline-width,margin,min-width,min-height,max-width,max-height,line-height,height,border-width,border-spacing,background-position等属性；
3. percentage:真实的数字 如：word-spacing,width,vertical-align,top,right,bottom,left,min-width,min-height,max-width,max-height,line-height,height,background-position等属性；
4. integer离散步骤（整个数字），在真实的数字空间，以及使用floor()转换为整数时发生 如：outline-offset,z-index等属性；
5. number真实的（浮点型）数值，如：zoom,opacity,font-weight,等属性；
6. transform list:详情请参阅：《CSS3 Transform》
7. rectangle:通过x, y, width 和 height（转为数值）变换，如：crop
8. visibility: 离散步骤，在0到1数字范围之内，0表示"隐藏"，1表示完全"显示",如：visibility
9. shadow: 作用于color, x, y 和 blur（模糊）属性,如：text-shadow
10. gradient: 通过每次停止时的位置和颜色进行变化。它们必须有相同的类型（放射状的或是线性的）和相同的停止数值以便执行动画,如：background-image
11. paint server (SVG): 只支持下面的情况：从gradient到gradient以及color到color，然后工作与上面类似
12. space-separated list of above:如果列表有相同的项目数值，则列表每一项按照上面的规则进行变化，否则无变化
13. a shorthand property: 如果缩写的所有部分都可以实现动画，则会像所有单个属性变化一样变化

## transition-duration
### 语法

```
transition-duration ： <time> [, <time>]*
```

transition-duration是用来指定元素 转换过程的持续时间，取值：<time>为数值，单位为s（秒）或者ms(毫秒),可以作用于所有元素，包括:before和:after伪元素。其默认值是0，也就是变换时是即时的。

## transition-timing-function
### 语法

```
transition-timing-function ： ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>) [, ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier(<number>, <number>, <number>, <number>)]*
```

### 取值
transition-timing-function的值允许你根据时间的推进去改变属性值的变换速率，transition-timing-function有6个可能值:
1. ease：（逐渐变慢）默认值，ease函数等同于贝塞尔曲线(0.25, 0.1, 0.25, 1.0).
2. linear：（匀速），linear 函数等同于贝塞尔曲线(0.0, 0.0, 1.0, 1.0).
3. ease-in：(加速)，ease-in 函数等同于贝塞尔曲线(0.42, 0, 1.0, 1.0).
4. ease-out：（减速），ease-out 函数等同于贝塞尔曲线(0, 0, 0.58, 1.0).
5. ease-in-out：（加速然后减速），ease-in-out 函数等同于贝塞尔曲线(0.42, 0, 0.58, 1.0)
6. cubic-bezier：（该值允许你去自定义一个时间曲线）， 特定的cubic-bezier曲线。 (x1, y1, x2, y2)四个值特定于曲线上点P1和点P2。所有值需在[0, 1]区域内，否则无效。

## transition-delay
### 语法

```
transition-delay ： <time> [, <time>]*
```

transition-delay是用来指定一个动画开始执行的时间，也就是说当改变元素属性值后多长时间开始执行transition效果，其取值：<time>为数值，单位为s（秒）或者ms(毫秒)，其使用和transition-duration极其相似，也可以作用于所有元素，包括:before和:after伪元素。 默认大小是"0"，也就是变换立即执行，没有延迟。

## 改变多属性，不同方式
有时我们不只改变一个css效果的属性,而是想改变两个或者多个css属性的transition效果，那么我们只要把几个transition的声明串在一起，用逗号（"，"）隔开，然后各自可以有各自不同的延续时间和其时间的速率变换方式。但需要值得注意的一点：transition-delay与transition-duration的值都是时间，所以要区分它们在连写中的位置，一般浏览器会根据先后顺序决定，第一个可以解析为时间的怭值为transition-duration第二个为transition-delay。如：

```css
a{
  -moz-transition:background 0.5s ease-in, color 0.3s ease-out;
  -webkit-transition:background 0.5s ease-in, color 0.3s ease-out;
  -o-transition:background 0.5s ease-in, color 0.3s ease-out;
  transition:background 0.5s ease-in, color 0.3s ease-out;
}
```

## 兼容
因为transition最早是有由webkit内核浏览器提出来的，mozilla和opera都是最近版本才支持这个属性，而我们的大众型浏览器IE全家都是不支持，另外由于各大现代浏览器Firefox,Safari,Chrome,Opera都还不支持W3C的标准写法，所以在应用transition时我们有必要加上各自的前缀，最好在放上我们W3C的标准写法，这样标准的会覆盖前面的写法，只要浏览器支持我们的transition属性，那么这种效果就会自动加上去：

```
//Mozilla内核
   -moz-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
   //Webkit内核
   -webkit-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
   //Opera
   -o-transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
   //W3C 标准
   transition ： [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'> [, [<'transition-property'> || <'transition-duration'> || <'transition-timing-function'> || <'transition-delay'>]]*
```
