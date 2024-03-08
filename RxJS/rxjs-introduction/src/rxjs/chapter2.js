/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:08:03
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 14:08:38
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter2.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Observable } from 'rxjs';

const observable = new Observable(function (observer) {
  let index = 0;
  let timer = setInterval(function () {
    observer.next(index++);
    if (index === 3) {
      // obersver.complete();
      obersver.error('错误信息');
      clearInterval(timer);
    }
  }, 1500);
});

const obersver = {
  next: function (value) {
    console.log(value);
  },
  complete: function () {
    console.log('终止');
  },
  error: function (error) {
    console.log(error);
  },
};

observable.subscribe(obersver);
