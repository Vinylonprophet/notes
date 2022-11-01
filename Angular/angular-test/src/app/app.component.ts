/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-02 00:57:36
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-02 01:07:07
 * @FilePath: \angular-test\src\app\app.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component } from '@angular/core';

@Component({
  // 指定组件的使用方式，当前为标记形式
  // app-root   => <app-root></app-root>
  // [app-root] => <div app-root></div>
  // .app-root  => <div class="app-root"></div>
  selector: 'app-root',
  // 关联组件模板文件
  // templateUrl: '组件模板文件路径'
  // template: `组件模板字符串`
  templateUrl: './app.component.html',
  // 关联组件样式文件
  // styleUrls: ['组件样式文件路径']
  // styles: [`组件样式`]
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-test';
}
