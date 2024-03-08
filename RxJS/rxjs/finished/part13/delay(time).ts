import { delay, interval, take } from 'rxjs';

// delay延时发送时间
interval(300)
  .pipe(take(5))
  .pipe(delay(500))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : --0--1--2--3--4|
//   delay(500)
// example: -------0--1--2--3--4|
