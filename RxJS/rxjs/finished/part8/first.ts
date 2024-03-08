import { interval, first } from 'rxjs';

// first和take(1)一个效果
interval(1000)
  .pipe(first())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// source : -----0-----1-----2-----3--..
//   first()
// example: -----0|
