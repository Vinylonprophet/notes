/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-20 16:05:13
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-20 16:28:25
 * @FilePath: \angular-test\src\app\auth.interceptor.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log(request);
    let req = request.clone({
      // method: "post",
      // setHeaders: { name: "Insomnia" }
    })
    // 查看network发现请求头是成功的
    // 操作符retry是当操作失败时，重试两次
    return next.handle(req).pipe(retry(2));
  }
}
