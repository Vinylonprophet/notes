/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:07:05
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 14:07:12
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter1.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Observable } from 'rxjs';

const observable = new Observable(function (observer) {
  setTimeout(function () {
    observer.next({
      name: 'Vinylon',
    });
  }, 2000);
});

const observer = {
  next: function (value) {
    console.log(value);
  },
};

observable.subscribe(observer);
