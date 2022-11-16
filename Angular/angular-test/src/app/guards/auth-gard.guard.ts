/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 22:19:01
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 23:17:05
 * @FilePath: \angular-test\src\app\guards\auth-gard.guard.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGardGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    // 跳转页面返回UrlTree
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("route", route);
    console.log("state", state);
    // 跳转
    // return this.router.createUrlTree(["/home"])
    // 允许
    // return true;
    // 不允许
    return false;
  }

}
