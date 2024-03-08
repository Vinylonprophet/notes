import { Observable } from 'rxjs';

// 送出错误的案例
var observable = new Observable(function (observer) {
  try {
    observer.next('Jerry');
    observer.next('Tom');
    throw '错误';
    observer.next('看看是否执行');
  } catch (e) {
    console.log('报错信息:', Error);
  }
});
var observer = {
  next: function (value) {
    console.log(value);
  },
  error: function (error) {
    console.log('Error: ', error);
  },
};
observable.subscribe(observer);
