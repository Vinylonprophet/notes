import { from, zip, interval } from 'rxjs';

// zip把原本同步的信息变成了异步
zip(from('hello'), interval(100), (x, y) => x).subscribe({
  next: function (value) {
    console.log(value);
  },
});
// source : (hello)|
// source2: -0-1-2-3-4-...
//         zip(source2, (x, y) => x)
// example: -h-e-l-l-o|
// 注意:zip必须cache住没处理的元素,如果一个observable快一个慢,等待那个比较慢的observable的话,会造成记忆体相关的问题
