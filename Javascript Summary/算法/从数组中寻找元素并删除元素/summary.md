# 从数组中寻找元素并删除元素
今天的任务中创建一个destroyer()函数，其功能是对所给的数组根据参数删除这些元素。也就是说给destroyer()传入一个参数arr，而且这个参数是类似这样的[1,2,3,4,5,2,3,1,3],1,3，要做的事情就是从数组[1,2,3,4,5,2,3,1,3]删除所有的1和3元素。

## 实现思路
- 通过arguments对象将所有参数包装成一个数组args
- 通过JavaScript的一些方法将arr参数移除，也就是需要删除的参数
- 通过Array.indexOf()将arr除外的args数组做为过滤的条件
- 通过filter()方法创建过滤条件，将arr中符合filter()条件的元素删除，当然除了通过filter()之外，还可以使用JavaScript中的for循环返回最后的arr

## 将涉及到的JavaScript方法
- `arguments` : `arguments`是一个类数组对象。代表传给一个function的参数列表。它是函数内部的本地变量，已不再是函数的属必了。可以在函数内部通过使用`arguments`对象来获取函数的所有参数。
- `Array.prototype.indexOf()`
- `Array.prototype.filter()` : filter方法依次对所有数组成员调用一个测试函数，返回结果为true的成员组成一个新数组返回。该方法不会改变原数组。filter方法的参数函数可以接受三个参数，第一个参数是当前数组成员的值，这是必需的，后两个参数是可选的，分别是当前数组成员的位置和整个数组。
- `Array.prototype.slice.call(arguments, 1)` 将arguments转换为数组并移除第一个元素。

## 实现

```js
function destroyer() {
  var args = Array.prototype.slice.call(arguments);
  var arr = args.shift();
  console.log(arr);
  console.log(args);
  var newArr = arr.filter(function(value) {
    return args.indexOf(value) === -1;
  });

  return newArr;
}
```

**es6的实现**

```js
function destroyer(arr) {
  var removeArgs = new Set(Array.prototype.slice.call(arguments, 1)); //Set{1, 2}

  function isFalse(value) {
    return !removeArgs.has(value);
  }

  return arr.filter(isFalse);
}
```

或者

```js
function destroyer(arr, ...items) {
    var removeArgs = new Set(items); // Set {1, 2}

    function isFalse (value) {
        return !removeArgs.has(value);
    }

    return arr.filter(isFalse);
}
```
