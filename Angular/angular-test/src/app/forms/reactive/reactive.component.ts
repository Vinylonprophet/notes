/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 18:34:37
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 23:03:39
 * @FilePath: \angular-test\src\app\forms\reactive\reactive.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    // 添加默认值
    // 表单分组
    fullName: new FormGroup({
      firstName: new FormControl("Insomnia"),
      lastName: new FormControl("Vinylon"),
    }),
    phone: new FormControl("15721211157"),
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.contactForm.value);
    // group的某一项
    console.log(this.contactForm.get(["fullName", "firstName"])?.value);

  }
}
