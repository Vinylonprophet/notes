/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-18 11:09:38
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-18 11:21:26
 * @FilePath: \rxjs-introduction\src\rxjs\chapter12.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fromEvent, throttleTime, debounceTime } from "rxjs";

// throttleTime，节流，高频次向外部发出数据流，通过throttleTime限制在规定时间内每次只向订阅者传递一次数据流
fromEvent(document, "click").pipe(throttleTime(2000)).subscribe(n => console.log("throttleTime", n))

// debounceTime，防抖，触发高频事件，只响应最后一次
fromEvent(document, "click").pipe(debounceTime(4000)).subscribe(n => console.log("debounceTime", n))