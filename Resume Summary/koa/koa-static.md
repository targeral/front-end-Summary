# koa静态文件指定
koa静态文件指定中间件Koa-static，npm install Koa-static之后可以使用Koa-static负责托管Koa应用内的静态资源。映射了静态文件目录，引用的时候直接去该目录下寻找资源，会减少一些消耗。指定public为静态文件目录的代码如下:

```javascript
var staticServer = require( 'Koa-static' );
var path = require( 'path' );
app.use( staticServer( path.join( __dirname, 'public' ) ) );
```
