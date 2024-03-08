import { interval, buffer, take } from 'rxjs';

// buffer传入一个observable2,把原本observable1送的元素放缓存在数组中,等到传入的observable2发出第一个元素时,observable1的缓存数组一起释放
interval(300)
  .pipe(buffer(interval(1000)))
  .pipe(take(5))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : --0--1--2--3--4--5--6--7..
// source2: ---------0---------1--------...
//             buffer(source2)
// example: ---------([0,1,2])---------([3,4,5])
