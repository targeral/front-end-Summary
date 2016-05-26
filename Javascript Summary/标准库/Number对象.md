# Number
具体的见阮一峰大师的JavaScript标准参考教程 [http://javascript.ruanyifeng.com/stdlib/number.html](http://javascript.ruanyifeng.com/stdlib/number.html)

这里提几个感觉有用的。

## Number.prototype.toFixed()
toFixed方法用于将一个数转为指定位数的小数。

## Number.prototype.toExponential()
toExponential方法用于将一个数转为科学计数法形式。

## Number.prototype.toPrecision()
toPrecision方法用于将一个数转为指定位数的有效数字。

toPrecision方法的参数为有效数字的位数，范围是1到21，超出这个范围会抛出RangeError错误。
