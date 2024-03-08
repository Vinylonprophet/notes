import { Observable, of } from 'rxjs';

// 手写operator中map的function
var people = of('Jerry', 'Tom');
function map(source, callback) {
  return new Observable((observer) => {
    return source.subscribe(
      (value) => {
        try {
          // 此处我对于callback的理解是指已经处理完的值,有点类似于异步
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      },
      (err) => {
        observer.error(err);
      },
      () => {
        observer.complete();
      }
    );
  });
}

var helloPeople = map(people, (item) => item + ' Hello~');
helloPeople.subscribe({
  next: function (value) {
    console.log(value);
  },
});

// 直接把map塞到Observable.property
// function map(callback) {
//   return new Observable((observer) => {
//     return (
//       this.subscribe((value) => {
//         try {
//           observer.next(callback(value));
//         } catch (e) {
//           observer.error(e);
//         }
//       }),
//       (err) => {
//         observer.error(err);
//       },
//       () => {
//         observer.complete();
//       }
//     );
//   });
// }
// Observable.prototype.map = map;
// of('Jerry', 'Anna')
//   .map((item) => item + ' Hello~')
//   .subscribe(console.log);

// 个人写法
// of('Jerry', 'Tom')
//   .pipe(map((value) => value + ' Hello'))
//   .subscribe({
//     next: function (value) {
//       console.log(value);
//     },
//   });
// 此处有两个重点,一个重点是每个operator都会回传一个新的observable,另一个重点是我们可以通过create的方法建立各种operator
