/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-11 17:15:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-25 14:27:28
 * @FilePath: \angular-test\src\app\app.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule, ReflectiveInjector } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app.component';
import { DataBindingComponent } from './components/data-binding/data-binding.component';
import { PropertyBindingComponent } from './components/property-binding/property-binding.component';
import { EventBindingComponent } from './components/event-binding/event-binding.component';
import { TemplateVariableComponent } from './components/template-variable/template-variable.component';
import { TwoWayBindingComponent } from './components/two-way-binding/two-way-binding.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { DiModule } from './di/di.module';
import { ServiceComponent } from './service/service.component';
import { ServiceModule } from './service/service.module';
import { TemplateDrivenComponent } from './forms/template-driven/template-driven.component';
import { ReactiveComponent } from './forms/reactive/reactive.component';
import { FormArrayComponent } from './forms/form-array/form-array.component';
import { ValidationComponent } from './forms/validation/validation.component';
import { FormBuilderComponent } from './forms/form-builder/form-builder.component';
import { CheckboxComponent } from './forms/checkbox/checkbox.component';
import { RadioComponent } from './forms/radio/radio.component';
import { MethodComponent } from './forms/method/method.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { NavigationComponent } from './pages/navigation/navigation.component';
import { PagesComponent } from './pages/pages/pages.component';
import { PageLayoutComponent } from './pages/page-layout/page-layout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NewsComponent } from './pages/news/news.component';
import { CompanyComponent } from './pages/company/company.component';
import { IndustryComponent } from './pages/industry/industry.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientComponent } from './http/http-client/http-client.component';
import { HttpParamsComponent } from './http/http-params/http-params.component';
import { HttpHeadersComponent } from './http/http-headers/http-headers.component';
import { HttpResponseComponent } from './http/http-response/http-response.component';
import { AuthInterceptor } from './auth.interceptor';
import { HttpProxyComponent } from './http/http-proxy/http-proxy.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { NgrxComponent } from './ngrx/ngrx.component';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/effects/counter.effects';
import { NgrxExampleComponent } from './ngrx-example/ngrx-example.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { DemoComponent } from './animations/demo/demo.component';
import { Demo2Component } from './animations/demo2/demo2.component';
import { Demo3Component } from './animations/demo3/demo3.component';

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
    ReactiveComponent,
    FormArrayComponent,
    ValidationComponent,
    FormBuilderComponent,
    CheckboxComponent,
    RadioComponent,
    MethodComponent,
    HomeComponent,
    AboutComponent,
    NavigationComponent,
    PagesComponent,
    PageLayoutComponent,
    NotFoundComponent,
    NewsComponent,
    CompanyComponent,
    IndustryComponent,
    HttpClientComponent,
    HttpParamsComponent,
    HttpHeadersComponent,
    HttpResponseComponent,
    HttpProxyComponent,
    NgrxComponent,
    NgrxExampleComponent,
    DemoComponent,
    Demo2Component,
    Demo3Component,
  ],
  // 声明当前模块依赖了哪些模块
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    // 依赖注入
    // DiModule,

    // 模块注入器
    // ServiceModule,

    // 引入路由模块
    AppRoutingModule,

    // 引入模块
    StoreRouterConnectingModule.forRoot(),

    StoreModule.forRoot(reducers, { metaReducers }),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    EffectsModule.forRoot([CounterEffects])
  ],
  // 声明服务的作用域，数组中接受了服务类，表示该服务只能在当前模块的组件使用
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      // 自定义拦截器可以有多个
      multi: true
    }
  ],
  // 可引导组件， Angular 会在引导过程中把它加载到 DOM 中
  bootstrap: [AppComponent]
})
export class AppModule { }
