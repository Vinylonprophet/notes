/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-25 15:32:40
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-25 15:41:17
 * @FilePath: \angular-test\src\app\animations\animations.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { animate, animation, keyframes, style, transition, trigger, useAnimation } from '@angular/animations';

let slideAnimationEnter = animation([
  // 定义void状态样式
  style({ opacity: 0, transform: "translateY(40px)" }),
  // animate(250, style({ opacity: 1, transform: "translateY(0)" }))
  // 可以不指定第二个参数，angular会自动将void状态清空作为默认状态
  animate(250)
])

let slideAnimationLeave = animation([
  animate(
    "{{ duration }} {{ delay }} {{ easing }}",
    keyframes([
      style({ offset: 0.3, transform: "translateX(-80px)" }),
      style({ offset: 1, transform: "translateX(100%)" }),
    ])
  )
], {
  params: {
    duration: "1s",
    delay: "0s",
    easing: "ease-out"
  }
})

export let slideAnimation = trigger("slide", [
  // 入场动画
  transition("void => *", useAnimation(slideAnimationEnter)),

  // 出场动画
  // transition("* => void", [
  //   // 运行总时间 延迟时间（可选） 运动形式（可选）
  //   animate("600ms 1s ease-out", style({ opacity: 0, transform: "translateX(100%)" }))
  // ]),

  // 出场动画
  transition("* => void", useAnimation(slideAnimationLeave, { params: { delay: "1s" } })),
])
