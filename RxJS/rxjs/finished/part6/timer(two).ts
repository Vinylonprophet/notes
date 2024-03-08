import { timer } from 'rxjs';

// timer有两个参数参与,第一个代表第一个值等待的时间,第二个代表第一次之后发送的值的间隔时间
timer(1000, 5000).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});
