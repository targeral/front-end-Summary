Function.prototype.bind = function() {
    var fn = this;

    var args = Array.prototype.slice.call(arguments);

    var object = args.shift();

    return function() {
        return fn.apply(object, args.concat(Array.prototype.slice.call(arguments)));
    };
};

