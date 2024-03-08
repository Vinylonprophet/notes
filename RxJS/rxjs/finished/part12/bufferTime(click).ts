import { bufferTime, filter, fromEvent } from 'rxjs';

const button = document.getElementById('addButton');
const click = fromEvent(button, 'click');
click
  .pipe(bufferTime(500))
  // 此处的arr.length代表鼠标连续点击两下,不是很理解这个时间参数
  .pipe(filter((arr) => arr.length >= 2))
  .subscribe({
    next: function (value) {
      console.log(value);
    },
  });
