import { interval, takeUntil, fromEvent } from 'rxjs';

// takeUntil经常使用,可以在某件事情发生时,让一个observable直到送出complete讯息
interval(1000)
  .pipe(takeUntil(fromEvent(document.body, 'click')))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// source : -----0-----1-----2------3--
// click  : ----------------------c----
//     takeUntil(click)
// example: -----0-----1-----2----|
