import { concat, interval, take, of } from 'rxjs';

// concat可以把多个observable实例合并在一起,和concat一样必须等到前一个observable完成,才会继续下一个
concat(interval(1000).pipe(take(3)), of(3), of(4, 5, 6)).subscribe({
  next: function (value) {
    console.log(value);
  },
});
// source : ----0----1----2|
// source2: (3)|
// source3: (456)|
//          concat()
// example: ----0----1----2(3456)|
