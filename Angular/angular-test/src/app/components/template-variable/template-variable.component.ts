/*
 * @Author: Vinylonprophet 915390118@qq.com
 * @Date: 2022-11-12 10:50:52
 * @LastEditors: Vinylonprophet 915390118@qq.com
 * @LastEditTime: 2022-11-13 11:33:48
 * @FilePath: \angular-test\src\app\components\template-variable\template-variable.component.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-template-variable',
  templateUrl: './template-variable.component.html',
  styleUrls: ['./template-variable.component.css']
})
export class TemplateVariableComponent implements OnInit, AfterViewInit {

  @ViewChild("paragraph") paragraph: ElementRef<HTMLParagraphElement> | undefined;

  @ViewChildren("items") items: QueryList<HTMLLIElement> | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log(this.paragraph?.nativeElement);
    // 由于_result不允许被直接访问，所以要使用toArray来log
    console.log(this.items?.toArray());
  }

  onClick(btn: HTMLButtonElement): void{
    console.log(btn);
  }
}
