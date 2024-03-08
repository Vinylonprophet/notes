import { delayWhen, interval, take, empty, delay, of } from 'rxjs';

// delayWhen和delay很像,delay是一组元素,delayWhen是每个元素,而且需要一个callback并回传一个observable
interval(300)
  .pipe(take(5))
  // .pipe(delayWhen((x) => interval(100 * x * x).pipe(take(1))))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// source : --0--1--2--3--4|
//   .(delayWhen((x) => interval(100 * x * x).pipe(take(1))));
// example: --0---1----2-----3-----4|
