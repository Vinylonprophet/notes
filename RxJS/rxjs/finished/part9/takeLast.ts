import { interval, take, takeLast } from 'rxjs';

// takeLast除了可以使用take取前几个之外,也可以取最后几个值
interval(1000)
  .pipe(take(6))
  .pipe(takeLast(2))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// source : ----0----1----2----3----4----5|
//                 takeLast(2)
// example: ------------------------------(45)|
// 注意:这里最后是同步输出,takelast必须等到整个observable完成才知道最后的元素有哪些
