import { Observable } from 'rxjs';

// 这部分代码证明上述代码是同步执行
var observable = new Observable(function (observer) {
  observer.next('Jerry');
  observer.next('Tom');
});
console.log('start');
observable.subscribe(function (value) {
  console.log(value);
});
console.log('end');
