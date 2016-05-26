# 固定布局解决方案
## 考虑
1. 是否应用大背景分为两种类型，一种是允许整体有一个大背景;一种是头部，中间及底部都可以平铺一个全屏的大背景。
2. 有无边框讨论三种情况，一种是有左或右边栏，一种是没有边栏，最后是左右边栏都存在。

## html结构详解
我们使用html5标签，所以有必要针对ie6-8导入html5.js。然后我们设置把所有的结构都包含在一个class为page的div里面，在这里div中我们还需要加上布局的class，aside-left,aside-right,two-sides,no-side分别对应左边栏，右边栏，左右两栏，没有边栏布局,这里我们以两栏布局为例，总共包括五个区域，分别为header，left，content，right，footer区域，每个区域里面我们增加了一层class为inner的div，这个inner主要是用来辅助我们布局，默认我们inner设置了margin左右的各位10px，可以根据实际需要来覆写。

## 为什么使用inner
我们说了这个是用来辅助我们布局的，很多时候我们布局的时候不得不考虑border及左右的margin，padding等，现在我们完全把这些抛在脑后，交给我们的inner来完成。如整个宽度为1000px，左右边栏各为200px，而内容为600px。我们以前的思想应该是左右为200px，然后中间内容就是580px（margin为10px）或560px（margin为20px），这样我们如果需要改为980px，我们又得改好几个值，然后如果我们左右边栏要加个边框，又变成了202px，或者要设置左右宽度为198px，这是多么的纠结啊。现在引入inner，我们在布局的时候直接计算宽度不需要考虑border，margin，padding什么的，然后通过对各个区域里面的inner重新覆写，不就搞定了吗。这里贴出左右两栏的html代码供参考。具体的请看下面的demo

## html demo

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <title>aside left & right demo</title>
    <link rel="stylesheet" type="text/css" href="css/style.css" media="all" />
    <!--[if lt IE 9]>
    <script src="js/html5.js" type="text/javascript"></script>
    <![endif]-->
</head>
<body>
    <div class="page two-asides">
        <header id="header" class="clearfix">
            <div class="inner">
            </div>
        </header>

        <section id="container" class="clearfix">        
            <aside id="aside_left" class="aside">
                <div class="inner">
                </div>
            </aside><!--aside_left-->

            <section id="main">
                <div class="inner">
                </div>        
            </section><!--main-->

            <aside id="aside_right" class="aside">
                <div class="inner">
                </div>
            </aside><!--aside_right-->    
        </section><!--container-->

        <footer id="footer" class="clearfix">
            <div class="inner">
            </div>
        </footer>
    </div>
</body>
</html>
```

如果需要为header，container及footer部分各设计一个全屏的背景，上面的这个肯定是不行的了，我们可以这三个div外面再加一层wrap，而这个wrap就是全屏的。

## 参考
[http://www.w3cplus.com/solution/layout/layout.html](http://www.w3cplus.com/solution/layout/layout.html) [http://www.w3cplus.com/solution/layout/demo/aside-left.html](http://www.w3cplus.com/solution/layout/demo/aside-left.html)
