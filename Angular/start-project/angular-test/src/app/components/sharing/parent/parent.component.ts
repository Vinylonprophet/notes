/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-14 00:24:00
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-14 00:36:20
 * @FilePath: \angular-test\src\app\components\sharing\parent\parent.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getData(event: string) {
    alert(event);
  }
}
