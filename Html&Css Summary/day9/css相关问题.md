#CSS相关问题

# CSS中link和@import
1. link属于HTML标签，而@import是CSS提供
2. 页面被加载的时候，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载
3. import只在IE5以上才能识别，而link是HTML标签，无兼容问题
4. link方式的样式的权重高于@import的权重

# position:absolute和float属性的异同
- 共同点:对内联元素设置float和absolute属性，可以让元素脱离文档流，并且可以设置其宽高
- 不同点:float仍会占据位置，position会覆盖文档流中的其他元素。
