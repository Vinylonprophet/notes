import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-destroy',
  templateUrl: './destroy.component.html',
  styleUrls: ['./destroy.component.css']
})
export class DestroyComponent implements OnDestroy {

  constructor() { }

  // 组件所对应的dom元素从dom对象中被移除就是卸载阶段
  // 经典场景：页面切换
  ngOnDestroy(): void {
    console.log("destroy 组件被卸载了");
  }

}
