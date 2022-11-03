/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-02 00:57:36
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-02 16:32:44
 * @FilePath: \angular-test\src\app\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { DemoComponent } from './demo/demo.component';
import { HoverDirective } from './directives/hover.directive';
import { SummaryPipe } from './pipes/summary.pipe';
import { PersonComponent } from './component/person/person.component';

@NgModule({
  declarations: [
    // 声明当前模块拥有哪些组件
    AppComponent,
    DemoComponent,
    HoverDirective,
    SummaryPipe,
    PersonComponent
  ],
  imports: [
  // 声明当前模块依赖了那些其他模块
    BrowserModule,
    SharedModule,
    FormsModule
  ],
  // 声明服务的作用域，数组中接受服务类，表示该服务只能在当前模块的组件中使用
  providers: [],
  // 可引导组件，Angular 会在引导过程中把它加载到 DOM 中
  // 当前的 AppComponent 是作为启动组件
  bootstrap: [AppComponent]
})
export class AppModule { }
