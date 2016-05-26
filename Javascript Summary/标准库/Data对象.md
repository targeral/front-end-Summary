# 1.概述
JavaScript内部，所有日期和时间都储存为一个整数，表示当前时间距离1970年1月1日00:00:00的毫秒数，正负的范围为基准时间前后各1亿天。

## 1.1Date()
作为一个函数，Date对象可以直接调用，返回一个当前日期和时间的字符串。

## 1.1 new Date()
Date对象还是一个构造函数，对它使用new命令，会返回一个Date对象的实例。如果不加参数，生成的就是代表当前时间的对象

# 2.Date对象的静态方法
## 2.1Date.now()
Date.now方法返回当前距离1970年1月1日 00:00:00 UTC的毫秒数

## 2.2Date.parse()
Date.parse方法用来解析日期字符串，返回距离1970年1月1日 00:00:00的毫秒数

## 2.3Date.UTC()
默认情况下，Date对象返回的都是当前时区的时间。Date.UTC方法可以返回UTC时间（世界标准时间）。该方法接受年、月、日等变量作为参数，返回当前距离1970年1月1日 00:00:00 UTC的毫秒数。

# 3.Date实例对象的方法
[[http://javascript.ruanyifeng.com/stdlib/date.html](http://javascript.ruanyifeng.com/stdlib/date.html)]
