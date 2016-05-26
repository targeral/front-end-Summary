# 清除浮动
清除浮动包括清除子元素的浮动和清除上级元素的浮动，其中清除上级元素的浮动，只需设置clear为both就可以了;而清除子元素的浮动则可以用 _空标签法_、_clearfix方法_ 或 _overflow方法_ 。因清除上级元素的浮动比较简单，而空标签法清除子元素浮动会增加额外标签，所以在这里主要说clearfix方法、overflow方法及偶然发现的inline-block方法。

## 为什么清除浮动
一个块级元素的高度如果没有设置height，那么其高度就是由里面的子元素来撑开的，如果子元素使用浮动，脱离了标准的文档流，那么父元素的高度会将其忽略，你可以使用firebug查看下如果不清除浮动，父元素会出现高度不够，那样如果设置border或者background都得不到正确的解析

## clearfix方法

```html
<ul id="demo1" class="nostyle demo clearfix">
   <li><img alt="img1" src="http://placehold.it/150/ffffff/00c5e3&amp;text=demo"></li>
   <li><img alt="img2" src="http://placehold.it/150/ffffff/00c5e3&amp;text=demo"></li>
   <li><img alt="img3" src="http://placehold.it/150/ffffff/00c5e3&amp;text=demo"></li>
</ul>
```

```css
/*简洁版*/
.clearfix:before, .clearfix:after {
    content:"";
    display:table;
}
.clearfix:after{
    clear:both;
    overflow:hidden;
}
.clearfix{
    zoom:1;
}
/* 经典版 */
.clearfix:after {
    visibility: hidden;
    display: block;
    font-size: 0;
    content: " ";
    clear: both;
    height: 0;
}
* html .clearfix             { zoom: 1; } /* IE6 */
*:first-child+html .clearfix { zoom: 1; } /* IE7 */
```

**注：clearfix的方法主要就是在浮动元素的父元素上加上一个clearfix class，然后这个父元素的框就会包括所有的浮动子元素。**

## overflow方法

```css
/* overflow:auto */
#demo2{
    overflow:auto;*zoom:1;
}
/*或 overflow:hidden */
#demo2{
    overflow:hidden;*zoom:1;
}
```

**注：这种方法主要是对父元素设置css，所以不需要加个class，下面的inline-block方法相同，只需设置父元素的css即可**

## 清除子元素浮动inline-block方法(不成熟)

```css
#demo3{
    display:inline-block;*display:inline;*zoom:1;
}
```
