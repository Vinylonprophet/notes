/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-02 11:44:04
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-02 11:46:59
 * @FilePath: \angular-test\src\app\shared\shared.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LayoutComponent
  ]
})
export class SharedModule { }
