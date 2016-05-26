var co = require( 'co' );

function SimpleKoa() {
  this.middlewares = [];
}

SimpleKoa.prototype = {
  use : function( gf ) {
    this.middlewares.push( gf );
  },

  listen : function() {
    var run = this._run();
    console.log( "run" );
    console.log( run );
    console.log( this );
  },

  _run : function() {
    var ctx = this;
    console.log( "this is " );
    console.log( this );
    var middlewares = this.middlewares;

    return co( function* () {
      var prev = null;
      var i    = middlewares.length;

      while( i-- ) {
        prev = middlewares[ i ].call( ctx, prev );
        console.log( middlewares[i].name );
        console.log( prev.next );
      }
      console.log("prev+++");
      console.log(prev);
      yield prev;
      console.log( "after" );
      console.log( prev.next );
    });
  }
};


var app = new SimpleKoa();

app.use( function* a( next ) {
  console.log( 'nexta'  );
  //console.log( next );
  this.body = '1';
  yield next;
  this.body += '5';
  console.log( this.body );
} );

app.use( function* b( next ) {
  console.log( 'nextb' );
  //console.log( next );
  this.body += '2';
  yield next;
  this.body += '4';
} );

app.use( function* c( next ) {
  console.log( 'nextc' );
  //console.log( next );
  //console.log( this.body );
  this.body += '3';
} );

app.listen();
