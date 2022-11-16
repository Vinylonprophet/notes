/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 23:42:31
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 23:53:46
 * @FilePath: \angular-test\src\app\guards\unsave.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeComponent } from '../pages/home/home.component';

export interface CanLeave {
  canleave: () => boolean
}

@Injectable({
  providedIn: 'root'
})
export class UnsaveGuard implements CanDeactivate<unknown> {
  canDeactivate(
    // 应用当前路由首位组件的实例
    component: HomeComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (component.canleave()) {
      // 返回值为true是允许离开，为false是不允许离开
      return true
    } else {
      if (confirm("确定离开吗")) {
        return true
      } else {
        return false
      }
    }
  }

}
