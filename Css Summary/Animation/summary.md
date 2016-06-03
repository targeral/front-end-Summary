# CSS Animation
CSS Animation制作Web动画分为三部分：
- 声明动画:通过定制关键帧(`@keyframe`)来声明一个动画，这个关键帧相当于flash动画，gif动画图中的帧，主要用于控制CSS Animation效果
- 调用动画:在CSS中对应的元素上通过animation属性调用声明好的对应动画，并且指定动画播放的一些特性，比如播放时间、播放函数等
- 触发动画:最后一个环节是控制动画触发方式，就好比，我们视频做好了，默认有可能是播放的，也有可能是不播放的。在实际中我们要通过一定的触发方式来触发这些被引用的动画。

## 声明动画:@keyframes
在`@keyframes`集合中定义动画的效果，而这些效果其实就是对应的CSS规则集合。比如：

```CSS
@keyframes anim-name{
   0% {background-position: 0 0;}
   14.3% {background-position: -180px 0;}
   28.6% {background-position: -360px 0;}
   42.9% {background-position: -540px 0;}
   57.2% {background-position: -720px 0;}
   71.5% {background-position: -900px 0;}
   85.8% {background-position: -1080px 0;}
   100% {background-position: 0 0;}
}
```

`anim-name` 就是通过 `@keyframes` 声明的动画名称，其集合中的百分数(比如0%,100%)就是动画的关键帧，关键帧对应的CSS规则就是实现动画的一些样式规则。

而其中较为麻烦的事情是如何确定关键帧的个数，以及怎么配合相应的动作。下面的工具可以帮助大家快速构建出所需的关键帧： [http://tid.tenpay.com/?p=5983](http://tid.tenpay.com/?p=5983)

## 调用动画: animation
`animation`属性主要用来调用`@keyframes`已声明好的动画。其主要包括以下几个属性:

animation属性名              | 说明
------------------------- | --------------------------------
animation-name            | 定义使用的动画名称，需要和@keyframes声明的动画名称一致
animation-duration        | 用来指定元素播放动画所持续的时间长
animation-timing-function | 动画的播放方式
animation-delay           | 指定元素动画开始播放的时间
animation-iteration-count | 指定元素播放动画的循环次数
animation-direction       | 指定元素动画播放的方向,包括单向循环和双向循环
animation-play-state      | 用来控制元素动画的播放状态
animation-fill-mode       | 动画结束之后，关键帧值是否保留在结束状态时的值

其中`animation-name`、`animation-iteration-count`、`animation-direction`、`animation-play-state`和`animation-fill-mode`相对来说较为简单，在使用的时候根据其属性值的说明对号入座即可。较为复杂的是`animation-duration`和`animation-delay`的配合，特别是多个动画一起使用的时候。为了能很好的解决这方面的问题，除了经验、自己审美感之外，还可以借助Chrome的调式工具来进行调试。如下图所示：

[demo](./img/animation-devtool.gif)

在这个调试工具上，可以很好的帮助你控制好每个动画元素的animation-duration和animation-delay时间，而且能让它们配合的更好。

除了这两个属性之外animation-timing-function也相对复杂一些，其提供了一些关键值：

时间函数         | 说明
------------ | ---------------------------------------------------------------
ease         | （逐渐变慢）默认值，ease函数等同于贝塞尔曲线cubic-bezier(0.25, 0.1, 0.25, 1.0)
linear       | （匀速），linear 函数等同于贝塞尔曲线cubic-bezier(0.0, 0.0, 1.0, 1.0)
ease-in      | (加速)，ease-in 函数等同于贝塞尔曲线cubic-bezier(0.42, 0, 1.0, 1.0)
ease-out     | （减速），ease-out 函数等同于贝塞尔曲线cubic-bezier(0, 0, 0.58, 1.0)
ease-in-out  | （加速然后减速），ease-in-out 函数等同于贝塞尔曲线cubic-bezier(0.42, 0, 0.58, 1.0)
cubic-bezier | 该值允许你去自定义一个时间曲线
steps()      | 指定一个阶跃函数

### cubic-bezier
`cubic-bezier`是通过贝赛尔曲线来计算"转换"过程中的属性值。不过这个过程人肉处理也是非常麻烦的事情，在实际生产是可以使用在线工具(cubic-bezier)来帮你处理：

[http://cubic-bezier.com/](http://cubic-bezier.com/)

对于贝塞尔曲线理解的关键是：曲线越陡峭代表速度越快，曲线越平坦代表速度越慢。

[bezier](./img/animation-9.png)

除了上面说到的那个工具，三次贝塞尔曲线生成工具还有:
1. [Matthew Lein 的 Ceaser](https://matthewlein.com/ceaser/) ，提供了各种不同的预设，并允许你拖动点来创建你自己的贝塞尔曲线，还可以预览你创建的easing。当你对生成的东西满意的时候，你就可以复制它动态生成的代码，并把它放在你的CSS中使用。Ceaser还提供了和[Penner easing方程](http://robertpenner.com/easing/)（常用于Flash中，现已被移植到JavaScript、CSS等地方使用）等同的CSS。
2. [Easings.net](http://easings.net/zh-cn)

### steps
`steps()` 函数指定了一个阶跃函数，第一个参数指定了时间函数中的间隔数量（必须是正整数）；第二个参数可选，接受 start 和 end 两个值，指定在每个间隔的起点或是终点发生阶跃变化，默认为 end。

假设有一个3s * 2 (animation-iteration-count: 2;animation-duration: 3s;)的动画，我们分别对它应用 steps(3, start) 和 steps(3, end)，做出阶跃函数曲线如下：

[step](./img/steps-3-start-.png)

`steps()`第一个参数将动画分割成三段。当指定跃点为start 时，动画在每个计时周期的起点发生阶跃（即图中空心圆 → 实心圆）。由于第一次阶跃发生在第一个计时周期的起点处（0s），所以我们看到的第一步动画（初态）就为 1/3 的状态，因此在视觉上动画的过程为 1/3 → 2/3 → 1。

在JavaScript中就类似于下面这样：

```js
var animateAtStart = function(steps, duration) {
  var current = 0;
  var interval = duration / steps;
  var timer = function() {
    current ++;
    applyStylesStep(current);
    if(current < steps) {
      setTimeout(timer, interval);
    }
  };
  timer();
}
```

`steps(3, end)`:

[step](./img/steps-3-end-.png)

当指定跃点为end，动画则在每个计时周期的终点发生阶跃（即图中空心圆 → 实心圆）。由于第一次阶跃发生在第一个计时周期结束时（1s），所以我们看到的初态为0% 的状态；而在整个动画周期完成处（3s），虽然发生阶跃跳到了100% 的状态，但同时动画结束，所以100%的状态不可视。因此在视觉上动画的过程为 0 → 1/3 → 2/3（回忆一下数电里的异步清零，当所有输出端都为高电平的时候触发清零，所以全为高电平是暂态）。

在JavaScript中就类似于下面这样：

```js
var animateAtEnd = function(steps, duration) {
  var current = 0;
  var interval = duration / steps;
  var timer = function() {
    applyStylesStep(current);
    current++;
    if(current < steps) {
      setTimeout(timer, interval);
    }
  };

  timer();
}
```

有了steps()也就有了Sprites动画

### Timing函数并不是万能的
对于复杂的动画，所有的关键帧之间应用相同的easing几乎是不可能的。我们可以在中间改变timing函数，来达到我们想要的效果:

```css
@keyframes myAimation {
  0%{
    opacity: 0.5;
  }
  50%{
    opacity: 0.3;
    animation-timing-function:ease-in-out;
  }
  100%{
    opacity: 1;
  }
}
```

在上面的代码中，一个ease-in-out的时间函数会被应用在50%到100%的关键帧之间，但是之前设置的时间函数将会被默认用于0%到50%关键帧之间。

### 补充
其他的属性的详情:
- `animation-duration`的单位可以是秒(s)或毫秒(ms)
- `animation-iteration-count`默认值为1，这个属性决定了动画会重复播放多少次
- `animation-delay` 如果我们不想要动画立即开始播放，可以设置此属性。`animation-duration`和`animation-delay`都接受以秒(s)和毫秒(ms)为单位的值。
- `animation-fill-mode`定义在动画开始之前和结束之后发生的操作。可以接受四个值:`none`, `backwards`, `forwards`, `both`，
  - 默认值为`none`，表示动画将按照预期进行和结束，_在动画完成时最后一帧时，动画会反转到初始帧处_。
  - `forwards`,表示动画结束后继续应用最后关键帧的位置。
  - `backwards`,表示会在向动画应用动画样式时迅速应用动画的初始帧(影响的是开始，可能在开始帧，也可能在延迟开始。当使用延迟动画时，非常方便，这样在动画经过延迟之后，开始播放，元素不会突然跳到0%关键帧定义的位置。你可以想象成它就是把0%关键帧位置的样式扩展到延迟的位置，也就是说在延迟开始的时候，样式为0%帧的样式)
  - `both`,它是forwards和backwards的结合。动画可以在开始前就已经是第一个关键帧的样式，然后，在动画完成后，保持最后一个关键帧的样式。

- `animation-direction`的属性值分别有:`normal`(正常)，`reverse`(反转)，`alternate`(交替)和`alternate-reverse`(交替反转)。
  - 它的默认值是`normal`，这个值是通过你列出的关键帧声明直接播放的。这儿有一个截图。[animation-direction](./img/animation-1.png)
  - `reverse`设置表示你的动画是按照你的关键帧序列反向播放的，就像回绕播放一样。把direction设置为reverse，我们的元素就会从右往左跑了。[animation-direction](./img/animation-2.png)
  - 如果你的动画的`iteration-count`属性的值大于1，就可以使用`alternate`值。第一次按照正常的顺序播放，第二次就会反向播放，然后正向，然后反向......方向交替，从正向开始，直到iteration-count跑完。
  - 最后，alternate-reverse是和alternate一样的意思，除了它是从反方向开始的。
  - **补充:animation-timing-function属性会随着animation-direction的反向一起反向，这是CSS动画一个很不错的内置效果**

- `animation-play-state`属性主要用来控制元素动画的播放状态，其参数为:`running`, `paused`。默认值是`running`。可以把hover或类似性质的事件作为触发器，分配动画或改变动画的属性.

## 简写顺序
`<single-animation> = <single-animation-name> || <time> || <single-animation-timing-function> || <time> || <single-animationiteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>`

说明:_该顺序在定义每个动画的时候都是非常重要的：第一个值解析为动画持续的时间，第二个值解析为动画延迟的时间。_

## 练习
[http://www.w3cplus.com/animation/web-animation-resources.html](http://www.w3cplus.com/animation/web-animation-resources.html)

[常见的动画任务](http://www.w3cplus.com/css3/CSS3-animation.html)
