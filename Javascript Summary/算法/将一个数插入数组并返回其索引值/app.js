
  //算法
  function where(arr, num) {
    //sort的比较算法
    function compare(a, b) {
      if(a > b) {
        return 1;
      }else if(a < b) {
        return -1;
      }else{
        return 0;
      }
    }
    var index = 0;
    arr.push(num);
    arr.sort(compare);
    index = arr.indexOf(num);
    return index;
  }

  var app = document.getElementById("app"),
      result = document.getElementById("result"),
      arr = document.querySelector("input[name='arr']"),
      num = document.querySelector("input[name='number']"),
      run = document.querySelector("input[name='run']"),
      warn = document.querySelector("p.tip");

  function runHander(e) {
      var arrContent = arr.value,
          numContent = num.value,
          warning    = validate(arrContent, numContent);
      if(warning !== false) {
        warn.innerHTML = warning;
        warn.classList.add("warning");
        setTimeout(function() {
          warn.classList.remove("warning");
        }, 3000)
      }else {
        arrContent = StrtoArr(arrContent);
        numContent = parseFloat(numContent);
        console.log(arrContent);
        console.log(numContent);
        result.innerHTML = where(arrContent, numContent);
      }
  }

  function validate(arr, num) {
    var warnContent = 'warning:',
        flag = false;
    if(arr === '') {
      warnContent += "数组选项为空;";
      flag = true;
    }
    if(num === '') {
      warnContent += "数字选项为空;"
      flag = true;
    }

    return flag ? warnContent : flag;
  }

  function StrtoArr(str) {
    var oldArr = str.trim().slice(1, str.length - 1).split(','),
        newArr = [];

    for(var i = 0; i < oldArr.length; i++) {
      newArr[i] = parseFloat(oldArr[i]);
    }
    return newArr;
  }

  run.addEventListener('click', runHander);
