import { interval, last, take } from 'rxjs';

// last和takeLast(1)相同
interval(1000)
  .pipe(take(6))
  .pipe(last())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// source : ----0----1----2----3----4----5|
//           last()
// example: ------------------------------(5)|
