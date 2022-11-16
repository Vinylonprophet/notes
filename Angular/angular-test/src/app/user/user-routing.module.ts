/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 21:40:37
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 23:37:29
 * @FilePath: \angular-test\src\app\user\user-routing.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from '../guards/user.guard';
import { LoginComponent } from './pages/login/login.component';
import { UserComponent } from './pages/user/user.component';

const routes: Routes = [
  {
    path: "login",
    canActivateChild: [UserGuard],
    component: LoginComponent,
    children: [
      {
        path: "user",
        component: UserComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
