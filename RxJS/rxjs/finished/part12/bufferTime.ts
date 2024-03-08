import { bufferTime, interval, take } from 'rxjs';

// 此处的bufferTime可以简洁的表达buffer中的例子,bufferTime就是以时间做缓存
interval(300)
  .pipe(bufferTime(1000))
  .pipe(take(5))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
