var co = require( 'co' );

function run(gen){
  var g = gen();
  console.log(g);
  function next(data){
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function(data){
      next(data);
    });
  }

  next();
}

var gen = function* () {
  var next = null;
  // (function* (next) {
  //     console.log("1");
  //     yield new Promise(function(resolve, reject) {
  //       console.log("a");
  //       resolve("a");
  //       reject("error");
  //     });
  //     console.log("4");
  // })(next);
  //
  // (function* (next) {
  //   console.log("2");
  //   yield new Promise(function(resolve, reject) {
  //     console.log("b");
  //     resolve("b");
  //     reject("error");
  //   });
  //   console.log("3");
  // })(next);
  console.log(0);
  yield next;
  console.log(1);
}

var g = gen();
console.log(g);
console.log( g.next() );
console.log( g.next() );
