# 1.属性
- E：常数e。
- LN2：2的自然对数。
- LN10：10的自然对数。
- LOG2E：以2为底的e的对数。
- LOG10E：以10为底的e的对数。
- PI：常数Pi。
- SQRT1_2：0.5的平方根。
- SQRT2：2的平方根。
- Math.E // 2.718281828459045
Math.LN2 // 0.6931471805599453
Math.LN10 // 2.302585092994046
Math.LOG2E // 1.4426950408889634
Math.LOG10E // 0.4342944819032518
Math.PI // 3.141592653589793
Math.SQRT1_2 // 0.7071067811865476
Math.SQRT2 // 1.4142135623730951

# 2.方法
## 2.1Math.round()
Math.round方法用于四舍五入。

它对于负值的运算结果与正值略有不同，主要体现在对0.5的处理

```javascript
Math.round(-1.1) // -1
Math.round(-1.5) // -1
```

## 2.2Math.abs()，Math.max()，Math.min()
## 2.3Math.floor()，Math.ceil()
Math.floor方法返回小于参数值的最大整数。

ceil方法返回大于参数值的最小整数

## 2.4pow方法，sqrt方法
Math.pow方法返回以第一个参数为底数、第二个参数为幂的指数值。

Math.sqrt方法返回参数值的平方根。如果参数是一个负值，则返回NaN

## 2.5log方法，exp方法
log方法返回以e为底的自然对数值。

exp方法返回常数e的参数次方。

## 2.6random方法
该方法返回0到1之间的一个伪随机数，可能等于0，但是一定小于1

## 2.7三角函数方法
sin方法返回参数的正弦，cos方法返回参数的余弦，tan方法返回参数的正切。

```javascript
Math.sin(0) // 0
Math.cos(0) // 1
Math.tan(0) // 0
```

asin方法返回参数的反正弦，acos方法返回参数的反余弦，atan方法返回参数的反正切

```javascript
th.asin(1) // 1.5707963267948966
Math.acos(1) // 0
Math.atan(1) // 0.7853981633974483
```
