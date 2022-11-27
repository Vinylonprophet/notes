/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-25 14:28:23
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-27 11:28:19
 * @FilePath: \angular-test\src\app\animations\demo\demo.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { animate, keyframes, style, transition, trigger, AnimationEvent } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { slideAnimation, todoAnimations } from '../animations';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css'],
  // 定义动画
  animations: [
    slideAnimation,
    todoAnimations
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
