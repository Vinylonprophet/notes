/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-18 10:44:32
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-18 10:51:43
 * @FilePath: \rxjs-introduction\src\rxjs\chapter10.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { interval, switchMap, fromEvent } from 'rxjs';

const button = document.getElementById("btn");

fromEvent(button, "click")
    .pipe(switchMap(event => interval(1000)))
    .subscribe(console.log);