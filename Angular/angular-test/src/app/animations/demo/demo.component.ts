/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-25 14:28:23
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-25 15:13:24
 * @FilePath: \angular-test\src\app\animations\demo\demo.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { animate, keyframes, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  // 定义动画
  animations: [
    trigger("slide", [
      // 入场动画
      transition("void => *", [
        // 定义void状态样式
        style({ opacity: 0, transform: "translateY(40px)" }),
        // animate(250, style({ opacity: 1, transform: "translateY(0)" }))
        // 可以不指定第二个参数，angular会自动将void状态清空作为默认状态
        animate(250)
      ]),
      // 出场动画
      // transition("* => void", [
      //   // 运行总时间 延迟时间（可选） 运动形式（可选）
      //   animate("600ms 1s ease-out", style({ opacity: 0, transform: "translateX(100%)" }))
      // ]),
      transition("* => void", [
        animate(
          "600ms 1s ease-out",
          keyframes([
            style({ offset: 0.3, transform: "translateX(-80px)" }),
            style({ offset: 1, transform: "translateX(100%)" }),
          ])
        )
      ]),
    ])
  ]
})
export class DemoComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // todo 列表
  todos: string[] = ["Learn Angular", "Learn RxJS", "Learn NgRx"]

  // 添加 todo
  addItem(input: HTMLInputElement) {
    this.todos.push(input.value)
    input.value = ""
  }
  // 删除 todo

  removeItem(index: number) {
    this.todos.splice(index, 1)
  }

  startSlide(event: AnimationEvent) {
    console.log(event);
  }

  doneSlide(event: AnimationEvent) {
    console.log(event);
  }

}
