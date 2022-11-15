/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 23:42:53
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-15 11:13:27
 * @FilePath: \angular-test\src\app\forms\validation\validation.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MyValidators } from './myValidators';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    // 第一个值默认没有，第二个数组存放验证规则
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(2),
      MyValidators.cannotContainSpace
    ], MyValidators.shouldBeUnique)
  })

  constructor() { }

  ngOnInit(): void {
  }

  // 获取FormControl的实对象
  get name (){
    return this.contactForm.get('name');
  }

  onSubmit(){
    console.log(this.contactForm.value);
  }
}
