/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 16:04:27
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 16:34:35
 * @FilePath: \angular-test\src\app\service\service.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
  // 组件级别注册服务，该组件及其子组件使用同一个服务实例对象
  // providers: [ TestService ]
})
export class ServiceComponent implements OnInit {

  // 此处的TestService就是token
  constructor(public testService: TestService) {
    console.log(testService.test);
  }

  ngOnInit(): void {
  }

}
