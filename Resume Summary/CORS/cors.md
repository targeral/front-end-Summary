# CORS(关于资源共享)
所有主流浏览器都支持CORS，不过IE8和IE9的该方法不是部署在XMLHttpRequest对象，而是部署在XDomainRequest对象。检查浏览器是否支持(支持跨域)的代码如下:

```javascript
var xhr = new XMLHttpRequest();

if( "withCredentials" in xhr ) {
  //发出跨域
}
```

## 原理
增加一条HTTP头信息的查询，询问服务器端，当前请求的域名是否在许可名单之中，以及可以使用哪些HTTP动词。如果得到肯定的答复，就发出XMLHttpRequest请求。这种机制叫做"预检"

"预检"的专用HTTP头信息是 **Origin**。例如:

```
Origin: http://www.example.com
```

如果服务器端如果同意，就会返回一个 **Access-Control-Allow-Origin** 头信息。

预检请求中，浏览器还告诉服务器，实际发出的请求，将使用HTTP动词是什么，例如:

```
Access-Control-Request-Method : POST
Access-Control-Request-Headers : X-PINGOTHER
```

服务器收到预检请求后，作出回应:

```
Access-Control-Allow-Origin: http://www.example.com
Access-Control-Allow-Methods: POST, GET, OPTIONS
Access-Control-Allow-Headers: X-PINGOTHER
```

由于整个过程都是浏览器自动后台完成，不用用户参与，所以对于开发者来说，使用Ajax跨域请求与同域请求没有区别，代码完全一样。但是，这需要服务器的支持，所以在使用CORS之前，要查看一下所请求的网站是否支持。

**CORS机制默认不发送cookie和HTTP认证信息，除非在Ajax请求中打开withCredentials属性。**

```javascript
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
```

同时，服务器返回HTTP头信息时，也必须打开Access-Control-Allow-Credentials选项。否则，浏览器会忽略服务器返回的回应。

**需要注意的是，此时Access-Control-Allow-Origin不能指定为星号，必须指定明确的、与请求网页一致的域名**

## 与JSONP
CORS机制与JSONP模式的使用目的相同，而且更强大。JSONP只支持GET请求，CORS可以支持所有类型的HTTP请求。在发生错误的情况下，CORS可以得到更详细的错误信息，部署更有针对性的错误处理代码。JSONP的优势在于可以用于老式浏览器，以及可以向不支持CORS的网站请求数据。

## IE8，9下的XDomainRequest
### 与XHR的一些不同
- cookie不会随请求发送，也不会随响应返回
- 只能设置请求头部信息中的Content-Type字段
- 不能访问响应头部信息
- 支持GET和POST请求

### 特点
- open方法只有两个参数，method和url。所有XDR请求都是异步。
- 请求返回之后，会触发load事件
- 在接收到响应后，你只能访问原始文本，无法确定响应状态码。
- 失败(包括响应中缺少Access-Control-Allow-Origin头部)就会触发onerror事件。

### 代码示例

```javascript
//示例1
function loadPhotos() {
  var method = "GET";
  var url = "http://s3.amazonaws.com/corsinaction/flickr.json";
  var xdr = new XDomainRequest();
  xdr.open( method, url );

  xdr.onerror = function() {
    alert("There was an error");
  };

  xdr.onload = function() {
    var data = JSON.parse( xdr.responseText );
    if( data.stat == "ok" ) {
      ......
    }
  };

  xdr.send();
}

//示例2
function xdrText() {
  var xdr = new XDomainRequest();
  xdr.onerror = function() {};
  xdr.onload  = function() {};

  xdr.open( "POST", "http://www.exmaple.com/page/");
  xdr.contentType = "application/x-www-form-urlencoded";
  xdr.send("name1=value1&name2=value2");
}
```

## 图片Ping(Canvas and corss-orgin images)
### 权威指南上讲到的图片Ping
动态创建图片，通过使用onload和onerror事件处理程序来确定是否收到了响应。通过设置src属性来发送请求。这就是图片ping一种与服务器进行简单，单向的跨域通信的一种方式。

上代码:

```javascript
var img = new Image();
img.onload = img.onerror = function() {
  alert("Done");
};

img.src = "http://www.exmaple.com/test?name=targeral";
```

**图片ping有两个主要的缺点:一是只能发送GET请求，二是无法访问服务器的响应文本。**

### 《CORS in Action》上的Canvas and corss-orgin images
当下载来自不同域的图片的时候，canvas标签也能实现CORS。一个简单的canvas如下:

```html
<canvas id="myCanvas"></canvas>
<script>
  var myCanvas = document.getElementById( 'myCanvas' );
  var myContext = myCanvas.getContext( '2d' );
  myContext.fillStyle = "#888";
  myContext.fillRect( 0, 0, 240, 150 );
</script>
```

canvas标签除了画图形外，还能展示图片。图片可以是在同一个服务器上，也可以是在不同的服务器上。canvas可以展示所有图片，无论是来自同一个域还是不同的域。

canvas元素暴露出三个方法用于获取数据:toBlob, toDataURL和getImageData。这些方法都返回二进制图片的信息。当这些方法在来自同源服务器上的图片调用的时候，工作正常。但是当时跨域的时候，浏览器会抛出异常。

为了绕过这个问题，图片必须要标记成"cross-origin"。就像设置一个图片的 _crossOrgin_ 属性，像下面的代码:

```html
<canvas id="myCanvas"></canvas>
<script>
  var myCanvas = document.getElementById("myCanvas");
  var myContext = document.getContext( '2d' );
  var img = new Image();
  img.crossOrgin = 'anonymous';
  img.onload = function() {
    myCanvas.width = img.width;
    myCanvas.height = img.height;
    myContext.drawImage( img, 0, 0 );
    console.log( myCanvast.toDataURL("image/png" ));
  };

  img.src = 'http://www.example.com/test.png';
</script>
```

_crossOrgin_ 属性有两个可能的值: _anonymous_ 和 _user-credentials_。

如果设置了 _user-credentials_ ,任何用户凭据的来源都被添加到请求中。例如，如果这个源有cookie，这个cookie将被加到image请求中。这和设置了 _withCredentials_ 的XMLHttpRequest对象类似。

设置了 _anonymous_ 依然可以发送请求，但是没有cookies附加到请求中。

最佳的选择是使用 _anonymous_ 这个值，除非你一定需要个人的cookie值。

## jQuery的CORS
1. **jQuery不支持同步的CORS**
2. ajax方法只支持XMLHttpRequest，不支持XDomainRequest。（这意味着，你在使用jQuery想在IE8，9下支持CORS，需要写代码来降级到XDomainRequest对象或者使用一个jQuery插件支持XDomainRequest）
3. 如果你要设置 _withCredentials_ 属性，你需要使用 _xhrFields_ 属性，就像下面代码:
4. $.ajax( url, {
xhrFields : {
 withCredentials : true
}
});
5. jQuery不要设置 X-Request-Width 请求头部作为跨域的请求
6. Jsonp
7. 在网页中动态插入script元素，向服务器请求脚本文件。

```javascript
function addScriptTag( src ) {
  var script = document.createElement( 'script' );
  script.setAttribute( 'type', 'text/javascript' );
  script.src = src;
  document.body.appendChild( script );
}

window.onload = function() {
  addScriptTag( 'http://example.com/ip?callback=foo' );
}

function foo( data ) {
  console.log( 'your public IP address is : ' + data.ip );
};
```

**jQuery中的jsonp**

```javascript
$.getJSON( "http://example.com/api", function ( data ) {...})
```

$.getJSON方法的第一个参数是服务器网址，第二个参数是回调函数，该回调函数的参数就是服务器返回的JSON数据。

##
