import { map, of } from 'rxjs';

// 个人写法
of('Jerry', 'Tom')
  .pipe(map((value) => value + ' Hello'))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
