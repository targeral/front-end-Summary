# Flash of Unstyled Content(FOUC)
## What?
如果使用import方法对CSS进行导入,会导致某些页面在Windows 下的Internet Explorer出现一些奇怪的现象:以无样式显示页面内容的瞬间闪烁,这似乎不可想象,我将这种现象称之为文档样式短暂失效(Flash of Unstyled Content),简称为FOUC.

## How
只需要在文档的head元素中添加一个link元素或者添加script元素就可以防止FOUC的发生.

下面的是出现FOUC的基本head元素内容

```html
<head>
  <title>Page Title</title>
  <style media="screen">
    @@import "style.css";
  </style>
</head>
```
