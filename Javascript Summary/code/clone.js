/*
 * 浅拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 @ return {Object} newObj: 拷贝之后的对象
 */

function shallowCopy(oldObj, newObj) {
    for(var key in oldObj) {
        newObj[key] = oldObj[key];
    }

    return newObj;
}

// test
var oldObj = {
    name: "yuanzm",
    age: "12",
    info: {
        id: "12330393"
    }
}
var newObj = {}
// 调用浅拷贝函数
shallowCopy(oldObj, newObj)
newObj.info.id = "12345678";
// 浅拷贝测试结果
console.log("浅拷贝测试结果"); 
console.log(newObj.info);
console.log(oldObj.info);

function is(obj, type) {
    return Object.prototype.toString.call(obj) === "[object " + type + "]";
}


/*
 * 深拷贝函数
 * @param {Object} oldObj: 被拷贝的对象
 * @param {Object} newObj: 需要拷贝的对象
 * @ return {Object} newObj: 拷贝之后的对象
 */

 function deepCopy(oldObj, newObj) {
    for(var key in oldObj) {
        var copy = oldObj[key];
        if(oldObj === copy) continue;
        if( is(copy, "Object")) {
            newObj[key] = deepCopy(copy, newObj[key] || {});
        }else if(is(copy, "Array")) {
            newObj[key] = deepCopy(copy, newObj[key] || []);
        }else {
            newObj[key] = copy;
        }
    }

    return newObj;
}
 // test
var oldObj = {
    name: "yuanzm",
    age: "12",
    info: {
        id: "12330393"
    }
}
var newObj = {}
// 调用浅拷贝函数
deepCopy(oldObj, newObj);
newObj.info.id="12345678"
// 深拷贝测试结果
console.log("深拷贝测试结果")
console.log(newObj);
console.log(oldObj);