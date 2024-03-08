import { fromEvent, map, of, concatAll } from 'rxjs';

// concatAll 有时候observable送出的元素还是一个observable,这时候的concatAll可以解决,concatAll就是把所有元素concat起来
// var source = fromEvent(document.body, 'click').pipe(map((e) => of(1, 2, 3)));
// var example = source.pipe(concatAll());
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

// 等价
fromEvent(document.body, 'click')
  .pipe(map((e) => of(1, 2, 3)))
  .pipe(concatAll())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// click  : ------c------------c--------
//     map(e => Rx.Observable.of(1,2,3))
// source : ------o------------o--------
//                 \            \
//                  (123)|       (123)|
//     concatAll()
// example: ------(123)--------(123)------------
