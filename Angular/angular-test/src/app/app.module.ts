/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-11 17:15:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-12 10:52:54
 * @FilePath: \angular-test\src\app\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { PropertyBindingComponent } from './components/property-binding/property-binding.component';
import { EventBindingComponent } from './components/event-binding/event-binding.component';
import { TemplateVariableComponent } from './components/template-variable/template-variable.component';

// 调用 NgModule 装饰器，告诉 angular 当前类表示的是 angular 模块
@NgModule({
  // 声明有哪些组件
  declarations: [
    AppComponent,
    DataBindingComponent,
    PropertyBindingComponent,
    EventBindingComponent,
    TemplateVariableComponent
  ],
  // 声明当前模块依赖了哪些模块
  imports: [
    BrowserModule,
    SharedModule
  ],
  // 声明服务的作用域，数组中接受了服务类，表示该服务只能在当前模块的组件使用
  providers: [],
  // 可引导组件， Angular 会在引导过程中把它加载到 DOM 中
  bootstrap: [AppComponent]
})
export class AppModule { }
