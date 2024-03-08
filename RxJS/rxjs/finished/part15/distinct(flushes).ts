import { from, zip, interval, distinct } from 'rxjs';

// distinct()会自己建立一个set,收到元素的时候先判断set内是否有相同值,如果有就不送,没有就先存到set,然后送出,所以尽量不把distinct用在一个无限的observable里,会导致set越来越大,建议放第二个参数flushes,或者distinctUntilChanged
zip(from(['a', 'b', 'c', 'a', 'c']), interval(300), (x, y) => x)
  .pipe(distinct(null, interval(1300)))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
// source : --a--b--c--a--c|
// flushes: ------------0---...
//     distinct(null, flushes);
// example: --a--b--c-----c|
// flushes observable送出元素时,会把distinct暂存清空,之后从头来过,这样就不用担心set越来越大的问题,但是通常使用distinctUntilChanged
