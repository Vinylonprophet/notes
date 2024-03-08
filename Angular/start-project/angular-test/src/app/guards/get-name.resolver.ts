/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-17 00:12:04
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-17 00:19:51
 * @FilePath: \angular-test\src\app\guards\get-name.resolver.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetNameResolver implements Resolve<string> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<string> {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve("Vinylon")
      }, 2000)
    })
  }
}
