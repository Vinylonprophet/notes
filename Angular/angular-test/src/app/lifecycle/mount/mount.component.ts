/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 11:01:56
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 11:21:51
 * @FilePath: \angular-test\src\app\lifecycle\mount\mount.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mount',
  templateUrl: './mount.component.html',
  styleUrls: ['./mount.component.css']
})
export class MountComponent implements OnInit, AfterContentInit, AfterViewInit {

  // 在实例化组件类时执行，可以用来接受Angular注入的服务实例对象
  constructor() {
    console.log("construct");
  }

  // 仅次于construct，在首次接收到输入属性之后执行
  // 比如接受完Input再去调用ngOnInit，可以在里面做ajax请求的发送
  ngOnInit(): void {
    console.log("ngOnInit");
  }

  // 当内容投影初始渲染完成后调用
  ngAfterContentInit(): void {
    console.log("ngAfterContentInit");
  }

  // 当组件视图渲染完成后调用
  ngAfterViewInit(): void {
    console.log("ngAfterViewInit");
  }

}
