# 一些其他技巧
## rem相对单位
rem基值设置: 为了适应各大手机屏幕 **rem = screen.width / 20** 这里20不是固定的，也可以是10

如iphone5上的rem基值为32px，渲染一张64_64的div，则用2rem_2rem去渲染。

换算公式为: width:px/rem基值 height:px/rem基值

_不使用rem的情况，font-size_,一般来讲font-size是不应该使用rem等相对单位的。因为字体的大小是趋向于阅读的实用性，并不适合与排版布局。

同理趋向于一些固定的元素特性。我们不使用rem而改为使用px去确保在不同屏幕上表现一致(跟rem的目的相反)

## 一像素问题
通过设置伪类，使用scale缩放

## 多行文本溢出

```css
.text {
  display:-webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  -webkit-box-orient:vertical;//方向
  -webkit-line-clamp:4;//多少行
}
```
