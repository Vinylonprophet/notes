// scan本质上就是js中的reduce,只是命名不同

// 以下是原生的js的reduce
var arr = [1, 2, 3, 4];

// reduce需要传入两个参数,第一个是callback,第二个是起始状态,第一个callback执行时,会传入两个参数,一个是原本状态,一个修改原本状态的参数,最后一个是新的状态,再继续执行
var result = arr.reduce((origin, next) => {
  console.log(origin);
  return origin + next;
}, 0);
console.log(result);

