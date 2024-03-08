/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-18 11:38:36
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-18 13:14:26
 * @FilePath: \rxjs-introduction\src\rxjs\chapter14.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fromEvent, map, switchMap, takeUntil } from "rxjs"

const box = document.getElementById("box")

fromEvent(box, "mousedown")
    .pipe(
        map(event => ({
            distanceX: event.clientX - event.target.offsetLeft,
            distanceY: event.clientY - event.target.offsetTop,
        })),
        switchMap(({ distanceX, distanceY }) =>
            fromEvent(document, "mousemove").pipe(
                map(event => ({
                    left: event.clientX - distanceX,
                    top: event.clientY - distanceY
                })),
                takeUntil(
                    fromEvent(box, "mouseup")
                )
            )
        )
    )
    .subscribe(({ left, top }) => {
        box.style.left = left + 'px',
            box.style.top = top + 'px'
    })

// box.onmousedown = function(event){
//     console.log(event.clientX);
//     console.log(event.target.offsetLeft);
//     // event.ClientX就是落点
//     // event.target.offsetLeft就是box关于x轴的距离
//     // 不懂画个图就行了
//     let distanceX = event.clientX - event.target.offsetLeft;
//     let distanceY = event.clientY - event.target.offsetTop;
//     document.onmousemove = function(event){
//         let left = event.clientX - distanceX
//         let top = event.clientY - distanceY
//         box.style.left = left + 'px'
//         box.style.top = top + 'px'
//     }
//     box.onmouseup = function(){
//         document.onmousemove = null
//     }
// }