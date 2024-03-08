import { distinct, from, interval, zip } from 'rxjs';

// distinct可以帮忙把相同的值过滤,只留一笔
// from(['a', 'b', 'c', 'a', 'b']).pipe(zip(interval(300), (x, y) => x));
zip(from(['a', 'b', 'c', 'a', 'b']), interval(300), (x, y) => x)
  .pipe(distinct())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : --a--b--c--a--b|
//   distinct()
// example: --a--b--c------|
