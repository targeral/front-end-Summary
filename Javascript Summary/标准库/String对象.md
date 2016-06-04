# String对象
String对象是JavaScript原生提供的三个包装对象之一，用来生成字符串的包装对象。

```js
var s1 = 'abc';
var s2 = new String('abc');

typeof s1 //"string"
typeof s2 //"object"

s2.valueOf() //'abc'
```

上面代码中，变量`s1`是字符串，`s2`是对象。由于`s2`是对象，所以有自己的方法，**`valueOf`方法返回的就是它所包装的那个字符串。**

**实际上，字符串的包装对象是一个类似数组的对象（即很像数组，但是实质上不是数组）。**

```js
new String('abc')
// String {0: "a", 1: "b", 2: "c", length: 3}
```

_除了用作构造函数，String对象还可以当作工具方法使用，将任意类型的值转为字符串。_

```js
String(true); //"true"
String(5) //"5"
```

## es6之前的String对象
- `String.fromCharCode`
- `String.prototype.length`
- `String.prototype.charAt()`
- `String.prototype.charCodeAt()`
- `String.prototype.concat()`
- `String.prototype.slice()`
- `String.prototype.substring()`
- `String.prototype.substr()`
- `String.prototype.indexOf()`
- `String.prototype.lastIndexOf()`
- `String.prototype.trim()`
- `String.prototype.toLowerCase()`
- `String.prototype.toUpperCase()`
- `String.prototype.localCompare()`
- `String.prototype.match()`
- `String.prototype.search()`
- `String.prototype.replace()`
- `String.prototype.split()`

### String.fromCharCode()
String对象提供的静态方法,该方法的参数是一系列Unicode码点，返回对应的字符串。

```js
String.fromCharCode(104, 101, 108, 108, 111);// "hello"
```

**注意，该方法不支持Unicode码点大于0xFFFF的字符，即传入的参数不能大于0xFFFF。**

### length属性
`length`属性返回字符串的长度。

### charAt()
`charAt`方法返回指定位置的字符，参数是从0开始编号的位置。

```js
var s = new String('abc');
s.charAt(1) // "b"
s.charAt(s.length - 1) // "c"
```

### charCodeAt()
`charCodeAt`方法返回给定位置字符的Unicode码点（十进制表示），相当于`String.fromCharCode()`的逆操作。

### concat()
`concat`方法用于连接两个字符串，返回一个新字符串，**不改变原字符串**。

该方法可以接受多个参数。如果参数不是字符串，concat方法会将其先转为字符串，然后再连接。

### slice()
slice方法用于 _从原字符串取出子字符串并返回_，**不改变原字符串**。

它的第一个参数是子字符串的开始位置，第二个参数是子字符串的结束位置（不含该位置）。如果省略第二个参数，则表示子字符串一直到原字符串结束。如果参数是负值，表示从结尾开始倒数计算的位置，即该负值加上字符串长度。**如果第一个参数大于第二个参数，slice方法返回一个空字符串**

### substring()
`substring`方法用于从原字符串取出子字符串并返回，**不改变原字符串**。它与slice作用相同，但有一些奇怪的规则，_因此不建议使用这个方法，优先使用slice_。

substring方法的第一个参数表示子字符串的开始位置，第二个位置表示结束位置。如果省略第二个参数，则表示子字符串一直到原字符串的结束。如果第二个参数大于第一个参数，substring方法会自动更换两个参数的位置。**如果参数是负数，substring方法会自动将负数转为0。**

### substr()
substr方法用于从原字符串取出子字符串并返回，**不改变原字符串**。_substr方法的第一个参数是子字符串的开始位置，第二个参数是子字符串的长度_。如果省略第二个参数，则表示子字符串一直到原字符串的结束。如果第一个参数是负数，表示倒数计算的字符位置。如果第二个参数是负数，将被自动转为0，因此会返回空字符串。

### indexOf()
用于确定一个字符串在另一个字符串中的位置,_从字符串头部开始匹配_,返回一个整数,表示匹配开始的位置。如果返回-1，就表示不匹配。

它们还可以接受第二个参数，第二个参数表示从该位置开始向后匹配。

### lastIndexOf()
用于确定一个字符串在另一个字符串中的位置,_从尾部开始匹配_,返回一个整数,表示匹配开始的位置。如果返回-1，就表示不匹配。

它们还可以接受第二个参数，第二个参数表示从该位置起向前匹配。

### trim()
trim方法用于去除字符串两端的空格，返回一个新字符串，**不改变原字符串**。

_该方法去除的不仅是空格，还包括制表符（\t）、换行符（\n）和回车符（\r）。_

### toLowerCase()
toLowerCase方法用于将一个字符串全部转为小写

### toUpperCase()
toUpperCase方法用于将一个字符串全部转为大写。

### localeCompare()
localeCompare方法用于比较两个字符串。它返回一个整数，如果小于0，表示第一个字符串小于第二个字符串；如果等于0，表示两者相等；如果大于0，表示第一个字符串大于第二个字符串。

_该方法的最大特点，就是会考虑自然语言的顺序。举例来说，正常情况下，大写的英文字母小于小写字母。_

### match()
match方法用于确定原字符串是否匹配某个子字符串，返回一个数组，成员为匹配的第一个字符串。如果没有找到匹配，则返回null。

```js
'cat, bat, sat, fat'.match('at') //["at"]
'cat, bat, sat, fat'.match('xt') //null
```

**返回数组还有index属性和input属性，分别表示匹配字符串开始的位置和原始字符串。**

```js
var matches = 'cat, bat, sat, fat'.match('at');
matches.index // 1
matches.input // "cat, bat, sat, fat"
```

_match方法还可以使用正则表达式作为参数_

### search()
search方法的用法等同于match，但是返回值为匹配的第一个位置。如果没有找到匹配，则返回-1。

```js
'cat, bat, sat, fat'.search('at') // 1
```

感觉`search()`方法和使用`match()`方法返回的数组的index属性是等同的。

### replace()
replace方法用于替换匹配的子字符串，一般情况下只替换第一个匹配（**除非使用带有g修饰符的正则表达式**）。

```js
'aaa'.replace('a', 'b') // "baa"
```

_replace方法还可以使用正则表达式作为参数_

### split()
split方法按照给定规则分割字符串，返回一个由分割出来的子字符串组成的数组。

如果分割规则为空字符串，则返回数组的成员是原字符串的每一个字符。

```js
'a|b|c'.split('') // ["a", "|", "b", "|", "c"]
```

如果省略参数，则返回数组的唯一成员就是原字符串。

```js
'a|b|c'.split() // ["a|b|c"]
```

如果满足分割规则的两个部分紧邻着（即中间没有其他字符），则返回数组之中会有一个空字符串。

```js
'a||c'.split('|') // ['a', '', 'c']
```

如果满足分割规则的部分处于字符串的开头或结尾（即它的前面或后面没有其他字符），则返回数组的第一个或最后一个成员是一个空字符串。

```js
'|b|c'.split('|') // ["", "b", "c"]
'a|b|'.split('|') // ["a", "b", ""]
```

**split方法还可以接受第二个参数，限定返回数组的最大成员数。**

```js
'a|b|c'.split('|', 0) // []
'a|b|c'.split('|', 1) // ["a"]
'a|b|c'.split('|', 2) // ["a", "b"]
'a|b|c'.split('|', 3) // ["a", "b", "c"]
'a|b|c'.split('|', 4) // ["a", "b", "c"]
```

## es6中的String
### 字符的Unicode表示法
Javascript允许采用`\uxxxx`形式表示一个字符，其中"xxxx"表示字符的码点。但是，这种表示法只限于`\u0000`----`\uFFFF`之间的字符。超出这个范围的字符，_必须用两个双字节的形式表达_。

```js
"\u0061"
// "a"

"\uD842\uDFB7"
// "𠮷"

"\u20BB7"
// " 7"
```

**ES6对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。**

```js
"\u{20BB7}"
// "𠮷"
"\u{41}\u{42}\u{43}"
// "ABC"
```

有了这种表示法之后，JavaScript共有6种方法可以表示一个字符。

```js
'\z' === 'z'  // true
'\172' === 'z' // true
'\x7A' === 'z' // true
'\u007A' === 'z' // true
'\u{7A}' === 'z' // true
```

### codePointAt()
codePointAt方法会正确返回32位的UTF-16字符的码点,_返回的是码点的十进制值_,如果想要十六进制的值，可以使用`toString`方法转换一下。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。codePointAt方法的参数，是字符在字符串中的位置（从0开始）。

```js
var s = '𠮷a';
s.codePointAt(0) // 134071
s.codePointAt(1) // 57271
s.charCodeAt(2) // 97

s.codePointAt(0).toString(16) // "20bb7"
s.charCodeAt(2).toString(16) // "61"
```

**需要知道的:** JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。对于这种4个字节的字符，JavaScript不能正确处理，_字符串长度会误判为2_，而且charAt方法无法读取整个字符，charCodeAt方法只能分别返回前两个字节和后两个字节的值。

**你可能注意到了**，codePointAt方法的参数，仍然是不正确的。比如，上面代码中，字符a在字符串s的正确位置序号应该是1，但是必须向charCodeAt方法传入2。解决这个问题的一个办法是使用for...of循环，因为它会正确识别32位的UTF-16字符。

```js
var s = '𠮷a';
for (let ch of s) {
  console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

**codePointAt方法是测试一个字符由两个字节还是由四个字节组成的最简单方法。**

```js
function is32Bit(c) {
  return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷") // true
is32Bit("a") // false
```

### String.fromCodePoint()
ES5提供`String.fromCharCode`方法，用于从码点返回对应字符，但是这个方法不能识别32位的UTF-16字符（Unicode编号大于`0xFFFF`）。ES6提供了`String.fromCodePoint`方法，可以识别`0xFFFF`的字符，弥补了`String.fromCharCode`方法的不足。在作用上，正好与c`odePointAt`方法相反。

### 字符串的遍历器接口
ES6为字符串添加了遍历器接口,使得字符串可以被for...of循环遍历。除了遍历字符串，这个遍历器最大的优点是 **可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点**。

```js
for(let codePoint of 'too') {
  console.log(codePoint);
}
// "f"
// "o"
// "o"
```

### at()
可以识别Unicode编号大于0xFFFF的字符，返回正确的字符。功能类似于`charAt`，但是`charAt`不能识别码点大于0xFFFF的字符。

### normalize()
为了表示语调和重音符号，Unicode提供了两种方法。一种是直接提供带重音符号的字符，比如Ǒ（\u01D1）。另一种是提供合成符号（combining character），即原字符与重音符号的合成，两个字符合成一个字符，比如O（\u004F）和ˇ（\u030C）合成Ǒ（\u004F\u030C）。

这两种表示方法，在视觉和语义上都等价，但是JavaScript不能识别。

```js
'\u01D1'==='\u004F\u030C' //false

'\u01D1'.length // 1
'\u004F\u030C'.length // 2
```

_上面代码表示，JavaScript将合成字符视为两个字符，导致两种表示方法不相等_。

**ES6提供字符串实例的normalize()方法，用来将字符的不同表示方法统一为同样的形式，这称为Unicode正规化。**

```js
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// true
```

normalize方法可以接受四个参数。
- `NFC`，默认参数，表示"标准等价合成"（Normalization Form Canonical Composition），返回多个简单字符的合成字符。所谓"标准等价"指的是视觉和语义上的等价。
- `NFD`，表示"标准等价分解"（Normalization Form Canonical Decomposition），即在标准等价的前提下，返回合成字符分解的多个简单字符。
- `NFKC`，表示"兼容等价合成"（Normalization Form Compatibility Composition），返回合成字符。所谓"兼容等价"指的是语义上存在等价，但视觉上不等价，比如"囍"和"喜喜"。（这只是用来举例，normalize方法不能识别中文。）
- `NFKD`，表示"兼容等价分解"（Normalization Form Compatibility Decomposition），即在兼容等价的前提下，返回合成字符分解的多个简单字符。

```js
'\u004F\u030C'.normalize('NFC').length // 1
'\u004F\u030C'.normalize('NFD').length // 2
```

**不过，normalize方法目前不能识别三个或三个以上字符的合成。这种情况下，还是只能使用正则表达式，通过Unicode编号区间判断。**

### includes(),startsWith(), endsWith()
传统上，JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。
- **includes()** : 返回布尔值，表示是否找到了参数字符串。
- **startsWith()** : 返回布尔值，表示参数字符串是否 _在原字符串头部_
- **endsWith()** : 返回布尔值，表示参数字符串是否 _在原字符串尾部_

```js
var s = 'Hello world!';
s.startsWith('Hello') //true
s.endsWith('!')//true
s.includes('o')//true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```js
var s = 'Hello world!';
s.startsWith('world', 6);//true
s.endsWith('Hello', 5)//true
s.includes('Hello', 6) //false
```

上面代码表示，使用第二个参数n时，`endsWith`的行为与其他两个方法有所不同。**`endsWith`针对前n个字符，而其他两个方法针对从第n个位置直到字符串结束**。

### repeat()
`repeat`方法返回一个新字符串，表示将原字符串重复n次。参数如果是小数，会被取整。

_如果`repeat`的参数是负数或者`Infinity`，会报错_。**但是，如果参数是0到-1之间的小数，则等同于0，这是因为会先进行取整运算。0到-1之间的小数，取整以后等于-0，repeat视同为0**。参数NaN等同于0。如果repeat的参数是字符串，则会先转换成数字。

```js
'x'.repeat(3) //"xxx"

'na'.repeat(2.9) //"nana"
'na'.repeat(Infinity) // RangeError
'na'.repeat(-1) //// RangeError
'na'.repeat(-0.9) // ""
'na'.repeat(NaN) // ""
'na'.repeat('na') // ""
'na'.repeat('3') // "nanana"
```

### padStart(), padEnd()
ES7推出了字符串补全长度的功能。如果某个字符串不够指定长度，会在头部或尾部补全。`padStart`用于头部补全，`padEnd`用于尾部补全。

`padStart`和`padEnd`一共接受两个参数，_第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串_。
- 如果原字符串的长度，等于或大于指定的最小长度，**则返回原字符串**。
- 如果用来补全的字符串与原字符串，两者的长度之和超过了指定的最小长度，**则会截去超出位数的补全字符串**。
- 如果省略第二个参数，则会用空格补全长度

padStart的常见用途是为数值补全指定位数。下面代码生成10位的数值字符串。

```js
'1'.padStart(10, '0') //"0000000001"
```

另一个用途是提示字符串格式。

```js
'12'.padStart(10, 'YYYY-MM-DD') // "YYYY-MM-12"
'09-12'.padStart(10, 'YYYY-MM-DD') // "YYYY-09-12"
```

### 模板字符串
模板字符串（template string）是增强版的字符串，**用反引号（`）标识**。它可以当作普通字符串使用，也可以 **用来定义多行字符串**，或者 **在字符串中嵌入变量**。
- 如果在模板字符串中需要使用反引号，则前面要用反斜杠转义。
- 如果使用模板字符串表示多行字符串，所有的空格和缩进都会被保留在输出之中。

```js
$('#list').html(`
    <ul>
      <li>first</li>
      <li>second</li>
    </ul>
  `);
```

上面代码中，所有模板字符串的空格和换行，都是被保留的，比如<ul>标签前面会有一个换行。如果你不想要这个换行，可以使用trim方法消除它。

```js
$('#list').html(`
<ul>
  <li>first</li>
  <li>second</li>
</ul>
`.trim());
```

- **模板字符串中嵌入变量，需要将变量名写在`${}`之中**。大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性。模板字符串之中还能调用函数。

```js
function authorize(user, action) {
  if (!user.hasPrivilege(action)) {
    throw new Error(
      // 传统写法为
      // 'User '
      // + user.name
      // + ' is not authorized to do '
      // + action
      // + '.'
      `User ${user.name} is not authorized to do ${action}.`);
  }
}
var x = 1;
var y = 2;

`${x} + ${y} = ${x + y}`
// "1 + 2 = 3"

`${x} + ${y * 2} = ${x + y * 2}`
// "1 + 4 = 5"

var obj = {x: 1, y: 2};
`${obj.x + obj.y}`
// 3

function fn() {
  return "Hello World";
}

`foo ${fn()} bar`
// foo Hello World bar
```

- 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，**将默认调用对象的toString方法**。
- 如果模板字符串中的变量没有声明，将报错。
- 由于模板字符串的大括号内部，就是执行JavaScript代码，因此如果大括号内部是一个字符串，将会原样输出。
- 模板字符串甚至还能嵌套。

```js
const tmpl = addrs => `
  <table>
  ${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
  `).join('')}
  </table>
`;
```

### String.raw()
_ES6还为原生的String对象，提供了一个raw方法_。String.raw方法，往往用来充当模板字符串的处理函数，返回一个斜杠都被转义（即斜杠前面再加一个斜杠）的字符串，对应于替换变量后的模板字符串。

```js
String.raw`Hi\n${2+3}!`;
// "Hi\\n5!"

String.raw`Hi\u000A!`;
// 'Hi\\u000A!'
```

如果原字符串的斜杠已经转义，那么String.raw不会做任何处理。

```js
String.raw`Hi\\n`
// "Hi\\n"
```

**String.raw方法可以作为处理模板字符串的基本方法，它会将所有变量替换，而且对斜杠进行转义，方便下一步作为字符串来使用。**

String.raw方法也可以作为正常的函数使用。这时，它的第一个参数，**应该是一个具有raw属性的对象，且raw属性的值应该是一个数组**。

```js
String.raw({ raw: 'test' }, 0, 1, 2);
// 't0e1s2t'
// 等同于
String.raw({ raw: ['t','e','s','t'] }, 0, 1, 2);
```

## 不改变原字符串的方法
- `String.prototype.concat()`
- `String.prototype.slice()`
- `String.prototype.substring()`
- `String.prototype.substr()`
- `String.prototype.trim()`
