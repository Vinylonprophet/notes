import { interval, map } from 'rxjs';

// map
interval(1000)
  .pipe(map((x) => x + 1))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source: -----0-----1-----2-----3--...
//   map(x => x + 1)
// newest: -----1-----2-----3-----4--...
