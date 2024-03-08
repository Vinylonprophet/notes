import { interval, of, take, concatAll } from 'rxjs';

// concatAll是永远先处理第一个,处理结束才处理下一个
of(
  interval(1000).pipe(take(5)),
  interval(500).pipe(take(2)),
  interval(2000).pipe(take(1))
)
  .pipe(concatAll())
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : (o1                 o2      o3)|
//            \                  \       \
//             --0--1--2--3--4|   -0-1|   ----0|
//                 concatAll()
// example: --0--1--2--3--4-0-1----0|
