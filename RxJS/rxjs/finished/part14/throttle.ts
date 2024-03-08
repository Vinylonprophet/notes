import { interval, take, throttle, throttleTime } from 'rxjs';

// 看到debounce就会看到throttle
// throttle也是降低事件的触发频率,但是行为上会有所不同
// throttle和debounce一样,也有throttleTime,前者是observable,后者是毫秒

interval(300)
  .pipe(take(5))
  .pipe(throttleTime(1000))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });

// throttle和debounce不同,debounce是等待之后释放元素,throttle是先释放元素,再等待,等待时间过了又释放元素
