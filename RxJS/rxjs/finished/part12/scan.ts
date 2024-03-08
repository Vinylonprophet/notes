import { from, zip, interval, scan } from 'rxjs';

// 看看scan的实例
zip(from('hello'), interval(600), (x, y) => x)
  .pipe(scan((origin, next) => origin + next, ''))
  .subscribe({
    next: (value) => {
      console.log(value);
    },
    error: (err) => {
      console.log('Error: ' + err);
    },
    complete: () => {
      console.log('complete');
    },
  });
// source : ----h----e----l----l----o|
//   scan((origin, next) => origin + next, '')
// example: ----h----(he)----(hel)----(hell)----(hello)|
// 注意:这里第一次传入的h和''相加,返回的'h'当作下一次的传入状态传下去
// reduce和scan的最大区别就在于,scan每一次都是回传一个observable实例,而reduce可以是任何资料类别,必须是使用者传入的callback才能决定reduce返回的最后值
