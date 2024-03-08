import { interval, startWith } from 'rxjs';

// startWith
interval(1000)
  .pipe(startWith(0))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// 一开始塞了一个0,让example在一开始就送出0
// source : ----0----1----2----3--...
//   startWith(0)
// example: (0)----0----1----2----3--...
// startWith的值一开始就是同步发出,这个operator经常被用来保存起始状态
