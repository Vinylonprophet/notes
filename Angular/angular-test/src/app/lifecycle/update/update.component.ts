/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 11:25:25
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 12:10:03
 * @FilePath: \angular-test\src\app\lifecycle\update\update.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterContentChecked, AfterViewChecked, Component, DoCheck, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnChanges, DoCheck, AfterContentChecked, AfterViewChecked {

  name: string = "张三";
  age: number = 20;

  Info = {
    institute: "MIT",
    grade: 2,
    course: "CS"
  }

  constructor() { }

  // 每次改变都会调用一次，一开始就执行一次，且优先级高于OnInit
  // 无论多少输入属性同时变化，钩子函数只会执行一次，变化的值会同时存储在参数中
  // 参数类型为SimpleChanges，子属性类型为SimpleChange
  // 对于基本数据类型而言，只要值发生变化就可以被检测到
  // 对于引用数据类型来说，可以检测从一个对象变成另一个对象，但检测不到同一个对象中属性值的变化，但是不影响组件模板更新数据
  ngOnChanges(changes: SimpleChanges): void {

  }

  // 主要用于调试，无论基本数据类型还是引用数据类型，还是引用数据类型中的数据变化，都会执行
  ngDoCheck(): void {

  }

  // 内容投影更新完成之后执行
  ngAfterContentChecked(): void {

  }

  // 组件视图更新完成之后执行
  ngAfterViewChecked(): void {

  }

  change() {
    this.name = "李四";
    this.age = 18;
    // 以下检测不到同一对象中属性值的变化，但是不影响模板更新数据
    // this.Info.institute = "MIT";
    // this.Info.grade = 1;
    // this.Info.course = "Software Enginnering";

    // 引动地址发生变化时可以检测到
    this.Info = {
      institute: "MIT",
      grade: 1,
      course: "Software Enginnering"
    }
  }
}
