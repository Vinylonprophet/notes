import { Observable } from 'rxjs';

var observable = new Observable(function (observer) {
  observer.next('Jerry');
  observer.next('Tom');
});
observable.subscribe(function (value) {
  console.log(value);
});
