import { interval, merge, take } from 'rxjs';

// merge和concat一样都是用来合并observable的,但是和concat有很大不同
merge(interval(500).pipe(take(3)), interval(300).pipe(take(6))).subscribe({
  next: function (value) {
    console.log(value);
  },
});
// merge是同时跑
// source : ----0----1----2|
// source2: --0--1--2--3--4--5|
//             merge()
// example: --0-01--21-3--(24)--5|
