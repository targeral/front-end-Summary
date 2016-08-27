# JDate
## github
https://github.com/tahajahangir/jdate

## 介绍
JavaScript Date类的 *Jalali calendar* 实现

该库实现了一个由原始Date类的API接口实现的JDate类，但是操作在 *Jalali calendar* 上

```js
>>> j = new JDate()
>>> j.toLocaleString()
"Jalali calendar"
```

注意 date对象可以通过 ``_date`` 属性访问到

```js
>>> d = j._date
>>> d instanceof Date
true
>>> d.toString()
"Wed Jul 16 2014 14:51:21 GMT+0430 (IRDT)"
```

## 引用
```html
<script src="jdate.min.js"></script>
```

## 初始化一个JDate 对象
像原生Date类,JDate类能用各种方法来初始化。

注意:不像Date类，JDate类 不能被用作为一个函数。原生Date类如果被当做函数调用的时候，会返回一个 日期的字符串表示。

没有参数的初始化,时间为 **Now**

```js
>>> j = new JDate
```
初始化其他时间的 Date 或 JDate 实例

```js
>>> d = new Date(2014, 2, 15)
>>> j = new JDate(d)
>>> j.toLOcaleString()
"1392/12/24 00:00:00"
>>> j2 = new JDate(j)
>>> j2.toLocaleString()
"1392/12/24 00:00:00"
```

初始化，返回毫秒数

```js
>>> d = new Date(2014, 3, 25)
>>> d.valueOf()
1398367800000
>>> j = new JDate(d.valueOf())
>>> j.toLocaleString()
"1393/02/05 00:00:00"
>>> j.valueOf()
1398367800000
```

解析一个date 字符串(ISO8601 dates and similar local formats accepted)

```js
>>> new JDate('1392/2/5').toLocaleString()
"1393/02/05 00:00:00"
>>> new JDate('1392').toLocaleString() //Interpreted(解释) as ISO8601 UTC date
"1392/01/01 03:30:00"
>>> new JDate('1392-02').toLocaleString() // Interpreted as ISO8601 UTC date
"1392/02/01 04:30:00"
>>> new JDate('1392/02').toLocaleString() // Interpreted as local date
"1392/02/01 00:00:00"
>>> new JDate('1392-02-05 12:31').toLocaleString() // local date
"1392/02/05 12:31:00"
>>> new JDate('1392-02-05T12:31Z').toLocaleString() //  ISO8601 UTC date
"1392/02/05 17:01:00"
>>> new JDate('1392-02-05T09:10:01-0230').toLocaleString()  // ISO8601 with fixed timezone
"1392/02/05 11:10:01"
```

构建 "年/月(/日/时/分/秒/毫秒)". 注意像 Date类, 月的参数是0到11, 日的参数是1到31

```js
>>> new JDate(1392, 2).toLocaleString()
"1393/03/01 00:00:00"
>>> new JDate(1392, 2, 3).toLocaleString()
"1393/03/03 00:00:00"
>>> new JDate(1392, 2, 3, 17).toLocaleString()
"1393/03/03 17:00:00"
```

## JDate类方法
* now : 返回当前时间，以数字形式，和 ``Date.now`` 很像。它的返回值不依赖于所使用的日历
* UTC : 被用于将 *jalali dates* (in UTC time)转换为 数值
* parse : 转换 *jalali string dates* 为 数值,数值为 ``new JDate(str).getTime()``所定义形式

```js
>>> JDate.UTC(1393, 2, 3, 17, 19)
1400951940000
>>> new JDate('1393-03-03T17:19+0000').getTime()
1400951940000
```

## JDate 实例方法
### Time Method
* getHours
* getMilliseconds
* getMinutes
* getSeconds
* getTime
* getUTCDay
* getUTCHours
* getTimezoneOffset
* getUTCMilliseconds
* getUTCMinutes
* getUTCSeconds
* setHours
* setMilliseconds
* setMinutes
* setSeconds
* setTime
* setUTCHours
* setUTCMilliseconds
* setUTCMinutes
* setUTCSeconds
* toTimeString

### ToString
* toDateString
* toISOString
* toJSON
* toString  
* toLocaleDateString
* toLocaleTimeString
* toUTCString
