# Standard HTML
## 标准的页面的优点
1. 标准的页面会保证浏览器正确渲染
2. 页面能够更容易被搜索引擎搜寻，提高网站的搜索排名
3. 提高网站的易用性
4. 网页更好维护和扩展

## 正确闭合HTML标签
### 自闭合标签
area, base, br, col, command,embed,hr,img,input,keygen,link,meta,param,source,track,wbr

有关自闭合标签中是否应该添加符号"/",在XHTML1.0，HTML4.0.1和HTML5的规范中稍有不同。
- XHTML的规范最严格，必须在自闭合标签中添加"/"来表面标签的结束。
- 在HTML4.01规范中，不推荐在自闭合标签中添加"/"。
- 而HTML5最宽松，自闭合标签添加"/"的不添加都符合规范。

## 样式与结构分离
css样式应用于HTML总共有4中方式:
- 在html页面中链接一个css文件(最佳实践)
- 在HTML页面页面中内嵌CSS样式
- 在HTML标签中添加内联css样式
- 在CSS样式文件中加载CSS样式

## 添加JavaScript禁用的提示消息
最常用的方式是使用`<noscript></noscript>`,但是更好的方式是更改设计，让页面从无脚本模式过渡到有脚本的模式，即不支持脚本到支持脚本的渐进增强 **最佳实践是**：提示用户JavaScript已被禁用，并同时提示一个功能简单，不依赖于JavaScript的代替网站供用户继续浏览，做到平稳降级。

## 添加必要的meta标签
meta标签放置在HTML页面的head中，主要用于标识网站。其中基本上包含了网站的一些描述信息，如简介，作者等。这些信息有助于搜索引擎更准确地识别网页的内容。

### 关于meta
meta标签有四个属性:name,http-equiv,content,charset。meta标签通过name属性来表述页面文档的元信息，通过http-equiv属性设置HTTP请求指令，通过charset设置页面的字符编码。按照属性设置分类，meta可以分为三类:
1. name属性和content属性组合，构成名称/值对，用于描述网站信息
2. http-equiv属性和content属性组合，设置特定的http指令
3. charset属性，设置页面字符编码

### 常用的meta
- 设置IE浏览器的兼容模式

  ```html
  <meta http-equiv="X-UA-Compatible" content="IE=8" />
  ```

  在IE中此设置的优先级高于通过DOCTYPE设置的文档标准

- 设置页面在移动设备中的显示

  一般针对移动设备优化的网页都会添加一条meta设置，使得网页在以移动设备显示正常，设置的代码类似如下的代码语句:

  ```html
  <meta name="viewport" content="width=device-width, initial-scale=1,maximum-scale=1" />
  ```
