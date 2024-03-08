/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-15 14:06:13
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-15 14:33:27
 * @FilePath: \angular-test\src\app\forms\checkbox\checkbox.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

interface Data {
  name: string
  value: string
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent implements OnInit {
  Data: Array<Data> = [
    { name: "Vinylon", value: "vinylon" },
    { name: "Insomnia", value: "insomnia" },
    { name: "Apple", value: "apple" },
  ]

  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([

      ])
    })
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.form.value);
  }

  onChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const checked = target.checked;
    const checkArray = this.form.get("checkArray") as FormArray;
    if (checked) {
      // FormArray中添加FormControl
      checkArray.push(this.fb.control(value));
    } else {
      const index = checkArray.controls.findIndex(control => control.value === value);
      checkArray.removeAt(index);
    }
  }
}
