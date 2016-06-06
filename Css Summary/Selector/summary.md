# CSS选择器
## 常用选择器
- 类型选择器(元素选择器)
- 后代选择器
- ID选择器
- 类选择器

## 伪类和伪元素
### 伪类
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

#### 补充
首先看一下所有的伪类:
- :hover (a:hover) 动态伪类
- :active (a:active) 动态伪类
- :focus (a:focus) 动态伪类
- :target (#news:target) 目标伪类 Selects the current active #news element (clicked on a URL containing that anchor name)(选择URI片段标示符的值指向的元素)
- :visited (a:visited) 链接伪类
- :link (a:link) 链接伪类
- :checked (input:checked) 状态性伪类 Selects every checked `<input>` element
- :disabled (input:disabled) 状态性伪类 Selects every disabled `<input>` element
- :enabled (input:enabled) 状态性伪类 Selects every enabled `<input>` element
- :in-range (input:in-range) Selects input elements with _a value within a specified range_
- :valid (input:valid) Selects all input elements with a valid value
- :invalid (input:invalid) Selects all input elements with an invalid value
- :optional (input:optional) Selects input elements _with no "required" attribute_
- :out-of-range (input:out-of-range) Selects input elements with a value outside a specified range
- :read-write (input:read-write) Selects input elements with the "readonly" attribute NOT specified
- :required (input:required) Selects input elements with the "required" attribute specified
- :empty (p:empty) 空伪类 Selects every `<p>` element that has _no children_ (**including text nodes**)
- :nth-child(n) (p:nth-child(2)) 结构性伪类 Selects every `<p>` element that is _the second child of its parent_
- :nth-last-child(n) (p:nth-last-child(2)) 结构性伪类 Selects every `<p>` element that is the second child of its parent, _counting from the last child_
- :nth-of-type(n) (p:nth-of-type(2)) 结构性伪类 Selects every `<p>` element that is _the second `<p>` element of its parent_
- :nth-last-of-type(n) (p:nth-last-of-type(2)) 结构性伪类 Selects every `<p>` element that is the second `<p>` element of its parent, _counting from the last child_
- :first-child (p:first-child) 结构性伪类 Selects every `<p>` element that is the _first child_ of its parent
- :first-of-type (p:first-of-type) 结构性伪类 Selects every `<p>` element that is the _first `<p>` element_ of its parent
- :last-child (p:last-child) 结构性伪类 Selects every `<p>` element that is the last child of its parent
- :last-of-type (p:last-of-type) 结构性伪类 Selects every `<p>` element that is the last `<p>` element of its parent
- :only-of-type (p:only-of-type) 结构性伪类 Selects every `<p>` element that is _the only `<p>` element of its parent_(若元素是父元素的子元素，且只有一个 **这种类型** 的子元素)
- :only-child (p:only-child) 结构性伪类 Selects every `<p>` element that is the only child of its parent(若元素是父元素的子元素，且只有一个子元素)
- :lang(language) (p:lang(it)) Selects every `<p>` element with a lang attribute equal to "it" (Italian)
- :not(selector) 否定伪类 (:not(p)) Selects every element _that is not a `<p>` element_
- :root (:root) Selects the document's root element
- nth-child(n+6) 表示从头第六个开始选择，包括第六个。
- nth-last-child(n+6) 表示从尾第六个开始选择，包括第六个。
- nth-child(-n+6) 表示从开始的第六个开始到开始的第一个。
- nth-last-child(-n+6) 表示从倒数的第六个开始到倒数第一个。

###伪元素 伪元素并不存在与Dom树中，是一种动态元素。通过选择器操纵伪元素，可以给页面的一些特殊部分应用样式。有个要点需要注意， **一个选择器只能给一个伪元素，比如:".el:before", 但是不能同时存在多个，比如:".el:before:after"**

#### 文本伪元素
- :first-letter 会匹配一个元素内文字的第一个字母
- :first-line 则会匹配第一行。

#### 生成内容伪元素
:before与:after生成内容伪元素向被选择的元素内部追加新的行内伪元素。这一类伪元素最普遍的用法，是配合content属性，向页面内添加一些不太重要的内容，但并不常常如此。伪元素不需要使用额外的元素标签，就可以向页面添加一些用户界面相关的内容。
- :before 在被选择元素前创建伪元素
- :after 在被选择元素后面创建伪元素

#### 片段伪元素
::selection片段伪元素选择通过用户操作所选定或者高亮的部分，选定的部分会被应用样式，不过只能使用color,background,background-color,text-shadow属性。值得注意的是background-image属性会被忽略。当利用缩写的background属性来定义样式时，只有背景色会生效，任何图片都会被忽略。
- ::selection

#### 单个冒号（:）和双冒号（::）
在w3c中有`::before`和`::after`，他们上面的描述和`:before`和`:after`的描述是一样的。

片段伪元素是css3新增加的内容，为了与伪类所区别，伪元素前前面用双冒号表示。很幸运的是大部分浏览器都支持单引号与双引号两种方式，不过 ::selection伪元素前面必须以双引号开头。

### 伪类与伪元素的区别
- CSS 伪类用于向某些选择器添加特殊的效果。
- CSS 伪元素用于将特殊的效果添加到某些选择器。

伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。

## 通用选择器

```css
*{
    margin:0;+
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

#### 补充
相邻同胞选择器属于兄弟选择器。兄弟选择器可以通过不同兄弟选择器与相邻兄弟选择器两种方式来创建。上面讲到的相邻同胞选择器属于相邻兄弟选择器，**要点就是相邻兄弟选择器只会选择紧跟着一个元素的另一个元素。也就是说第二个元素应该直接紧跟第一个元素并且拥有相同父元素。**

而普通兄弟选择器则是 **第二个元素乃至后面的元素**，只要是第一个元素的兄弟元素(不需要紧跟着)，且两个元素拥有共同的父元素。_它通过`~`来创建_。看一下例子：

```css
h2 ~ p{
  ...
}
```

```html
<p>...</p>
<section>
  <p>...</p>
  <h2>...</h2>
  <p>...</p>
  <div>
    <p>...</p>
  </div>
  <p>...</p>
</section>
```

第5行跟第9行的段落会被选择，因为他们相对文档流在h2元素的后面，同时拥有相同的父元素，因此元素被选择，应用样式加粗。

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

|| 选择器      || 特殊性   || 以10为基数的特殊性 || || Style=""    || 1,0,0,0  || 1000            || || #id         || 0,1,0,0  || 100                || || .class      || 0,0,1,0  || 10                 || || div         || 0,0,0,1  || 1                  ||
