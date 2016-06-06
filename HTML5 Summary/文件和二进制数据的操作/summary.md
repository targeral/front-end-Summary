# 文件和二进制数据的操作
## Blob对象
Blob(Binary Large Object)对象代表了一段二进制数据，提供了一系列操作接口。

### 生成Blob对象
1. 使用Blob构造函数
2. 对现有的Blob对象使用slice方法切出一部分

**Blob构造函数接受两个参数。第一个参数是一个包含实际数据的数组，第二个参数是数据的类型，这两个参数都是不必需要的。**

```js
var htmlParts = ["<a id=\"a\"><b id=\"b\">hey!<\/b><\/a>"];
var myBlob = new Blob(htmlParts, {"type" : "text\/xml"});
```

**Blob对象的slice方法，将二进制数据按照字节分块，返回一个新的Blob对象。**

```js
var newBlob = oldBlob.slice(startingByte, endingByte);
```

### Blob对象的只读属性
1. `size` : 二进制数据的大小，单位为字节。
2. `type` : 二进制数据的MIME类型，全部为小写，如果类型未知，则该值为空字符串。

## FileList对象
FileList对象针对表单的file控件。当用户通过file控件选取文件后，**这个控件的files属性值就是FileList对象**。_它在结构上类似于数组，包含用户选取的多个文件_。当用户选取文件后，就可以读取该文件。

```html
<input type="file" id="input" onchange="console.log(this.files.length)" multiple>
```

```js
var selected_file = document.getElemntById('input').files[0];
```

采用拖放方式，也可以得到FileList对象。

```js
var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('drop', handleFileSelect, false);

function handleFileSelect(evt) {
  evt.stopPropagation();
  evt.preventDefault();

  var files = evt.dataTransfer.files;// FileList object.
}
```

上面代码的 handleFileSelect 是拖放事件的回调函数，它的参数evt是一个事件对象，该参数的dataTransfer.files属性就是一个FileList对象，里面包含了拖放的文件。

## File API
File API提供`File`对象，它是`FileList`对象的成员，包含了文件的一些元信息，比如文件名、上次改动时间、文件大小和文件类型。

`File`对象的属性值如下:
- `name` : 文件名，该属性只读。
- `size` : 文件大小，单位为字节，该属性只读。
- `type` : 文件的MIME类型，如果分辨不出类型，则为空字符串，该属性只读。
- `lastModified` : 文件的上次修改时间，_格式为时间戳_。
- `lastModifiedDate` : 文件的上次修改时间，_格式为Date对象实例_。

```js
$('#upload-file').files[0]
// {
//   lastModified: 1449370355682,
//   lastModifiedDate: Sun Dec 06 2015 10:52:35 GMT+0800 (CST),
//   name: "HTTP 2 is here Goodbye SPDY Not quite yet.png",
//   size: 17044,
//   type: "image/png"
// }
```

## FileReader API
_`FileReader API`用于读取文件，即把文件内容读入内存_。它的参数是File对象或Blob对象。

对于不同类型的文件，FileReader提供不同的方法读取文件。
- `readAsBinaryString(Blob | File)` : 返回二进制字符串，_该字符串每个字节包含一个0到255之间的整数_。
- `readAsText(Blob | File, opt_encoding)` : 返回文本字符串。默认情况下，文本编码格式为'UTF-8',可以通过可选的格式参数，指定其他编码格式的文本。
- `readAsDataURL(Blob | File)` : 返回一个基于`Base64`编码的`data-uri`对象。
- `readAsArrayBuffer(Blob | File)` : 返回一个ArrayBuffer对象。

### 关于上面几个方法的注意
- `readAsText`,该方法是异步方法，一般监听`onload`事件，**用来确定文件是否加载结束，方法是判断FileReader实例的result属性是否有值**。其他三种读取方法，用法与readAsText方法类似。

```js
var reader = new FileReader();
reader.onload = function(e) {
  var text = reader.result;
}

reader.readAsText(file, encoding);
```

- `readAsDataURL`方法返回一个data URL，它的作用基本上是将文件数据进行Base64编码。**你可以将返回值设为图像的src属性**。

```js
var file = document.getElementById('destination').files[0];
if(file.type.indexOf('image') !== -1) {
  var reader = new FileReader();
  reader.onload = function(e) {
    var dataURL = reader.result;
  }

  reader.readAsDataURL(file);
}
```

- `readAsBinaryString`方法可以读取 **任意类型** 的文件，而不仅仅是文本文件，返回文件的原始的二进制内容。_这个方法与`XMLHttpRequest.sendAsBinary`方法结合使用，就可以使用JavaScript上传任意文件到服务器_。
- `readAsArrayBuffer`方法读取文件，返回一个类型化数组（ArrayBuffer），即固定长度的二进制缓存数据。在文件操作时（比如将JPEG图像转为PNG图像），这个方法非常方便。
- **除了以上四种不同的读取文件方法，FileReader API还有一个abort方法，用于中止文件上传**。

### FileReader的异步回调
FileReader对象采用异步方式读取文件，可以为一系列事件指定回调函数:
- `onabort()`方法 : 读取中断或调用reader.abort()方法时触发。
- `onerror()`方法 : 读取出错时触发。
- `onload()` 方法 : 读取成功后触发。该回调函数接收一个事件对象，该对象的`target.result`就是文件的内容。
- `onloadend`方法 : 读取完成后触发，_不管是否成功_。**触发顺序排在 onload 或 onerror 后面**。
- `onloadstart()`方法 : 读取将要开始时触发。
- `onprogress()`方法 : 读取过程中周期性触发。

关于`onerror`事件的例子,其中注意这些参数:`NOT_FOUND_ERR`、`NOT_READABLE_ERR`、`ABORT_ERR`,他们都是在`target.error`上面的,通过`target.error.code`来进行比较：

```js
var reader = new FileReader();
reader.onerror = errorHander;

function errorHander(evt) {
  switch (evt.target.error.code) {
    case evt.target.error.NOT_FOUND_ERR:
      alert('File Not Found!');
      break;
    case evt.target.error.NOT_READABLE_ERR:
      alert('File is not readable');
      break;
    case evt.target.error.ABORT_ERR:
      break;
    default:
      alert('An error occurred reading this file.');
  }
}
```

下面是一个onprogress事件回调函数的例子，主要用来显示读取进度。

```js
var reader = new FileReader();
reader.onprogress = updateProgress;
function updateProgress(evt) {
  if(evt.lengthComputable) {
    var percentLoaded = Math.round((evt.loaded / evt.totalEricBidelman) * 100);
    var progress = document.querySelector(".percent");
    if(percentLoaded < 100) {
      progress.style.width = percentLoaded + '%';
      progress.textContent = percentLoaded + '%';
    }
  }
}
```

读取大文件的时候，可以利用Blob对象的slice方法，将大文件分成小段，逐一读取，这样可以加快处理速度

## URL对象
URL对象用于生成指向File对象或Blob对象的URL。

```js
var objecturl =  window.URL.createObjectURL(blob);
```

上面的代码会对二进制数据生成一个URL，类似于"`blob:http%3A//test.com/666e6730-f45c-47c1-8012-ccc706f17191`"。_这个URL可以放置于任何通常可以放置URL的地方，比如img标签的src属性_。**需要注意的是，即使是同样的二进制数据，每调用一次URL.createObjectURL方法，就会得到一个不一样的URL**。

### URL失效
这个URL的存在时间，**等同于网页的存在时间**，一旦 **网页刷新** 或 **卸载**，这个URL就失效。除此之外，也可以手动调用`window.URL.revokeObjectURL`方法，使URL失效。
