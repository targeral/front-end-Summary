# CSS选择器
## 常用选择器
- 类型选择器(元素选择器)
- 后代选择器
- ID选择器
- 类选择器

## 伪类
有时候我们需要根据文档结构之外的其他条件对元素应用样式。例如表单元素或链接的状态。这要使用 _伪类_ 选择器来完成。

```css
a:link{
    color:blue;
}
a:visited{
    color:green;
}
a:hover, a:focus, a:active{
    color:red;
}
```

1. :link和:visited称为链接伪类，只能用于锚元素。
2. :hover, :active, :focus称为动态伪类，理论上可以用于任何元素。
3. 可以通过混合使用这些伪类来创造更为复杂的行为。比如在已访问和未访问上实现不同的鼠标悬停效果。

## 通用选择器

```css
*{
    margin:0;
    padding:0;
}
```

## 高级选择器
### 子选择器和相邻同胞选择器(">" & "+")
后代选择器是选择元素的所有后代，而_子选择器是选择元素的直接后代，即子元素_。

```css
#nav > li{
    ....
}
```

有时候会有这样的需求:根据一个元素与另一个元素之间的相邻关系对它应用样式。

_相邻同胞选择器可用于定位同一个父元素下某一个元素之后的元素。_

例如:可以使用相邻同胞选择器让顶级标题后面的第一个段落显示为粗体，灰色，并且字号比后续段落略大。

```css
h2 + p{
    font-size:1.4em;
    font-weight : bold;
    color:#666;
}
```

### 属性选择器
_属性选择器是通过判断某个属性是否存在或者某个属性的值来寻找元素_

```css
acronym[title] {
    border-bottom:1px dotted #999;
}

acronym[title]:hover, acronym[title]:focus{
    cursor:help;
}

a[rel="nofollow"] {
    ....
}
```

## 层叠和特殊性
首先，按照层叠重要度决定规则。层叠重要度次序:
1. 标有"!important"的用户样式
2. 标有"!important"的作者样式
3. 作者样式
4. 用户样式
5. 浏览器/用户代理应用的样式

然后，按照选择器的特殊性决定规则。_具有更特殊选择器的规则优先于具有一般选择器的规则。如果两个规则的特殊性相同，那么后定义的规则优先_。

为了计算规则的特殊性，通过给每个选择器分配不同的权值，然后通过累加，比较最后的权值的大小来决定特殊性。权值越大，越特殊。

选择器的特殊性分为4个成分等级:a, b, c, d
1. 如果样式是行内样式，那么a = 1
2. b等于ID选择器的数量。
3. c等于类，伪类和属性选择器的数量
4. d等于类型选择器和伪元素选择器的数量

通过上面的规则，根据下表可以计算任何css选择器的特殊性。

|| 选择器      || 特殊性   || 以10为基数的特殊性 || || Style=""    || 1,0,0,0  || 1000               || || #id         || 0,1,0,0  || 100                || || .class      || 0,0,1,0  || 10                 || || div         || 0,0,0,1  || 1                  ||
