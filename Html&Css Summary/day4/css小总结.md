# 行内(inline)元素 设置margin-top和margin-bottom是否起作用？
**首先**，html里的元素分为替换元素(replaced element)和非替换元素(non-replaced element)
- 替换元素是指用作为其他内容占位符的一个元素。最典型的就是img，它只是指向一个图片文件。以及大多数表单元素也是替换元素，例如input等。
- 非替换元素是指内容包含在文档中的元素。例如，如果一个段落的文本内容都放在该元素本身之内，则这个段落就是一个非替换元素。

**然后**，讨论margin-top和margin-bottom对行内元素是否起作用，则要对行内替换元素和行内非替换元素分别讨论: 首先我们应该明确外边距可以应用到行内元素，规范中是允许的，不过由于在向一个行内非替换元素应用外边距，对行高(line-height)没有任何影响。由于外边距实际上透明的，所以对声明margin-top和margin-bottom没有任何视觉效果。其原因就在于行内非替换元素的外边距不会改变一个元素的行高。而对于行内非替换元素的左右边距则不是这样，是有影响的。 而为替换元素设置的外边距会影响行高，可能会使行高增加或减少，这取决与上下外边距的值。行内替换元素的左右边距与非替换元素的左右边距的作用一[demo][http://codepen.io/paddingme/pen/JwCDF](http://codepen.io/paddingme/pen/JwCDF)

# 对内联元素设置padding-top和padding-bottom是否会增加它的高度？
对于行内元素，设置左右内边距，左右内边距将是可见的(有影响)。而设置了上下内边距，设置背景颜色后可以看见内边距区域有增加，对于行内非替换元素，不会影响行高，不会撑开父元素。而对于替换元素，则撑开了父元素。看下demo：[demo][http://codepen.io/paddingme/pen/CnFpa](http://codepen.io/paddingme/pen/CnFpa)

# 理解rem，设置p的font-size:10rem，当用户重置或拖曳浏览器窗口时，文本大小是否会也随着变化？
不会，rem是以html根元素中font-size的大小为基准的相对度量单位，文本的大小不会随着窗口的大小改变而改变。

# 伪类选择器:checked
> The :checked CSS pseudo-class selector represents any radio (<input type="radio">), checkbox (<input type="checkbox">) or option (<option>in a <select>) element that is checked or toggled to an on state. The user can change this state by clicking on the element, or selecting a different value, in which case the :checked pseudo-class no longer applies to this element, but will to the relevant one.

# 在HTML文本中，伪类:root总是指向html元素？
不是

> 单指创建的根。这个根可能不是 html ，如果是片段html，没有创建根，则为片段的根。把这下面 URL 打到支持 data URL 的瀏覽器看看（Firefox, Chrome, Safari, Opera），可见一斑：

```html
data:application/xhtml+xml,<div xmlns="http://www.w3.org/1999/xhtml"><style>:root { background: green; } html { background: red !important; }</style></div>
```

# translate()方法不能能移动一个元素在z轴上的位置
translate()方法只能改变x轴，y轴上的位移。

# only 选择器的作用是？
停止旧版本浏览器解析选择器的其余部分

only 用来定某种特定的媒体类型，可以用来排除不支持媒体查询的浏览器。其实only很多时候是用来对那些不支持Media Query 但却支持Media Type 的设备隐藏样式表的。其主要有：支持媒体特性（Media Queries）的设备，正常调用样式，此时就当only 不存在；对于不支持媒体特性(Media Queries)但又支持媒体类型(Media Type)的设备，这样就会不读了样式，因为其先读only 而不是screen；另外不支持Media Qqueries 的浏览器，不论是否支持only，样式都不会被采用。

# screen关键词是指设备物理屏幕的大小还是指浏览器的视窗？
浏览器视窗 `@media only screen and (max-width: 1024px) {margin: 0;}`

# 初识BFC
会触发BFC的条件有:
- float的值不为none
- overflow的值不为visible
- display的值为table-cell,table-caption,inline-block的任何一个
- position的值不为relative和static
