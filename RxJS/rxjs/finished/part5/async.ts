import { Observable } from 'rxjs';

// 此部分代码证明rxjs可以异步处理
var observable = new Observable(function (observer) {
  observer.next('Jerry');
  observer.next('Tom');
  setTimeout(() => {
    console.log('成功异步');
  }, 2000);
});
console.log('start');
observable.subscribe(function (value) {
  console.log(value);
});
console.log('end');
