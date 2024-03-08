import { combineLatest, interval, take } from 'rxjs';

// combineLatest取到各个observable的最后的值再输出成一个值
combineLatest(
  interval(500).pipe(take(3)),
  interval(300).pipe(take(6)),
  (x, y) => x + y
).subscribe({
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
// 只有都有值的时候才能callback
// source : ----0----1----2|
// newest : --0--1--2--3--4--5|
//     combineLatest(newest, (x, y) => x + y);
// example: ----01--23-4--(56)--7|

// 使用情形: 计算BMI,如果体重变动用上次的身高,如果身高变动使用上次的体重
