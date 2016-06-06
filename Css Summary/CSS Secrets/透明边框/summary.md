# 透明边框
## 半透明颜色的产生
- `rgba()`
- `hsla()`

## 问题
假设我们想要美化一个容器，让它拥有一个白色的和半透明白色的边框----这个半透明边框可以让它后面的内容显示出来。我们要做的第一步就像是下面这样：

```css
div{
  border:10px solid hsla(0, 0%, 100%, .5);
  background:white;
}
```

除非你非常了解background和border这两个属性的工作原理，否则上面代码得到的结果会让你感到非常的困惑。边框哪里去了呢？是不是不能为边框添加半透明颜色呢？到底该怎么做？

## 解决方案
虽然看起来的效果和预期有所差异，其实边框是存在的。实际上，背景色默认会扩展到边框上，这一点可以通过给边框添加虚线观察到。如下图所示：

![css-secrets](css-secrets-2-3.png)

在`background`家族里可以使用`background-clip`来解决。`background-clip`的默认值为`border-box`，也就是说，_背景色会填充到容器边框以及边框以内的地方_，所以我们只需要将其修改为`padding-box`（让背景色在容器的内边距以及内边距以内填充）就可以实现所需要的效果了

```css
div{
  border:10px solid hsla(0, 0%, 100%, .5);
  background:white;
  background-clip:padding-box;
}
```

## 总结
虽然在`border-color`上能运用`rgba()`、`hsla()`设置边框为半透明或完全透明，_如果元素设置了背景颜色或背景图片的时候，会直接影响边框的透明颜色效果_。特别是，要看到边框底下的内容时。**造成这个现象是由于背景图片会延伸到边框底部**。要解决这一问题，可以通过CSS3的background-clip来修正

## 文章出处
[http://www.w3cplus.com/css3/css-secrets/translucent-borders.html](http://www.w3cplus.com/css3/css-secrets/translucent-borders.html)
