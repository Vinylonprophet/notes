import { from, withLatestFrom, zip, interval } from 'rxjs';

// withLatestFrom和combineLatest有点像,但是他有主从关系,只有在主的observable发送数值,才会执行callback,从的才会运作
// var main = zip(from('hello'), interval(500), (x, y) => x);
// var some = zip(from([0, 1, 0, 0, 0, 1]), interval(300), (x, y) => x);
// var example = main.pipe(
//   withLatestFrom(some, (x, y) => {
//     return y === 1 ? x.toUpperCase() : x;
//   })
// );
// example.subscribe({
//   next: (value) => {
//     console.log(value);
//   },
//   error: (err) => {
//     console.log('Error: ' + err);
//   },
//   complete: () => {
//     console.log('complete');
//   },
// });

zip(from('hello'), interval(500), (x, y) => x)
  .pipe(
    withLatestFrom(
      zip(from([0, 1, 0, 0, 0, 1]), interval(300), (x, y) => x),
      (x, y) => {
        return y === 1 ? x.toUpperCase() : x;
      }
    )
  )
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });

// main   : ----h----e----l----l----o|
// some   : --0--1--0--0--0--1|
// withLatestFrom(some, (x, y) =>  y === 1 ? x.toUpperCase() : x);
// example: ----h----e----l----L----O|
