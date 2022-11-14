/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 17:12:31
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 17:55:23
 * @FilePath: \angular-test\src\app\forms\template-driven\template-driven.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template-driven',
  templateUrl: './template-driven.component.html',
  styleUrls: ['./template-driven.component.css']
})
export class TemplateDrivenComponent implements OnInit {

  // 获取表单字段值
  onSubmit(form: NgForm) {
    console.log(form.valid);
    console.log(form.value);
  }

  constructor() { }

  ngOnInit(): void {
  }

}
