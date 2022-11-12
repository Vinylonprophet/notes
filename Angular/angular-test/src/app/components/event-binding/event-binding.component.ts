/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-12 10:36:00
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-12 10:51:55
 * @FilePath: \angular-test\src\app\components\event-binding\event-binding.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSave(event: Event){
    console.log(event);
    alert('事件绑定');
    console.log('this指向:', this);
  }

  onKeyup(){
    console.log("onKeyup事件被触发");
  }
}
