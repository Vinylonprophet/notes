import { Observable } from "rxjs";

// 直接传入三个function
var observable = new Observable(function (observer) {
  observer.next('Jerry');
  observer.next('Tom');
  observer.complete();
});
observable.subscribe(
  (value) => {
    console.log(value);
  },
  (error) => {
    console.log('Error: ', error);
  },
  () => {
    console.log('complete');
  }
);