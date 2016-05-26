# koa的中间件
## Thunk函数的含义和用法
### 参数的求值策略
Thunk 函数早在上个世纪60年代就诞生了。

那时，编译语言刚刚起步，计算机学家还在研究，编辑器怎么写比较好。**一个争论的焦点是 _"求值策略"_ ，即函数的参数到底是何时求值**。

```javascript
var x = 1;
function f( m ) {
  return m * 2;
}

f( x + 5 );
```

上面代码先定义函数f，然后向他传入表达式x+5。请问，这个表达式应该何时求值？

一种意见是 _"传值调用"_ (call by value),即在进入函数体之前，就计算x+5的值(等于6)，再将这个值传入函数f。C语言就是采用这种策略。

```javascript
f( x + 5 );
//传值调用时，等同于
f( 6 );
```

另一种意见是 _"传名调用"_ (call by name),即直接将表达式 x + 5传入函数体，只有用到它的时候求值。Hskell语言采用这种策略。

```javascript
f( x + 5 );
//传名调用时，等同于
( x + 5) * 2
```

**传值调用和传名调用，哪一种比较好呢？回答是各有利弊** 。传值调用比较简单，但是相对于参数求值的时候，实际上还没用到这个参数，有可能造成性能损失。

```javascript
function f( a, b ) {
  return b;
}

f( 3 * x * x - 2 * x - 1, x);
```

上面代码中，函数f的第一个参数是一个复杂的表达式，但是函数体内部根本没有用到。对这个参数求值，实际上是不必要的。

因此，有一些计算机学家倾向于"传名调用"，即只在执行时求值。

### Thunk函数的含义
编译器的"传名调用"实现，往往是将参数放到一个临时函数之中，再将这个临时参数传入函数体。这个临时函数就叫做Thunk函数。

```javascript
function f( m ) {
  return m * 2;
}

f( x + 5 );
//等同于

var thunk = function() {
  return x + 5;
};

function f( thunk ) {
  return thunk() * 2;
}
```

上面代码中，函数f的参数x+5被一个函数替换掉了。凡是用到原参数的地方，对Thunk函数求值即可。 **这就是Thunk函数的定义，它是"传名调用"的一种实现策略，用来替换某个表达式**

### 三、JavaScript语言的Thunk函数
javascript语言是传值调用，它的Thunk函数含义有所不同。 **在JavaScript语言中，Thunk函数替换的不是表达式，而是多参数函数，将其替换成单参数的版本，且只接受回调函数作为参数。**

```JavaScript
//正常版本的readFile(多参数版本)
fs.readFile( filename, callback );

//Thunk版本的readFile(单参数版本)
var readFileThunk = Thunk( filename );
readFileThunk(callback);

var Thunk = function( filename ) {
  return function( calllback ) {
    return fs.readFile( filename, callback );
  };
};
```

上面代码中，fs模块的readFile方法是一个多参数函数，两个参数分别为文件名和回调函数。经过转换器处理，他变成了一个单参数函数，只接受回调函数作为参数。这个单参数版本，就叫做Thunk函数。

任何函数，只要参数有回调函数，就能写成Thunk函数的形式。下面就是一个简单的Thunk函数转换器。

```JavaScript
var Thunk = function( fn ) {
  return function() {
    var args = Array.prototype.slice.call( arguments );
    return function( callback ) {
      args.push( callback );
      return fn.apply( this, args );
    }
  };
};
```

使用上面的转换器，生成fs.readFile的Thunk函数。

```JavaScript
var readFileThunk = Thunk( fs.readFile );
readFile( fileA )( callback );
```

### 四、Thunkify模块
生产环境的转换器，建议使用 _Thunkify模块_。

首先是安装

```
$ npm install thunkify
```

使用方式如下。

```javascript
var thunkify = require( 'thunkify' );
var fs = require( 'fs' );

var read = thunkify( fs.reanFile );
read( 'package.json' )( function( err, str ) {
  //.....
});
```

Thunkify的源码与上一节那个简单的转换器非常像。

```javascript
function thunkify( fn ) {
  return function() {
    var args = new Array( arguments.length );
    var ctx = this;

    for( var i = 0; i < args.length; ++i ) {
      args[ i ] = arguments[ i ];
    }

    return function( done ) {
      var called;

      args.push( function(){
        if( called ) return ;
        called = true;

        done.apply( null, arguments );
      } );

      try {
        fn.apply( ctx, args );
      }catch( err ) {
        done( err );
      }
    }
  }
};
```

它的源码主要多了一个检查机制，_变量called_ 确保回调函数只运行一次。这样的设计与下午的Generator函数相关。请看下面的例子。

```javascript
function f( a, b, callback ) {
  var sum = a + b;
  callback( sum );
  callback( sum );
}

var ft = thunkify( f );
ft( 1, 2 )( console.log );
```

上面代码中，由于thunkify只允许回调函数执行一次，所以只输出一行结果。

### 五、Generator函数的流程管理
你可能会问，Thunk函数有什么用?回答是之前确实没什么用，但是es6有了Generator函数，Thunk函数现在可以用于Generator函数的自动流程管理。

以读取文件为例。下面的Generator函数封装了两个异步操作。

```javascript
var fs = require( 'fs' );
var thunkify = require( 'thunkify' );
var readFile = thunkify( fs.readFile );

var gen = function* () {
  var r1 = yield readFile( '/etc/fstab' );
  console.log( r1.toString() );
  var r2 = yield readFile( '/etc/shells' );
  console.log( r2.toStirng() );
};
```

上面代码中，yield命令用于将程序的执行权移除Generator函数，那么就需要一种方法，将执行权再交还给Generator函数。

这种方法就是Thunk函数，因为他可以在回调函数里，将执行权交还给Generator函数。为了便于理解，我们先看如何手动执行上面这个Generator函数。

```javascript
var g = gen();

var r1 = g.next();
r1.value( function( err, data ) {
  if( err ) throw err;
  var r2 = g.next( data );
  r2.value( function( err, data ) {
    if( err ) throw err;
    g.next( data );
  } )
} );
```

上面代码中，变量 g 是 Generator 函数的内部指针，表示目前执行到哪一步。next 方法负责将指针移动到下一步，并返回该步的信息（value 属性和 done 属性）。

仔细查看上面的代码，可以发现 Generator 函数的执行过程，其实是将同一个回调函数，反复传入 next 方法的 value 属性。这使得我们可以用递归来自动完成这个过程。

### 六、Thunk函数的自动流程管理
Thunk 函数真正的威力，在于可以自动执行 Generator 函数。下面就是一个基于Thunk函数的Generator执行器。

```javascript
function run( fn ) {
  var gen = fn();

  function next( err, data ) {
    var result = gen.next( data );
    if( result.done ) return;
    result.value( next );
  }

  next();
}

run( gen );
```

上面代码的run函数，就是一个Generator函数的自动执行器。内部的next函数就是Thunk的回调函数。next函数先将指针移到Generator函数的下一步(gen.next方法)，然后判断Generator函数是否结束 (result.done 属性)，如果没有结束，就将next函数再传入Thunk函数(result.value属性)，否则就直接退出。

有了这个执行器，执行 Generator 函数方便多了。不管有多少个异步操作，直接传入 run 函数即可。当然，前提是每一个异步操作，都要是 Thunk 函数，也就是说，跟在 yield 命令后面的必须是 Thunk 函数。

```javascript
var gen = function* (){
  var f1 = yield readFile('fileA');
  var f2 = yield readFile('fileB');
  // ...
  var fn = yield readFile('fileN');
};

run(gen);
```

上面代码中，函数 gen 封装了 n 个异步的读取文件操作，只要执行 run 函数，这些操作就会自动完成。这样一来，异步操作不仅可以写得像同步操作，而且一行代码就可以执行。

Thunk 函数并不是 Generator 函数自动执行的唯一方案。因为自动执行的关键是，必须有一种机制，自动控制 Generator 函数的流程，接收和交还程序的执行权。回调函数可以做到这一点，Promise 对象也可以做到这一点。本系列的下一部分，将介绍基于 Promise 的自动执行器。

**--------文章非原创，来自阮一峰的文章，[http://www.ruanyifeng.com/blog/2015/05/thunk.html](http://www.ruanyifeng.com/blog/2015/05/thunk.html)**

## co函数库的含义和用法
co函数用于Generator函数的自动执行。

比如，有一个Generator函数，用于依次读取两个文件。

```javascript
var gen = function* () {
  var f1 = yield readFile( '/etc/fstab' );
  var f2 = yield readFile( '/etc/shells' );
  console.log( f1.toString() );
  console.log( f2.toString() );
};
```

**co函数可以让你不用编写Generator函数的执行器**

```javascript
var co = require( 'co' );
co( gen );
```

上面代码中，Generator函数只要传入co函数，就会自动执行。

co函数返回一个Promise对象，因此可以用then方法添加回调函数。

```javascript
co( gen ).then( function() {
  console.log( 'Generator 函数执行完成' );
} )
```

上面代码中，等到 Generator 函数执行结束，就会输出一行提示。

### 二、co函数库的原理
为什么co可以自动执行Generator函数？ 前面文章说过，Generator函数就是一个异步操作的容器。它的自动执行需要一种机制，当异步操作有了结果，能够自动交回执行权。

两种方法可以做到这一点。
1. 回调函数。将异步操作包装成Thunk函数，在回调函数里面交回执行权。
2. Promise对象。将异步操作包装成Promise对象，用then方法交回执行权。

**co函数库其实就是将两种自动执行器(Thunk函数 和 Promise对象)，包装成一个库。** 使用co的前提条件是，Generator函数的yield命令后面，只能是Thunk函数或Promise对象。

### 三、基于Promise对象的自动执行
还是沿用上面的例子。首先，把fs模块的readFile方法包装成一个Promise对象。

```javascript
var fs = require( 'fs' );

var readFile = function( fileName ) {
  return new Promise( function( resolve, reject ) {
    fs.readFile( fileName, function( error, data ) {
      if( error ) reject( error );
      resolve( data );
    });
  } );
};

var gen = function* () {
  var f1 = yield readFile( '/etc/fstab' );
  var f2 = yield readFile( '/etc/shells' );
  console.log( f1.toString() );
  console.log( f2.toString() );
}
```

然后，手动执行上面的Generator函数。

```javascript
var g = gen();
g.next().value.then( function( data ) {
  g.next( data ).value.then( function( data ) {
    g.next( data );
  });
});
```

手动执行其实就是then方法，层层添加回调函数。理解了这一点，就可以写出一个自动执行器。

```javascript
function run( gen ) {
  var g = gen();

  function next( data ) {
    var result = g.next( data );
    if( result.done ) return result.value;

    result.value.then( function( data ){
      next( data );
    } );
  }

  next();
}

run( gen );
```

上面代码中，只要 Generator 函数还没执行到最后一步，next 函数就调用自身，以此实现自动执行。

### 四、co函数库的源码
co就是上面那个自动执行器的扩展，它的源码只有十几行，非常简单。

首先，co 函数接受 Generator 函数作为参数，返回一个 Promise 对象。

```javascript
function co( gen ) {
  var ctx = this;

  return new Promise( function( resolve, reject ) {

  });
}
```

在返回的Promise对象里面，co先检查参数gen是否为Generator函数。如果是，就执行该函数，得到一个内部指针对象；如果不是就返回，并将Promise对象的状态改为resolve。

```javascript
function co( gen ) {
  var ctx = this;

  return new Promise( function( resolve, reject ) {
    if( typeof gen === 'function' ) gen = gen.call( ctx );
    if( !gen || typeof gen.next !== 'function' ) return resolve( gen );
  })
}
```

接着，co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulefilled 函数。这主要是为了能够捕捉抛出的错误。

```javascript
function co ( gen ) {
  var ctx = this;

  return new new Promise(function(resolve, reject) {
    if( typeof gen === 'function' ) gen = gen.call( ctx );
    if( !gen || typeof gen.next !== 'function' ) return resolve( gen );

    onFulefilled();
    function onFulefilled( res ) {
      var ret;
      try {
        ret = gen.next( res );
      }catch( e ) {
        return reject( e );
      }
    }
  });
}
```

最后，就是关键的 next 函数，它会反复调用自身。

```javascript
function next( ret ) {
  if( ret.done ) return resolve( ret.value );
  var value = toPromise.call( ctx, ret.value );
  if( value && isPromise( value ) ) return value.then( onFulefilled, onRejected );

  return onRejected( new TypeError( 'You may only yield a function, promise, generator, array, or object, '
        + 'but the following object was passed: "' + String( ret.value ) + '"' ));
};
```

上面代码中，next函数的内部代码，一共只有四行命令。
1. 第一行，检查当前是否为generator函数的最后一步，如果是就返回。
2. 第二行，确保每一步的返回值，是Promise对象。
3. 第三行，使用then方法，为返回值加上回调函数，然后通过onFulefilled函数再次调用next函数。
4. 第四行，在参数不符合要求的情况下（参数非 Thunk 函数和 Promise 对象），将 Promise 对象的状态改为 rejected，从而终止执行

## Koa中间件
Koa的中间件很像Express的中间件，也是对HTTP请求进行处理的函数，但是必须是一个Generator函数即 function * (){} 语法，不然会报错。可以这么说，Nodejs的Web程序中任何请求和响应都是中间件在操作。

```javascript
app
      .use(logger())               //日志中间件
      .use(serve(__dirname + '/public'))        //静态文件指定中间件
      .use(router.routes())          //路由中间件
      .use(router.allowedMethods());             //路由中间件
```

app.use 加载用于处理http请求的middleware（中间件），当一个请求来的时候，会依次被这些 middlewares处理。执行的顺序是你定义的顺序。中间件的执行顺序规则是类似"栈"的结构，所有需要执行的中间件都被一个一个放入"栈"中，当没有遇到next()的时候，"栈"里边的这些中间件被逆序执行。

```javascript
app.use(function *(next){
   this; // is the Context
   this.request; // is a Koa Request
   this.response; // is a Koa Response
});
```

说明：
- this是上下文
  - 代表es6里的generator
  - http模型里的请求和响应

- this.request
- this.response

app.use()就是将中间件放入一个数组，真正执行逻辑的是：app.listen(3000); Koa 的 listen() 除了指定了 http 服务的端口号外，还会启动 http server，等价于：

```javascript
var http = require('http');
      http.createServer(app.callback()).listen(3000);
```

## Koa中间件机制实现原理
实现简单的 Koa 框架（剥离除中间件外所有的逻辑），这个框架的名字叫 SimpleKoa：

```javascript
var co = require( 'co' );

function SimpleKoa() {
  this.middlewares = [];
}

SimpleKoa.prototype = {
  //注入个中间件
  use : function( gf ) {
    this.middlewares.push( gf );
  },

  //执行中间件
  listen : function() {
    this._run();
  },

  _run : function() {
    var ctx = this;
    var middlewares   = ctx.middlewares;

    return co( function* () {
      var prev = null;
      var i    = middlewares.length;
      //从最后一个中间件到第一个中间件的顺序开始遍历
      while( i-- ) {
        //实际Koa的ctx应该指向server的上下文，这里做了简化
        //prev 将前面一个中间件传递给当前中间件
        prev = middlewares[ i ].call( ctx, prev );
      }

      yield prev;
    })();
  }
};
```

写个 demo 印证下中间件执行顺序：

```javascript
var app = new SimpleKoa();
app.use( function* ( next ) {
  this.body = '1';
  yield next;
  this.body += '5';
  console.log( this.body );
});

app.use( function* ( next ) {
  this.body += '2';
  yield next;
  this.body += '4';
});

app.use( function* ( next ) {
  this.body += '3';
});

app.listen();
```

执行后控制台输出：123456，对照 Koa 中间件执行顺序，完全一致！寥寥几行代码，我们就实现了 Koa 的中间件机制！这就是 co 的魔力
