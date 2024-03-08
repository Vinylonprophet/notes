import { interval, skip } from 'rxjs';

// skip可以跳过几个元素,相对的take可以取出前几个元素
interval(1000)
  .pipe(skip(3))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : ----0----1----2----3----4----5--....
//   skip(3)
// example: -------------------3----4----5--...
