# JavaScript算法练习：重复字符串
## 目的
**重复字符串** 对所给的字符串根据第一个数字参数重复次数。简单点说，就是创建一个repeat()函数，并且给这个函数传递两个参数，第一个参数是一个字符串str，而第二个参数是一个数字num。执行函数repeat(str, num)之后，字符串str就会重复，而且重复的次数由num来确定。

## 示例

```js
repeatStringNumTimes("*", 3)返回***
repeatStringNumTimes("abc", 3)返回abcabcabc
repeatStringNumTimes("abc", 4)返回abcabcabcabc
repeatStringNumTimes("abc", 1)返回abc
repeatStringNumTimes("*", 8)返回********
repeatStringNumTimes("abc", -2)返回
```

## 实现思路
- 若num小于0，返回空字符串。
- 若num大于0，返回重复num次数的字符串。

实现方式:
1. 在循环中使用字符串相加，比如`result += str`
2. 在循环中将字符串推到(`push`)一个数组中`arr`,然后再通过`join()`方法连接在一起。
3. 使用`new Array()`或`Array.apply()`结合`join()`方法，将重复字符串连接在一起
4. 使用ES6中的`String.prototype.repeat()`方法直接实现重复字符串的连接
