# About HTML5
## HTML5中新增的标签属性
1. script标签的async属性
2. script标签中有两个和脚本加载时机有关的属性，即async和defer。这两个属性只有在script设置了src属性时才能起作用，
3. defer 浏览器解析到设置了此属性的JavaScript引用，就会以并行的方式下载脚本，而不是阻塞的方式下载。脚本加载完成后，浏览器会在DOMContentLoaded触发之前按照引用顺序运行JavaScript代码。
4. async 浏览器会以异步方式下载JavaScript代码文件，并在下载结束后理解执行代码，并不会等待页面解析结束。

属性defer的作用是让脚步后置加载，相当于把脚本放置于页面最后面加载和执行。 属性async的作用是让脚步异步加载和执行。不能保证脚本按照顺序执行。因此，如果脚本执行之间存在依赖关系，则不能使用async属性。
- base标签的target属性

  作用是指定页面a标签的默认窗口，省去了在a标签中定义target的属性的麻烦。例如:

  ```html
  <head>
  <base target="_blank">
  </head>
  ```

- input,textarea中的placeholder,required,autofocus属性
- 自定义属性data-* ,对应的JavaScript为:dataset
