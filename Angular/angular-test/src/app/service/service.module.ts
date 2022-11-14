/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 16:23:03
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 16:31:54
 * @FilePath: \angular-test\src\app\service\service.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestService } from './test.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  // 存在两种模块注入的方式，一种是在module里面添加service，一种是在service中选择模块
  // providers: [TestService]
})
export class ServiceModule { }
