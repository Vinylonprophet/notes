import { debounce, interval, take, debounceTime } from 'rxjs';

// debounce 和 buffer 很像,比如buffer传入对象,bufferTime传入毫秒;debounce传入对象,debounceTime传入毫秒,常用的就是debounceTime
interval(300)
  .pipe(take(5))
  .pipe(debounceTime(1000))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
    complete: function () {
      console.log('complete');
    },
  });
// debounce的作用就是,收到元素之后先cache一段等待的时间,如果收到新的就覆盖,如果等待时间过去之后,就释放
// source : --0--1--2--3--4|
//     debounceTime(1000)
// example: --------------4|
