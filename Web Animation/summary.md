# Web Animation
## 原理
Web动画的实现原理，是利用了人眼的"视觉暂留"现象，在短时间内连续播放数幅静止的画面，使肉眼因视觉残象产生错觉，而误以为画面在"动"。

Web动画中有几个主要的概念：
- 帧：在动画过程中，每一幅静止画面即为一"帧"。
- 帧率：即每秒钟播放的静止画面的数量，单位是fps(Frame per second)。
- 帧时长：即每一幅静止画面的停留时间，单位一般是ms(毫秒)。
- 跳帧(掉帧/丢帧)：在帧率固定的动画中，某一帧的时长远高于平均帧时长，导致其后续数帧被挤压而丢失的现象。

## Web Animation 实现方法
- GIF图片动画： 设计师直接通过制图软件制作而成，嵌入到Web页面中。其优点制作成本低，无需开发人员介入；缺点是文件大，耗性能，无法人机交互。
- Flash动画： 设计师(或网页制作师)通过Adobe Flash软件将音乐、声效、动画及富有新意的界面融合在一起，以制作出高品质的网页动态效果。其主要运用于PC端的Web页面中。
- 视频：将需要的一些动画制作成视频文件插入到Web页面中。
- CSS Animation：通过CSS的相关特性将GIF、Flash、视频动画(创意)转换成代码
- JavaScript Animation: Web自带的一些制作动画的JavaScript API。

在手淘中使用的动画主要有两大类：
- 视频型： 纯视频格式，用户不需要互动，打开手淘可以直接播放或选择跳过(例如：2015年双11揭幕动画)
- Web动画：称之为交互型动画，主要有前端开发人员根据视觉设计师提供的GIF动画、视频或Flash动画效果制作。具有较强的人机交互功能，用户触发某按钮开始播放动画效果或者用户进入手淘后动画就开始播放，而且在播放过程中还可以做一些其他交互功能（例如：2014年双12揭幕动画）

对应的我们前端所要承载的就是Web Animation中的CSS Animation和JavaScript Animation。

## 简单的JS动画
在浏览器里，动画实现的基本原理非常简单明了，其实 _就是采用定时器改变显示元素的一些属性的过程_。不管是 JavaScript 操作 DOM 的动画，还是 CSS3 动画，还是 Canvas 动画，或者 SVG 动画，区别只是使用的 API、何种定时器，影响什么环境（DOM/Canvas/SVG/WebGL）。

基本动画的实现:

```js
var deg = 0;
block.addEventListener('click', function() {
  var self = this;
  requestAnimationFrame(function change() {
    self.style.transform = 'rotate(' + (deg++) + 'deg)';
    requestAnimationFrame(change);
  })
})
```

上面的例子里，我们使用了定时器 `requestAnimationFrame`，**requestAnimationFrame 是浏览器专为渲染刷新设计的定时器接口**，在早期版本的浏览器里，我们可以用 setTimeout 或者 setInterval 来代替它。定时器改变了方块元素的角度，每一次定时器触发我们就刷新并增加一次它的角度值，这样就产生了方块不断旋转的动态效果。

### About requestAnimationFrame
#### 1.概述
requestAnimationFrame是浏览器用于定时循环操作的一个接口，类似于setTimeout，**主要用途是按帧对网页进行重绘**。

设置这个API的 **目的是为了让各种网页动画效果（DOM动画、Canvas动画、SVG动画、WebGL动画）能够有一个统一的刷新机制，从而节省系统资源，提高系统性能，改善视觉效果**。代码中使用这个API，就是告诉浏览器希望执行一个动画，让浏览器在下一个动画帧安排一次网页重绘。

_requestAnimationFrame的优势_，在于充分 _利用显示器的刷新机制_ ，比较节省系统资源。显示器有固定的刷新频率（60Hz或75Hz），也就是说，每秒最多只能重绘60次或75次，requestAnimationFrame的基本思想就是 _与这个刷新频率保持同步_ ，利用这个刷新频率进行页面重绘。此外，使用这个API，**一旦页面不处于浏览器的当前标签，就会自动停止刷新。这就节省了CPU、GPU和电力**。

不过有一点需要注意，_requestAnimationFrame是在主线程上完成_。这意味着，如果主线程非常繁忙，requestAnimationFrame的动画效果会大打折扣。

requestAnimationFrame使用一个回调函数作为参数。这个回调函数会在浏览器重绘之前调用。

```js
requestID = window.requestAnimationFrame(callback);
```

兼容性:

```js
window.requestAnimationFrame = (function() {
  return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequstAnimationFrame ||
         window.msRequestAnimationFrame ||
         function (callback) {
           window.setTimeout(callback, 1000 / 60);
         };
})();
```

上面的代码按照1秒钟60次（大约每16.7毫秒一次），来模拟requestAnimationFrame。

**使用requestAnimationFrame的时候，只需反复调用它即可。**

```js
function repeatOften{
  //do what
  requestAnimationFrame(repeatOften);
}

requestAnimationFrame(repeatOften);
```

取消重绘使用`cancelAnimationFrame`,它的参数是requestAnimationFrame返回的一个代表任务ID的整数值。

```js
var globalID;

function repeatOften() {
  $("<div />").appendTo("body");
  globalID = requestAnimationFrame(repeatOften);
}

$("#start").on('click', function() {
  globalID = requestAnimationFrame(repeatOften);
});

$("#stop").on('click', function() {
  cancelAnimationFrame(globalID);
});
```

## 简单动画的问题
首先，requestAnimationFrame（或者 setTimeout、setInterval 等其他定时器）并不能保证严格在某个时间点被触发。_由于JavaScript是单线程非阻塞模型的语言，所以如果requestAnimationFrame被其他任务给阻塞了，那么动画就会变慢_。

然后，通过 **定义速度** 的方式来改变动画，会导致难以精确控制动画时间和动画的幅度。匀速运动其实还好，如果做一些复杂的变速运动，按照我们的定义方式，我们本该设置的元素属性值将会类似于求积分，然而时间又不连贯。

```js
var x = 0, y = 0;
box.addEventListener('click', function() {
  var self = this;
  requestAnimationFrame(function change() {
    self.style.transform = 'translate(' + (x++) + 'px' + 100 * Math.cos(Math.PI * (y++/180)) + "px)";
    requestAnimationFrame(change);
  })
})
```

上面的动画由于时间不连贯绘制出来的曲线只能近似等于正弦曲线。

## **动画是“位移”关于“时间”的函数**
动画 **是位移关于时间的函数** : s = f(t)

所以我们不应该采用增量的方式来执行动画。为了更精确地控制动画，更合适的方式是 **将动画与时间联系起来**：

_动画与时间关联_

```js
function startAnimation() {
  var startTime = Date.now();

  requestAnimationFrame(function change() {
    var current = Date.now() - startTime;
    console.log("动画已经执行时间:%fms", current);
    requestAnimationFrame(change);
  });
}
```

动画通常有终止时间，如果是循环动画，我们也可以看做特殊的---- **当动画达到终止时间之后，重新开始动画**。因此，我们可以将动画时间归一(Normalize)表示：

```js
function startAnimation(duration, isLoop) {
  var startTime = Date.now();
  requestAnimationFrame(function change() {
    var p = (Date.now() - startTime) / duration;

    if(p > 1.0) {
      if(isLoop) {
        startTime += duration;
        p -= 1.0;
      }else {
        p = 1.0;
      }
    }

    console.log("动画已执行进度:%f", p);
    if(p < 1.0) {
      requestAnimationFrame(change);
    }
  });
}
```

## 各种运动的公式总结
### 匀加速运动
加速度恒定，速度从0开始随时间增加而均匀增加。

公式为:`St = S * p^2`

滑块在2秒内向右匀加速移动200px，速度从0开始

```js
box.addEventListener('click', function() {
  var self = this, startTime = Date.now(),
      distance = 200, duration = 2000;
  requestAnimationFrame(function step() {
    var p = Math.min(1.0, (Date.now() - startTime) / duration);
    self.style.transform = "tranlateX(" + (distance * p * p) + "px)";
    if(p < 1.0) requestAnimationFrame(step);
  });
});
```

### 匀减速运动
公式为:`St = S * p * (2-p)`

让滑块在2秒内向右匀减速移动200px，速度从最大减为0

```js
box.addEventListener("click", function() {
  var self = this, startTime = Date.now(),
      distance = 200, duration = 2000;
  requestAnimationFrame(function step() {
    var p = Math.min(1.0, (Date.now() - startTime) / duration);
    self.style.transform = "translateX(" + (distance * p * (2 - p)) + "px)";
    if(p < 1.0) requestAnimationFrame(step);
  })
})
```

### 运动的组合
让x、y轴同时分别运动，可以让物体沿平面轨迹运动

抛物线运动,x轴匀速运动，y轴匀加速运动。

```js
box.addEventListener("click", function() {
  var self = this, startTime = Date.now(),
      disX = 200, disY = 200,
      duration = 1000 * Math.sqrt(2 * disY / 98);
      //假设10px是1米，disY = 20米

  requestAnimationFrame(function step() {
    var p = Math.min(1.0, (Date.now() - startTime) / duration);
    var tx = disX * p;
    var ty = disY * p * p;

    self.style.tranform = "translate(" + tx + "px," + ty + "px)";
    if(p < 1.0) requestAnimationFrame(step);
  });
});
```

### 圆周运动x轴
公式为:`Sp = S * cos(wt) = S * cos(2 * PI * p)`

### 圆周运动y轴
公式为:`Sp = S * sin(wt) = S * sin(2 * PI * p)`

## 动画的简易封装
为了实现更加复杂的动画，我们可以将动画进行简易的封装，要进行封装，我们先要抽象出动画相关的要素：
- 动画时长: T = duration
- 动画进程: p = t/T (p ∈ [0,1])
- easing:  e = f(p)
- 动画方程: [x, y] = G(e) = G(f(p))
- 动画生命周期: 开始，进行中，结束

```js
function Animator(duration, progress, easing) {
  this.duration = duration;
  this.progress = progress;
  this.easing = easing || function (p) {return p};
}

Animator.prototype = {
  start : function(finished) {
    var startTime = Date.now();
    var duration = this.duration,
        self = this;

    requestAnimationFrame(function step() {
      var p = (Date.now() - startTime) / duration;
      var next = true;

      if( p < 1.0 ) {
        self.progress(self.easing(p), p);
      }else {
        if(typeof finished === 'function') {
          next = finished() === false;
        }else{
          next = finished === false;
        }

        if(!next) {
          self.progress(self.easing(1.0), 1.0);
        }else{
          startTime += duration;
          self.progress(self.easing(p), p);
        }
      }

      if(next) requestAnimationFrame(step);
    });
  }
};
```

在上面的代码里，我们封装出一个简易的动画类 Animator, 这个类的构造器接收三个参数，分别是 duration, process 和 easing。它产生一个对象，包含一个start 方法，这个方法用指定 duration、process 和 easing 执行动画。

有趣的是，start 方法包含一个参数，这个参数是一个布尔类型或者回调函数，当动画结束的时候，如果这个参数是回调函数，将执行这个函数，它的返回值如果不是 false 那么结束动画，否则循环播放动画。如果这个参数是布尔值 flase，那么也循环播放动画。

## 动画队列
使用上面那个动画类会有些问题，**如果有多个动画，就需要这些动画以嵌套的方式来写，为了避免嵌套回调，我们可以实现一个动画队列**

```js
function AnimationQueue(animators) {
  this.animators = animators || [];
}

AnimationQueue.prototype = {
  append : function() {
    var args = [].slice.call(arguments);
    this.animators.push.apply(this.animators, args);
  },

  flush : function() {
    if(this.animators.length) {
      var self = this;

      function play() {
        var animator = self.animators.shift();

        if(animator instanceof Animator) {
          animator.start(function() {
            if(self.animator.length) {
              play();
            }
          });
        }else{
          animator.apply(this);
          if(self.animators.length) {
            play();
          }
        }
      }

      play();
    }
  }
};
```

有了动画队列，我们就可以轻松做更复杂一点的动画，比如

让滑块沿一个矩形边界运动

```js
var a1 = new Animator(1000, function(p) {
  var tx = 100 * p;
  box.style.transform = "translateX(" + tx + "px)";
});

var a2 = new Animator(1000, function(p) {
  var ty = 100 * p;
  box.style.transform = "translate(100px," + ty + "px)";
});

var a3 = new Animator(1000, function(p) {
  var tx = 100 * (1 - p);
  box.style.transform = "translate(" + tx + "px, 100px)";
});

var a4 = new Animator(1000, function() {
  var ty = 100 * (1 - p);
  box.style.transform = "translateY(" + ty + "px";
});

box.addEventListener("click", function() {
  var animators = new AnimationQueue();
  animators.append(a1, a2, a3, a4);
  animators.flush();
})
```

## 使用贝塞尔曲线
贝塞尔曲线可以用来构造平滑动画。

参考:[http://www.w3cplus.com/animation/mathematical-intuition-behind-bezier-curves.html](http://www.w3cplus.com/animation/mathematical-intuition-behind-bezier-curves.html)

我们可以引入 [bezier-easing](https://github.com/gre/bezier-easing) 库了来支持贝塞尔曲线的JS动画：

```js
var easing = BezierEasing(0.86, 0, 0.07, 1);
//easeInOutQuint

var a1 = new Animator(2000, function(ep, p) {
  var x = 200 * ep;

  box.style.transform = "translateX(" + x + "px)";
}, easing);

box.addEventListener("click", function() {
  a1.start();
});
```

## 逐帧动画
有时候，我们不但要支持元素的运动，还需要改变元素的外观，比如飞翔的小鸟需要扇动翅膀，这类动画我们可以用逐帧动画来实现:

小鸟扇翅膀逐帧动画

```html
<style media="screen">
  .sprite{
    display: inline-block;
    overflow: hidden;
    background-repeat: no-repeat;
    background-image:url(http://res.h5jun.com/matrix/8PQEganHkhynPxk-CUyDcJEk.png);
  }
  .bird0{
    width:86px;
    height: 60px;
    background-position: -178px -2px;
  }
  .bird1{
    width:86px;
    height: 60px;
    background-position: -90px -2px;
  }
  .bird2 {
    width:86px;
    height: 60px;
    background-position: -2px -2px;
  }
  #bird{
    position: absolute;
    left:100px;
    top:100px;
    zoom:0.5;
  }
</style>
<div class="sprite bird1">

</div>
```

```js
var i = 0;
setInterval(function() {
  bird.className = "sprite " + "bird" + ((i++) % 3);
}, 1000/10);
```

看上面的代码，其实逐帧动画比之前的动画还要简单，直接用 setInterval 修改元素样式即可，需要注意的是，如果用图片的话，最好是将图片提前预加载了，这样不会出现因为图片还在加载中而显示不出动画的情况。

## CSS3动画
CSS3 支持两种动画，一种是 `Transition`，一种是 `Animation`。

### CSS Animation
详见[CSS Summary之Animation](../Css Summary/Animation/summary.md)

### CSS Transition
详见[CSS Summary之Transition](../Css Summary/transition/summary.md)

### 使用JavaScript控制css Animation 和 Transition
CSS Transitions(过渡)被应用于元素 **指定的属性** 变化时，该属性经过一段时间逐渐的过渡到最终需要的值；而CSS Animations(动画)只是在应用时执行之前定义好的操作，它提供更细粒度的控制。

#### 控制CSS Transition(过渡)
关于`transition`的触发和暂停:
1. 触发元素的`transition`,**切换元素的类名可以触发该元素的transition**
2. 暂停元素的`transition`,**在你想要暂停过渡点，用 `getComputedStyle` 和 `getPropertyValue`获取该元素相应的CSS属性值，然后设置该元素的对应的CSS属性等于你刚才获取到的CSS属性值。**

Example:

```html
<h3>Pure Javascript</h3>
<div class='box'></div>
<button class='toggleButton' value='play'>Play</button>

<h3>jQuery</h3>
<div class='box'></div>
<button class='toggleButton' value='play'>Play</button>
```

```CSS
.box {
  margin: 30px;
  height: 50px;
  width: 50px;
  background-color: blue;
}
.box.horizTranslate {
  -webkit-transition: 3s;
  -moz-transition: 3s;
  -ms-transition: 3s;
  -o-transition: 3s;
  transition: 3s;
  margin-left: 50% !important;
}
```

```js
var boxOne = document.getElementsByClassName("box")[0];
var toogleButton = document.getElementsByClassName('toggleButton')[0];

toggleButton.addEventListener('click', function() {
  if(this.innerHTML === 'Play') {
    this.innerHTML = 'Pause';
    boxOne.classList.add('horizTranslate');
  }else{
    this.innerHTML = 'Play';
    var computedStyle = window.getComputedStyle(boxOne),
        marginLeft = computedStyle.getPropertyValue('margin-left');
    boxOne.style.marginLeft = marginLeft;
    boxOne.classList.remove('horizTranslate');
  }
});
```

有许多不同的CSS属性可以应用到过渡和动画中,可以通过这个网站了解一下:[http://oli.jp/2010/css-animatable-properties/](http://oli.jp/2010/css-animatable-properties/)

#### 使用CSS“回调函数”(一些动画事件)
用监听Dom事件控制CSS `transitions`(过渡)和`animations`(动画)。
- 与`animations`相关的事件:`animationEnd`,`animationStart`和`animationIteration`
- 与`transitions`相关的事件:`transitionEnd`

这些动画事件分别是在元素的动画结束时，开始时，或者完成一次迭代时触发。

目前使用这些事件还需要加浏览器前缀，我们可以通过这样来实现兼容,该方法的参数有element(元素),type(类型)和callback(回调)来实现跨浏览器的兼容:

```js
var heart = document.getElementsByClassName('heart')[1],
    pfx = ["webkit", "moz", "MS", "o", ""],//关键
    hovered = false;

function PrefixedEvent(element, type, callback) {
  for(var p = 0; p < pfx.length; p++) {
    if(!pfx[p]) type = type.toLowerCase();
    element.addEventListener(pfx[p] + type, callback, false);
  }
}

PrefixedEvent(heart, "AnimationIteration", AnimationListener);
```

[https://www.sitepoint.com/css3-animation-javascript-event-handlers/](https://www.sitepoint.com/css3-animation-javascript-event-handlers/) ,这是该方法的出处。

#### 控制CSS Animation(动画)
1. `animation-play-state`属性，当你想在动画执行过程中暂停，并且接下来让动画接着执行。这时CSS的animation-play-state属性是非常有用的。你可以可以通过JavaScript像这样更改CSS(注意你的前缀)：

```js
element.webkitAnimationPlayState = "paused";
element.webkitAnimationPlayState = "running";
```

- 获取当前动画的CSS属性值

  首先要知道几个知识点:

- `document.styleSheets` 来获取与页面关联的样式表的集合。styleSheets属性返回一个类似数组的对象，包含了当前网页的所有样式表。该属性提供了样式表操作的接口。然后，每张样式表对象的cssRules属性，返回该样式表的所有CSS规则。这又方便了操作具体的CSS规则。
- 特定动画值的`CSSKeyFrameRules`对象

```js
function findKeyframesRule(rule) {
  var ss = document.styleSheets;
  for(var i = -; i < ss.length; ++i) {
    for(var j = 0; j < ss[i].cssRules.length; ++j) {
      if(ss[i].cssRules[j].type == window.CSSRule.WEBKIT_KEYFRAMES_RULE && ss[i].cssRules[j].name == rule) {
        return ss[i].cssRules[j];
      }
    }
  }
  return null;
}
```

我们一旦调用上面的函数(例如 var keyframes= findKeyframesRule(anim))，就可以通过`keyframes.cssRules.length`获得该对象的动画长度(这个动画中关键帧的总数量)。然后使用JavaScript的.map方法把获得到的每个关键帧值上的"%"过滤掉，这样JavaScript就可以把这些值作为数字使用。

```js
var keyframeString = [];
for(var i = 0; i < length; i++) {
  keyframeString.push(keyframes[i].keyText);
}

var keys = keyframeString.map(function(str) {
  return str.replace("%", "");
})
```

这里`keys`是一个包含所有动画关键帧数值的数组。

更详细内容:[http://www.w3cplus.com/animation/controlling-css-animations-transitions-javascript.html](http://www.w3cplus.com/animation/controlling-css-animations-transitions-javascript.html)

## CSS动画 && JavaScript动画
### 谁更厉害
[这篇发表在欧朋开发者blog上的文章](http://dev.opera.com/articles/view/css3-vs-jquery-animations/)表明了CSS动画确实渲染得更快，而且比等效的JavaScript占用更少的内存。这是由于渲染CSS动画更多的是由浏览器内部完成的，这提高了很多效率。CSS动画还受益于硬件加速性能的提高。

### 消除疑问：CSS动画 VS. JavaScript
[http://www.w3cplus.com/animation/myth-busting-css-animations-vs-javascript.html](http://www.w3cplus.com/animation/myth-busting-css-animations-vs-javascript.html)

## Web动画性能指南
### 量化动画的流畅程度
动画的实现原理，是利用了人眼的"视觉暂留"现象，在短时间内连续播放数幅静止的画面，使肉眼因视觉残象产生错觉，而误以为画面在"动"。

#### 动画相关的几个概念
帧，帧率，帧时长，跳帧(之前讲过了)

#### 身边的帧率（频率）
- 10FPS达成基本视觉暂留
- 25～30FPS 传统广播电视信号
- 60FPS浏览器渲染刷新频率
- 60～85HZ显示器刷新频率
- 100HZ日光灯管闪烁频率

#### 帧率能反映动画的流畅程度
- 在网页中，帧率能够达到50~60fps的动画将会相当流畅，让人倍感舒适。
- 帧率在30～50fps之间的动画，因各人敏感程度不同，舒适度因人而异
- 帧率在30fps以下的动画，让人感觉到明显的卡顿和不适感。
- 帧率波动很大的动画，亦会使人感觉到卡顿。

#### 几款帧率监测工具
[Stats.js](https://github.com/mrdoob/stats.js)，侦听全局或指定位置的帧率，JS实现，所有浏览器可用

Chrome自带的帧率监测工具，用于侦听全局帧率，以及页面重绘耗时

[chrome](./img/rendering-panel-skitched.png)

Chrome Timeline，杀手级监测 & 调试工具

[chrome](./img/chrome-timeline-skitched.png)

#### 小结
帧率能够量化动画的流畅程度，流畅的动画一般具备两个特点：
- 帧率高（接近60fps最佳）
- 帧率稳定，波动少（极少出现跳帧现象）

### 了解浏览器的渲染机制
#### 浏览器的渲染引擎
各厂出品的浏览器所用的渲染引擎不尽相同： IE使用Trident ，FireFox使用Gecko ，Safari使用WebKit ，Chrome 28+ 和 Opera 15+使用的是Blink（WebKit的分支）。

#### 浏览器渲染的工作环节
- HTML解析（Parse HTML）
- 解析CSS（Parse CSS）
- 生成渲染树（Render Tree / Frame Tree）
- 排版/重排（Layout/Reflow）
- 绘图/重绘（Painting）

各款渲染引擎的基本工作流程可以抽象为下图：

[render](,/img/render-flow-abstract.png)

可见，对于通过修改HTML元素CSS样式实现的动画，每修改一次CSS，浏览器就会做一次上图中CSS解析及其随后的操作。 （但并不是每一次对CSS的修改都会重新排版和绘图）

#### 通过工具监测浏览器渲染行为
目前对浏览器渲染行为的监测，实现较好的是Chrome与Safari，并且这两者能远程调试Android和iOS设备中的Chrome和Safari浏览器（Chrome在Android 4.0后开始支持）。

借助Chrome和Safari的Timeline工具，分析耗时较长的帧，我们便能定位到渲染耗时长的原因，并针对问题原因寻找解决方案。

**Chrome Timeline**

[timing](./img/chrome-timeline-full-skitched (1).png)

#### 现代浏览器的硬件加速渲染通道以及层模型(Layer model)
近些年来，现代浏览器借助于显卡的优势改变了渲染操作：通常被笼统的称为"硬件加速(hardware acceleration)"。

以Chrome为例，在硬件加速渲染通道下，复杂的页面会被分为多个层(Layer)， Chrome对各个层分别进行排版、绘图，再将绘图结果作为"纹理"上传至GPU， 由GPU完成层的3D变换(transform)等操作，最后再将GPU渲染好的层图像进行复合操作(Compesite Layers)，得到最终的画面结果。 因此，通过3D变换实现的位移、旋转、缩放将不会触发浏览器重绘（除非层的内容发生改变）。

可见，可以避免重绘的层模型对于动画调优有着重大意义。

#### 通过工具“看到”层
**Chrome**

[chrome](./img/chrome-layer-skitched.png)

#### 通过分层减小重绘面积
[chrome](./img/chrome-layer-paint-skitched.png)

#### 如何创建新的层
从目前来看（Chrome、Safari等现代浏览器仍在不断迭代演进），以下情况下元素会创建自己的层（包括但不限于以下情况，待完善）：

触发普通元素的分层：transform:translate3d属性（如transform:translateZ(0)）

自带单独分层的元素
- 使用加速视频解码的<video>元素
- <iframe>元素
- Flash等插件

### 动画调优的策略与技巧
提升每一帧性能（缩短帧时长，提高帧率）
- 避免频繁的重排。
- 避免大面积的重绘。
- 优化JS运行性能。

保证帧率平稳（避免跳帧）
- 不在连续的动画过程中做高耗时的操作（如大面积重绘、重排、复杂JS执行），避免发生跳帧。
- 若高耗时操作无法避免，则尝试化解，比如：将高耗时操作放在动画开始或结尾处。将高耗时操作分摊至动画的每一帧中处理。

针对硬件加速渲染通道的优化
- 通过层的变化效果(如transform)实现位移、缩放等动画，可避免重绘。
- 合理划分层，动静分离，可避免大面积重绘。
- 使用分层优化动画时，需要留意内存消耗情况（通过Safari调试工具）。

低性能设备优先调试

Android设备优先调试：移动设备的硬件配置一般低于桌面设备，而移动端设备中，Android设备相比于iOS设备性能普遍较差，因此在Andorid设备下性能问题更加明显，幸运的是Android可以借助Chrome自带的远程调试工具方便调试动画性能（Android 4.0+），所以优先调试Android设备可以更早地发现问题，并能更方便地解决问题。

## Web Animation API
### 认识WAAPI
W3C提出Web Animation API（简称WAAPI）正缘于此，它致力于集合CSS3动画的性能、JavaScript的灵活、动画库的丰富等各家所长，将尽可能多的动画控制由原生浏览器实现，并添加许多CSS不具备的变量、控制以及或调的选项。

### 入门
WAAPI核心在于提供了`Element.animate()`方法，下面看个最简单的例子：

```js
document.body.animate([{'background':'red'}, {'background':'green'}, {'background' : 'blue'}], 3000);
```

使用Chrome 39以上的浏览器运行一下，页面背景色进行了红绿蓝的依次过渡，3s后结束。我们当然是不会满足于这么简单的控制参数，继续看下个例子：

```js
var dot = document.querySelector(".dot");
var frames = [
  {transform:'rotate(0deg) translate(80px)'},
  {transform:'rotate(360deg) translate(80px)'}
];

var timing = {
  duration:2500,
  delay:0,
  iterations:Infinity,
  direction : 'alternate',
  easing : 'ease-in-out',
  fill : 'forwards',
};

dot.animate(frames,timing);
```

可以看到DOM节点具备全新的animate方法，第一个参数是关键帧数组frames[]，对应CSS3中的@keyframes，每一帧的描述与CSS3极其类似；第二个参数是时间控制timing，包括有duration持续时间、iterations执行次数、direction动画方向、easing缓动函数等属性。

### Element.animate()的返回值
`Element.animate()`会返回一个"动画播放器"对象，同时动画开始播放。通过该对象，我们可以获取信息或操作动画。

```js
var player = document.body.animate(/* ... */);
```

**playState** 是该对象的只读属性，我们可以通过这个属性来了解动画的当前状态。播放器共有五种状态:`running`,`paused`,`finished`,`idle`(表示恢复到初始状态),`pending(表示播放或者暂停即将发生时)`。

播放器可以通过四种方式可以改变动画当前的状态:
- `player.pause()`  ==> "paused"
- `player.play()`   ==> "running"
- `player.cancel()` ==> "idle"
- `player.finish()` ==> "finished"

与CSS3动画类似，player可以为动画自然结束或者手动结束时指定一个onfinish函数。

```js
player.onfinish = function(e) {
  //....
}
```

**请注意，设置播放次数Infinity的动画没有自然结束的时机去调用onfinish函数。**

### 时间控制与时间轴
播放器player具有一个读写属性`playbackRate`，用于控制动画的播放速度。

```js
var player = element.animate(/**/);
console.log(player.playbackRate); //1
player.playbackRate = 2;
```

`playbackRate`默认值为1，可以通过设置更大的整数使得动画加速，也可以通过设置大于零的小数来使得动画减缓播放速度。

`player`还具有两个与时间相关的读写属性`currentTime`和`startTime`。前者返回动画当前过去的毫秒数，它的最大值是`timing`参数设置的`delay+(duration*interations)`,而设置`Infinity`的动画没有`currentTime`的最大值。

当设置了`playbackRate`时，动画的`currentTime`并不会变化，真正变化的是时间轴，播放速度的改变使得时间轴被相应拉伸或者压缩。(???)

播放器可以调用reverse()倒叙播放动画，由时间轴的终点走向起点，动画结束时currentTime的值回到0。

```js
player.onfinish = function() {
  player.reverse();
}
```

### 多个动画
CSS3动画是可以同时指定多个keyframes动画到一个DOM节点上，WAAPI同样具备应用多个动画的能力。在一个元素上多次调用animate方法，即实现了一个元素多个动画：

```js
var animated = document.getElementById('toAnimate');
var pulseKeyframes, activateKeyframes, haveFunKeyframes;
var pulse = animated.animate(pulseKeyframes, 1000);
var activate = animated.animate(activateKeyframes, 3000);
var haveFunWithIt = animated.animate(haveFunKeyframes, 2500);
```

每个子动画也拥有独立的timing参数，以及独立的动画状态（播放、停止、完成、取消）和独立的时间轴（启动时间、播放速度和结束时间），方便动画进行细节控制。

### 官方案例以及一些可以学习的库
[https://github.com/web-animations/web-animations-codelabs](https://github.com/web-animations/web-animations-codelabs) [https://github.com/web-animations/web-animations-js](https://github.com/web-animations/web-animations-js)

## 其他
### 用于细节设计的动画
只为非必要的效果和细节设计使用CSS动画的时候，一个什么都不做的方法往往会导致一个可接受的fallback。浏览器会忽略它们无法解析的CSS，所以如果你提前计划，确保你的网站在不能加载动画的时候，看起来不会非常糟糕，那就ok了。

一定要确保添加的动画只是作为额外的非必要的效果或细节，而不是任何影响到布局或重要任务的关键。我发现使用transforms变换和其它不太可能用于的属性，可以帮忙将布局和动画样式分离，所以关注一下那些应用了动画的元素，在没有动画的情况下展示如何。在你酝酿那些你可能并不真正需要的库和fallback之前，测试一下那些do-nothing的方法究竟是干嘛的。

在文章的前面，有一个云朵无限循环的动画示例。如果你有在不支持动画属性的浏览器中查看过该示例，你会看到两朵停在空中的云。我把它们移出了屏幕，因为作为动画的一部分，它们应该是可以在屏幕上飘进飘出的。相比看到空旷的啥都没有的天空，看到两朵静态的云更好一些，在这种情况下，这也是完全可以接受的结果。

出自[http://www.w3cplus.com/css3/CSS3-animation.html](http://www.w3cplus.com/css3/CSS3-animation.html)

### 基本动画
在处理涉及重要效果或包含重要内容的动画时，没有做任何处理和测试是绝对不行的。在这种情况下，你有两个选择：实现fallback；使用比CSS有更广泛的浏览器支持的东西来创建动画。

为了保持你的理智以及和维持同事之间的友谊，**注意避免重复工作（例如，用CSS和JavaScript编写了同样的动画）**，除非你必须这样做或者是为了得到什么显著的效益。对同一个东西创建两个版本的代码并不是一个好注意，尤其是那些你需要经常维护的项目。_在这种项目中，如果你遇到的是需要重要的旧浏览器支持、包含重要内容的动画，使用JavaScript来解决是最好的选择。_

比如说，在CSS中编写一个幻灯片过渡的动画，JavaScript的fallback可以适用于更多的情况，尤其是那些不怎么需要改变的内容。但是，对于某个网站上的一个经常更新的功能模块，为每一个特别的动画都写一个CSS和JavaScript版本的动画，这绝对是在浪费大家的时间。

**要重视fallback，不要告诉用户说他们的浏览器不是我们希望他们使用的，或任何其它能帮助你吸引用户的方法。如果你创建的动画确实是无法以一个合理的方式在用户的浏览器或设备中运行，就尽力为他们提供那些最重要的内容，不要把它们隐藏了就ok。**

一些网站:
- [http://jsbin.com/?html,output](http://jsbin.com/?html,output)
- [http://codepen.io/](http://codepen.io/)

## 一些有用的网站
[http://daneden.github.io/animate.css/](http://daneden.github.io/animate.css/) [上面的那个库的教程](http://www.w3cplus.com/css3/animate-css) [http://julian.com/research/velocity/](http://julian.com/research/velocity/) [https://greensock.com/gsap](https://greensock.com/gsap) [http://www.w3cplus.com/animation/web-animation.html](http://www.w3cplus.com/animation/web-animation.html)
