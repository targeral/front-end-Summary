# ng的模块
## 模块的好处

* 保持全局命名空间的清洁
* 编写测试代码更容易，并能保持其清洁，以便更容易找到互相隔离的功能
* 易于在不同应用间复用代码
* 使应用能够以任一顺序加载代码的各部分

## angular.module(args1, args2)

* 第一个参数是模块的名称，字符串变量
* 第二个是依赖列表，字符串变量组成的列表。
