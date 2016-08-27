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
