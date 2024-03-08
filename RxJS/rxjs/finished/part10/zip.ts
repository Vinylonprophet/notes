import { interval, zip, take } from 'rxjs';

// zip取相同顺位的元素传入callback
zip(
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
// source : ----0----1----2|
// newest : --0--1--2--3--4--5|
//     zip(newest, (x, y) => x + y)
// example: ----0----2----4|
