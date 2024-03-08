import { timer } from 'rxjs';

// unsubscribe停止订阅
var subscription = timer(1000, 1000).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete!');
  },
  error: function (error) {
    console.log('Throw Error: ' + error);
  },
});
setTimeout(() => {
  subscription.unsubscribe(); // 停止訂閱(退訂)， RxJS 4.x 以前的版本用 dispose()
  console.log('unsubscribe退订,释放资源');
}, 5000);
