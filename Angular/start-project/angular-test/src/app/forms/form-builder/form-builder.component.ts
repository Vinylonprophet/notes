/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-15 11:25:15
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-15 14:00:27
 * @FilePath: \angular-test\src\app\forms\form-builder\form-builder.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent implements OnInit {

  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      fullName: this.fb.group({
        firstName: ["Vinylon", [Validators.required]],
        lastName: ["Insomnia", [Validators.minLength(2)]]
      })
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.contactForm.value);
  }
}
