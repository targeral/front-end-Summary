# border解决方案
## double lines

```css
.doubleline{border:3px double #ccc;}
```

## indented lines

```html
<ol id="indented" class="demo">
  <li><p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</p></li>
    <li><p>Aliquam tincidunt mauris eu risus.</p></li>
    <li><p>Vestibulum auctor dapibus neque.</p></li>                   
</ol>
```

```css
#indented {
  background-color: #222;
  width:400px;
}
#indented li{
  border-top:1px solid #111;
  border-bottom: 1px solid #333;
  color:#ccc;
  line-height: 1.8;
  font-size: 16px;
  font-family: Tahoma;
}
#indented li p{
  font-size: 14px;
  font-weight: normal;
  margin:0;
}
```

**注意:注：这里在写这个indented lines效果的时候，顺便加了点内容，就是如何控制ol前面的序列号，在这里我们能看到序列号的字体及大小和li内容都是不一样的，这里的方法主要是在li里面嵌套标签，然后设置li的字体及大小表现为序列号，而li内容的字体及大小由里面的嵌套标签来设置，当然这里不仅仅是设置字体及大小那么简单啊，还有变化出更多丰富的效果**

## pressed lines
