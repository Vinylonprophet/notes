/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-25 15:32:40
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-27 11:12:24
 * @FilePath: \angular-test\src\app\animations\animations.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { animate, animateChild, animation, group, keyframes, query, stagger, style, transition, trigger, useAnimation } from '@angular/animations';

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

export let todoAnimations = trigger("todoAnimations", [
  transition(":enter", [
    // 查询h2
    // 查询的子元素，所以要在父级调用
    // 默认情况下，动画有先后顺序之分，可以使用group方法让其并行
    group([
      query("h2", [
        style({ transform: "translateY(-30px)", opacity: 0 }),
        animate(300)
      ]),
      // query("@slide", animateChild())
      // 让多个元素同时执行同一个动画，让每个元素动画的执行依次延迟
      query("@slide", stagger(200, animateChild()))
    ])
  ])
])
