# js
## tab事件
### 自定义tap事件原理
在touchstart，touchend时记录时间，手指位置，在touchend时进行比较，如果手指位置为同一位置(或允许移动一个非常小的位置值)且时间间隔较短(一般认为是200ms)，且过程中未曾触发过touchmove，即可认为触发了手持设备上的"click",一般称它为"tap"(zepto)

### tap点透bug
解决方案:
1. 使用缓动动画，过渡300ms的延迟
2. 中间层dom元素的加入，让中间层接受这个"穿透"事件，稍后隐藏
3. "上下"都使用tap事件，原理上解决tap透传事件(但不可避免原生标签的click事件)
4. 改用Fastclick的库

## touch事件
- touchstart
- touchmove
- touchend
- touchcancel

除常见的事件属性外，触摸事件包含专有的触摸属性
- **touches** : 跟踪触摸操作的touch对象数组
- **targetTouches** : 特定事件目标的touch对象数组
- **changeTouches** : 上次触摸改变的touch对象数组

## touch对象属性
- clientX
- clientY
- identifier
- pageX
- pageY
- screenX
- screenY
- target

## touch事件在Android上的bug
Android只会触发一次touchstart，一次touchmove，touchend不触发

**解决方案**：在touchmove中加入 `event.preventDefault();` 可修复bug

_但是_ ，`event.preventDefault()` 会导致默认行为不发生，如scroll，导致页面不滚动！

## 弹性滚动
### body层滚动
自带弹性滚动，overflow:hidden失效，GIF和定时器暂停

### 局部滚动
没有弹性滚动，没有滚动惯性，不流畅

**局部滚动开启**

```css
body{
  overflow: scroll;
  -webkit-overflow-scrolling:touch;
}
```

_注意_,Android不支持原生的弹性滚动！但可以借助第三方库iScroll来实现

## 下拉刷新
使用touch事件

## 上拉加载
使用scroll事件
