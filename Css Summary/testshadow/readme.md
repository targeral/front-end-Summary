# Text Shadow
## 语法

```
text-shadow ： none | <length> none | [<shadow>, ] * <shadow> 或none | <color> [, <color> ]*
也就是：
text-shadow:[颜色(Color)  x轴(X Offset) y轴(Y Offset) 模糊半径(Blur)],[颜色(color) x轴(X Offset) y轴(Y Offset) 模糊半径(Blur)]...
或者
text-shadow:[x轴(X Offset) y轴(Y Offset)  模糊半径(Blur)  颜色(Color)],[x轴(X Offset) y轴(Y Offset)  模糊半径(Blur)  颜色(Color)]...
```

## 取值
- <length>：长度值，可以是负值。用来指定阴影的延伸距离。其中X Offset是水平偏移值，Y Offset是垂直偏移值
- <color>：指定阴影颜色，也可以是rgba透明色
- <shadow>：阴影的模糊值，不可以是负值，用来指定模糊效果的作用距离。

## 说明
可以给一个对象应用一组或多组阴影效果，方式如前面的语法显示一样，用逗号隔开。text-shadow: X-Offset Y-Offset Blur Color中X-Offset表示阴影的水平偏移距离，其值为正值时阴影向右偏移，如果其值为负值时，阴影向左偏移；Y-Offset是指阴影的垂直偏移距离，如果其值是正值时，阴影向下偏移反之其值是负值时阴影向顶部偏移；Blur是指阴影的模糊程度，其值不能是负值，如果值越大，阴影越模糊，反之阴影越清晰，如果不需要阴影模糊可以将Blur值设置为0；Color是指阴影的颜色，其可以使用rgba色。

## 兼容
IE是不支持text-shadow，但为了在兼容这一问题，我们只好使用滤镜filter:shadow来处理（本人不提倡使用滤镜）。filter:shadow滤镜作用与dropshadow类似，也能使用对象产生阴影效果，不同的是shadow可产生渐近效果，使用阴影更平滑实现。

```
 E {filter:shadow(Color=颜色值,Direction=数值,Strength=数值)}
```

其中E是元素选择器，Color用于设定对象的阴影色；Direction用于设定投影的主向，取值为0即零度（表示向上方向），45为右上，90为右，135为右下，180为下方，225为左下方，270为左方，315为左上方；Strength就是强度，类似于text-shadow中的blur值。

## 效果
公共样式如下:

```css
.demo{
  background: #666;
  width:40px;
  padding:30px;
  font:bold 55px/100% "微软雅黑", "Lucida Grande", "Lucida Sans", Helvetica, Arial, Sans;
  color:#FFF;
  text-transform: uppercase;
}
```

### 效果一 : Glow and Extra Glow effect(也就是NEON effect)

```css
.demo2{
  text-shadow: 0 0 20px red;
}
```

关键点在于模糊半径。

辉光效果，我们设置比较大的模糊半径来增加其辉光效果，你可以改变不同的模糊半径值来达到不同的效果，当然你也可以同时增加几个不同的半径值，创造多种不同的阴影效果。就如下面的NEON效果。

### 效果二 : Apple Style Effect

```css
.demo4{
  color:#000;
  text-shadow: 0 1px 1px #fff;
}
```

### 效果三 : Photoshop Emboss Effect

```css
.demo5{
  color:#ccc;
  text-shadow: -1px -1px 0 #fff, 1px 1px 0 #333, 1px 1px 0 #444;
}
```

效果二和效果三分别和Photoshop中的投影和浮雕效果很类似。应用这两个效果一定要注意，_其模糊值一定要设置为0_，使文本不具有任何模糊效果，主要用来增加其质感。

### 效果四 : Blurytext Effect

```css
.demo6{
  color:transparent;
  text-shadow: 0 0 5px #f96;
}
```

用text-shadow制作模糊的效果主要要注意一点就是，把文本的前景色设置为透明transparent,如果模糊值越大，其效果越糊糊；其二，我们不设置任何方向的偏移值。如果结合前面的photoshop emboss效果，可以让你得到不同的效果。提醒一下opera浏览器不支持这个效果。

### 效果五 : Inset text effect

```css
.demo8{
  color: #566F89;
  background: #C5DFF8;
  text-shadow: 1px 1px 0 #E4F1FF;
}
```

这种效果需要注意以：**文字的前景色要比背景色暗，阴影颜色稍比背景色亮一点点**，这一步很重要，如果阴影色太亮看起来会怪，如果太暗将没有效果显示。

### 效果六 : Stroke text effect

```css
.dmeo9{
  color:#fff;
  text-shadow: 1px 1px 0 #f96, -1px -1px 0 #f96;
}
```

描边效果跟我们在Photoshop相比，我承认效果差很多，出现断点，但有时还是可以试用达到一种特殊的描边效果，其主要运用两个阴影，第一个向左上投影，而第二向右下投影，还需注意，制作描边的阴影效果我们不使用模糊值。

### 效果七 : 3D text effect

```css
.demo10 {
  color: #fff;
  text-shadow: 1px 1px rgba(197, 223, 248,0.8),2px 2px rgba(197, 223, 248,0.8),3px 3px rgba(197, 223, 248,0.8),4px 4px rgba(197, 223, 248,0.8),5px 5px rgba(197, 223, 248,0.8),6px 6px rgba(197, 223, 248,0.8);
}
```

3D文字效果运用原理就是像Photoshop一样，我们在文字的下方或上方复制了多个图层，并把每一个层向左上或右下方向移动一个1px距离，从而制作出3D效果。同时我们层数越多，其越厚重。换成用text-shadow制作就是使用多个阴影，并把阴影色设置相同，给其使用rgba色效果更佳，

### 效果八 : Vintge/Retro text effect

```css
.demo11 {
  color:#eee;
  text-shadow: 5px 5px 0 #666, 7px 7px 0 #eee;
}
```

**Vintage retro这种风格的文字效果是由两个文本阴影合成的，这里需要注意的是：第一个阴影色和背景色相同；文本前景色和第二个阴影色相同**

### 效果九 : Anaglyphic text effect

```css
.demo13 {
  color:rgba(255, 179, 140, 0.5);
  text-shadow: 3px 3px 0 rgba(180, 255, 0, 0.5);
}
```

anaglyphic文字效果起到一种补色的效果，从而制作出一种三维效果图。其效果是用css重新使用的文字阴影和文本前景的rgba色组合而成。在文本的前景色和阴影上同时使用rgba色，使底层的文字是通过影子可见。
