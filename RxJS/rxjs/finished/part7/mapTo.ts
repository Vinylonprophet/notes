import { interval, mapTo } from 'rxjs';

// 和map很像的mapTo
interval(1000)
  .pipe(mapTo(2))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source: -----0-----1-----2-----3--...
//   map(x => x + 1)
// newest: -----1-----2-----3-----4--...
