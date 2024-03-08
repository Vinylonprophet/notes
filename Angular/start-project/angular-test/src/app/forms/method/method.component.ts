/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-15 16:22:28
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-15 18:18:07
 * @FilePath: \angular-test\src\app\forms\method\method.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-method',
  templateUrl: './method.component.html',
  styleUrls: ['./method.component.css']
})
export class MethodComponent implements OnInit {

  form: FormGroup = new FormGroup({
    firstName: new FormControl("Vinylon"),
    lastName: new FormControl("Insomnia")
  })

  constructor() { }

  ngOnInit(): void {
    // 表单控件发生变化，监听最新更改的值
    this.form.get('firstName')?.valueChanges.subscribe((value)=>{
      console.log(value);
    });
  }

  onSubmit(){
    console.log(this.form.value)
  }

  onPatchValue(){
    this.form.patchValue({
      firstName: "Insomnia"
    })
  }

  onSetValue(){
    this.form.setValue({
      firstName: "Insomnia",
      lastName: "Vinylon"
    })
  }

  onReset(){
    this.form.reset();
  }
}
