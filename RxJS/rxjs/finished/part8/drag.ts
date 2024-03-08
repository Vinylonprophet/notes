import { fromEvent, takeUntil, map, concatAll } from 'rxjs';

// 简易拖拉
const dragDOM = document.getElementById('drag');
const body = document.body;
// 监听事件
const mouseDown = fromEvent(dragDOM, 'mousedown');
const mouseUp = fromEvent(body, 'mouseup');
const mouseMove = fromEvent(body, 'mousemove');
// 事件逻辑
mouseDown
  // 自己的话说就是事件的转换,当鼠标抬起的时候就发送complete完成事件
  // source: -------e--------------e-----
  //                 \               \
  //                  --m-m-m-m|      --m--m-m--m-m|
  .pipe(map((event) => mouseMove.pipe(takeUntil(mouseUp))))
  // 两个observable合在一起
  .pipe(concatAll())
  // map返回x, y
  .pipe(map((event) => ({ x: event.clientX, y: event.clientY })))
  // left和top的坐标定位
  .subscribe((position) => {
    dragDOM.style.left = position.x + 'px';
    dragDOM.style.top = position.y + 'px';
  });
