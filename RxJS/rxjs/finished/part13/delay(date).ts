import { delay, interval, take } from 'rxjs';

// delay除了可以传时间,还可以传Date型别的资料
interval(300)
  .pipe(take(5))
  .pipe(delay(new Date(new Date().getTime() + 1000)))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
