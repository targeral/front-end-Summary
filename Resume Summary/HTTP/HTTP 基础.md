# HTTP 基础
## HTTP报文
### 报文流
HTTP报文是在HTTP应用程序之间发送的数据块。 不管是请求报文还是响应报文都会向下游流动(downstream)

### 报文的组成部分
一条报文有三部分组成:
- 对报文进行描述的 **起始行( start line )**
- 包含属性的 **首部块**
- 以及可选的，包含数据的 **主体部分**

每一行都以CRLF作为行终止序列作为结束，CRLF就是 _CR_ 回车 和 _LF_ 换行。

### 报文的分类
- 请求报文
- 响应报文

请求报文会向服务器请求一个动作，响应报文会将请求的结果返回给客户端。请求和响应报文的基本报文结构相同。

### 报文的语法
_请求报文_ ：

```html
<method> <request-URL> <version>
<headers>

<entity-body>
```

_响应报文_

```html
<version> <status> <reason-phrase>(原因短语)
<headers>

<entity-body>
```

### 关于请求报文的一些内容
#### 方法
请求的起始行以方法作为开始，方法告诉服务器要做些什么。 方法有: GET, HEAD, POST, PUT, TRACE, OPTIONS, DELETE

### 关于响应报文的一些内容
#### 状态码
状态码则用来告诉客户端发生了什么。

各状态码的含义：
- 200-299之间的状态码表示成功
- 300-399之间的代码表示资源已经被移走了。
- 400-499之间的代码表示客户端的请求出错了。
- 500-599之间的代码表示服务器出错了。

一些状态码具体的含义:
- 100 ： Continue 说明收到了请求的初始部分，请客户端继续。（这里有一个100状态码的争议问题，《HTTP权威指南》）
- 101 ： Switching Protocols 说明服务器正在根据客户端的指定，将协议切换成Update首部所列的协议。
- 200 : OK 成功。请求的所有数据都在响应主体中
- 304 : Not Modified 客户端可以通过所包含的请求首部，使其请求变成有条件的。
- 401 ： Unauthorized(未授权) 需要输入用户名和密码
- 403 : Forbidden 用于说明请求被服务器拒绝。
- 404 ： Not Found(未找到) 服务器无法找到所请求URL对应的资源
- 408 : Request Timeout如果客户端完成请求所花的时间太长，服务器可以回送此状态码，并关闭连接。
- 500 : Internal Server Error 服务器发生不可预期的错误
- 503 : Server Unavailable 服务器当前不能处理客户端的请求，一段时间后，可能会恢复正常。

### 关于首部
- 通用首部：提供了最基本的信息
  - connection 允许客户端和服务器指定与请求/响应连接有关的选项
  - Date 提供日期和时间标志，说明报文是什么时间创建的。
  - MIME-Version 给出了发送端使用的MIME版本
  - Trailer
  - Transfer-Encoding 告诉接收端为了保证报文的可靠传输，对报文采用了什么编码方式
  - Update 给出了发送端可能想要"升级"使用的新版本或协议
  - Via 显示了报文经过的中间节点(代理，网关)

- 通用缓存首部
  - Cache-Control

- 请求首部
  - Accept 首部
    - Accept 告诉服务器能够发送哪些媒体类型
    - Accept-Charset 告诉服务器能够发送哪些字符集
    - Accept-Encoding 告诉服务器能够发送哪些编码方式
    - Accept-Language 告诉服务器能够发送哪种语言

  - 条件请求首部
    - If-Match
    - if-Modified-Since
    - If-None-Match
    - If-Range

  - 安全请求首部
    - Authorization 包含了客户端提供给服务器，以便对其自身进行认证的数据
    - Cookie
    - Cookie2

  - 代理请求首部
    - Max-Forward
    - Proxy-Authorization
    - Proxy-Connection

- 响应首部
  - 协商首部
    - Accept-Ranges
    - Vary

  - 安全响应首部
    - Proxy-Authenticate
    - Set-Cookie
    - Set-Cookie2
    - WWW-Authenticate

- 实体首部
  - 内容首部
    - Content-Base 解析主体中的相对URL时使用的基础URL
    - Content-Encoding 对主体执行的任意编码方式
    - Content-Language 理解主体时最适宜使用的自然语言
    - Content-Length 主体的长度或尺寸
    - Content-Location 资源实际所处的位置
    - Content-MD5 主体的MD5校验和
    - Content-Range
    - Content-Type 主体的对象类型

  - 实体缓存首部
    - Etag 与实体相关的实体标记
    - Expires 缓存时间
    - Last-Modified 实体最后一次被修改的日期和时间

### HTTP keep-Alive
keep-Alive功能是客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，keep-Alive功能避免了建立或者重新建立连接。

对于负担较重的网站来说，这里存在一个问题:虽然为客户端保留打开的连接有一定的好处，但是它同样影响了性能，因为在处理暂停阶段，本来可以释放的资源仍然被占用。当web服务器和应用服务器在同一个机器上运行时，keep-Alive功能对资源利用的影响尤其突出。

此功能为HTTP 1.1预设的功能，HTTP 1.0 加上Keep-Aliveheader 也可以提供HTTP的持续作用。

```
keep-Alive:timeout=5,max=100
```

timeout:过期时间5s，max是最多一百次请求，强制断掉连接

#### HTTP/1.0
如果客户端浏览器支持Keep-Alive,那么就在HTTP请求头中添加一个字段 **Connection:Keep-Alive** ,当服务器收到附带有Connection:Keep-Alive的请求时，他也会在响应头中添加一个同样的字段来使用Keep-Alive。这样一来，客户端和服务器之间的HTTP连接就会被保持，不会断开（超过Keep-Alive规定的时间，意外断电等情况除外），当客户端发送另外一个请求时，就使用这条已经建立的连接

#### HTTP/1.1
在HTTP/1.1版本中，官方规定的Keep-Alive使用标准和在HTTP/1.0版本中有些不同，默认情况下所在HTTP1.1中所有连接都被保持，除非在请求头或响应头中指明要关闭：Connection: Close  ，这也就是为什么Connection: Keep-Alive字段再没有意义的原因。但是，客户端和服务器仍然可以随时关闭空闲的连接。不发送Connection:close并不意味着服务器承诺永远将连接保持打开状态。另外，还添加了一个新的字段Keep-Alive:，因为这个字段并没有详细描述用来做什么，可忽略它。

**注意:HTTP是一个无状态协议，这意味着每个请求都是独立的，Keep-Alive没能改变这个结果。另外，Keep-Alive也不能保证客户端和服务器之间的连接一定是活跃的，在HTTP1.1版本中也如此。唯一能保证的就是当连接被关闭时你能得到一个通知，所以不应该让程序依赖于Keep-Alive的保持连接特性，否则会有意想不到的后果**
