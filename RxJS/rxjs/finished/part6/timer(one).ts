import { timer } from 'rxjs';

// timer的第一个参数除了是Number之外,也可以是日期,等到指定的时间再发送第一个值
// timer也可以只接受一个参数,等待一秒送出0的时候同时结束
timer(1000).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});
