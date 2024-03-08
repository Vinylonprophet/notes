// of的一个参数就是一个list，list在js中最常见的就是array，如果要把一个存在的数组当作参数用from

import { from, of } from 'rxjs';

// from可以用来接收任何可以列举的参数
var arr = ['Jerry', 'Tom', 2022, 'exercise'];
from(arr).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});
of(arr).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});

// 注意：任何可以列举的参数都可以使用，比如Set，WeakSet，Iterator
from('还能接受字符串!').subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});

// 看看promise呢
from(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('Promise也是ok的');
    }, 3000);
  })
).subscribe({
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('complete');
  },
});
