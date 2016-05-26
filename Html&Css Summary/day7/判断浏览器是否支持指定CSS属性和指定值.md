# 判断浏览器是否支持指定CSS属性和指定值
## 以text-overflow为例,判断判断是否支持text-overflow以及ellipsis值

```js
var element = document.createElement("div");
if( 'textOverflow' in element.style) {
  element.style[ 'textOverflow' ] = 'ellipsis';
  return element.style['textOverflow'] === 'ellipsis';
}else {
  return false;
}
```
