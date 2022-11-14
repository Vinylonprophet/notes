/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 11:30:33
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 12:01:30
 * @FilePath: \angular-test\src\app\lifecycle\update\update-child\update-child.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-update-child',
  templateUrl: './update-child.component.html',
  styleUrls: ['./update-child.component.css']
})
export class UpdateChildComponent implements OnInit, OnChanges {

  @Input() name: string = "";
  @Input() age: number = 0;
  @Input("Info") Info = { institute: "", grade: 0, course: "", };

  constructor() { }

  ngOnInit(): void {
  }

  // 每次改变都会调用一次，一开始就执行一次，且优先级高于OnInit
  // 无论多少输入属性同时变化，钩子函数只会执行一次，变化的值会同时存储在参数中
  // 参数类型为SimpleChanges，子属性类型为SimpleChange
  // 对于基本数据类型而言，只要值发生变化就可以被检测到
  // 对于引用数据类型来说，可以检测从一个对象变成另一个对象，但检测不到同一个对象中属性值的变化，但是不影响组件模板更新数据
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}
