/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 21:33:18
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 23:54:27
 * @FilePath: \angular-test\src\app\app-routing.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CompanyComponent } from './pages/company/company.component';
import { HomeComponent } from './pages/home/home.component';
import { IndustryComponent } from './pages/industry/industry.component';
import { NewsComponent } from './pages/news/news.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AuthGardGuard } from './guards/auth-gard.guard';
import { UnsaveGuard } from './guards/unsave.guard';

const routes: Routes = [
  // 简单路由
  // <app-destroy></app-destroy>
  // { path: "mount", component: MountComponent },
  // { path: "update", component: UpdateComponent },
  {
    path: "home",
    component: HomeComponent,
    canDeactivate: [UnsaveGuard]
  },
  {
    path: "about/:name",
    component: AboutComponent,
    canActivate: [AuthGardGuard]
  },
  // 路由懒加载
  {
    path: "user",
    loadChildren: () => import("./user/user.module").then(m => {
      // m是模块的集合对象
      console.log(m);
      return m.UserModule
    })
  },
  {
    path: "news",
    component: NewsComponent,
    children: [
      {
        path: "company",
        component: CompanyComponent,
        // 路由命名插座
        outlet: "left"
      },
      {
        path: "industry",
        component: IndustryComponent,
        outlet: "right"
      }
    ]
  },
  {
    // 路径为空
    path: "",
    // 重定向
    redirectTo: "home",
    // 完全匹配，如果是about就不跳转了
    pathMatch: "full"
  },
  { path: "**", component: NotFoundComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // forRoot用来启动路由
    RouterModule.forRoot(
      // forRoot的第二个参数是路由的配置，可以不填
      routes, { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
