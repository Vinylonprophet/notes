/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-16 00:00:21
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-16 23:50:07
 * @FilePath: \angular-test\src\app\pages\home\home.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CanLeave } from 'src/app/guards/unsave.guard';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, CanLeave {

  form: FormGroup = new FormGroup({
    username: new FormControl()
  })

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  canleave(): boolean {
    // 修改表单dirty为true，不允许离开，所以加上感叹号让返回值为false
    return !this.form.get('username')!.dirty;
  }

  jump(){
    this.router.navigate(["/about", "Insomnia"],{
      queryParams: {
        name: "Vinylon"
      }
    })
  }

}
