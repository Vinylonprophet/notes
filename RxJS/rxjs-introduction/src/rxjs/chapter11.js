/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-18 10:55:07
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-18 11:03:59
 * @FilePath: \rxjs-introduction\src\rxjs\chapter11.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { range, take, takeWhile, takeUntil, fromEvent } from "rxjs";

const button = document.getElementById('btn');

// 操作符take，获取数据流的前几个
range(1, 10).pipe(take(4)).subscribe(console.log);

// 操作符takeWhile，根据条件从数据源前面开始获取
range(1, 10).pipe(takeWhile(n => n < 4)).subscribe(console.log)

// 操作符takeUntil，接受可观察对象，当可观察对象发出值后，终止主数据源
fromEvent(document, "mousemove")
    .pipe(takeUntil(fromEvent(button, "click")))
    .subscribe(console.log)