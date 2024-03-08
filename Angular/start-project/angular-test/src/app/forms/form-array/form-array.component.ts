/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 23:09:11
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 23:30:59
 * @FilePath: \angular-test\src\app\forms\form-array\form-array.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-array',
  templateUrl: './form-array.component.html',
  styleUrls: ['./form-array.component.css']
})
export class FormArrayComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    // contacts是FormArray的实例
    contacts: new FormArray([])
  })

  // get形式的属性
  get contacts() {
    // as用来类型断言
    return this.contactForm.get('contacts') as FormArray;
  }

  // 动态往FormArray中添加FormGroup
  addContacts() {
    let myContacts: FormGroup = new FormGroup({
      address: new FormControl(),
      phone: new FormControl(),
      name: new FormControl()
    });
    this.contacts.push(myContacts);
  }

  ngOnInit(): void {
    this.addContacts();
  }

  deleteContacts(i: number) {
    this.contacts.removeAt(i);
  }

  onSubmit(){
    console.log(this.contactForm.value);
  }

}
