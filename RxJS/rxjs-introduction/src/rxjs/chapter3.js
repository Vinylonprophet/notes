/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:08:08
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 14:08:44
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter3.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Subject } from 'rxjs';

const demoSubject = new Subject();

demoSubject.subscribe({
  next: function (value) {
    console.log(value);
  },
});

demoSubject.subscribe({
  next: function (value) {
    console.log(value);
  },
});

// 在外部调用可观察对象，可以使用在和广播相关的场景中
setTimeout(function () {
  demoSubject.next('Insomnia');
}, 2000);
