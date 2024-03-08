import { Observable } from 'rxjs';

// 观察者
var observable = new Observable(function (observer) {
  observer.next('Jerry');
  observer.complete();
  observer.error();
  // 此处的next没有执行, 说明complete之后不会再执行next
  observer.next('看看是否执行');
});
var observer = {
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('finish');
  },
  error: function (error) {
    console.log(error);
  },
};
observable.subscribe(observer);
