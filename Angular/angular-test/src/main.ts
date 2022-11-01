/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-02 00:57:36
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-02 01:00:29
 * @FilePath: \angular-test\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// 通过调用这个方法开启生产模式
import { enableProdMode } from '@angular/core';
// angular在不同平台上的启动不同，现在是在浏览器上启动，该方法返回平台实例对象
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// 引入根模块 用于启动应用程序
import { AppModule } from './app/app.module';
// 引入环境变量对象 { production: false }
import { environment } from './environments/environment';

// 如果当前为生产环境，则开启生产模式
if (environment.production) {
  // 开启生产模式
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
