/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-11 17:15:29
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-11 17:20:50
 * @FilePath: \angular-test\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// enableProdMode 调用之后开启生产者模式
import { enableProdMode } from '@angular/core';
// angular在不同平台上的启动不同
// 浏览器启动时需要用到platformBrowserDynamic方法，该方法返回的是平台实对象
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// 引入根模块，用于启动应用程序
import { AppModule } from './app/app.module';
// 引入环境变量 { production: false }
import { environment } from './environments/environment';

// 判断当前是否为生产者模式, true则开启
if (environment.production) {
  enableProdMode();
}

// 启动根模块, 启动应用程序
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
