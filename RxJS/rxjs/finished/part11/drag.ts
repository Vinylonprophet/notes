// 需求
// 準備 static 樣式與 fixed 樣式
// HTML 要有一個固定位置的錨點(anchor)
// 當滾動超過錨點，則影片變成 fixed
// 當往回滾動過錨點上方，則影片變回 static
// 影片 fixed 時，要能夠拖拉
// 拖拉範圍限制在當前可視區間

import {
  concat,
  concatAll,
  filter,
  fromEvent,
  map,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

// 代码
// 滚动切换,所以需要两个DOM,所以先取需要的DOM
const video = document.getElementById('video');
const anchor = document.getElementById('anchor');

// 建立需要用到的DOM事件
const scroll = fromEvent(document, 'scroll');

// 编写事件逻辑，第一件事就是滚动超过video的bottom改变class
scroll
  // 此处一个布尔值
  .pipe(map((e) => anchor.getBoundingClientRect().bottom < 0))
  .subscribe((bool) => {
    // 布尔值决定是否改变样式
    if (bool) {
      video.classList.add('video-fixed');
      console.log('successed');
    } else {
      video.classList.remove('video-fixed');
      console.log('nope');
    }
  });
// getBoundingClientRect()可以取得DOM物件的宽高以及上下左右的频幕可视区间上（左）的距离
console.log(anchor.getBoundingClientRect().bottom);

// 创建拖拉DOM
const mouseDown = fromEvent(video, 'mousedown');
const mouseUp = fromEvent(document, 'mouseup');
const mouseMove = fromEvent(document, 'mousemove');

// 给到一个取值,目的是为了不让拖动超出可视范围
const validValue = (value, max, min) => {
  return Math.min(Math.max(value, min), max);
};

mouseDown
  // 判断只有给到fixed时候才能拖动
  .pipe(filter((event) => video.classList.contains('video-fixed')))
  // 拖动
  .pipe(map((event) => mouseMove.pipe(takeUntil(mouseUp))))
  .pipe(concatAll())
  .pipe(
    // withLatestFrom的意义主要在只有mouseDown点击的时候才进行x,y的计算
    withLatestFrom(mouseDown, (move, down) => {
      return {
        x: validValue(move.clientX - down.offsetX, window.innerWidth - 320, 0),
        y: validValue(move.clientY - down.offsetY, window.innerHeight - 180, 0),
      };
    })
  )
  .subscribe((pos) => {
    video.style.left = pos.x + 'px';
    video.style.top = pos.y + 'px';
  });
