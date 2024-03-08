import { filter, interval } from 'rxjs';

// filter
interval(1000)
  .pipe(filter((x) => x % 2 === 0))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source: -----0-----1-----2-----3-----4-...
//   filter(x => x % 2 === 0)
// newest: -----0-----------2-----------4-...
