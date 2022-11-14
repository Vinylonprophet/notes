/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 15:48:21
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 16:32:57
 * @FilePath: \angular-test\src\app\service\test.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import { ServiceModule } from './service.module';

@Injectable({
  // 根注入器
  providedIn: 'root'
  // 模块注入器，注意此时的app.module.ts
  // 存在两种模块注入的方式，一种是在module里面添加service，一种是在service中选择模块
  // providedIn: ServiceModule,
})

export class TestService {
  test: string = "test service"

  constructor() { }
}
