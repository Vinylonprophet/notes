import {
  concatAll,
  filter,
  fromEvent,
  map,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

// 获取滚动切换需要的DOM
const anchor = document.getElementById('anchor');
const video = document.getElementById('video');

// 建立滚动需要的事件
const scroll = fromEvent(document, 'scroll');

// 编写事件逻辑
// 第一件事就是滚动超过video的bottom改变class
scroll
  .pipe(map((e) => anchor.getBoundingClientRect().bottom < 0))
  .subscribe((bool) => {
    if (bool) {
      video.classList.add('video-fixed');
    } else {
      video.classList.remove('video-fixed');
    }
  });

// 第二件事就是mouse事件
const mouseDown = fromEvent(video, 'mousedown');
const mouseMove = fromEvent(video, 'mousemove');
const mouseUp = fromEvent(video, 'mouseup');

// 给到一个取值,目的是为了不让拖动超出可视范围
const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max);
};

// 第三件事就是写移动了
mouseDown
  .pipe(filter((event) => video.classList.contains('video-fixed')))
  .pipe(map((event) => mouseMove.pipe(takeUntil(mouseUp))))
  .pipe(concatAll())
  .pipe(
    withLatestFrom(mouseDown, (move, down) => {
      console.log(move.clientX - down.offsetX);
      console.log(window.innerWidth - 320);
      return {
        x: validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
        y: validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0),
      };
    })
  )
  .subscribe((pos) => {
    video.style.top = pos.y + 'px';
    video.style.left = pos.x + 'px';
  });
