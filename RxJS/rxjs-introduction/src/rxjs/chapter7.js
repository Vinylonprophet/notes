/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:08:24
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 14:26:58
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter7.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { from } from 'rxjs';

from(['a', 'b', 'c']).subscribe((n) => {
  console.log(n);
});

function p() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve({ a: 1 });
    }, 2000);
  });
}

from(p()).subscribe((n) => {
  console.log(n);
});
