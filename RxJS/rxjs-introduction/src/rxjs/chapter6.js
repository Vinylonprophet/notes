/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 14:08:20
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 14:10:36
 * @FilePath: \rxjs-tutorial\src\rxjs\chapter6.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { map, range } from 'rxjs';

// range被订阅后返回指定范围的数值
// map对数据流进行转换
range(0, 5)
  .pipe(map((n) => n * 10))
  .subscribe((n) => {
    console.log(n);
  });
