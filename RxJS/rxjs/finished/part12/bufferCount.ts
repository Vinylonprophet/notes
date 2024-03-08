import { bufferCount, interval, take } from 'rxjs';

// bufferCount以数量作为缓存
interval(300)
  .pipe(bufferCount(3))
  .pipe(take(5))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
