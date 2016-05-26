# 过程中涉及到的知识
## DomContentLoaded事件，readystatechange事件
以下事件与文档状态相关。

1. DOMContentLoaded事件

当HTML文档下载并解析完成以后，就会在document对象上触发DOMContentLoaded事件。这时，**仅仅完成了HTML文档的解析（整张页面的DOM生成）**，所有外部资源（样式表、脚本、iframe等等）可能还没有下载结束。也就是说，*这个事件比load事件，发生时间早得多*。

**注意，网页的JavaScript脚本是同步执行的，所以定义DOMContentLoaded事件的监听函数，应该放在所有脚本的最前面。否则脚本一旦发生堵塞，将推迟触发DOMContentLoaded事件。**

2. readystatechange事件

readystatechange事件发生在Document对象和XMLHttpRequest对象，当它们的readyState属性发生变化时触发。

```js
document.onreadystatechange = function() {
    if( document.readyState == 'interactive') {
        //....
    }
}
```

**IE8不支持DOMContentLoaded事件，但是支持这个事件。因此，可以使用readystatechange事件，在低版本的IE中代替DOMContentLoaded事件。**