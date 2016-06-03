# 将一个数插入数组并返回其索引值
## 算法部分
### 任务
将创建一个函数where()并且给这个函数传入两个参数，其中一个参数是数组arr，而另一个参数是num。函数where()要完成的功能是，将参数num按照大小顺序插入到数组arr中，并且找出num在该数组中的索引值。

### 测试用例
- where([1,2,3,4], 1.5)将返回1
- where([20,3,5],19)将返回2
- where([40,60],50)将返回1

### 实现思路
实现上述功能，大致思路分为下面几个步骤：
1. 可以通过push()或者unshift(),把参数num放到arr中
2. 对数组arr进行排序，在过sort()将数组由小到大做升序排序
3. 使用indexOf()找出num在数组arr中的index(或者使用for循环)
4. 传回index

### 代码
实现很简单，先说一种:

```js
function where(arr, num) {
  //sort的比较算法
  function compare(a, b) {
    if(a > b) {
      return 1;
    }else if(a < b) {
      return -1;
    }else{
      return 0;
    }
  }
  var index = 0;
  arr.push(num);//关键1
  arr.sort(compare);//关键2
  index = arr.indexOf(num);//关键3
  return index;
}
```

再来一个es6的实现:

```js
function where(arr, num) {
  let index = arr.sort((x, y) => x-y).find(x => num <= x);
  return index === undefined ? arr.length : arr.indexOf(index);
}
```

### 用到的方法
- `Array.prototype.push()`
- `Array.prototype.unshift()`
- `Array.prototype.sort()`
- `Array.prototype.indexOf()`

## 其他
### 将一个字符串数组变为一个数组
- 首先通过`trim()`去掉收尾的空串。
- 然后通过`slice(1, str.length-1)`去掉'['和']'
- 再之后通过`split(',')`，分割字符串，去掉逗号，返回一个数组，但是此时它们的值都为字符串。
- 最后将数组中的每个值通过`parseFloat`转换为数值，返回一个新数组。

用到的方法有:
- `String.prototype.trim()`方法用于去除字符串两端的空格，返回一个0 _新字符串_，**不改变原字符串**。
- `String.prototype.slice()`方法用于从原字符串取出子字符串并返回，**不改变原字符串**。
- `String.prototype.split()`方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。如果省略参数，则返回数组的唯一成员就是原字符串。**如果满足分割规则的两个部分紧邻着（即中间没有其他字符），则返回数组之中会有一个空字符串**。split方法还可以接受第二个参数，限定返回数组的最大成员数。
- `parseFloat`方法用于将一个字符串转为浮点数。
