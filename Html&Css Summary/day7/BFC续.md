# Css布局中一个简单的应用BFC的例子
## 什么是BFC
BFC(Block Formatting Context)，简单讲，它是提供了一个独立布局的环境，每个BFC都遵守同一套布局规则。例如，在同一个BFC内，盒子会一个挨着一个的排，相邻盒子的间距是由margin决定且垂直方向的margin会重叠。而float和clear float也只对同一个BFC内的元素有效。

## 什么情况产生BFC
w3c标准中这样描述:

> Floats, absolutely positioned elements, block containers (such as inline-blocks, table-cells, and table-captions) that are not block boxes, and block boxes with 'overflow' other than 'visible' (except when that value has been propagated to the viewport) establish new block formatting contexts for their contents.

非块级盒子的浮动，绝对定位及块级容器(比如inline-block，table-cell和table-caption),以及overflow实行是visible之外任意值的块级盒子，都会创建了一个BFC。即当元素CSS属性设置了下列之一时，即可创建一个BFC:
- float:left|right
- position:absolute|fixed
- display:table-cell | table-caption | inline-block
- overflow:hidden | scroll | auto
