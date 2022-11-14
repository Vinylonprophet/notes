/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-11 17:15:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 16:24:42
 * @FilePath: \angular-test\src\app\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { PropertyBindingComponent } from './components/property-binding/property-binding.component';
import { EventBindingComponent } from './components/event-binding/event-binding.component';
import { TemplateVariableComponent } from './components/template-variable/template-variable.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { FormsModule } from '@angular/forms';
import { ContentProjectionComponent } from './components/content-projection/content-projection.component';
import { FaultTolerantComponent } from './components/fault-tolerant/fault-tolerant.component';
import { BuiltInComponent } from './directive/built-in/built-in.component';
import { HoverDirective } from './directive/customize/hover.directive';
import { CustomizeComponent } from './directive/customize/customize.component';
import { PipeComponent } from './pipe/pipe.component';
import { SummaryPipe } from './pipe/summary.pipe';
import { ParentComponent } from './components/sharing/parent/parent.component';
import { ChildComponent } from './components/sharing/child/child.component';
import { MountComponent } from './lifecycle/mount/mount.component';
import { UpdateComponent } from './lifecycle/update/update.component';
import { UpdateChildComponent } from './lifecycle/update/update-child/update-child.component';
import { DestroyComponent } from './lifecycle/destroy/destroy.component';
import { RouterModule, Routes } from '@angular/router';
import { DiModule } from './di/di.module';
import { ServiceComponent } from './service/service.component';
import { ServiceModule } from './service/service.module';
import { TemplateDrivenComponent } from './forms/template-driven/template-driven.component';

const routes: Routes = [
  { path: "mount", component: MountComponent  },
  { path: "update", component: UpdateComponent },
]

// 调用 NgModule 装饰器，告诉 angular 当前类表示的是 angular 模块
@NgModule({
  // 声明有哪些组件
  declarations: [
    AppComponent,
    DataBindingComponent,
    PropertyBindingComponent,
    EventBindingComponent,
    TemplateVariableComponent,
    TwoWayBindingComponent,
    ContentProjectionComponent,
    FaultTolerantComponent,
    BuiltInComponent,
    HoverDirective,
    CustomizeComponent,
    PipeComponent,
    SummaryPipe,
    ParentComponent,
    ChildComponent,
    MountComponent,
    UpdateComponent,
    UpdateChildComponent,
    DestroyComponent,
    ServiceComponent,
    TemplateDrivenComponent,
  ],
  // 声明当前模块依赖了哪些模块
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    // 依赖注入
    // DiModule,
    // 模块注入器
    // ServiceModule,
    RouterModule.forRoot(
      routes
    )
  ],
  // 声明服务的作用域，数组中接受了服务类，表示该服务只能在当前模块的组件使用
  providers: [],
  // 可引导组件， Angular 会在引导过程中把它加载到 DOM 中
  bootstrap: [AppComponent]
})
export class AppModule { }
