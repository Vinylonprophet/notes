/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 00:24:09
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 00:34:22
 * @FilePath: \angular-test\src\app\components\sharing\child\child.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {

  @Input("name") myName: string = "";
  @Input("age") myAge: number = 0;

  @Output() sendData = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.sendData.emit("我是子组件中的数据");
  }
}
