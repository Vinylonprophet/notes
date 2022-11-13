/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-13 14:13:46
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-13 15:08:13
 * @FilePath: \angular-test\src\app\directive\built-in\built-in.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Component, OnInit } from '@angular/core';

interface List {
  id: number,
  name: string,
  age: number
}

@Component({
  selector: 'app-built-in',
  templateUrl: './built-in.component.html',
  styleUrls: ['./built-in.component.css']
})
export class BuiltInComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  list: List[] = [
    {
      id: 1,
      name: "张三",
      age: 25
    },
    {
      id: 2,
      name: "李四",
      age: 23
    },
    {
      id: 3,
      name: "王五",
      age: 21
    }
  ]

  identify(index: number, item: List){
    console.log(index);
    console.log(item);
    return item.id;
  }
}
