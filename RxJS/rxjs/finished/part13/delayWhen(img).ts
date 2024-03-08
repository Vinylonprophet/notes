import { fromEvent, map, delay } from 'rxjs';

// 抓住DOM
var imgList = document.getElementsByTagName('img');

// 建立observable
var movePos = fromEvent(document, 'mousemove').pipe(
  map((e) => ({
    x: e.clientX,
    y: e.clientY,
  }))
);

// 逻辑
function followMouse(DOMArr) {
  const delayTime = 600;
  // forEach遍历每一个图片，利用index达到不同的delay时间
  DOMArr.forEach((item, index) => {
    movePos
      .pipe(
        // delay((delayTime * (Math.pow(0.65, index) + Math.cos(index / 4))) / 2)
        // 时间可以不同
        delay((delayTime * Math.pow(0.65, index)) / 2)
      )
      .subscribe(function (pos) {
        item.style.transform =
          'translate3d(' + pos.x + 'px, ' + pos.y + 'px, 0)';
      });
  });
}
// 把imgList从Collection转换成Array传入followMouse()
followMouse(Array.from(imgList));
