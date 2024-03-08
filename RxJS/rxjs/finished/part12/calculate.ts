import { empty, fromEvent, mapTo, merge, startWith, scan } from 'rxjs';

const addButton = document.getElementById('addButton');
const minusButton = document.getElementById('minusButton');
const state = document.getElementById('state');
// 虽然mapTo是固定的,但是有着scan,所以可以成功进行加减

// const addClick = fromEvent(addButton, 'click').pipe(mapTo(1));
// const minusClick = fromEvent(minusButton, 'click').pipe(mapTo(-1));

// const numberState = merge(empty().pipe(startWith(0)), addClick, minusClick)
//   .pipe(scan((origin, next) => origin + next, 0))
//   .subscribe({
//     next: function (value) {
//       state.innerHTML = value;
//     },
//   });

const addClick = fromEvent(addButton, 'click').pipe(mapTo(1));
const minusClick = fromEvent(minusButton, 'click').pipe(mapTo(-1));
// 这里还是说明empty为空,然后startwith进行赋值,empty还是很有用的
merge(empty().pipe(startWith(0)), addClick, minusClick)
  // 自己写一遍的时候发现不加0也没问题,可能默认就是number型
  .pipe(scan((origin, next) => origin + next, 0))
  .subscribe({
    next: function (value) {
      state.innerHTML = value;
    },
    complete: function () {
      console.log('complete');
    },
  });
