import { interval, take } from 'rxjs';

// take取前几个元素
interval(1000)
  .pipe(take(3))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : -----0-----1-----2-----3--..
//   take(3)
// example: -----0-----1-----2|
