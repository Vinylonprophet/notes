import { Observable, of } from 'rxjs';

// 直接把map塞到Observable.property
function map(callback) {
  return new Observable((observer) => {
    return (
      this.subscribe((value) => {
        try {
          observer.next(callback(value));
        } catch (e) {
          observer.error(e);
        }
      }),
      (err) => {
        observer.error(err);
      },
      () => {
        observer.complete();
      }
    );
  });
}
Observable.prototype.map = map;
of('Jerry', 'Anna')
  .map((item) => item + ' Hello~')
  .subscribe(console.log);
