import { fromEvent } from 'rxjs';

// 我们也可以使用event建立observable
fromEvent(document.body, 'click').subscribe({
  next: function (value) {
    console.log('点击');
  },
});
// fromEvent第一个参数是要传入DOM, 第一个是传入监听事件的名称,上方就是监听body是否呗点击,被点击就会答应出event
